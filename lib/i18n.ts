/**
 * Locale routing helpers for bilingual BIFROST site.
 * zh (default) has no prefix; en uses `/en` prefix.
 * Paths here are app-relative (no basePath). Use withBasePath for static assets.
 */

export type Locale = "zh" | "en";

export const locales: readonly Locale[] = ["zh", "en"] as const;

export const defaultLocale: Locale = "zh";

export function isLocale(value: string): value is Locale {
  return value === "zh" || value === "en";
}

/** Normalize to a leading-slash path; empty becomes `/`. */
function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  return withSlash.replace(/\/{2,}/g, "/");
}

/**
 * Build a locale-aware path.
 * - localePath("en", "/project") => "/en/project"
 * - localePath("zh", "/project") => "/project"
 * - localePath("en", "/") => "/en"
 */
export function localePath(locale: Locale, path: string): string {
  const p = normalizePath(path);
  if (locale === "zh") return p;
  if (p === "/") return "/en";
  return `/en${p}`;
}

/**
 * Detect locale from a pathname (Next.js usePathname style, no basePath).
 */
export function localeFromPathname(pathname: string): Locale {
  const p = normalizePath(pathname);
  if (p === "/en" || p.startsWith("/en/")) return "en";
  return "zh";
}

/**
 * Strip `/en` prefix and return the locale-neutral path.
 */
export function stripLocalePrefix(pathname: string): string {
  const p = normalizePath(pathname);
  if (p === "/en") return "/";
  if (p.startsWith("/en/")) {
    const rest = p.slice(3);
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return p;
}

/**
 * Switch the current pathname to another locale.
 * - switchLocalePath("/project", "en") => "/en/project"
 * - switchLocalePath("/en/project", "zh") => "/project"
 */
export function switchLocalePath(pathname: string, target: Locale): string {
  return localePath(target, stripLocalePrefix(pathname));
}
