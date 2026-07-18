/**
 * Node smoke checks for team/member content (no TS / Next required).
 * Run: node scripts/smoke-members.mjs
 *
 * Reads compiled-like plain objects by dynamic-importing TS via a
 * lightweight JSON dump from sibling .ts files is not available;
 * instead we re-validate the source files as text + a mirrored structure
 * check against exported shapes by parsing the module via Node --experimental
 * is avoided. We load the built content by evaluating the same invariants
 * against the TypeScript source strings and a minimal inline mirror of
 * critical public fields for kuang-xuan + placeholders.
 *
 * Primary path: read content/team/zh.ts + en.ts as UTF-8 text and assert
 * structure, counts, and privacy patterns.
 */

import { readFileSync, existsSync } from "node:fs";
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
    console.log(`OK   ${name}`);
  } else {
    console.error(`FAIL ${name}${detail ? `: ${detail}` : ""}`);
  }
}

const membersTsPath = join(root, "content", "members.ts");
const teamTypesPath = join(root, "content", "team", "types.ts");
const teamZhPath = join(root, "content", "team", "zh.ts");
const teamEnPath = join(root, "content", "team", "en.ts");
const teamIndexPath = join(root, "content", "team", "index.ts");

check("content/members.ts exists", existsSync(membersTsPath));
check("content/team/types.ts exists", existsSync(teamTypesPath));
check("content/team/zh.ts exists", existsSync(teamZhPath));
check("content/team/en.ts exists", existsSync(teamEnPath));
check("content/team/index.ts exists", existsSync(teamIndexPath));

const membersSrc = readFileSync(membersTsPath, "utf8");
const zhSrc = readFileSync(teamZhPath, "utf8");
const enSrc = readFileSync(teamEnPath, "utf8");
const indexSrc = readFileSync(teamIndexPath, "utf8");
const typesSrc = readFileSync(teamTypesPath, "utf8");

// MEMBER_SLUGS compatibility
check(
  "MEMBER_SLUGS has kuang-xuan",
  membersSrc.includes('"kuang-xuan"') || membersSrc.includes("'kuang-xuan'"),
);
check(
  "MEMBER_SLUGS has member-b",
  membersSrc.includes('"member-b"') || membersSrc.includes("'member-b'"),
);
check(
  "MEMBER_SLUGS has member-c",
  membersSrc.includes('"member-c"') || membersSrc.includes("'member-c'"),
);

// API exports
check("getMember exported", /export function getMember/.test(indexSrc));
check("getTeam exported", /export function getTeam/.test(indexSrc));
check("listMembers exported", /export function listMembers/.test(indexSrc));
check(
  "getters live in content/team (not circular re-export from members.ts)",
  /export function getMember/.test(indexSrc) &&
    /export function getTeam/.test(indexSrc) &&
    /export function listMembers/.test(indexSrc),
);

// Philosophy
for (const [label, src] of [
  ["zh", zhSrc],
  ["en", enSrc],
]) {
  check(`${label} philosophy Anticipate`, src.includes("Anticipate"));
  check(`${label} philosophy Connect`, src.includes("Connect"));
  check(`${label} philosophy Decide`, src.includes("Decide"));
}

// Capability bridge nodes (zh labels)
const bridgeNodesZh = [
  "业务问题",
  "数据理解",
  "模型判断",
  "产品设计",
  "系统实现",
  "决策行动",
];
for (const node of bridgeNodesZh) {
  check(`zh capability node: ${node}`, zhSrc.includes(node));
}

const bridgeNodesEn = [
  "Business Problem",
  "Data Understanding",
  "Model Judgment",
  "Product Design",
  "System Build",
  "Decision Action",
];
for (const node of bridgeNodesEn) {
  check(`en capability node: ${node}`, enSrc.includes(node));
}

/**
 * Count slug occurrences for members array entries.
 * @param {string} src
 * @param {string} slug
 */
function countSlug(src, slug) {
  const re = new RegExp(`slug:\\s*["']${slug}["']`, "g");
  return (src.match(re) || []).length;
}

for (const [label, src] of [
  ["zh", zhSrc],
  ["en", enSrc],
]) {
  const a = countSlug(src, "kuang-xuan");
  const b = countSlug(src, "member-b");
  const c = countSlug(src, "member-c");
  check(`${label} has 3 members`, a === 1 && b === 1 && c === 1, `kx=${a} b=${b} c=${c}`);
}

/**
 * Extract projects array block for kuang-xuan roughly by counting project slugs.
 * @param {string} src
 */
function countKuangProjects(src) {
  const projectSlugs = [
    "taac-2026",
    "a-share-agent",
    "news-recommendation",
    "cnki-pipeline",
    "customer-clustering",
  ];
  let n = 0;
  for (const s of projectSlugs) {
    if (src.includes(`slug: "${s}"`) || src.includes(`slug: '${s}'`)) n += 1;
  }
  return n;
}

