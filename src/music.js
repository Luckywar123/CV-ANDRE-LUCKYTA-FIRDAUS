// src/music.js — lofi player (ported from the RekaLOKA site), bottom-left dock.
// No autoplay (browsers block it) and nothing is downloaded until the first play.
import { getFabDock } from './animations.js'

const SRC = '/audio/lofi.mp3'
const VOL_KEY = 'cv-lofi-vol'

export function initMusic() {
  if (document.getElementById('cv-music')) return
  let vol = 0.35
  try { const v = parseFloat(localStorage.getItem(VOL_KEY)); if (!isNaN(v)) vol = Math.min(1, Math.max(0, v)) } catch {}

  const wrap = document.createElement('div')
  wrap.id = 'cv-music'
  wrap.innerHTML = `
    <button type="button" class="music-btn" aria-label="Putar / jeda musik lofi" title="Musik lofi">
      <svg class="ic-play" viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
      <svg class="ic-pause" viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>
      <span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
      <span class="music-label">Lofi</span>
    </button>
    <input class="music-vol" type="range" min="0" max="100" value="${Math.round(vol * 100)}" aria-label="Volume musik" title="Volume" />`
  getFabDock('left').appendChild(wrap)

  const audio = new Audio()
  audio.loop = true
  audio.preload = 'none'
  audio.volume = vol
  audio.src = SRC

  const btn = wrap.querySelector('.music-btn')
  const slider = wrap.querySelector('.music-vol')
  const setPlaying = on => { wrap.classList.toggle('playing', on); btn.setAttribute('aria-pressed', String(on)) }

  btn.addEventListener('click', () => {
    if (audio.paused) audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    else { audio.pause(); setPlaying(false) }
  })
  slider.addEventListener('input', () => {
    audio.volume = Number(slider.value) / 100
    try { localStorage.setItem(VOL_KEY, String(audio.volume)) } catch {}
  })
  audio.addEventListener('error', () => {
    wrap.classList.add('unavailable'); setPlaying(false)
    btn.title = 'Lagu belum tersedia'; btn.disabled = true
  })
  setPlaying(false)
}
