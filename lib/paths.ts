/**
 * Prefix absolute paths for GitHub Pages basePath.
 * next/link handles basePath automatically; plain <a href> / asset URLs do not.
 */
export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!path.startsWith("/")) return path;
  if (!base) return path;
  if (path === "/") return `${base}/`;
  return `${base}${path}`;
}
