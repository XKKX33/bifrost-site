/**
 * T6 visual evidence: start production server, screenshots, color probes.
 * Skips intro loader via sessionStorage + reduced-motion.
 */
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PORT = process.env.PORT || "3100";
const BASE = process.env.BASE_URL || `http://127.0.0.1:${PORT}`;
const OUT =
  process.env.EVIDENCE_DIR ||
  path.resolve(ROOT, "..", ".omo", "evidence", "bifrost-morning-film-palette");

const ROUTES = [
  { path: "/", name: "home" },
  { path: "/project", name: "project" },
  { path: "/team", name: "team" },
  { path: "/team/kuang-xuan", name: "member-kuang-xuan" },
  { path: "/about", name: "about" },
  { path: "/contact", name: "contact" },
  { path: "/en", name: "en-home" },
];

function parseRgb(str) {
  if (!str) return null;
  const m = str.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
  if (!m) return null;
  return [Math.round(+m[1]), Math.round(+m[2]), Math.round(+m[3])];
}

function near(a, b, tol = 3) {
  return Math.abs(a - b) <= tol;
}

function rgbNear(actual, expected, tol = 3) {
  if (!actual) return false;
  return (
    near(actual[0], expected[0], tol) &&
    near(actual[1], expected[1], tol) &&
    near(actual[2], expected[2], tol)
  );
}

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForServer(url, timeoutMs = 90_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
      if (res.ok || res.status < 500) return true;
    } catch {
      /* retry */
    }
    await wait(500);
  }
  return false;
}

