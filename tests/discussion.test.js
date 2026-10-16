import assert from "node:assert/strict";
import { after, before, beforeEach, test } from "node:test";
import { readFile } from "node:fs/promises";
import { Miniflare, convertV4MiniflareOptions } from "miniflare";
import { onRequest } from "../functions/api/discussion.js";

let runtime;
let db;
let env;
let visitor = 0;
const origin = "https://example.com";

before(async () => {
  runtime = new Miniflare(convertV4MiniflareOptions({
      name: "test-discussions",
      modules: true,
      script: "export default { fetch() { return new Response('ok'); } };",
      compatibilityDate: "2026-10-01",
      d1Databases: ["DISCUSSIONS"],
  }));
  db = await runtime.getD1Database("DISCUSSIONS");
  const schema = await readFile(new URL("../migrations/0001_discussions.sql", import.meta.url), "utf8");
  for (const sql of schema.split(";").filter(value => value.trim())) await db.prepare(sql).run();
  env = { DISCUSSIONS: db, ASSETS: { fetch: async () => Response.json(["lobby", "/posts/example/", "/english/"]) } };
});
beforeEach(async () => {
  await db.batch([db.prepare("DELETE FROM discussion_messages"), db.prepare("DELETE FROM discussion_limits")]);
});
after(async () => { await runtime?.dispose(); });

function input(overrides = {}) {
  return { room: "lobby", nickname: "Reader", body: "Hello Brian", requestId: crypto.randomUUID(), ...overrides };
}
function post(data = input(), headers = {}) {
  return onRequest({ env, request: new Request(`${origin}/api/discussion`, {
    method: "POST", headers: { Origin: origin, "Content-Type": "application/json", "CF-Connecting-IP": `203.0.113.${++visitor}`, ...headers },
    body: JSON.stringify(data),
  }) });
}
function get(query = "room=lobby") {
  return onRequest({ env, request: new Request(`${origin}/api/discussion?${query}`) });
}

test("guests can post with an arbitrary nickname and read persistent messages", async () => {
  const response = await post(input({ nickname: "  Guest 42  ", body: "  Hello\nworld  " }));
  assert.equal(response.status, 201);
  const { messages } = await (await get()).json();
  assert.equal(messages[0].nickname, "Guest 42");
  assert.equal(messages[0].body, "Hello\nworld");
  assert.deepEqual((await (await get()).json()).messages, messages);
  assert.equal(response.headers.get("Cache-Control"), "no-store");
  assert.equal("request_id" in messages[0], false);
});

test("post rooms are isolated from the lobby and allow real non-post pages", async () => {
  await post(input({ room: "/posts/example/", body: "Post comment" }));
  await post(input({ room: "/english/", body: "English page" }));
  assert.equal((await (await get()).json()).messages.length, 0);
  assert.equal((await (await get("room=/posts/example/")).json()).messages[0].body, "Post comment");
  assert.equal((await get("room=/not-a-page/")).status, 400);
  assert.equal((await post(input({ room: "/not-a-page/" }))).status, 400);
});

test("replies include a quote and cannot reference another room", async () => {
  const { id } = await (await post()).json();
  assert.equal((await post(input({ replyTo: id }))).status, 201);
  const { messages } = await (await get()).json();
  assert.equal(messages[1].reply_nickname, "Reader");
  assert.equal(messages[1].reply_body, "Hello Brian");
  assert.equal((await post(input({ room: "/posts/example/", replyTo: id }))).status, 400);
  assert.equal((await post(input({ replyTo: 999999 }))).status, 400);
});

test("retries are idempotent while conflicting reuse is rejected", async () => {
  const message = input();
  const first = await (await post(message)).json();
  const second = await post(message);
  assert.equal(second.status, 200);
  assert.deepEqual(await second.json(), first);
  assert.equal((await (await get()).json()).messages.length, 1);
  assert.equal((await post({ ...message, body: "Changed" })).status, 409);
});

test("parallel submissions cannot bypass the per-visitor cooldown", async () => {
  const headers = { "CF-Connecting-IP": "203.0.113.250" };
  const responses = await Promise.all(Array.from({ length: 8 }, () => post(input(), headers)));
  assert.equal(responses.filter(response => response.status === 201).length, 1);
  assert.equal(responses.filter(response => response.status === 429).length, 7);
  assert.equal((await (await get()).json()).messages.length, 1);
});

