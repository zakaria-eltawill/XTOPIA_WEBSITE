# Archive — unused assets (Phase 7 cleanup, 2026-10-17)

Files moved here are **not referenced by any `*.html`, `css/*.css`, or `js/*.js` file** on
`rebrand-oct-2026` as of this cleanup (verified by grepping every candidate across the whole
repo before moving). Nothing was deleted — if a file turns out to be needed again, move it back
to its original path below.

| Archived path | Original path | Why unused |
|---|---|---|
| `videos/IMG_0161.MP4` | `assets/videos/IMG_0161.MP4` | Old hero/background video clip, superseded by the rebrand's video assets |
| `images/rebrand-2026/x/x-beyond.webp` | `assets/images/rebrand-2026/x/x-beyond.webp` | Superseded by `x-beyond-gym.webp` |
| `images/rebrand-2026/x/x-arada.webp` | `assets/images/rebrand-2026/x/x-arada.webp` | Superseded by `x-arada-ksa.webp` |
| `images/icons/icon-framework-activate-large.png` | `assets/images/icons/icon-framework-activate-large.png` | Home `#framework` (Anchor/Develop/Activate) was replaced by `#advantage` in Phase 2 |
| `images/icons/icon-framework-activate-small.png` | `assets/images/icons/icon-framework-activate-small.png` | same |
| `images/icons/icon-framework-anchor-large.png` | `assets/images/icons/icon-framework-anchor-large.png` | same |
| `images/icons/icon-framework-anchor-small.png` | `assets/images/icons/icon-framework-anchor-small.png` | same |
| `images/icons/icon-framework-develop-large.png` | `assets/images/icons/icon-framework-develop-large.png` | same |
| `images/icons/icon-framework-develop-small.png` | `assets/images/icons/icon-framework-develop-small.png` | same |
| `images/maps/map-global-presence-5-countries.png` | `assets/images/maps/map-global-presence-5-countries.png` | Footprint is now 4 countries (Kuwait removed); `about.html#presence` uses the `.numbers-map` component instead |
| `images/maps/map-global-presence-9-countries.png` | `assets/images/maps/map-global-presence-9-countries.png` | same |
| `images/logos/verticals/logo-befit360-black-outline.png` | `assets/images/logos/verticals/logo-befit360-black-outline.png` | Old BeFit 360 logo variant; only `logo-befit360-color.png` is still used (ported `#format-card` badge in `verticals/beyond.html`) |
| `images/logos/verticals/logo-befit360-color-small.png` | `assets/images/logos/verticals/logo-befit360-color-small.png` | same |
| `images/logos/verticals/logo-befit360-dark-color.png` | `assets/images/logos/verticals/logo-befit360-dark-color.png` | same |
| `images/logos/verticals/logo-befit360-white.png` | `assets/images/logos/verticals/logo-befit360-white.png` | same |
| `images/logos/verticals/logo-trofi-cream-compact.png` | `assets/images/logos/verticals/logo-trofi-cream-compact.png` | TROFI's hero now uses the real `logo-trofi-white.svg` (D1) |
| `images/logos/verticals/logo-trofi-cream-light.png` | `assets/images/logos/verticals/logo-trofi-cream-light.png` | same |
| `images/logos/verticals/logo-trofi-cream-wide.png` | `assets/images/logos/verticals/logo-trofi-cream-wide.png` | same |
| `images/logos/brand/logo-xtopia-developments-white.png` | `assets/images/logos/brand/logo-xtopia-developments-white.png` | "XTOPIA Developments" was renamed to MHYA; `developments.html` is now a redirect to `mhya.html` |
| `images/photos/sports/sports-befit360-app-mockup.png` | `assets/images/photos/sports/sports-befit360-app-mockup.png` | Superseded by `befit-app-mockup.webp` |

Not archived — kept per the rebrand's explicit exceptions:
- `assets/images/photos/flip_bg.png` and anything else used by home's `#flip` section (D6: frozen, never touched).
- `assets/images/logos/verticals/logo-befit360-color.png` — still referenced by `verticals/beyond.html`'s ported BeFit app/points-program block (`data-confirm="befit-app-current"` section).

## Phase 8 QA pass (2026-10-17)

### `images-oversized-originals/` — pre-compression originals, kept for rollback
Each of these was >400KB and in live use. The original was archived here and the live file was
replaced with a WebP (q≈85, same pixel dimensions unless noted) at its original path/filename —
no HTML/CSS reference changes were needed for the three already-`.webp` files (recompressed in
place); the six PNG/JPG→WebP conversions did need their `src`/`href` extensions updated (listed
below).

