const PAGE_SIZE = 30;
const MAX_BYTES = 8192;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const CONTROLS = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f\u202a-\u202e\u2066-\u2069]/u;
const SELECT = `SELECT m.id, m.room, m.nickname, m.body, m.reply_to, m.created_at,
  p.nickname AS reply_nickname, substr(p.body, 1, 120) AS reply_body
  FROM discussion_messages m LEFT JOIN discussion_messages p ON p.id = m.reply_to`;

function json(value, status = 200, extra = {}) {
  return Response.json(value, { status, headers: {
    "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", ...extra,
  } });
}

async function readBody(request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("invalid_json");
  const chunks = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BYTES) {
      await reader.cancel();
      throw new Error("too_large");
    }
    chunks.push(value);
  }
  const buffer = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { buffer.set(chunk, offset); offset += chunk.length; }
  try { return JSON.parse(new TextDecoder().decode(buffer)); }
  catch { throw new Error("invalid_json"); }
}

async function validRoom(room, env, url) {
  if (room === "lobby") return true;
  if (typeof room !== "string" || room.length > 300) return false;
  const response = await env.ASSETS.fetch(new Request(new URL("/discussion-rooms.json", url)));
  if (!response.ok) throw new Error("room_manifest_unavailable");
  const rooms = await response.json();
  return Array.isArray(rooms) && rooms.includes(room);
}

function validText(value, max, singleLine = false) {
  return typeof value === "string" && value.trim().length > 0 &&
    value.trim().length <= max && !CONTROLS.test(value) &&
    (!singleLine || !/[\r\n\t]/.test(value));
}

async function getMessages(request, env, url) {
  const room = url.searchParams.get("room");
  if (!await validRoom(room, env, url)) return json({ error: "invalid_room" }, 400);
  const before = url.searchParams.get("before");
  const after = url.searchParams.get("after");
  if ((before !== null && after !== null) || [before, after].some(value =>
    value !== null && (!/^\d+$/.test(value) || !Number.isSafeInteger(Number(value))))) {
    return json({ error: "invalid_cursor" }, 400);
  }
  const ascending = after !== null;
  const clause = ascending ? "AND m.id > ?" : before !== null ? "AND m.id < ?" : "";
  const args = [room];
  if (after !== null || before !== null) args.push(Number(after ?? before));
  const { results } = await env.DISCUSSIONS.prepare(
    `${SELECT} WHERE m.room = ? ${clause} ORDER BY m.id ${ascending ? "ASC" : "DESC"} LIMIT ${PAGE_SIZE + 1}`,
  ).bind(...args).all();
  const hasMore = results.length > PAGE_SIZE;
  const messages = results.slice(0, PAGE_SIZE);
  if (!ascending) messages.reverse();
  return json({ messages, hasMore });
}

async function postMessage(request, env, url) {
  if (request.headers.get("Origin") !== url.origin ||
    request.headers.get("Sec-Fetch-Site") === "cross-site") {
    return json({ error: "origin_rejected" }, 403);
  }
  if (request.headers.get("Content-Type")?.split(";")[0].trim() !== "application/json") {
    return json({ error: "json_required" }, 415);
  }
  let input;
  try { input = await readBody(request); }
  catch (error) { return json({ error: error.message }, error.message === "too_large" ? 413 : 400); }
  if (!input || typeof input !== "object" || Array.isArray(input)) return json({ error: "invalid_message" }, 400);
  const { room, requestId } = input;
  const replyTo = input.replyTo ?? null;
  if (!validText(input.nickname, 32, true) || !validText(input.body, 1000) ||
    typeof requestId !== "string" || !UUID.test(requestId) ||
    (replyTo !== null && (!Number.isSafeInteger(replyTo) || replyTo < 1))) {
    return json({ error: "invalid_message" }, 400);
  }
  if (!await validRoom(room, env, url)) return json({ error: "invalid_room" }, 400);
  const nickname = input.nickname.trim();
  const body = input.body.trim();
  const db = env.DISCUSSIONS;
  const existing = await db.prepare("SELECT * FROM discussion_messages WHERE request_id = ?").bind(requestId).first();
  if (existing) {
    if (existing.room !== room || existing.nickname !== nickname || existing.body !== body || existing.reply_to !== replyTo) {
      return json({ error: "request_conflict" }, 409);
    }
    return json({ id: existing.id }, 200);
  }
  if (replyTo !== null && !await db.prepare("SELECT id FROM discussion_messages WHERE id = ? AND room = ?")
    .bind(replyTo, room).first()) return json({ error: "invalid_reply" }, 400);

  const now = Date.now();
  const ip = request.headers.get("CF-Connecting-IP") || "local";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${Math.floor(now / 86400000)}:${ip}`));
  const rateKey = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
  const ticket = crypto.randomUUID();
  // A single D1 transaction ties each accepted rate-limit ticket to exactly one insert.
  const result = await db.batch([
    db.prepare("DELETE FROM discussion_limits WHERE last_sent < ?").bind(now - 86400000),
    db.prepare(`INSERT INTO discussion_limits (rate_key, window_start, sent, last_sent, ticket)
      VALUES (?, ?, 1, ?, ?) ON CONFLICT(rate_key) DO UPDATE SET
      window_start = CASE WHEN window_start <= ? THEN excluded.window_start ELSE window_start END,
      sent = CASE WHEN window_start <= ? THEN 1 ELSE sent + 1 END,
      last_sent = excluded.last_sent, ticket = excluded.ticket
      WHERE last_sent <= ? AND (window_start <= ? OR sent < 6)`)
      .bind(rateKey, now, now, ticket, now - 60000, now - 60000, now - 5000, now - 60000),
    db.prepare(`INSERT INTO discussion_messages (room, nickname, body, reply_to, request_id, created_at)
      SELECT ?, ?, ?, ?, ?, ? WHERE EXISTS
      (SELECT 1 FROM discussion_limits WHERE rate_key = ? AND ticket = ?)
      ON CONFLICT(request_id) DO NOTHING RETURNING id`)
      .bind(room, nickname, body, replyTo, requestId, now, rateKey, ticket),
  ]);
  const saved = result[2].results[0];
  if (saved) return json({ id: saved.id }, 201);
  const duplicate = await db.prepare("SELECT id FROM discussion_messages WHERE request_id = ?").bind(requestId).first();
  if (duplicate) return json({ id: duplicate.id }, 200);
  return json({ error: "rate_limited" }, 429, { "Retry-After": "10" });
}

export async function onRequest({ request, env }) {
  if (!["GET", "POST"].includes(request.method)) return json({ error: "method_not_allowed" }, 405, { Allow: "GET, POST" });
  if (!env.DISCUSSIONS) return json({ error: "unavailable" }, 503);
  try {
    const url = new URL(request.url);
    return await (request.method === "GET" ? getMessages(request, env, url) : postMessage(request, env, url));
  } catch {
    return json({ error: "unavailable" }, 503);
  }
}
