/**
 * projects-data.js
 * ─────────────────────────────────────────────────────────────────
 * Single source of truth for all portfolio project data.
 *
 * Fields
 * ──────
 *  id            – unique slug used for element IDs
 *  title         – full project title (may contain HTML entities)
 *  badges        – array of { label, color: 'purple'|'blue' }
 *  techStack     – array of tech-stack label strings
 *
 *  imageUrl      – relative asset path or valid image URL (null if none)
 *  imageStatus   – "uploaded" | "not_uploaded"
 *  showImage     – true | false (whether this image should appear on the homepage)
 *
 *  featured      – true → rendered in the homepage Featured Solutions grid
 *  featuredOrder – sort key for homepage grid (lower = first)
 *  featuredData  – extra fields used only when rendering on homepage
 *    .icon           lucide icon name for the project-icon-box
 *    .metric         text for the project-metric badge (a headline outcome, not a raw R²)
 *    .titleShort     shorter title for the card heading
 *    .descriptionHtml full HTML description (Problem/Solution/Impact)
 *    .highlights     array of bullet strings
 *    .stackShort     array of tech strings for the card footer
 *    .links          array of { label, href, class, icon, ariaLabel }
 *
 *  projectOrder  – sort key for /projects archive page (lower = first)
 *  description   – plain-text short description for the archive card
 *  github        – GitHub URL (null if none)
 *  live          – Live/demo URL (null if none)
 *  liveLabel     – button label override (default: "Live Demo")
 *
 *  published     – only true items are rendered on either page
 *
 * Every metric below is taken from the project's own README or results
 * files. Where a model score is cited, its baseline or scope is named so
 * it reads as a result, not a bare number.
 */

