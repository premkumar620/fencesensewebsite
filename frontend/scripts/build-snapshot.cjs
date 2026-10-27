const fs = require("fs");
const path = require("path");
const vm = require("vm");

const frontendRoot = path.join(__dirname, "..");
const repoRoot = path.join(frontendRoot, "..");
const dataPath = path.join(frontendRoot, "src", "data.js");
const detailPath = path.join(frontendRoot, "src", "detailContent.js");

let dataCode = fs.readFileSync(dataPath, "utf8").replace(/^export /gm, "");

let detailCode = fs.readFileSync(detailPath, "utf8");
detailCode = detailCode.replace(/^export const detailContent = /m, "const detailContent = ");
detailCode = detailCode.replace(/^export function[\s\S]*/m, "");

const sandbox = { globalThis: {}, Array, String, Object, JSON, Math, RegExp, encodeURIComponent: encodeURIComponent };
sandbox.globalThis = sandbox;

vm.runInNewContext(
  `${dataCode}\n${detailCode}\n;globalThis.__snapshot = { services, solutions, stats, testimonials, posts, offerings, socials, partnerLogos, customerLogos, offices, phone, email, cin, detailContent };`,
  sandbox,
);

const outPath = path.join(repoRoot, "backend", "seed_data", "snapshot.json");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(sandbox.__snapshot, null, 2));
console.log("Wrote", outPath);
