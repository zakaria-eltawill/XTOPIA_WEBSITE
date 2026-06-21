# XTOPIA Website — Skills & Technologies

A reference of every skill, language, library, and technique used to build and deploy
the XTOPIA website. The site is a **static, multi-page application** (no framework, no
build step) engineered for a cinematic "Architectural Dark Cinema" feel.

---

## 1. Core Languages

| Skill | How it's used |
|-------|---------------|
| **HTML5** | 11 hand-authored semantic pages (`index`, `about`, `verticals` + 5 detail pages, `projects`, `community`, `contact`). Accessible landmarks, `aria-*`, `alt` text. |
| **CSS3** | Entire visual system — custom properties, grid, flexbox, `clamp()` fluid type, `mix-blend-mode`, masks, gradients, keyframe animations, media queries. |
| **JavaScript (Vanilla ES)** | All interactivity — no framework. Classic scripts + one ES module. |

---

## 2. CSS Architecture & Techniques

- **Design-token system** via CSS custom properties (`variables.css`) — colors, spacing, easing, z-index scale.
- **Modular stylesheets** loaded in cascade order: `reset → variables → typography → layout → components → sections → animations`.
- **Fluid typography** with `clamp()` for responsive headings down to mobile.
- **Self-hosted fonts** via `@font-face` (Barques, Acumin Variable Concept, Book Antiqua).
- **Responsive design** — breakpoints at 1440 / 1024 / 920 / 767 / 600 / 560 px.
- **Advanced visual effects:** `mix-blend-mode: difference` (adaptive nav), CSS edge-fade masks (logo walls), film-grain noise overlay, brand grid texture, blur-up image loading.
- **Adaptive logo system** — light/dark/white-black/photo card variants so every logo stays visible regardless of source color.
- **Accessibility:** full `prefers-reduced-motion` fallbacks; focus-visible states.

---

## 3. JavaScript Skills

| File | Skill demonstrated |
|------|--------------------|
| `main.js` | App init, Lenis + GSAP wiring, `IntersectionObserver` reveal system, blur-up image loading, reduced-motion guards |
| `loader.js` | Real-progress preloader (tracks images + `document.fonts.ready`), `sessionStorage` gating, safety timeout |
| `cursor.js` | Custom magnetic cursor with `requestAnimationFrame` lerp + event delegation |
| `nav.js` | Scroll-state nav, full-screen mobile overlay, hamburger toggle |
| `three-hero.js` | **Three.js** 3D grid hero (ES module), render loop, visibility pause, dispose on `pagehide` |
| `scroll-animations.js` | GSAP **ScrollTrigger** pins, scrubs, count-ups (no-reflow), floor-stack reveals |
| `horizontal-scroll.js` | GSAP pinned horizontal scroll, pointer-drag carousel, accordion logic |
| `contact-form.js` | Floating-label UX + simulated submit lifecycle |

Concepts: `IntersectionObserver`, `requestAnimationFrame`, pointer events, event
delegation, `matchMedia`, ES modules, DOM injection.

---

## 4. Libraries & Frameworks (via CDN)

| Library | Purpose |
|---------|---------|
| **GSAP 3** | Core animation engine |
| **GSAP ScrollTrigger** | Scroll-driven pinning, scrubbing, reveals, horizontal scroll |
| **Lenis** | Smooth-scroll momentum (desktop) |
| **Three.js (r160, ES module)** | 3D grid hero / particle field |

---

## 5. Motion & Interaction Design

- Scroll-driven storytelling (pinned "flip" statement, philosophy screens).
- Pinned horizontal scrolling with drag fallback + visible "drag/scroll" hints.
- Infinite marquee tickers (CSS keyframes) and reverse-direction logo walls.
- Count-up stat animations with locked width (no layout shift).
- Staggered reveal cascades, blur-up image entrances, custom cursor states.

---

## 6. Typography & Brand Systems

- Multi-typeface pairing: **Barques** (display), **Book Antiqua** italic (accent), **Acumin Variable Concept** (labels).
- Strict brand palette (void, cream, sage, olive, steel, navy, burgundy) tokenized in CSS.
- Editorial layout: eyebrow labels, display headlines, italic accents, tracked captions.

---

## 7. Performance & Production

- **Lazy-loading** (`loading="lazy"`) + `<link rel="preload">` for hero/fonts.
- **Cache-busting** via versioned asset query strings (`?v=N`) + no-cache meta tags.
- **Reduced-motion** path disables Lenis/Three.js/marquees.
- **Case-correct asset paths** audited for Linux (GitHub Pages) hosting.
- Relative paths throughout so the site runs under a subpath (`/XTOPIA_WEBSITE/`).

---

## 8. Tooling, Version Control & Deployment

| Skill | Detail |
|-------|--------|
| **Git** | Repository init, feature commits, conventional messages, co-author trailers |
| **GitHub** | Remote hosting at `github.com/zakaria-eltawill/XTOPIA_WEBSITE` |
| **GitHub Actions** | CI/CD workflow (`deploy-pages.yml`) — auto-build & deploy on push |
| **GitHub Pages** | Live static hosting; `.nojekyll`; self-enabled via Actions |
| **PowerShell / Bash** | Local tooling, static preview server (`python -m http.server`) |

**Live:** https://zakaria-eltawill.github.io/XTOPIA_WEBSITE/
**Repo:** https://github.com/zakaria-eltawill/XTOPIA_WEBSITE

---

## 9. UX / Product Skills

- Information architecture across an 11-page site with consistent global nav + footer.
- Clarity-first hero messaging (headline + explanatory subtitle).
- Wayfinding cues: scroll hints, drag hints, section eyebrows, next-vertical CTAs.
- Consistent CTA system (pill / solid / arrow conventions).
- Responsive + accessible patterns (mobile overlay menu, reduced motion, touch fallbacks).

---

*XTOPIA — Community-Driven Platform · Static site built with HTML, CSS,
vanilla JS, GSAP, Lenis & Three.js · Deployed on GitHub Pages.*
