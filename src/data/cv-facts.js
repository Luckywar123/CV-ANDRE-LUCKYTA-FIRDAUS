// src/data/cv-facts.js
// ============================================================
// FULL CV FACTS — transcribed from CV-Andre-Luckyta-Firdaus.pdf
// Single source for the chatbot (offline KB + Gemini context).
// Deliberately NOT included: phone numbers, date of birth, ID numbers,
// reference phone numbers (they stay in the PDF / contact button).
// ============================================================
export const cvFacts = {
  headline: 'System Engineer | IT & Software Development | Cross-Functional Team Leadership',
  location: 'West Jakarta, Indonesia',
  emails: ['andreluckytafirdaus2001@gmail.com', 'Andre.Luckyta.Firdaus@Protonmail.com'],
  site: 'cv-andre-luckyta.vercel.app',
  summary:
    'Computer Science graduate and System Engineer with hands-on experience across system integration, API/middleware development, monitoring & alerting infrastructure, and ETL pipelines in a regulated banking environment. Also experienced on the organizational side: streamlining workforce and supply chain processes through data (~15% operational efficiency gain), leading student teams, and coordinating large-scale events. Professional Scrum Product Owner I (PSPO I) certified.',

  jobs: [
    {
      id: 'bni', kind: 'IT & Software Engineering',
      title: 'System Engineer', org: 'PT Bank Negara Indonesia (BNI)', period: 'May 2026 – Present',
      keys: ['bni', 'bank negara', 'bank', 'banking', 'perbankan', 'system engineer', 'core banking', 'reconciliation', 'rekonsiliasi', 'l2', 'incident', 'monitoring', 'alerting', 'middleware', 'integrasi', 'integration'],
      points: [
        'Implemented monitoring dashboards and automated alerting pipelines, and ran ETL processes to keep data accurate and consistent across core banking systems.',
        'Developed and supported API integrations between internal banking platforms and third-party financial services.',
        'Supported QA testing of core banking applications and L2 incident handling, including reconciliation incidents.',
        'Alongside incident handling, took on overall system management responsibilities across the systems in scope.',
        'Produced technical documentation and collaborated with business stakeholders to translate data and system needs into technical requirements.',
      ],
    },
    {
      id: 'freelance-web', kind: 'IT & Software Engineering',
      title: 'Freelance Full-Stack Web Developer', org: 'Multiple clients (CV Cisarua, Jatrista Printing, CV Omega)', period: 'Sep – Dec 2025',
      keys: ['freelance', 'cisarua', 'jatrista', 'omega', 'company profile', 'next.js', 'nextjs', 'tailwind', 'seo', 'whatsapp api', 'google maps', 'deployment', 'katalog'],
      points: [
        'Built company-profile websites end-to-end (Next.js/React.js, Tailwind CSS), including data-driven service catalogs and interactive filtering tables.',
        'Handled deployment, SEO-optimized structure, and third-party integrations (WhatsApp API, Google Maps).',
      ],
    },
    {
      id: 'uiux', kind: 'IT & Software Engineering',
      title: 'UI/UX Designer — SMART RT/RW Application', org: 'Freelance', period: 'Jan – Feb 2024',
      keys: ['ui/ux', 'uiux', 'ui ux', 'ux', 'ui', 'design', 'desain', 'figma', 'adobe xd', 'smart rt', 'rt/rw', 'rt rw', 'prototype', 'prototipe'],
      points: [
        'Designed intuitive interfaces using Figma and Adobe XD, applying user-centered design principles to enhance community engagement.',
        'Used React.js to prototype interactive UI components and optimized user flows, contributing to a 15% increase in user satisfaction in testing feedback.',
      ],
    },
    {
      id: 'alf', kind: 'IT & Software Engineering',
      title: 'Program Engineer', org: 'Alf Tech Ventures', period: 'Jan 2024 – May 2024',
      keys: ['alf', 'alf tech', 'program engineer', 'lms', 'learning management', 'dbeaver'],
      points: [
        'Led a Learning Management System (LMS) web app project (JavaScript, React.js, SQL), translating client requirements into technical specifications.',
        'Maintained quality standards through routine testing (DBeaver, React.js) to ensure application reliability.',
      ],
    },
    {
      id: 'telkom', kind: 'IT & Software Engineering',
      title: 'Data Analyst (Internship)', org: 'PT Telekomunikasi Indonesia', period: 'Feb 2020 – Jun 2020',
      keys: ['telkom', 'telekomunikasi', 'data analyst', 'analis data', 'magang data', 'oracle', 'weka', 'colab'],
      points: [
        'Managed and analyzed data using Oracle and Weka to generate insights supporting business decision-making.',
        'Built interactive dashboards and reports using React.js and Google Colab to communicate complex findings to stakeholders.',
      ],
    },
    {
      id: 'trialfa', kind: 'Organizational, Workforce & Project Leadership',
      title: 'Cost Control & Business Planning – Data & Research', org: 'Tri Alfa Aurum Oil, Jakarta', period: 'Feb 2024 – Aug 2025',
      keys: ['tri alfa', 'trialfa', 'aurum', 'cost control', 'business planning', 'supply chain', 'workforce', 'sdm', 'efisiensi', 'efficiency', 'oil'],
      points: [
        'Streamlined supply chain and HR/workforce processes through data analysis, improving operational efficiency by ~15%, supporting a business generating ~IDR 30 million/day in revenue.',
        'Managed corporate databases (SQL, DBeaver) to extract data-driven insights supporting company strategy.',
      ],
    },
    {
      id: 'warehouse-pm', kind: 'Organizational, Workforce & Project Leadership',
      title: 'Project Management, Warehouse System', org: 'Freelance', period: 'Jul – Nov 2023',
      keys: ['warehouse', 'gudang', 'project management', 'project manager', 'manajemen proyek', 'scrum', 'agile', 'trello', 'timeline', 'cost estimation'],
      points: [
        'Managed warehouse system projects using Scrum and Agile methodologies, leveraging Trello for task tracking.',
        'Developed project timelines and used Google Colab for cost estimation and resource allocation analysis.',
      ],
    },
    {
      id: 'paces', kind: 'Organizational, Workforce & Project Leadership',
      title: 'Staff, Transportation & Logistics — PACES', org: 'Universitas Padjadjaran', period: 'Nov 2021',
      keys: ['paces', 'logistik', 'logistics', 'transportasi', 'transportation', 'panitia', 'staff'],
      points: ['Led a team of 10 staff, planning and supervising logistics of required goods, monitoring inventory, and coordinating delivery to ensure timely, efficient project execution.'],
    },
    {
      id: 'mipa', kind: 'Organizational, Workforce & Project Leadership',
      title: 'Staff, Transportation & Logistics — MIPA Awards 2020', org: 'BEM Kema FMIPA, Universitas Padjadjaran', period: '2020',
      keys: ['mipa', 'mipa awards', 'bem', 'kema fmipa', 'translog'],
      points: ['Served as logistics and transportation staff for the faculty-level MIPA Awards 2020 event.'],
    },
    {
      id: 'mc', kind: 'Organizational, Workforce & Project Leadership',
      title: 'Master of Ceremony — Padjadjaran Roadshow to School', org: 'Universitas Padjadjaran', period: 'Feb 2020',
      keys: ['mc', 'master of ceremony', 'roadshow', 'pembawa acara', 'public speaking', 'event'],
      points: ['Led event execution across multiple schools, maintaining audience engagement and handling technical or emergency issues on the spot.'],
    },
    {
      id: 'supraco', kind: 'Other Professional Experience',
      title: 'Field Engineer (Internship)', org: 'PT Supraco Indonesia (Pertamina Hulu Rokan)', period: 'Nov 2023 – Jan 2024',
      keys: ['supraco', 'pertamina', 'hulu rokan', 'phr', 'field engineer', 'rcfa', 'root cause', 'maintenance', 'perawatan', 'oil gas', 'migas', 'magang lapangan'],
      points: [
        'Applied root cause failure analysis (RCFA) and preventive maintenance procedures on rotating and fixed assets; used Google Colab for maintenance scheduling and data visualization.',
        'Recognized by site supervisors for strong collaboration, adaptability, and quick grasp of technical concepts, per internship completion reference.',
      ],
    },
  ],

  projects: [
    { id: 'p-trading-fellah', name: 'Trading Fellah', meta: 'Personal project — multi-tenant SaaS for MT5 trading bots', text: 'Multi-tenant SaaS platform for MT5 trading bots (code on GitHub).', keys: ['trading fellah', 'fellah', 'mt5', 'saas', 'trading bot', 'bot trading'] },
    { id: 'p-cat', name: 'CAT Preparation Web App', meta: 'Personal project — KDKMP managerial selection exams', text: 'Web app for practicing computer-assisted test (CAT) exams used in managerial selection.', keys: ['cat', 'kdkmp', 'computer assisted test', 'tryout', 'try out', 'ujian', 'seleksi'] },
    { id: 'p-face', name: 'Face Recognition Robot', meta: 'Universitas Padjadjaran (with Medical Faculty students), during bachelor studies', text: "Collaborated with a senior's thesis team and medical faculty students to build a robot with face recognition, applying Python for the recognition/detection logic.", keys: ['face recognition', 'robot', 'pengenalan wajah', 'computer vision', 'deteksi wajah'] },
    { id: 'p-algo', name: 'Algorithmic Trading Bot', meta: 'Personal project, during bachelor studies', text: 'Built a trading bot in Python to automate market data analysis and trade signal generation.', keys: ['algorithmic', 'algo trading', 'trading bot', 'bot trading', 'sinyal', 'signal'] },
    { id: 'p-ml', name: 'Data Mining & Machine Learning Coursework', meta: 'Universitas Padjadjaran, during bachelor studies', text: 'Applied Python for data mining and machine learning coursework, and object-oriented programming (OOP) projects.', keys: ['data mining', 'machine learning', 'ml', 'oop', 'kuliah data', 'mata kuliah'] },
  ],

  education: {
    degree: 'Bachelor of Computer Science (S.Kom.)', school: 'Universitas Padjadjaran, Bandung', period: '2019 – 2023', gpa: '3.28/4.00',
    thesis: 'Design and Development of an Inventory Information System Website for a Retail Company Using the Waterfall Method',
  },

  certifications: [
    { name: 'Professional Scrum Product Owner I (PSPO I)', by: 'Scrum.org', when: 'March 2025', keys: ['pspo', 'scrum', 'product owner', 'scrum.org'] },
    { name: 'IELTS (IDP, UKVI General Training) — Overall Band 5.5', by: 'IDP', when: 'February 2025', keys: ['ielts', 'idp', 'ukvi', 'bahasa inggris', 'english', 'toefl'] },
    { name: 'Java Back-End Bootcamp', by: 'JuaraCoding', when: 'Oct 2023 – Jan 2024', keys: ['juaracoding', 'juara coding', 'bootcamp', 'java back end', 'java backend', 'backend java'] },
    { name: 'Internship Completion Letter, Field Engineer', by: 'PT Supraco Indonesia / Pertamina Hulu Rokan', when: 'Jan 2024', keys: ['internship completion', 'surat magang'] },
    { name: 'Huawei – IT Del Tech Day Webinar: Social Engineering Crimes on Digital Platforms and How to Prevent Them', by: 'Huawei / IT Del', when: 'Mar 2021', keys: ['huawei', 'it del', 'social engineering', 'keamanan', 'security', 'cybersecurity'] },
    { name: 'Python Programming Language for Beginners (webinar)', by: 'Dewatalks', when: 'Apr 2021', keys: ['dewatalks', 'python beginner', 'python pemula'] },
    { name: 'HAITI (Hardskill for TI)', by: 'Himatif FMIPA Unpad', when: 'Participant', keys: ['haiti', 'hardskill', 'himatif'] },
  ],

  skills: [
    { group: 'Programming & Systems', items: ['Java', 'JavaScript', 'Python', 'React.js', 'SQL', 'System Integration', 'API Development'] },
    { group: 'Data & Analytics', items: ['Oracle', 'Weka', 'SQL', 'DBeaver', 'Google Colab', 'ETL', 'Dashboarding', 'Data Visualization'] },
    { group: 'Organization & People', items: ['Team Leadership', 'Workforce Process Improvement', 'Event Coordination', 'Stakeholder Communication'] },
    { group: 'Project & Business', items: ['Scrum', 'Agile', 'Waterfall', 'Product Ownership'] },
    { group: 'Languages', items: ['Indonesian (native)', 'English (IELTS Band 5.5 — conversational)'] },
  ],

  // Roles + companies only. Names and phone numbers stay in the CV's last page.
  references: [
    'Team Manager at PT Pertamina Hulu Rokan',
    'Team Leader at PT Bank Negara Indonesia',
    'HR at PT Telekomunikasi Indonesia',
    'Commissioner at PT Tri Alfa Aurum',
  ],
}
