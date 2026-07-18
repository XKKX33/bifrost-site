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
      displayName: "He Keyi",
      role: "Product Strategy & Global Growth",
      intro: "Management economics and data science professional focused on AI product design, global growth, and business strategy. Turns market research, user insight, and data analysis into product plans and cross-functional pilots.",
      monogram: "HKY",
      bioComingSoon: false,
      education: [
        { school: "Nanyang Technological University", college: "Nanyang Centre for Public Administration", degree: "M.S.", major: "Managerial Economics", period: "2026.01–2027.01", keywords: ["Data Analytics", "Microeconomics", "Business Policy", "Strategy"] },
        { school: "University of International Business and Economics", college: "School of Information Technology / School of Statistics", degree: "Dual B.S.", major: "Data Science & Big Data Technology / Economic Statistics", period: "2020.09–2024.06", keywords: ["Machine Learning", "Python", "Business Forecasting", "Digital Marketing", "Business Negotiation"] },
      ],
      projects: [
        { slug: "shopfront-sg", title: "Chua Thian Poh Pinnacle Prize 2026 — ShopFrontSG", period: "2026.03–present", role: "Market Strategy & Product Lead", summary: "Designed market strategy and an AI-assisted MVP around social-impact goals in Singapore, then advanced the concept through pilot planning and venture pitching.", tech: ["Product Strategy", "Codex", "Claude Code", "MVP", "Business Plan"], outcomes: ["Screened 40 core companies from 1,000+ a16z portfolio records", "Led AI-assisted MVP, final video, and product documentation", "Reached the national Top 10 final and attracted incubation interest"] },
        { slug: "guanglun-global-strategy", title: "Guanglun Intelligence — Global Resources & Strategy", period: "2026.06–present", role: "Global Resources & Strategy Intern", summary: "Built an AI-assisted overseas supplier dashboard and supported onboarding, matching, negotiation, project follow-up, and risk assessment.", tech: ["Claude Code", "Codex", "Supplier Operations", "Risk Analysis"], outcomes: ["Coordinated with 30+ global suppliers", "Integrated and assessed 20+ supplier datasets", "Organized 800,000+ structured records"] },
        { slug: "eazo-global-growth", title: "EAZO AI Global Growth", period: "2026.06–2026.07", role: "Global Growth & Strategy Intern", summary: "Ran creator research, standardized outreach, partnership conversion, and rapid AI application validation for global growth.", tech: ["Growth Strategy", "Creator Operations", "AI Prototyping", "Outreach"], outcomes: ["Reached 3,000+ global creators", "Built a 2,000+ creator resource pool and closed 20+ collaborations", "Selected 100 creators for the official signing plan"] },
        { slug: "market-research-competition", title: "National Market Survey & Analysis Competition", period: "2021.11–2022.04", role: "Data & Strategy Lead", summary: "Led research design, survey analysis, user profiling, and product marketing recommendations for the solo-dining delivery market.", tech: ["Python", "SPSS", "Tableau", "Survey Design"], outcomes: ["Collected 500+ valid questionnaires", "Completed cleaning, hypothesis tests, and user profiles", "Won Beijing First Prize"] },
      ],
      skills: [
        { id: "analytics", label: "Business Analytics", items: ["Market Research", "Industry Research", "Tableau", "SPSS"] },
        { id: "stats", label: "Data Methods", items: ["Python", "SQL", "Statistics", "Business Forecasting"] },
        { id: "ml", label: "AI Product", items: ["Product Design", "MVP", "Agent Design", "Vibe Coding"] },
        { id: "ai-workflow", label: "AI Workflow", items: ["ChatGPT", "Codex", "Claude", "Gemini", "DeepSeek"] },
        { id: "data-eng", label: "Growth & Collaboration", items: ["Global Growth", "Strategy Operations", "Negotiation", "Cross-functional Delivery"] },
      ],
      awards: [
        { title: "Beijing First Prize, National Mathematical Modeling Competition" },
        { title: "Beijing Second Prize, National Mathematical Modeling Competition" },
        { title: "Beijing First Prize, National Market Survey & Analysis Competition" },
        { title: "CDA Data Analyst Level I & II" },
      ],
    },
    {
      slug: "member-c",
      displayName: "Zhu Haoran",
      role: "Data Analytics & Algorithm Engineering",
      intro: "Management science and data analytics researcher focused on search advertising, recommender systems, and empirical platform research. Builds reusable workflows from data cleaning and feature engineering through model validation and business interpretation.",
      monogram: "ZHR",
      bioComingSoon: false,
      education: [
        { school: "Xi'an Jiaotong University", college: "School of Management", degree: "M.S.", major: "Management Science", period: "2025.09–present", keywords: ["Machine Learning", "Complex Data Analytics", "Econometrics", "Time Series", "Data-driven Modeling"] },
        { school: "Sichuan University", college: "Business School", degree: "B.S.", major: "Management Science", period: "Undergraduate", keywords: ["GPA 3.73/4.00", "Rank 4/34", "Python", "R", "Marketing Analytics"] },
      ],
      projects: [
        { slug: "search-ads-conversion", title: "Search Ad Conversion Prediction & Behavior Modeling", period: "2026.04–2026.05", role: "Team Project", summary: "Optimized the official baseline pipeline and added cyclic time, holiday, and smoothed historical-conversion features for search advertising.", tech: ["Python", "Feature Engineering", "Sequence Modeling", "Target Encoding"], outcomes: ["Shortened experiment feedback cycles", "Built hour, weekday, cycle, holiday, and real-rest-day features", "Added target-ad context and segmented validation by time and sparsity"] },
        { slug: "news-app-recommendation", title: "News App Click Prediction & Recall Ranking", period: "Recommendation Practice", role: "Independent", summary: "Built multi-path recall, feature engineering, and model fusion for unfamiliar users and a long-tail article pool.", tech: ["Recall", "Ranking", "Classification", "Sequence Models"], outcomes: ["Combined recent-click, similar-user, popularity, content, and time-rule recall", "Built interest, activity, device, and article-popularity features", "Fused ranking, classification, and sequence-model outputs"] },
        { slug: "online-healthcare-pricing", title: "Online Healthcare Pricing & Physician Participation", period: "2024.09–2025.05", role: "Empirical Research", summary: "Studied how online–offline consultation price differences affect physician cancellations and content participation, including platform-feedback moderators.", tech: ["Econometrics", "Data Matching", "Hypothesis Testing", "Platform Research"], outcomes: ["Matched offline prices for 4,203 physicians", "Built price-gap and high-pricing variables", "Identified anchoring and social-return moderation effects"] },
      ],
      skills: [
        { id: "analytics", label: "Analytics", items: ["Python", "SQL", "R", "Pandas"] },
        { id: "stats", label: "Statistics", items: ["Econometrics", "Time Series", "Multivariate Statistics", "Hypothesis Testing"] },
        { id: "ml", label: "Machine Learning", items: ["Recommenders", "Feature Engineering", "Sequence Modeling", "Model Validation"] },
        { id: "ai-workflow", label: "Experiment Workflow", items: ["Experiment Design", "Data Cleaning", "Metric Design", "Interpretation"] },
        { id: "data-eng", label: "Analytics Engineering", items: ["Sampling", "Leakage Control", "Training Configuration", "Reusable Pipelines"] },
      ],
      awards: [
        { title: "Provincial Second Prize, National College Mathematics Competition" },
        { title: "National Third Prize, Tsinghua IE Liangjian Competition" },
        { title: "National Encouragement Scholarship (2024)" },
        { title: "Sichuan University Comprehensive Scholarship (2022, 2023)" },
        { title: "CET-6: 543" },
      ],
    },
  ],
};
