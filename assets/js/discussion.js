(() => {
  const safeStorage = (store, key, value) => {
    try {
      if (value === undefined) return window[store].getItem(key) || "";
      window[store].setItem(key, value);
    } catch { /* Storage may be disabled in private browsing. */ }
    return "";
  };

  for (const root of document.querySelectorAll("[data-discussion]")) {
    const labels = JSON.parse(root.dataset.labels);
    const room = root.dataset.room;
    const form = root.querySelector("[data-form]");
    const nickname = form.elements.nickname;
    const body = form.elements.body;
    const list = root.querySelector("[data-messages]");
    const empty = root.querySelector("[data-empty]");
    const status = root.querySelector("[data-status]");
    const connection = root.querySelector("[data-connection]");
    const older = root.querySelector("[data-older]");
    const refresh = root.querySelector("[data-refresh]");
    const send = root.querySelector("[data-send]");
    const replyBox = root.querySelector("[data-reply]");
    const draftKey = `discussion-draft:${room}`;
    const messages = new Map();
    let replyTo = null;
    let attempt = null;
    let initialized = false;
    let visible = false;
    let timer;
    let loading;
    let failures = 0;
    let sending = false;

    nickname.value = safeStorage("localStorage", "discussion-nickname");
    body.value = safeStorage("sessionStorage", draftKey);
    nickname.addEventListener("input", () => safeStorage("localStorage", "discussion-nickname", nickname.value));
    body.addEventListener("input", () => safeStorage("sessionStorage", draftKey, body.value));

    const setStatus = (message, error = false) => {
      status.textContent = message;
      status.dataset.error = String(error);
    };
    const cancelReply = () => { replyTo = null; replyBox.hidden = true; };
    root.querySelector("[data-cancel]").addEventListener("click", cancelReply);

    function messageElement(message) {
      const item = document.createElement("li");
      item.className = "discussion-message";
      const head = document.createElement("div");
      head.className = "discussion-message-head";
      const name = document.createElement("bdi");
      name.className = "discussion-message-name";
      name.textContent = message.nickname;
      const time = document.createElement("time");
      const date = new Date(message.created_at);
      time.dateTime = date.toISOString();
      time.textContent = date.toLocaleString(document.documentElement.lang || undefined, {
        month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
      });
      time.title = date.toLocaleString();
      head.append(name, time);
      item.append(head);
      if (message.reply_nickname) {
        const quote = document.createElement("blockquote");
        quote.className = "discussion-quote";
        quote.dir = "auto";
        quote.textContent = `${message.reply_nickname}: ${message.reply_body}`;
        item.append(quote);
      }
      const text = document.createElement("p");
      text.className = "discussion-message-body";
      text.dir = "auto";
      // Visitor content is always rendered as text, never as HTML or Markdown.
      text.textContent = message.body;
      const reply = document.createElement("button");
      reply.type = "button";
      reply.className = "discussion-message-reply";
      reply.textContent = labels.reply;
      reply.addEventListener("click", () => {
        if (sending) return;
        replyTo = message.id;
        replyBox.hidden = false;
        root.querySelector("[data-reply-label]").textContent = `${labels.replying} ${message.nickname}`;
        body.focus();
      });
      item.append(text, reply);
      return item;
    }

    function render(incoming, mode) {
      const bottom = list.scrollHeight - list.scrollTop - list.clientHeight < 70;
      const oldHeight = list.scrollHeight;
      const oldTop = list.scrollTop;
      const changed = incoming.some(message => !messages.has(message.id));
      for (const message of incoming) messages.set(message.id, message);
      if (changed) {
        const fragment = document.createDocumentFragment();
        for (const message of [...messages.values()].sort((a, b) => a.id - b.id)) fragment.append(messageElement(message));
        list.replaceChildren(fragment);
        if (mode === "older") list.scrollTop = oldTop + list.scrollHeight - oldHeight;
        else if (bottom) list.scrollTop = list.scrollHeight;
        else list.scrollTop = oldTop;
      }
      empty.hidden = messages.size > 0;
      empty.textContent = labels.empty;
    }

    function schedule() {
      clearTimeout(timer);
      if (visible && !document.hidden && navigator.onLine) {
        timer = setTimeout(() => load(), Math.min(10000 * 2 ** failures, 60000));
      }
    }

    function load(mode = "new") {
      if (loading) return loading;
      loading = (async () => {
        older.disabled = true;
        refresh.disabled = true;
        try {
          const query = new URLSearchParams({ room });
          const ids = [...messages.keys()];
          if (mode === "older" && ids.length) query.set("before", Math.min(...ids));
          else if (initialized) query.set("after", ids.length ? Math.max(...ids) : 0);
          const response = await fetch(`/api/discussion?${query}`, {
            cache: "no-store", signal: AbortSignal.timeout(12000),
          });
          if (!response.ok) throw new Error("unavailable");
          const data = await response.json();
          if (mode === "older" || !initialized) older.hidden = !data.hasMore;
          render(data.messages, mode);
          initialized = true;
          failures = 0;
          connection.textContent = labels.updated;
        } catch {
          failures += 1;
          connection.textContent = labels.unavailable;
          if (!messages.size) empty.textContent = labels.unavailable;
        } finally {
          older.disabled = false;
          refresh.disabled = false;
          loading = null;
          schedule();
        }
      })();
      return loading;
    }

    form.addEventListener("submit", async event => {
      event.preventDefault();
      if (sending) return;
      const payload = { room, nickname: nickname.value.trim(), body: body.value.trim(), replyTo };
      if (!payload.nickname || !payload.body) { setStatus(labels.invalid_message, true); return; }
      const signature = JSON.stringify(payload);
      if (attempt?.signature !== signature) attempt = { signature, id: crypto.randomUUID() };
      payload.requestId = attempt.id;
      sending = true;
      send.disabled = true;
      nickname.readOnly = body.readOnly = true;
      setStatus(labels.sending);
      try {
        const response = await fetch("/api/discussion", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload), signal: AbortSignal.timeout(12000),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "failed");
        safeStorage("localStorage", "discussion-nickname", payload.nickname);
        safeStorage("sessionStorage", draftKey, "");
        body.value = "";
        attempt = null;
        cancelReply();
        setStatus(labels.sent);
        if (loading) await loading;
        await load();
        list.scrollTop = list.scrollHeight;
      } catch (error) {
        setStatus(labels[error.message] || labels.failed, true);
      } finally {
        sending = false;
        send.disabled = false;
        nickname.readOnly = body.readOnly = false;
      }
    });

    older.addEventListener("click", () => load("older"));
    refresh.addEventListener("click", () => load());
    document.addEventListener("visibilitychange", () => {
      clearTimeout(timer);
      if (!document.hidden && visible) load();
    });
    window.addEventListener("online", () => { if (visible && !document.hidden) load(); });
    window.addEventListener("offline", () => { clearTimeout(timer); connection.textContent = labels.unavailable; });
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (visible && !document.hidden) load();
      else clearTimeout(timer);
    }, { rootMargin: "120px" });
    observer.observe(root);
  }
})();
