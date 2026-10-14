// src/ai-fallback.js
// ============================================================
// Offline brain for the CV assistant.
//  1) Intent matching   — greetings, small talk, contact, education, jobs, certs...
//  2) Typo tolerance    — "pendidkan", "kontak" etc. still match
//  3) Corpus search     — any other question is matched against every CV chunk
//  4) Context builder   — the same facts are handed to Gemini (api/chat.js)
// Everything is derived from data files, so it never drifts from the CV.
// Pure functions only: also imported by api/chat.js on the server.
// ============================================================
import { positions, personalInfo } from './data/positions.js'
import { proofs } from './data/proofs.js'
import { cvFacts as C } from './data/cv-facts.js'

// ─── text helpers ─────────────────────────────────────────
const norm = s => String(s).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9+#./\s]/g, ' ').replace(/\b([a-z]{4,})nya\b/g, '$1').replace(/\s+/g, ' ').trim()
const strip = (s = '') => String(s).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
const uniq = a => [...new Set(a)]
const pick = a => a[Math.floor(Math.random() * a.length)]

function lev(a, b) {
  if (Math.abs(a.length - b.length) > 1) return 2
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)])
  for (let j = 1; j <= b.length; j++) dp[0][j] = j
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
  return dp[a.length][b.length]
}

const EN_HINT = /\b(what|who|how|where|when|why|which|do|does|did|can|could|are|is|your|you|tell|about|have|has|experience|skills?|contact|work|worked|hire|available|please|hello|hi|thanks|thank)\b/g
const ID_HINT = /\b(apa|siapa|bagaimana|gimana|dimana|kapan|kenapa|yang|kamu|anda|dia|andre|bisa|tolong|ada|pernah|berapa|dong|sih|nih|halo|makasih|terima|kasih|pengalaman|kerja)\b/g
function detectLang(q) {
  const n = norm(q)
  const en = (n.match(EN_HINT) || []).length, id = (n.match(ID_HINT) || []).length
  return en > id ? 'en' : 'id'
}

const STOP = new Set(('yang dan di ke dari untuk dengan atau ini itu adalah apa siapa bagaimana gimana kamu anda dia andre pernah bisa ada tolong dong sih nih ya the a an of in on for to with is are was were do does did you your his her he she it and or what who how can about me tell please have has').split(' '))

// ─── chunks: every fact, one searchable record each ───────
function buildChunks() {
  const out = []
  const add = (id, title, text) => out.push({ id, title, text: strip(text), n: norm(title + ' ' + text) })
  add('summary', 'Summary', `${C.headline}. ${C.summary}`)
  C.jobs.forEach(j => add(j.id, `${j.title} — ${j.org} (${j.period})`, j.points.join(' ')))
  C.projects.forEach(p => add(p.id, `${p.name} — ${p.meta}`, p.text))
  proofs.forEach(p => add('proof-' + p.label, p.label, `${p.highlights.join('; ')}. Stack: ${p.stack.join(', ')}.${p.repoUrl ? ' Repo: ' + p.repoUrl : ''}${p.liveUrl ? ' Live: ' + p.liveUrl : ''}`))
  const seen = new Set()
  positions.forEach(pos => (pos.projects || []).forEach(pr => {
    if (seen.has(pr.title)) return
    seen.add(pr.title); add('pos-' + pr.title, pr.title, `${strip(pr.desc)} (${strip(pr.period)})`)
  }))
  add('education', 'Education', `${C.education.degree}, ${C.education.school}, ${C.education.period}, GPA ${C.education.gpa}. Thesis: ${C.education.thesis}.`)
  C.certifications.forEach(c => add('cert-' + c.name, c.name, `${c.by}, ${c.when}`))
  C.skills.forEach(s => add('skill-' + s.group, 'Skills: ' + s.group, s.items.join(', ')))
  add('skills-web3', 'Skills: Web3, AI & tools', uniq(positions.flatMap(p => (p.skills || []).flatMap(s => s.tags))).join(', '))
  return out
}

// ─── intents ──────────────────────────────────────────────
const jobLine = j => `${j.title} — ${j.org} (${j.period})`
const bullets = a => a.map(x => '• ' + x).join('\n')
const li = (id, en) => ({ id, en })

