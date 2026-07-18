import type { Locale } from "@/lib/i18n";
import { enProject } from "./en";
import type { ProjectContent } from "./types";
import { zhProject } from "./zh";

export type {
  DualEngine,
  IncidentMockIds,
  LoopStep,
  ManagerRoleFields,
  ManagerRoleView,
  PlanningRoleFields,
  PlanningRoleView,
  ProblemItem,
  ProductionRoleFields,
  ProductionRoleView,
  ProjectAttribution,
  ProjectContent,
  ProjectDefinition,
  ProjectIncident,
  ProjectMetric,
  ProjectMetricKind,
  ProjectMetrics,
  ProjectRoleId,
  ProjectRoleView,
  ProjectTheme,
  ProjectThemeId,
  QualityRoleFields,
  QualityRoleView,
  TechStackItem,
} from "./types";

export { enProject } from "./en";
export { zhProject } from "./zh";

export function getProject(locale: Locale): ProjectContent {
  return locale === "en" ? enProject : zhProject;
}
