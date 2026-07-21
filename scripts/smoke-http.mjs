/**
 * HTTP smoke: serve production build and fetch key routes.
 *
 * Strategy:
 * 1. Prefer `npx next start -p 3456` when a default (non-export) `.next` build exists.
 * 2. Else if `out/` exists (GitHub Pages static export), use `npx serve out -l 3456`.
 * 3. Else: document fallback — static file checks under out/ only (or fail if neither).
 *
 * Routes: /, /project, /team, /team/kuang-xuan, /about, /contact, /en, /en/project
 * Assert HTTP 200 + key strings (BIFROST | BIFROST | etc).
 *
 * Run: node scripts/smoke-http.mjs
 */

import { spawn } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const PORT = 3456;
const BASE = `http://127.0.0.1:${PORT}`;

/** @type {{ path: string; needles: string[] }[]} */
const ROUTES = [
  { path: "/", needles: ["BIFROST"] },
  { path: "/project", needles: ["BIFROST"] },
  { path: "/team", needles: ["BIFROST"] },
  { path: "/team/kuang-xuan", needles: ["BIFROST"] },
  { path: "/about", needles: ["BIFROST"] },
  { path: "/contact", needles: ["BIFROST", "kekeyee@outlook.com"] },
  { path: "/en", needles: ["BIFROST"] },
  { path: "/en/project", needles: ["BIFROST"] },
];

/**
 * Default server build: BUILD_ID required for `next start`.
 * @returns {boolean}
 */
function hasNextStartBuild() {
  return existsSync(join(root, ".next", "BUILD_ID"));
}

/**
 * Full GH Pages export has route folders (not scaffold-only index).
 * @returns {boolean}
 */
function hasFullStaticOut() {
  const outDir = join(root, "out");
  return (
    existsSync(join(outDir, "index.html")) &&
    (existsSync(join(outDir, "project", "index.html")) ||
      existsSync(join(outDir, "project.html")))
  );
}

/**
 * Any out/ index (fallback scan).
 * @returns {boolean}
 */
function hasStaticOut() {
  return existsSync(join(root, "out", "index.html"));
}

/**
 * Sleep helper.
 * @param {number} ms
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Kill process tree on Windows / POSIX.
 * @param {import('node:child_process').ChildProcess} child
 */
function killServer(child) {
  if (!child.pid) return;
  try {
    if (process.platform === "win32") {
      spawn("taskkill", ["/pid", String(child.pid), "/T", "/F"], {
        stdio: "ignore",
        windowsHide: true,
      });
    } else {
      child.kill("SIGTERM");
      setTimeout(() => {
        try {
          child.kill("SIGKILL");
        } catch {
          /* ignore */
        }
      }, 1500);
    }
  } catch {
    /* ignore */
  }
}

/**
 * Wait until server responds or timeout.
 * @param {string} url
 * @param {number} timeoutMs
 */
async function waitForServer(url, timeoutMs = 45000) {
  const start = Date.now();
  let lastErr = "";
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { redirect: "follow" });
      if (res.ok || res.status === 404 || res.status === 308 || res.status === 307) {
        return true;
      }
      lastErr = `status ${res.status}`;
    } catch (e) {
      lastErr = e instanceof Error ? e.message : String(e);
    }
    await sleep(400);
  }
  throw new Error(`Server not ready at ${url}: ${lastErr}`);
}

/**
 * @param {string} path
 * @returns {string[]}
 */
function candidateUrls(path) {
  // trailingSlash export may require trailing slash
  if (path === "/") return [`${BASE}/`, `${BASE}`];
  return [
    `${BASE}${path}`,
    `${BASE}${path}/`,
    // GH Pages basePath prefix if serve is rooted oddly — rare
  ];
}

/**
 * Fetch route and assert needles.
 * @param {{ path: string; needles: string[] }} route
 */
async function assertRoute(route) {
  let lastStatus = 0;
  let body = "";
  let okUrl = "";

  for (const url of candidateUrls(route.path)) {
    try {
      const res = await fetch(url, { redirect: "follow" });
      lastStatus = res.status;
      if (res.status === 200) {
        body = await res.text();
        okUrl = url;
        break;
      }
    } catch (e) {
      lastStatus = 0;
      body = e instanceof Error ? e.message : String(e);
    }
  }

  if (lastStatus !== 200) {
    return {
      path: route.path,
      ok: false,
      detail: `HTTP ${lastStatus || "ERR"} (expected 200)`,
    };
  }

  const missing = route.needles.filter((n) => !body.includes(n));
  if (missing.length > 0) {
    return {
      path: route.path,
      ok: false,
      detail: `200 but missing: ${missing.join(", ")} @ ${okUrl}`,
    };
  }

  return {
    path: route.path,
    ok: true,
    detail: `200 + ${route.needles.join("|")} @ ${okUrl}`,
  };
}

/**
 * Fallback: scan static out/ HTML without a live server.
 * @returns {number} failed count
 */