const PROJECTS = [

  // ── 1: SPARCS Healthcare & BI (Data Engineering) ─────────────
  {
    id: "sparcs",
    title: "SPARCS Healthcare &amp; Business Intelligence System",

    badges: [
      { label: "Data Engineering", color: "purple" },
      { label: "Business Intelligence", color: "purple" },
      { label: "Analytics", color: "blue" },
    ],

    techStack: [
      "PostgreSQL",
      "Power BI",
      "ETL",
      "Star Schema",
      "SQL Analytics",
      "Materialized Views",
      "PL/pgSQL"
    ],

    imageUrl: "assets/project-images/SPARCS_Healthcare_BI.webp",
    imageStatus: "uploaded",
    showImage: true,

    featured: true,
    featuredOrder: 1,

    featuredData: {
      icon: "database",
      metric: "16.3M+ Records Warehoused",
      titleShort: "SPARCS Healthcare &amp; BI System",

      descriptionHtml:
        "<strong>Problem:</strong> Public hospital discharge data arrives as separate yearly files, which makes multi-year clinical and financial trends slow and inconsistent to analyze.<br />" +
        "<strong>Solution:</strong> Built a layered PostgreSQL warehouse (staging → data-quality validation → ETL → star schema) with 8 dimensions and 1 fact table, plus analytics views and materialized views for heavy aggregations.<br />" +
        "<strong>Impact:</strong> One governed source of truth across 7 years of records, feeding an 8-page Power BI dashboard for hospital, patient, clinical and financial analysis.",

      highlights: [
        "16.3M+ discharge records across 7 years",
        "Star schema: 8 dimensions, 1 fact table",
        "ETL with audit logging and post-load validation",
        "11 analytics views, 6 materialized views",
        "EXPLAIN ANALYZE-driven query tuning",
        "8-page Power BI dashboard",
      ],

      stackShort: [
        "PostgreSQL",
        "Power BI",
        "ETL",
        "SQL Analytics"
      ],

      links: [
        {
          label: "GitHub",
          href: "https://github.com/Hemanthsai456/sparcs-healthcare-bi-platform",
          cls: "btn-icon",
          icon: "github",
          ariaLabel: "GitHub"
        },
        {
          label: "Case Study",
          href: "https://github.com/Hemanthsai456/sparcs-healthcare-bi-platform/tree/main/DOCS",
          cls: "btn-text",
          icon: "arrow-up-right",
          ariaLabel: "Case Study"
        },
      ],
    },

    projectOrder: 1,

    description:
      "Built a layered PostgreSQL data warehouse (staging, data-quality validation, ETL, star schema with 8 dimensions and 1 fact table) over 16.3M+ NYS SPARCS hospital discharge records spanning 7 years. Added 11 analytics views, 6 materialized views and EXPLAIN ANALYZE-driven tuning, and an 8-page Power BI dashboard for self-service clinical and financial analysis.",

    github:
      "https://github.com/Hemanthsai456/sparcs-healthcare-bi-platform",

    live: null,

    published: true,
  },


  // ── 2: Medical Inventory Forecasting (ML) ───────────────────
  {
    id: "medical-inventory",
    title: "Medical Inventory Forecasting &amp; Decision Support System",

    badges: [
      { label: "Machine Learning", color: "purple" },
      { label: "Healthcare", color: "blue" },
    ],

    techStack: [
      "Python",
      "Scikit-Learn",
      "SHAP",
      "Streamlit",
      "XGBoost",
      "K-Means",
      "Gradient Boosting"
    ],

    imageUrl: "assets/project-images/Medical_Inventory_DSS.webp",
    imageStatus: "uploaded",
    showImage: true,

    featured: true,
    featuredOrder: 2,

    featuredData: {
      icon: "trending-up",
      metric: "14 Models → Live App",
      titleShort: "Medical Inventory Forecasting &amp; Decision Support System",

      descriptionHtml:
        "<strong>Problem:</strong> Medical inventory is planned by hand, so hospitals either overstock (tying up capital) or run short on life-saving stock.<br />" +
        "<strong>Solution:</strong> Benchmarked 14 regression models and ensembles, selected a tuned Gradient Boosting model, explained its predictions with SHAP, and segmented items with K-Means for procurement planning.<br />" +
        "<strong>Impact:</strong> Shipped as a deployed multi-page Streamlit app that flags inventory risk and recommends procurement actions, with every prediction logged to a Google Sheet audit trail.",

      highlights: [
        "14 models benchmarked and tuned",
        "SHAP global and per-prediction explanations",
        "K-Means inventory segmentation",
        "Demand and inventory-risk flags",
        "Procurement recommendation logic",
        "Live Streamlit app with audit logging",
      ],

      stackShort: [
        "Python",
        "Scikit-Learn",
        "SHAP",
        "Streamlit"
      ],

      links: [
        {
          label: "GitHub",
          href: "https://github.com/Hemanthsai456/Medical-Inventory-Forecasting-Decision-Support-System",
          cls: "btn-icon",
          icon: "github",
          ariaLabel: "GitHub"
        },
        {
          label: "Live Demo",
          href: "https://hemanthsai-medical-inventory-decision-support.streamlit.app/",
          cls: "btn-icon",
          icon: "external-link",
          ariaLabel: "Live Demo"
        },
        {
          label: "Case Study",
          href: "https://github.com/Hemanthsai456/Medical-Inventory-Forecasting-Decision-Support-System/tree/main/documentation",
          cls: "btn-text",
          icon: "arrow-up-right",
          ariaLabel: "Case Study"
        },
      ],
    },

    projectOrder: 2,
    description:
      "Built an end-to-end ML decision-support system for medical inventory demand. Benchmarked 14 models and ensembles, selected a tuned Gradient Boosting model, explained predictions with SHAP, and segmented inventory with K-Means. Deployed as a multi-page Streamlit app that flags inventory risk and recommends procurement actions.",
    github:
      "https://github.com/Hemanthsai456/Medical-Inventory-Forecasting-Decision-Support-System",
    live:
      "https://hemanthsai-medical-inventory-decision-support.streamlit.app/",
    liveLabel: "Live Demo",
    published: true,
  },


  // ── 3: Cold-Start Multimodal Movie Recommendation (ML / Recsys) ──
  {
    id: "movie-recommendation",
    title:
      "Multimodal Cold-Start Movie Recommender",
    badges: [
      { label: "Recommendation Systems", color: "purple" },
      { label: "Multimodal AI", color: "blue" },
    ],
    techStack: [
      "Python",
      "TensorFlow",
      "CLIP",
      "VGGish",
      "Neural Collaborative Filtering",
      "Multimodal Learning",
      "MovieLens",
    ],
    imageUrl: "assets/project-images/Cold Start Movie Recommendation.webp",
    imageStatus: "uploaded",
    showImage: true,
    featured: true,
    featuredOrder: 3,
    featuredData: {
      icon: "clapperboard",
      metric: "21% Lower Cold-Start RMSE",
      titleShort: "Multimodal Cold-Start Movie Recommender",
      descriptionHtml:
        "<strong>Problem:</strong> Collaborative filtering cannot rate movies that have little or no interaction history, so new releases are invisible to the recommender.<br />" +
        "<strong>Solution:</strong> Combined Neural Collaborative Filtering with CLIP poster embeddings and VGGish trailer-audio embeddings, plus a dedicated cold-start model that recommends movies never seen in training.<br />" +
        "<strong>Impact:</strong> On 2,107 movies unseen during training, the cold-start model reduced RMSE by about 21% against a global-mean baseline on the same test subset, and the overall multimodal model improved on a user-and-movie bias baseline.",
      highlights: [
        "19,232 multimodal movies (MovieLens 20M)",
        "2,107 test movies unseen in training",
        "CLIP poster and VGGish audio embeddings",
        "Neural Collaborative Filtering",
        "Dedicated cold-start model",
        "Top-N personalized recommendations",
      ],
      stackShort: [
        "Python",
        "TensorFlow",
        "CLIP",
        "VGGish",
      ],
      links: [
        {
          label: "GitHub",
          href:
            "https://github.com/Hemanthsai456/Multimodal-Cold-Start-Movie-Recommender",
          cls: "btn-icon",
          icon: "github",
          ariaLabel: "GitHub",
        },
        {
          label: "Live Demo",
          href: "https://hemanth-cold-start-user-based-movie-recommendation.streamlit.app/",
          cls: "btn-icon",
          icon: "external-link",
          ariaLabel: "Live Demo"
        },
      ],
    },
    projectOrder: 3,
    description:
      "Built a multimodal movie recommender that combines Neural Collaborative Filtering with CLIP poster embeddings and VGGish trailer-audio embeddings to handle the cold-start problem. On 2,107 movies unseen during training it cut RMSE by about 21% versus a global-mean baseline, and it supports personalized Top-N recommendations.",
    github:
      "https://github.com/Hemanthsai456/Multimodal-Cold-Start-Movie-Recommender",
    live:
      "https://hemanth-cold-start-user-based-movie-recommendation.streamlit.app/",
    liveLabel: "Live Demo",
    published: true,
  },


  // ── 4: NIDHI (Full Stack + AI) ────────────────────────────────
  {
    id: "nidhi",
    title: "NIDHI — AI Investor Super App",
    badges: [
      { label: "Full Stack", color: "purple" },
      { label: "AI", color: "blue" },
    ],
    techStack: [
      "TypeScript",
      "React",
      "FastAPI",
      "PostgreSQL",
      "Firebase Auth",
      "Gemini API"
    ],
    imageUrl: "assets/project-images/NIDHI.webp",
    imageStatus: "uploaded",
    showImage: true,
    featured: true,
    featuredOrder: 4,
    featuredData: {
      icon: "wallet",
      metric: "Full-Stack + GenAI",
      titleShort: "NIDHI AI Investor Super App",
      descriptionHtml:
        "<strong>Problem:</strong> Indian retail investors hold stocks, mutual funds, REITs and bonds across several platforms, with no single view of risk, diversification or liquidity.<br />" +
        "<strong>Solution:</strong> Built a full-stack app in React and TypeScript with a FastAPI backend and PostgreSQL. It aggregates holdings from CSV import or simulated broker connections, computes health, diversification and liquidity scores, and runs a Gemini assistant grounded in the user's own portfolio.<br />" +
        "<strong>Impact:</strong> Deployed as a live web app with Firebase authentication, email verification, persistent chat history and a learning center for new investors.",
      highlights: [
        "Unified multi-asset portfolio tracker",
        "Health, diversification and liquidity scores",
        "Gemini assistant grounded in holdings",
        "Firebase auth with email verification",
        "FastAPI backend, PostgreSQL database",
        "Live frontend and public API docs",
      ],
      stackShort: [
        "TypeScript",
        "React",
        "FastAPI",
        "PostgreSQL"
      ],
      links: [
        {
          label: "GitHub",
          href: "https://github.com/Hemanthsai456/NIDHI",
          cls: "btn-icon",
          icon: "github",
          ariaLabel: "GitHub"
        },
        {
          label: "Live Demo",
          href: "https://nidhiapp.vercel.app",
          cls: "btn-icon",
          icon: "external-link",
          ariaLabel: "Live Demo"
        },
      ],
    },
    projectOrder: 4,
    description:
      "Full-stack AI investor app for Indian retail investors. A React and TypeScript front end and FastAPI backend with PostgreSQL unify stocks, mutual funds, REITs and bonds, compute portfolio health and diversification scores, and power a Gemini assistant grounded in each user's holdings. Includes Firebase authentication with email verification and a learning center.",
    github:
      "https://github.com/Hemanthsai456/NIDHI",
    live:
      "https://nidhiapp.vercel.app",
    liveLabel: "Live Demo",
    published: true,
  },


  // ── 5: Human Decision Intelligence (Data Science / Stats) ──────
  {
    id: "human-decision-intelligence",
    title: "Human Decision Intelligence: Understanding Human Choices Under Risk &amp; Ambiguity",
    badges: [
      { label: "Statistical Analysis", color: "purple" },
      { label: "Explainable AI", color: "blue" },
      { label: "Behavioral Analytics", color: "purple" },
    ],
    techStack: [
      "R",
      "Shiny",
      "Statistical Modeling",
      "PCA",
      "XGBoost",
      "SHAP",
      "LIME",
      "Behavioral Clustering",
    ],
    imageUrl: "assets/project-images/Human_Decision_Intelligence Dashboard.webp",
    imageStatus: "uploaded",
    showImage: true,
    featured: true,
    featuredOrder: 5,
    featuredData: {
      icon: "brain-circuit",
      metric: "105K Decisions Modeled",
      titleShort: "Human Decision Intelligence",
      descriptionHtml:
        "<strong>Problem:</strong> Observing how people choose under risk and ambiguity does not explain which factors drive those choices, or whether they can be predicted.<br />" +
        "<strong>Solution:</strong> Ran mixed-effects statistical modeling, PCA and behavioral clustering on the CPC18 dataset, then compared GLM, GAM, Random Forest and XGBoost, with SHAP and LIME for explanations.<br />" +
        "<strong>Impact:</strong> The final model reached 70.95% test accuracy and 0.79 ROC-AUC on 105,000 held-out decisions, and the findings are packaged as an R Markdown report series and a Shiny app.",
      highlights: [
        "105,000 held-out test decisions",
        "70.95% test accuracy, 0.79 ROC-AUC",
        "GLM, GAM, Random Forest and XGBoost compared",
        "PCA and behavioral clustering",
        "SHAP and LIME explanations",
        "Mixed-effects statistical analysis",
      ],
      stackShort: [
        "R",
        "Statistical Modeling",
        "XGBoost",
        "SHAP",
      ],
      links: [
        {
          label: "GitHub",
          href: "https://github.com/Hemanthsai456/Human-Decision-Intelligence",
          cls: "btn-icon",
          icon: "github",
          ariaLabel: "GitHub",
        },
        {
          label: "Case Study",
          href: "https://github.com/Hemanthsai456/Human-Decision-Intelligence/tree/main/reports",
          cls: "btn-text",
          icon: "arrow-up-right",
          ariaLabel: "Case Study"
        },
      ],
    },
    projectOrder: 5,
    description:
      "Research-style data science project on the CPC18 dataset. Combined mixed-effects statistical modeling, PCA and behavioral clustering with GLM, GAM, Random Forest and XGBoost models, and used SHAP and LIME to explain predictions. The final model reached 70.95% test accuracy and 0.79 ROC-AUC on 105,000 held-out decisions.",
    github:
      "https://github.com/Hemanthsai456/Human-Decision-Intelligence",
    live: null,
    published: true,
  },


  // ── 6: Data Center Resource Analytics (Data Science / Analytics) ──
  {
    id: "data-center-cooling",
    title:
      "Data Center Resource Analytics: Cooling Demand, Electricity &amp; Water Requirement Analysis",
    badges: [
      { label: "Data Analytics", color: "purple" },
      { label: "Predictive Modeling", color: "blue" },
    ],
    techStack: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-Learn",
      "Physics-Based Modeling"
    ],
    imageUrl: "assets/project-images/Data_Center_Analytics.webp",
    imageStatus: "uploaded",
    showImage: true,
    featured: true,
    featuredOrder: 6,
    featuredData: {
      icon: "server",
      metric: "2.75M+ Telemetry Rows",
      titleShort: "Data Center Resource Analytics",
      descriptionHtml:
        "<strong>Problem:</strong> Data centers use large amounts of electricity and water for cooling, but the raw sensor telemetry does not show how workload turns into heat and water demand.<br />" +
        "<strong>Solution:</strong> Profiled and cleaned 2.7M+ server readings, engineered workload and thermal features, and combined thermodynamic relationships (heat load, cooling-water flow, evaporative water) with a Linear Regression model after removing leakage-prone features.<br />" +
        "<strong>Impact:</strong> Produced a data-driven framework linking computing workload to electricity, heat and cooling-water requirements, with the model reaching R² of 0.98 on held-out data.",
      highlights: [
        "2.75M+ telemetry records profiled",
        "Physics-based heat and water modeling",
        "Leakage-free feature design",
        "Hour-of-day cyclical encoding",
        "Held-out R² of 0.98 (RMSE 0.013)",
        "Correlation checks independent of the model",
      ],
      stackShort: [
        "Python",
        "Pandas",
        "Scikit-Learn",
        "Plotly"
      ],
      links: [
        {
          label: "GitHub",
          href: "https://github.com/Hemanthsai456/Data-Center-Resource-Analytics",
          cls: "btn-icon",
          icon: "github",
          ariaLabel: "GitHub"
        },
      ],
    },
    projectOrder: 6,
    description:
      "Analyzed 2.75M+ data center telemetry records to quantify how workload and power translate into heat, cooling-water flow and evaporative water demand. Combined EDA, feature engineering and physics-based thermal modeling with a Linear Regression model that reached R² of 0.98 after leakage-prone features were removed.",
    github:
      "https://github.com/Hemanthsai456/Data-Center-Resource-Analytics",
    live: null,
    published: true,
  },


  // ── 7: Anime & Manga (Archive) ─────────────────────────────────
  {
    id: "anime",
    title:
      "Anime &amp; Manga Recommendation Analytics",
    badges: [
      { label: "Machine Learning", color: "purple" },
      { label: "Analytics", color: "blue" },
    ],
    techStack: [
      "Python",
      "Pandas",
      "Power BI",
      "TF-IDF",
      "Cosine Similarity",
      "Streamlit",
      "Recommendation Engine"
    ],
    imageUrl: null,
    imageStatus: "not_uploaded",
    showImage: false,
    featured: false,
    featuredOrder: null,
    featuredData: null,
    projectOrder: 7,
    description:
      "End-to-end analytics project on anime and manga data: exploratory analysis, interactive Plotly and Power BI dashboards, and a hybrid recommender that combines TF-IDF content similarity, cosine similarity, IMDb-weighted ratings and popularity, with an explainability module. Delivered as a multi-page Streamlit app.",
    github:
      "https://github.com/Hemanthsai456/Anime-Manga-Recommendation-Analytics",
    live:
      "https://hemanth-anime-manga-analytics-recommendation-system.streamlit.app/",
    liveLabel: "Live Demo",
    published: true,
  },


  // ── 8: NLP Hate Speech Classifier (Archive) ───────────────────
  {
    id: "hate-speech",
    title: "NLP Hate Speech Classifier",
    badges: [
      { label: "NLP", color: "purple" },
      { label: "Machine Learning", color: "blue" },
    ],
    techStack: [
      "Python",
      "NLP",
      "TF-IDF",
      "Scikit-Learn",
      "Streamlit",
      "Logistic Regression"
    ],
    imageUrl: null,
    imageStatus: "not_uploaded",
    showImage: false,
    featured: false,
    featuredOrder: null,
    featuredData: null,
    projectOrder: 8,
    description:
      "End-to-end NLP pipeline that classifies text as hate speech or not, using custom preprocessing, TF-IDF vectorization and Logistic Regression. Served through a Streamlit app that returns the prediction with a confidence score and probability distribution.",
    github:
      "https://github.com/Hemanthsai456/NLP-Hate-Speech-Classifier",
    live:
      "https://hemanth-hate-speech-detection.streamlit.app/",
    liveLabel: "Live Demo",
    published: true,
  },


  // ── 9: Public Transport Analytics (Archive) ──────────────────
  {
    id: "transport",
    title: "Public Transport Analytics Dashboard",
    badges: [
      { label: "Analytics", color: "purple" },
      { label: "Business Intelligence", color: "blue" },
    ],
    techStack: [
      "Power BI",
      "Data Visualization",
      "Dashboard Design",
      "DAX",
      "Power Query"
    ],
    imageUrl: null,
    imageStatus: "not_uploaded",
    showImage: false,
    featured: false,
    featuredOrder: null,
    featuredData: null,
    projectOrder: 9,
    description:
      "Interactive Power BI dashboard for public transport operations, built on a synthetic dataset. It tracks revenue, profit, fuel efficiency and maintenance cost by bus type and route, with an executive overview, a route map and KPI tracking.",
    github:
      "https://github.com/Hemanthsai456/Public-Transport-Analytics-Dashboard",
    live: null,
    published: true,
  },


  // ── 10: Portfolio (Archive) ──────────────────────────────────
  {
    id: "portfolio",
    title: "Hemanth Sai Portfolio",
    badges: [
      { label: "Web Development", color: "purple" },
      { label: "Design", color: "blue" },
    ],
    techStack: [
      "HTML",
      "CSS",
      "JavaScript",
      "tsParticles",
      "Lucide Icons",
      "Glassmorphism"
    ],
    imageUrl: null,
    imageStatus: "not_uploaded",
    showImage: false,
    featured: false,
    featuredOrder: null,
    featuredData: null,
    projectOrder: 10,
    description:
      "Personal portfolio built with plain HTML, CSS and JavaScript. Data-driven project pages are rendered from a single source file with a build script and automated checks, with responsive layouts, scroll-reveal animations and structured data for search engines.",
    github:
      "https://github.com/Hemanthsai456/Hemanth-Sai-Portfolio",
    live:
      "https://hemanth-sai-portfolio.vercel.app/",
    liveLabel: "Live Site",
    published: true,
  },


  // ── 11: StudIQ (Archive, team project) ───────────────────────
  {
    id: "studiq",
    title: "StudIQ — Intelligent Study Platform",
    badges: [
      { label: "Frontend", color: "purple" },
      { label: "Team Project", color: "blue" },
    ],
    techStack: [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    imageUrl: null,
    imageStatus: "not_uploaded",
    showImage: false,
    featured: false,
    featuredOrder: null,
    featuredData: null,
    projectOrder: 11,
    description:
      "Frontend for a study-platform concept built with a team for Smart India Hackathon 2025. Responsive interface for organizing learning and navigating study sections. The original backend's free-trial database has expired, so the repository holds the UI only.",
    github:
      "https://github.com/Hemanthsai456/StudIQ-Frontend-SIH2025",
    live: null,
    published: true,
  },


  // ── 12: BunkRide (Archive, team project) ─────────────────────
  {
    id: "bunkride",
    title: "BunkRide — Real-Time Ride-Sharing Platform",
    badges: [
      { label: "Full Stack", color: "purple" },
      { label: "Team Project", color: "blue" },
    ],
    techStack: [
      "React",
      "Node.js",
      "Express",
      "Socket.IO",
      "Google Maps API",
      "GPS Tracking"
    ],
    imageUrl: null,
    imageStatus: "not_uploaded",
    showImage: false,
    featured: false,
    featuredOrder: null,
    featuredData: null,
    projectOrder: 12,
    description:
      "Real-time ride-booking web app built with React, Node.js, Express and Socket.IO. Uses the Google Maps API for live driver tracking and ride management.",
    github:
      "https://github.com/Hemanthsai456/bunkride",
    live: null,
    published: true,
  },

  // ── 13: ProfilePulse (Archive, beta) ─────────────────────────
  {
    id: "profilepulse",
    title: "ProfilePulse \u2014 Privacy-First GitHub Profile Analytics",
    badges: [
      { label: "Backend", color: "purple" },
      { label: "Privacy-First", color: "blue" },
    ],
    techStack: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Docker",
      "Render",
      "pytest"
    ],
    imageUrl: null,
    imageStatus: "not_uploaded",
    showImage: false,
    featured: false,
    featuredOrder: null,
    featuredData: null,
    projectOrder: 13,
    description:
      "Privacy-first analytics service that gives GitHub profile READMEs honest visitor badges by counting GitHub Camo proxy requests. Built with FastAPI and PostgreSQL, using daily-rotating HMAC visitor keys, no stored IPs or User-Agent strings, 30-day retention and a rate limiter. Containerized with Docker with a Render deployment config. Currently in beta with a small group of users.",
    github:
      "https://github.com/Hemanthsai456/ProfilePulse",
    live: null,
    published: true,
  },


  // ── 14: Air Canvas (Archive, toy / learning project) ──────────
  {
    id: "air-canvas",
    title: "Air Canvas \u2014 Touchless Drawing with Computer Vision",
    badges: [
      { label: "Computer Vision", color: "purple" },
      { label: "Real-Time", color: "blue" },
    ],
    techStack: [
      "Python",
      "OpenCV",
      "MediaPipe",
      "1-Euro Filter",
      "Bézier Curves",
      "pytest"
    ],
    imageUrl: null,
    imageStatus: "not_uploaded",
    showImage: false,
    featured: false,
    featuredOrder: null,
    featuredData: null,
    projectOrder: 14,
    description:
      "Touchless drawing app that turns a webcam into a mid-air canvas using OpenCV and MediaPipe hand tracking. Uses a pinch-to-draw gesture with hysteresis, a 1-Euro filter and Bézier smoothing for steady strokes, several input and background modes, and unit tests for the filter and gesture logic.",
    github:
      "https://github.com/Hemanthsai456/air-canvas",
    live: null,
    published: true,
  },
];