async function startServer() {
  const nextBin = path.join(ROOT, "node_modules", "next", "dist", "bin", "next");
  const child = spawn(process.execPath, [nextBin, "start", "-p", PORT], {
    cwd: ROOT,
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
    env: { ...process.env, PORT },
  });
  let logs = "";
  child.stdout?.on("data", (d) => {
    logs += d.toString();
  });
  child.stderr?.on("data", (d) => {
    logs += d.toString();
  });
  const up = await waitForServer(BASE);
  if (!up) {
    child.kill();
    throw new Error(`Server failed to start on ${BASE}\n${logs.slice(-2000)}`);
  }
  return child;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const child = await startServer();
  let failedCount = 0;
  try {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    await context.addInitScript(() => {
      try {
        sessionStorage.setItem("bifrost-loader-seen", "1");
      } catch {
        /* ignore */
      }
    });
    const page = await context.newPage();
    const results = [];
    const assertions = [];

    for (const r of ROUTES) {
      const url = `${BASE}${r.path}`;
      const res = await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
      const status = res?.status() ?? 0;
      // ensure loader gone
      await page
        .locator(".chrome-loader")
        .waitFor({ state: "hidden", timeout: 8000 })
        .catch(() => {});
      await page.waitForTimeout(400);
      const png = path.join(OUT, `${r.name}.png`);
      await page.screenshot({ path: png, fullPage: false });

      const styles = await page.evaluate(() => {
        const body = document.body;
        const cs = getComputedStyle(body);
        const cta =
          document.querySelector("a.home-btn--primary") ||
          document.querySelector(".home-btn--primary") ||
          document.querySelector('[class*="btn--primary"]');
        const ctaCs = cta ? getComputedStyle(cta) : null;
        const mainText = (document.querySelector("main")?.innerText || "").slice(0, 200);
        const samples = [];
        document.querySelectorAll("main *, body, a, button, [class*='hybrid']").forEach((el) => {
          const s = getComputedStyle(el);
          samples.push(
            `${s.backgroundColor}|${s.backgroundImage}|${s.color}|${s.borderColor}`,
          );
        });
        const joined = samples.join(" ").toLowerCase();
        return {
          bodyBg: cs.backgroundColor,
          bodyColor: cs.color,
          ctaBg: ctaCs?.backgroundColor ?? null,
          ctaBgImage: ctaCs?.backgroundImage ?? null,
          ctaColor: ctaCs?.color ?? null,
          ctaSelector: cta
            ? `${cta.tagName}.${String(cta.className || "").slice(0, 80)}`
            : null,
          mainText,
          hasBanned39:
            joined.includes("39, 199, 232") ||
            joined.includes("#39c7e8") ||
            joined.includes("57, 199, 232"),
          hasBanned915:
            joined.includes("145, 87, 229") || joined.includes("#9157e5"),
        };
      });

      const bodyRgb = parseRgb(styles.bodyBg);
      const inkRgb = parseRgb(styles.bodyColor);
      const ctaRgb = parseRgb(styles.ctaBg);

      results.push({
        route: r.path,
        name: r.name,
        status,
        screenshot: png,
        bodyBg: styles.bodyBg,
        bodyColor: styles.bodyColor,
        ctaBg: styles.ctaBg,
        ctaBgImage: styles.ctaBgImage,
        ctaSelector: styles.ctaSelector,
        mainText: styles.mainText,
        hasBanned39: styles.hasBanned39,
        hasBanned915: styles.hasBanned915,
      });

      if (r.name === "home" || r.name === "project" || r.name === "team") {
        assertions.push({
          id: `${r.name}-body-bg`,
          ok: rgbNear(bodyRgb, [249, 248, 246], 4),
          detail: `body bg ${styles.bodyBg} ≈ rgb(249,248,246)`,
        });
        assertions.push({
          id: `${r.name}-ink`,
          ok: rgbNear(inkRgb, [28, 36, 48], 6),
          detail: `ink ${styles.bodyColor} ≈ rgb(28,36,48)`,
        });
        assertions.push({
          id: `${r.name}-has-content`,
          ok: Boolean(styles.mainText && styles.mainText.trim().length > 20),
          detail: `main text sample: ${JSON.stringify((styles.mainText || "").slice(0, 80))}`,
        });
      }

      if (r.name === "home") {
        const solid111 =
          ctaRgb && ctaRgb[0] === 17 && ctaRgb[1] === 17 && ctaRgb[2] === 17;
        const gradientCta =
          styles.ctaBgImage &&
          styles.ctaBgImage !== "none" &&
          /gradient/i.test(styles.ctaBgImage);
        assertions.push({
          id: "home-cta-not-solid-111111",
          ok: !solid111 || Boolean(gradientCta),
          detail: `CTA bg=${styles.ctaBg} image=${styles.ctaBgImage}`,
        });
      }

      if (r.name === "project") {
        assertions.push({
          id: "project-no-banned-hex",
          ok: !styles.hasBanned39 && !styles.hasBanned915,
          detail: `banned free: 39=${!styles.hasBanned39} 915=${!styles.hasBanned915}`,
        });
      }
    }

    let hybridFileOk = false;
    try {
      const css = (await readFile(path.join(ROOT, "app", "hybrid-project.css"), "utf8")).toLowerCase();
      hybridFileOk = !css.includes("#39c7e8") && !css.includes("#9157e5");
    } catch {
      hybridFileOk = false;
    }
    assertions.push({
      id: "hybrid-css-no-banned",
      ok: hybridFileOk,
      detail: "hybrid-project.css free of #39c7e8 #9157e5",
    });

    const probePath = path.join(OUT, "color-probes.json");
    failedCount = assertions.filter((a) => !a.ok).length;
    await writeFile(
      probePath,
      JSON.stringify({ base: BASE, results, assertions, failedCount }, null, 2),
      "utf8",
    );

    console.log(
      JSON.stringify(
        {
          probePath,
          results: results.map((r) => ({
            name: r.name,
            status: r.status,
            bodyBg: r.bodyBg,
            bodyColor: r.bodyColor,
            ctaBg: r.ctaBg,
            ctaBgImage: r.ctaBgImage,
            mainText: (r.mainText || "").slice(0, 60),
          })),
          assertions,
          failedCount,
        },
        null,
        2,
      ),
    );
    await browser.close();
  } finally {
    try {
      child.kill("SIGTERM");
    } catch {
      /* ignore */
    }
    await wait(500);
  }
  process.exit(failedCount > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
