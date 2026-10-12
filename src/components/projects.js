// src/components/projects.js — proof cards + case-study modal
import { tabTransition } from '../animations.js'
import { findProof } from '../data/proofs.js'

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

let currentProjects = []

function buildProjectsHTML(position) {
  if (!position.projects || position.projects.length === 0) {
    return '<p style="color: var(--text-muted)">No projects for this view.</p>'
  }
  currentProjects = position.projects

  return position.projects.map((proj, i) => {
    const proof = findProof(proj.title)
    return `
    <div class="card card-project" data-delay="${i * 100}" data-idx="${i}" tabindex="0" role="button" aria-label="Open details: ${esc(proj.title)}">
      <div class="proof-media ${proof?.proofImage ? '' : 'no-img'}">
        ${proof?.proofImage
          ? `<img src="${esc(proof.proofImage)}" alt="${esc(proj.title)}" loading="lazy" />`
          : `<i class="${proj.icon}"></i>`}
        <span class="proof-open"><i class="fa-solid fa-expand"></i></span>
      </div>
      <div class="project-title">${proj.title}</div>
      <div class="project-period">${proj.period}</div>
      <p class="project-desc">${proj.desc}</p>
      ${proof?.stack?.length ? `<div class="proof-badges">${proof.stack.map(t => `<span>${esc(t)}</span>`).join('')}</div>` : ''}
      ${proof?.metrics?.length ? `<div class="proof-metrics">${proof.metrics.map(m => `<span><i class="fa-solid fa-bolt"></i>${esc(m)}</span>`).join('')}</div>` : ''}
      ${proof && (proof.liveUrl || proof.repoUrl) ? `
        <div class="proof-links">
          ${proof.liveUrl ? `<a href="${esc(proof.liveUrl)}" target="_blank" rel="noopener" data-stop>Live <i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ''}
          ${proof.repoUrl ? `<a href="${esc(proof.repoUrl)}" target="_blank" rel="noopener" data-stop>Code <i class="fa-brands fa-github"></i></a>` : ''}
        </div>` : ''}
    </div>`
  }).join('')
}

// ─── MODAL ────────────────────────────────────────────────
function ensureModal() {
  let m = document.getElementById('proof-modal')
  if (m) return m
  m = document.createElement('div')
  m.id = 'proof-modal'
  m.hidden = true
  m.innerHTML = `<div class="pm-backdrop"></div><div class="pm-box" role="dialog" aria-modal="true"><button class="pm-close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button><div class="pm-body"></div></div>`
  document.body.appendChild(m)
  const close = () => { m.hidden = true; document.body.classList.remove('modal-open') }
  m.querySelector('.pm-backdrop').onclick = close
  m.querySelector('.pm-close').onclick = close
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !m.hidden) close() })
  return m
}

function openModal(idx) {
  const proj = currentProjects[idx]
  if (!proj) return
  const proof = findProof(proj.title)
  const cs = proof?.caseStudy || {}
  const rows = [['Problem', cs.problem], ['Solution', cs.solution], ['Result', cs.result]].filter(r => r[1])
  const m = ensureModal()
  m.querySelector('.pm-body').innerHTML = `
    <div class="pm-icon"><i class="${proj.icon}"></i></div>
    <h3>${proj.title}</h3>
    <div class="project-period">${proj.period}</div>
    <p class="pm-desc">${proj.desc}</p>
    ${proof?.highlights?.length ? `<ul class="pm-list">${proof.highlights.map(h => `<li><i class="fa-solid fa-check"></i>${esc(h)}</li>`).join('')}</ul>` : ''}
    ${rows.length ? `<div class="pm-case">${rows.map(([k, v]) => `<div><b>${k}</b><p>${esc(v)}</p></div>`).join('')}</div>` : ''}
    ${proof?.stack?.length ? `<div class="proof-badges">${proof.stack.map(t => `<span>${esc(t)}</span>`).join('')}</div>` : ''}
    ${proof && (proof.liveUrl || proof.repoUrl) ? `<div class="proof-links pm-links">
      ${proof.liveUrl ? `<a class="btn btn-primary" href="${esc(proof.liveUrl)}" target="_blank" rel="noopener">Live demo</a>` : ''}
      ${proof.repoUrl ? `<a class="btn btn-outline" href="${esc(proof.repoUrl)}" target="_blank" rel="noopener">Source code</a>` : ''}
    </div>` : ''}`
  m.hidden = false
  document.body.classList.add('modal-open')
  m.querySelector('.pm-close').focus()
}

export function renderProjects(position) {
  const section = document.createElement('section')
  section.id = 'projects'
  section.className = 'section-full'

  section.innerHTML = `
    <div class="section">
      <div class="section-header">
        <span class="section-tag"><i class="fa-solid fa-rocket"></i> Portfolio</span>
        <h2 class="section-title">Key Projects & Live Web3 Platform</h2>
      </div>
      <div id="projects-container" class="projects-grid">
        ${buildProjectsHTML(position)}
      </div>
    </div>
  `

  const container = section.querySelector('#projects-container')
  const handle = e => {
    if (e.target.closest('[data-stop]') || e.target.closest('a')) return
    const card = e.target.closest('.card-project')
    if (card) openModal(parseInt(card.dataset.idx, 10))
  }
  container.addEventListener('click', handle)
  container.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handle(e) } })

  return section
}

export function updateProjects(position) {
  const container = document.getElementById('projects-container')
  if (!container) return
  tabTransition(container, buildProjectsHTML(position))
}
