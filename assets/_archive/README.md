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
