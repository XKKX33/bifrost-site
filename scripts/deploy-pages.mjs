/**
 * Manual GitHub Pages publish: build static export → push to gh-pages.
 * Use until Actions workflow is on remote (needs `workflow` OAuth scope).
 *
 * Usage (from repo root):
 *   node scripts/deploy-pages.mjs
 *   npm run deploy:pages
 */
import { execSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const root = process.cwd();
const outDir = join(root, "out");
const workDir = join(tmpdir(), `bifrost-gh-pages-${Date.now()}`);

function sh(cmd, opts = {}) {
  console.log(`> ${cmd}`);
  execSync(cmd, {
    stdio: "inherit",
    shell: true,
    ...opts,
  });
}

function emptyDirKeepGit(dir) {
  for (const name of readdirSync(dir)) {
    if (name === ".git") continue;
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

process.env.GITHUB_PAGES = "true";
process.env.NEXT_PUBLIC_REPO_NAME =
  process.env.NEXT_PUBLIC_REPO_NAME || "bifrost-site";

console.log("[deploy-pages] building static export…");
sh("npm run build", { cwd: root, env: process.env });
sh("npm run fix:rsc", { cwd: root });

if (!existsSync(outDir)) {
  console.error("[deploy-pages] missing out/ after build");
  process.exit(1);
}
writeFileSync(join(outDir, ".nojekyll"), "");

console.log("[deploy-pages] publishing out/ → origin/gh-pages…");
mkdirSync(workDir, { recursive: true });

try {
  sh("git fetch origin gh-pages", { cwd: root });
  sh(`git worktree add -B gh-pages "${workDir}" origin/gh-pages`, {
    cwd: root,
  });

  emptyDirKeepGit(workDir);
  cpSync(outDir, workDir, { recursive: true });
  writeFileSync(join(workDir, ".nojekyll"), "");

  const mainSha = execSync("git rev-parse --short HEAD", {
    cwd: root,
    encoding: "utf8",
  }).trim();

  sh("git add -A", { cwd: workDir });
  const status = execSync("git status --porcelain", {
    cwd: workDir,
    encoding: "utf8",
  }).trim();
  if (!status) {
    console.log("[deploy-pages] nothing to commit (already up to date)");
  } else {
    sh(
      `git commit -m "deploy: sync main ${mainSha} to Pages (manual)"`,
      { cwd: workDir }
    );
    sh("git push origin gh-pages", { cwd: workDir });
  }
} finally {
  try {
    sh(`git worktree remove --force "${workDir}"`, { cwd: root });
  } catch {
    rmSync(workDir, { recursive: true, force: true });
  }
}

console.log(
  "[deploy-pages] done → https://xkkx33.github.io/bifrost-site/"
);
