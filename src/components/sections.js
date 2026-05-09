// src/components/sections.js
// ============================================================
// STATIC SECTIONS (don't change on tab switch)
// ============================================================
import {
  web3Experience, education, certifications,
  leadership, references, personalInfo
} from '../data/positions.js'

// ─── GOALS SECTION ────────────────────────────────────────
export function renderGoals() {
  const section = document.createElement('section')
  section.className = 'section-full'

  section.innerHTML = `
    <div class="section">
      <div class="goals-grid">
        <div class="reveal">
          <span class="section-tag" style="margin-bottom:1.5rem; display:inline-flex;">
            <i class="fa-solid fa-bullseye"></i> Career Goals
          </span>
          <h2 class="display-md" style="margin-top:1.5rem; line-height:1.2">
            Building the future of decentralized finance with full-stack Web3 and intelligent AI agents.
          </h2>
        </div>
        <div class="about-text reveal" style="transition-delay:100ms">
          <p>Seeking a challenging role in a leading Web3 company where I can leverage my full-stack development skills, treasury wallet implementation, and AI Agent expertise to create secure, scalable, and user-centric blockchain products.</p>
          <p style="margin-top:1rem">Long-term goal: Contribute to innovative DeFi solutions, on-chain treasury systems, and automated trading infrastructure that drive mass adoption of Web3 technology.</p>
        </div>
      </div>
    </div>
  `
  return section
}

