/**
 * Flatten Next.js App Router static-export RSC segment files.
 *
 * Bug (Next.js #92339 / #85374): on Windows, path.relative() uses `\`, but
 * convertSegmentPathToStaticExportFilename only replaces `/`. Export then writes:
 *   out/team/__next.team/__PAGE__.txt
 * while the client requests:
 *   out/team/__next.team.__PAGE__.txt
 *
 * Linux CI usually emits flat names already; this script is a no-op then.
 * Safe to run after every `output: "export"` build (GH Pages).
 *
 * Does not touch HTML, CSS, or `_next/static` assets.
 */
import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve(process.argv[2] || "out");

if (!fs.existsSync(outDir)) {
  console.error(`[fix-rsc-segment-paths] missing out dir: ${outDir}`);
  process.exit(1);
}

/** @type {{ src: string, dest: string }[]} */
const moves = [];

/**
 * @param {string} dir
 */
function walk(dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      walk(full);
      continue;
    }
    if (!ent.isFile() || !ent.name.endsWith(".txt")) continue;

    const rel = path.relative(outDir, full);
    const parts = rel.split(path.sep);
    const idx = parts.findIndex((p) => p.startsWith("__next"));
    // Flat files like `__next.team.txt` or `__next.__PAGE__.txt` — leave alone.
    if (idx === -1 || idx === parts.length - 1) continue;

    const routeDir = path.join(outDir, ...parts.slice(0, idx));
    const flatName = parts.slice(idx).join(".");
    const dest = path.join(routeDir, flatName);
    if (path.resolve(full) === path.resolve(dest)) continue;
    moves.push({ src: full, dest });
  }
}

walk(outDir);

let copied = 0;
/** @type {Set<string>} */
const nestedRoots = new Set();

for (const { src, dest } of moves) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (!fs.existsSync(dest)) {
    fs.copyFileSync(src, dest);
    copied += 1;
  }
  // Track top-level nested `__next*` directory under the route for cleanup.
  const rel = path.relative(outDir, src);
  const parts = rel.split(path.sep);
  const idx = parts.findIndex((p) => p.startsWith("__next"));
  if (idx !== -1 && idx < parts.length - 1) {
    nestedRoots.add(path.join(outDir, ...parts.slice(0, idx + 1)));
  }
}

let removed = 0;
for (const root of nestedRoots) {
  if (fs.existsSync(root) && fs.statSync(root).isDirectory()) {
    fs.rmSync(root, { recursive: true, force: true });
    removed += 1;
  }
}

// Sanity: client-critical flat page segments should exist when nested ones did.
const sample = path.join(outDir, "team", "__next.team.__PAGE__.txt");
const sampleOk = fs.existsSync(sample);

console.log(
  `[fix-rsc-segment-paths] out=${outDir} moved=${moves.length} copied=${copied} removedDirs=${removed} sample=${sampleOk ? "ok" : "missing"}`,
);

if (moves.length > 0 && !sampleOk && fs.existsSync(path.join(outDir, "team"))) {
  console.error(
    "[fix-rsc-segment-paths] expected out/team/__next.team.__PAGE__.txt after flatten",
  );
  process.exit(1);
}
