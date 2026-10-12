// src/effects.js — GSAP + tilt upgrades layered on top of animations.js
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import VanillaTilt from 'vanilla-tilt'

gsap.registerPlugin(ScrollTrigger)

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const fine    = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

// ─── PRELOADER ────────────────────────────────────────────
export function hidePreloader() {
  const el = document.getElementById('preloader')
  if (!el) return
  const done = () => { el.classList.add('hidden'); setTimeout(() => el.remove(), 700) }
  if (document.readyState === 'complete') setTimeout(done, 350)
  else window.addEventListener('load', () => setTimeout(done, 350), { once: true })
  setTimeout(done, 3000) // safety net
}

// ─── NAVBAR BLUR / SHRINK ─────────────────────────────────
export function initNavbarScroll() {
  const nav = document.getElementById('navbar')
  if (!nav) return
  const on = () => nav.classList.toggle('scrolled', window.scrollY > 40)
  on()
  window.addEventListener('scroll', on, { passive: true })
}

// ─── HERO PARALLAX ────────────────────────────────────────
export function initParallax() {
  if (reduced()) return
  const hero = document.getElementById('hero')
  if (!hero) return
  gsap.to(hero, {
    '--parallax-y': '120px',
    ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 },
  })
  gsap.to('.photo-wrapper', {
    yPercent: -8, ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 },
  })
}

// ─── 3D TILT (idempotent, desktop only) ───────────────────
export function initTilt() {
  if (reduced() || !fine()) return
  document.querySelectorAll('.card:not(.card-exp), .photo-frame').forEach(el => {
    if (el.vanillaTilt) return
    VanillaTilt.init(el, { max: 7, speed: 500, glare: true, 'max-glare': 0.18, scale: 1.015 })
  })
}

// ─── MAGNETIC NAV TABS ────────────────────────────────────
export function initMagneticNav() {
  if (reduced() || !fine()) return
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('mousemove', e => {
      const r = tab.getBoundingClientRect()
      gsap.to(tab, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.25, duration: 0.3, ease: 'power2.out' })
    })
    tab.addEventListener('mouseleave', () => gsap.to(tab, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' }))
  })
}

// ─── SCROLL-SPY DOTS ──────────────────────────────────────
export function initScrollSpy() {
  const ids = ['hero', 'about', 'experience', 'projects', 'skills', 'education', 'cv']
  const secs = ids.map(id => document.getElementById(id)).filter(Boolean)
  if (!secs.length) return
  const nav = document.createElement('nav')
  nav.className = 'spy'
  nav.setAttribute('aria-label', 'Sections')
  nav.innerHTML = secs.map(s => `<a href="#${s.id}" data-spy="${s.id}" title="${s.id}"><span></span></a>`).join('')
  document.body.appendChild(nav)
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        nav.querySelectorAll('a').forEach(a => a.classList.toggle('active', a.dataset.spy === en.target.id))
      }
    })
  }, { rootMargin: '-45% 0px -50% 0px' })
  secs.forEach(s => io.observe(s))
}

// ─── EXPERIENCE TIMELINE: draw line on scroll ─────────────
export function initTimeline() {
  const list = document.getElementById('experience-container')
  if (!list) return
  if (reduced()) { list.style.setProperty('--line', 1); return }
  gsap.fromTo(list, { '--line': 0 }, {
    '--line': 1, ease: 'none',
    scrollTrigger: { trigger: list, start: 'top 75%', end: 'bottom 60%', scrub: 0.5 },
  })
}

export function refreshEffects() {
  initTilt()
  ScrollTrigger.refresh()
}

export function initAllEffects() {
  hidePreloader()
  initNavbarScroll()
  initMagneticNav()
  initScrollSpy()
  initParallax()
  initTimeline()
  initTilt()
}
