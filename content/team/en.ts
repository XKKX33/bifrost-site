import type { TeamContent } from "./types";

export const enTeam: TeamContent = {
  headline: "Bridging Risk, Information and Decisions",
  support:
    "BIFROST links data, models, and product engineering into one bridge. We surface risk earlier, then put the right signal in the right hands.",
  philosophy: [
    {
      key: "anticipate",
      title: "Anticipate",
      support:
        "See risk before it scales: turn uncertainty into structured, discussable signals.",
    },
    {
      key: "connect",
      title: "Connect",
      support:
        "Remove friction across roles: one shared fact serving many decision contexts.",
    },
    {
      key: "decide",
      title: "Decide",
      support:
        "Move insight into action: role-level moves that can be reviewed and improved.",
    },
  ],
  capabilityBridge: {
    title: "Capability Bridge",
    nodes: [
      { id: "business", label: "Business Problem" },
      { id: "data", label: "Data Understanding" },
      { id: "model", label: "Model Judgment" },
      { id: "product", label: "Product Design" },
      { id: "system", label: "System Build" },
      { id: "action", label: "Decision Action" },
    ],
  },
  membersSectionTitle: "Team",
  membersSectionSupport:
    "Three roles across data intelligence, product strategy, and AI engineering.",
  bioComingSoonLabel: "Bio coming soon",
  members: [
    {
      slug: "kuang-xuan",
      displayName: "Kuang Xuan",
      role: "Data Intelligence & Modeling",
      intro:
        "Applied statistics and AI researcher focused on recommendation ranking, intelligent decisions, and data products. Connects statistical modeling, deep learning, and AI agents to real business problems so signals become actionable judgment.",
      monogram: "KX",
      bioComingSoon: false,
      education: [
        {
          school: "Xiamen University",
          college: "School of Economics",
          degree: "M.S.",
          major: "Applied Statistics / AI & Data Science",
          period: "2025–",
          keywords: [
            "Advanced Econometrics",
            "Deep Learning & AI",
            "Advanced Statistical Learning",
            "Advanced Finance",
          ],
        },
        {
          school: "Sichuan University",
          college: "Business School",
          degree: "B.S.",
          major: "Management Science",
          period: "2021–2025",
          keywords: [
            "Machine Learning",
            "Multivariate Statistics",
            "Time Series Analysis",
            "Stochastic OR",
            "Data Marketing Analytics",
          ],
        },
      ],
      projects: [
        {
          slug: "taac-2026",
          title: "TAAC 2026 — Tencent Ad Ranking",
          period: "2026.04–2026.05",
          role: "Core Member",
          summary:
            "Ad ranking with HyFormer + RankMixer: training acceleration, feature engineering, and target-aware fusion.",
          tech: [
            "PyTorch",
            "HyFormer",
            "RankMixer",
            "torch.compile",
            "BF16 AMP",
            "Numba",
          ],
          outcomes: [
            "Training and inference speedups (torch.compile / BF16 / TF32 / Numba)",
            "Hash stats, cyclic time, and holiday features",
            "Target-aware fusion weighting multi-domain history by ad context",
          ],
        },
        {
          slug: "a-share-agent",
          title: "A-Share Research Agent Skill",
          period: "2026.03–present",
          role: "Independent",
          summary:
            "Emotion cycle, wave structure, MACD, volume, and capital flow as a constrained research-agent workflow.",
          tech: ["LLM", "Domain Rules", "Workflow", "Python"],
          outcomes: [
            "Trend judgment, watchlist screening, key levels, post-trade attribution",
            "Constraints on data date, quote source, conflict signals, capital layers",
            "Conflict signals exposed for interpretability",
          ],
        },
        {
          slug: "news-recommendation",
          title: "News Click Prediction & Ranking",
          period: "2026.03–2026.04",
          role: "Core Member",
          summary:
            "Multi-path recall + feature engineering + model fusion for a user Top5 news list.",
          tech: ["Recall", "Ranking", "Feature Engineering", "Sequence Models"],
          outcomes: [
            "Recall covering short-term interest, similar users, hot items, long tail",
            "Difference features for why a user would click a candidate",
            "Fused rank / classify / sequence models; results in Top5",
          ],
        },
        {
          slug: "cnki-pipeline",
          title: "CNKI Fund-Outcome Data Pipeline",
          period: "2026.01–2026.04",
          role: "Core Member",
          summary:
            "Cleaning, crawl, and gap-refill pipeline for management-journal fund outcomes.",
          tech: ["Python", "Pandas", "Selenium", "OpenCV"],
          outcomes: [
            "175 journals covered",
            "Million-scale structured data assets",
            "Gap stats with automatic refill loop",
          ],
        },
        {
          slug: "customer-clustering",
          title: "Food-Delivery Customer Segmentation",
          period: "2025.01–2025.06",
          role: "Independent",
          summary:
            "Customer segmentation for food delivery via ensemble clustering selection.",
          tech: ["Python", "Clustering", "WHCD", "Text Mining"],
          outcomes: [
            "Sample of 9,763 Meituan reviews",
            "WHCD clustering for customer groups",
            "Interpretable segment profiles",
          ],
        },
      ],
      skills: [
        {
          id: "analytics",
          label: "Analytics",
          items: ["SQL", "Pandas", "Tableau", "Marketing Analytics"],
        },
        {
          id: "stats",
          label: "Statistics",
          items: [
            "Econometrics",
            "Multivariate Stats",
            "Time Series",
            "Stochastic OR",
          ],
        },
        {
          id: "ml",
          label: "Machine Learning",
          items: ["Python", "PyTorch", "Recommendation", "Sequence Modeling"],
        },
        {
          id: "ai-workflow",
          label: "AI Workflow",
          items: ["LLM Agent", "Codex", "Claude", "Gemini", "DeepSeek"],
        },
        {
          id: "data-eng",
          label: "Data Engineering",
          items: ["Selenium", "OpenCV", "Automated Collection", "Data Governance"],
        },
      ],
      awards: [
        {
          title: "Provincial First Prize, National College Math Competition",
        },
        { title: "Provincial Second Prize, Statistical Modeling" },
        {
          title:
            "University Third Prize, XUECHUANG Cup Entrepreneurship Simulation",
        },
        { title: "CET-4" },
        { title: "CET-6" },
      ],
    },
    {
      slug: "member-b",
      displayName: "Member B",
      role: "Product Strategy",
      intro: "Owns product definition, scenario breakdown, and decision UX. Bio coming soon.",
      monogram: "B",
      bioComingSoon: true,
      education: [],
      projects: [],
      skills: [],
      awards: [],
    },
    {
      slug: "member-c",
      displayName: "Member C",
      role: "AI Engineering",
      intro: "Owns system build, model serving, and engineering closed loops. Bio coming soon.",
      monogram: "C",
      bioComingSoon: true,
      education: [],
      projects: [],
      skills: [],
      awards: [],
    },
  ],
};
