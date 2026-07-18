/**
 * Node smoke checks for locale path helpers (no TS / Next required).
 * Run: node scripts/smoke-i18n.mjs
 */

/** @typedef {"zh" | "en"} Locale */

/**
 * @param {string} path
 * @returns {string}
 */
function normalizePath(path) {
  if (!path || path === "/") return "/";
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  return withSlash.replace(/\/{2,}/g, "/");
}

/**
 * @param {Locale} locale
 * @param {string} path
 * @returns {string}
 */
function localePath(locale, path) {
  const p = normalizePath(path);
  if (locale === "zh") return p;
  if (p === "/") return "/en";
  return `/en${p}`;
}

/**
 * @param {string} pathname
 * @returns {string}
 */
function stripLocalePrefix(pathname) {
  const p = normalizePath(pathname);
  if (p === "/en") return "/";
  if (p.startsWith("/en/")) {
    const rest = p.slice(3);
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return p;
}

/**
 * @param {string} pathname
 * @param {Locale} target
 * @returns {string}
 */
function switchLocalePath(pathname, target) {
  return localePath(target, stripLocalePrefix(pathname));
}

/**
 * @param {string} pathname
 * @returns {Locale}
 */
function localeFromPathname(pathname) {
  const p = normalizePath(pathname);
  if (p === "/en" || p.startsWith("/en/")) return "en";
  return "zh";
}

/**
 * @param {string} value
 * @returns {value is Locale}
 */
function isLocale(value) {
  return value === "zh" || value === "en";
}

/** @type {{ name: string; actual: unknown; expected: unknown }[]} */
const cases = [
  {
    name: 'localePath("en","/project")',
    actual: localePath("en", "/project"),
    expected: "/en/project",
  },
  {
    name: 'localePath("zh","/project")',
    actual: localePath("zh", "/project"),
    expected: "/project",
  },
  {
    name: 'localePath("en","/")',
    actual: localePath("en", "/"),
    expected: "/en",
  },
  {
    name: 'localePath("zh","/")',
    actual: localePath("zh", "/"),
    expected: "/",
  },
  {
    name: 'localePath("en","/team/kuang-xuan")',
    actual: localePath("en", "/team/kuang-xuan"),
    expected: "/en/team/kuang-xuan",
  },
  {
    name: 'switchLocalePath("/project","en")',
    actual: switchLocalePath("/project", "en"),
    expected: "/en/project",
  },
  {
    name: 'switchLocalePath("/en/project","zh")',
    actual: switchLocalePath("/en/project", "zh"),
    expected: "/project",
  },
  {
    name: 'switchLocalePath("/en/team/member-b","zh")',
    actual: switchLocalePath("/en/team/member-b", "zh"),
    expected: "/team/member-b",
  },
  {
    name: 'switchLocalePath("/team/member-c","en")',
    actual: switchLocalePath("/team/member-c", "en"),
    expected: "/en/team/member-c",
  },
  {
    name: 'localeFromPathname("/en/about")',
    actual: localeFromPathname("/en/about"),
    expected: "en",
  },
  {
    name: 'localeFromPathname("/contact")',
    actual: localeFromPathname("/contact"),
    expected: "zh",
  },
  {
    name: 'localeFromPathname("/en")',
    actual: localeFromPathname("/en"),
    expected: "en",
  },
  {
    name: 'stripLocalePrefix("/en/team")',
    actual: stripLocalePrefix("/en/team"),
    expected: "/team",
  },
  {
    name: 'stripLocalePrefix("/team")',
    actual: stripLocalePrefix("/team"),
    expected: "/team",
  },
  {
    name: 'isLocale("en")',
    actual: isLocale("en"),
    expected: true,
  },
  {
    name: 'isLocale("fr")',
    actual: isLocale("fr"),
    expected: false,
  },
];

let failed = 0;
for (const c of cases) {
  const ok = c.actual === c.expected;
  if (!ok) {
    failed += 1;
    console.error(
      `FAIL ${c.name}: got ${JSON.stringify(c.actual)}, expected ${JSON.stringify(c.expected)}`,
    );
  } else {
    console.log(`OK   ${c.name} === ${JSON.stringify(c.expected)}`);
  }
}

if (failed > 0) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}

console.log(`\nAll ${cases.length} smoke checks passed.`);
