// src/components/experience.js
import { tabTransition } from '../animations.js'

function buildExperienceHTML(position) {
  if (!position.experience || position.experience.length === 0) {
    return '<p style="color: var(--text-muted)">No experience entries for this role view.</p>'
  }

  const SHOW = 3
  return position.experience.map((exp, i) => {
    const extra = Math.max(0, exp.items.length - SHOW)
    return `
    <div class="card card-exp ${extra ? 'is-collapsible collapsed' : ''}" data-delay="${i * 100}">
      <span class="tl-marker"></span>
      <div class="exp-meta">
        <div class="exp-period">${exp.period}</div>
        <div class="exp-role">${exp.role}</div>
        <div class="exp-company">${exp.company}</div>
      </div>
      <div>
        <ul class="exp-list">
          ${exp.items.map((item, k) => `
            <li class="exp-item ${k >= SHOW ? 'exp-extra' : ''}">
              <i class="fa-solid fa-check"></i>
              <span>${item}</span>
            </li>
          `).join('')}
        </ul>
        ${extra ? `<button class="exp-toggle" type="button" aria-expanded="false">Show ${extra} more <i class="fa-solid fa-chevron-down"></i></button>` : ''}
      </div>
    </div>
  `}).join('')
}

export function renderExperience(position) {
  const section = document.createElement('section')
  section.id = 'experience'
  section.className = 'section-full section-bg'

  section.innerHTML = `
    <div class="section">
      <div class="section-header">
        <span class="section-tag"><i class="fa-solid fa-briefcase"></i> Work History</span>
        <h2 class="section-title">Experience</h2>
      </div>
      <div id="experience-container" class="experience-list">
        ${buildExperienceHTML(position)}
      </div>
    </div>
  `

  section.querySelector('#experience-container').addEventListener('click', e => {
    const btn = e.target.closest('.exp-toggle')
    if (!btn) return
    const card = btn.closest('.card-exp')
    const collapsed = card.classList.toggle('collapsed')
    btn.setAttribute('aria-expanded', String(!collapsed))
    const n = card.querySelectorAll('.exp-extra').length
    btn.innerHTML = collapsed ? `Show ${n} more <i class="fa-solid fa-chevron-down"></i>` : `Show less <i class="fa-solid fa-chevron-up"></i>`
  })

  return section
}

export function updateExperience(position) {
  const container = document.getElementById('experience-container')
  if (!container) return
  tabTransition(container, buildExperienceHTML(position))
}
