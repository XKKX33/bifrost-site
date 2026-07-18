import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MemberPage } from "@/components/team";
import { MEMBER_SLUGS } from "@/content/members";
import { getMember } from "@/content/team";
import { getUi } from "@/content/i18n";

const locale = "en" as const;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return MEMBER_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = getMember(locale, slug);
  const ui = getUi(locale);
  if (!member) {
    return { title: ui.pages.memberPlaceholder };
  }
  return {
    title: member.displayName,
    description: member.intro,
  };
}

export default async function EnMemberRoute({ params }: PageProps) {
  const { slug } = await params;
  const member = getMember(locale, slug);
  if (!member) {
    notFound();
  }

  return <MemberPage locale={locale} slug={slug} />;
}
