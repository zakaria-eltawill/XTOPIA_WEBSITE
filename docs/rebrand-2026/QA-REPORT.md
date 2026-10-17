# Phase 8 — Step 1: Pre-client technical QA report

**Date:** 2026-10-17 · **Branch:** `rebrand-oct-2026` (no commits made as part of writing this
report — changes below are on disk, uncommitted, pending your review) · **Scope:** technical
fixes only — no design, layout or copy changes. The frozen `#flip` section (D6) was not touched.

Pages covered: `index`, `about`, `verticals`, `people`, `careers`, `contact`,
`verticals/{trofi,beyond,mhya,arada,xeed}`, plus the two redirect stubs
(`verticals/{befit,developments}`).

---

## ✅ What I checked

1. **Confirmation list.** Grepped every `data-confirm` / `<!-- CONFIRM -->` marker across all
   HTML + `partials/`, plus the open questions from `PLAN.md` → "Still open," plus the ARADA KSA
   team question → written up in `docs/rebrand-2026/CONFIRM-LIST.md` (10 items, client-facing
   English).
2. **Links.** Every `href`, `img src`, `video`/`source`, and CSS `url()` across all 13 pages
   (1,213 links) resolved to a real file; every `#anchor` link resolved to an `id` that actually
   exists on its target page; nav/footer link correctly from both the root and `verticals/`.
3. **Console & network.** Served the site locally and loaded all 11 production pages in headless
   Chromium (Playwright), capturing console errors and failed/4xx/5xx network requests.
4. **Images & performance.** Found every image over 400KB in actual use, every CSS `url()`
   reference, every unused legacy image; checked `alt`, `loading`, `decoding`, and
   width/height-or-aspect-ratio on every `<img>` across all 11 pages.
5. **SEO & meta.** Title/description uniqueness, `og:*`, `twitter:card`, canonical, favicon, on
   every production page; canonical + `noindex` on both redirect stubs.
6. **Responsive & accessibility.** `scrollWidth` vs `innerWidth` at 1440/1024/390 (390 tested with
   real touch emulation) on all 11 pages via Playwright; `prefers-reduced-motion: reduce` behavior
   (GSAP/ScrollTrigger reveal state); `:focus-visible` coverage and contrast against every theme
   background; single-`<h1>`-per-page.
7. **Deploy workflow.** `assets/_archive` exclusion from the published copy.

---

## 🔧 What I fixed

