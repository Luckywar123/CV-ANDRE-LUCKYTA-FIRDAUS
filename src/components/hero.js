// src/components/hero.js
import { photos, personalInfo } from '../data/positions.js'
import { scrambleText, animateCounter } from '../animations.js'
import { createSparkles } from '../sparkles.js'

let currentPhotoIndex = 0
export function renderHero(position) {
  const section = document.createElement('header')
  section.id = 'home'
  section.id = 'hero'

  section.innerHTML = `
    <div class="hero-bg-gradient"></div>
    <div class="hero-noise"></div>

    <div class="hero-inner">
      <!-- LEFT -->
      <div class="hero-left">
        <div class="hero-badge">
          <i class="${position.heroIcon}"></i>
          <span id="hero-badge-text">${position.badge}</span>
        </div>

        <h1 class="hero-name">Andre Luckyta<br>Firdaus</h1>

        <p id="hero-title" class="hero-title">${position.heroTitle}</p>

        <p id="hero-subtitle" class="hero-desc">${position.heroSubtitle}</p>

        <div class="hero-stats" id="hero-stats">
          ${position.stats.map(s => `
            <div class="stat-item">
              <div class="stat-number" data-target="${s.number}" data-suffix="${s.suffix}">0${s.suffix}</div>
              <div class="stat-label">${s.label}</div>
            </div>
          `).join('')}
        </div>

        <div class="hero-ctas">
          <a href="#experience" class="btn btn-primary btn-hero">
            <i class="${position.heroIcon}"></i>
            <span>Explore My Stack</span>
          </a>
          <div class="hero-location">
            <i class="fa-solid fa-location-dot"></i>
            Jakarta, Indonesia · Open to Asia / Remote
          </div>
        </div>
      </div>

      <!-- RIGHT: PHOTO SWAP -->
      <div class="hero-right">
        <div class="photo-wrapper">
          <!-- Floating badges -->
          <div class="photo-badge photo-badge-1">
            <i class="fa-solid fa-wallet"></i>
            Treasury Wallet Live
          </div>
          <div class="photo-badge photo-badge-2">
            <i class="fa-solid fa-circle-check"></i>
            Passport & Police Clear
          </div>
          <div class="photo-badge photo-badge-3">
            <i class="fa-brands fa-python"></i>
            AI Agent Built
          </div>

          <!-- Photo Frame (click to swap) -->
          <div class="photo-frame" id="photo-frame" title="Click to see more photos">
            <div class="photo-inner">
              <img
                id="hero-photo"
                src="${getPhotoSrc(0)}"
                alt="Andre Luckyta Firdaus"
                class="photo-img"
                onerror="this.src='';this.parentElement.innerHTML=getPhotoFallback(${currentPhotoIndex})"
              />
              <div class="photo-hint">Click to swap photo</div>
            </div>
          </div>

          <!-- Dots indicator -->
          <div class="photo-dots" id="photo-dots">
            ${photos.map((_, i) => `
              <div class="photo-dot ${i === 0 ? 'active' : ''}" data-idx="${i}"></div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `

  // Photo swap logic
  const photoFrame = section.querySelector('#photo-frame')
  const photoImg   = section.querySelector('#hero-photo')
  const photoDots  = section.querySelectorAll('.photo-dot')

  let lensBusy = false

  function swapPhoto(index) {
    if (!photoImg || lensBusy) return
    currentPhotoIndex = (index + photos.length) % photos.length

    // Animate out
    photoImg.classList.add('swapping')

    setTimeout(() => {
      const newSrc = getPhotoSrc(currentPhotoIndex)
      photoImg.src = newSrc
      photoImg.onerror = () => {
        photoImg.parentElement.innerHTML = buildFallback(currentPhotoIndex)
      }
      photoImg.classList.remove('swapping')

      // Update dots
      photoDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentPhotoIndex)
      })
      refreshPeek()
    }, 350)
  }

  // ─── LENS PEEK ──────────────────────────────────────────
  // Hover: a soft circle around the cursor shows the NEXT photo.
  // Click: that circle expands from the cursor until it becomes the photo.
  const photoInner = section.querySelector('.photo-inner')
  const peek = document.createElement('img')
  peek.className = 'photo-peek'
  peek.alt = ''
  peek.draggable = false
  peek.setAttribute('aria-hidden', 'true')
  const ring = document.createElement('div')
  ring.className = 'photo-lens'
  // abstract motion layer (aurora swirl + drifting colour blobs + moiré rings), blended with 'screen' so the photo stays visible
  const fx = document.createElement('div')
  fx.className = 'photo-fx'
  fx.setAttribute('aria-hidden', 'true')
  fx.innerHTML = '<i class="fx-a"></i><i class="fx-c"></i><i class="fx-b"></i>'
  photoInner.append(peek, fx, ring)
  const sparks = (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && photos.length > 1) ? createSparkles(photoInner) : null

  const LENS_R = 80
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const canLens = photos.length > 1 && !reduceMotion
  const MAG = 1.14 // magnification inside the lens (optical illusion)
  const lens = { x: 0, y: 0, r: 0, tx: 0, ty: 0, tr: 0, m: MAG }
  let raf = null, hovering = false, expanding = false

  const nextIdx = () => (currentPhotoIndex + 1) % photos.length
  function refreshPeek() { peek.src = getPhotoSrc(nextIdx()) }
  refreshPeek()

  function paint() {
    const r = Math.max(lens.r, 0)
    // magnify about the lens centre + a slow "swirl & breathe" (rotate/pulse) -> the picture inside the lens drifts like liquid glass.
    // The clip shrinks by the same factor, so the visible radius stays r. Amplitude fades to 0 while the lens expands.
    const k = (lens.m - 1) / (MAG - 1), t = performance.now() / 1000
    const sc = lens.m * (1 + Math.sin(t * 1.7) * 0.03 * k)
    peek.style.transformOrigin = `${lens.x}px ${lens.y}px`
    peek.style.transform = `rotate(${(Math.sin(t * 1.1) * 5 * k).toFixed(2)}deg) scale(${sc.toFixed(4)})`
    peek.style.clipPath = `circle(${r / sc}px at ${lens.x}px ${lens.y}px)`
    fx.style.width = fx.style.height = r * 2 + 'px'
    fx.style.transform = `translate(${lens.x - r}px, ${lens.y - r}px)`
    ring.style.width = ring.style.height = r * 2 + 'px'
    ring.style.transform = `translate(${lens.x - r}px, ${lens.y - r}px)`
  }
  function tick() {
    if (!expanding) {
      lens.x += (lens.tx - lens.x) * 0.25
      lens.y += (lens.ty - lens.y) * 0.25
      lens.r += (lens.tr - lens.r) * 0.18
      if (lens.tr === 0 && lens.r < 0.5) lens.r = 0
    }
    paint()
    if (sparks && !expanding && lens.tr > 0 && lens.r > 24) {
      if (Math.random() < 0.95) sparks.emitOrbit(lens.x, lens.y, lens.r, 3)   // swirl around the rim
      if (Math.random() < 0.3) sparks.emitLens(lens.x, lens.y, lens.r, 1)    // a few inside
    }
    const idle = !expanding && lens.tr === 0 && lens.r === 0
    raf = idle ? null : requestAnimationFrame(tick)
  }
  const kick = () => { if (!raf) raf = requestAnimationFrame(tick) }
  const localPoint = e => {
    const b = photoInner.getBoundingClientRect()
    return { x: e.clientX - b.left, y: e.clientY - b.top }
  }

  photoFrame.addEventListener('pointerenter', e => {
    if (e.pointerType !== 'mouse' || !canLens || lensBusy) return
    hovering = true
    const p = localPoint(e)
    lens.x = lens.tx = p.x
    lens.y = lens.ty = p.y
    lens.r = 0
    lens.tr = LENS_R
    photoFrame.classList.add('lens-on')
    kick()
  })
  photoFrame.addEventListener('pointermove', e => {
    if (!hovering) return
    const p = localPoint(e)
    if (sparks && !expanding) sparks.trail(p.x, p.y, Math.hypot(p.x - lens.tx, p.y - lens.ty))
    lens.tx = p.x
    lens.ty = p.y
    if (!expanding) kick()
  })
  photoFrame.addEventListener('pointerleave', () => {
    hovering = false
    if (expanding) return
    lens.tr = 0
    photoFrame.classList.remove('lens-on')
    kick()
  })

  photoFrame.addEventListener('click', async e => {
    if (lensBusy) return
    if (!canLens) { swapPhoto(currentPhotoIndex + 1); return }

    lensBusy = true
    expanding = true
    photoFrame.classList.add('lens-expanding')
    const b = photoInner.getBoundingClientRect()
    const hasPoint = e.clientX || e.clientY
    const px = hasPoint ? e.clientX - b.left : b.width / 2
    const py = hasPoint ? e.clientY - b.top : b.height / 2
    if (!hovering) { lens.x = px; lens.y = py; lens.r = 0 } // touch: start at the tap
    refreshPeek()
    try { await peek.decode() } catch {}
    photoFrame.classList.add('lens-on')
    if (sparks) sparks.burst(px, py, 34)

    const from = { x: lens.x, y: lens.y, r: lens.r }
    const maxR = Math.hypot(Math.max(px, b.width - px), Math.max(py, b.height - py)) + 8
    const t0 = performance.now(), dur = 900
    await new Promise(done => {
      const step = now => {
        const k = Math.min(1, (now - t0) / dur)
        const ease = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2 // ease-in-out: ripple is clearly visible
        lens.x = from.x + (px - from.x) * ease
        lens.y = from.y + (py - from.y) * ease
        lens.r = from.r + (maxR - from.r) * ease
        lens.m = MAG + (1 - MAG) * ease // magnification relaxes to 1 so the final photo lands seamlessly
        paint()
        if (sparks && k < 0.92) sparks.emitRing(lens.x, lens.y, lens.r, 5)
        k < 1 ? requestAnimationFrame(step) : done()
      }
      requestAnimationFrame(step)
    })

    // The expanded circle already shows the new photo — make it permanent
    currentPhotoIndex = nextIdx()
    photoImg.src = getPhotoSrc(currentPhotoIndex)
    try { await photoImg.decode() } catch {}
    photoDots.forEach((d, i) => d.classList.toggle('active', i === currentPhotoIndex))

    lens.x = lens.tx; lens.y = lens.ty
    lens.r = 0
    lens.m = MAG
    photoFrame.classList.remove('lens-expanding')
    lens.tr = hovering ? LENS_R : 0
    expanding = false
    lensBusy = false
    refreshPeek()
    photoFrame.classList.toggle('lens-on', hovering)
    kick()
  })

  // Click dots to jump
  photoDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation()
      swapPhoto(parseInt(dot.dataset.idx))
    })
  })

  // Auto-swap every 6s
  let autoSwap = setInterval(() => swapPhoto(currentPhotoIndex + 1), 6000)
  section.addEventListener('mouseenter', () => clearInterval(autoSwap))
  section.addEventListener('mouseleave', () => {
    clearInterval(autoSwap)
    autoSwap = setInterval(() => swapPhoto(currentPhotoIndex + 1), 6000)
  })

  return section
}

// Update hero content when tab switches (no full re-render)
export function updateHero(position) {
  const badge    = document.getElementById('hero-badge-text')
  const title    = document.getElementById('hero-title')
  const subtitle = document.getElementById('hero-subtitle')
  const stats    = document.getElementById('hero-stats')

  if (badge)    scrambleText(badge, position.badge, 500)
  if (title)    scrambleText(title, position.heroTitle, 700)
  if (subtitle) {
    subtitle.style.opacity = '0'
    setTimeout(() => {
      subtitle.textContent = position.heroSubtitle
      subtitle.style.transition = 'opacity 0.4s'
      subtitle.style.opacity = '1'
    }, 200)
  }

  if (stats) {
    stats.innerHTML = position.stats.map(s => `
      <div class="stat-item">
        <div class="stat-number" data-target="${s.number}" data-suffix="${s.suffix}">0${s.suffix}</div>
        <div class="stat-label">${s.label}</div>
      </div>
    `).join('')

    // Re-trigger counters
    stats.querySelectorAll('.stat-number[data-target]').forEach(el => {
      const target = parseFloat(el.dataset.target)
      const suffix = el.dataset.suffix || ''
      animateCounter(el, target, suffix, 1200)
    })
  }
}

function getPhotoSrc(index) {
  if (!photos || photos.length === 0) return ''
  const photo = photos[index % photos.length]
  return photo ? photo.src : ''
}

function buildFallback(index) {
  const labels = ['🚀', '💼', '✨', '🎯', '⚡']
  const label  = photos[index]?.label || 'Andre'
  const emoji  = labels[index % labels.length]
  return `
    <div style="
      width:100%; height:100%;
      display:flex; flex-direction:column;
      align-items:center; justify-content:center;
      background: linear-gradient(135deg, #1a1a1a, #0a0a0a);
      border-radius: inherit;
      gap: 1rem;
    ">
      <div style="font-size: 5rem; line-height:1;">${emoji}</div>
      <div style="
        font-family: 'Syne', sans-serif;
        font-weight: 800; font-size: 1.1rem;
        color: #f0b90b; text-align:center;
        padding: 0 1rem;
      ">${label}</div>
    </div>
  `
}
