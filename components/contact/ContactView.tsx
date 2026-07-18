import Link from "next/link";
import type { ContactContent } from "@/content/site-contact";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

type ContactViewProps = {
  locale: Locale;
  content: ContactContent;
  email: string;
  githubUrl: string | null;
};

/**
 * Contact closer: large headline + team email mailto + GitHub TBA.
 * No forms backend, no private phone.
 */
export function ContactView({
  locale,
  content,
  email,
  githubUrl,
}: ContactViewProps) {
  const homeHref = localePath(locale, "/");
  const mailto = `mailto:${email}`;

  return (
    <main className="contact-page">
      <div className="contact-page__stage">
        <p className="contact-page__eyebrow">{content.eyebrow}</p>
        <h1 className="contact-page__headline">{content.headline}</h1>
        <p className="contact-page__support">{content.support}</p>

        <div className="contact-page__channels">
          <div className="contact-page__channel">
            <span className="contact-page__channel-label">
              {content.emailLabel}
            </span>
            <a href={mailto} className="contact-page__email">
              {email}
            </a>
          </div>

          <div className="contact-page__channel">
            <span className="contact-page__channel-label">
              {content.githubLabel}
            </span>
            {githubUrl ? (
              <a
                href={githubUrl}
                className="contact-page__github"
                target="_blank"
                rel="noopener noreferrer"
              >
                {githubUrl.replace(/^https?:\/\//, "")}
              </a>
            ) : (
              <span className="contact-page__tba">{content.githubTba}</span>
            )}
          </div>
        </div>

        <div className="contact-page__actions">
          <a href={mailto} className="contact-page__cta">
            {content.ctaLabel}
          </a>
          <p className="contact-page__note">{content.responseNote}</p>
        </div>

        <Link href={homeHref} className="contact-page__home">
          {content.backHome}
        </Link>
      </div>
    </main>
  );
}
