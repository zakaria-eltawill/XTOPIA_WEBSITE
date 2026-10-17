# Client confirmation list — October 2026 rebrand

Compiled during the Phase 8 pre-launch QA pass (2026-10-17). These are the items the site
currently marks with `data-confirm` + `<!-- CONFIRM -->`, plus the open questions carried over
from `PLAN.md` → "Still open." Nothing below blocks the rest of QA — the site works correctly
either way — but each needs a client answer before `rebrand-oct-2026` merges to `main`.

---

## 1. Contact email
**Where:** every page — header "Contact" dropdown, every footer, `contact.html` and `careers.html`.
**On the site now:** `hr@xtopia.life` (the address already used on the Careers page).
**Ask the client:** "We're using hr@xtopia.life as the contact email across the site. Is that
right for general enquiries too, or do you have a general address (e.g. info@xtopia.life) we
should use on the Contact page and footer?"

## 2. Social media links
**Where:** every page footer, plus a dedicated row on `contact.html` (`#social`).
**On the site now:** Instagram / LinkedIn / X icons exist in the code but are hidden
(`hidden` attribute) — no URLs were provided, so nothing is visible to a visitor yet.
**Ask the client:** "Do you have Instagram, LinkedIn and/or X (Twitter) accounts for XTOPIA we
should link to? If yes, please send the URLs. If not yet, we'll keep the icons hidden for
launch."

## 3. "Our Values" wording (About page)
**Where:** `about.html` → "Our Values" section (People-First / Entrepreneurs at the Core /
Honest About the Gap / Built to Last / Purposeful Ambition).
**On the site now:** the 5 value titles are unchanged from the old site, but the one-line
description under each was rewritten by us to fit the new "business-building" story instead of
the old real-estate "anchor/envelope/handover" language — this rewrite has not been reviewed by
the client.
**Ask the client:** "We rewrote the short description under each of the 5 values to match
XTOPIA's new positioning. Can you review the 5 lines on the About page and confirm they're okay,
or tell us what to change?"

## 4. Country ↔ company mapping (About → Our Footprint)
**Where:** `about.html` → "Present across 4 countries" section.
**On the site now:**
- Saudi Arabia — Headquarters, Jeddah · TROFI · BEYOND · MHYA · ARADA Saudi
- Egypt — XEED · BEYOND
- United Kingdom — TROFI
- Slovakia — MHYA (industrial & logistics parks)
**Ask the client:** "Please confirm which companies operate in which of the 4 countries — the
list above is our best reading of the October profile; let us know if any company/country pairing
is wrong or missing."

## 5. BeFit app & points program (BEYOND page)
**Where:** `verticals/beyond.html` → "The BeFit App" section.
**On the site now:** the BeFit 360 app description and points-program copy, carried over
unchanged from the pre-October site (not in the October profile, so we could not re-verify it).
**Ask the client:** "Is the BeFit 360 app and its points program still active/current? If
anything changed (features, availability), let us know what to update or whether to remove this
section."

## 6. BEYOND real-estate partners (BEYOND page)
**Where:** `verticals/beyond.html` → "Real Estate Partners" logo strip.
**On the site now:** the same partner-logo list from the pre-October site, carried over
unchanged.
**Ask the client:** "Are these real-estate partnerships for BEYOND still current? Please confirm
the list or tell us which partners to add/remove."

## 7. MHYA fund management partners
**Where:** `verticals/mhya.html` → "Fund Management Partners" section.
**On the site now:** SNB Capital, SEDCO Capital, Al Rajhi Capital (carried over from the old
`developments.html`, not in the October profile).
**Ask the client:** "Are SNB Capital, SEDCO Capital and Al Rajhi Capital still MHYA's fund
management partners? Please confirm or send an updated list."

## 8. ARADA Saudi partnership team
**Where:** `verticals/arada.html` → "The XTOPIA partnership team" (`#team`).
**On the site now:** Ali Al Shareef and Tariq Altuwaijri (the same two XTOPIA leaders shown on
every other company's team, since ARADA Saudi is a partnership rather than a standalone team).
**Ask the client:** "Do you have ARADA KSA team names/photos to add, or should we keep the XTOPIA
partnership team (Ali, Tariq) as the team shown on the ARADA Saudi page?"

---

## Carried over from PLAN.md → "Still open"

## 9. Taif and Al Jawhara projects
Two developments (Taif Park, Al Jawhara Riyadh) that appeared on the pre-October site are **not**
in the October profile and are currently not shown anywhere on the rebuilt site (their renders
were archived this session — see `assets/_archive/README.md`).
**Ask the client:** "Taif and Al Jawhara aren't in the new company profile, so we've left them off
the site. Should either of them be added back as a project, or are they correctly dropped?"

## 10. Separate "Partnerships" nav item
**Where:** main navigation.
**On the site now:** ARADA Saudi sits inside the "Our Ecosystem" mega-menu alongside TROFI,
BEYOND, MHYA and XEED, with a small "Partnership" tag next to its name — there's no separate top
level "Partnerships" nav item.
**Ask the client:** "Is ARADA Saudi's placement inside the Ecosystem menu (with a 'Partnership'
tag) clear enough, or would you prefer a separate 'Partnerships' item in the main navigation?"
