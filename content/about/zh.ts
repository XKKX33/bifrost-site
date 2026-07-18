import type { AboutContent } from "./types";

/** zh About — brand manifesto: Bifrost as decision bridge. */
export const zhAbout: AboutContent = {
  eyebrow: "关于 BIFROST",
  title: "决策之桥",
  manifesto:
    "BIFROST 不是又一个看板工具的名字。它命名的是一种工作方式：把滞后的风险、分散的信息与悬空的判断，接到同一条可通行的决策路径上。",
  bridge: {
    headline: "桥的隐喻",
    body:
      "北欧神话里，Bifröst 是连接神域与人间的彩虹桥。我们借用这个意象：风险信号在一侧，行动与责任在另一侧；团队的工作，是把两者之间的距离缩短到可决策、可协同、可复盘。",
  },
  themesHeading: "三条主题",
  themes: [
    {
      id: "risk",
      label: "风险预警",
      title: "让风险更早被看见",
      body:
        "异常不应只在周报里出现。我们主张可信度前置与实时信号：先看见、再讨论，而不是事后复盘才补救。",
    },
    {
      id: "synergy",
      label: "信息协同",
      title: "让同一事实服务不同岗位",
      body:
        "跨岗摩擦消耗决策窗口。我们推动统一口径与权限清晰的信息协同，减少“同一指标在不同系统里打架”。",
    },
    {
      id: "decision",
      label: "决策建议",
      title: "把洞察落到可执行动作",
      body:
        "千人一面的报表无法推动落地。我们把洞察接到岗位视图与协同任务上，形成发现—处置—沉淀的闭环。",
    },
  ],
  value: {
    headline: "我们相信什么",
    body:
      "好的决策系统不堆砌大屏，而缩短从信号到行动的路径。BIFROST 站在数据、模型与产品工程的交界处，把复杂问题压成可讨论、可分工、可验证的判断。",
  },
  links: {
    project: "查看 DecisionLoop 项目",
    team: "认识团队",
    contact: "联系我们",
  },
};
