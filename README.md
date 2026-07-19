# BIFROST

Independent team brand site for BIFROST (Next.js App Router + TypeScript + Tailwind CSS 4).

## Live

- **GitHub Pages:** https://xkkx33.github.io/bifrost-site/
- **Repository:** https://github.com/XKKX33/bifrost-site

### Deploy status (important)

| Item | Current state |
| --- | --- |
| Live site | https://xkkx33.github.io/bifrost-site/ |
| Pages source | **`gh-pages` branch** (legacy “Deploy from a branch”), **not** GitHub Actions |
| Custom Actions workflow on remote | **Missing** — `deploy-pages.yml` is only local until pushed with `workflow` scope |
| Auto-update when others push `main` | **NO** (until Actions is enabled; see below) |

**Today:** only pushes to **`gh-pages`** update the live site. Pushes to `main` alone do **not**.

#### One-time: enable auto-deploy from `main` (preferred)

GitHub OAuth tokens need the **`workflow`** scope to create/update `.github/workflows/*`. Current `gh` login only has `repo` / `read:org` / `gist`.

```bash
# 1) Re-auth with workflow scope (browser device flow)
gh auth refresh -h github.com -s workflow,repo,read:org,gist

# 2) Commit + push the local workflow (file already in this repo)
git add .github/workflows/deploy-pages.yml
git commit -m "ci: Deploy GitHub Pages on push to main"
git push origin main

# 3) Repo Settings → Pages → Build and deployment → Source: GitHub Actions
#    (or after first successful run, switch from "Deploy from a branch")

# 4) Confirm
gh run list --repo XKKX33/bifrost-site
```

Workflow: [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) — on `push` to `main` / `workflow_dispatch`: `npm ci` → `GITHUB_PAGES=true` build → `fix:rsc` → `deploy-pages`.

#### Manual redeploy (until Actions is live)

Anyone with write access (or owner) after merging to `main`:

```powershell
# From repo root (PowerShell)
$env:GITHUB_PAGES='true'
$env:NEXT_PUBLIC_REPO_NAME='bifrost-site'
npm ci
npm run build
npm run fix:rsc
# then publish out/ to gh-pages, e.g.:
npm run deploy:pages
```

Or use GitHub UI: Actions is empty for custom deploys until step 2 above; until then update **`gh-pages`** only.

