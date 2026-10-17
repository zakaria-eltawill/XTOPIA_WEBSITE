# XTOPIA Website — Skills & Technologies

A reference of every skill, language, library, and technique used to build and deploy
the XTOPIA website. The site is a **static, multi-page application** (no framework, no
build step) engineered for a cinematic "Architectural Dark Cinema" feel.

---

## 1. Core Languages

| Skill | How it's used |
|-------|---------------|
| **HTML5** | Hand-authored semantic pages — `index`, `about`, `verticals` hub + its 5 company pages (TROFI, BEYOND, MHYA, ARADA Saudi, XEED), `people`, `careers`, `contact` — plus `befit`/`developments` redirect stubs. Accessible landmarks, `aria-*`, `alt` text. |
| **CSS3** | Entire visual system — custom properties, grid, flexbox, `clamp()` fluid type, `mix-blend-mode`, masks, gradients, keyframe animations, media queries. |
| **JavaScript (Vanilla ES)** | All interactivity — no framework. Classic scripts + one ES module. |

---

## 2. CSS Architecture & Techniques

- **Design-token system** via CSS custom properties (`variables.css`) — colors, spacing, easing, z-index scale.
- **Modular stylesheets** loaded in cascade order: `reset → variables → typography → layout → components → sections → animations`.
- **Fluid typography** with `clamp()` for responsive headings down to mobile.
- **Self-hosted fonts** via `@font-face` (Montserrat, Barques, Acumin Variable Concept, Book Antiqua).
- **Responsive design** — breakpoints at 1440 / 1024 / 920 / 767 / 600 / 560 px.
- **Advanced visual effects:** `mix-blend-mode: difference` (adaptive nav), CSS edge-fade masks (logo walls), film-grain noise overlay, brand grid texture, blur-up image loading.
- **Adaptive logo system** — light/dark/white-black/photo card variants so every logo stays visible regardless of source color.
- **`logo-optical` system** — each business logo gets a calibrated base height (`--logo-h`) and a shared `--logo-scale` per context, so logos with wildly different aspect ratios (TROFI vs. BEYOND vs. MHYA) still read as the same optical size.
- **Theme classes** — every section carries `.theme-light` or `.theme-dark` (`css/layout.css`), the baseline every new section builds on instead of one-off inline styles.
- **October 2026 rebrand components** (`css/components.css`): `.title-split` (bold line + italic second line), `.stat-row` (big Barques number + bracketed label), `.x-mask` / `.x-watermark` (image/background clipped to the XTOPIA X), `.biz-cover` / `.biz-hero` (company-page cover and hero), `.soho-feature` (SOHO Jeddah feature block, shared by `index.html` and `verticals/mhya.html`), `.points` (numbered 2-column grid).
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
- **Stacking Focus Animation:** Pinned scroll-driven card swapping ("Our Values" section) where glassmorphism cards cross-fade and stack vertically on scroll.
- Pinned horizontal scrolling with drag fallback + visible "drag/scroll" hints.
- Infinite marquee logo walls/ticker strips (CSS keyframes) and reverse-direction logo walls.
- Count-up stat animations with locked width (no layout shift).
- Staggered reveal cascades, blur-up image entrances, custom cursor states.

---

## 6. Typography & Brand Systems

- Four-typeface system per the October 2026 profile: **Montserrat** (titles, headlines, labels,
  lead text), **Book Antiqua Italic** (italic second lines of titles, names — never used alone),
  **Barques** (stat numbers only — not a heading font), **Acumin Variable Concept** (body copy).
  See `--font-heading` / `--font-accent` / `--font-number` / `--font-body` in `css/typography.css`.
- Strict brand palette (void, cream, sage, olive, steel, navy, burgundy) tokenized in CSS.
- Editorial layout: eyebrow labels, display headlines, italic accents, tracked captions.

---

## 7. Performance & Production

- **Lazy-loading** (`loading="lazy"`) + `<link rel="preload">` for hero/fonts.
- **Cache-busting** via versioned asset query strings (`?v=N`) + no-cache meta tags.
- **Reduced-motion** path disables Lenis/Three.js/marquees.
- **Case-correct asset paths** fully verified and audited for Linux-based (GitHub Pages) hosting.
- **Production Clean-up**: Python automation scripts used during development were scrubbed prior to deployment.
- Relative paths throughout so the site runs gracefully from any root.

---

## 8. Tooling, Version Control & Deployment

| Skill | Detail |
|-------|--------|
| **Git** | Feature branches (`rebrand-oct-2026` off `main`), conventional phase-tagged commits, co-author trailers |
| **GitHub** | Remote hosting at `github.com/zakaria-eltawill/XTOPIA_WEBSITE` |
| **GitHub Pages** | Live static hosting at xtopia.life, auto-deployed by `.github/workflows/deploy-pages.yml` on every push to `main` — the workflow copies the repo to a deploy-only folder and strips `docs/`, `tools/`, `partials/`, `CLAUDE.md`, `SKILLS.md`, and `xtopia-*.md` before publishing |
| **`tools/sync-partials.py`** | Keeps the nav/mobile-overlay/footer identical across every page — edit `partials/{nav,nav-overlay,footer}.html` once, run the script, and it rewrites every page's marker-wrapped block (auto-prefixing local links with `../` under `verticals/`). Idempotent by design. |
| **PowerShell / Bash** | Local tooling, static preview server (`python -m http.server`), custom Python asset validation scripts |

**Live site:** xtopia.life (GitHub Pages, deployed from `main`).
**Repo:** https://github.com/zakaria-eltawill/XTOPIA_WEBSITE

---

## 9. UX / Product Skills

- Information architecture across the site (home, about, ecosystem hub + 5 company pages,
  people, careers, contact) with a nav/footer kept byte-identical via `partials/` + `sync-partials.py`.
- Clarity-first hero messaging (headline + explanatory subtitle).
- Wayfinding cues: scroll hints, drag hints, section eyebrows, next-vertical CTAs.
- Consistent CTA system (pill / solid / arrow conventions).
- Responsive + accessible patterns (mobile overlay menu, reduced motion, touch fallbacks).

---

*XTOPIA — A world to belong to. · Static site built with HTML, CSS,
vanilla JS, GSAP, Lenis & Three.js · Deployed on GitHub Pages.*
