# Client confirmation list — October 2026 rebrand

Compiled during the Phase 8 pre-launch QA pass (2026-10-17). **All 10 items below were answered
by the client (Khadija) on 2026-10-18** — see each item's "Decision" line. General rule the
client gave for everything not explicitly listed here: *"We don't put anything that isn't in the
company profile (CONTENT.md is the reference). Logical content that is in the profile, we use it,
worded for the web rather than copy-pasted."* This rule was also applied as a full site sweep
(facts/sections not traceable to CONTENT.md were removed) — see PLAN.md Progress log for the list.

---

## 1. Contact email — ✅ resolved 2026-10-18
**Where:** every page — header "Contact" dropdown, every footer, `contact.html`, `careers.html`.
**Decision:** `careers.html`'s own career-specific contact (hero chip, job "Apply Now" mailtos)
stays `hr@xtopia.life`. Every general-purpose instance — the shared nav/footer "Contact → Email"
link (all pages, via `partials/`), and `contact.html`'s hero chip + contact card — now uses
`info@xtopia.life`.

## 2. Social media links — ✅ resolved 2026-10-18
**Where:** every page footer, plus `contact.html` (`#social`).
**Decision:** No XTOPIA social accounts exist yet. Icons stay `hidden` as before; the
`data-confirm="social-links"` markers and CONFIRM comments were removed (no longer open
questions — this is the confirmed state, not a placeholder).

## 3. "Our Values" section (About page) — ✅ resolved 2026-10-18
**Where:** `about.html` → "Our Values" section (People-First / Entrepreneurs at the Core /
Honest About the Gap / Built to Last / Purposeful Ambition).
**Decision:** Not in the October profile → section removed entirely from `about.html` (per the
general rule above, not just the wording).

## 4. Country ↔ company mapping (About → Our Footprint) — ✅ resolved 2026-10-18
**Where:** `about.html` → "Present across 4 countries" section.
**Decision — confirmed mapping:**
- Saudi Arabia — Headquarters, Jeddah · TROFI · MHYA · ARADA Saudi
- Egypt — BEYOND · XEED
- United Kingdom — TROFI
- Slovakia — MHYA (industrial & logistics parks)

(BEYOND moved from Saudi Arabia to Egypt — the profile lists a Saudi expansion as a future
ambition, not current footprint.) `data-confirm="country-mapping"` marker removed.

## 5. BeFit app & points program (BEYOND page) — ✅ resolved 2026-10-18
**Where:** `verticals/beyond.html` → "The BeFit App" section.
**Decision:** Not in the October profile → section removed entirely. (The one profile-sourced
line about continuing to develop the existing app, under "Taking BEYOND further," stays as is.)

## 6. BEYOND real-estate partners (BEYOND page) — ✅ resolved 2026-10-18
**Where:** `verticals/beyond.html` → "Real Estate Partners" logo strip.
**Decision:** Not in the October profile → section removed entirely.

## 7. MHYA fund management partners — ✅ resolved 2026-10-18
**Where:** `verticals/mhya.html` → "Fund Management Partners" section.
**Decision:** Confirmed still current (SNB Capital, SEDCO Capital, Al Rajhi Capital). Section
kept as is; `data-confirm="fund-partners-current"` marker removed.

## 8. ARADA Saudi partnership team — ✅ resolved 2026-10-18
**Where:** `verticals/arada.html` → `#team`.
**Decision:** Keep Ali Al Shareef and Tariq Altuwaijri (no ARADA KSA-specific names provided).
No marker existed on this section; no change needed beyond this confirmation.

---

## Carried over from PLAN.md → "Still open"

## 9. Taif and Al Jawhara projects — ✅ resolved 2026-10-18
**Decision:** Confirmed dropped — not in the October profile, stay off the site. No HTML
reference to either project exists anywhere on the live site (verified by grep).

## 10. Separate "Partnerships" nav item — ✅ resolved 2026-10-18
**Decision:** Current placement is sufficient — ARADA Saudi stays inside the "Our Ecosystem"
mega-menu with its "Partnership" tag; no separate top-level nav item.
