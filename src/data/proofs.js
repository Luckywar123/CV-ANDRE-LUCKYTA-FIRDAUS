// src/data/proofs.js
// ============================================================
// PORTFOLIO PROOFS — enrich project cards (matched by title keyword).
// Facts below come from the actual GitHub repos (READMEs + code).
// TODO fields (proofImage, metrics, result) are yours to fill —
// empty fields are simply not rendered.
// ============================================================
const GH = 'https://github.com/Luckywar123/'

export const proofs = [
  {
    match: ['Belly Bears Web3', 'Belly Bears Platform'],
    label: 'Belly Bears Web3 Platform',
    liveUrl: 'https://bellybears.xyz',
    repoUrl: GH + 'BellyBears-Website',
    proofImage: '',                       // TODO: '/images/proof-bellybears.png'
    stack: ['HTML/CSS/JS', 'Supabase', 'WalletConnect', 'MetaMask', 'Google Sheets API'],
    metrics: [],
    highlights: [
      'Public website with whitelist tasks, mint info, Belly Pass and roadmap',
      'Treasury wallet implementation & management',
      'Crypto payment gateway + Google Sheets live sync',
    ],
    caseStudy: { problem: '', solution: '', result: '' },
  },
  {
    match: ['Belly Bears AI Agent'],
    label: 'Belly Bears AI Agent',
    liveUrl: 'https://bellybears.xyz',
    repoUrl: GH + 'BellyBears-Website',
    proofImage: '',
    stack: ['JavaScript', 'Intent / keyword matching', 'Supabase'],
    metrics: [],
    highlights: [
      'BellyBot: bear-themed community assistant (whitelist, mint, Belly Pass, roadmap answers)',
      'Runs fully client-side — zero API cost',
      'Real-time treasury analytics and recommendation logic',
    ],
    caseStudy: { problem: '', solution: '', result: '' },
  },
  {
    match: ['Belly Bears Game', 'Belly Bears Telegram'],
    label: 'Belly Bears Telegram Game (TON)',
    liveUrl: '',
    repoUrl: GH + 'Belly-Bears-Ton',
    proofImage: '',
    stack: ['JavaScript', 'TON Connect', 'Supabase', 'HTML/CSS'],
    metrics: [],
    highlights: [
      'TON wallet connect gate before entering the game',
      'Player dashboard backed by Supabase',
      'Feeds the community whitelist campaign (Top 100 daily)',
    ],
    caseStudy: { problem: '', solution: '', result: '' },
  },
  {
    match: ['Forex Trading Bot', 'Forex Bot'],
    label: 'Python Forex Trading Bot + AI Agent',
    liveUrl: '',
    repoUrl: '',
    proofImage: '',
    stack: ['Python', 'Exness API', 'pandas', 'TA-Lib', 'AI Agent'],
    metrics: [],
    highlights: [
      'Real-time market data processing',
      'Risk management & position sizing logic',
      'AI Agent for trade decision making',
    ],
    caseStudy: { problem: '', solution: '', result: '' },
  },
  {
    match: ['Trading Fellah'],
    label: 'Trading Fellah — MT5 Trading Bot SaaS',
    liveUrl: '',
    repoUrl: GH + 'Trading-Fellah',
    proofImage: '',
    stack: ['FastAPI', 'Python', 'React + Vite', 'Tailwind', 'Supabase', 'MetaApi', 'NOWPayments', 'Anthropic / OpenAI'],
    metrics: ['6-layer live auto-trade safeguards', 'Circuit breaker: 5 losses / 20% drawdown'],
    highlights: [
      'Wallet (SIWE-style) login + crypto-paid membership',
      'AI agent: news sentiment, trade rationale, trading-behavior profiling (pluggable LLM provider)',
      'Swing / order block / support-resistance detection, backtest engine, forward test',
      'Opt-in live auto-trade with kill switch and news blackout',
    ],
    caseStudy: {
      problem: 'Running MT5 automation for many users is hard: the official MT5 Python library only runs on Windows with a single active connection.',
      solution: 'A multi-tenant web platform: MetaApi as the MT5 bridge, FastAPI backend with a risk engine and AI agent, React dashboard, and Supabase for data.',
      result: '',
    },
  },
  {
    match: ['RekaLOKA FAQ Chatbot'],
    label: 'RekaLOKA FAQ Chatbot (Semantic Search)',
    liveUrl: '',
    repoUrl: GH + 'RekaLOKA',
    proofImage: '',
    stack: ['Python', 'scikit-learn (TF-IDF)', 'sentence-transformers', 'JavaScript'],
    metrics: [],
    highlights: [
      'Instant client-side FAQ chatbot (intent + keyword matching)',
      'Optional Python API that learns from a FAQ dataset (semantic search with TF-IDF fallback)',
    ],
    caseStudy: {
      problem: 'A static Vercel site cannot run Python AI libraries, but still needs a helpful assistant.',
      solution: 'Two layers: a free JS chatbot that is live immediately, plus an optional Python semantic-search API that can be hosted separately.',
      result: '',
    },
  },
  {
    match: ['RekaLOKA'],
    label: 'RekaLOKA Company Profile',
    liveUrl: '',
    repoUrl: GH + 'RekaLOKA',
    proofImage: '',
    stack: ['HTML5', 'CSS', 'Vanilla JS', 'Supabase', 'Vercel'],
    metrics: [],
    highlights: [
      'Modular company-profile site with scroll-reveal animation',
      'Supabase-backed partnership form and reviews',
      'Floating FAQ chatbot, prefers-reduced-motion support',
    ],
    caseStudy: { problem: '', solution: '', result: '' },
  },
  {
    match: ['KDKMP'],
    label: 'KDKMP CAT Exam Module',
    liveUrl: '',
    repoUrl: GH + 'KDMPModule',
    proofImage: '',
    stack: ['Vanilla JS', 'HTML/CSS'],
    metrics: [],
    highlights: [
      'Computer-assisted test (CAT) practice for the KDKMP Agrinas manager selection',
      'Large question bank split by subtest (incl. TIU and Bahasa Indonesia)',
      'Access-code gated modules',
    ],
    caseStudy: { problem: '', solution: '', result: '' },
  },
  {
    match: ['Sinar Prestasi'],
    label: 'Sinar Prestasi Online Exam System',
    liveUrl: '',
    repoUrl: GH + 'Sinar-Prestasi',
    proofImage: '',
    stack: ['Laravel', 'PHP', 'Chart.js', 'Webpack Mix'],
    metrics: [],
    highlights: [
      'Role-based access: admin, teacher (guru) and student (siswa)',
      'Question bank with sub-categories, exams, answers and exam tokens',
      'Teacher/admin management of users and questions',
    ],
    caseStudy: { problem: '', solution: '', result: '' },
  },
]

// Longest matching keyword wins, so specific titles beat generic ones.
export function findProof(title = '') {
  const t = title.toLowerCase()
  let best = null, bestLen = 0
  for (const p of proofs) {
    for (const m of p.match) {
      if (t.includes(m.toLowerCase()) && m.length > bestLen) { best = p; bestLen = m.length }
    }
  }
  return best
}
