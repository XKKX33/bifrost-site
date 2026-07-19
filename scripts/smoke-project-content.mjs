/**
 * Node smoke checks for BIFROST project content modules (no TS loader).
 * Reads source files and asserts structural / key-value contracts.
 * Run: node scripts/smoke-project-content.mjs
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const projectDir = join(root, "content", "project");

/**
 * @param {string} rel
 * @returns {string}
 */
function read(rel) {
  return readFileSync(join(projectDir, rel), "utf8");
}

/**
 * @param {string} name
 * @param {boolean} ok
 * @param {string} [detail]
 */
function check(name, ok, detail = "") {
  if (ok) {
    console.log(`OK   ${name}${detail ? ` — ${detail}` : ""}`);
    return true;
  }
  console.error(`FAIL ${name}${detail ? ` — ${detail}` : ""}`);
  return false;
}

/**
 * Count loop step objects: blocks with `step: N` inside loopSteps array.
 * @param {string} src
 * @returns {number}
 */
function countLoopSteps(src) {
  const m = src.match(/loopSteps:\s*\[([\s\S]*?)\],\s*\n\s*metrics:/);
  if (!m) return 0;
  const body = m[1];
  const steps = body.match(/\bstep:\s*\d+/g);
  return steps ? steps.length : 0;
}

/**
 * Count top-level role objects in roles: [ ... ] (id: "manager" etc.).
 * @param {string} src
 * @returns {number}
 */
function countRoles(src) {
  const m = src.match(/roles:\s*\[([\s\S]*?)\],\s*\n\s*incident:/);
  if (!m) return 0;
  const body = m[1];
  const ids = body.match(/\bid:\s*"(manager|quality|production|planning)"/g);
  return ids ? ids.length : 0;
}

/**
 * @param {string} src
 * @returns {number | null}
 */
function trustThreshold(src) {
  const m = src.match(/trustThreshold:\s*([0-9.]+)/);
  if (!m) return null;
  return Number(m[1]);
}

/**
 * @param {string} src
 * @returns {boolean}
 */
function mentionsFeishu(src) {
  return /飞书|Feishu|Aily/.test(src);
}

/**
 * @param {string} src
 * @returns {boolean}
 */
function hasProjectedDisclaimer(src) {
  return (
    /方案预期|projected/i.test(src) &&
    /disclaimer|metricsNote|kind:\s*"projected"/.test(src)
  );
}

/**
 * @param {string} src
 * @returns {boolean}
 */
function hasMockIds(src) {
  return (
    /L02/.test(src) &&
    /B015/.test(src) &&
    /O003/.test(src) &&
    /(产品A|Product A)/.test(src)
  );
}

/**
 * @param {string} src
 * @returns {boolean}
 */
function hasFourRoleIds(src) {
  return (
    /id:\s*"manager"/.test(src) &&
    /id:\s*"quality"/.test(src) &&
    /id:\s*"production"/.test(src) &&
    /id:\s*"planning"/.test(src)
  );
}

const files = {
  types: read("types.ts"),
  zh: read("zh.ts"),
  en: read("en.ts"),
  index: read("index.ts"),
};

/** @type {boolean[]} */
const results = [];

results.push(
  check(
    "types.ts exists and exports ProjectContent",
    /export type ProjectContent/.test(files.types),
  ),
);

results.push(
  check(
    "index.ts exports getProject(locale)",
    /export function getProject\s*\(\s*locale:\s*Locale\s*\)/.test(files.index),
  ),
);

for (const locale of /** @type {const} */ (["zh", "en"])) {
  const src = files[locale];
  const steps = countLoopSteps(src);
  const roles = countRoles(src);
  const thr = trustThreshold(src);

  results.push(
    check(
      `${locale}: loopSteps >= 5`,
      steps >= 5,
      `got ${steps}`,
    ),
  );
  results.push(
    check(
      `${locale}: roles === 4`,
      roles === 4,
      `got ${roles}`,
    ),
  );
  results.push(
    check(
      `${locale}: metrics.trustThreshold === 0.85`,
      thr === 0.85,
      `got ${thr}`,
    ),
  );
  results.push(
    check(`${locale}: Feishu / 飞书 / Aily mentioned`, mentionsFeishu(src)),
  );
  results.push(
    check(
      `${locale}: projected metrics disclaimer present`,
      hasProjectedDisclaimer(src),
    ),
  );
  results.push(
    check(`${locale}: mock ids 产品A/L02/B015/O003`, hasMockIds(src)),
  );
  results.push(
    check(
      `${locale}: four role ids manager/quality/production/planning`,
      hasFourRoleIds(src),
    ),
  );
  results.push(
    check(
      `${locale}: dualEngine pillars present`,
      /dualEngine:/.test(src) && /pillars:/.test(src),
    ),
  );
  results.push(
    check(
      `${locale}: problems has 3 items`,
      (src.match(/\bid:\s*"(riskLag|infoFriction|homogenizedDecision)"/g) || [])
        .length === 3,
    ),
  );
  results.push(
    check(
      `${locale}: incident title present`,
      /incident:/.test(src) &&
        /(产品A不良率持续升高|Product A defect rate keeps rising)/.test(src),
    ),
  );
}

// Both locales must exist as distinct modules
results.push(
  check(
    "both locales loaded",
    files.zh.includes("BIFROST") && files.en.includes("BIFROST"),
  ),
);

const failed = results.filter((ok) => !ok).length;
const total = results.length;

if (failed > 0) {
  console.error(`\n${failed}/${total} check(s) failed`);
  process.exit(1);
}

console.log(`\nAll ${total} project content smoke checks passed.`);