const zhProjects = countKuangProjects(zhSrc);
const enProjects = countKuangProjects(enSrc);
check("zh kuang-xuan projects >= 4", zhProjects >= 4, `count=${zhProjects}`);
check("en kuang-xuan projects >= 4", enProjects >= 4, `count=${enProjects}`);
check("zh kuang-xuan projects === 5", zhProjects === 5, `count=${zhProjects}`);
check("en kuang-xuan projects === 5", enProjects === 5, `count=${enProjects}`);

// Education present for kuang-xuan
check("zh XMU education", zhSrc.includes("厦门大学") && zhSrc.includes("应用统计"));
check("zh SCU education", zhSrc.includes("四川大学") && zhSrc.includes("管理科学"));
check("en XMU education", enSrc.includes("Xiamen University"));
check("en SCU education", enSrc.includes("Sichuan University"));

// Roles
check("zh kuang role", zhSrc.includes("数据智能与模型策略"));
check("en kuang role", enSrc.includes("Data Intelligence & Modeling"));
check("zh member-b role Product Strategy-ish", zhSrc.includes("产品策略"));
check("en member-b role", enSrc.includes("Product Strategy"));
check("zh member-c role", zhSrc.includes("AI 工程") || zhSrc.includes("AI工程"));
check("en member-c role", enSrc.includes("AI Engineering"));

// Placeholders
check("zh bioComingSoon on B/C", (zhSrc.match(/bioComingSoon:\s*true/g) || []).length >= 2);
check("en bioComingSoon on B/C", (enSrc.match(/bioComingSoon:\s*true/g) || []).length >= 2);
check("zh coming soon label", zhSrc.includes("简历内容待补充"));
check("en coming soon label", enSrc.includes("Bio coming soon"));

// Outcome numbers from resume
check("zh 175 journals", zhSrc.includes("175"));
check("zh 百万", zhSrc.includes("百万"));
check("zh 9763", zhSrc.includes("9763"));
check("zh Top5", zhSrc.includes("Top5") || zhSrc.includes("Top 5"));
check("en 175 journals", enSrc.includes("175"));
check("en million-scale", /million/i.test(enSrc));
check("en 9763 or 9,763", enSrc.includes("9763") || enSrc.includes("9,763"));

// Skills categories
const skillIds = ["analytics", "stats", "ml", "ai-workflow", "data-eng"];
for (const id of skillIds) {
  check(`zh skill category ${id}`, zhSrc.includes(`id: "${id}"`) || zhSrc.includes(`id: '${id}'`));
  check(`en skill category ${id}`, enSrc.includes(`id: "${id}"`) || enSrc.includes(`id: '${id}'`));
}

// Awards
check("zh math competition", zhSrc.includes("数学竞赛") && zhSrc.includes("省一"));
check("zh stats modeling", zhSrc.includes("统计建模") && zhSrc.includes("省二"));
check("zh xuechuang", zhSrc.includes("学创杯"));
check("zh CET", zhSrc.includes("CET-4") && zhSrc.includes("CET-6"));

// Types mention privacy / public fields
check("types bioComingSoon field", typesSrc.includes("bioComingSoon"));
check("types TeamMember", typesSrc.includes("TeamMember"));

// --- Privacy: forbidden patterns must be ABSENT from team/member content ---
const privacyPatterns = [
  { name: "phone 188", re: /188/ },
  { name: "full phone 18885122003", re: /18885122003/ },
  { name: "DOB 2003.09", re: /2003\.09/ },
  { name: "户籍", re: /户籍/ },
  { name: "政治面貌", re: /政治面貌/ },
  { name: "共青团", re: /共青团/ },
  { name: "汉族 as ethnicity field context", re: /民族/ },
];

const contentBundle = [zhSrc, enSrc, membersSrc, typesSrc, indexSrc].join("\n");

// Placeholders must not invent phone/email fields
check(
  "placeholders have no phone field",
  !/phone\s*:/i.test(contentBundle) && !/tel\s*:/i.test(contentBundle),
);
check(
  "no private email field on members",
  !/email\s*:\s*["'][^"']+@/.test(zhSrc + enSrc),
);

for (const p of privacyPatterns) {
  // "民族" might be too aggressive if it appears in unrelated text — only fail if present
  const hit = p.re.test(contentBundle);
  check(`privacy absent: ${p.name}`, !hit, hit ? "found in content" : undefined);
}

// QQ personal email should not be member contact
check(
  "no personal QQ email in team content",
  !/2468857063@qq\.com/.test(contentBundle),
);

const failed = results.filter((r) => !r.ok).length;
if (failed > 0) {
  console.error(`\n${failed} check(s) failed of ${results.length}`);
  process.exit(1);
}

console.log(`\nAll ${results.length} smoke checks passed.`);
