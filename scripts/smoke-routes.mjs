/**
 * Assert required route/component files + structural markers.
 * Run: node scripts/smoke-routes.mjs
 *
 * Checks:
 * - required page/component files exist
 * - HomePage has data-section 02–10
 * - RoleSimulator has data-testid="role-simulator" and aria-selected
 * - site-contact has kekeyee@outlook.com
 * - project zh has 0.85 and 方案预期
 */

import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

/** @type {{ name: string; ok: boolean; detail?: string }[]} */
const results = [];

/**
 * @param {string} name
 * @param {boolean} ok
 * @param {string} [detail]
 */
function check(name, ok, detail) {
  results.push({ name, ok, detail });
  if (ok) {
    console.log(`OK   ${name}${detail ? ` — ${detail}` : ""}`);
  } else {
    console.error(`FAIL ${name}${detail ? `: ${detail}` : ""}`);
  }
}

/**
 * @param {string} rel
 * @returns {boolean}
 */
function hasFile(rel) {
  return existsSync(join(root, rel));
}

/**
 * @param {string} rel
 * @returns {string}
 */
function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

// ——— Required page files ———
const routeFiles = [
  "app/page.tsx",
  "app/en/page.tsx",
  "app/project/page.tsx",
  "app/en/project/page.tsx",
  "app/team/page.tsx",
  "app/en/team/page.tsx",
  "app/team/[slug]/page.tsx",
  "app/en/team/[slug]/page.tsx",
  "app/about/page.tsx",
  "app/en/about/page.tsx",
  "app/contact/page.tsx",
  "app/en/contact/page.tsx",
  "app/layout.tsx",
  "app/en/layout.tsx",
];

for (const rel of routeFiles) {
  check(`route file: ${rel}`, hasFile(rel));
}

// ——— Required content modules ———
const contentFiles = [
  "content/i18n/index.ts",
  "content/i18n/zh.ts",
  "content/i18n/en.ts",
  "content/project/index.ts",
  "content/project/zh.ts",
  "content/project/en.ts",
  "content/team/index.ts",
  "content/team/zh.ts",
  "content/team/en.ts",
  "content/about/index.ts",
  "content/about/zh.ts",
  "content/about/en.ts",
  "content/members.ts",
  "content/site-contact.ts",
];

for (const rel of contentFiles) {
  check(`content file: ${rel}`, hasFile(rel));
}

// ——— Required components ———
const componentFiles = [
  "components/home/HomePage.tsx",
  "components/project/ProjectPage.tsx",
  "components/project/RoleSimulator.tsx",
  "components/team/TeamPage.tsx",
  "components/team/MemberPage.tsx",
  "components/about/AboutView.tsx",
  "components/contact/ContactView.tsx",
  "components/chrome/AppChrome.tsx",
];

for (const rel of componentFiles) {
  check(`component: ${rel}`, hasFile(rel));
}

// ——— HomePage data-section 02–10 ———
const homeSrc = read("components/home/HomePage.tsx");
for (let n = 2; n <= 10; n += 1) {
  const id = String(n).padStart(2, "0");
  const re = new RegExp(`data-section=["']${id}["']`);
  check(`HomePage data-section="${id}"`, re.test(homeSrc));
}

// ——— RoleSimulator markers ———
const roleSimSrc = read("components/project/RoleSimulator.tsx");
check(
  'RoleSimulator data-testid="role-simulator"',
  /data-testid=["']role-simulator["']/.test(roleSimSrc),
);
check(
  "RoleSimulator aria-selected",
  /aria-selected/.test(roleSimSrc),
);

// ——— Content getters (source-level) ———
const getterChecks = [
  { file: "content/i18n/index.ts", re: /export function getUi\s*\(/ },
  { file: "content/project/index.ts", re: /export function getProject\s*\(/ },
  { file: "content/team/index.ts", re: /export function getTeam\s*\(/ },
  { file: "content/team/index.ts", re: /export function getMember\s*\(/ },
  { file: "content/team/index.ts", re: /export function listMembers\s*\(/ },
  { file: "content/about/index.ts", re: /export function getAbout\s*\(/ },
  { file: "content/site-contact.ts", re: /export function getContact\s*\(/ },
  { file: "content/site-contact.ts", re: /export function getTeamEmail\s*\(/ },
];
for (const g of getterChecks) {
  check(`getter ${g.file}: ${g.re.source}`, g.re.test(read(g.file)));
}

// ——— site-contact team email ———
const contactSrc = read("content/site-contact.ts");
check(
  "site-contact has kekeyee@outlook.com",
  /kekeyee@outlook\.com/.test(contactSrc),
);

// ——— project zh metrics markers ———
const projectZh = read("content/project/zh.ts");
check("project zh has 0.85", /0\.85/.test(projectZh));
check("project zh has 方案预期", /方案预期/.test(projectZh));

// ——— BIFROST presence (both locales) ———
const projectEn = read("content/project/en.ts");
check("BIFROST in project zh", /BIFROST/.test(projectZh));
check("BIFROST in project en", /BIFROST/.test(projectEn));

// ——— kuang-xuan slug ———
const membersSrc = read("content/members.ts");
check(
  "kuang-xuan slug in members",
  /kuang-xuan/.test(membersSrc),
);

const failed = results.filter((r) => !r.ok).length;
if (failed > 0) {
  console.error(`\n${failed} check(s) failed of ${results.length}`);
  process.exit(1);
}

console.log(`\nAll ${results.length} route smoke checks passed.`);
