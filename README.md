# XTOPIA — Website

Cinematic, scroll-driven website for XTOPIA, a community-driven platform.
Static site: **HTML / CSS / vanilla JS**, with GSAP + ScrollTrigger, Lenis smooth scroll,
and a Three.js 3D grid hero. Built from the brand identity, company profile, and design plan.

## Run it

A static server is recommended (the Three.js hero loads as an ES module from a CDN, which
some browsers block over `file://`):

```bash
# from this folder
python -m http.server 8000
# then open http://localhost:8000/
```

Ready for **Cloudflare Pages** deployment. Just connect the repository or drag-and-drop the folder — no build step required.

Any static server works (`npx serve`, VS Code Live Server, etc.).

## Pages (11)

| Page | File |
|------|------|
| Home | `index.html` |
| About & Framework | `about.html` |
| Verticals hub | `verticals.html` |
| TROFI · F&B | `verticals/trofi.html` |
| BeFit 360 · Sports | `verticals/befit.html` |
| XTOPIA Developments | `verticals/developments.html` |
| MAHYA · Parks | `verticals/mahya.html` |
| BEYOND · Activations | `verticals/beyond.html` |
| Projects | `projects.html` |
| Community | `community.html` |
| Contact | `contact.html` |

## Structure

```
css/        reset · variables · typography · layout · components · sections · animations
js/         main · loader · cursor · nav · three-hero · scroll-animations · horizontal-scroll · contact-form
assets/
  Fonts/    Barques (6 weights), Acumin Variable Concept, Book Antiqua italic/bold-italic
  images/   logos · icons · maps · collages · photos (all wired to their sections)
```

## Notes

- **Fonts** are the real brand fonts in `assets/Fonts/` (declared in `css/typography.css`).
- **External libs** (GSAP, ScrollTrigger, Lenis, Three.js) load from CDN — needs internet on first load.
- **Reduced motion**: respects `prefers-reduced-motion` — disables Lenis, Three.js, marquees, and
  scroll reveals, falling back to static layouts.
- **Mobile**: horizontal-scroll sections stack vertically; Lenis and the 3D hero are disabled for performance.
- The contact form is **client-side only** (no backend) — it simulates SENDING… → SENT ✓.