function buildIntents() {
  const tabs = positions.map(p => p.tabLabel).join(', ')
  const bni = C.jobs[0]
  const tags = uniq(positions.flatMap(p => (p.skills || []).flatMap(s => s.tags))).slice(0, 28).join(', ')
  const I = []
  const add = (id, keys, ans, o = {}) => I.push({ id, keys: keys.map(norm), ans: typeof ans === 'string' ? li(ans) : ans, ...o })

  // —— small talk ——
  add('greet', ['halo', 'hai', 'hi', 'hello', 'hallo', 'helo', 'hey', 'permisi', 'selamat pagi', 'selamat siang', 'selamat sore', 'selamat malam', 'good morning', 'good afternoon', 'good evening', 'assalamualaikum', 'assalamu alaikum', 'salam', 'met pagi', 'met siang', 'met sore', 'met malam', 'yo', 'p', 'test', 'tes'],
    null, { smalltalk: true, maxTokens: 6 })
  add('how-are-you', ['apa kabar', 'gimana kabar', 'how are you', 'kabar baik', 'lagi apa', 'how are u', 'whats up', 'sup'],
    li('Baik banget, makasih udah nanya! 😄 Aku siap bantu jawab soal Andre — pengalaman, skill, proyek, atau kontaknya. Mau tahu apa?', "Doing great, thanks for asking! 😄 Ask me anything about Andre — experience, skills, projects or how to reach him."), { smalltalk: true, maxTokens: 8 })
  add('thanks', ['makasih', 'terima kasih', 'thanks', 'thank you', 'thx', 'tengkyu', 'trims', 'suwun', 'nuhun', 'matur nuwun', 'makasi', 'tks', 'mantap'],
    li('Sama-sama! 🙌 Kalau ada yang mau ditanyain lagi soal Andre, langsung aja ya.', "You're welcome! 🙌 Ask away if there's anything else about Andre."), { smalltalk: true, maxTokens: 6 })
  add('bye', ['dadah', 'bye', 'sampai jumpa', 'sampai ketemu', 'see you', 'goodbye', 'dah', 'pamit', 'good night', 'selamat tinggal'],
    li('Dadah! 👋 Makasih udah mampir. Kalau tertarik ngobrol lebih jauh, hubungi Andre lewat tombol "Get in Touch" ya.', 'Bye! 👋 Thanks for stopping by. If you want to talk further, use the "Get in Touch" button.'), { smalltalk: true, maxTokens: 6 })
  add('who-are-you', ['kamu siapa', 'siapa kamu', 'anda siapa', 'who are you', 'kamu bot', 'kamu ai', 'kamu manusia', 'are you a bot', 'are you ai', 'are you human', 'nama kamu', 'namamu', 'your name', 'kamu andre', 'are you andre'],
    li('Aku asisten virtual di CV ini — bukan Andre-nya langsung. 🤖 Tugasku bantu jawab soal profil, pengalaman, skill, proyek, dan cara menghubungi Andre. Kalau lagi online, aku ditenagai Gemini; kalau offline, aku jawab dari data CV-nya.', "I'm the virtual assistant on this CV — not Andre himself. 🤖 I answer questions about his profile, experience, skills, projects and contact details. When online I run on Gemini; offline I answer from his CV data."), { smalltalk: true })
  add('help', ['bantu', 'bantuan', 'help', 'menu', 'bisa apa', 'kamu bisa', 'apa yang bisa', 'what can you do', 'fitur', 'cara pakai', 'how to use', 'panduan'],
    li('Aku bisa jawab soal:\n• Profil & pekerjaan sekarang\n• Pengalaman kerja & organisasi\n• Proyek (Web3, AI agent, trading bot, dll.)\n• Skill, pendidikan, IPK, sertifikat\n• Kontak & ketersediaan\n\nTips: ganti role lewat tab di atas (atau tombol ← →), klik foto untuk lihat foto berikutnya, dan ada musik lofi di kiri bawah 🎵', 'I can answer about:\n• Profile & current job\n• Work & leadership experience\n• Projects (Web3, AI agents, trading bots…)\n• Skills, education, GPA, certifications\n• Contact & availability\n\nTip: switch roles with the tabs on top (or ← →), click the photo to reveal the next one, and there is lofi music at the bottom-left 🎵'), { smalltalk: true })
  add('compliment', ['keren', 'bagus', 'hebat', 'kece', 'good job', 'nice', 'wow', 'mantul', 'cakep', 'amazing', 'awesome', 'impressive'],
    li('Wah, makasih! 😊 Nanti kusampaikan ke Andre. Mau tahu lebih banyak soal proyek atau pengalamannya?', 'Thank you! 😊 Want to dig deeper into his projects or experience?'), { smalltalk: true, maxTokens: 6 })
  add('laugh', ['haha', 'wkwk', 'wkwkwk', 'hehe', 'lol', 'ok', 'oke', 'okay', 'siap', 'sip', 'baik', 'noted', 'hmm', 'oh'],
    li('Siap! 😄 Ada lagi yang mau ditanyain soal Andre?', 'Got it! 😄 Anything else about Andre?'), { smalltalk: true, maxTokens: 3 })
  add('joke', ['lawak', 'jokes', 'joke', 'bercanda', 'receh', 'hibur'],
    li(pick(['Kenapa programmer susah tidur? Karena lagi nge-debug mimpi. 😴 …Yuk balik ke topik: mau tahu proyek Andre?', 'Bug itu bukan error, itu fitur yang belum diumumkan. 🐛 Mau lanjut tanya soal Andre?']), 'Why do programmers prefer dark mode? Because light attracts bugs. 🐛 Back to Andre — want to hear about his projects?'), { smalltalk: true })

  // —— profile ——
  add('about', ['siapa andre', 'who is andre', 'tentang andre', 'about andre', 'kenalan', 'perkenalkan', 'introduce', 'profil', 'profile', 'ceritakan', 'cerita tentang'],
    li(`Andre Luckyta Firdaus — ${C.headline}. Lulusan S.Kom Universitas Padjadjaran, saat ini System Engineer di BNI. ${C.summary}`, `Andre Luckyta Firdaus — ${C.headline}. ${C.summary}`), { weight: 1.2 })
  add('current-job', ['kerja dimana', 'kerja di mana', 'sekarang kerja', 'pekerjaan sekarang', 'current job', 'current role', 'where do you work', 'where does andre work', 'saat ini', 'bekerja dimana', 'kantor', 'employer'],
    li(`Saat ini Andre System Engineer di PT Bank Negara Indonesia (BNI), sejak May 2026.\n${bullets(bni.points)}`, `Andre is currently a System Engineer at PT Bank Negara Indonesia (BNI), since May 2026.\n${bullets(bni.points)}`), { weight: 1.2 })
  add('work-history', ['pengalaman kerja', 'riwayat kerja', 'work history', 'experience', 'pengalaman', 'karir', 'career', 'kerja apa saja', 'jobs', 'timeline'],
    li(`Perjalanan kerja Andre:\n${bullets(C.jobs.map(jobLine))}\n\nTanya salah satu peran untuk detailnya!`, `Andre's career:\n${bullets(C.jobs.map(jobLine))}\n\nAsk about any role for details!`))
  add('years', ['berapa lama', 'lama pengalaman', 'years of experience', 'tahun pengalaman', 'how long', 'berapa tahun'],
    li('Pengalaman Andre dimulai dari magang Data Analyst di Telkom (2020), lalu proyek & peran profesional sejak 2023 (project management, Program Engineer, Field Engineer, Tri Alfa, freelance web developer) dan kini System Engineer di BNI sejak May 2026.', "Andre's path: Data Analyst internship at Telkom (2020), then professional roles since 2023 (project management, Program Engineer, Field Engineer, Tri Alfa, freelance web developer) and System Engineer at BNI since May 2026."))
  C.jobs.forEach(j => add('job-' + j.id, j.keys, li(`${jobLine(j)}\n${bullets(j.points)}`), { weight: j.id === 'bni' ? 1 : 1.1 }))

  // —— projects ——
  const projNames = uniq([...C.projects.map(p => p.name), ...proofs.map(p => p.label), ...positions.flatMap(p => (p.projects || []).map(x => x.title))])
  add('projects', ['project', 'projects', 'proyek', 'portfolio', 'portofolio', 'karya', 'bikin apa', 'pernah buat', 'pernah bikin', 'aplikasi apa', 'apa saja proyek'],
    li(`Proyek & karya Andre:\n${bullets(projNames.slice(0, 14))}\n\nSebut salah satu nama proyek untuk detail, link GitHub, dan stack-nya.`, `Andre's projects:\n${bullets(projNames.slice(0, 14))}\n\nName any project for details, GitHub link and stack.`), { weight: 1.2 })
  proofs.forEach(p => add('proof-' + p.label, p.match, li(`${p.label}\n${bullets(p.highlights)}\nStack: ${p.stack.join(', ')}.${p.repoUrl ? '\nKode: ' + p.repoUrl : ''}${p.liveUrl ? '\nLive: ' + p.liveUrl : ''}`), { weight: 2 }))
  C.projects.forEach(p => add(p.id, p.keys, li(`${p.name} — ${p.meta}\n${p.text}`), { weight: 1.1 }))
  add('web3', ['web3', 'web 3', 'blockchain', 'crypto', 'kripto', 'nft', 'wallet', 'ton', 'belly bears', 'bellybears', 'treasury', 'metamask', 'walletconnect'],
    li('Di sisi Web3, Andre mengerjakan platform Belly Bears (website, treasury wallet & dashboard, payment gateway kripto, game Telegram di TON, plus AI agent) — lihat tab "Full-Stack Web3". Link: https://bellybears.xyz', 'On the Web3 side Andre built the Belly Bears platform (website, treasury wallet & dashboard, crypto payment gateway, a Telegram game on TON, plus an AI agent) — see the "Full-Stack Web3" tab. Link: https://bellybears.xyz'), { weight: 1.2 })
  add('ai', ['ai', 'agent', 'ai agent', 'llm', 'gemini', 'chatbot', 'bot ai', 'artificial intelligence', 'ai engineer', 'kecerdasan buatan'],
    li('Di AI, Andre membangun: AI Agent untuk platform Belly Bears, Python Forex Trading Bot + AI Agent, Trading Fellah (SaaS bot MT5 dengan AI agent: news sentiment, trade rationale, behavior profiling), dan FAQ chatbot semantic search untuk RekaLOKA. Lihat tab "AI Engineer".', 'In AI, Andre built: an AI Agent for the Belly Bears platform, a Python Forex Trading Bot + AI Agent, Trading Fellah (MT5 bot SaaS with an AI agent: news sentiment, trade rationale, behavior profiling) and a semantic-search FAQ chatbot for RekaLOKA. See the "AI Engineer" tab.'), { weight: 1.2 })

  // —— education, certs, skills ——
  const e = C.education
  add('education', ['kuliah', 'pendidikan', 'education', 'universitas', 'kampus', 'unpad', 'padjadjaran', 'jurusan', 'degree', 'skripsi', 'thesis', 'lulusan', 'sarjana', 'alma mater', 'kuliah dimana', 'study', 'studied', 'university'],
    li(`${e.degree}, ${e.school} (${e.period}), IPK ${e.gpa}.\nSkripsi: ${e.thesis}.`, `${e.degree}, ${e.school} (${e.period}), GPA ${e.gpa}.\nThesis: ${e.thesis}.`), { weight: 1.2 })
  add('gpa', ['ipk', 'gpa', 'nilai', 'cum laude', 'indeks prestasi'],
    li(`IPK Andre ${e.gpa} (S.Kom, Universitas Padjadjaran, ${e.period}).`, `Andre's GPA is ${e.gpa} (Universitas Padjadjaran, ${e.period}).`), { weight: 1.5 })
  add('certs', ['sertifikat', 'certification', 'certifications', 'certificate', 'sertifikasi', 'training', 'pelatihan', 'kursus', 'course'],
    li(`Sertifikasi & pelatihan:\n${bullets(C.certifications.map(c => `${c.name} — ${c.by}, ${c.when}`))}`, `Certifications & training:\n${bullets(C.certifications.map(c => `${c.name} — ${c.by}, ${c.when}`))}`), { weight: 1.2 })
  C.certifications.forEach(c => add('cert-' + c.name, c.keys, li(`${c.name} — ${c.by}, ${c.when}.`), { weight: 1.4 }))
  add('skills', ['skill', 'skills', 'kemampuan', 'keahlian', 'tech stack', 'stack', 'teknologi', 'technology', 'bisa apa saja', 'tools', 'keterampilan', 'kompetensi'],
    li(`Skill Andre:\n${bullets(C.skills.map(s => `${s.group}: ${s.items.join(', ')}`))}\n\nTambahan dari proyek: ${tags}.`, `Andre's skills:\n${bullets(C.skills.map(s => `${s.group}: ${s.items.join(', ')}`))}\n\nFrom projects: ${tags}.`), { weight: 1.2 })
  add('languages', ['bahasa', 'languages', 'bahasa inggris', 'english', 'bahasa apa', 'speak', 'berbahasa', 'bilingual'],
    li('Bahasa Indonesia (native) dan English (IELTS Band 5.5, level conversational).', 'Indonesian (native) and English (IELTS Band 5.5 — conversational).'))
  add('roles', ['role', 'roles', 'posisi', 'spesialisasi', 'specialization', 'bidang', 'peran', 'tab'],
    li(`Role yang bisa dilihat di CV ini: ${tabs}. Ganti lewat tab di atas atau tombol ← →.`, `Roles on this CV: ${tabs}. Switch with the tabs on top or the ← → keys.`))
  add('leadership', ['organisasi', 'leadership', 'kepemimpinan', 'volunteer', 'kepanitiaan', 'memimpin', 'leader', 'tim', 'team'],
    li(`Kepemimpinan & organisasi:\n${bullets(C.jobs.filter(j => ['paces', 'mipa', 'mc', 'trialfa', 'warehouse-pm'].includes(j.id)).map(jobLine))}`, `Leadership & organizations:\n${bullets(C.jobs.filter(j => ['paces', 'mipa', 'mc', 'trialfa', 'warehouse-pm'].includes(j.id)).map(jobLine))}`))
  add('strengths', ['kelebihan', 'kekuatan', 'strength', 'strengths', 'why hire', 'kenapa harus', 'keunggulan', 'nilai jual', 'alasan merekrut', 'kenapa andre'],
    li('Nilai jual Andre: (1) pengalaman di lingkungan perbankan yang ketat — integrasi API, monitoring, ETL, QA & L2 incident; (2) bisa full-stack end-to-end (React/Next.js, Supabase, Web3); (3) membangun AI agent & bot otomatis sampai production; (4) latar project management (PSPO I, Scrum/Agile) dan kepemimpinan tim.', "Andre's strengths: (1) experience in a strictly regulated banking environment — API integration, monitoring, ETL, QA & L2 incidents; (2) end-to-end full-stack (React/Next.js, Supabase, Web3); (3) AI agents & automation shipped to production; (4) project management background (PSPO I, Scrum/Agile) and team leadership."))
  add('weakness', ['kekurangan', 'weakness', 'kelemahan', 'weaknesses'],
    li('Soal itu belum tercantum di data CV-nya, dan paling jujur kalau Andre sendiri yang jawab. Bisa ditanyakan langsung lewat kontak ya.', "That isn't in his CV data, and it's best answered by Andre himself — feel free to ask him directly."))

  // —— contact & logistics ——
  add('contact', ['kontak', 'contact', 'email', 'hubungi', 'linkedin', 'github', 'telegram', 'reach', 'dm', 'surel', 'menghubungi', 'cara kontak', 'get in touch', 'whatsapp', 'wa', 'telepon', 'nomor'],
    li(`Cara menghubungi Andre:\n• Email: ${C.emails[0]} atau ${C.emails[1]}\n• LinkedIn: ${personalInfo.linkedin}\n• GitHub: ${personalInfo.github}\n• Telegram: ${personalInfo.telegram}\nAtau pakai tombol "Get in Touch" di atas. Nomor telepon ada di CV (PDF).`, `Ways to reach Andre:\n• Email: ${C.emails[0]} or ${C.emails[1]}\n• LinkedIn: ${personalInfo.linkedin}\n• GitHub: ${personalInfo.github}\n• Telegram: ${personalInfo.telegram}\nOr use the "Get in Touch" button above. His phone number is in the CV PDF.`), { weight: 1.3 })
  add('availability', ['available', 'tersedia', 'open to', 'lowongan', 'hire', 'rekrut', 'join', 'kerja sama', 'kolaborasi', 'freelance', 'remote', 'relokasi', 'relocate', 'notice period', 'kapan bisa mulai', 'start date', 'open to work', 'cari kerja', 'wfo', 'hybrid'],
    li(`Status: ${personalInfo.availability}. Saat ini Andre bekerja sebagai System Engineer di BNI, jadi soal waktu mulai, relokasi, atau kerja sama sebaiknya didiskusikan langsung lewat email/LinkedIn.`, `Status: ${personalInfo.availability}. He currently works as a System Engineer at BNI, so start dates, relocation or collaboration are best discussed directly via email/LinkedIn.`), { weight: 1.3 })
  add('location', ['domisili', 'tinggal dimana', 'lokasi', 'location', 'berdomisili', 'where do you live', 'where is andre based', 'based in', 'kota', 'located', 'asal'],
    li(`Andre berdomisili di ${C.location}.`, `Andre is based in ${C.location}.`), { weight: 1.3 })
  add('salary', ['gaji', 'salary', 'expected salary', 'ekspektasi gaji', 'rate', 'tarif', 'harga jasa', 'budget', 'bayaran', 'ekspektasi'],
    li('Soal gaji atau tarif belum dicantumkan di CV — itu didiskusikan langsung dengan Andre sesuai scope dan peran. Hubungi lewat email/LinkedIn ya.', 'Salary/rates are not listed on the CV — they are discussed directly with Andre depending on scope and role. Please reach out by email/LinkedIn.'), { weight: 1.3 })
  add('references', ['referensi', 'reference', 'references', 'rekomendasi', 'atasan', 'recommendation', 'referee'],
    li(`Referensi tersedia dari:\n${bullets(C.references)}\nNama dan kontaknya ada di halaman terakhir CV (PDF).`, `References available from:\n${bullets(C.references)}\nNames and contacts are on the last page of the CV PDF.`))
  add('cv-file', ['cv', 'resume', 'download', 'unduh', 'pdf', 'unduh cv', 'download cv', 'curriculum vitae'],
    li('CV bisa diunduh lewat tombol "CV" di navbar atas (format PDF).', 'You can download the CV with the "CV" button in the top navbar (PDF).'), { weight: 1.2 })
  add('private', ['umur', 'usia', 'ulang tahun', 'tanggal lahir', 'age', 'birthday', 'agama', 'religion', 'menikah', 'status pernikahan', 'pacar', 'istri', 'married', 'single', 'alamat rumah', 'nik', 'ktp', 'nomor paspor', 'kehidupan pribadi', 'gender', 'suku'],
    li('Data pribadi seperti itu sengaja nggak dicantumkan di CV, jadi aku nggak bisa jawab. 🙏 Yang bisa kubantu: pengalaman, skill, proyek, pendidikan, dan kontak.', "That kind of personal detail isn't listed on the CV on purpose, so I can't answer it. 🙏 I can help with experience, skills, projects, education and contact."), { weight: 1.5 })

  // —— site meta ——
  add('site', ['website ini', 'situs ini', 'cv ini', 'portfolio ini', 'dibuat pakai', 'dibangun', 'built with', 'vite', 'gsap', 'this website', 'this site', 'source code website'],
    li('Website CV ini dibangun Andre dengan Vite + JavaScript, animasi GSAP, efek tilt/lens/sparkle sendiri, di-deploy di Vercel. Chatbot ini jalan lewat endpoint serverless dengan Gemini, dan fallback offline dari data CV. Kodenya ada di GitHub: ' + personalInfo.github, "This CV site is built by Andre with Vite + JavaScript, GSAP animations and custom tilt/lens/sparkle effects, deployed on Vercel. This chatbot runs through a serverless endpoint with Gemini, with an offline fallback from the CV data. Code: " + personalInfo.github))
  add('music', ['musik', 'music', 'lagu', 'lofi', 'suara', 'audio', 'backsound', 'bgm', 'putar lagu'],
    li('Ada pemutar musik lofi di pojok kiri bawah 🎵 — klik tombolnya untuk play/pause (browser butuh klik dulu sebelum bunyi) dan geser slider untuk volume.', 'There is a lofi music player at the bottom-left 🎵 — click it to play/pause (browsers need a click first) and use the slider for volume.'))
  add('offtopic', ['cuaca', 'weather', 'resep', 'berita', 'news', 'harga bitcoin', 'matematika', 'pr sekolah', 'terjemahkan', 'translate', 'buatkan kode', 'write code', 'tulis kode', 'bikinin kode', 'cerita horor', 'ramalan', 'zodiak', 'politik'],
    li('Hehe, itu di luar jangkauanku — aku khusus asisten CV Andre. 😅 Coba tanya soal pengalaman, proyek, skill, pendidikan, atau kontaknya!', "That's outside my scope — I'm Andre's CV assistant only. 😅 Try asking about his experience, projects, skills, education or contact!"), { weight: 1.1 })
  return I
}

