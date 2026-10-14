// src/main.js
// ============================================================
// MAIN ENTRY — Assembles all components & manages state
// ============================================================

import './style.css'
import './upgrade.css'

import { positions } from './data/positions.js'

// Animations
import {
  initCursor,
  initParticles,
  initScrollReveal,
  reObserve,
  initMagneticButtons,
  animateHeroEntrance,
  initCounters,
  initProgressBar,
  initBackToTop,
  animateCounter,
} from './animations.js'

// Components
import { renderNavbar } from './components/navbar.js'
import { renderHero, updateHero } from './components/hero.js'
import { renderAbout, updateAbout } from './components/about.js'
import { renderExperience, updateExperience } from './components/experience.js'
import { renderProjects, updateProjects } from './components/projects.js'
import { renderSkills, updateSkills } from './components/skills.js'
import {
  renderGoals,
  renderWeb3Block,
  renderEducation,
  renderLeadership,
  renderCVViewer,
  renderContact,
} from './components/sections.js'
import { renderFooter } from './components/footer.js'
import { initAllEffects, refreshEffects } from './effects.js'
import { initChatbot } from './ai-chatbot.js'
import { initMusic } from './music.js'

// ─── STATE ────────────────────────────────────────────────
let currentPositionId = 0
const app = document.getElementById('app')
let navbarComponent = null

// ─── BUILD INITIAL DOM ────────────────────────────────────
function buildApp() {
  const initialPos = positions[0]

  // Navbar
  navbarComponent = renderNavbar(onTabChange)
  app.appendChild(navbarComponent)

  // Hero
  app.appendChild(renderHero(initialPos))

  // About
  app.appendChild(renderAbout(initialPos))

  // Goals (static)
  app.appendChild(renderGoals())

  // Experience
  app.appendChild(renderExperience(initialPos))

  // Projects
  app.appendChild(renderProjects(initialPos))

  // Web3 block (static)
  app.appendChild(renderWeb3Block())

  // Skills
  app.appendChild(renderSkills(initialPos))

  // Education + Certs (static)
  app.appendChild(renderEducation())

  // Leadership (static)
  app.appendChild(renderLeadership())

  // CV Viewer (static)
  app.appendChild(renderCVViewer())

  // Contact (static)
  app.appendChild(renderContact())

  // Footer
  app.appendChild(renderFooter())
}

// ─── TAB SWITCH HANDLER ───────────────────────────────────
function onTabChange(id) {
  if (id === currentPositionId) return
  currentPositionId = id
  const pos = positions[id]

  // Update dynamic sections
  updateHero(pos)
  updateAbout(pos)
  updateExperience(pos)
  updateProjects(pos)
  updateSkills(pos)

  // Re-init counters for new stats
  setTimeout(() => {
    document.querySelectorAll('.stat-number[data-target]').forEach(el => {
      const target = parseFloat(el.dataset.target)
      const suffix = el.dataset.suffix || ''
      animateCounter(el, target, suffix, 1200)
    })
    reObserve()
    initMagneticButtons()
    refreshEffects()
  }, 400)
}

// ─── INIT SEQUENCE ────────────────────────────────────────
function init() {
  // Disable right-click and DevTools (production privacy)
  document.addEventListener('contextmenu', e => e.preventDefault())
  document.addEventListener('keydown', e => {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
      e.preventDefault()
    }
  })

  // Build DOM
  buildApp()

  // Animations
  initCursor()
  initParticles()
  initProgressBar()
  initBackToTop()
  animateHeroEntrance()

  // Scroll reveals (slight delay for DOM settle)
  setTimeout(() => {
    initScrollReveal()
    initCounters()
    initMagneticButtons()
    initAllEffects()
    initChatbot()
    initMusic()
  }, 200)

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'))
      if (target) {
        e.preventDefault()
        target.scrollIntoView({ behavior: 'smooth' })
      }
    })
  })

  // Keyboard tab navigation
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      const next = e.key === 'ArrowRight'
        ? (currentPositionId + 1) % positions.length
        : (currentPositionId - 1 + positions.length) % positions.length
      navbarComponent._setActiveTab(next)
      onTabChange(next)
    }
  })

  // Preload photos after page load
  window.addEventListener('load', preloadPhotos)
}

// ─── PRELOAD IMAGES ───────────────────────────────────────
function preloadPhotos() {
  import('./data/positions.js').then(({ photos }) => {
    photos.forEach(p => {
      const img = new Image()
      img.src = p.src
    })
  })
}

// ─── START ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init)
