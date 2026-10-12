// src/ai-fallback.js
// ============================================================
// Offline knowledge base — built from positions.js + proofs.js
// so the bot is always in sync with the CV (no duplicated facts).
// Pure functions only: also imported by api/chat.js on the server.
// ============================================================
import { positions, personalInfo, education, certifications, leadership } from './data/positions.js'
import { proofs } from './data/proofs.js'

const strip = (s = '') => String(s).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
const uniq = arr => [...new Set(arr)]

export function buildKnowledge() {
  const allTags = uniq(positions.flatMap(p => (p.skills || []).flatMap(s => s.tags)))
  const projectMap = new Map()
  positions.forEach(p => (p.projects || []).forEach(pr => {
    if (!projectMap.has(pr.title)) projectMap.set(pr.title, pr)
  }))
  const exp = positions.find(p => /system engineer/i.test(p.tabLabel))?.experience || []

  const entries = [
    {
      keys: ['siapa', 'who', 'andre', 'kenalan', 'tentang', 'about', 'profil', 'profile'],
      answer: `Andre Luckyta Firdaus — lulusan Informatika Universitas Padjadjaran, saat ini System Engineer di perbankan. Latar belakangnya mencakup full-stack/Web3, AI agent, data analytics, QA, dan project management (PSPO I).`,
    },
    {
      keys: ['role', 'posisi', 'spesialisasi', 'specialization', 'bidang', 'keahlian utama'],
      answer: `Role yang bisa dipilih di CV ini: ${positions.map(p => p.tabLabel).join(', ')}. Ganti lewat tab di navbar atau tombol panah ← →.`,
    },
    {
      keys: ['kuliah', 'pendidikan', 'education', 'universitas', 'kampus', 'ipk', 'gpa', 'lulus', 'degree', 'skripsi', 'thesis'],
      answer: `${education.degree}, ${education.school} (${education.period}), IPK ${education.gpa}. Skripsi: ${strip(education.thesis)}`,
    },
    {
      keys: ['sertifikat', 'certification', 'certificate', 'pspo', 'ielts', 'bootcamp', 'sertifikasi'],
      answer: `Sertifikasi: ${certifications.map(c => `${c.name} (${c.sub})`).join('; ')}.`,
    },
    {
      keys: ['skill', 'skills', 'tech', 'stack', 'teknologi', 'bisa apa', 'kemampuan', 'tools'],
      answer: `Beberapa skill dan tools: ${allTags.slice(0, 24).join(', ')}. Detail lengkap berbeda per role — coba ganti tab.`,
    },
    {
      keys: ['project', 'proyek', 'portfolio', 'portofolio', 'karya', 'bikin apa', 'pernah buat'],
      answer: `Proyek utama: ${[...projectMap.values()].slice(0, 6).map(p => `${p.title} — ${strip(p.desc)}`).join(' | ')}`,
    },
    {
      keys: ['pengalaman', 'experience', 'kerja', 'bni', 'bank', 'banking', 'perbankan', 'work history', 'karir', 'career'],
      answer: exp.length
        ? `Pengalaman perbankan: ${exp.map(e => `${strip(e.role)} @ ${strip(e.company)} (${e.period})`).join('; ')}.`
        : 'Lihat section Experience di CV ini.',
    },
    {
      keys: ['ai', 'agent', 'llm', 'machine learning', 'ml', 'bot', 'trading'],
      answer: `Di sisi AI: AI Agent untuk platform Web3 Belly Bears, Python Forex Trading Bot + AI Agent, dan Trading Fellah (SaaS bot MT5). Stack: Python, pandas, scikit-learn, Weka, integrasi LLM API.`,
    },
    {
      keys: ['kontak', 'contact', 'email', 'hubungi', 'linkedin', 'github', 'reach', 'hire', 'rekrut'],
      answer: `Kontak: ${personalInfo.email} · LinkedIn: ${personalInfo.linkedin} · GitHub: ${personalInfo.github}`,
    },
    {
      keys: ['available', 'tersedia', 'open to', 'freelance', 'lowongan', 'availability', 'remote'],
      answer: `Status: ${personalInfo.availability}. Untuk diskusi peluang, hubungi lewat email atau LinkedIn.`,
    },
    {
      keys: ['organisasi', 'leadership', 'kepemimpinan', 'volunteer', 'mc ', 'paces'],
      answer: `Kepemimpinan: ${leadership.map(l => `${l.role} — ${l.org} (${l.period})`).join('; ')}.`,
    },
    {
      keys: ['cv', 'resume', 'download', 'unduh'],
      answer: `CV bisa diunduh lewat tombol "CV" di navbar (file PDF).`,
    },
  ]

  proofs.forEach(pr => entries.push({
    keys: pr.match.map(m => m.toLowerCase()),
    answer: `${pr.label}: ${pr.highlights.join('; ')}.${pr.stack.length ? ` Stack: ${pr.stack.join(', ')}.` : ''}${pr.liveUrl ? ` Live: ${pr.liveUrl}` : ''}`,
  }))

  return entries
}

export function getFallbackAnswer(query) {
  const q = ` ${query.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ')} `
  let best = null, bestScore = 0
  for (const e of buildKnowledge()) {
    // whole-word / phrase match, longer keys weigh more
    const score = e.keys.reduce((n, k) => n + (q.includes(` ${k.trim()} `) ? k.length : 0), 0)
    if (score > bestScore) { best = e; bestScore = score }
  }
  return best
    ? best.answer
    : 'Aku belum punya jawaban pasti untuk itu. Coba tanya soal pendidikan, skill, proyek, pengalaman, atau kontak — atau hubungi Andre langsung lewat email.'
}

export function getSuggestedQuestions() {
  return ['Apa saja proyek Andre?', 'Latar belakang pendidikannya?', 'Skill apa yang dikuasai?', 'Bagaimana cara menghubungi?']
}

// Plain-text context handed to the LLM (grounding — it must not invent facts)
export function buildContextText() {
  return buildKnowledge().map(e => `- ${e.answer}`).join('\n')
}
