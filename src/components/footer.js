// src/components/footer.js
import { personalInfo } from '../data/positions.js'

export function renderFooter() {
  const footer = document.createElement('footer')
  footer.id = 'footer'

  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-top">
        <!-- Logo + Name -->
        <div style="display:flex; align-items:center; gap:0.75rem">
          <div style="
            width:40px; height:40px;
            background: linear-gradient(135deg, #f0b90b, #ffcc33, #ff9500);
            border-radius:12px;
            display:flex; align-items:center; justify-content:center;
            font-family:var(--font-display); font-size:1.3rem; font-weight:800; color:#000;
          ">A</div>
          <div>
            <div style="font-family:var(--font-display); font-weight:700; font-size:0.95rem">Andre Luckyta Firdaus</div>
            <div style="font-size:0.7rem; color:var(--text-dim)">Full-Stack Web3 · AI Agent · Treasury Wallet</div>
          </div>
        </div>

        <!-- Social links -->
        <div class="social-links">
          <a href="${personalInfo.linkedin}" target="_blank" class="social-link" title="LinkedIn">
            <i class="fa-brands fa-linkedin-in"></i>
          </a>
          <a href="${personalInfo.github}" target="_blank" class="social-link" title="GitHub">
            <i class="fa-brands fa-github"></i>
          </a>
          <a href="${personalInfo.twitter}" target="_blank" class="social-link" title="X / Twitter">
            <i class="fa-brands fa-x-twitter"></i>
          </a>
          <a href="${personalInfo.telegram}" target="_blank" class="social-link" title="Telegram">
            <i class="fa-brands fa-telegram"></i>
          </a>
          <a href="mailto:${personalInfo.email}" class="social-link" title="Email">
            <i class="fa-solid fa-envelope"></i>
          </a>
        </div>

        <!-- Location -->
        <div style="text-align:right">
          <div style="font-size:0.82rem; color:var(--text-muted); margin-bottom:0.25rem">
            <i class="fa-solid fa-location-dot" style="color:var(--gold); margin-right:0.3rem"></i>
            Jakarta, Indonesia
          </div>
          <div style="font-size:0.75rem; color:var(--text-dim)">Open to Remote / Web3 Opportunities</div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>
          © 2026 Andre Luckyta Firdaus ·
          Dynamic CV for Full-Stack Web3, AI Agent, Treasury Wallet & Blockchain Roles
          <span style="color:var(--border); margin:0 0.5rem">·</span>
          <span style="color:var(--text-dim); font-size:0.7rem">
            This website does not collect personal data or use tracking cookies.
          </span>
        </p>
      </div>
    </div>
  `

  return footer
}
