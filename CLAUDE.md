# XTOPIA Website — Claude Code instructions

Static multi-page site (HTML / CSS / vanilla JS + GSAP, ScrollTrigger, Lenis, Three.js). No build step.
Deploy: GitHub Actions → GitHub Pages on every push to `main` (live at xtopia.life).

## Active work: October 2026 rebrand
- **Plan:** `docs/rebrand-2026/PLAN.md` — work phase by phase, tick checkboxes when done, add a row to the Progress log.
- **Content:** `docs/rebrand-2026/CONTENT.md` — the only source for copy and numbers. Never invent copy or stats.
- Old docs (`xtopia-company-profile.md`, `xtopia-brand-identity.md`, `xtopia-website-design-plan.md`) describe the pre-October positioning. Use the brand-identity doc for logo rules/fonts only.

## Rules
- Work on branch `rebrand-oct-2026`, never commit to `main`.
- One phase per session; stop and summarise for review at the end of each phase.
- Nav/footer exist in every HTML file: change all pages (root uses `verticals/x.html`, `verticals/*` uses `../`). After Phase 1, edit `partials/` and run `python tools/sync-partials.py`.
- Bump the `?v=N` cache-busting query on CSS/JS links when CSS/JS changes.
- Fonts: Barques (display), Book Antiqua italic (accent, never alone), Acumin Variable Concept (body/labels). Do not use Gotham.
- Every section gets `.theme-light` or `.theme-dark`; avoid new inline styles.
- Items marked ⚠️ CONFIRM in CONTENT.md: implement, but mark with `data-confirm` + `<!-- CONFIRM: … -->`.
- Preview: `python -m http.server 8000`.
