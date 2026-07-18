"use client";

import { useId, useState } from "react";
import type { Locale } from "@/lib/i18n";
import type {
  ProjectIncident,
  ProjectRoleId,
  ProjectRoleView,
} from "@/content/project";

type RoleSimulatorProps = {
  locale: Locale;
  incident: ProjectIncident;
  roles: readonly [
    ProjectRoleView,
    ProjectRoleView,
    ProjectRoleView,
    ProjectRoleView,
  ];
};

type FieldRow = {
  key: string;
  label: string;
  value: string;
};

const FIELD_LABELS: Record<
  Locale,
  Record<ProjectRoleId, Record<string, string>>
> = {
  zh: {
    manager: {
      overallRisk: "整体风险",
      affectedOrders: "受影响订单",
      estimatedLoss: "预计损失",
      progress: "处置进度",
      approvals: "待批事项",
    },
    quality: {
      anomalyStart: "异常起点",
      line: "产线",
      batch: "批次",
      defect: "缺陷信号",
      causeCandidate: "原因候选",
      actions: "建议动作",
    },
    production: {
      lines: "产线",
      batches: "批次",
      measures: "现场措施",
      owner: "责任人",
      deadline: "时限 / 升级",
    },
    planning: {
      order: "订单",
      delayProbability: "延期概率",
      capacityGap: "产能缺口",
      inventory: "库存缓冲",
      scheduleAdvice: "排程建议",
    },
  },
  en: {
    manager: {
      overallRisk: "Overall risk",
      affectedOrders: "Affected orders",
      estimatedLoss: "Estimated loss",
      progress: "Disposition progress",
      approvals: "Pending approvals",
    },
    quality: {
      anomalyStart: "Anomaly start",
      line: "Line",
      batch: "Batch",
      defect: "Defect signal",
      causeCandidate: "Cause candidate",
      actions: "Suggested actions",
    },
    production: {
      lines: "Lines",
      batches: "Batches",
      measures: "Shop-floor measures",
      owner: "Owner",
      deadline: "Deadline / escalation",
    },
    planning: {
      order: "Order",
      delayProbability: "Delay probability",
      capacityGap: "Capacity gap",
      inventory: "Inventory buffer",
      scheduleAdvice: "Schedule advice",
    },
  },
};

const UI: Record<
  Locale,
  {
    panelLabel: string;
    focusLabel: string;
    mockIdsLabel: string;
    tablistLabel: string;
  }
> = {
  zh: {
    panelLabel: "角色决策模拟",
    focusLabel: "岗位焦点",
    mockIdsLabel: "模拟标识",
    tablistLabel: "选择岗位视角",
  },
  en: {
    panelLabel: "Role decision simulator",
    focusLabel: "Role focus",
    mockIdsLabel: "Mock IDs",
    tablistLabel: "Select role view",
  },
};

function fieldsForRole(role: ProjectRoleView, locale: Locale): FieldRow[] {
  const labels = FIELD_LABELS[locale][role.id];
  return Object.entries(role.fields).map(([key, value]) => ({
    key,
    label: labels[key] ?? key,
    value,
  }));
}

/**
 * Interactive role-view simulator: one incident, four role lenses.
 * Client-only for tab state; all copy from content modules.
 */
export function RoleSimulator({ locale, incident, roles }: RoleSimulatorProps) {
  const [activeId, setActiveId] = useState<ProjectRoleId>(roles[0].id);
  const baseId = useId();
  const ui = UI[locale];
  const active = roles.find((r) => r.id === activeId) ?? roles[0];
  const fieldRows = fieldsForRole(active, locale);
  const panelId = `${baseId}-panel`;

  return (
    <div className="role-sim" data-testid="role-simulator">
      <header className="role-sim__header">
        <p className="role-sim__eyebrow">{ui.panelLabel}</p>
        <h3 className="role-sim__incident">{incident.title}</h3>
        <p className="role-sim__summary">{incident.summary}</p>
        <dl className="role-sim__ids">
          <dt className="sr-only">{ui.mockIdsLabel}</dt>
          <dd>
            <span className="role-sim__id-chip">{incident.mockIds.product}</span>
            <span className="role-sim__id-chip">{incident.mockIds.line}</span>
            <span className="role-sim__id-chip">{incident.mockIds.batch}</span>
            <span className="role-sim__id-chip">{incident.mockIds.order}</span>
          </dd>
        </dl>
      </header>

      <div
        className="role-sim__tabs"
        role="tablist"
        aria-label={ui.tablistLabel}
      >
        {roles.map((role) => {
          const selected = role.id === active.id;
          return (
            <button
              key={role.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${role.id}`}
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              className={
                selected ? "role-sim__tab is-active" : "role-sim__tab"
              }
              onClick={() => setActiveId(role.id)}
            >
              {role.label}
            </button>
          );
        })}
      </div>

      <div
        className="role-sim__panel"
        role="tabpanel"
        id={panelId}
        aria-labelledby={`${baseId}-tab-${active.id}`}
      >
        <p className="role-sim__focus">
          <span className="role-sim__focus-label">{ui.focusLabel}</span>
          <span className="role-sim__focus-text">{active.focus}</span>
        </p>
        <dl className="role-sim__fields">
          {fieldRows.map((row) => (
            <div key={row.key} className="role-sim__field">
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
