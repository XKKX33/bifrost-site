import type { ProjectContent } from "./types";

/** en DecisionLoop project content. Metrics = projected proposal outcomes. */
export const enProject: ProjectContent = {
  definition: {
    name: "DecisionLoop",
    title: "DecisionLoop",
    subtitle:
      "Real-time role-specific manufacturing dashboards and closed-loop decision platform",
  },
  dualEngine: {
    headline: "Dual-engine architecture",
    pillars: [
      "Prescribed base governance",
      "AI elastic configuration",
      "Feishu Project closed loop",
    ] as const,
    summary:
      "Built on Feishu Aily and multi-dimensional tables (bitable). Under rigid group-wide metric definitions and permission isolation, generate role-specific decision views in seconds and turn anomaly insights into native Feishu collaboration tasks, closing the loop from detection to disposition and knowledge capture.",
  },
  problems: [
    {
      id: "riskLag",
      theme: "risk",
      question: "Why is risk always seen too late?",
      answer:
        "Anomalies depend on manual roll-ups and weekly/monthly reports, so the best response window is often missed. Trust-first scoring and real-time signals matter more than after-the-fact reviews.",
    },
    {
      id: "infoFriction",
      theme: "friction",
      question: "Why does cross-role information keep leaking through friction?",
      answer:
        "Data silos and inconsistent definitions make the same metric disagree across systems. A governed metric framework and permission matrix cut that friction.",
    },
    {
      id: "homogenizedDecision",
      theme: "decision",
      question: "Why do decisions feel homogenized and hard to execute?",
      answer:
        "One-size-fits-all reports cannot serve management, quality, production, and planning goals. Views must assemble dynamically by role, objective, and live risk, with a disposition loop attached.",
    },
  ],
  loopSteps: [
    {
      step: 1,
      title: "Data intake & trust management",
      layer: "Bitable + Aily cleansing",
      description:
        "Ingest multi-source data; AI pre-screens defects. If trust score is below 0.85, intercept and prioritize verification instead of blind alerts, protecting frontline trust.",
    },
    {
      step: 2,
      title: "Dual-engine dashboard",
      layer: "Feishu Aily agent",
      description:
        "IT presets full standard metrics and permission matrix in bitable (rigid base). AI assembles views by role, current goals, and live risk, blocking metric-definition drift.",
    },
    {
      step: 3,
      title: "Intelligent insight",
      layer: "Feature / algorithm engine",
      description:
        "Time-series and ML surface anomaly start points plus cause-feature candidates with confidence, assisting rather than replacing human judgment in multi-factor manufacturing cases.",
    },
    {
      step: 4,
      title: "Feishu collaboration",
      layer: "Feishu Project + bots",
      description:
        "On high-risk anomalies, AI opens disposition work items in Feishu Project, pushes via Feishu IM to the on-shift owner, and supports timeout escalation.",
    },
    {
      step: 5,
      title: "Review & knowledge capture",
      layer: "Advanced automation",
      description:
        "After handling, compare before/after data and apply similar-batch counterfactual checks. Effective measures enter the knowledge base; ineffective ones re-enter diagnosis.",
    },
  ],
  metrics: {
    trustThreshold: 0.85,
    disclaimer:
      "All figures below are projected proposal outcomes (方案预期), from the DecisionLoop proposal context. They are not proven production KPIs, and they do not claim BIFROST has shipped or measured these results on Goertek lines.",
    items: [
      {
        id: "dashboardSpeed",
        label: "Dashboard setup lead time",
        baseline: "IT backlog, typically 3–7 days",
        target: "Minutes, via natural-language dynamic response",
        kind: "projected",
        note: "Projected",
      },
      {
        id: "verifyReduction",
        label: "Verification labor",
        baseline: "Manual layer-by-layer checks after anomalies",
        target: "Expected reduction of 50%+",
        kind: "projected",
        note: "Projected",
      },
      {
        id: "decisionSpeed",
        label: "Decision response speed",
        baseline: "Passive decisions from weekly/monthly reports",
        target: "Overall improvement of 30%+",
        kind: "projected",
        note: "Projected",
      },
      {
        id: "rolesCoverage",
        label: "Pilot role coverage",
        baseline: "Information chimneys; each role hunts data alone",
        target: "First wave: 4 core roles, 100% dashboard + loop coverage",
        kind: "projected",
        note: "Projected",
      },
    ],
  },
  techStack: [
    {
      id: "aily",
      name: "Feishu Aily",
      role: "Agent and dynamic dashboard assembly",
    },
    {
      id: "bitable",
      name: "Feishu multi-dimensional tables",
      role: "Metric base, permissions, and data intake",
    },
    {
      id: "project",
      name: "Feishu Project",
      role: "Disposition work items and collaboration loop",
    },
    {
      id: "im",
      name: "Feishu IM",
      role: "Owner push and escalation notifications",
    },
    {
      id: "automation",
      name: "Feishu automation",
      role: "Review capture and workflow orchestration",
    },
    {
      id: "tsml",
      name: "Time-series + machine learning",
      role: "Anomaly start points and cause-feature candidates",
    },
  ],
  attribution: {
    scenario: "Goertek precision manufacturing scenario",
    context: "DecisionLoop proposal context (opening report / solution design)",
    metricsNote:
      "Quantitative targets are projected proposal outcomes only. They do not mean BIFROST has delivered or validated these KPIs in Goertek production.",
  },
  themes: [
    {
      id: "risk",
      label: "Risk early warning",
      short: "See risk earlier",
    },
    {
      id: "friction",
      label: "Information friction",
      short: "Cut cross-role information loss",
    },
    {
      id: "decision",
      label: "Decision support",
      short: "Role-specific, actionable closed-loop decisions",
    },
  ],
  roles: [
    {
      id: "manager",
      label: "Manager",
      focus: "Overall risk, order impact, and approval pace",
      fields: {
        overallRisk: "High · Product A defect rate rising",
        affectedOrders: "Order O003 and related orders impacted",
        estimatedLoss: "Estimated loss band (mock)",
        progress: "Disposition in progress; cross-role confirmations pending",
        approvals: "Pending: escalation measures / schedule change",
      },
    },
    {
      id: "quality",
      label: "Quality",
      focus: "Anomaly start, batch, and cause candidates",
      fields: {
        anomalyStart: "7/11",
        line: "L02",
        batch: "B015",
        defect: "Sustained defect-rate rise (Product A)",
        causeCandidate: "Material batch (candidate, not sole conclusion)",
        actions: "Intercept & verify → review cause candidates → collaborate",
      },
    },
    {
      id: "production",
      label: "Production",
      focus: "Lines, batches, and shop-floor measures",
      fields: {
        lines: "L02 (focus) and related lines",
        batches: "B015 and similar-batch checks",
        measures: "Throttle & recheck / process audit / material hold (mock)",
        owner: "On-shift production owner (roster push)",
        deadline: "Timeout auto-escalation (Feishu Project)",
      },
    },
    {
      id: "planning",
      label: "Planning",
      focus: "Order OTIF, capacity, and schedule advice",
      fields: {
        order: "O003",
        delayProbability: "81%",
        capacityGap: "18%",
        inventory: "Critical material buffer (mock)",
        scheduleAdvice:
          "Adjust schedule window to protect O003 delivery risk first",
      },
    },
  ],
  incident: {
    title: "Product A defect rate keeps rising",
    summary:
      "Mock scenario: Product A on line L02, batch B015 shows a sustained defect-rate rise; order O003 delivery risk increases. Role views share one incident with role-specific fields (data layer only, no simulator UI).",
    mockIds: {
      product: "Product A",
      line: "L02",
      batch: "B015",
      order: "O003",
    },
  },
};
