import type { Metadata } from "next";
import { TeamPage } from "@/components/team";
import { getTeam } from "@/content/team";
import { getUi } from "@/content/i18n";

const locale = "zh" as const;

export function generateMetadata(): Metadata {
  const team = getTeam(locale);
  const ui = getUi(locale);
  return {
    title: ui.pages.team,
    description: team.support,
  };
}

export default function ZhTeamRoute() {
  return <TeamPage locale={locale} />;
}
