/**
 * Site contact config (public team channels only).
 * Email overridable via NEXT_PUBLIC_TEAM_EMAIL at build time.
 * No private phone / personal QQ.
 */

import type { Locale } from "@/lib/i18n";

export const DEFAULT_TEAM_EMAIL = "kekeyee@outlook.com";

/** GitHub org/repo placeholder until public. */
export const GITHUB_PLACEHOLDER_URL = "";

export type ContactContent = {
  eyebrow: string;
  /** Large closer headline */
  headline: string;
  support: string;
  emailLabel: string;
  ctaLabel: string;
  githubLabel: string;
  /** Shown when no public GitHub URL yet */
  githubTba: string;
  responseNote: string;
  backHome: string;
};

const zhContact: ContactContent = {
  eyebrow: "联系",
  headline: "一起把风险接到决策上",
  support:
    "合作、实习、项目共创或媒体联络，请写信给我们。我们会用团队邮箱回复，不设公开电话。",
  emailLabel: "团队邮箱",
  ctaLabel: "发送邮件",
  githubLabel: "GitHub",
  githubTba: "即将公开 · TBA",
  responseNote: "通常在工作日 48 小时内回复。",
  backHome: "返回首页",
};

const enContact: ContactContent = {
  eyebrow: "Contact",
  headline: "Let’s connect risk to decisions",
  support:
    "For collaboration, internships, co-builds, or press — write us. We reply from the team inbox. No public phone.",
  emailLabel: "Team email",
  ctaLabel: "Email us",
  githubLabel: "GitHub",
  githubTba: "Coming soon · TBA",
  responseNote: "We usually reply within two business days.",
  backHome: "Back home",
};

export function getContact(locale: Locale): ContactContent {
  return locale === "en" ? enContact : zhContact;
}

/**
 * Resolve public team email: env override, else content default.
 * Safe for static export (NEXT_PUBLIC_* baked at build).
 */
export function getTeamEmail(): string {
  const fromEnv = process.env.NEXT_PUBLIC_TEAM_EMAIL?.trim();
  if (fromEnv) return fromEnv;
  return DEFAULT_TEAM_EMAIL;
}

export function getGithubUrl(): string | null {
  const fromEnv = process.env.NEXT_PUBLIC_GITHUB_URL?.trim();
  if (fromEnv) return fromEnv;
  if (GITHUB_PLACEHOLDER_URL) return GITHUB_PLACEHOLDER_URL;
  return null;
}
