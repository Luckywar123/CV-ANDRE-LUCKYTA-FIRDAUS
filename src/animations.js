// src/animations.js
// ============================================================
// ALL ANIMATION UTILITIES
// ============================================================

// ─── CUSTOM CURSOR ────────────────────────────────────────
export function initCursor() {
  const dot  = document.getElementById('cursor-dot')
  const ring = document.getElementById('cursor-ring')
  if (!dot || !ring) return

  let mouseX = 0, mouseY = 0
  let ringX  = 0, ringY  = 0

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    dot.style.left = mouseX + 'px'
    dot.style.top  = mouseY + 'px'
  })

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12
    ringY += (mouseY - ringY) * 0.12
    ring.style.left = ringX + 'px'
    ring.style.top  = ringY + 'px'
    requestAnimationFrame(animateRing)
  }
  animateRing()

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0'
    ring.style.opacity = '0'
  })
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1'
    ring.style.opacity = '1'
  })
}

// ─── PARTICLE CANVAS ──────────────────────────────────────
export function initParticles() {
  const canvas = document.getElementById('particles-canvas')
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  let W = canvas.width  = window.innerWidth
  let H = canvas.height = window.innerHeight

  window.addEventListener('resize', () => {
    W = canvas.width  = window.innerWidth
    H = canvas.height = window.innerHeight
  })

  const NUM = 60
  const particles = Array.from({ length: NUM }, () => ({
    x:    Math.random() * W,
    y:    Math.random() * H,
    r:    Math.random() * 1.5 + 0.5,
    vx:   (Math.random() - 0.5) * 0.3,
    vy:   (Math.random() - 0.5) * 0.3,
    alpha: Math.random() * 0.5 + 0.1,
  }))

  function draw() {
    ctx.clearRect(0, 0, W, H)

    // Draw connection lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(240,185,11,${0.05 * (1 - dist / 120)})`
          ctx.lineWidth = 0.5
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(240,185,11,${p.alpha})`
      ctx.fill()

      p.x += p.vx
      p.y += p.vy

      if (p.x < 0 || p.x > W) p.vx *= -1
      if (p.y < 0 || p.y > H) p.vy *= -1
    })

    requestAnimationFrame(draw)
  }

  draw()
}

// ─── SCROLL REVEAL ────────────────────────────────────────
export function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal, .card, .reveal-stagger')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const el = entry.target
          const delay = el.dataset.delay || 0
          setTimeout(() => el.classList.add('visible'), Number(delay))
          observer.unobserve(el)
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  )

  targets.forEach((el, i) => {
    // Auto stagger cards in grids
    const parent = el.parentElement
    const siblings = parent ? [...parent.children] : []
    const idx = siblings.indexOf(el)
    if (!el.dataset.delay && idx > 0 && el.classList.contains('card')) {
      el.dataset.delay = idx * 80
    }
    observer.observe(el)
  })
}

// Re-observe after dynamic content injection
export function reObserve() {
  const targets = document.querySelectorAll('.reveal:not(.visible), .card:not(.visible), .reveal-stagger:not(.visible)')
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target
          const delay = el.dataset.delay || 0
          setTimeout(() => el.classList.add('visible'), Number(delay))
          observer.unobserve(el)
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
  )

  targets.forEach((el, i) => {
    const parent = el.parentElement
    const siblings = parent ? [...parent.children] : []
    const idx = siblings.indexOf(el)
    if (!el.dataset.delay && idx >= 0 && el.classList.contains('card')) {
      el.dataset.delay = idx * 80
    }
    observer.observe(el)
  })
}

// ─── TEXT SCRAMBLE ────────────────────────────────────────
const CHARS = '!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export function scrambleText(element, newText, duration = 600) {
  if (!element) return
  const originalText = newText
  let iteration = 0
  const totalIterations = Math.ceil(duration / 30)

  clearInterval(element._scrambleInterval)

  element._scrambleInterval = setInterval(() => {
    element.innerHTML = originalText
      .split('')
      .map((char, idx) => {
        if (idx < Math.floor((iteration / totalIterations) * originalText.length)) {
          return char
        }
        if (char === ' ') return ' '
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      })
      .join('')

    iteration++
    if (iteration >= totalIterations) {
      clearInterval(element._scrambleInterval)
      element.innerHTML = originalText
    }
  }, 30)
}

// ─── ANIMATED NUMBER COUNTER ──────────────────────────────
export function animateCounter(element, target, suffix = '', duration = 1500) {
  if (!element) return
  const start = 0
  const startTime = performance.now()

  function update(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    // Ease out
    const eased = 1 - Math.pow(1 - progress, 3)
    const current = Math.round(start + (target - start) * eased)
    element.textContent = current + suffix
    if (progress < 1) requestAnimationFrame(update)
  }

  requestAnimationFrame(update)
}

// Observe stats and animate when visible
export function initCounters() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target
          const target = parseFloat(el.dataset.target)
          const suffix = el.dataset.suffix || ''
          animateCounter(el, target, suffix)
          observer.unobserve(el)
        }
      })
    },
    { threshold: 0.5 }
  )

  statNumbers.forEach(el => observer.observe(el))
}

// ─── MAGNETIC BUTTON EFFECT ───────────────────────────────
export function initMagneticButtons() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect  = btn.getBoundingClientRect()
      const cx    = rect.left + rect.width  / 2
      const cy    = rect.top  + rect.height / 2
      const dx    = (e.clientX - cx) * 0.25
      const dy    = (e.clientY - cy) * 0.25
      btn.style.transform = `translate(${dx}px, ${dy}px)`
    })
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = ''
    })
  })
}

// ─── HERO ENTRANCE ────────────────────────────────────────
export function animateHeroEntrance() {
  const heroLeft = document.querySelector('.hero-left')
  if (heroLeft) {
    setTimeout(() => heroLeft.classList.add('animated'), 100)
  }
}

// ─── SMOOTH TAB TRANSITION ───────────────────────────────
export function tabTransition(container, newHTML) {
  container.style.opacity = '0'
  container.style.transform = 'translateY(12px)'
  container.style.transition = 'opacity 0.25s, transform 0.25s'

  setTimeout(() => {
    container.innerHTML = newHTML
    container.style.opacity = '1'
    container.style.transform = 'translateY(0)'
    setTimeout(() => reObserve(), 50)
    initMagneticButtons()
  }, 250)
}

// ─── STAGGERED LIST ANIMATION ────────────────────────────
export function staggerList(listEl, delay = 60) {
  if (!listEl) return
  const items = listEl.children
  Array.from(items).forEach((item, i) => {
    item.style.opacity = '0'
    item.style.transform = 'translateX(-16px)'
    item.style.transition = `opacity 0.4s, transform 0.4s`
    setTimeout(() => {
      item.style.opacity = '1'
      item.style.transform = 'none'
    }, i * delay + 100)
  })
}

// ─── SECTION PROGRESS INDICATOR ──────────────────────────
export function initProgressBar() {
  const bar = document.createElement('div')
  bar.id = 'scroll-progress'
  bar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 2px; width: 0%;
    background: linear-gradient(to right, #f0b90b, #ff9500);
    z-index: 9999; transition: width 0.1s; pointer-events: none;
  `
  document.body.appendChild(bar)

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY
    const total    = document.body.scrollHeight - window.innerHeight
    bar.style.width = (scrolled / total * 100) + '%'
  })
}

// ─── BACK TO TOP BUTTON ───────────────────────────────────
export function initBackToTop() {
  const btn = document.createElement('button')
  btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>'
  btn.style.cssText = `
    position: fixed; bottom: 2rem; right: 2rem;
    width: 48px; height: 48px;
    background: #f0b90b; color: #000;
    border: none; border-radius: 50%;
    font-size: 1rem; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 20px rgba(240,185,11,0.4);
    transform: translateY(100px); opacity: 0;
    transition: transform 0.4s, opacity 0.4s, box-shadow 0.3s;
    z-index: 500;
  `

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))
  btn.addEventListener('mouseenter', () => {
    btn.style.boxShadow = '0 8px 30px rgba(240,185,11,0.6)'
    btn.style.transform = 'translateY(0) scale(1.1)'
  })
  btn.addEventListener('mouseleave', () => {
    btn.style.boxShadow = '0 4px 20px rgba(240,185,11,0.4)'
    btn.style.transform = 'translateY(0) scale(1)'
  })

  document.body.appendChild(btn)

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.style.transform = 'translateY(0)'
      btn.style.opacity = '1'
    } else {
      btn.style.transform = 'translateY(100px)'
      btn.style.opacity = '0'
    }
  })
}