| # | File(s) | Line(s) | Fix | Why |
|---|---|---|---|---|
| 1 | `verticals/arada.html` | whole file | Restored from git history (commit `87c1655`) — the page had been silently reverted to its Phase 1 skeleton by the Phase 6 commit (`3ec8e11`) three phases ago. Re-applied the current `?v=87` cache-bust and the footer's "Leadership" link text so it matches every other page. | The live ARADA Saudi company page was missing its capability section, the 3 Saudi project write-ups (Al Remal/Marasem/Bawabat Makkah), and its `#team` section — the whole middle of the page was gone. Confirmed by `git diff` across every commit since Phase 4 that no later phase intentionally changed this content; it was an accidental loss, not a design decision. |
| 2 | `people.html` | `#companies` ARADA card link | No change needed — fixed automatically by #1 (the link targeted `verticals/arada.html#team`, which didn't exist until the page was restored). | — |
| 3 | `index.html` | removed one `<link rel="preload">` | Deleted a preload for `hero-cover-architectural-abstract.jpg` that is never actually rendered anywhere on the page — it was downloading 226KB on every home-page load for nothing. | Dead preload = wasted bandwidth/LCP budget on the home page. |
| 4 | `css/reset.css` | added 6 lines after the `:focus-visible` rule | Added `.theme-light :focus-visible, .section--cream :focus-visible, .bg-cream :focus-visible, .bg-light-blue :focus-visible { outline-color: var(--color-navy); }` | The sitewide focus outline is `var(--color-cream)` (`#efede3`) — on any light-themed section (roughly half the site) this sits on a `#F6F0E4` background, ~1:1 contrast, i.e. invisible. Every link/button on a light section was keyboard-focusable but gave no visible focus indicator (fails WCAG 2.4.11). |
| 5 | `about.html`, `verticals.html`, `people.html`, `verticals/{trofi,beyond,mhya,arada,xeed}.html` | each page's primary hero/intro `title-split` | Changed `<p class="title-split">` → `<h1 class="title-split">` (8 pages). | These 8 of 11 production pages had **zero** `<h1>` anywhere — the shared `.title-split` component (used for every page's main headline) renders as a plain `<p>`, not a heading. `.title-split`'s CSS is class-only (no tag-qualified selectors), so this is purely semantic — nothing visually changed. `index`, `careers` and `contact` already did this correctly; the other 8 didn't. |
| 6 | All 11 production pages | after each page's `<meta name="description">` | Added `og:title`, `og:description`, `og:type`, `og:image`, `og:url`, `twitter:card`, `<link rel="canonical">`. `og:image` = `https://www.xtopia.life/assets/images/rebrand-2026/photos/brand/hero-cover-motion-bw.webp` on every page (as given); canonical/`og:url` use `https://xtopia.life/...` to match the domain the two redirect stubs already use. | None of these tags existed anywhere on the site before this pass — social shares and search results had no preview image/title/description, and no canonical URL. |
| 7 | 6 images, sitewide | — | Converted 6 oversized-and-in-use PNGs to WebP (q≈85, same pixel dimensions): `awards-hot-list-2026-best-new-restaurants` (480→42KB), `map-al-remal-riyadh-location-dark` (762→77KB), `map-soho-jeddah-location-dark` (551→44KB), `dev-soho-jeddah-promenade-people` (814→51KB), `fnb-dine-in-and-cloud-kitchen` (954→66KB), `Heroo_photo` (2.06MB→143KB). Updated the `src`/`onerror` reference on each of the 6 pages that used them (`contact`, `index`, `verticals/{arada,mhya,trofi}`, `careers`'s fallback). Originals kept in `assets/_archive/images-oversized-originals/`. | All 6 were >400KB and genuinely rendered on a live page. |
| 8 | 3 images, sitewide | — | Recompressed 3 oversized `.webp` files in place at the same filename/path (no HTML changes needed): `arada-saudi-community-walk.webp` (430→340KB, same 1600×900), `arada-saudi-further-landscape.webp` (1.10MB→338KB, downscaled 2236×1227→1600×876 — it's a full-bleed CSS background sitting under a 60–75% black gradient overlay, so the downscale is not visible under the overlay), `hero-cover-motion-bw.webp` (1.51MB→199KB, downscaled 2100×2100→1200×1200 — this is the new sitewide `og:image`; 1200×1200 is the standard size for a social-preview image, and platforms resize it anyway). Pre-compression originals kept in the same archive folder with a `-original` suffix. | All 3 were >400KB `.webp` files already in use (one of them about to become used, as the new `og:image`). |
| 9 | 35 images, sitewide | — | Moved 35 confirmed-zero-usage legacy images (pre-October "Developments/Parks/Sports/Community/BeFit" content, superseded by Phase 3–4's MHYA/BEYOND/ARADA rebuild) to `assets/_archive/photos-unused/` and `assets/_archive/collages-unused/`. Verified zero references across every `*.html`/`css/*.css`/`js/*.js` before moving each one (not just the ones over 400KB). Updated `assets/_archive/README.md` with the full list and reasoning. | Dead weight in the live asset tree; matches the Phase 7 cleanup pattern already established for other unused files. |
| 10 | `.github/workflows/deploy-pages.yml` | "Prepare deploy copy" step | Added `rm -rf /tmp/deploy/assets/_archive`. | `assets/_archive` (now ~40 files, several MB) would otherwise have been published to the live GitHub Pages site on every deploy even though nothing references it. |
| 11 | `docs/rebrand-2026/PLAN.md` | Phase 8 checklist + Progress log | Marked the completed Phase 8 sub-items, added a Progress log row for this session, left "Merge" unchecked. | Per your instruction — no commit, no merge, no publish. |

**Caught and reverted before anything was deleted:** a first pass at the "archive unused images"
step mistakenly flagged `hero-cover-architectural-abstract.jpg` (used as `index.html`'s hero
background) and `hero-x-symbol-architectural.png` (used on `careers.html`) as unused, because
their filenames matched the "old hero photo" naming pattern of genuinely-unused files. Caught by
re-grepping before deleting; both files were left exactly where they were.

---

## ⚠️ Found — needs your decision, not touched

Everything below is also written up, with the exact on-site wording and a plain-English question,
in **`docs/rebrand-2026/CONFIRM-LIST.md`**. Short version:

1. **Contact email domain** — `info@xtopia.com` vs `info@xtopia.life`.
2. **Social media links** — no Instagram/LinkedIn/X URLs provided yet; icons exist in the code but
   stay hidden until you send them.
3. **"Our Values" wording** (About page) — the 5 titles are unchanged, but we rewrote the
   one-line description under each to fit the new positioning; not yet reviewed by you.
4. **Country ↔ company mapping** (About → Our Footprint) — our best reading of which companies
   operate in Saudi Arabia / Egypt / UK / Slovakia; please confirm.
5. **BeFit 360 app & points program** (BEYOND page) — carried over unchanged from the old site,
   not in the new profile, so we couldn't re-verify it's still current.
6. **BEYOND real-estate partners** — same as above, carried over unchanged.
7. **MHYA fund management partners** (SNB Capital / SEDCO Capital / Al Rajhi Capital) — same.
8. **ARADA Saudi team** — currently shows Ali Al Shareef + Tariq Altuwaijri (the same two shown on
   every company page). Do you have dedicated ARADA KSA names/photos, or is this correct?
9. **Taif and Al Jawhara projects** — not in the October profile; currently dropped from the whole
   site (their old renders are archived, not deleted). Confirm this is intentional.
10. **Separate "Partnerships" nav item** — ARADA Saudi currently sits inside the "Our Ecosystem"
    menu with a small "Partnership" tag; is that enough, or do you want a dedicated top-level nav
    item?

**Also flagged, no fix needed:**
- Most `<img>` tags on the site don't carry explicit `width`/`height` attributes. This isn't a gap
  — the site's image containers (`.media`, `.x-mask`, `.biz-hero__x`, etc.) are constrained with
  CSS `aspect-ratio` (30 declarations across `css/*.css`), which prevents layout shift without the
  HTML attributes. No change made; flagging only because the instruction specifically asked me to
  check for this.
- Below-the-fold lazy loading is handled by a custom blur-up `IntersectionObserver` system in
  `js/main.js` (not the native `loading="lazy"` attribute in most cases) — confirmed working,
  left as-is rather than retrofitted, since it's an existing sitewide mechanism, not a bug.
- `impeccable`'s design-quality hook flagged the same 2 findings on every page touched this
  session: `clipped-overflow-container` (the shared nav partial clips a positioned child) and
  `dark-glow` (the custom cursor ring's glow shadow). Both are pre-existing, sitewide, and already
  documented as such in this file's own Phase 4–7 log entries (confirmed again this session by
  diffing against an untouched page) — not introduced or worsened by anything in this pass, so
  left standing rather than "fixed" under a QA task that's meant to avoid design changes.
- `verticals/trofi.html` flagged one `low-contrast` finding on save, matching a pre-existing
  finding already called out in the Phase 4.1 log ("present before any content edit... left
  standing as pre-existing/out-of-scope") — `.title-split`'s only CSS is class-scoped, so the `p`→
  `h1` tag change made here could not have caused it.
- Lighthouse itself was not run — there's no network access to fetch the Lighthouse CLI/Chrome
  DevTools audit in this environment. The image-weight reductions above and the zero-console-error/
  zero-failed-request Playwright pass cover the same ground manually; a proper Lighthouse run is
  worth doing once the site is on a real URL (GitHub Pages preview or similar).

---

## Page sizes

HTML file size + the single largest image actually referenced by that page (CSS background-images
not included in the "largest image" column, since several pages share them):

| Page | HTML size | Largest image on page |
|---|---|---|
| `index.html` | 42.7 KB | `xeed-date-palms.webp` — 351 KB |
| `about.html` | 29.5 KB | `map-world-dark-base.webp` — 50.5 KB |
| `verticals.html` | 23.8 KB | `xeed-date-palms.webp` — 351 KB |
| `people.html` | 24.6 KB | `x-mhya.webp` — 236 KB |
| `careers.html` | 19.1 KB | `hero-x-symbol-architectural.png` — 337 KB |
| `contact.html` | 17.6 KB | `map-soho-jeddah-location-dark.webp` — 42.7 KB |
| `verticals/trofi.html` | 31.3 KB | `x-trofi.webp` — 104 KB |
| `verticals/beyond.html` | 31.7 KB | `team-befit-aly-mazhar-founder.png` — 98.6 KB |
| `verticals/mhya.html` | 29.6 KB | `mhya-neighbourhood-garden-walk.webp` — 359 KB |
| `verticals/arada.html` | 25.2 KB | `arada-capability-masterplan.webp` — 372 KB |
| `verticals/xeed.html` | 22.4 KB | `xeed-date-palms.webp` — 351 KB |

Every per-page largest image is now under 400KB. The only live asset over 400KB anywhere on the
site is `assets/images/photos/flip_bg.png` (747KB) on the home page's `#flip` section — left
untouched per your explicit instruction (protected unless over 1MB).
