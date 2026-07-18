import type { Metadata } from "next";
import { ProjectPage } from "@/components/project";
import { getUi } from "@/content/i18n";
import { getProject } from "@/content/project";

const locale = "zh" as const;

export function generateMetadata(): Metadata {
  const ui = getUi(locale);
  const project = getProject(locale);
  return {
    title: ui.pages.project,
    description: `${project.definition.title} — ${project.definition.subtitle}`,
  };
}

export default function ZhProjectRoute() {
  return <ProjectPage locale={locale} />;
}
