import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import { getMember, getTeam } from "@/content/team";
import type { TeamMember } from "@/content/team";
import type { MemberSlug } from "@/content/members";
import { getUi } from "@/content/i18n";

type MemberPageProps = {
  locale: Locale;
  slug: string;
};

type TeamAccent = "sky" | "peach" | "mint";

const MEMBER_ACCENT: Record<MemberSlug, TeamAccent> = {
  "kuang-xuan": "sky",
  "member-b": "peach",
  "member-c": "mint",
};

function accentForSlug(slug: string): TeamAccent | undefined {
  if (slug in MEMBER_ACCENT) {
    return MEMBER_ACCENT[slug as MemberSlug];
  }
  return undefined;
}

type MemberLabels = {
  education: string;
  projects: string;
  skills: string;
  awards: string;
  keywords: string;
  tech: string;
  outcomes: string;
  role: string;
  period: string;
};

function labelsFor(locale: Locale): MemberLabels {
  if (locale === "en") {
    return {
      education: "Education",
      projects: "Selected work",
      skills: "Skills",
      awards: "Awards & credentials",
      keywords: "Focus",
      tech: "Stack",
      outcomes: "Outcomes",
      role: "Role",
      period: "Period",
    };
  }
  return {
    education: "教育经历",
    projects: "代表项目",
    skills: "能力标签",
    awards: "奖项与资质",
    keywords: "方向",
    tech: "技术栈",
    outcomes: "成果",
    role: "角色",
    period: "周期",
  };
}

function FullMemberBody({
  member,
  labels,
}: {
  member: TeamMember;
  labels: MemberLabels;
}) {
  return (
    <>
      {member.education.length > 0 ? (
        <section
          className="member-page__section"
          aria-labelledby="member-edu-title"
        >
          <h2 id="member-edu-title" className="member-page__section-title">
            {labels.education}
          </h2>
          <ol className="member-timeline">
            {member.education.map((edu) => (
              <li
                key={`${edu.school}-${edu.period}`}
                className="member-timeline__item"
              >
                <div className="member-timeline__rail" aria-hidden>
                  <span className="member-timeline__dot" />
                </div>
                <div className="member-timeline__content">
                  <p className="member-timeline__period">{edu.period}</p>
                  <h3 className="member-timeline__school">
                    {edu.school}
                    {edu.college ? (
                      <span className="member-timeline__college">
                        {" · "}
                        {edu.college}
                      </span>
                    ) : null}
                  </h3>
                  <p className="member-timeline__degree">
                    {edu.degree} · {edu.major}
                  </p>
                  {edu.keywords.length > 0 ? (
                    <ul className="member-tags" aria-label={labels.keywords}>
                      {edu.keywords.map((kw) => (
                        <li key={kw} className="member-tags__item">
                          {kw}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {member.projects.length > 0 ? (
        <section
          className="member-page__section"
          aria-labelledby="member-projects-title"
        >
          <h2
            id="member-projects-title"
            className="member-page__section-title"
          >
            {labels.projects}
          </h2>
          <ul className="member-projects">
            {member.projects.map((project) => (
              <li key={project.slug} className="member-project">
                <div className="member-project__meta">
                  <span className="member-project__period">
                    {project.period}
                  </span>
                  <span className="member-project__role">
                    {labels.role}: {project.role}
                  </span>
                </div>
                <h3 className="member-project__title">{project.title}</h3>
                <p className="member-project__summary">{project.summary}</p>
                {project.tech.length > 0 ? (
                  <ul className="member-tags" aria-label={labels.tech}>
                    {project.tech.map((t) => (
                      <li key={t} className="member-tags__item">
                        {t}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {project.outcomes.length > 0 ? (
                  <ul
                    className="member-project__outcomes"
                    aria-label={labels.outcomes}
                  >
                    {project.outcomes.map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {member.skills.length > 0 ? (
        <section
          className="member-page__section"
          aria-labelledby="member-skills-title"
        >
          <h2 id="member-skills-title" className="member-page__section-title">
            {labels.skills}
          </h2>
          <ul className="member-skills">
            {member.skills.map((cat) => (
              <li key={cat.id} className="member-skills__group">
                <h3 className="member-skills__label">{cat.label}</h3>
                <ul className="member-tags">
                  {cat.items.map((item) => (
                    <li key={item} className="member-tags__item">
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {member.awards.length > 0 ? (
        <section
          className="member-page__section"
          aria-labelledby="member-awards-title"
        >
          <h2 id="member-awards-title" className="member-page__section-title">
            {labels.awards}
          </h2>
          <ul className="member-awards">
            {member.awards.map((award) => (
              <li key={award.title} className="member-awards__item">
                {award.title}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}

/**
 * Member detail: full layout for kuang-xuan; bioComingSoon placeholders for B/C.
 * Caller must notFound() when getMember returns undefined.
 */
export function MemberPage({ locale, slug }: MemberPageProps) {
  const member = getMember(locale, slug);
  if (!member) {
    return null;
  }

  const team = getTeam(locale);
  const ui = getUi(locale);
  const labels = labelsFor(locale);
  const teamHref = localePath(locale, "/team");
  const accent = accentForSlug(member.slug);

  return (
    <main className="member-page" data-accent={accent}>
      <nav className="member-page__back" aria-label={ui.common.backToTeam}>
        <Link href={teamHref} className="member-page__back-link">
          ← {ui.common.backToTeam}
        </Link>
      </nav>

      <header className="member-page__hero">
        <div
          className="member-page__monogram"
          data-accent={accent}
          aria-hidden
        >
          {member.monogram}
        </div>
        <div className="member-page__identity">
          <p className="member-page__eyebrow">
            {locale === "en" ? "Member" : "成员"}
          </p>
          <h1 className="member-page__name">{member.displayName}</h1>
          <p className="member-page__role">{member.role}</p>
          {member.bioComingSoon ? (
            <p className="member-page__soon" role="status">
              {team.bioComingSoonLabel}
            </p>
          ) : (
            <p className="member-page__intro">{member.intro}</p>
          )}
        </div>
      </header>

      {member.bioComingSoon ? (
        <section className="member-page__placeholder" aria-live="polite">
          <p className="member-page__placeholder-text">
            {member.intro}
          </p>
        </section>
      ) : (
        <FullMemberBody member={member} labels={labels} />
      )}
    </main>
  );
}
