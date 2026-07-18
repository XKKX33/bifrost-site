/**
 * Static member slugs for generateStaticParams.
 * Full bilingual records: `content/team/` → getMember / getTeam / listMembers.
 */

export const MEMBER_SLUGS = ["kuang-xuan", "member-b", "member-c"] as const;

export type MemberSlug = (typeof MEMBER_SLUGS)[number];

export function isMemberSlug(value: string): value is MemberSlug {
  return (MEMBER_SLUGS as readonly string[]).includes(value);
}
