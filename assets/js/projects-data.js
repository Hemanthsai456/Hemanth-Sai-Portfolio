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
 *  featured      – true → rendered in the homepage Featured Solutions grid
 *  featuredOrder – sort key for homepage grid (lower = first)
 *  featuredData  – extra fields used only when rendering on homepage
 *    .icon           lucide icon name for the project-icon-box
 *    .metric         text for the project-metric badge
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
 */

const PROJECTS = [
  // ── 1: Healthcare Analytics & BI ───────────────────────────────
  {
    id: "sparcs",
    title: "Healthcare Analytics &amp; Business Intelligence System (SPARCS)",
    badges: [
      { label: "Data Engineering", color: "purple" },
      { label: "Business Intelligence", color: "purple" },
      { label: "Analytics", color: "blue" },
    ],
    techStack: ["PostgreSQL", "Power BI", "ETL", "Star Schema", "SQL Analytics", "Materialized Views", "PL/pgSQL"],

    featured: true,
    featuredOrder: 1,
    featuredData: {
      icon: "database",
      metric: "16.3M+ Records",
      titleShort: "Healthcare Analytics &amp; BI System",
      descriptionHtml:
        "<strong>Problem:</strong> Healthcare analysis often struggles with siloed, raw transactional data, making it difficult to extract multi-year clinical and financial trends efficiently.<br />" +
        "<strong>Solution:</strong> Designed a robust, multi-stage PostgreSQL data warehouse utilizing a Star Schema (8 dimensions, 1 fact table) with custom materialized views and automated ETL scripts.<br />" +
        "<strong>Impact:</strong> Streamlined queries across 16.3M+ records spanning 7 years, reducing report latency and enabling self-service clinical operations analytics via Power BI.",
      highlights: [
        "16.3M+ Records",
        "7 Years Data",
        "8 Dimensions &amp; 1 Fact Table",
        "8 Page Dashboard for Each Domain",
        "11 Analytics Views",
        "4 Materialized Views",
      ],
      stackShort: ["PostgreSQL", "Power BI", "ETL", "SQL Analytics"],
      links: [
        { label: "GitHub", href: "https://github.com/Hemanthsai456/sparcs-healthcare-analytics-bi", cls: "btn-icon", icon: "github", ariaLabel: "GitHub" },
        { label: "Case Study", href: "https://github.com/Hemanthsai456/sparcs-healthcare-analytics-bi/tree/main/DOCS", cls: "btn-text", icon: "arrow-up-right", ariaLabel: "Case Study" },
      ],
    },

    projectOrder: 1,
    description:
      "Designed a robust, multi-stage PostgreSQL data warehouse utilizing a Star Schema (8 dimensions, 1 fact table) with custom materialized views and automated ETL scripts. Streamlined queries across 16.3M+ healthcare records spanning 7 years, reducing report latency and enabling self-service clinical operations analytics via Power BI.",
    github: "https://github.com/Hemanthsai456/sparcs-healthcare-analytics-bi",
    live: null,

    published: true,
  },

  // ── 2: Medical Inventory Forecasting ───────────────────────────
  {
    id: "medical-inventory",
    title: "Medical Inventory Forecasting &amp; Decision Support System",
    badges: [
      { label: "Machine Learning", color: "purple" },
      { label: "Healthcare", color: "blue" },
    ],
    techStack: ["Python", "Scikit-Learn", "SHAP", "Streamlit", "XGBoost", "K-Means", "Gradient Boosting"],

    featured: true,
    featuredOrder: 2,
    featuredData: {
      icon: "trending-up",
      metric: "R\u00B2 = 0.7978",
      titleShort: "Medical Inventory Forecasting &amp; Decision Support System",
      descriptionHtml:
        "<strong>Problem:</strong> Inefficient medical inventory tracking leads to critical stockouts of life-saving medicines or costly overstocking wastes.<br />" +
        "<strong>Solution:</strong> Developed a decision support system evaluating 14 machine learning algorithms (Gradient Boosting achieved R&sup2; = 0.7978) with SHAP for model explainability and K-Means for demand clustering.<br />" +
        "<strong>Impact:</strong> Delivered a Streamlit dashboard enabling real-time demand forecasting and stock optimization, transforming complex ML predictions into actionable clinical inventory decisions.",
      highlights: [
        "14 Models Evaluated",
        "R&sup2; = 0.7978",
        "SHAP Explainability",
        "Streamlit Deployment",
      ],
      stackShort: ["Python", "Scikit-Learn", "SHAP", "Streamlit"],
      links: [
        { label: "GitHub", href: "https://github.com/Hemanthsai456/Medical-Inventory-Forecasting-Decision-Support-System", cls: "btn-icon", icon: "github", ariaLabel: "GitHub" },
        { label: "Live Demo", href: "https://hemanthsai-medical-inventory-decision-support.streamlit.app/", cls: "btn-icon", icon: "external-link", ariaLabel: "Live Demo" },
        { label: "Case Study", href: "https://github.com/Hemanthsai456/Medical-Inventory-Forecasting-Decision-Support-System/tree/main/documentation", cls: "btn-text", icon: "arrow-up-right", ariaLabel: "Case Study" },
      ],
    },

    projectOrder: 2,
    description:
      "Developed a decision support system evaluating 14 machine learning algorithms \u2014 Gradient Boosting achieved R\u00B2 = 0.7978 \u2014 with SHAP for model explainability and K-Means for demand clustering. Delivered a Streamlit dashboard enabling real-time demand forecasting and stock optimization, transforming complex ML predictions into actionable clinical inventory decisions.",
    github: "https://github.com/Hemanthsai456/Medical-Inventory-Forecasting-Decision-Support-System",
    live: "https://hemanthsai-medical-inventory-decision-support.streamlit.app/",
    liveLabel: "Live Demo",

    published: true,
  },

  // ── 3: NIDHI ───────────────────────────────────────────────────
  {
    id: "nidhi",
    title: "NIDHI \u2014 AI Investor Super App",
    badges: [
      { label: "Full Stack", color: "purple" },
      { label: "AI", color: "blue" },
    ],
    techStack: ["TypeScript", "React", "Next.js", "AI Recommender", "Authentication", "Risk Intelligence"],

    featured: true,
    featuredOrder: 3,
    featuredData: {
      icon: "wallet",
      metric: "Risk Intelligence",
      titleShort: "NIDHI AI Investor Super App",
      descriptionHtml:
        "<strong>Problem:</strong> Individual retail investors lack access to unified portfolio analysis, real-time risk insights, and personalized, data-backed financial guidance.<br />" +
        "<strong>Solution:</strong> Engineered a comprehensive portfolio manager using Next.js with a reactive state architecture, integrating AI recommendation models for real-time risk evaluation.<br />" +
        "<strong>Impact:</strong> Delivered an intuitive investor cockpit with interactive dashboards, offering retail users institution-grade portfolio intelligence and personalized financial education.",
      highlights: [
        "Next.js Front-End",
        "AI Powered",
        "Authenthication",
        "Easy Investment Suggestions",
        "Risk Intelligence",
        "Education Workflows",
      ],
      stackShort: ["TypeScript", "React", "Next.js", "AI Recommender"],
      links: [
        { label: "GitHub", href: "https://github.com/Hemanthsai456/NIDHI", cls: "btn-icon", icon: "github", ariaLabel: "GitHub" },
        { label: "Live Demo", href: "https://nidhiapp.vercel.app", cls: "btn-icon", icon: "external-link", ariaLabel: "Live Demo" },
      ],
    },

    projectOrder: 3,
    description:
      "Engineered a comprehensive portfolio manager using Next.js with a reactive state architecture, integrating AI recommendation models for real-time risk evaluation. Delivered an intuitive investor cockpit with interactive dashboards, offering retail users institution-grade portfolio intelligence and personalized financial education.",
    github: "https://github.com/Hemanthsai456/NIDHI",
    live: "https://nidhiapp.vercel.app",
    liveLabel: "Live Demo",

    published: true,
  },

  // ── 4: Anime & Manga ───────────────────────────────────────────
  {
    id: "anime",
    title: "Anime &amp; Manga Analytics &amp; Recommendation System",
    badges: [
      { label: "Machine Learning", color: "purple" },
      { label: "Analytics", color: "blue" },
    ],
    techStack: ["Python", "Pandas", "Power BI", "TF-IDF", "Cosine Similarity", "Streamlit", "Recommendation Engine"],

    featured: true,
    featuredOrder: 4,
    featuredData: {
      icon: "sparkles",
      metric: "Hybrid Filtering",
      titleShort: "Anime Recommendation Engine",
      descriptionHtml:
        "<strong>Problem:</strong> Standard content discovery on entertainment platforms suffers from cold-start issues and basic filtering, causing user churn.<br />" +
        "<strong>Solution:</strong> Designed a hybrid content-based recommendation engine utilizing TF-IDF, Cosine Similarity, and popularity-weighted ranking algorithms.<br />" +
        "<strong>Impact:</strong> Built an interactive analytics dashboard in Power BI displaying user consumption patterns and recommendation coverage, providing highly personalized titles with reduced latency.",
      highlights: [
        "Recommendation Engine",
        "Content based filtering",
        "Cosine Similarity",
        "Dashboard Design",
        "Power BI Analytics",
        "Hybrid Popularity",
      ],
      stackShort: ["Python", "Pandas", "Power BI", "Cosine Similarity"],
      links: [
        { label: "Code", href: "https://github.com/Hemanthsai456/Anime-Manga-Analytics-Recommendation-System", cls: "btn-icon", icon: "github", ariaLabel: "GitHub" },
        { label: "Live Demo", href: "https://hemanth-anime-manga-analytics-recommendation-system.streamlit.app/", cls: "btn-icon", icon: "external-link", ariaLabel: "Live Demo" },
      ],
    },

    projectOrder: 4,
    description:
      "Designed a hybrid content-based recommendation engine utilizing TF-IDF, Cosine Similarity, and popularity-weighted ranking algorithms. Built an interactive analytics dashboard in Power BI displaying user consumption patterns and recommendation coverage, providing highly personalized titles with reduced latency.",
    github: "https://github.com/Hemanthsai456/Anime-Manga-Analytics-Recommendation-System",
    live: "https://hemanth-anime-manga-analytics-recommendation-system.streamlit.app/",
    liveLabel: "Live Demo",

    published: true,
  },

  // ── 5: Hate Speech Detection ───────────────────────────────────
  {
    id: "hate-speech",
    title: "Hate Speech Detection System",
    badges: [
      { label: "NLP", color: "purple" },
      { label: "Machine Learning", color: "blue" },
    ],
    techStack: ["Python", "NLP", "TF-IDF", "Scikit-Learn", "Streamlit", "Logistic Regression"],

    featured: true,
    featuredOrder: 5,
    featuredData: {
      icon: "shield-alert",
      metric: "NLP Classify",
      titleShort: "Hate Speech Detection System",
      descriptionHtml:
        "<strong>Problem:</strong> Online platforms struggle with toxic behavior and hate speech, requiring automated, low-latency moderating solutions.<br />" +
        "<strong>Solution:</strong> Built an end-to-end NLP classification pipeline featuring custom regex tokenizers, TF-IDF vectorization, and optimized classification models.<br />" +
        "<strong>Impact:</strong> Deployed the model via an interactive Streamlit interface, allowing real-time text moderation and content filtering with high precision.",
      highlights: [
        "NLP Classification",
        "Preprocessing Pipeline",
        "Logistic Regression",
        "Streamlit Dashboard",
      ],
      stackShort: ["NLP", "TF-IDF", "Scikit-learn", "Streamlit"],
      links: [
        { label: "Code", href: "https://github.com/Hemanthsai456/Hate-Speech-Detection-System", cls: "btn-icon", icon: "github", ariaLabel: "GitHub" },
        { label: "Live Demo", href: "https://hemanth-hate-speech-detection.streamlit.app/", cls: "btn-icon", icon: "external-link", ariaLabel: "Live Demo" },
      ],
    },

    projectOrder: 5,
    description:
      "Built an end-to-end NLP classification pipeline featuring custom regex tokenizers, TF-IDF vectorization, and optimized classification models. Deployed the model via an interactive Streamlit interface, allowing real-time text moderation and content filtering with high precision.",
    github: "https://github.com/Hemanthsai456/Hate-Speech-Detection-System",
    live: "https://hemanth-hate-speech-detection.streamlit.app/",
    liveLabel: "Live Demo",

    published: true,
  },

  // ── 6: BunkRide ────────────────────────────────────────────────
  {
    id: "bunkride",
    title: "BunkRide \u2014 Real-Time Ride-Sharing Platform",
    badges: [
      { label: "Full Stack", color: "purple" },
      { label: "Real-Time", color: "blue" },
    ],
    techStack: ["React", "Node.js", "Express", "Socket.IO", "Google Maps API", "GPS Tracking"],

    featured: true,
    featuredOrder: 6,
    featuredData: {
      icon: "car",
      metric: "GPS Booking",
      titleShort: "BunkRide Booking Platform",
      descriptionHtml:
        "<strong>Problem:</strong> Students and daily commuters lack accessible, real-time carpooling options, leading to higher travel expenses and traffic congestion.<br />" +
        "<strong>Solution:</strong> Developed a real-time ride-sharing web application integrated with Google Maps API and Socket.IO for live driver-passenger matchmaking and interactive GPS tracking.<br />" +
        "<strong>Impact:</strong> Provided a seamless platform for automated matchmaking and real-time transit coordination, reducing transit costs and improving ride coordination efficiency.",
      highlights: [
        "Google Maps API",
        "Socket.IO Matchmaker",
        "Node.js / Express",
        "Real-time GPS Tracking",
      ],
      stackShort: ["React", "Node.js", "Express", "Socket.IO"],
      links: [
        { label: "Code", href: "https://github.com/srujangandla/bunkride", cls: "btn-icon", icon: "github", ariaLabel: "GitHub" },
      ],
    },

    projectOrder: 6,
    description:
      "Developed a real-time ride-sharing web application integrated with Google Maps API and Socket.IO for live driver-passenger matchmaking and interactive GPS tracking. Provided a seamless platform for automated matchmaking and real-time transit coordination, reducing transit costs and improving ride coordination efficiency.",
    github: "https://github.com/srujangandla/bunkride",
    live: null,

    published: true,
  },

  // ── 7: Portfolio ───────────────────────────────────────────────
  {
    id: "portfolio",
    title: "Hemanth Sai Portfolio",
    badges: [
      { label: "Web Development", color: "purple" },
      { label: "Design", color: "blue" },
    ],
    techStack: ["HTML", "CSS", "JavaScript", "tsParticles", "Lucide Icons", "Glassmorphism"],

    featured: false,
    featuredOrder: null,
    featuredData: null,

    projectOrder: 7,
    description:
      "Designed and built a premium personal portfolio website with a dark glassmorphism aesthetic, animated particle backgrounds, 3D card tilt effects, and smooth scroll-reveal animations. Crafted to showcase work in AI, data engineering, analytics, and full-stack development with production-level attention to design quality and performance.",
    github: "https://github.com/Hemanthsai456/Hemanth-Sai-Portfolio",
    live: "https://hemanth-sai-portfolio.vercel.app/",
    liveLabel: "Live Site",

    published: true,
  },

  // ── 8: Public Transport Analytics ─────────────────────────────
  {
    id: "transport",
    title: "Public Transport Analytics Dashboard",
    badges: [
      { label: "Analytics", color: "purple" },
      { label: "Data Engineering", color: "blue" },
    ],
    techStack: ["Power BI", "Data Visualization", "Dashboard Design", "DAX", "Power Query"],

    featured: false,
    featuredOrder: null,
    featuredData: null,

    projectOrder: 8,
    description:
      "Built an interactive Power BI dashboard to analyze public transport data, uncover operational patterns, track key performance indicators, and present transportation insights through clear and interactive visualizations.",
    github: "https://github.com/Hemanthsai456/Public-Transport-Analytics-Dashboard",
    live: null,

    published: true,
  },

  // ── 9: StudIQ ──────────────────────────────────────────────────
  {
    id: "studiq",
    title: "StudIQ \u2014 Intelligent Study Platform",
    badges: [
      { label: "Full Stack", color: "purple" },
      { label: "EdTech", color: "blue" },
    ],
    techStack: ["JavaScript", "React", "Node.js", "PostgreSQL", "REST APIs", "Full Stack"],

    featured: false,
    featuredOrder: null,
    featuredData: null,

    projectOrder: 9,
    description:
      "Developed an intelligent study platform designed to help students organize, track, and optimize their learning workflows. Integrated smart scheduling, progress tracking, and resource management features built with a modern full-stack architecture to create a seamless academic productivity experience.",
    github: "https://github.com/Hemanthsai456/StudIQ-Frontend-SIH2025",
    live: null,

    published: true,
  },
];
