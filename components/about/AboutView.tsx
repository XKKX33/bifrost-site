import Link from "next/link";
import type { AboutContent } from "@/content/about";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

type AboutViewProps = {
  locale: Locale;
  content: AboutContent;
};

/**
 * Brand manifesto page: bridge thesis + three themes.
 * Distinct from Team (people) — no member list.
 */
export function AboutView({ locale, content }: AboutViewProps) {
  const projectHref = localePath(locale, "/project");
  const teamHref = localePath(locale, "/team");
  const contactHref = localePath(locale, "/contact");

  return (
    <main className="about-page">
      <header className="about-page__hero">
        <p className="about-page__eyebrow">{content.eyebrow}</p>
        <h1 className="about-page__title">{content.title}</h1>
        <p className="about-page__manifesto">{content.manifesto}</p>
        <span className="about-page__bridge-bar" aria-hidden />
      </header>

      <section className="about-page__bridge" aria-labelledby="about-bridge">
        <h2 id="about-bridge" className="about-page__section-title">
          {content.bridge.headline}
        </h2>
        <p className="about-page__prose">{content.bridge.body}</p>
      </section>

      <section
        className="about-page__themes"
        aria-labelledby="about-themes"
      >
        <h2 id="about-themes" className="about-page__section-title">
          {content.themesHeading}
        </h2>
        <ul className="about-page__theme-list">
          {content.themes.map((theme) => (
            <li key={theme.id} className="about-page__theme">
              <p className="about-page__theme-label">{theme.label}</p>
              <h3 className="about-page__theme-title">{theme.title}</h3>
              <p className="about-page__theme-body">{theme.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="about-page__value" aria-labelledby="about-value">
        <h2 id="about-value" className="about-page__section-title">
          {content.value.headline}
        </h2>
        <p className="about-page__prose">{content.value.body}</p>
      </section>

      <nav className="about-page__links" aria-label={content.eyebrow}>
        <Link href={projectHref} className="about-page__link">
          {content.links.project}
        </Link>
        <Link href={teamHref} className="about-page__link">
          {content.links.team}
        </Link>
        <Link href={contactHref} className="about-page__link about-page__link--accent">
          {content.links.contact}
        </Link>
      </nav>
    </main>
  );
}
