/**
 * Team page + member resume content model (public fields only).
 * Privacy: no phone, DOB, hukou, politics, or personal QQ as contact.
 */

import type { MemberSlug } from "@/content/members";

export type PhilosophyKey = "anticipate" | "connect" | "decide";

export type PhilosophyPillar = {
  key: PhilosophyKey;
  /** English token stays Anticipate / Connect / Decide */
  title: string;
  /** Chinese or EN support line under the pillar */
  support: string;
};

export type CapabilityBridgeNode = {
  id: string;
  label: string;
};

export type MemberEducation = {
  school: string;
  college?: string;
  degree: string;
  major: string;
  period: string;
  /** Course / focus keywords (not full transcript) */
  keywords: string[];
};

export type MemberProject = {
  slug: string;
  title: string;
  period: string;
  role: string;
  summary: string;
  tech: string[];
  outcomes: string[];
};

export type SkillCategoryId =
  | "analytics"
  | "stats"
  | "ml"
  | "ai-workflow"
  | "data-eng";

export type SkillCategory = {
  id: SkillCategoryId;
  label: string;
  items: string[];
};

export type MemberAward = {
  title: string;
};

export type TeamMember = {
  slug: MemberSlug;
  displayName: string;
  role: string;
  intro: string;
  /** Initials monogram when no photo */
  monogram: string;
  /** true for placeholder members without full resume */
  bioComingSoon: boolean;
  education: MemberEducation[];
  projects: MemberProject[];
  skills: SkillCategory[];
  awards: MemberAward[];
};

export type TeamContent = {
  headline: string;
  support: string;
  philosophy: PhilosophyPillar[];
  capabilityBridge: {
    title: string;
    nodes: CapabilityBridgeNode[];
  };
  membersSectionTitle: string;
  membersSectionSupport: string;
  bioComingSoonLabel: string;
  members: TeamMember[];
};
