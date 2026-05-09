// src/components/skills.js
import { tabTransition } from '../animations.js'

function buildSkillsHTML(position) {
  if (!position.skills || position.skills.length === 0) {
    return '<p style="color: var(--text-muted)">No skills listed for this view.</p>'
  }

  return position.skills.map((cat, i) => `
    <div class="card card-skill" data-delay="${i * 100}">
      <div class="skill-category">
        <i class="${cat.icon}"></i>
        ${cat.category}
      </div>
      <div class="skill-tags">
        ${cat.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
      </div>
    </div>
  `).join('')
}

export function renderSkills(position) {
  const section = document.createElement('section')
  section.id = 'skills'
  section.className = 'section-full section-bg'

  section.innerHTML = `
    <div class="section">
      <div class="section-header">
        <span class="section-tag"><i class="fa-solid fa-code"></i> Capabilities</span>
        <h2 class="section-title">Technical Skills</h2>
      </div>
      <div id="skills-container" class="skills-grid">
        ${buildSkillsHTML(position)}
      </div>
    </div>
  `

  return section
}

export function updateSkills(position) {
  const container = document.getElementById('skills-container')
  if (!container) return
  tabTransition(container, buildSkillsHTML(position))
}
