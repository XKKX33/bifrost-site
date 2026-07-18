/**
 * Typed DecisionLoop project content (data only, no UI).
 * Metrics are proposal projections (方案预期), not proven production KPI.
 */

export type ProjectThemeId = "risk" | "friction" | "decision";

export type ProjectRoleId =
  | "manager"
  | "quality"
  | "production"
  | "planning";

export type ProjectMetricKind = "projected";

export type ProjectDefinition = {
  name: string;
  title: string;
  subtitle: string;
};

export type DualEngine = {
  headline: string;
  pillars: readonly [string, string, string];
  summary: string;
};

export type ProblemItem = {
  id: "riskLag" | "infoFriction" | "homogenizedDecision";
  theme: ProjectThemeId;
  question: string;
  answer: string;
};

export type LoopStep = {
  /** 1-based step number in the closed loop */
  step: number;
  title: string;
  layer: string;
  description: string;
};

export type ProjectMetric = {
  id: string;
  label: string;
  baseline: string;
  target: string;
  /** Always projected for proposal metrics */
  kind: ProjectMetricKind;
  note: string;
};

export type ProjectMetrics = {
  /** Trust score gate from proposal; below this → intercept & verify first */
  trustThreshold: number;
  disclaimer: string;
  items: ProjectMetric[];
};

export type TechStackItem = {
  id: string;
  name: string;
  role: string;
};

export type ProjectAttribution = {
  scenario: string;
  context: string;
  metricsNote: string;
};

export type ProjectTheme = {
  id: ProjectThemeId;
  label: string;
  short: string;
};

/** Shared mock identifiers for role simulator (data only). */
export type IncidentMockIds = {
  product: string;
  line: string;
  batch: string;
  order: string;
};

export type ManagerRoleFields = {
  overallRisk: string;
  affectedOrders: string;
  estimatedLoss: string;
  progress: string;
  approvals: string;
};

export type QualityRoleFields = {
  anomalyStart: string;
  line: string;
  batch: string;
  defect: string;
  causeCandidate: string;
  actions: string;
};

export type ProductionRoleFields = {
  lines: string;
  batches: string;
  measures: string;
  owner: string;
  deadline: string;
};

export type PlanningRoleFields = {
  order: string;
  delayProbability: string;
  capacityGap: string;
  inventory: string;
  scheduleAdvice: string;
};

export type RoleViewBase = {
  id: ProjectRoleId;
  label: string;
  focus: string;
};

export type ManagerRoleView = RoleViewBase & {
  id: "manager";
  fields: ManagerRoleFields;
};

export type QualityRoleView = RoleViewBase & {
  id: "quality";
  fields: QualityRoleFields;
};

export type ProductionRoleView = RoleViewBase & {
  id: "production";
  fields: ProductionRoleFields;
};

export type PlanningRoleView = RoleViewBase & {
  id: "planning";
  fields: PlanningRoleFields;
};

export type ProjectRoleView =
  | ManagerRoleView
  | QualityRoleView
  | ProductionRoleView
  | PlanningRoleView;

export type ProjectIncident = {
  title: string;
  summary: string;
  mockIds: IncidentMockIds;
};

export type ProjectContent = {
  definition: ProjectDefinition;
  dualEngine: DualEngine;
  problems: ProblemItem[];
  loopSteps: LoopStep[];
  metrics: ProjectMetrics;
  techStack: TechStackItem[];
  attribution: ProjectAttribution;
  themes: ProjectTheme[];
  /** Exactly four role views for the simulator data layer */
  roles: readonly [
    ManagerRoleView,
    QualityRoleView,
    ProductionRoleView,
    PlanningRoleView,
  ];
  incident: ProjectIncident;
};