// ─── WEB3 BLOCK ───────────────────────────────────────────
export function renderWeb3Block() {
  const section = document.createElement('section')
  section.className = 'section-full section-bg'

  section.innerHTML = `
    <div class="section">
      <div class="section-header">
        <span class="section-tag"><i class="fa-solid fa-cube"></i> Blockchain</span>
        <h2 class="section-title">Web3 & Blockchain Experience</h2>
      </div>
      <div class="web3-grid">
        ${web3Experience.map((item, i) => `
          <div class="card" data-delay="${i * 100}">
            <div style="display:flex; align-items:center; gap:1rem; margin-bottom:1.5rem">
              <i class="${item.icon}" style="font-size:2rem; color:var(--gold)"></i>
              <div>
                <div style="font-family:var(--font-display); font-size:1.1rem; font-weight:700">${item.title}</div>
                <div style="font-size:0.8rem; color:var(--gold)">${item.period}</div>
              </div>
            </div>
            <ul style="display:flex; flex-direction:column; gap:0.7rem">
              ${item.items.map(it => `
                <li style="display:flex; gap:0.6rem; font-size:0.88rem; color:var(--text-muted)">
                  <i class="fa-solid fa-check" style="color:var(--gold); margin-top:0.3rem; flex-shrink:0; font-size:0.65rem"></i>
                  <span>${it}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    </div>
  `
  return section
}

// ─── EDUCATION + CERTS ────────────────────────────────────
export function renderEducation() {
  const section = document.createElement('section')
  section.id = 'education'
  section.className = 'section-full'

  section.innerHTML = `
    <div class="section">
      <div class="edu-certs-grid">
        <!-- Education -->
        <div>
          <div class="section-header" style="margin-bottom:2rem">
            <span class="section-tag"><i class="fa-solid fa-graduation-cap"></i></span>
            <h2 class="section-title">Education</h2>
          </div>
          <div class="card reveal">
            <div style="color:var(--gold); font-size:0.85rem; font-weight:600; margin-bottom:0.5rem">${education.period}</div>
            <div style="font-family:var(--font-display); font-size:1.6rem; font-weight:800; letter-spacing:-0.02em; margin-bottom:0.4rem">${education.degree}</div>
            <div style="color:var(--text-muted); font-size:0.95rem; margin-bottom:1rem">${education.school} · GPA ${education.gpa}</div>
            <p style="font-style:italic; color:var(--text-muted); font-size:0.85rem; line-height:1.6">${education.thesis}</p>
          </div>
        </div>

        <!-- Certifications -->
        <div>
          <div class="section-header" style="margin-bottom:2rem">
            <span class="section-tag"><i class="fa-solid fa-certificate"></i></span>
            <h2 class="section-title">Certifications</h2>
          </div>
          <div class="cert-list">
            ${certifications.map((cert, i) => `
              <div class="card card-cert" data-delay="${i * 80}">
                <div class="cert-icon">${cert.icon}</div>
                <div>
                  <div class="cert-name">${cert.name}</div>
                  <div class="cert-sub">${cert.sub}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `
  return section
}

// ─── LEADERSHIP ───────────────────────────────────────────
export function renderLeadership() {
  const section = document.createElement('section')
  section.className = 'section-full section-bg'

  section.innerHTML = `
    <div class="section">
      <div class="section-header">
        <span class="section-tag"><i class="fa-solid fa-users"></i> Org</span>
        <h2 class="section-title">Leadership & Organizational Experience</h2>
      </div>
      <div class="leadership-grid">
        ${leadership.map((item, i) => `
          <div class="card" data-delay="${i * 100}">
            <div style="color:var(--gold); font-size:0.85rem; font-weight:600; margin-bottom:0.4rem">${item.period}</div>
            <div style="font-family:var(--font-display); font-size:1.1rem; font-weight:700; margin-bottom:0.3rem">${item.role}</div>
            <div style="color:var(--text-muted); font-size:0.85rem; margin-bottom:1.25rem">${item.org}</div>
            <ul style="display:flex; flex-direction:column; gap:0.6rem">
              ${item.items.map(it => `
                <li style="display:flex; gap:0.6rem; font-size:0.88rem; color:var(--text-muted)">
                  <i class="fa-solid fa-check" style="color:var(--gold); margin-top:0.3rem; flex-shrink:0; font-size:0.65rem"></i>
                  <span>${it}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    </div>
  `
  return section
}

// ─── CV VIEWER ────────────────────────────────────────────
export function renderCVViewer() {
  const section = document.createElement('section')
  section.id = 'cv'
  section.className = 'section-full'

  section.innerHTML = `
    <div class="section">
      <div class="section-header">
        <span class="section-tag"><i class="fa-solid fa-file-pdf"></i> DOCUMENT</span>
        <h2 class="section-title">Curriculum Vitae</h2>
      </div>

      <div class="cv-viewer-wrap reveal" style="padding: 2rem 1rem; background: #111; border-radius: 20px; text-align: center;">
        <div style="margin-bottom: 2rem;">
          <i class="fa-solid fa-file-pdf" style="font-size: 5rem; color: #f40; opacity: 0.9;"></i>
        </div>
        
        <h3 style="color: white; margin-bottom: 1rem;">Lihat CV Lengkap</h3>
        <p style="color: #aaa; max-width: 500px; margin: 0 auto 2rem;">
          PDF Viewer mengalami kendala teknis di Vercel. Silakan download langsung.
        </p>

        <a href="/CV.pdf" 
           download="Andre_Luckyta_Firdaus_CV.pdf" 
           class="btn btn-primary" 
           style="font-size: 1.2rem; padding: 1.2rem 3rem; display: inline-flex; align-items: center; gap: 0.8rem;">
          <i class="fa-solid fa-download"></i> 
          DOWNLOAD CV PDF
        </a>
      </div>

      <p style="text-align:center; color:#666; margin-top:2rem; font-size:0.9rem">
        Updated May 2026 • Andre Luckyta Firdaus
      </p>
    </div>
  `

  return section
}

// ─── CONTACT ──────────────────────────────────────────────
export function renderContact() {
  const section = document.createElement('section')
  section.className = 'section-full section-bg'

  section.innerHTML = `
    <div class="section">
      <div class="contact-grid">
        <!-- References -->
        <div class="reveal">
          <div class="section-header" style="margin-bottom:2rem">
            <span class="section-tag"><i class="fa-solid fa-address-book"></i></span>
            <h2 class="section-title">References</h2>
          </div>
          ${references.map(ref => `
            <div style="margin-bottom:1.5rem">
              <div style="font-weight:600; font-size:1rem; margin-bottom:0.25rem">${ref.name}</div>
              <div style="color:var(--text-muted); font-size:0.85rem; margin-bottom:0.25rem">${ref.title}</div>
              <div style="color:var(--gold); font-size:0.85rem">${ref.phone}</div>
            </div>
          `).join('')}

          <div style="margin-top:2rem; display:flex; flex-direction:column; gap:0.75rem">
            <div style="display:flex; align-items:center; gap:0.5rem; font-size:0.85rem; color:var(--text-muted)">
              <i class="fa-solid fa-phone" style="color:var(--gold)"></i>
              ${personalInfo.phone}
            </div>
            <div style="display:flex; align-items:center; gap:0.5rem; font-size:0.85rem; color:var(--text-muted)">
              <i class="fa-solid fa-location-dot" style="color:var(--gold)"></i>
              ${personalInfo.location}
            </div>
            <div style="display:flex; align-items:center; gap:0.5rem; font-size:0.85rem; color:var(--text-muted)">
              <i class="fa-solid fa-globe" style="color:var(--gold)"></i>
              ${personalInfo.availability}
            </div>
            <div style="display:flex; align-items:center; gap:0.5rem; font-size:0.85rem; color:var(--gold)">
              <i class="fa-solid fa-shield-check"></i>
              Passport · Police Record · Ready
            </div>
          </div>
        </div>

        <!-- Email CTA -->
        <div class="reveal" style="text-align:right; transition-delay:150ms">
          <p style="color:var(--text-dim); font-size:0.85rem; margin-bottom:1.5rem; text-transform:uppercase; letter-spacing:0.08em">Let's work together</p>
          <a href="mailto:${personalInfo.email}" class="contact-email-link">
            ${personalInfo.email}
          </a>
          <div style="margin-top:2rem; text-align:right">
            <a href="${personalInfo.cvFile}" download="Andre_Luckyta_Firdaus_CV.pdf" class="btn btn-outline" style="display:inline-flex">
              <i class="fa-solid fa-download"></i>
              Download Full CV
            </a>
          </div>
        </div>
      </div>
    </div>
  `
  return section
}
