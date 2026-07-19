/**
 * HTTP smoke for critical routes (no Playwright required).
 * Prefers an already-running server via SMOKE_BASE_URL; otherwise starts
 * `next start` after a production build on SMOKE_PORT (default 3456).
 *
 * Run: node scripts/smoke-browser.mjs
 * Env:
 *   SMOKE_BASE_URL=http://127.0.0.1:3000  (skip spawn)
 *   SMOKE_PORT=3456
 *   SMOKE_SKIP_START=1                    (only use SMOKE_BASE_URL)
 */

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const port = Number(process.env.SMOKE_PORT || 3456);
const externalBase = process.env.SMOKE_BASE_URL?.replace(/\/$/, "") || "";
const skipStart = process.env.SMOKE_SKIP_START === "1";

/** @type {{ path: string; mustInclude: string[] }[]} */
const ROUTES = [
  { path: "/", mustInclude: ["BIFROST", "html"] },
  { path: "/project", mustInclude: ["BIFROST", "html"] },
  { path: "/team", mustInclude: ["html"] },
  { path: "/team/kuang-xuan", mustInclude: ["html"] },
  { path: "/about", mustInclude: ["html"] },
  { path: "/contact", mustInclude: ["html", "mailto:", "bifrost"] },
  { path: "/en", mustInclude: ["BIFROST", "html"] },
  { path: "/en/project", mustInclude: ["BIFROST", "html"] },
  { path: "/en/team", mustInclude: ["html"] },
  { path: "/en/about", mustInclude: ["html"] },
  { path: "/en/contact", mustInclude: ["html"] },
];

/**
 * @param {string} base
 * @param {string} path
 * @returns {Promise<{ status: number; body: string }>}
 */
async function fetchPath(base, path) {
  const url = `${base}${path}`;
  const res = await fetch(url, {
    redirect: "follow",
    headers: { Accept: "text/html,application/xhtml+xml" },
  });
  const body = await res.text();
  return { status: res.status, body };
}

/**
 * @param {string} base
 * @param {number} attempts
 * @returns {Promise<boolean>}
 */
async function waitForServer(base, attempts = 40) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const r = await fetch(base, { redirect: "follow" });
      if (r.status > 0) return true;
    } catch {
      /* not up yet */
    }
    await delay(500);
  }
  return false;
}

/**
 * @returns {Promise<{ base: string; child: import('node:child_process').ChildProcess | null }>}
 */
async function resolveServer() {
  if (externalBase) {
    const up = await waitForServer(externalBase, 10);
    if (!up) {
      throw new Error(`SMOKE_BASE_URL not reachable: ${externalBase}`);
    }
    return { base: externalBase, child: null };
  }

  if (skipStart) {
    throw new Error("SMOKE_SKIP_START=1 but SMOKE_BASE_URL is empty");
  }

  const nextBuild = join(root, ".next");
  if (!existsSync(nextBuild)) {
    throw new Error(
      "No .next build found. Run `npm run build` first, or set SMOKE_BASE_URL.",
    );
  }

  const base = `http://127.0.0.1:${port}`;
  const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
  const child = spawn(npmCmd, ["run", "start", "--", "-p", String(port)], {
    cwd: root,
    env: { ...process.env, PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"],
    shell: process.platform === "win32",
  });

  let stderr = "";
  child.stderr?.on("data", (chunk) => {
    stderr += String(chunk);
  });
  child.stdout?.on("data", () => {
    /* drain */
  });

  const up = await waitForServer(base, 60);
  if (!up) {
    child.kill("SIGTERM");
    throw new Error(`next start did not become ready on ${base}\n${stderr}`);
  }

  return { base, child };
}

let failed = 0;
/** @type {import('node:child_process').ChildProcess | null} */
let child = null;

try {
  const resolved = await resolveServer();
  child = resolved.child;
  const { base } = resolved;
  console.log(`Smoke browser base: ${base}\n`);

  for (const route of ROUTES) {
    try {
      const { status, body } = await fetchPath(base, route.path);
      const statusOk = status === 200;
      const missing = route.mustInclude.filter(
        (s) => !body.toLowerCase().includes(s.toLowerCase()),
      );
      const ok = statusOk && missing.length === 0;
      if (ok) {
        console.log(`OK   ${route.path} → ${status} (+ markers)`);
      } else {
        failed += 1;
        console.error(
          `FAIL ${route.path} → status=${status}${
            missing.length ? ` missing=[${missing.join(", ")}]` : ""
          }`,
        );
      }
    } catch (err) {
      failed += 1;
      console.error(
        `FAIL ${route.path} → ${err instanceof Error ? err.message : err}`,
      );
    }
  }
} catch (err) {
  console.error(err instanceof Error ? err.message : err);
  failed += 1;
} finally {
  if (child && !child.killed) {
    child.kill("SIGTERM");
    // Windows may need a harder kill
    await delay(300);
    if (!child.killed) {
      try {
        child.kill("SIGKILL");
      } catch {
        /* ignore */
      }
    }
  }
}

if (failed > 0) {
  console.error(`\n${failed} browser smoke check(s) failed`);
  process.exit(1);
}

console.log(`\nAll ${ROUTES.length} browser smoke checks passed.`);
