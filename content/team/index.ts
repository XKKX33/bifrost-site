import type { Locale } from "@/lib/i18n";
import type { MemberSlug } from "@/content/members";
import { isMemberSlug, MEMBER_SLUGS } from "@/content/members";
import { enTeam } from "./en";
import type { TeamContent, TeamMember } from "./types";
import { zhTeam } from "./zh";

export type {
  CapabilityBridgeNode,
  MemberAward,
  MemberEducation,
  MemberProject,
  PhilosophyKey,
  PhilosophyPillar,
  SkillCategory,
  SkillCategoryId,
  TeamContent,
  TeamMember,
} from "./types";

export { enTeam } from "./en";
export { zhTeam } from "./zh";

export function getTeam(locale: Locale): TeamContent {
  return locale === "en" ? enTeam : zhTeam;
}

export function listMembers(locale: Locale): TeamMember[] {
  return getTeam(locale).members;
}

export function getMember(
  locale: Locale,
  slug: string,
): TeamMember | undefined {
  if (!isMemberSlug(slug)) return undefined;
  return getTeam(locale).members.find((m) => m.slug === slug);
}

/** Ordered slugs for SSG (same as MEMBER_SLUGS). */
export function listMemberSlugs(): readonly MemberSlug[] {
  return MEMBER_SLUGS;
}
