# Guest discussions

Cloudflare Pages Functions handles `/api/discussion`; a Cloudflare D1 database stores public messages. Each regular Hugo page has a room shared by its translations. A floating button opens the shared `lobby` room in a compact popup on any page. Article comments stay collapsed until the button beneath the article is clicked. Other requests remain static through `static/_routes.json`.

Visitors choose a nickname without an account. Names are not verified identities, including names matching the site author. No email address, password, or raw IP address is stored in the discussion database. The server stores an expiring hash derived from the connection IP and UTC day for rate limits. Cloudflare may separately retain platform request logs.

## Deployment

The existing GitHub Actions deployment uses `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`. The token needs **Account / D1 / Edit** and **Account / Cloudflare Pages / Edit** for the site's account. Database provisioning is idempotent and fails before deployment if permission is missing. Main uses `blogofbrian-discussions`; manual branch previews use `blogofbrian-discussions-preview` and do not touch production messages. The checked-in database ID is a local placeholder; CI replaces it after resolving the remote database by name.

Hugo generates `/discussion-rooms.json` as an allowlist of existing page rooms. New articles automatically receive a comment button and collapsible form. Links ending in `#public-chat` or `#comments` open the corresponding panel. Deployments and schema initialization preserve existing messages. Chinese copy belongs in `i18n/zh.toml`; executable source and comments use English.

## Local development

```sh
npm ci
npm test
hugo --gc --minify
npx wrangler d1 execute DISCUSSIONS --local --file migrations/0001_discussions.sql
npm run dev
```

The browser checks for new messages every 10 seconds while the panel is open and visible. It pauses when panels are closed or tabs are hidden, retries failed reads with backoff, and preserves unsent drafts in session storage. Closing a panel keeps its conversation and draft intact. Nicknames persist in local storage when available. Messages are rendered with `textContent`. The API enforces size limits, same-origin JSON writes, room validation, idempotent retries, and a transactional limit of one message every 5 seconds and at most 6 messages per minute per IP-derived key. These basic limits are not a complete anti-bot service; Cloudflare security controls can be tightened if abuse occurs.

## Moderation and recovery

The author can reply through the same public form without signing in. In Cloudflare's **Workers & Pages → D1 → blogofbrian-discussions → Console**, review and delete unwanted messages by their exact IDs:

```sql
SELECT id, room, nickname, body, created_at
FROM discussion_messages ORDER BY id DESC LIMIT 100;

DELETE FROM discussion_messages WHERE id = 123;
```

Deletion clears references from replies through `ON DELETE SET NULL`. Already open pages refresh newly added messages; reload a page to remove an already-rendered deleted message. Use Cloudflare D1 Time Travel for database recovery according to the account's retention plan. No public moderation endpoint or administrator credential is shipped to browsers.

References: [Pages D1 bindings](https://developers.cloudflare.com/pages/functions/bindings/#d1-databases), [Pages routing](https://developers.cloudflare.com/pages/functions/routing/), [D1 Time Travel](https://developers.cloudflare.com/d1/reference/time-travel/).
