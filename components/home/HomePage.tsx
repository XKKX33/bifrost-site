import Link from "next/link";
import { getUi } from "@/content/i18n";
import { getProject } from "@/content/project";
import { getTeam, listMembers } from "@/content/team";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import { HomePrimaryCta } from "./HomePrimaryCta";
import { HomeScrollReveal } from "./HomeScrollReveal";

type HomePageProps = {
  locale: Locale;
};

const CAPABILITIES = [
  {
    index: "01",
    token: "DATA",
    zh: "数据理解与可信治理",
    en: "Data understanding & trust governance",
  },
  {
    index: "02",
    token: "INTELLIGENCE",
    zh: "模型判断与智能洞察",
    en: "Model judgment & intelligent insight",
  },
  {
    index: "03",
    token: "PRODUCT",
    zh: "岗位专属产品体验",
    en: "Role-specific product experience",
  },
  {
    index: "04",
    token: "ENGINEERING",
    zh: "系统实现与协同闭环",
    en: "System build & collaboration loop",
  },
] as const;

/**
 * Full home narrative (sections 02–10). Loader is chrome section 01.
 */
export function HomePage({ locale }: HomePageProps) {
  const ui = getUi(locale);
  const project = getProject(locale);
  const team = getTeam(locale);
  const members = listMembers(locale);
  const isEn = locale === "en";

  const problemByTheme = {
    risk: project.problems.find((p) => p.theme === "risk") ?? project.problems[0],
    friction:
      project.problems.find((p) => p.theme === "friction") ?? project.problems[1],
    decision:
      project.problems.find((p) => p.theme === "decision") ?? project.problems[2],
  };

  const themeRisk = project.themes.find((t) => t.id === "risk");
  const themeFriction = project.themes.find((t) => t.id === "friction");
  const themeDecision = project.themes.find((t) => t.id === "decision");

  const projectHref = localePath(locale, "/project");
  const teamHref = localePath(locale, "/team");

  return (
    <main className="home">
      <HomeScrollReveal />
      {/* 02 Hero */}
      <section
        className="home-section home-hero"
        data-section="02"
        aria-labelledby="home-hero-title"
      >
        <div className="home-hero__mesh" aria-hidden>
          <svg className="home-nodes" viewBox="0 0 640 360" fill="none">
            <path
              className="home-nodes__edge"
              d="M80 280 C160 200 220 120 320 100 C420 80 480 140 560 90"
            />
            <path
              className="home-nodes__edge home-nodes__edge--delay"
              d="M60 90 C140 140 200 220 320 240 C440 260 500 180 580 260"
            />
            {[
              [80, 280],
              [200, 160],
              [320, 100],
              [420, 180],
              [560, 90],
              [60, 90],
              [320, 240],
              [580, 260],
            ].map(([cx, cy], i) => (
              <circle
                key={`${cx}-${cy}`}
                className="home-nodes__dot"
                cx={cx}
                cy={cy}
                r={i % 3 === 0 ? 4.5 : 3}
                style={{ animationDelay: `${i * 0.12}s` }}
              />
            ))}
          </svg>
        </div>

        <p className="home-kicker">
          {isEn ? "Team brand · Decision systems" : "团队品牌 · 决策系统"}
        </p>
        <h1 id="home-hero-title" className="home-hero__title">
          <span className="home-hero__mark">{ui.brand}</span>
          <span className="home-hero__emdash" aria-hidden>
            —
          </span>
        </h1>
        <p className="home-hero__claim">{ui.brandClaim}</p>
        <p className="home-hero__support">{ui.brandSupport}</p>

        <ul className="home-theme-chips" aria-label={isEn ? "Themes" : "主题"}>
          {project.themes.map((theme) => (
            <li key={theme.id}>
              <span className="home-chip">{theme.label}</span>
            </li>
          ))}
        </ul>

        <div className="home-hero__ctas">
          <HomePrimaryCta href={projectHref}>
            {ui.common.viewProject}
          </HomePrimaryCta>
          <Link href={teamHref} className="home-btn home-btn--ghost">
            {isEn ? "Meet the team" : "认识团队"}
          </Link>
        </div>
      </section>

      {/* 03 Theme Risk */}
      <section
        className="home-section home-theme home-theme--risk"
        data-section="03"
        aria-labelledby="home-theme-risk"
      >
        <div className="home-theme__index" aria-hidden>
          03
        </div>
        <div className="home-theme__body">
          <p className="home-kicker">{themeRisk?.label ?? "Risk"}</p>
          <h2 id="home-theme-risk" className="home-theme__title">
            {problemByTheme.risk.question}
          </h2>
          <p className="home-theme__lead">{themeRisk?.short}</p>
          <p className="home-theme__copy">{problemByTheme.risk.answer}</p>
          <div className="home-theme__viz home-theme__viz--curve" aria-hidden>
            <svg viewBox="0 0 400 120" className="home-risk-curve">
              <path
                className="home-risk-curve__late"
                d="M20 90 C80 88 120 86 160 82 C220 76 260 70 320 40 C350 24 370 16 390 10"
              />
              <path
                className="home-risk-curve__early"
                d="M20 90 C60 70 90 40 130 28 C180 14 220 30 260 48 C300 66 340 72 390 68"
              />
              <text x="24" y="112" className="home-risk-curve__label">
                {isEn ? "signal" : "信号"}
              </text>
              <text x="300" y="112" className="home-risk-curve__label">
                {isEn ? "impact" : "影响"}
              </text>
            </svg>
          </div>
        </div>
      </section>

      {/* 04 Theme Information Friction */}
      <section
        className="home-section home-theme home-theme--friction"
        data-section="04"
        aria-labelledby="home-theme-friction"
      >
        <div className="home-theme__index" aria-hidden>
          04
        </div>
        <div className="home-theme__body">
          <p className="home-kicker">{themeFriction?.label ?? "Friction"}</p>
          <h2 id="home-theme-friction" className="home-theme__title">
            {problemByTheme.friction.question}
          </h2>
          <p className="home-theme__lead">{themeFriction?.short}</p>
          <p className="home-theme__copy">{problemByTheme.friction.answer}</p>
          <div className="home-theme__viz home-theme__viz--nodes" aria-hidden>
            <div className="home-friction-nodes">
              {(isEn
                ? ["Quality", "Production", "Planning", "Manager"]
                : ["质量", "生产", "计划", "管理"]
              ).map((label, i) => (
                <span
                  key={label}
                  className="home-friction-nodes__node"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  {label}
                </span>
              ))}
              <span className="home-friction-nodes__hub">
                {isEn ? "shared fact" : "同一事实"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 05 Theme Decision / role teaser */}
      <section
        className="home-section home-theme home-theme--decision"
        data-section="05"
        aria-labelledby="home-theme-decision"
      >
        <div className="home-theme__index" aria-hidden>
          05
        </div>
        <div className="home-theme__body">
          <p className="home-kicker">{themeDecision?.label ?? "Decision"}</p>
          <h2 id="home-theme-decision" className="home-theme__title">
            {problemByTheme.decision.question}
          </h2>
          <p className="home-theme__lead">{themeDecision?.short}</p>
          <p className="home-theme__copy">{problemByTheme.decision.answer}</p>
          <ul className="home-role-teaser">
            {project.roles.map((role) => (
              <li key={role.id} className="home-role-teaser__card">
                <span className="home-role-teaser__label">{role.label}</span>
                <span className="home-role-teaser__focus">{role.focus}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 06 DecisionLoop featured preview */}
      <section
        className="home-section home-featured"
        data-section="06"
        aria-labelledby="home-featured-title"
      >
        <p className="home-kicker">
          {isEn ? "Featured project" : "代表项目"}
        </p>
        <div className="home-featured__grid">
          <div>
            <h2 id="home-featured-title" className="home-featured__name">
              {project.definition.name}
            </h2>
            <p className="home-featured__subtitle">
              {project.definition.subtitle}
            </p>
            <p className="home-featured__summary">{project.dualEngine.summary}</p>
            <Link href={projectHref} className="home-btn home-btn--primary">
              {ui.common.viewProject}
            </Link>
          </div>
          <div className="home-featured__engine">
            <p className="home-featured__engine-title">
              {project.dualEngine.headline}
            </p>
            <ol className="home-featured__pillars">
              {project.dualEngine.pillars.map((pillar, i) => (
                <li key={pillar}>
                  <span className="home-featured__pillar-i">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{pillar}</span>
                </li>
              ))}
            </ol>
            <p className="home-featured__attr">
              {project.attribution.scenario} · {project.attribution.context}
            </p>
          </div>
        </div>
      </section>

      {/* 07 Loop steps preview */}
      <section
        className="home-section home-loop"
        data-section="07"
        aria-labelledby="home-loop-title"
      >
        <p className="home-kicker">
          {isEn ? "Closed loop · DecisionLoop" : "决策闭环 · DecisionLoop"}
        </p>
        <h2 id="home-loop-title" className="home-section__title">
          {isEn
            ? "5-step DecisionLoop: from signal to knowledge"
            : "五步 DecisionLoop：从信号到沉淀"}
        </h2>
        <p className="home-loop__note">
          {isEn
            ? "The closed loop is the proposal’s 5-step DecisionLoop (five layers). Home narrative sections map to this same loop—not nine invented steps."
            : "闭环即提案中的五步 DecisionLoop（五层）。首页叙事段落映射同一闭环，而非另行发明九步。"}
        </p>
        <ol className="home-loop__list">
          {project.loopSteps.map((step) => (
            <li key={step.step} className="home-loop__item">
              <span className="home-loop__step">
                {String(step.step).padStart(2, "0")}
              </span>
              <div className="home-loop__content">
                <h3 className="home-loop__title">{step.title}</h3>
                <p className="home-loop__layer">{step.layer}</p>
                <p className="home-loop__desc">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 08 Capabilities */}
      <section
        className="home-section home-caps"
        data-section="08"
        aria-labelledby="home-caps-title"
      >
        <p className="home-kicker">
          {isEn ? "Capabilities" : "能力"}
        </p>
        <h2 id="home-caps-title" className="home-section__title">
          {team.capabilityBridge.title}
        </h2>
        <ul className="home-caps__list">
          {CAPABILITIES.map((cap) => (
            <li key={cap.token} className="home-caps__item">
              <span className="home-caps__index">{cap.index}</span>
              <span className="home-caps__token">{cap.token}</span>
              <span className="home-caps__label">
                {isEn ? cap.en : cap.zh}
              </span>
            </li>
          ))}
        </ul>
        <div className="home-caps__bridge" aria-hidden>
          {team.capabilityBridge.nodes.map((node, i) => (
            <span key={node.id} className="home-caps__bridge-node">
              {i > 0 ? (
                <span className="home-caps__bridge-arrow">→</span>
              ) : null}
              {node.label}
            </span>
          ))}
        </div>
      </section>

      {/* 09 Members horizontal */}
      <section
        className="home-section home-members"
        data-section="09"
        aria-labelledby="home-members-title"
      >
        <div className="home-members__head">
          <div>
            <p className="home-kicker">
              {isEn ? "People" : "成员"}
            </p>
            <h2 id="home-members-title" className="home-section__title">
              {team.membersSectionTitle}
            </h2>
            <p className="home-members__support">
              {team.membersSectionSupport}
            </p>
          </div>
          <Link href={teamHref} className="home-btn home-btn--ghost">
            {isEn ? "All members" : "全部成员"}
          </Link>
        </div>
        <ul className="home-members__rail">
          {members.map((member) => (
            <li key={member.slug}>
              <Link
                href={localePath(locale, `/team/${member.slug}`)}
                className="home-member-card"
              >
                <span className="home-member-card__mono" aria-hidden>
                  {member.monogram}
                </span>
                <span className="home-member-card__name">
                  {member.displayName}
                </span>
                <span className="home-member-card__role">{member.role}</span>
                {member.bioComingSoon ? (
                  <span className="home-member-card__soon">
                    {team.bioComingSoonLabel}
                  </span>
                ) : (
                  <span className="home-member-card__intro">{member.intro}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 10 Footer closer */}
      <section
        className="home-section home-closer"
        data-section="10"
        aria-labelledby="home-closer-title"
      >
        <p className="home-closer__line" id="home-closer-title">
          BUILD THE BRIDGE…
        </p>
        <p className="home-closer__claim">{ui.brandClaim}</p>
        <p className="home-closer__support">{ui.brandSupport}</p>
        <div className="home-closer__ctas">
          <Link
            href={localePath(locale, "/contact")}
            className="home-btn home-btn--primary"
          >
            {ui.common.contactUs}
          </Link>
          <Link href={projectHref} className="home-btn home-btn--ghost">
            {ui.common.learnMore}
          </Link>
        </div>
      </section>
    </main>
  );
}
