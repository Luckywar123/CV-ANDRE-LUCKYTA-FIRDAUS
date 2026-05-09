// src/components/hero.js
import { photos, personalInfo } from '../data/positions.js'
import { scrambleText, animateCounter } from '../animations.js'

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

  function swapPhoto(index) {
    if (!photoImg) return
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
    }, 350)
  }

  // Click photo frame to go next
  photoFrame.addEventListener('click', () => {
    swapPhoto(currentPhotoIndex + 1)
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
