// src/components/about.js
import { tabTransition } from '../animations.js'

export function renderAbout(position) {
  const section = document.createElement('section')
  section.id = 'about'
  section.className = 'section-full'

  section.innerHTML = `
    <div class="section">
      <div class="about-grid">
        <div class="about-left reveal">
          <div class="about-eyebrow">
            <i class="fa-solid fa-star"></i>
            Why Hire Me
          </div>
          <h2 id="about-title" class="about-title-big">${position.aboutTitle}</h2>
        </div>
        <div id="about-text" class="about-text reveal" style="transition-delay: 100ms">
          ${position.aboutHTML}
        </div>
      </div>
    </div>
  `

  return section
}

export function updateAbout(position) {
  const title = document.getElementById('about-title')
  const text  = document.getElementById('about-text')

  if (title) {
    title.style.opacity = '0'
    title.style.transform = 'translateY(10px)'
    title.style.transition = 'opacity 0.3s, transform 0.3s'
    setTimeout(() => {
      title.textContent = position.aboutTitle
      title.style.opacity = '1'
      title.style.transform = 'none'
    }, 300)
  }

  if (text) {
    tabTransition(text, position.aboutHTML)
  }
}
