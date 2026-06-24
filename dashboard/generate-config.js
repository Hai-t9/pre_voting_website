// dashboard/generate-config.js
// Reads .env.local and generates dashboard/config.js
// Run: node dashboard/generate-config.js
// Or:  npm run dashboard:config

const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "..", ".env.local");
const env = fs
  .readFileSync(envPath, "utf-8")
  .split("\n")
  .filter((l) => l.trim() && !l.startsWith("#"))
  .reduce((acc, line) => {
    const [key, ...rest] = line.split("=");
    acc[key.trim()] = rest.join("=").trim();
    return acc;
  }, {});

const url = env["NEXT_PUBLIC_SUPABASE_URL"];
const key = env["NEXT_PUBLIC_SUPABASE_ANON_KEY"];

if (!url || !key) {
  console.error("❌ NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY not found in .env.local");
  process.exit(1);
}

const output = `// dashboard/config.js — auto-generated from .env.local
// Do NOT edit manually. Run: npm run dashboard:config
// This file is gitignored — never commit real credentials.

window.SUPABASE_URL      = ${JSON.stringify(url)};
window.SUPABASE_ANON_KEY = ${JSON.stringify(key)};
`;

fs.writeFileSync(path.join(__dirname, "config.js"), output);
console.log("✅ dashboard/config.js generated from .env.local");
