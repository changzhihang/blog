import { readFile, writeFile } from "node:fs/promises";

const token = process.env.CLOUDFLARE_API_TOKEN;
const account = process.env.CLOUDFLARE_ACCOUNT_ID;
if (!token || !account) throw new Error("Cloudflare credentials are required.");
const base = `https://api.cloudflare.com/client/v4/accounts/${account}`;

async function api(path, method = "GET", body) {
  const response = await fetch(`${base}${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    const codes = (data.errors || []).map(error => error.code).join(", ");
    throw new Error(`Cloudflare ${method} ${path.split("?")[0]} failed (${response.status}; ${codes}). Ensure the deployment token has Account D1 Edit and Cloudflare Pages Edit permissions.`);
  }
  return data.result;
}

const config = JSON.parse(await readFile("wrangler.json", "utf8"));
const binding = config.d1_databases[0];
if (process.env.GITHUB_REF_NAME && process.env.GITHUB_REF_NAME !== "main") binding.database_name += "-preview";
const databases = await api(`/d1/database?name=${encodeURIComponent(binding.database_name)}&per_page=100`);
const database = databases.find(item => item.name === binding.database_name) ||
  await api("/d1/database", "POST", { name: binding.database_name });
binding.database_id = database.uuid;
const schema = await readFile("migrations/0001_discussions.sql", "utf8");
const result = await api(`/d1/database/${database.uuid}/query`, "POST", { sql: schema });
if (result.some(item => item.success === false)) throw new Error("The discussion schema could not be applied.");
await writeFile("wrangler.json", `${JSON.stringify(config, null, 2)}\n`);
console.log(`Discussion database ready: ${binding.database_name}`);
