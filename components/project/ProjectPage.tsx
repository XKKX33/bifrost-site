import type { Locale } from "@/lib/i18n";
import { getProject } from "@/content/project";
import { RoleSimulator } from "./RoleSimulator";

type ProjectPageProps = {
  locale: Locale;
};

const SECTION: Record<
  Locale,
  {
    metaYear: string;
    why: string;
    flow: string;
    capabilities: string;
    story: string;
    tech: string;
    metrics: string;
    baseline: string;
    target: string;
    projectedBadge: string;
  }
> = {
  zh: {
    metaYear: "2026",
    why: "为什么存在",
    flow: "系统闭环",
    capabilities: "三大能力",
    story: "闭环故事",
    tech: "技术底座",
    metrics: "方案预期成效",
    baseline: "现状",
    target: "目标",
    projectedBadge: "方案预期",
  },
  en: {
    metaYear: "2026",
    why: "Why it exists",
    flow: "System loop",
    capabilities: "Three capabilities",
    story: "Closed-loop story",
    tech: "Tech foundation",
    metrics: "Projected outcomes",
    baseline: "Baseline",
    target: "Target",
    projectedBadge: "Projected",
  },
};

/**
 * DecisionLoop interactive case page — shared by `/project` and `/en/project`.
 */
export function ProjectPage({ locale }: ProjectPageProps) {
  const project = getProject(locale);
  const s = SECTION[locale];
  const { definition, dualEngine, problems, loopSteps, themes, metrics, techStack, attribution, roles, incident } =
    project;

  return (
    <main className="project-page">
      {/* 1. Definition hero */}
      <section className="project-hero" aria-labelledby="project-hero-title">
        <div className="project-hero__meta">
          <span className="project-hero__name">{definition.name}</span>
          <span className="project-hero__year" aria-label="year">
            {s.metaYear}
          </span>
        </div>
        <h1 id="project-hero-title" className="project-hero__title">
          {definition.title}
        </h1>
        <p className="project-hero__subtitle">{definition.subtitle}</p>
        <div className="project-hero__engine">
          <p className="project-hero__engine-headline">{dualEngine.headline}</p>
          <ul className="project-hero__pillars">
            {dualEngine.pillars.map((pillar) => (
              <li key={pillar}>{pillar}</li>
            ))}
          </ul>
          <p className="project-hero__engine-summary">{dualEngine.summary}</p>
        </div>
        <span className="project-hero__accent" aria-hidden />
      </section>

      {/* 2. Why exists — 3 problems */}
      <section className="project-section" aria-labelledby="project-why-title">
        <header className="project-section__head">
          <p className="project-section__eyebrow">02</p>
          <h2 id="project-why-title" className="project-section__title">
            {s.why}
          </h2>
        </header>
        <ol className="project-problems">
          {problems.map((problem, i) => (
            <li key={problem.id} className="project-problems__item" data-theme={problem.theme}>
              <span className="project-problems__index" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="project-problems__body">
                <h3 className="project-problems__q">{problem.question}</h3>
                <p className="project-problems__a">{problem.answer}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 3. System flow — loopSteps */}
      <section className="project-section" aria-labelledby="project-flow-title">
        <header className="project-section__head">
          <p className="project-section__eyebrow">03</p>
          <h2 id="project-flow-title" className="project-section__title">
            {s.flow}
          </h2>
        </header>
        <ol className="project-flow">
          {loopSteps.map((step) => (
            <li key={step.step} className="project-flow__step">
              <div className="project-flow__rail" aria-hidden>
                <span className="project-flow__num">
                  {String(step.step).padStart(2, "0")}
                </span>
              </div>
              <div className="project-flow__content">
                <p className="project-flow__layer">{step.layer}</p>
                <h3 className="project-flow__title">{step.title}</h3>
                <p className="project-flow__desc">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 4. Three capabilities / themes */}
      <section
        className="project-section"
        aria-labelledby="project-cap-title"
      >
        <header className="project-section__head">
          <p className="project-section__eyebrow">04</p>
          <h2 id="project-cap-title" className="project-section__title">
            {s.capabilities}
          </h2>
        </header>
        <ul className="project-themes">
          {themes.map((theme) => (
            <li key={theme.id} className="project-themes__card" data-theme={theme.id}>
              <p className="project-themes__id">{theme.id}</p>
              <h3 className="project-themes__label">{theme.label}</h3>
              <p className="project-themes__short">{theme.short}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 5. Role decision simulator */}
      <section
        className="project-section project-section--simulator"
        aria-labelledby="project-sim-title"
      >
        <header className="project-section__head">
          <p className="project-section__eyebrow">05</p>
          <h2 id="project-sim-title" className="project-section__title">
            {locale === "zh" ? "角色决策模拟" : "Role decision simulator"}
          </h2>
        </header>
        <RoleSimulator locale={locale} incident={incident} roles={roles} />
      </section>

      {/* 6. Closed-loop story (reuses loopSteps as narrative beats) */}
      <section
        className="project-section"
        aria-labelledby="project-story-title"
      >
        <header className="project-section__head">
          <p className="project-section__eyebrow">06</p>
          <h2 id="project-story-title" className="project-section__title">
            {s.story}
          </h2>
        </header>
        <ol className="project-story">
          {loopSteps.map((step) => (
            <li key={`story-${step.step}`} className="project-story__beat">
              <span className="project-story__step" aria-hidden>
                {step.step}
              </span>
              <div>
                <h3 className="project-story__title">{step.title}</h3>
                <p className="project-story__desc">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 7. Tech base + metrics with projected disclaimer */}
      <section
        className="project-section"
        aria-labelledby="project-tech-title"
      >
        <header className="project-section__head">
          <p className="project-section__eyebrow">07</p>
          <h2 id="project-tech-title" className="project-section__title">
            {s.tech}
          </h2>
        </header>
        <ul className="project-tech">
          {techStack.map((item) => (
            <li key={item.id} className="project-tech__item">
              <span className="project-tech__name">{item.name}</span>
              <span className="project-tech__role">{item.role}</span>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="project-section project-section--metrics"
        aria-labelledby="project-metrics-title"
      >
        <header className="project-section__head">
          <p className="project-section__eyebrow">08</p>
          <h2 id="project-metrics-title" className="project-section__title">
            {s.metrics}
          </h2>
        </header>
        <p className="project-metrics__disclaimer" role="note">
          {metrics.disclaimer}
        </p>
        <p className="project-metrics__threshold">
          {locale === "zh" ? "可信度门槛" : "Trust threshold"}{" "}
          <strong>{metrics.trustThreshold}</strong>
        </p>
        <ul className="project-metrics">
          {metrics.items.map((item) => (
            <li key={item.id} className="project-metrics__card">
              <div className="project-metrics__top">
                <h3 className="project-metrics__label">{item.label}</h3>
                <span className="project-metrics__badge">
                  {item.note || s.projectedBadge}
                </span>
              </div>
              <dl className="project-metrics__pair">
                <div>
                  <dt>{s.baseline}</dt>
                  <dd>{item.baseline}</dd>
                </div>
                <div>
                  <dt>{s.target}</dt>
                  <dd>{item.target}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </section>

      {/* 8. Attribution */}
      <footer className="project-attribution">
        <p className="project-attribution__scenario">{attribution.scenario}</p>
        <p className="project-attribution__context">{attribution.context}</p>
        <p className="project-attribution__note">{attribution.metricsNote}</p>
      </footer>
    </main>
  );
}
