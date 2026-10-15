// src/music.js — playlist player, bottom-left dock.
// No autoplay (browsers block it) and nothing is downloaded until a track is played.
// Drop the mp3 files into /public/audio/ using the file names below (missing files show as "belum tersedia").
import { getFabDock } from './animations.js'

const TRACKS = [
  { id: 'lofi',         icon: '🎧', title: 'Lofi',              sub: 'Chill beats',         src: '/audio/lofi.mp3' },
  { id: 'medieval',     icon: '🏰', title: 'Medieval',          sub: 'Tavern & kastil',     src: '/audio/medieval.mp3' },
  { id: 'jazz',         icon: '🎷', title: 'Jazz Santai',       sub: 'Smooth & relax',      src: '/audio/jazz-santai.mp3' },
  { id: 'club',         icon: '🍸', title: 'Club Fancy Instrumental', sub: 'Fancy lounge',        src: '/audio/club-fancy.mp3' },
  { id: 'lofi-scenery', icon: '🌄', title: 'Lofi Pemandangan',  sub: 'Scenic chill',        src: '/audio/lofi-pemandangan.mp3' },
]
const VOL_KEY = 'cv-lofi-vol'
const TRACK_KEY = 'cv-music-track'

export function initMusic() {
  if (document.getElementById('cv-music')) return
  let vol = 0.35
  try { const v = parseFloat(localStorage.getItem(VOL_KEY)); if (!isNaN(v)) vol = Math.min(1, Math.max(0, v)) } catch {}
  let idx = 0
  try { const t = TRACKS.findIndex(x => x.id === localStorage.getItem(TRACK_KEY)); if (t >= 0) idx = t } catch {}

  const wrap = document.createElement('div')
  wrap.id = 'cv-music'
  wrap.innerHTML = `
    <div class="music-panel" role="listbox" aria-label="Playlist musik">
      <div class="music-panel-title">Playlist</div>
      ${TRACKS.map((t, i) => `
        <button type="button" class="music-item" role="option" data-i="${i}">
          <span class="mi-ic" aria-hidden="true">${t.icon}</span>
          <span class="mi-txt"><span class="mi-name">${t.title}</span><span class="mi-sub">${t.sub}</span></span>
          <span class="mi-eq" aria-hidden="true"><i></i><i></i><i></i></span>
        </button>`).join('')}
    </div>
    <button type="button" class="music-btn" aria-label="Putar / jeda musik" title="Putar / jeda">
      <svg class="ic-play" viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
      <svg class="ic-pause" viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>
      <span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
      <span class="music-label"></span>
    </button>
    <button type="button" class="music-list-btn" aria-label="Buka playlist" aria-expanded="false" title="Playlist">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 15l6-6 6 6"/></svg>
    </button>
    <input class="music-vol" type="range" min="0" max="100" value="${Math.round(vol * 100)}" aria-label="Volume musik" title="Volume" />`
  getFabDock('left').appendChild(wrap)

  const audio = new Audio()
  audio.loop = true
  audio.preload = 'none'
  audio.volume = vol

  const btn = wrap.querySelector('.music-btn')
  const listBtn = wrap.querySelector('.music-list-btn')
  const slider = wrap.querySelector('.music-vol')
  const label = wrap.querySelector('.music-label')
  const items = [...wrap.querySelectorAll('.music-item')]

  const setPlaying = on => { wrap.classList.toggle('playing', on); btn.setAttribute('aria-pressed', String(on)) }
  const markBad = i => {
    TRACKS[i].bad = true
    items[i].disabled = true
    items[i].querySelector('.mi-sub').textContent = 'Belum tersedia'
  }
  function select(i) {
    idx = i
    audio.src = TRACKS[i].src
    label.textContent = TRACKS[i].title
    items.forEach((el, k) => { el.classList.toggle('active', k === i); el.setAttribute('aria-selected', String(k === i)) })
    try { localStorage.setItem(TRACK_KEY, TRACKS[i].id) } catch {}
  }
  const play = () => audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))

  // on first open of the playlist, grey out tracks whose mp3 isn't uploaded yet (HEAD only, no download)
  let checked = false
  async function checkAvailability() {
    if (checked) return; checked = true
    await Promise.all(TRACKS.map(async (t, i) => {
      try {
        const r = await fetch(t.src, { method: 'HEAD' })
        if (!r.ok || !(r.headers.get('content-type') || '').startsWith('audio')) markBad(i)
      } catch {}
    }))
  }
  const setOpen = on => {
    wrap.classList.toggle('open', on); listBtn.setAttribute('aria-expanded', String(on))
    if (on) checkAvailability()
  }

  select(idx)
  btn.addEventListener('click', () => {
    if (TRACKS[idx].bad) { setOpen(true); return }
    if (audio.paused) play(); else { audio.pause(); setPlaying(false) }
  })
  listBtn.addEventListener('click', () => setOpen(!wrap.classList.contains('open')))
  items.forEach((el, i) => el.addEventListener('click', () => {
    if (TRACKS[i].bad) return
    if (i !== idx || audio.paused) { select(i); play() }
  }))
  slider.addEventListener('input', () => {
    audio.volume = Number(slider.value) / 100
    try { localStorage.setItem(VOL_KEY, String(audio.volume)) } catch {}
  })
  audio.addEventListener('error', () => { markBad(idx); setPlaying(false) })
  document.addEventListener('pointerdown', e => { if (!wrap.contains(e.target)) setOpen(false) })
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false) })
  setPlaying(false)
}
