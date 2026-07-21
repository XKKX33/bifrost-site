# BIFROST

Independent team brand site for BIFROST (Next.js App Router + TypeScript + Tailwind CSS 4).

## Live

- **Primary public link (GitHub Pages — preferred for mainland China):** https://xkkx33.github.io/bifrost-site/  
  Static export with `basePath=/bifrost-site`. Use this when Vercel is blocked or slow.
- **Alternate (Vercel):** https://bifrost-site-rho.vercel.app  
  - Project dashboard: https://vercel.com/xkkx33s-projects/bifrost-site  
  - Team/account: [xkkx33s-projects](https://vercel.com/xkkx33s-projects)  
  Keep dual deploy: Vercel stays the Node/server path; do **not** set `GITHUB_PAGES=true` on Vercel.
- **Repository:** https://github.com/XKKX33/bifrost-site

### Deploy status (important)

| Item | Current state |
| --- | --- |
| **Primary public (China-friendly)** | https://xkkx33.github.io/bifrost-site/ (GitHub Pages `gh-pages`) |
| **Alternate** | https://bifrost-site-rho.vercel.app (Vercel production) |
| Vercel project | `xkkx33s-projects/bifrost-site` — default Next.js build (**do not** set `GITHUB_PAGES=true` on Vercel) |
| GitHub Pages | Manual static export (`GITHUB_PAGES=true` + `npm run deploy:pages`) |
| Auto-deploy from `main` (Vercel) | Optional: connect the GitHub repo in the Vercel dashboard |

**Dual deploy:** Vercel = server build without `basePath`. GitHub Pages = static `out/` with `basePath=/bifrost-site` for public access when Vercel is unreachable.

#### Vercel deploy (CLI)

```bash
# Auth once (browser device flow if needed)
npx vercel login
# or: npx vercel whoami

cd bifrost-site
# Do NOT set GITHUB_PAGES / GITHUB_ACTIONS for Vercel
npx vercel --prod --yes
```

Dashboard: https://vercel.com/xkkx33s-projects/bifrost-site

If CLI cannot attach GitHub, link in UI: Project → Settings → Git → Connect `XKKX33/bifrost-site` (install Vercel GitHub App if prompted). Future `main` pushes then auto-deploy.

#### GitHub Pages (primary public / China)

Public static host (`GITHUB_PAGES=true` + `basePath=/bifrost-site`). Redeploy after meaningful `main` changes so China users get the latest build.

Optional Actions workflow: [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) — needs `workflow` scope on `gh` to push, then repo Settings → Pages → Source: GitHub Actions.

Manual Pages redeploy:

```powershell
# From repo root (PowerShell)
$env:GITHUB_PAGES='true'
$env:NEXT_PUBLIC_REPO_NAME='bifrost-site'
npm ci
npm run build -- --webpack
npm run fix:rsc
npm run deploy:pages
```

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
| `npm run smoke:project` | BIFROST content contracts (steps, roles, 0.85, projected disclaimer) |
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
| `/project` | `/en/project` | BIFROST product page + RoleSimulator |
| `/team` | `/en/team` | People list, philosophy, capability bridge |
| `/team/[slug]` | `/en/team/[slug]` | Member detail (`kuang-xuan`, `member-b`, `member-c`) |
| `/about` | `/en/about` | Brand manifesto (not people) |
| `/contact` | `/en/contact` | Team email + optional GitHub |

Explicit route mirrors under `app/en/**` (no middleware rewrite) keep static export / GitHub Pages friendly.

## Content paths

| Path | Role |
| --- | --- |
| `content/i18n/{types,zh,en,index}.ts` | UI chrome copy (`getUi`) |
| `content/project/{types,zh,en,index}.ts` | BIFROST narrative (`getProject`) |
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
| `NEXT_PUBLIC_TEAM_EMAIL` | Public team inbox | `kekeyee@outlook.com` |
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

Public contact is team email only (`kekeyee@outlook.com` or `NEXT_PUBLIC_TEAM_EMAIL`). No public phone on Contact.

Enforce with:

```bash
npm run smoke:privacy
```

## Design tokens

Morning-film canvas + ink; pastels are decorative washes only; CTA blue for interactive actions (see `app/globals.css` `:root`):

- `--bg: #F9F8F6` · `--ink: #1C2430` · `--ink-muted: #6B7280`
- Pastels: peach / butter / mint / sky / lilac (ambient + chrome accents)
- CTA: `--cta-start: #3B7FE8` → `--cta-end: #7EB6FF` (primary buttons; start-weighted fill + text-shadow for white label legibility)
- Title wash (decorative): `#E8A898` → `#7EC8E3` → `#8FD9B8`
- Film glacier alias: sky → `#7EB6FF` → lilac (not the old neon cyan/violet)

Fonts: Times New Roman / Times (Latin) + Noto Serif SC / Songti SC / STSong / SimSun / 宋体 (CJK 小宋).

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
