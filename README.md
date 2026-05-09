# Andre Luckyta Firdaus — Dynamic CV (Vite)

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## 📦 Build for Production

```bash
npm run build
```

Output in `/dist` — ready for Vercel/Netlify.

## 🗂️ Project Structure

```
cv-vite/
├── index.html                   ← Main HTML entry point
├── package.json
├── vite.config.js
├── public/
│   ├── CV.pdf                   ← ⬅ Put your CV PDF here
│   └── images/
│       ├── WEB3.png             ← ⬅ Primary photo (used first)
│       ├── photo2.jpg           ← ⬅ Second photo (click to swap)
│       └── photo3.jpg           ← ⬅ Third photo (click to swap)
└── src/
    ├── main.js                  ← App entry — assembles all components
    ├── style.css                ← All styles & CSS variables
    ├── animations.js            ← Cursor, particles, scramble, counters, reveals
    ├── data/
    │   └── positions.js         ← ⬅ EDIT THIS — all CV content by role
    └── components/
        ├── navbar.js            ← Sticky nav with role tabs
        ├── hero.js              ← Hero section + photo swap
        ├── about.js             ← About / summary
        ├── experience.js        ← Work history (changes per tab)
        ├── projects.js          ← Projects grid (changes per tab)
        ├── skills.js            ← Skills cards (changes per tab)
        ├── sections.js          ← Goals, Web3, Education, Leadership, CV, Contact
        └── footer.js            ← Footer with social links
```

## ✏️ Customizing Content

All CV content lives in **`src/data/positions.js`** — edit this one file to update everything:

- `positions[]` — Tab data (badge, hero text, experience, projects, skills)
- `photos[]`    — Photo swap images (add paths here)
- `personalInfo` — Name, email, phone, social links
- `education`   — School info
- `certifications[]` — Certs list
- `leadership[]` — Org experience
- `web3Experience[]` — Web3 specific cards
- `references[]` — Reference contacts

## 📸 Adding Photos

1. Place images in `public/images/`
2. Add entries to `photos[]` in `src/data/positions.js`:

```js
export const photos = [
  { src: '/images/WEB3.png',      label: 'Web3 Mode 🚀' },
  { src: '/images/formal.jpg',    label: 'Professional 💼' },
  { src: '/images/creative.jpg',  label: 'Creative ✨' },
]
```

**Click the photo** to cycle through. Dots at the bottom also work.

## 🎨 Animations Included

| Feature | Description |
|---|---|
| Custom cursor | Gold dot + ring follows mouse |
| Particles | Floating connected nodes in background |
| Scroll reveal | Cards and sections animate in on scroll |
| Text scramble | Hero title scrambles when switching tabs |
| Number counters | Stats count up when visible |
| Photo swap | Click photo for smooth transition |
| Magnetic buttons | Buttons attract to mouse |
| Progress bar | Gold scroll progress at top of page |
| Back to top | Floating button appears after scrolling |
| Keyboard nav | ← → arrow keys switch tabs |

## ⌨️ Keyboard Shortcuts

- `← →` Arrow keys: Switch between role tabs

## 🌐 Deploy to Vercel

```bash
npm run build
# Then drag the /dist folder to vercel.com
# OR connect your GitHub repo to Vercel
```

Add a `vercel.json` for SPA routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## 🔧 Customizing Colors

Edit CSS variables in `src/style.css`:

```css
:root {
  --gold:       #f0b90b;   /* Main accent color */
  --gold-light: #ffcc33;
  --orange:     #ff6b35;   /* Secondary accent */
  --bg:         #080808;   /* Background */
}
```
