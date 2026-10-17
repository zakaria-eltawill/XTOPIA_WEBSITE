# XTOPIA — Website

Cinematic, scroll-driven website for XTOPIA — a Jeddah-based platform that builds companies
around people, alongside entrepreneurs and operators who know their sector from the inside.
The ecosystem spans five businesses: **TROFI** (food & hospitality), **BEYOND** (sports &
active living), **MHYA** (development & places), **ARADA Saudi** (a master-planned-communities
partnership), and **XEED** (agriculture & food).

Static site: **HTML / CSS / vanilla JS**, with GSAP + ScrollTrigger, Lenis smooth scroll,
and a Three.js 3D grid hero. No build step.

## Run it

A static server is recommended (the Three.js hero loads as an ES module from a CDN, which
some browsers block over `file://`):

```bash
# from this folder
python -m http.server 8000
# then open http://localhost:8000/
```

Any static server works (`npx serve`, VS Code Live Server, etc.).

## Deploy

GitHub Pages, auto-deployed by `.github/workflows/deploy-pages.yml` on every push to `main`
(live at xtopia.life). The workflow copies the repo to a deploy-only folder and strips
`docs/`, `tools/`, `partials/`, `CLAUDE.md`, `SKILLS.md`, and `xtopia-*.md` before publishing —
those stay in git history but are never served publicly.

**Never push directly to `main`.** Rebrand work happens on `rebrand-oct-2026`; merge to `main`
only after the client has approved a preview (see `docs/rebrand-2026/PLAN.md`, Phase 8).

## Pages

| Page | File |
|------|------|
| Home | `index.html` |
| About (story · XTOPIA Advantage · footprint) | `about.html` |
| Ecosystem hub | `verticals.html` |
| TROFI — Food & Hospitality | `verticals/trofi.html` |
| BEYOND — Sports & Active Living | `verticals/beyond.html` |
| MHYA — Development & Places | `verticals/mhya.html` |
| ARADA Saudi — Master-planned Communities (partnership) | `verticals/arada.html` |
| XEED — Agriculture & Food | `verticals/xeed.html` |
| People (board · group leadership · links to each company's team) | `people.html` |
| Careers | `careers.html` |
| Contact | `contact.html` |
| *(redirect)* BeFit 360 → `beyond.html#sports` | `verticals/befit.html` |
| *(redirect)* XTOPIA Developments → `mhya.html` | `verticals/developments.html` |

Each company page carries its own `#team` section with that business's full team — People
only shows group-level leadership and links out to each page's team.

## Structure

```
css/        reset · variables · typography · layout · components · sections · animations
js/         main · loader · cursor · nav · three-hero · scroll-animations · horizontal-scroll · contact-form
partials/   nav.html · nav-overlay.html · footer.html — single source for the shared nav/overlay/footer
tools/      sync-partials.py — pushes partials/ into every page's nav/overlay/footer markers
assets/
  Fonts/        Montserrat, Book Antiqua (italic), Barques, Acumin Variable Concept
  images/       logos · icons · maps · photos (all wired to their sections)
  images/rebrand-2026/   assets extracted for the October 2026 rebrand (logos, people, photos, maps)
  _archive/     assets no longer referenced anywhere — kept, not deleted; see its README.md
docs/
  rebrand-2026/  PLAN.md (phase-by-phase plan) and CONTENT.md (source of facts/copy for the rebrand)
```

## Keeping the nav/footer in sync

The nav, mobile nav overlay, and footer are duplicated across every page (each wrapped in
`<!-- @nav:start -->…<!-- @nav:end -->`-style markers). Edit `partials/nav.html`,
`partials/nav-overlay.html`, or `partials/footer.html`, then run:

```bash
python tools/sync-partials.py
```

It rewrites every local `href`/`src` inside the partial with the right `../` prefix for pages
under `verticals/`, and is idempotent — running it twice in a row makes no further changes.

## Notes

- **Fonts**: Montserrat (titles, headlines, labels, lead text), Book Antiqua Italic (italic
  second lines of titles, names — never used alone), Barques (stat numbers only, not headings),
  Acumin Variable Concept (body copy). See `css/typography.css` for the `--font-*` tokens.
- **Theme classes**: every section carries `.theme-light` or `.theme-dark` (see `css/layout.css`)
  — avoid new inline styles when touching a section.
- **External libs** (GSAP, ScrollTrigger, Lenis, Three.js) load from CDN — needs internet on
  first load.
- **Reduced motion**: respects `prefers-reduced-motion` — disables Lenis, Three.js, marquees,
  and scroll reveals, falling back to static layouts.
- **Mobile**: horizontal-scroll sections stack vertically; Lenis and the 3D hero are disabled
  for performance.
- The contact form is **client-side only** (no backend) — it simulates SENDING… → SENT ✓.
- `xtopia-company-profile.md`, `xtopia-brand-identity.md`, and `xtopia-website-design-plan.md`
  describe the pre-October-2026 positioning and are superseded by `docs/rebrand-2026/` — kept
  for reference only.
