// src/ai-chatbot.js
// Hybrid chatbot: /api/chat (Gemini, key kept server-side) → offline fallback.
import { getFabDock } from './animations.js'
import { getFallbackAnswer, getSuggestedQuestions, buildContextText } from './ai-fallback.js'

const ENDPOINT    = import.meta.env.VITE_AI_ENDPOINT || '/api/chat'
const DEV_KEY     = import.meta.env.DEV ? (import.meta.env.VITE_GEMINI_KEY || '') : '' // local dev only
const DEV_MODEL   = 'gemini-3.5-flash'
const DAILY_LIMIT = 30

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
const linkify = t => esc(t).replace(/(https?:\/\/[^\s<)]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>')

const REASONS = {
  not_configured: 'offline · API key belum diset di Vercel',
  quota: 'offline · kuota Gemini habis',
  bad_key: 'offline · API key ditolak Google',
  rate_limited: 'offline · terlalu banyak pesan, coba lagi nanti',
  upstream: 'offline · Gemini sedang error',
}

function usedToday() {
  const today = new Date().toDateString()
  try {
    if (localStorage.getItem('cvbot_date') !== today) {
      localStorage.setItem('cvbot_date', today)
      localStorage.setItem('cvbot_count', '0')
      return 0
    }
    return parseInt(localStorage.getItem('cvbot_count') || '0', 10)
  } catch { return 0 }
}
function bump() {
  try { localStorage.setItem('cvbot_count', String(usedToday() + 1)) } catch {}
}

// returns { text } on success or { error } with a reason code
async function askAI(message, history) {
  try {
    const r = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
    })
    if (r.ok) {
      const { text } = await r.json()
      if (text) return { text }
      return { error: 'upstream' }
    }
    let code = ''
    try { code = (await r.json()).error } catch {}
    if (code && REASONS[code]) { if (code !== 'not_configured' || !DEV_KEY) return { error: code } }
  } catch {}
  // direct key — local dev only (never shipped to production)
  if (DEV_KEY) {
    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${DEV_MODEL}:generateContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': DEV_KEY },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: 'Asisten CV Andre Luckyta Firdaus. Jawab singkat dan ramah, hanya dari data ini:\n' + buildContextText() }] },
          contents: [...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.text }] })), { role: 'user', parts: [{ text: message }] }],
          generationConfig: { maxOutputTokens: 700, thinkingConfig: { thinkingLevel: 'low' } },
        }),
      })
      if (r.ok) {
        const d = await r.json()
        const text = (d.candidates?.[0]?.content?.parts || []).filter(p => !p.thought).map(p => p.text || '').join('').trim()
        if (text) return { text }
      }
    } catch {}
  }
  return { error: 'offline' }
}

export function initChatbot() {
  if (document.getElementById('cvbot')) return
  const chips = getSuggestedQuestions().sort(() => Math.random() - 0.5).slice(0, 4)
  const root = document.createElement('div')
  root.id = 'cvbot'
  root.innerHTML = `
    <button class="cvbot-toggle" aria-label="Open CV assistant"><i class="fa-solid fa-comments"></i><span>Tanya AI</span></button>
    <div class="cvbot-panel" role="dialog" aria-label="CV assistant" hidden>
      <div class="cvbot-head">
        <div><strong>CV Assistant</strong><small id="cvbot-mode">siap membantu</small></div>
        <button class="cvbot-close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="cvbot-msgs" id="cvbot-msgs"></div>
      <div class="cvbot-chips">${chips.map(q => `<button class="cvbot-chip">${esc(q)}</button>`).join('')}</div>
      <form class="cvbot-form" autocomplete="off">
        <input id="cvbot-input" maxlength="300" placeholder="Tanya atau sapa aku..." />
        <button type="submit" aria-label="Send"><i class="fa-solid fa-paper-plane"></i></button>
      </form>
    </div>`
  getFabDock('right').appendChild(root)

  const panel = root.querySelector('.cvbot-panel')
  const msgs  = root.querySelector('#cvbot-msgs')
  const input = root.querySelector('#cvbot-input')
  const mode  = root.querySelector('#cvbot-mode')
  const open  = v => { panel.hidden = !v; if (v) input.focus() }
  const history = []

  root.querySelector('.cvbot-toggle').onclick = () => open(panel.hidden)
  root.querySelector('.cvbot-close').onclick = () => open(false)
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) open(false) })

  const add = (text, cls) => {
    const d = document.createElement('div')
    d.className = `cvbot-msg ${cls}`
    if (cls.includes('bot') && !cls.includes('loading')) d.innerHTML = linkify(text)
    else d.textContent = text
    msgs.appendChild(d)
    msgs.scrollTop = msgs.scrollHeight
    return d
  }
  add('Halo! 👋 Aku asisten CV Andre. Tanya soal pengalaman, skill, proyek, pendidikan, atau kontak — atau sapa aja dulu, boleh kok 😄', 'bot')

  let busy = false
  async function send(text) {
    text = text.trim()
    if (!text || busy) return
    busy = true
    add(text, 'user')
    input.value = ''
    const loading = add('…', 'bot loading')
    let reply = { error: 'quota_local' }
    if (usedToday() < DAILY_LIMIT) {
      reply = await askAI(text, history.slice(-6))
      if (reply.text) bump()
    }
    loading.remove()
    let answer
    if (reply.text) { answer = reply.text; mode.textContent = 'AI online · Gemini' }
    else {
      answer = getFallbackAnswer(text)
      mode.textContent = reply.error === 'quota_local' ? 'offline · batas harian tercapai' : (REASONS[reply.error] || 'offline mode')
    }
    add(answer, 'bot')
    history.push({ role: 'user', text }, { role: 'bot', text: answer })
    busy = false
  }

  root.querySelector('.cvbot-form').addEventListener('submit', e => { e.preventDefault(); send(input.value) })
  root.querySelectorAll('.cvbot-chip').forEach(c => c.addEventListener('click', () => send(c.textContent)))
  // keep arrow-key tab navigation from firing while typing
  input.addEventListener('keydown', e => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') e.stopPropagation() })
}
