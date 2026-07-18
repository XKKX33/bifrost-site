import type { Metadata } from "next";
import { AboutView } from "@/components/about";
import { getAbout } from "@/content/about";
import { getUi } from "@/content/i18n";

const locale = "zh" as const;

export function generateMetadata(): Metadata {
  const ui = getUi(locale);
  const about = getAbout(locale);
  return {
    title: ui.pages.about,
    description: about.manifesto,
  };
}

export default function AboutPage() {
  const content = getAbout(locale);
  return <AboutView locale={locale} content={content} />;
}