// ─── scoring ──────────────────────────────────────────────
let _I, _CH, _DF
const ensure = () => {
  if (_I) return
  _I = buildIntents(); _CH = buildChunks(); _DF = {}
  _CH.forEach(c => new Set(c.n.split(' ')).forEach(t => { _DF[t] = (_DF[t] || 0) + 1 }))
}

function scoreIntent(it, qn, toks) {
  if (!it.keys) return 0
  const padded = ` ${qn} `
  let s = 0
  for (const k of it.keys) {
    if (padded.includes(` ${k} `)) { s += (k.split(' ').length * 3 + Math.min(k.length, 12) / 6) }
    else if (k.length >= 5 && !k.includes(' ')) { if (toks.some(t => t.length >= 4 && lev(t, k) === 1 && !_CH.some(c => c.n.includes(t)))) s += 3.2 }
  }
  return s * (it.weight || 1)
}

function greeting(qn, lang) {
  if (/assalamu\s?alaikum/.test(qn) || /\bassalamualaikum\b/.test(qn)) return "Wa'alaikumsalam warahmatullahi wabarakatuh 🙏 Aku asisten CV-nya Andre. Mau tahu soal apa?"
  const t = [['selamat pagi', 'pagi'], ['selamat siang', 'siang'], ['selamat sore', 'sore'], ['selamat malam', 'malam']].find(([k, w]) => qn.includes(k) || qn.includes('met ' + w))
  const en = [['good morning', 'Good morning'], ['good afternoon', 'Good afternoon'], ['good evening', 'Good evening']].find(([k]) => qn.includes(k))
  if (lang === 'en' || en) return `${en ? en[1] : 'Hello'}! 👋 I'm the assistant on Andre's CV. Ask me about his experience, skills, projects or how to contact him.`
  return `${t ? 'Selamat ' + t[1] : 'Halo'}! 👋 Aku asisten CV-nya Andre. Tanya apa aja — pengalaman, skill, proyek, pendidikan, atau cara menghubunginya.`
}

