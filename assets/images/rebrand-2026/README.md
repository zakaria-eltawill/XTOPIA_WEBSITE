# Rebrand 2026 assets (extracted from COMPANY_PROFILE_OCTOBER.pdf)

**Temporary until the client sends originals.** Everything here was pulled from the October 2026 profile at its native embedded resolution (no upscaling) and saved as WebP q90.

## logos/  — vector (SVG) ✅ production quality
Re-traced to SVG from the profile's raster logos (the PDF only contains small PNGs).
Each logo has `-white` and `-dark` (#111010) SVG + a 2000px-wide transparent PNG.
- logo-trofi · logo-beyond · logo-mhya · logo-arada · logo-xeed · logo-befit · logo-soho-jeddah
- logo-xtopia-wordmark (wordmark only, no old "Community-Driven Platform" descriptor)
- x-monogram — the X shape; use as CSS `mask-image` for the `.x-mask` component
Prefer SVG in HTML. Ask the client for official vector files before launch to replace the traces.

## x/  — photos clipped inside the X (transparent WebP)
x-trofi · x-beyond · x-mhya · x-arada · x-xeed (≈1340×1410) · x-closing-bw · x-cover-architecture-bw · x-advantage-dining

## photos/ — quality tiers
| Tier | Files | Use |
|---|---|---|
| ✅ Large (≥1100px) | brand/*, arada-saudi-further-landscape, arada-saudi-community-walk, arada-al-remal-riyadh, arada-marasem-north-jeddah, arada-bawabat-makkah, arada-capability-masterplan, mhya-soho-jeddah-exterior, mhya-neighbourhood-*, mhya-slovakia-* (1536w), xeed-date-palms, trofi-wood-fired-oven-chef | full-width / hero OK |
| 🟡 Medium (600–1000px) | arada-aljada/thameside/masaar, arada-community-street, arada-townhouses-aerial, mhya-destination-plaza-aerial, beyond-format-* | cards, half-width |
| 🔴 Small (<600px) | beyond-* portraits, dest-* (destination tiles, 208–478w), xeed-we-* (~530w) | thumbnails/cards only — request originals |

## people/ — 🔴 small (185–430px)
leadership-* (Ali, Tariq, Jordana, Nadim, Khalid Abdelmajeed) and cofounder-* (TROFI, BEYOND, MHYA, XEED).
OK for ~200px cards; request originals. Existing `assets/images/photos/team/` may have better copies for some people.
Name ↔ photo matched from profile p.5 and p.34 layout (left→right order) — double-check AlHassan vs Abdulrahman.

## maps/
map-world-dark-base — base map without pins (add Saudi Arabia, Egypt, UK, Slovakia pins in HTML/CSS).

## Not extracted (already in repo or not usable)
TROFI brand tiles (146px, repo has logos), sports sub-brand logos (repo has them), grid textures (do in CSS), slide screenshots.
