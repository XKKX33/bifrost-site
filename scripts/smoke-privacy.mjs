/**
 * Privacy gate: fail if private PII patterns appear in site sources.
 * Scan roots: content/, components/, app/
 * Run: node scripts/smoke-privacy.mjs
 *
 * Forbidden (exact task patterns):
 * - 188\d{8} (CN mobile fragment)
 * - 18885122003
 * - 2003.09
 * - 户籍 / 政治面貌 / 共青团
 * - 2468857063@qq.com
 */

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

/** @type {{ name: string; re: RegExp }[]} */
const FORBIDDEN = [
  { name: "phone fragment 188", re: /188/ },
  { name: "full phone 18885122003", re: /18885122003/ },
  { name: "DOB 2003.09", re: /2003\.09/ },
  { name: "户籍", re: /户籍/ },
  { name: "政治面貌", re: /政治面貌/ },
  { name: "共青团", re: /共青团/ },
  { name: "QQ id 2468857063", re: /2468857063/ },
];

const SCAN_ROOTS = ["content", "components", "app"];
const EXT_OK = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".css",
  ".md",
  ".json",
]);

/**
 * @param {string} dir
 * @param {string[]} acc
 * @returns {string[]}
 */
function walk(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    if (
      name === "node_modules" ||
      name === ".next" ||
      name === "out" ||
      name === "favicon.ico"
    ) {
      continue;
    }
    const full = join(dir, name);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      walk(full, acc);
    } else {
      const lower = name.toLowerCase();
      const dot = lower.lastIndexOf(".");
      const ext = dot >= 0 ? lower.slice(dot) : "";
      if (EXT_OK.has(ext)) acc.push(full);
    }
  }
  return acc;
}

/** @type {string[]} */
let files = [];
for (const rel of SCAN_ROOTS) {
  files = files.concat(walk(join(root, rel)));
}

if (files.length === 0) {
  console.error("FAIL no files found under content/, components/, or app/");
  process.exit(1);
}

console.log(
  `Scanning ${files.length} files under content/ + components/ + app/…`,
);

/** @type {{ pattern: string; file: string; line: number; snippet: string }[]} */
const hits = [];

for (const file of files) {
  let text;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    for (const p of FORBIDDEN) {
      if (p.re.test(line)) {
        hits.push({
          pattern: p.name,
          file: relative(root, file).replace(/\\/g, "/"),
          line: i + 1,
          snippet: line.trim().slice(0, 120),
        });
      }
    }
  }
}

if (hits.length > 0) {
  console.error(`\nPRIVACY FAIL — ${hits.length} hit(s):\n`);
  for (const h of hits) {
    console.error(`  [${h.pattern}] ${h.file}:${h.line}`);
    console.error(`    ${h.snippet}`);
  }
  process.exit(1);
}

console.log(
  "OK   no forbidden privacy patterns in content/, components/, or app/",
);
console.log(`\nAll privacy checks passed (${files.length} files).`);
