import type { TeamContent } from "./types";

export const zhTeam: TeamContent = {
  headline: "连接风险、信息与决策",
  support:
    "BIFROST 把数据、模型与产品工程串成同一条桥。我们先让风险更早被看见，再把信号交到对的人手里。",
  philosophy: [
    {
      key: "anticipate",
      title: "Anticipate",
      support: "预见风险：在问题放大前，用信号与结构把不确定性压成可讨论的判断。",
    },
    {
      key: "connect",
      title: "Connect",
      support: "连接信息：消除部门与角色之间的摩擦，让同一事实服务不同决策场景。",
    },
    {
      key: "decide",
      title: "Decide",
      support: "推动决策：把洞察落到岗位动作上，形成可复盘、可迭代的行动闭环。",
    },
  ],
  capabilityBridge: {
    title: "能力桥",
    nodes: [
      { id: "business", label: "业务问题" },
      { id: "data", label: "数据理解" },
      { id: "model", label: "模型判断" },
      { id: "product", label: "产品设计" },
      { id: "system", label: "系统实现" },
      { id: "action", label: "决策行动" },
    ],
  },
  membersSectionTitle: "团队成员",
  membersSectionSupport: "三人协作覆盖数据智能、产品策略与 AI 工程。",
  bioComingSoonLabel: "简历内容待补充",
  members: [
    {
      slug: "kuang-xuan",
      displayName: "匡璇",
      role: "数据智能与模型策略",
      intro:
        "应用统计与人工智能方向研究者，专注推荐排序、智能决策与数据产品。把统计建模、深度学习与 AI Agent 接到真实业务问题上，让信号变成可执行判断。",
      monogram: "KX",
      bioComingSoon: false,
      education: [
        {
          school: "厦门大学",
          college: "经济学院",
          degree: "硕士",
          major: "应用统计 / 人工智能与数据科学",
          period: "2025–",
          keywords: [
            "高级计量经济学",
            "深度学习与人工智能",
            "高等统计学习",
            "高级金融学",
          ],
        },
        {
          school: "四川大学",
          college: "商学院",
          degree: "本科",
          major: "管理科学",
          period: "2021–2025",
          keywords: [
            "机器学习",
            "多元统计分析",
            "时间序列分析",
            "随机运筹学",
            "数据营销分析",
          ],
        },
      ],
      projects: [
        {
          slug: "taac-2026",
          title: "腾讯广告算法大赛 TAAC 2026",
          period: "2026.04–2026.05",
          role: "核心成员",
          summary:
            "广告推荐排序：HyFormer + RankMixer，训练加速、特征工程与目标域融合。",
          tech: [
            "PyTorch",
            "HyFormer",
            "RankMixer",
            "torch.compile",
            "BF16 AMP",
            "Numba",
          ],
          outcomes: [
            "落地训练与推理加速（torch.compile / BF16 / TF32 / Numba）",
            "构建哈希统计、周期时间与节假日特征",
            "目标域融合：按广告上下文动态加权多域历史序列",
          ],
        },
        {
          slug: "a-share-agent",
          title: "A股智能投研 Agent Skill",
          period: "2026.03–至今",
          role: "独立完成",
          summary:
            "将情绪周期、波浪、MACD、成交量与资金流向组织为可约束的投研 Agent 工作流。",
          tech: ["LLM", "Domain Rules", "Workflow", "Python"],
          outcomes: [
            "支持走势判断、观察池筛选、关键位置识别与复盘归因",
            "数据日期、行情来源、冲突信号与资金分层规则约束输出",
            "冲突信号显式暴露，降低自由文本胡编风险",
          ],
        },
        {
          slug: "news-recommendation",
          title: "新闻点击预测与召回排序",
          period: "2026.03–2026.04",
          role: "核心成员",
          summary: "多路召回 + 特征工程 + 多模型融合，生成用户 Top5 新闻推荐。",
          tech: ["Recall", "Ranking", "Feature Engineering", "Sequence Models"],
          outcomes: [
            "多路召回覆盖近期兴趣、相似用户、热点与长尾",
            "围绕「为何点击」构建差异化排序特征",
            "融合排序 / 分类 / 序列模型，结果进入 Top5",
          ],
        },
        {
          slug: "cnki-pipeline",
          title: "知网基金成果采集与数据治理",
          period: "2026.01–2026.04",
          role: "核心成员",
          summary:
            "经管期刊基金成果：清洗、采集与缺口自动补采流水线。",
          tech: ["Python", "Pandas", "Selenium", "OpenCV"],
          outcomes: [
            "覆盖 175 本期刊",
            "沉淀百万级结构化数据资产",
            "缺口统计与自动补采闭环",
          ],
        },
        {
          slug: "customer-clustering",
          title: "外卖行业客户细分（聚类集成选择）",
          period: "2025.01–2025.06",
          role: "独立完成",
          summary:
            "基于聚类集成选择的外卖客户细分研究，完成群体划分与结果分析。",
          tech: ["Python", "Clustering", "WHCD", "Text Mining"],
          outcomes: [
            "样本 9763 条美团评论",
            "应用 WHCD 聚类完成客户群体划分",
            "形成可解释的细分画像结论",
          ],
        },
      ],
      skills: [
        {
          id: "analytics",
          label: "数据分析",
          items: ["SQL", "Pandas", "Tableau", "数据营销分析"],
        },
        {
          id: "stats",
          label: "统计建模",
          items: ["计量经济学", "多元统计", "时间序列", "随机运筹"],
        },
        {
          id: "ml",
          label: "机器学习",
          items: ["Python", "PyTorch", "推荐排序", "序列建模"],
        },
        {
          id: "ai-workflow",
          label: "AI 工作流",
          items: ["LLM Agent", "Codex", "Claude", "Gemini", "DeepSeek"],
        },
        {
          id: "data-eng",
          label: "数据工程",
          items: ["Selenium", "OpenCV", "自动化采集", "数据治理"],
        },
      ],
      awards: [
        { title: "全国大学生数学竞赛省一等奖" },
        { title: "统计建模省二等奖" },
        { title: "学创杯创业综合模拟大赛校级三等奖" },
        { title: "CET-4" },
        { title: "CET-6" },
      ],
    },
    {
      slug: "member-b",
      displayName: "成员 B",
      role: "产品策略",
      intro: "负责产品定义、场景拆解与决策体验，简历内容待补充。",
      monogram: "B",
      bioComingSoon: true,
      education: [],
      projects: [],
      skills: [],
      awards: [],
    },
    {
      slug: "member-c",
      displayName: "成员 C",
      role: "AI 工程",
      intro: "负责系统实现、模型服务与工程闭环，简历内容待补充。",
      monogram: "C",
      bioComingSoon: true,
      education: [],
      projects: [],
      skills: [],
      awards: [],
    },
  ],
};
