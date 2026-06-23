// src/data/positions.js
// ============================================================
// ALL POSITION DATA — Edit this file to update CV content
// ============================================================

export const positions = [
  // ─── 0: PRODUCT MANAGER ───────────────────────────────────
  {
    id: 0,
    tabLabel: 'Product Manager · PSPO I',
    badge: 'PRODUCT MANAGER • PSPO I',
    heroIcon: 'fa-solid fa-chart-gantt',
    heroTitle: 'Product Manager | Web3 & AI Products',
    heroSubtitle: 'Certified PSPO I · Led end-to-end product development for live Web3 platform, treasury wallet, and AI trading bot.',
    aboutTitle: 'Product-first leader who ships user-centric Web3 products.',
    aboutHTML: `
      <p>Experienced in product strategy, roadmap planning, and agile product development using Scrum (<strong>PSPO I certified</strong>). Owned the full product lifecycle of <strong>Belly Bears Web3 Platform</strong> — from user research to launch and iteration.</p>
      <p>Skilled in prioritizing features, managing stakeholders, and delivering high-impact blockchain and AI products that users love.</p>
    `,
    stats: [
      { number: '1', suffix: '', label: 'Live Web3 Product' },
      { number: '3', suffix: '+', label: 'Years Experience' },
      { number: '2026', suffix: '', label: 'PSPO I Certified' },
    ],
    experience: [
      {
        period: 'Feb 2024 – Aug 2025',
        role: 'Cost Control & Business Planning',
        company: '<a href="https://www.linkedin.com/company/tri-alfa-aurum-oil" target="_blank">Tri Alfa Aurum Oil</a>',
        items: [
          'Product backlog management & feature prioritization',
          'Stakeholder alignment & business requirement gathering',
          'Market research and investment analysis reporting',
        ],
      },
      {
        period: 'Jan 2026 – April 2026',
        role: 'Product Owner',
        company: 'Belly Bears Web3 Platform',
        items: [
          'Defined product vision, roadmap, and MVP features from scratch',
          'Led cross-functional team (dev + design) using Scrum framework',
          'Delivered live platform with WalletConnect, treasury wallet & AI Agent',
        ],
      },
    ],
    projects: [
      {
        icon: 'fa-solid fa-wallet',
        title: 'Belly Bears Web3 Platform',
        period: 'Jan 2026 – April 2026 · <a href="https://bellybears.xyz" target="_blank">bellybears.xyz</a>',
        desc: 'Led product from 0 to live platform. Owned user journey, treasury wallet feature, payment flow, and AI Agent integration using Agile/Scrum methodologies.',
      },
      {
        icon: 'fa-solid fa-robot',
        title: 'Python Forex Trading Bot + AI Agent',
        period: 'Nov 2025 – Present',
        desc: 'Defined product requirements, success metrics, and iterative development of an automated trading solution with Exness API and AI decision engine.',
      },
    ],
    skills: [
      {
        icon: 'fa-solid fa-list-check',
        category: 'Product Management',
        tags: ['Product Roadmap', 'User Stories & Backlog', 'PSPO I Certified', 'Stakeholder Management', 'MVP Scoping'],
      },
      {
        icon: 'fa-solid fa-toolbox',
        category: 'Tools & Methods',
        tags: ['Figma', 'Jira', 'Notion', 'Miro', 'Google Sheets', 'Scrum', 'Agile'],
      },
    ],
  },

  // ─── 1: FULL-STACK WEB3 ───────────────────────────────────
  {
    id: 1,
    tabLabel: 'Full-Stack Web3 Dev',
    badge: 'FULL-STACK WEB3 + TREASURY WALLET + AI',
    heroIcon: 'fa-solid fa-cube',
    heroTitle: 'Full-Stack Web3 Developer & AI Agent Specialist',
    heroSubtitle: 'React.js + Supabase + Python + WalletConnect. Treasury wallet, payment gateway, Google Sheets sync, live charts, Python Forex Bot & AI Agents.',
    aboutTitle: 'Full-stack Web3 engineer who ships complete blockchain products.',
    aboutHTML: `
      <p>I develop end-to-end Web3 applications: React.js frontend, Supabase backend, Python automation, and full blockchain wallet + <strong>treasury wallet implementation</strong>. My live platform <a href="https://bellybears.xyz" target="_blank">bellybears.xyz</a> includes WalletConnect, treasury dashboard, payment gateway, Google Sheets integration, live charts, and AI Agent logic.</p>
      <p>Built Python Forex Trading Bot (Exness API) and actively trade crypto on Binance & forex on Exness — bringing real market insights to every project.</p>
    `,
    stats: [
      { number: '1', suffix: '', label: 'Live Web3 Platform' },
      { number: '5', suffix: '+', label: 'Tech Stacks' },
      { number: '2', suffix: '', label: 'Trading Bots Built' },
    ],
    experience: [
      {
        period: 'Jan 2024 – May 2024',
        role: 'Program Engineer',
        company: 'Alf Tech Ventures',
        items: [
          'Built full-stack LMS web app (React.js frontend + Supabase backend)',
          'Google Sheets integration & live dashboard charts for reporting',
          'Delivered production-ready features in Agile sprints',
        ],
      },
      {
        period: 'Jan 2024',
        role: 'UI/UX + Frontend Developer',
        company: 'SMART RT/RW App',
        items: [
          'React.js prototypes achieving 15% user satisfaction increase',
          'Designed intuitive community management interface in Figma',
        ],
      },
    ],
    projects: [
      {
        icon: 'fa-solid fa-wallet',
        title: 'Belly Bears Web3 Platform',
        period: 'January 2026 – April 2026 · <a href="https://bellybears.xyz" target="_blank">bellybears.xyz</a>',
        desc: 'Full-stack Web3 platform with React frontend + Supabase backend + WalletConnect treasury wallet + payment gateway + Google Sheets sync + live charts + AI Agent + Telegram bot.',
      },
      {
        icon: 'fa-solid fa-robot',
        title: 'Python Forex Trading Bot + AI Agent',
        period: 'Nov 2025 – Present',
        desc: 'Automated trading bot with Exness API, real-time data processing, risk management logic, and AI Agent decision engine for trade execution.',
      },
      {
        icon: 'fa-solid fa-boxes-stacked',
        title: 'Retail Inventory System (Thesis)',
        period: '2023',
        desc: 'Full-stack website with backend database, reporting charts, and Waterfall methodology — Universitas Padjadjaran undergraduate thesis.',
      },
    ],
    skills: [
      {
        icon: 'fa-solid fa-laptop-code',
        category: 'Frontend',
        tags: ['React.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'Figma', 'Live Charts & Dashboards'],
      },
      {
        icon: 'fa-solid fa-server',
        category: 'Backend & Database',
        tags: ['Supabase (Auth, PostgreSQL, Storage)', 'SQL & DBeaver', 'Google Sheets API', 'REST API Integration', 'Spring Boot'],
      },
      {
        icon: 'fa-solid fa-cube',
        category: 'Web3 & Blockchain',
        tags: ['WalletConnect', 'MetaMask Integration', 'Treasury Wallet Implementation', 'Payment Gateway (Crypto)', 'On-Chain Analytics'],
      },
    ],
  },

  // ─── 2: DATA ANALYST ──────────────────────────────────────
  {
    id: 2,
    tabLabel: 'Data Analyst / BI',
    badge: 'DATA ANALYST • BUSINESS INTELLIGENCE',
    heroIcon: 'fa-solid fa-chart-column',
    heroTitle: 'Business Intelligence Data Analyst',
    heroSubtitle: 'SQL + Python + React dashboards + Google Sheets + live charts. Delivered 15% efficiency gains and real-time treasury insights.',
    aboutTitle: 'Data that drives Web3 & business decisions.',
    aboutHTML: `
      <p>Expert in managing corporate databases, building interactive dashboards, ETL pipelines, Google Sheets integration, and turning complex data into actionable visual insights.</p>
      <p>Real-world crypto & forex trading experience on Binance & Exness — combined with live treasury analytics in my Web3 project, bringing unique market intuition to every data challenge.</p>
    `,
    stats: [
      { number: '15', suffix: '%', label: 'Efficiency Gain' },
      { number: '3', suffix: '+', label: 'Years Data Work' },
      { number: '5', suffix: '+', label: 'Dashboards Built' },
    ],
    experience: [
      {
        period: 'Feb 2024 – Aug 2025',
        role: 'Cost Control & Business Planning',
        company: '<a href="https://www.linkedin.com/company/tri-alfa-aurum-oil" target="_blank">Tri Alfa Aurum Oil</a>',
        items: [
          'SQL + DBeaver + Google Sheets sync · 15% efficiency via ERP & live charts',
          'Market & investment analysis with Python + Weka data mining',
          'Built automated reporting pipelines reducing manual work by 40%',
        ],
      },
      {
        period: 'Feb 2020 – Jun 2020',
        role: 'Data Analyst Intern',
        company: 'PT Telekomunikasi Indonesia',
        items: [
          'Oracle + Weka + full ETL pipelines for telecom data processing',
          'React.js interactive dashboards for operational insights',
        ],
      },
    ],
    projects: [
      {
        icon: 'fa-solid fa-gauge-high',
        title: 'Belly Bears Web3 Treasury Dashboard',
        period: 'Jan 2026 – April 2026 · <a href="https://bellybears.xyz" target="_blank">bellybears.xyz</a>',
        desc: 'Real-time analytics with Supabase + Google Sheets integration + interactive charts tracking crypto payments and treasury performance.',
      },
      {
        icon: 'fa-solid fa-chart-line',
        title: 'Forex Trading Analytics Bot',
        period: 'Nov 2025 – Present',
        desc: 'Real-time market data processing and pattern analysis feeding AI trade decision engine. Live P&L tracking and risk metrics dashboard.',
      },
    ],
    skills: [
      {
        icon: 'fa-solid fa-database',
        category: 'BI Tools',
        tags: ['SQL', 'DBeaver', 'Google Sheets', 'Python (Colab)', 'Weka', 'Oracle'],
      },
      {
        icon: 'fa-solid fa-chart-pie',
        category: 'Visualization',
        tags: ['React.js Dashboards', 'Live Charts', 'ETL Pipelines', 'Interactive Reports'],
      },
    ],
  },

  // ─── 3: DATA ENGINEER ─────────────────────────────────────
  {
    id: 3,
    tabLabel: 'Data Engineer',
    badge: 'DATA ENGINEER',
    heroIcon: 'fa-solid fa-diagram-project',
    heroTitle: 'Data Engineer',
    heroSubtitle: 'ETL pipelines, Supabase backend, Python automation, Google Sheets sync, and real-time data flows for production systems.',
    aboutTitle: 'Scalable data infrastructure for Web3 & AI.',
    aboutHTML: `
      <p>Designed and implemented ETL processes, Supabase backends, Python scripts, and Google Sheets integrations for production-grade data pipelines.</p>
      <p>My Web3 platform and Forex Trading Bot handle real-time on-chain, payment, and market data end-to-end — proving I can architect data systems that perform under live conditions.</p>
    `,
    stats: [
      { number: '3', suffix: '+', label: 'Pipelines Built' },
      { number: '100', suffix: '%', label: 'Uptime Target' },
      { number: '2', suffix: '', label: 'Live Systems' },
    ],
    experience: [
      {
        period: 'Feb 2020 – Jun 2020',
        role: 'Data Analyst Intern',
        company: 'PT Telekomunikasi Indonesia',
        items: [
          'Full ETL pipelines + Python automation for telecom data at scale',
          'Oracle database management and query optimization',
        ],
      },
    ],
    projects: [
      {
        icon: 'fa-solid fa-pipe-section',
        title: 'Belly Bears Web3 Data Pipeline',
        period: '2026 – April 2026 · <a href="https://bellybears.xyz" target="_blank">bellybears.xyz</a>',
        desc: 'Supabase + Python + Google Sheets real-time data flows for NFT minting, crypto payments, treasury management, and live analytics.',
      },
      {
        icon: 'fa-solid fa-robot',
        title: 'Forex Bot Real-Time Data Pipeline',
        period: 'Nov 2025 – Present',
        desc: 'Real-time market tick data ingestion via Exness API, processing & feature engineering feeding the AI decision engine.',
      },
    ],
    skills: [
      {
        icon: 'fa-solid fa-diagram-project',
        category: 'Data Engineering',
        tags: ['ETL Pipelines', 'Supabase Backend', 'Python Automation', 'Google Sheets Sync', 'REST API Integration'],
      },
      {
        icon: 'fa-solid fa-database',
        category: 'Databases',
        tags: ['PostgreSQL', 'Oracle', 'SQL & DBeaver', 'Data Modeling'],
      },
    ],
  },

  // ─── 4: DATA SCIENTIST ────────────────────────────────────
  {
    id: 4,
    tabLabel: 'Data Scientist',
    badge: 'DATA SCIENTIST + AI AGENT',
    heroIcon: 'fa-solid fa-brain',
    heroTitle: 'Data Scientist & AI Agent Specialist',
    heroSubtitle: 'Weka + Python + AI Agent implementation for pattern recognition, market prediction, and automated decision systems.',
    aboutTitle: 'AI Agents + data science for Web3 & finance.',
    aboutHTML: `
      <p>Hands-on experience with data mining (Weka), predictive modeling in Python, and building <strong>AI Agents</strong> for automation — covering trading insights, community engagement, and recommendation logic.</p>
      <p>Active crypto trader on Binance + forex trader on Exness, giving real market intuition that strengthens every predictive model I build.</p>
    `,
    stats: [
      { number: '2', suffix: '', label: 'AI Agents Built' },
      { number: '3', suffix: '+', label: 'Years Python' },
      { number: '100', suffix: '%', label: 'Model Automation' },
    ],
    experience: [
      {
        period: 'Feb 2024 – Aug 2025',
        role: 'Cost Control & Business Planning',
        company: '<a href="https://www.linkedin.com/company/tri-alfa-aurum-oil" target="_blank">Tri Alfa Aurum Oil</a>',
        items: [
          'Market research & AI-driven investment analysis (Python + Weka)',
          'Predictive models for cost forecasting and business planning',
        ],
      },
    ],
    projects: [
      {
        icon: 'fa-solid fa-robot',
        title: 'Python Forex Trading Bot + AI Agent',
        period: 'Nov 2025 – Present',
        desc: 'AI Agent that analyzes real-time market data, detects patterns, makes trading decisions, and executes autonomously via Exness API.',
      },
      {
        icon: 'fa-solid fa-bear',
        title: 'Belly Bears AI Agent',
        period: 'Jan 2026 – April 2026 · <a href="https://bellybears.xyz" target="_blank">bellybears.xyz</a>',
        desc: 'AI Agent powering community automation, recommendation logic, and real-time treasury analytics for the Web3 platform.',
      },
    ],
    skills: [
      {
        icon: 'fa-solid fa-flask',
        category: 'Data Science & AI',
        tags: ['Python (pandas, requests, TA-Lib)', 'Weka Data Mining', 'AI Agent Development', 'Predictive Modeling'],
      },
      {
        icon: 'fa-solid fa-chart-line',
        category: 'Trading & Finance',
        tags: ['Technical Analysis', 'Binance (Crypto)', 'Exness (Forex)', 'Risk Management Logic'],
      },
    ],
  },

  // ─── 5: QA ENGINEER ───────────────────────────────────────
  {
    id: 5,
    tabLabel: 'QA Engineer',
    badge: 'QA ENGINEER',
    heroIcon: 'fa-solid fa-shield-check',
    heroTitle: 'QA Engineer',
    heroSubtitle: 'End-to-end testing for React + Supabase + Python bots + AI Agent systems. Quality-first for fast-moving Web3 products.',
    aboutTitle: 'Quality-first for fast-moving Web3 products.',
    aboutHTML: `
      <p>Experienced in test case design, regression testing, database validation, API testing (Python bots), and ensuring production quality across full-stack Web3 applications.</p>
      <p>Tested complete payment flows, wallet integrations, AI Agent logic, and real-time data pipelines — ensuring zero-defect releases for live production systems.</p>
    `,
    stats: [
      { number: '0', suffix: '', label: 'Production Bugs Shipped' },
      { number: '3', suffix: '+', label: 'Systems Tested' },
      { number: '100', suffix: '%', label: 'Coverage Target' },
    ],
    experience: [
      {
        period: 'Jan 2024 – May 2024',
        role: 'Program Engineer',
        company: 'Alf Tech Ventures',
        items: [
          'Full QA + regression testing (React + Supabase + Python scripts)',
          'Test case design and bug tracking for LMS production app',
          'API testing and database validation for data integrity',
        ],
      },
    ],
    projects: [
      {
        icon: 'fa-solid fa-shield-check',
        title: 'Belly Bears Web3 + Trading Bot QA',
        period: '2024 – Present · <a href="https://bellybears.xyz" target="_blank">bellybears.xyz</a>',
        desc: 'End-to-end testing of payment flows, Supabase, Google Sheets sync, treasury wallet, WalletConnect, and AI Agent logic. Zero critical bugs in production.',
      },
    ],
    skills: [
      {
        icon: 'fa-solid fa-bug-slash',
        category: 'QA Stack',
        tags: ['Test Case Design', 'Regression Testing', 'API Testing', 'SQL Validation', 'Python Bot Testing'],
      },
      {
        icon: 'fa-solid fa-toolbox',
        category: 'Tools',
        tags: ['DBeaver', 'Postman', 'Git & GitHub', 'Bug Tracking', 'Waterfall & Agile QA'],
      },
    ],
  },
  // ─── 6: SYSTEM ENGINEER ───────────────────────────────────────
  {
    id: 6,
    tabLabel: 'System Engineer',
    badge: 'SYSTEM ENGINEER · BANKING',
    heroIcon: 'fa-solid fa-server',
    heroTitle: 'System Engineer — Banking Systems (PT BNI)',
    heroSubtitle: 'End-to-end banking systems, infrastructure & operations',
    aboutTitle: 'Banking systems engineer who owns end-to-end operational reliability.',
    aboutHTML: `
      <p>Hands-on engineer responsible for the full lifecycle of banking systems at PT BNI — from onboarding business flows and architecture design to maintenance, monitoring, and upgrades.</p>
      <p>Skilled in troubleshooting, system reconciliation, infrastructure provisioning, and deeply understanding banking business processes and logic across Java-based core systems, Oracle databases, Red Hat platforms, and containerised deployments.</p>
    `,
    stats: [
      { number: '1', suffix: '', label: 'Bank Client (PT BNI)' },
      { number: '99', suffix: '%', label: 'Availability Target' },
      { number: '24', suffix: '/7', label: 'Monitoring & Support' },
    ],
    experience: [
      {
        period: 'May 2026 – Present',
        role: 'System Engineer',
        company: '<a href="https://www.bni.co.id" target="_blank">PT Bank Negara Indonesia (BNI)</a>',
        items: [
          'Mengelola alur bisnis perbankan end-to-end: dari penerimaan transaksi sampai settlement dan reporting',
          'Maintenance semua sistem perbankan: patching, upgrade, dan capacity planning',
          'Troubleshooting & fixing bugs pada layanan produksi dan integrasi antar sistem',
          'Monitoring sistem proaktif, alerting, dan eskalasi untuk menjaga SLA',
          'Melakukan validasi dan rekonsiliasi data antar sistem BNI untuk memastikan konsistensi ledger dan reporting',
          'Membangun infrastruktur baru (provisioning) untuk menopang performa dan skalabilitas sistem bank',
          'Memahami dan mendokumentasikan business process banking serta logic di setiap alur arsitektur sistem',
          'Bekerja dengan teknologi Docker (containerization), Red Hat (OS), Oracle (DB), dan Java-based core systems',
        ],
      },
      {
        period: 'Jan 2024 – May 2024',
        role: 'Program Engineer',
        company: 'Alf Tech Ventures',
        items: [
          'Full QA + regression testing (React + Supabase + Python scripts)',
          'Test case design and bug tracking for LMS production app',
          'API testing and database validation for data integrity',
        ],
      },
    ],
    projects: [
      {
        icon: 'fa-solid fa-network-wired',
        title: 'Banking Systems Reliability & Infra',
        period: 'May 2026 – Present',
        desc: 'Provisioned containerized services, improved monitoring, implemented reconciliation jobs, and supported Java/Oracle applications to meet banking SLAs.',
      },
    ],
    skills: [
      {
        icon: 'fa-solid fa-gears',
        category: 'Systems & Infra',
        tags: ['Docker', 'Red Hat', 'System Provisioning', 'Monitoring & Alerting', 'Capacity Planning', 'High Availability', 'Load Balancing', 'Kubernetes (container orchestration)'],
      },
      {
        icon: 'fa-solid fa-database',
        category: 'Databases & Platforms',
        tags: ['Oracle', 'PL/SQL', 'Oracle RMAN', 'Java-based Core Systems', 'Performance Tuning', 'Data Reconciliation', 'API Integrations'],
      },
      {
        icon: 'fa-solid fa-shield-halved',
        category: 'Operations & Security',
        tags: ['Incident Response', 'Problem Solving', 'Root Cause Analysis', 'Disaster Recovery', 'Backup & Recovery', 'Scripting (Bash, Python)', 'Logging & Observability (Prometheus/Grafana/ELK)', 'Security & Compliance (PCI-DSS, SELinux)'],
      },
    ],
  },
]

// ─── PHOTOS: Add your actual image paths here ─────────────
// Place photos in /public/images/ folder
// Each item = one photo shown when user clicks to swap
export const photos = [
  { src: '/images/WEB3.png',   label: 'Web3 Mode 🚀' },
  { src: '/images/photo2.jpg', label: 'Professional 💼' },
  // Add more as needed
]

// ─── STATIC INFO ──────────────────────────────────────────
export const personalInfo = {
  name: 'Andre Luckyta Firdaus',
  email: 'andreluckytafirdaus2001@gmail.com',
  phone: '+62 8517-4174-743 / +62 8111-1181-188',
  location: 'West Jakarta, Indonesia',
  availability: 'Open to Remote / Asia Web3 Roles',
  linkedin: 'https://www.linkedin.com/in/andre-luckyta-firdaus/',
  github: 'https://github.com/Luckywar123',
  twitter: 'https://x.com/Cautionwethere',
  telegram: 'https://t.me/Borntobearichman',
  cvFile: '/CV.pdf',
  passportReady: true,
  policeRecordClear: true,
  
}


export const education = {
  period: '2019 – 2023',
  degree: 'Bachelor of Computer Science',
  school: 'Universitas Padjadjaran',
  gpa: '3.28 / 4.00',
  thesis: '"Design and Development of Inventory Information System Website in Retail Company using Waterfall Method"',
}

export const certifications = [
  { icon: '📜', name: 'Professional Scrum Product Owner I (PSPO I)', sub: 'Scrum.org · March 2025' },
  { icon: '🇬🇧', name: 'IELTS IDP UKVI General Training', sub: 'Score 5.5 · 2023' },
  { icon: '💻', name: 'Java Back-End Bootcamp', sub: 'JuaraCoding · Oct 2023 – Jan 2024' },
]

export const leadership = [
  {
    period: 'November 2021',
    role: 'Staff Transportation & Logistics',
    org: 'Padjadjaran Competition on Social Project (PACES)',
    items: ['Led team of 10 staff for logistics and inventory management', 'Coordinated delivery, supply monitoring, and performance reporting'],
  },
  {
    period: 'February 2020',
    role: 'Master of Ceremony (MC)',
    org: 'Padjadjaran Roadshow to School',
    items: ['Led multiple school and university events', 'Managed audience engagement and technical operations'],
  },
]

export const web3Experience = [
  {
    icon: 'fa-solid fa-bear',
    title: 'Belly Bears Web3 Platform',
    period: '2026 – Present · Live Production',
    items: [
      'Full-stack development with React.js + Supabase',
      'WalletConnect + MetaMask integration',
      'Secure Treasury Wallet implementation & management',
      'Crypto payment gateway + Google Sheets live sync',
      'Real-time charts and AI Agent features',
    ],
  },
  {
    icon: 'fa-solid fa-robot',
    title: 'Python Forex Trading Bot + AI Agent',
    period: 'Nov 2025 – Present',
    items: [
      'Automated trading via Exness API',
      'Real-time market data processing',
      'Risk management & position sizing logic',
      'AI Agent for trade decision making',
    ],
  },
]

export const references = [
  {
    name: 'Nana Rusyana',
    title: 'TM Maintenance · PT Pertamina Hulu Rokan',
    phone: '+62 21-1512-7763',
  },
]
