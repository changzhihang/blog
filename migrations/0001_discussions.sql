CREATE TABLE IF NOT EXISTS discussion_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  room TEXT NOT NULL,
  nickname TEXT NOT NULL CHECK(length(nickname) BETWEEN 1 AND 32),
  body TEXT NOT NULL CHECK(length(body) BETWEEN 1 AND 1000),
  reply_to INTEGER REFERENCES discussion_messages(id) ON DELETE SET NULL,
  request_id TEXT NOT NULL UNIQUE,
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS discussion_room_id ON discussion_messages(room, id);

CREATE TABLE IF NOT EXISTS discussion_limits (
  rate_key TEXT PRIMARY KEY,
  window_start INTEGER NOT NULL,
  sent INTEGER NOT NULL,
  last_sent INTEGER NOT NULL,
  ticket TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS discussion_limit_expiry ON discussion_limits(last_sent);
