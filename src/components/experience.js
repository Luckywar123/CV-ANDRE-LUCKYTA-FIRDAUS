// src/components/experience.js
import { tabTransition } from '../animations.js'

function buildExperienceHTML(position) {
  if (!position.experience || position.experience.length === 0) {
    return '<p style="color: var(--text-muted)">No experience entries for this role view.</p>'
  }

  return position.experience.map((exp, i) => `
    <div class="card card-exp" data-delay="${i * 100}">
      <div class="exp-meta">
        <div class="exp-period">${exp.period}</div>
        <div class="exp-role">${exp.role}</div>
        <div class="exp-company">${exp.company}</div>
      </div>
      <ul class="exp-list">
        ${exp.items.map(item => `
          <li class="exp-item">
            <i class="fa-solid fa-check"></i>
            <span>${item}</span>
          </li>
        `).join('')}
      </ul>
    </div>
  `).join('')
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

  return section
}

export function updateExperience(position) {
  const container = document.getElementById('experience-container')
  if (!container) return
  tabTransition(container, buildExperienceHTML(position))
}