## Scripts

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (Vercel / Node)
npm run start    # serve production build (non-export mode)
npm run lint
```

### Smoke tests

| Command | What it checks |
| --- | --- |
| `npm run smoke:i18n` | Locale path helpers (`localePath`, switch, strip) |
| `npm run smoke:project` | DecisionLoop content contracts (steps, roles, 0.85, projected disclaimer) |
| `npm run smoke:members` | Team/member content + privacy blocklist on team sources |
| `npm run smoke:privacy` | No PII patterns in `content/`, `components/`, `app/` |
| `npm run smoke:routes` | Required pages/components + Home `data-section` 02–10 + RoleSimulator markers |
| `npm run smoke:http` | Live HTTP 200 on key routes (after build); falls back to static `out/` scan |
| `npm run smoke:browser` | Alias of `smoke:http` |
| `npm run smoke` | Chain: i18n → project → members → privacy → routes |

```bash
npm run smoke
# After a production build (default or GH Pages):
npm run smoke:http
# alias:
npm run smoke:browser
```

## Information architecture (routes)

| Path (zh) | Path (en) | Job |
| --- | --- | --- |
| `/` | `/en` | Home narrative (sections 02–10; loader is chrome 01) |
| `/project` | `/en/project` | DecisionLoop product page + RoleSimulator |
| `/team` | `/en/team` | People list, philosophy, capability bridge |
| `/team/[slug]` | `/en/team/[slug]` | Member detail (`kuang-xuan`, `member-b`, `member-c`) |
| `/about` | `/en/about` | Brand manifesto (not people) |
| `/contact` | `/en/contact` | Team email + optional GitHub |

Explicit route mirrors under `app/en/**` (no middleware rewrite) keep static export / GitHub Pages friendly.

## Content paths

| Path | Role |
| --- | --- |
| `content/i18n/{types,zh,en,index}.ts` | UI chrome copy (`getUi`) |
| `content/project/{types,zh,en,index}.ts` | DecisionLoop narrative (`getProject`) |
| `content/team/{types,zh,en,index}.ts` | Team + member records (`getTeam`, `getMember`, `listMembers`) |
| `content/members.ts` | SSG slug list only (`MEMBER_SLUGS`) |
| `content/about/{types,zh,en,index}.ts` | Brand about (`getAbout`) |
| `content/site-contact.ts` | Contact copy + `getTeamEmail` / `getGithubUrl` |

## Dual deploy

| Target | Env | Behavior |
| --- | --- | --- |
| Local / Vercel | *(default)* | No `basePath`, normal Next server build |
| GitHub Pages | `GITHUB_PAGES=true` or `GITHUB_ACTIONS=true` | `output: "export"`, `trailingSlash`, `basePath`/`assetPrefix` for repo segment |

After a Pages export, CI runs `npm run fix:rsc` (`scripts/fix-rsc-segment-paths.mjs`) so App Router segment files are flat (`__next.team.__PAGE__.txt`). Next.js can otherwise nest them on Windows builds (`__next.team/__PAGE__.txt`) while the client requests dotted names — console 404s, broken prefetch (Next.js #92339).

```bash
# Default (Vercel / Node)
npm run build
npm run start

# GitHub Pages static export → out/
# PowerShell
$env:GITHUB_PAGES='true'
$env:NEXT_PUBLIC_REPO_NAME='bifrost-site'   # default if unset
npm run build
npm run fix:rsc   # required after local Windows export; no-op if already flat
# static files → out/
```

`NEXT_PUBLIC_BASE_PATH` is injected from `next.config.ts`. Use `withBasePath()` from `lib/paths.ts` for plain `<a href>` / asset paths (App Router `Link` already respects `basePath`).

## Environment variables

| Variable | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_TEAM_EMAIL` | Public team inbox | `hello@bifrost.team` |
| `NEXT_PUBLIC_GITHUB_URL` | Public GitHub org/repo URL | empty → UI shows TBA |
| `NEXT_PUBLIC_REPO_NAME` | GH Pages repo segment for `basePath` | `bifrost-site` |
| `GITHUB_PAGES` / `GITHUB_ACTIONS` | Enable static export + basePath | unset = server build |
| `NEXT_PUBLIC_BASE_PATH` | Injected by config (do not set manually) | `""` or `/repo` |

## Privacy rules

Do **not** publish personal PII in `content/`, `components/`, or `app/`:

- Phone: `188` + 8 digits (`188\d{8}`), or full `18885122003`
- DOB: `2003.09`
- 户籍 / 政治面貌 / 共青团
- Personal QQ email: `2468857063@qq.com`

Public contact is team email only (`hello@bifrost.team` or `NEXT_PUBLIC_TEAM_EMAIL`). No public phone on Contact.

Enforce with:

```bash
npm run smoke:privacy
```

## Design tokens

Warm paper background + ink text; glacier gradient accents only on interactive elements:

- `--bg: #F2F0EA`
- `--ink: #111111`
- Glacier: `#62D8FF` → `#536BFF` → `#A45BFF`

Fonts (Google Fonts): Noto Sans SC, Syne, JetBrains Mono.

## Stack

- Next.js 16 / React 19 / TypeScript strict
- Tailwind CSS 4 (`@theme inline` in `app/globals.css`)
- Client chrome: Lenis, optional custom cursor, loader / menu / page transition
- Responsive polish: `overflow-x: clip` + mobile padding / single-column flow tweaks in `app/globals.css`

## Project layout

```
app/                 # routes (zh root + app/en/** mirrors)
components/          # chrome, home, project, team, about, contact
content/             # bilingual copy + getters
lib/                 # i18n + paths
scripts/             # smoke:*.mjs
```

Do **not** mutate the personal portfolio repo; this product is `bifrost-site` only.

