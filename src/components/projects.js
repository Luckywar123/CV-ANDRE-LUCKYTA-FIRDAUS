// src/components/projects.js
import { tabTransition } from '../animations.js'

function buildProjectsHTML(position) {
  if (!position.projects || position.projects.length === 0) {
    return '<p style="color: var(--text-muted)">No projects for this view.</p>'
  }

  return position.projects.map((proj, i) => `
    <div class="card card-project" data-delay="${i * 100}">
      <div class="project-title">
        <i class="${proj.icon}"></i>
        ${proj.title}
      </div>
      <div class="project-period">${proj.period}</div>
      <p class="project-desc">${proj.desc}</p>
    </div>
  `).join('')
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

  return section
}

export function updateProjects(position) {
  const container = document.getElementById('projects-container')
  if (!container) return
  tabTransition(container, buildProjectsHTML(position))
}