function corpusSearch(toks) {
  const q = toks.filter(t => t.length >= 3 && !STOP.has(t))
  if (!q.length) return []
  const res = []
  for (const c of _CH) {
    let s = 0
    for (const t of q) if (c.n.includes(t)) s += 1 + 2 / (1 + (_DF[t] || 1))
    if (s >= 1) res.push({ c, s })
  }
  return res.sort((a, b) => b.s - a.s).slice(0, 3).map(x => x.c)
}

export function getFallbackAnswer(query) {
  ensure()
  const lang = detectLang(query), qn = norm(query), toks = qn.split(' ').filter(Boolean)
  const L = it => it.ans[lang] || it.ans.id

  if (!toks.length) return lang === 'en' ? 'Type a question about Andre — experience, skills, projects, education or contact.' : 'Ketik pertanyaan soal Andre ya — pengalaman, skill, proyek, pendidikan, atau kontak.'

  const scored = _I.map(it => ({ it, s: scoreIntent(it, qn, toks) }))
    .filter(x => x.s > 0 && (!x.it.maxTokens || toks.length <= x.it.maxTokens))
    .sort((a, b) => b.s - a.s)
  const greet = scored.find(x => x.it.id === 'greet')
  const content = scored.filter(x => !x.it.smalltalk && x.s >= 3)
  const small = scored.find(x => x.it.smalltalk && x.it.id !== 'greet' && x.s >= 3)

  if (content.length) {
    const top = content[0], second = content[1]
    let ans = L(top.it)
    if (second && second.s >= top.s * 0.8 && second.it.id.split('-')[0] !== top.it.id.split('-')[0]) ans += '\n\n' + L(second.it)
    return greet ? `${greeting(qn, lang).split('\n')[0].replace(/ Aku asisten.*|\s*Ask me.*|\s*I'm the.*/s, '')}\n\n${ans}` : ans
  }
  if (small) return L(small.it)
  if (greet) return greeting(qn, lang)

  const hits = corpusSearch(toks)
  if (hits.length) {
    const cut = t => (t.length > 200 ? t.slice(0, 197) + '…' : t)
    return (lang === 'en' ? 'Closest matches in Andre\'s CV:\n' : 'Yang paling nyambung di CV Andre:\n') + hits.map(h => `• ${h.title}\n  ${cut(h.text)}`).join('\n')
  }
  return lang === 'en'
    ? "I couldn't find that in Andre's CV data. Try asking about his experience, projects, skills, education or contact — or email him directly: " + C.emails[0]
    : 'Aku belum nemu itu di data CV Andre. 🤔 Coba tanya soal pengalaman, proyek, skill, pendidikan, atau kontak — atau langsung email: ' + C.emails[0]
}

