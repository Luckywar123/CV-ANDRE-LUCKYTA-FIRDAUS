// src/ai-chatbot.js
// Hybrid chatbot: /api/chat (Gemini, key kept server-side) → offline fallback.
import { getFabDock } from './animations.js'
import { getFallbackAnswer, getSuggestedQuestions, buildContextText } from './ai-fallback.js'

const ENDPOINT    = import.meta.env.VITE_AI_ENDPOINT || '/api/chat'
const DEV_KEY     = import.meta.env.DEV ? (import.meta.env.VITE_GEMINI_KEY || '') : '' // local dev only
const DAILY_LIMIT = 20
const MODEL       = 'gemini-2.5-flash'

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

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

async function askAI(message) {
  // 1) serverless endpoint
  try {
    const r = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    })
    if (r.ok) {
      const { text } = await r.json()
      if (text) return { text, ai: true }
    }
  } catch {}
  // 2) direct key — dev only
  if (DEV_KEY) {
    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': DEV_KEY },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: 'Asisten CV Andre Luckyta Firdaus. Jawab singkat, hanya dari data ini:\n' + buildContextText() }] },
          contents: [{ role: 'user', parts: [{ text: message }] }],
          generationConfig: { temperature: 0.4, maxOutputTokens: 300 },
        }),
      })
      if (r.ok) {
        const d = await r.json()
        const text = d.candidates?.[0]?.content?.parts?.map(p => p.text).join('')
        if (text) return { text, ai: true }
      }
    } catch {}
  }
  return null
}

export function initChatbot() {
  if (document.getElementById('cvbot')) return
  const root = document.createElement('div')
  root.id = 'cvbot'
  root.innerHTML = `
    <button class="cvbot-toggle" aria-label="Open CV assistant"><i class="fa-solid fa-comments"></i><span>Tanya AI</span></button>
    <div class="cvbot-panel" role="dialog" aria-label="CV assistant" hidden>
      <div class="cvbot-head">
        <div><strong>CV Assistant</strong><small id="cvbot-mode">online</small></div>
        <button class="cvbot-close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="cvbot-msgs" id="cvbot-msgs">
        <div class="cvbot-msg bot">Hai! Aku asisten CV Andre. Tanya soal pendidikan, skill, proyek, atau kontak.</div>
      </div>
      <div class="cvbot-chips">${getSuggestedQuestions().map(q => `<button class="cvbot-chip">${esc(q)}</button>`).join('')}</div>
      <form class="cvbot-form" autocomplete="off">
        <input id="cvbot-input" maxlength="300" placeholder="Tanya sesuatu..." />
        <button type="submit" aria-label="Send"><i class="fa-solid fa-paper-plane"></i></button>
      </form>
    </div>`
  getFabDock().appendChild(root)

  const panel = root.querySelector('.cvbot-panel')
  const msgs  = root.querySelector('#cvbot-msgs')
  const input = root.querySelector('#cvbot-input')
  const mode  = root.querySelector('#cvbot-mode')
  const open  = v => { panel.hidden = !v; if (v) input.focus() }

  root.querySelector('.cvbot-toggle').onclick = () => open(panel.hidden)
  root.querySelector('.cvbot-close').onclick = () => open(false)
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) open(false) })

  const add = (text, cls) => {
    const d = document.createElement('div')
    d.className = `cvbot-msg ${cls}`
    d.textContent = text
    msgs.appendChild(d)
    msgs.scrollTop = msgs.scrollHeight
    return d
  }

  async function send(text) {
    text = text.trim()
    if (!text) return
    add(text, 'user')
    input.value = ''
    const loading = add('…', 'bot loading')
    let reply = null
    if (usedToday() < DAILY_LIMIT) {
      reply = await askAI(text)
      if (reply) bump()
    }
    loading.remove()
    if (reply) { add(reply.text, 'bot'); mode.textContent = 'AI online' }
    else { add(getFallbackAnswer(text), 'bot'); mode.textContent = 'offline mode' }
  }

  root.querySelector('.cvbot-form').addEventListener('submit', e => { e.preventDefault(); send(input.value) })
  root.querySelectorAll('.cvbot-chip').forEach(c => c.addEventListener('click', () => send(c.textContent)))
  // keep arrow-key tab navigation from firing while typing
  input.addEventListener('keydown', e => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') e.stopPropagation() })
}