| Archived file | Live replacement | Notes |
|---|---|---|
| `awards-hot-list-2026-best-new-restaurants.png` (480KB) | `assets/images/collages/awards-hot-list-2026-best-new-restaurants.webp` (42KB) | same dimensions |
| `map-al-remal-riyadh-location-dark.png` (762KB) | `assets/images/maps/map-al-remal-riyadh-location-dark.webp` (77KB) | same dimensions |
| `map-soho-jeddah-location-dark.png` (551KB) | `assets/images/maps/map-soho-jeddah-location-dark.webp` (44KB) | same dimensions |
| `dev-soho-jeddah-promenade-people.png` (814KB) | `assets/images/photos/developments/dev-soho-jeddah-promenade-people.webp` (51KB) | same dimensions |
| `fnb-dine-in-and-cloud-kitchen.png` (954KB) | `assets/images/photos/fnb/fnb-dine-in-and-cloud-kitchen.webp` (66KB) | same dimensions |
| `Heroo_photo.png` (2.06MB) | `assets/images/photos/hero/Heroo_photo.webp` (143KB) | same dimensions |
| `arada-saudi-community-walk-original.webp` (430KB) | overwrote `assets/images/rebrand-2026/photos/arada/arada-saudi-community-walk.webp` (340KB) | recompressed in place, same dimensions |
| `arada-saudi-further-landscape-original.webp` (1.10MB, 2236×1227) | overwrote `assets/images/rebrand-2026/photos/arada/arada-saudi-further-landscape.webp` (338KB, 1600×876) | full-bleed CSS background under a dark gradient overlay; downscaled — not visually distinguishable under the overlay |
| `hero-cover-motion-bw-original.webp` (1.51MB, 2100×2100) | overwrote `assets/images/rebrand-2026/photos/brand/hero-cover-motion-bw.webp` (199KB, 1200×1200) | this is the new sitewide `og:image` (Phase 8 SEO pass) — 1200×1200 is the right size for a social-preview image, platforms resize anyway |

### `photos-unused/` and `collages-unused/` — confirmed-unused legacy images (pre-October-rebrand)
Verified unused by grepping every filename across all `*.html`/`css/*.css`/`js/*.js` (not just the
archive-excluded ones) before moving — all 0 matches. These are leftover renders/photos from the
pre-October "Developments / BeFit / Parks" content model that Phase 4 replaced with MHYA/BEYOND/
ARADA Saudi content; none of their replacements reused these specific files.

`photos-unused/`: `dev-al-remal-aerial-sunset-render.jpg`, `dev-al-remal-commercial-square-render.jpg`,
`dev-bawabat-makkah-aerial-render.png`, `dev-marasem-aerial-sunset-render.jpg`,
`dev-marasem-commercial-strip-render.jpg`, `dev-retail-corridor-interior.png`,
`dev-soho-jeddah-exterior-day-render.png`, `dev-soho-jeddah-exterior-night-render.png`,
`dev-taif-masterplan-site-aerial.png`, `dev-taif-park-real-photo.png`,
`jawharratriyadh_aerialview2-jpg.webp`, `park-mahya-app-mockup-phone.png`,
`park-mahya-basketball-court-render.png`, `park-mahya-boardwalk-lake-render.png`,
`park-mahya-community-garden-mosque.png`, `park-mahya-yasmine-layout-diagram.jpg`,
`sports-befit-group-class-weights.png`, `sports-befit-rowing-machine-luxury.png`,
`sports-befit-training-three-panel.png`, `sports-befit-treadmill-outdoor-group.png`,
`community-beyond-activation-crowd.png`, `community-cafe-reading-atmosphere.png`,
`community-people-hands-unity.png`, `community-sports-running-action.png`,
`fnb-food-shared-table-overhead.jpg`, `fnb-trofi-food-sharing-hands.png`, `Herooo.jpg`,
`heroSectionHome.png`, `map-al-jawhara-riyadh-location-dark.png` (all originally under
`assets/images/photos/{developments,parks,sports,community,fnb,hero}/` or `assets/images/maps/`).

`collages-unused/`: `collage-beyond-destinations-strip.png`, `collage-beyond-partners-sponsors-all.png`,
`collage-beyond-waterworld-summer-events.png`, `collage-trofi-brand-portfolio-grid.png`,
`collage-trofi-innovation-lab-grid.png`, `awards-trofi-brands-recognition-row.png` (all originally
under `assets/images/collages/`), plus `closing-motion-bw.webp` (originally
`assets/images/rebrand-2026/photos/brand/closing-motion-bw.webp` — unused alternate to the now-live
`hero-cover-motion-bw.webp` og:image).

Not archived despite being candidates — **confirmed still in use, left alone**:
`hero-cover-architectural-abstract.jpg` (`index.html` preload — see fix below) and
`hero-x-symbol-architectural.png` (`careers.html` hero image) both matched the "old hero photo"
naming pattern but are genuinely referenced; a first pass mistakenly copied them here and it was
caught and reverted before anything was deleted.