test("a one-minute burst limit and expiring hashed rate records are enforced", async () => {
  const headers = { "CF-Connecting-IP": "203.0.113.251" };
  await post(input(), headers);
  await db.prepare("UPDATE discussion_limits SET sent = 6, last_sent = ?").bind(Date.now() - 6000).run();
  const blocked = await post(input(), headers);
  assert.equal(blocked.status, 429);
  assert.equal(blocked.headers.get("Retry-After"), "10");
  const row = await db.prepare("SELECT * FROM discussion_limits").first();
  assert.match(row.rate_key, /^[0-9a-f]{64}$/);
  assert.equal(JSON.stringify(row).includes("203.0.113"), false);
  await db.prepare("UPDATE discussion_limits SET window_start = ?, last_sent = ?").bind(Date.now() - 61000, Date.now() - 6000).run();
  assert.equal((await post(input(), headers)).status, 201);
  await db.prepare("UPDATE discussion_limits SET last_sent = ?").bind(Date.now() - 86400001).run();
  await post();
  assert.equal((await db.prepare("SELECT count(*) AS n FROM discussion_limits").first()).n, 1);
});

test("invalid names, bodies, request IDs, and reply IDs never reach storage", async () => {
  for (const change of [
    { nickname: " " }, { nickname: "a".repeat(33) }, { nickname: "a\nb" },
    { body: " " }, { body: "a".repeat(1001) }, { body: "\u0000" },
    { requestId: "not-a-uuid" }, { replyTo: "1" }, { replyTo: -1 }, { nickname: {} },
  ]) assert.equal((await post(input(change))).status, 400);
  assert.equal((await (await get()).json()).messages.length, 0);
});

test("untrusted markup is stored as plain text without interpretation", async () => {
  const body = "<img src=x onerror=alert(1)> & <script>alert(2)</script>";
  await post(input({ body, nickname: "<b>Guest</b>" }));
  const message = (await (await get()).json()).messages[0];
  assert.equal(message.body, body);
  assert.equal(message.nickname, "<b>Guest</b>");
});

test("cross-origin writes and non-JSON requests are rejected", async () => {
  assert.equal((await post(input(), { Origin: "https://unrelated.example" })).status, 403);
  assert.equal((await post(input(), { "Sec-Fetch-Site": "cross-site" })).status, 403);
  assert.equal((await post(input(), { "Content-Type": "text/plain" })).status, 415);
});

test("malformed JSON and oversized streamed bodies are rejected", async () => {
  for (const [body, status] of [["{", 400], ["null", 400], ["[]", 400], ["x".repeat(9000), 413]]) {
    const response = await onRequest({ env, request: new Request(`${origin}/api/discussion`, {
      method: "POST", headers: { Origin: origin, "Content-Type": "application/json" }, body,
    }) });
    assert.equal(response.status, status);
  }
});

test("cursor pagination preserves history and does not skip new messages", async () => {
  await db.batch(Array.from({ length: 65 }, (_, i) => db.prepare(
    "INSERT INTO discussion_messages (room, nickname, body, request_id, created_at) VALUES (?, ?, ?, ?, ?)",
  ).bind("lobby", "Reader", `Message ${i}`, crypto.randomUUID(), Date.now())));
  const latest = await (await get()).json();
  assert.equal(latest.messages.length, 30);
  assert.equal(latest.hasMore, true);
  assert.equal(latest.messages[0].body, "Message 35");
  const older = await (await get(`room=lobby&before=${latest.messages[0].id}`)).json();
  assert.equal(older.messages[0].body, "Message 5");
  const oldest = await (await get(`room=lobby&before=${older.messages[0].id}`)).json();
  assert.equal(oldest.messages.length, 5);
  assert.equal(oldest.hasMore, false);
  const newer = await (await get(`room=lobby&after=${oldest.messages.at(-1).id}`)).json();
  assert.equal(newer.messages[0].body, "Message 5");
  assert.equal(newer.hasMore, true);
  assert.equal((await get("room=lobby&after=1&before=2")).status, 400);
  assert.equal((await get("room=lobby&after=NaN")).status, 400);
  assert.equal((await get("room=lobby&before=99999999999999999999")).status, 400);
});

test("missing infrastructure and unsupported methods fail safely", async () => {
  assert.equal((await onRequest({ env: {}, request: new Request(`${origin}/api/discussion?room=lobby`) })).status, 503);
  assert.equal((await onRequest({ env, request: new Request(`${origin}/api/discussion`, { method: "DELETE" }) })).status, 405);
  const broken = { ...env, DISCUSSIONS: { prepare: () => { throw new Error("private database details"); } } };
  const response = await onRequest({ env: broken, request: new Request(`${origin}/api/discussion?room=lobby`) });
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { error: "unavailable" });
});