function staticOutFallback() {
  const outDir = join(root, "out");
  console.warn(
    "\nFALLBACK: live server start failed or unavailable — checking out/ static files only.\n",
  );

  if (!hasStaticOut(root)) {
    console.error("FAIL neither live server nor out/ available");
    return 1;
  }

  /** Map logical path → relative HTML under out/ (with trailingSlash export) */
  const map = [
    { path: "/", file: "index.html", needles: ["BIFROST"] },
    {
      path: "/project",
      file: "project/index.html",
      needles: ["BIFROST"],
    },
    { path: "/team", file: "team/index.html", needles: ["BIFROST"] },
    {
      path: "/team/kuang-xuan",
      file: "team/kuang-xuan/index.html",
      needles: ["BIFROST"],
    },
    { path: "/about", file: "about/index.html", needles: ["BIFROST"] },
    {
      path: "/contact",
      file: "contact/index.html",
      needles: ["BIFROST", "kekeyee@outlook.com"],
    },
    { path: "/en", file: "en/index.html", needles: ["BIFROST"] },
    {
      path: "/en/project",
      file: "en/project/index.html",
      needles: ["BIFROST"],
    },
  ];

  // Also accept flat project.html style
  let failed = 0;
  for (const m of map) {
    const candidates = [
      join(outDir, m.file),
      join(outDir, m.file.replace(/\/index\.html$/, ".html")),
    ];
    const hit = candidates.find((p) => existsSync(p));
    if (!hit) {
      console.error(`FAIL static ${m.path}: missing ${m.file}`);
      failed += 1;
      continue;
    }
    const text = readFileSync(hit, "utf8");
    const missing = m.needles.filter((n) => !text.includes(n));
    if (missing.length > 0) {
      console.error(
        `FAIL static ${m.path}: missing ${missing.join(", ")} in ${hit}`,
      );
      failed += 1;
    } else {
      console.log(`OK   static ${m.path} — ${m.needles.join("|")}`);
    }
  }

  // If out only has scaffold index (old build), report clearly
  if (!existsSync(join(outDir, "project")) && !existsSync(join(outDir, "project.html"))) {
    console.warn(
      "NOTE: out/ looks incomplete (no project/). Re-run with $env:GITHUB_PAGES='true'; npm run build",
    );
  }

  return failed;
}

/**
 * Start a server process.
 * @param {"next" | "serve"} mode
 */
function startServer(mode) {
  const isWin = process.platform === "win32";
  const command = isWin ? "npx.cmd" : "npx";
  /** @type {string[]} */
  let args;
  if (mode === "next") {
    args = ["next", "start", "-p", String(PORT), "-H", "127.0.0.1"];
  } else {
    args = ["--yes", "serve", "out", "-l", String(PORT)];
  }

  const child = spawn(command, args, {
    cwd: root,
    stdio: ["ignore", "pipe", "pipe"],
    shell: isWin,
    env: { ...process.env, PORT: String(PORT) },
    windowsHide: true,
  });

  let logs = "";
  child.stdout?.on("data", (d) => {
    logs += d.toString();
  });
  child.stderr?.on("data", (d) => {
    logs += d.toString();
  });

  return { child, getLogs: () => logs };
}

async function main() {
  const fullOut = hasFullStaticOut();
  const canNext = hasNextStartBuild();
  const anyOut = hasStaticOut();

  console.log(`smoke-http: PORT=${PORT}`);
  console.log(`  full out/ export:   ${fullOut ? "yes" : "no"}`);
  console.log(`  .next BUILD_ID:     ${canNext ? "yes" : "no"}`);

  /** Prefer full static export (GH Pages) when present; else next start. */
  /** @type {"next" | "serve" | null} */
  let mode = null;
  if (fullOut) mode = "serve";
  else if (canNext) mode = "next";
  else if (anyOut) mode = "serve";

  if (!mode) {
    console.error(
      "FAIL no build artifact. Run `npm run build` or `$env:GITHUB_PAGES='true'; npm run build` first.",
    );
    process.exit(1);
  }

  console.log(
    `  mode: ${mode === "next" ? "npx next start" : "npx --yes serve out"}`,
  );

  const { child, getLogs } = startServer(mode);
  let usedFallback = false;
  /** @type {number} */
  let failed = 0;

  try {
    try {
      await waitForServer(`${BASE}/`, 60000);
    } catch (err) {
      console.error(
        `Server start failed: ${err instanceof Error ? err.message : String(err)}`,
      );
      console.error("Server logs (tail):\n" + getLogs().slice(-2000));
      killServer(child);
      await sleep(500);

      failed = staticOutFallback();
      usedFallback = true;
      if (failed > 0) {
        console.error(`\n${failed} static fallback check(s) failed`);
        process.exit(1);
      }
      console.log(
        "\nStatic out/ fallback checks passed (live server unavailable).",
      );
      process.exit(0);
    }

    console.log("Server ready. Fetching routes…\n");

    for (const route of ROUTES) {
      const result = await assertRoute(route);
      if (result.ok) {
        console.log(`OK   ${result.path} — ${result.detail}`);
      } else {
        failed += 1;
        console.error(`FAIL ${result.path}: ${result.detail}`);
      }
    }
  } finally {
    if (!usedFallback) {
      killServer(child);
      await sleep(400);
    }
  }

  if (failed > 0) {
    console.error(`\n${failed} HTTP route check(s) failed`);
    process.exit(1);
  }

  console.log(`\nAll ${ROUTES.length} HTTP smoke checks passed (live).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
