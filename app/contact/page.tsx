import type { Metadata } from "next";
import { ContactView } from "@/components/contact";
import { getUi } from "@/content/i18n";
import {
  getContact,
  getGithubUrl,
  getTeamEmail,
} from "@/content/site-contact";

const locale = "zh" as const;

export function generateMetadata(): Metadata {
  const ui = getUi(locale);
  const contact = getContact(locale);
  return {
    title: ui.pages.contact,
    description: contact.support,
  };
}

export default function ContactPage() {
  const content = getContact(locale);
  const email = getTeamEmail();
  const githubUrl = getGithubUrl();
  return (
    <ContactView
      locale={locale}
      content={content}
      email={email}
      githubUrl={githubUrl}
    />
  );
}