export function getSuggestedQuestions() {
  const all = ['Siapa Andre?', 'Sekarang kerja dimana?', 'Apa saja proyeknya?', 'Skill apa yang dikuasai?', 'Pendidikan & IPK-nya?', 'Bagaimana cara menghubungi?', 'Pernah bikin AI agent?', 'Apa itu Trading Fellah?']
  return all
}

// Plain-text knowledge handed to Gemini (system prompt grounding)
export function buildContextText() {
  ensure()
  const L = []
  L.push(`PROFIL: Andre Luckyta Firdaus. ${C.headline}. Lokasi: ${C.location}. Email: ${C.emails.join(' / ')}. LinkedIn: ${personalInfo.linkedin}. GitHub: ${personalInfo.github}. Telegram: ${personalInfo.telegram}. Status: ${personalInfo.availability}. Website CV: ${C.site}.`)
  L.push(`RINGKASAN: ${C.summary}`)
  L.push('PENGALAMAN:\n' + C.jobs.map(j => `- [${j.kind}] ${jobLine(j)}: ${j.points.join(' ')}`).join('\n'))
  L.push('PROYEK:\n' + C.projects.map(p => `- ${p.name} (${p.meta}): ${p.text}`).join('\n'))
  L.push('PROYEK LIVE/REPO:\n' + proofs.map(p => `- ${p.label}: ${p.highlights.join('; ')}. Stack: ${p.stack.join(', ')}.${p.repoUrl ? ' Repo: ' + p.repoUrl : ''}${p.liveUrl ? ' Live: ' + p.liveUrl : ''}`).join('\n'))
  const seen = new Set()
  L.push('PROYEK PER ROLE:\n' + positions.flatMap(pos => (pos.projects || []).map(pr => {
    if (seen.has(pr.title)) return null; seen.add(pr.title)
    return `- ${pr.title} (${strip(pr.period)}): ${strip(pr.desc)}`
  })).filter(Boolean).join('\n'))
  L.push(`PENDIDIKAN: ${C.education.degree}, ${C.education.school}, ${C.education.period}, IPK ${C.education.gpa}. Skripsi: ${C.education.thesis}.`)
  L.push('SERTIFIKASI & PELATIHAN:\n' + C.certifications.map(c => `- ${c.name} — ${c.by}, ${c.when}`).join('\n'))
  L.push('SKILL:\n' + C.skills.map(s => `- ${s.group}: ${s.items.join(', ')}`).join('\n'))
  L.push('SKILL DARI PROYEK: ' + uniq(positions.flatMap(p => (p.skills || []).flatMap(s => s.tags))).join(', '))
  L.push('ROLE DI CV INI (tab): ' + positions.map(p => p.tabLabel).join(', '))
  L.push('REFERENSI (hanya peran; nama & kontak ada di PDF): ' + C.references.join('; '))
  L.push('FITUR WEBSITE: ganti role lewat tab/tombol ← →; klik foto untuk foto berikutnya; tombol CV di navbar untuk unduh PDF; pemutar musik lofi di kiri bawah; asisten ini di kanan bawah.')
  L.push('TIDAK ADA DI DATA (jangan mengarang): umur/tanggal lahir, agama, status pernikahan, alamat rumah, nomor identitas, ekspektasi gaji, nomor telepon (ada di CV PDF).')
  return L.join('\n\n')
}
