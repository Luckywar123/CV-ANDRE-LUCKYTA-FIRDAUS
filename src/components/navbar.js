// src/components/navbar.js
import { positions, personalInfo } from '../data/positions.js'

export function renderNavbar(onTabChange) {
  const nav = document.createElement('nav')
  nav.id = 'navbar'

  nav.innerHTML = `
    <div class="nav-inner">
      <!-- LOGO -->
      <div class="nav-logo">
        <div class="logo-icon" title="Back to top" onclick="window.scrollTo({top:0,behavior:'smooth'})">A</div>
        <div>
          <div class="logo-name">Andre Luckyta Firdaus</div>
        </div>
        <span id="nav-role-badge" class="logo-role-badge">FULL-STACK WEB3 + AI AGENT</span>
      </div>

      <!-- TABS (desktop) -->
      <div class="nav-tabs" id="nav-tabs">
        ${positions.map((pos, i) => `
          <button
            class="nav-tab ${i === 0 ? 'active' : ''}"
            id="tab-${pos.id}"
            data-id="${pos.id}"
          >${pos.tabLabel}</button>
        `).join('')}
      </div>

      <!-- ACTIONS -->
      <div class="nav-actions">
        <a href="mailto:${personalInfo.email}"
           class="btn btn-primary">
          <i class="fa-solid fa-paper-plane"></i>
          <span class="hide-sm">GET IN TOUCH</span>
        </a>
        <a href="${personalInfo.cvFile}"
           download="Andre_Luckyta_Firdaus_CV.pdf"
           class="btn btn-outline">
          <i class="fa-solid fa-download"></i>
          <span>CV</span>
        </a>
        <button class="btn btn-menu" id="mobile-menu-btn" aria-label="Menu">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
    </div>

    <!-- MOBILE MENU -->
    <div id="mobile-menu">
      <div class="mobile-tabs">
        ${positions.map((pos, i) => `
          <button class="mobile-tab ${i === 0 ? 'active' : ''}" data-id="${pos.id}">
            ${pos.tabLabel}
          </button>
        `).join('')}
      </div>
    </div>
  `

  // Tab click handlers (desktop)
  nav.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const id = parseInt(tab.dataset.id)
      setActiveTab(id)
      onTabChange(id)
    })
  })

  // Mobile menu toggle
  const mobileBtn  = nav.querySelector('#mobile-menu-btn')
  const mobileMenu = nav.querySelector('#mobile-menu')
  mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open')
    const icon = mobileBtn.querySelector('i')
    icon.className = mobileMenu.classList.contains('open')
      ? 'fa-solid fa-xmark'
      : 'fa-solid fa-bars'
  })

  // Mobile tab click
  nav.querySelectorAll('.mobile-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const id = parseInt(tab.dataset.id)
      setActiveTab(id)
      onTabChange(id)
      mobileMenu.classList.remove('open')
      mobileBtn.querySelector('i').className = 'fa-solid fa-bars'
    })
  })

  function setActiveTab(id) {
    // Desktop tabs
    nav.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'))
    const activeTab = nav.querySelector(`#tab-${id}`)
    if (activeTab) {
      activeTab.classList.add('active')
      // Scroll tab into view
      activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }

    // Mobile tabs
    nav.querySelectorAll('.mobile-tab').forEach(t => t.classList.remove('active'))
    const activeMobileTab = nav.querySelectorAll('.mobile-tab')[id]
    if (activeMobileTab) activeMobileTab.classList.add('active')

    // Update badge
    const badge = nav.querySelector('#nav-role-badge')
    if (badge) badge.textContent = positions[id].badge
  }

  // Expose setActiveTab globally for main.js
  nav._setActiveTab = setActiveTab

  return nav
}
