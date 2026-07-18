import type { NextConfig } from "next";

/**
 * Dual deploy:
 * - Default (dev / Vercel): no basePath, normal Next server build
 * - GitHub Pages / Actions: static export + repo basePath
 */
const repoName = process.env.NEXT_PUBLIC_REPO_NAME || "bifrost-site";
const useGithubPages =
  process.env.GITHUB_PAGES === "true" || process.env.GITHUB_ACTIONS === "true";
const basePath = useGithubPages ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  ...(useGithubPages
    ? {
        output: "export" as const,
        trailingSlash: true,
        basePath,
        assetPrefix: basePath ? `${basePath}/` : undefined,
        images: {
          unoptimized: true,
        },
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
