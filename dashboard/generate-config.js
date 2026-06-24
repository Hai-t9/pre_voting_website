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

// Use SITE_URL from env if available, otherwise default to localhost
const siteUrl = env["NEXT_PUBLIC_SITE_URL"] || "http://localhost:3000";

const output = `// dashboard/config.js — auto-generated from .env.local
// Do NOT edit manually. Run: npm run dashboard:config

window.API_URL = ${JSON.stringify(`${siteUrl}/api/dashboard`)};
`;

fs.writeFileSync(path.join(__dirname, "config.js"), output);
console.log(
  "✅ dashboard/config.js generated with API_URL =",
  `${siteUrl}/api/dashboard`,
);
