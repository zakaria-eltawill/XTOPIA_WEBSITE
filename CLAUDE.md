# XTOPIA Website — Claude Code instructions

Static multi-page site (HTML / CSS / vanilla JS + GSAP, ScrollTrigger, Lenis, Three.js). No build step.
Deploy: GitHub Actions → GitHub Pages on every push to `main` (live at xtopia.life).

## Active work: October 2026 rebrand
- **Plan:** `docs/rebrand-2026/PLAN.md` — work phase by phase, tick checkboxes when done, add a row to the Progress log.
- **Content:** `docs/rebrand-2026/CONTENT.md` — the only source for **facts** (names, numbers, dates, projects). Never invent facts or stats. Wording is NOT copy-paste: the client wants the profile paraphrased into short, web-friendly copy (PLAN → "Client direction").
- **Structure (client):** Home = teaser of XTOPIA + each company. Each company page = more info + its **full team** (`#team`).
- Old docs (`xtopia-company-profile.md`, `xtopia-brand-identity.md`, `xtopia-website-design-plan.md`) describe the pre-October positioning. Use the brand-identity doc for logo rules/fonts only.

## Rules
- Work on branch `rebrand-oct-2026`, never commit to `main`.
- One phase per session; stop and summarise for review at the end of each phase.
- Nav/footer exist in every HTML file: change all pages (root uses `verticals/x.html`, `verticals/*` uses `../`). After Phase 1, edit `partials/` and run `python tools/sync-partials.py`.
- Bump the `?v=N` cache-busting query on CSS/JS links when CSS/JS changes.
- Fonts = the October profile's system (client decision, see PLAN Phase 0.2): **Montserrat** (titles, headlines, labels, lead text) · **Book Antiqua Italic** (italic second lines, never alone) · **Barques** (stat numbers only) · **Acumin Variable Concept** (body copy). Never use Gotham; Barques is not a heading font any more.
- Logos: the SVGs in `assets/images/rebrand-2026/logos/` are final (no originals exist). People photos: use what's in the repo. See PLAN → "Decisions already taken" before asking anything.
- Every section gets `.theme-light` or `.theme-dark`; avoid new inline styles.
- Items still marked ⚠️ CONFIRM in CONTENT.md: implement, but mark with `data-confirm` + `<!-- CONFIRM: … -->`. ✅ approved items need no marker; ❌ items are not used.
- Home "What we do" (`#flip`) is frozen (D6) — never edit it.
- Old team photo file names are wrong — pair names and photos as people.html displays them, not by file name.
- Preview: `python -m http.server 8000`.
