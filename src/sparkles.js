// src/sparkles.js — gold sparkle particles on a canvas that sits above the photo lens.
const rnd = (a, b) => a + Math.random() * (b - a)
const COLORS = ['255,214,102', '255,240,200', '240,185,11', '255,160,60', '255,255,255']

export function createSparkles(container) {
  const canvas = document.createElement('canvas')
  canvas.className = 'photo-sparkles'
  canvas.setAttribute('aria-hidden', 'true')
  container.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  let w = 0, h = 0, parts = [], raf = null, last = 0

  function resize() {
    const r = container.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    w = r.width; h = r.height
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  new ResizeObserver(resize).observe(container)
  resize()

  function spawn(x, y, o = {}) {
    if (parts.length > 200) return
    const a = Math.random() * Math.PI * 2, sp = rnd(0.05, o.spread || 0.5)
    parts.push({
      x, y, vx: (o.vx || 0) + Math.cos(a) * sp, vy: (o.vy || 0) + Math.sin(a) * sp - 0.18,
      age: 0, max: rnd(...(o.life || [650, 1200])), size: rnd(...(o.size || [1.4, 4.2])),
      rot: Math.random() * Math.PI, spin: rnd(-0.06, 0.06), tw: Math.random() * 6.28,
      color: COLORS[Math.floor(Math.random() * COLORS.length)], star: Math.random() < 0.7,
    })
    start()
  }

  // sparkles drifting inside the lens circle
  function emitLens(x, y, r, n = 1) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, rr = r * Math.sqrt(Math.random())
      spawn(x + Math.cos(a) * rr, y + Math.sin(a) * rr, { size: [2, 5.4], life: [700, 1300] })
    }
  }
  // sparkles shed from the cursor while it moves
  function trail(x, y, speed) {
    const n = Math.min(3, Math.floor(speed / 6))
    for (let i = 0; i < n; i++) spawn(x + rnd(-8, 8), y + rnd(-8, 8), { spread: 0.7, life: [500, 1000], size: [2, 5] })
  }
  // sparkles along an expanding ring (click ripple)
  function emitRing(x, y, r, n = 4) {
    const k = Math.max(1, Math.round(n * Math.min(1, 140 / Math.max(r, 40))))
    for (let i = 0; i < k; i++) {
      const a = Math.random() * Math.PI * 2
      spawn(x + Math.cos(a) * r, y + Math.sin(a) * r, { vx: Math.cos(a) * 0.9, vy: Math.sin(a) * 0.9, spread: 0.4, life: [500, 950], size: [1.8, 5] })
    }
  }
  function burst(x, y, n = 36) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, s = rnd(0.6, 2.6)
      spawn(x, y, { vx: Math.cos(a) * s, vy: Math.sin(a) * s, spread: 0.3, life: [600, 1100], size: [1.8, 5.5] })
    }
  }

  function drawStar(p, a) {
    const s = p.size * (0.65 + 0.35 * Math.sin(p.tw)), L = s * 2.3, c = s * 0.28
    ctx.save()
    ctx.translate(p.x, p.y); ctx.rotate(p.rot)
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 3)
    g.addColorStop(0, `rgba(${p.color},${0.45 * a})`); g.addColorStop(1, `rgba(${p.color},0)`)
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, s * 3, 0, 6.283); ctx.fill()
    ctx.fillStyle = `rgba(${p.color},${a})`
    ctx.beginPath()
    ctx.moveTo(0, -L); ctx.quadraticCurveTo(c, -c, L, 0); ctx.quadraticCurveTo(c, c, 0, L)
    ctx.quadraticCurveTo(-c, c, -L, 0); ctx.quadraticCurveTo(-c, -c, 0, -L); ctx.fill()
    ctx.restore()
  }

  function frame(t) {
    const dt = Math.min(48, t - last || 16); last = t
    ctx.clearRect(0, 0, w, h)
    ctx.globalCompositeOperation = 'lighter'
    parts = parts.filter(p => (p.age += dt) < p.max)
    for (const p of parts) {
      const k = p.age / p.max, a = Math.sin(Math.PI * Math.min(1, k * 1.15)) // fade in + out
      p.x += p.vx * dt * 0.06; p.y += p.vy * dt * 0.06; p.vy -= 0.0006 * dt; p.rot += p.spin; p.tw += 0.18
      if (p.star) drawStar(p, Math.max(0, a))
      else { ctx.fillStyle = `rgba(${p.color},${0.8 * Math.max(0, a)})`; ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 0.55, 0, 6.283); ctx.fill() }
    }
    raf = parts.length ? requestAnimationFrame(frame) : null
    if (!raf) ctx.clearRect(0, 0, w, h)
  }
  function start() { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame) } }

  return { emitLens, trail, emitRing, burst }
}
