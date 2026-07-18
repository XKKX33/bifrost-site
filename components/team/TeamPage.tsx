import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import { getTeam } from "@/content/team";

type TeamPageProps = {
  locale: Locale;
};

/**
 * Team landing: philosophy (Anticipate / Connect / Decide),
 * capability bridge nodes, member list → /team/[slug].
 */
export function TeamPage({ locale }: TeamPageProps) {
  const team = getTeam(locale);

  return (
    <main className="team-page">
      <header className="team-page__hero">
        <p className="team-page__eyebrow">
          {locale === "en" ? "Team" : "团队"}
        </p>
        <h1 className="team-page__headline">{team.headline}</h1>
        <p className="team-page__support">{team.support}</p>
        <span className="team-page__rule" aria-hidden />
      </header>

      <section
        className="team-page__philosophy"
        aria-labelledby="team-philosophy-title"
      >
        <h2 id="team-philosophy-title" className="team-page__section-title">
          {locale === "en" ? "Philosophy" : "理念"}
        </h2>
        <ul className="team-philosophy">
          {team.philosophy.map((pillar) => (
            <li key={pillar.key} className="team-philosophy__item">
              <span className="team-philosophy__key" aria-hidden>
                {pillar.key}
              </span>
              <h3 className="team-philosophy__title">{pillar.title}</h3>
              <p className="team-philosophy__support">{pillar.support}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="team-page__bridge"
        aria-labelledby="team-bridge-title"
      >
        <h2 id="team-bridge-title" className="team-page__section-title">
          {team.capabilityBridge.title}
        </h2>
        <ol className="team-bridge">
          {team.capabilityBridge.nodes.map((node, index) => (
            <li key={node.id} className="team-bridge__node">
              {index > 0 ? (
                <span className="team-bridge__link" aria-hidden />
              ) : null}
              <span className="team-bridge__dot" aria-hidden />
              <span className="team-bridge__label">{node.label}</span>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="team-page__members"
        aria-labelledby="team-members-title"
      >
        <div className="team-page__members-head">
          <h2 id="team-members-title" className="team-page__section-title">
            {team.membersSectionTitle}
          </h2>
          <p className="team-page__members-support">
            {team.membersSectionSupport}
          </p>
        </div>
        <ul className="team-members">
          {team.members.map((member) => {
            const href = localePath(locale, `/team/${member.slug}`);
            return (
              <li key={member.slug}>
                <Link href={href} className="team-member-card">
                  <span className="team-member-card__monogram" aria-hidden>
                    {member.monogram}
                  </span>
                  <span className="team-member-card__body">
                    <span className="team-member-card__name">
                      {member.displayName}
                    </span>
                    <span className="team-member-card__role">{member.role}</span>
                    {member.bioComingSoon ? (
                      <span className="team-member-card__soon">
                        {team.bioComingSoonLabel}
                      </span>
                    ) : (
                      <span className="team-member-card__intro">
                        {member.intro}
                      </span>
                    )}
                  </span>
                  <span className="team-member-card__arrow" aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
