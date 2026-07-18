import type { ProjectContent } from "./types";

/** zh DecisionLoop project content. Metrics = 方案预期, not production KPI. */
export const zhProject: ProjectContent = {
  definition: {
    name: "DecisionLoop",
    title: "DecisionLoop",
    subtitle: "制造业实时专属数据看板与决策闭环平台",
  },
  dualEngine: {
    headline: "双引擎架构",
    pillars: [
      "预设底座治理",
      "AI弹性配置",
      "飞书项目闭环",
    ] as const,
    summary:
      "以飞书 Aily 与多维表格为底层核心，在集团统一指标口径与权限隔离的刚性前提下，为不同岗位秒级生成专属决策视图，并将异常洞察转化为飞书原生协同任务，形成从发现异常到处置沉淀的完整闭环。",
  },
  problems: [
    {
      id: "riskLag",
      theme: "risk",
      question: "风险为什么总是滞后才被看见？",
      answer:
        "异常依赖人工层层汇总与周报/月报，发现时往往已错过最佳处置窗口。需要可信度前置与实时信号，而不是事后复盘。",
    },
    {
      id: "infoFriction",
      theme: "friction",
      question: "跨岗位信息为什么总在摩擦中损耗？",
      answer:
        "数据孤岛与口径不一致让同一指标在不同系统里“打架”，沟通成本高。需要预设治理框架下的统一指标与权限矩阵。",
    },
    {
      id: "homogenizedDecision",
      theme: "decision",
      question: "为什么决策容易同质化、难落地？",
      answer:
        "千人一面的报表无法服务管理、质量、生产、计划等差异化目标。需要按岗位、目标与实时风险动态组装专属视图，并带着处置闭环。",
    },
  ],
  loopSteps: [
    {
      step: 1,
      title: "数据接入与可信管理",
      layer: "多维表格 + Aily 清洗",
      description:
        "接入多源数据，由 AI 前置识别缺陷。可信度评分低于 0.85 时自动拦截并优先提示核查，避免假异常引发基层信任崩溃。",
    },
    {
      step: 2,
      title: "双引擎看板",
      layer: "飞书 Aily 智能体",
      description:
        "IT 在多维表格中预设标准全量指标与权限矩阵（刚性底座）。AI 依据岗位、当前目标与实时风险动态拼装视图，封死口径漂移。",
    },
    {
      step: 3,
      title: "智能洞察",
      layer: "算法特征引擎",
      description:
        "基于时序与机器学习，输出异常起始点及原因特征候选集与置信度，辅助而非替代人工判断，贴合制造业多因场景。",
    },
    {
      step: 4,
      title: "飞书协同",
      layer: "飞书项目 + 机器人",
      description:
        "高风险异常触发后，AI 在飞书项目（Project）中创建处置工单，经飞书 IM 推送给排班责任人，并支持超时自动升级。",
    },
    {
      step: 5,
      title: "复盘沉淀",
      layer: "高级自动化流",
      description:
        "处理完成后对比前后数据，引入相似批次反事实判定校验效果。有效措施灌入知识库，无效则重新诊断。",
    },
  ],
  metrics: {
    trustThreshold: 0.85,
    disclaimer:
      "以下指标均为方案预期成效（projected），来自 DecisionLoop 开题/方案语境，非已上线生产 KPI，亦非 BIFROST 已在歌尔产线落地的实测结果。",
    items: [
      {
        id: "dashboardSpeed",
        label: "看板配置时效",
        baseline: "提需求给 IT 排期，通常 3～7 天",
        target: "分钟级，自然语言对话实时动态响应",
        kind: "projected",
        note: "方案预期",
      },
      {
        id: "verifyReduction",
        label: "数据核查工时",
        baseline: "异常后人工层层校验",
        target: "预计减少 50% 以上",
        kind: "projected",
        note: "方案预期",
      },
      {
        id: "decisionSpeed",
        label: "决策响应速度",
        baseline: "依赖周报/月报被动决策",
        target: "整体提升 30% 以上",
        kind: "projected",
        note: "方案预期",
      },
      {
        id: "rolesCoverage",
        label: "试点岗位覆盖",
        baseline: "信息烟囱，各岗位独立找数据",
        target: "首批 4 类核心岗位，看板及闭环覆盖率 100%",
        kind: "projected",
        note: "方案预期",
      },
    ],
  },
  techStack: [
    {
      id: "aily",
      name: "飞书 Aily",
      role: "智能体与动态看板拼装",
    },
    {
      id: "bitable",
      name: "飞书多维表格",
      role: "指标底座、权限矩阵与数据接入",
    },
    {
      id: "project",
      name: "飞书项目（Project）",
      role: "处置工单与协同闭环",
    },
    {
      id: "im",
      name: "飞书 IM",
      role: "责任人精准推送与升级通知",
    },
    {
      id: "automation",
      name: "飞书自动化",
      role: "复盘沉淀与流程编排",
    },
    {
      id: "tsml",
      name: "时序分析 + 机器学习",
      role: "异常起始点与原因特征候选",
    },
  ],
  attribution: {
    scenario: "歌尔精密制造场景",
    context: "DecisionLoop 方案语境（开题报告 / 方案设计）",
    metricsNote:
      "文中量化目标均为方案预期成效，不代表 BIFROST 已在歌尔生产环境交付或验证的 KPI。",
  },
  themes: [
    {
      id: "risk",
      label: "风险预警",
      short: "让风险更早被看见",
    },
    {
      id: "friction",
      label: "信息摩擦",
      short: "消除跨岗信息损耗",
    },
    {
      id: "decision",
      label: "决策建议",
      short: "岗位专属、可落地的决策闭环",
    },
  ],
  roles: [
    {
      id: "manager",
      label: "管理者",
      focus: "整体风险、订单影响与审批节奏",
      fields: {
        overallRisk: "高 · 产品A 不良率持续升高",
        affectedOrders: "O003 等关联订单受影响",
        estimatedLoss: "预计损失区间（模拟）",
        progress: "处置工单进行中，待跨岗确认",
        approvals: "待批：升级措施 / 排产调整",
      },
    },
    {
      id: "quality",
      label: "质量",
      focus: "异常起点、批次与原因候选",
      fields: {
        anomalyStart: "7/11",
        line: "L02",
        batch: "B015",
        defect: "不良率持续升高（产品A）",
        causeCandidate: "材料批次（候选，非唯一结论）",
        actions: "拦截核查 → 原因候选复核 → 协同处置",
      },
    },
    {
      id: "production",
      label: "生产",
      focus: "产线、批次与现场措施",
      fields: {
        lines: "L02（重点）及相关产线",
        batches: "B015 及相似批次排查",
        measures: "限产复核 / 工艺点检 / 材料隔离（模拟）",
        owner: "当班生产责任人（排班推送）",
        deadline: "超时自动升级（飞书项目）",
      },
    },
    {
      id: "planning",
      label: "计划",
      focus: "订单交期、产能与排程建议",
      fields: {
        order: "O003",
        delayProbability: "81%",
        capacityGap: "18%",
        inventory: "关键物料库存缓冲（模拟）",
        scheduleAdvice: "建议调整排程窗口，优先保障 O003 交期风险",
      },
    },
  ],
  incident: {
    title: "产品A不良率持续升高",
    summary:
      "模拟场景：产品A 在产线 L02、批次 B015 出现不良率持续升高信号；订单 O003 交期风险上升。角色视图共用同一事件，字段按岗位差异化展示（数据层，非 UI）。",
    mockIds: {
      product: "产品A",
      line: "L02",
      batch: "B015",
      order: "O003",
    },
  },
};
