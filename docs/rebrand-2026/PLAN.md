# XTOPIA Website — October 2026 Rebrand Plan

> **Goal:** Apply the October 2026 Company Profile to the live site: new positioning,
> new 5-business structure (incl. the **ARADA Saudi partnership** — client priority),
> the profile's warmer cream/navy/burgundy look (client: *"too black & white"*), and all new data.
>
> - Copy & numbers → `docs/rebrand-2026/CONTENT.md` (single source of truth — never invent copy)
> - Progress → tick the checkboxes in this file as tasks are completed
> - Work **one phase per session**, then stop for review.

---

## 0. Ground rules (read before every phase)

1. **Branch:** all work on `rebrand-oct-2026`. Never commit to `main` — a push to `main`
   auto-deploys to xtopia.life via `.github/workflows/deploy-pages.yml`.
2. **Stack stays the same:** static HTML/CSS/vanilla JS, GSAP + ScrollTrigger, Lenis, Three.js. No framework, no build step.
3. **Nav + footer are duplicated in 11 HTML files.** Until Phase 1 lands the sync script, any nav/footer change must be applied to every page (root pages use `verticals/…` paths, `verticals/*.html` use `../`).
4. **Cache-busting:** bump `?v=62` → `?v=63` (then +1 per phase) on all CSS/JS links in every page.
5. **No new inline styles.** Many sections use `style="…"` today; when touching a section, move its styles into `css/sections.css` classes.
6. **Preview:** `python -m http.server 8000` → check desktop 1440, tablet 1024, mobile 390, and `prefers-reduced-motion`.
7. **Commit per phase** with message `rebrand(phase-N): …`.
8. Anything marked ⚠️ CONFIRM in CONTENT.md: build it, but wrap it in `data-confirm` attribute + HTML comment `<!-- CONFIRM: … -->` so it can be found and pulled before launch.

---

## Audit — what exists today (Oct 14, 2026)

| Area | Current state | Problem vs new profile |
|---|---|---|
| Pages | `index, about, verticals, careers, people, contact` + `verticals/{trofi,befit,developments,beyond}.html` | No ARADA / XEED / MHYA pages; BeFit is a separate vertical; "Developments" name is gone |
| Fonts | `typography.css` declares **Barques / Book Antiqua / Acumin** via @font-face, but every type class uses `font-family: 'Gotham'` — **Gotham is not loaded**, so the site falls back to Helvetica/Arial | No brand font renders; and the October profile uses **Montserrat** for titles, which the site doesn't have |
| Colors | `variables.css` has the full brand palette (navy `#00263e`, maroon `#350004`, cream `#efede3`, sage, olive, light-blue) but pages are ~90% `--c-void #111010`, a few one-off inline hex colors | Reads black & white |
| Home | Hero (COMMUNITY•DRIVEN•PLATFORM) → Who are we → Flip "Most destinations…" → Framework Anchor/Develop/Activate → stats ticker (old numbers) → 4 vertical cards → SOHO (Sept 2026) → CTA "Ready to build something great?" | Positioning, framework, numbers, verticals, SOHO date all outdated |
| About | Story/values written around the old "anchor first" model; footprint = 5 countries incl. Kuwait | Needs new story + 4 countries |
| People | Board · XTOPIA leadership (Ali, Tariq, Nomaan, Nadim, Alaa) · TROFI · Developments · BeFit & Beyond | Names/titles differ from profile (see CONTENT §11) |
| Footer | "Community-Driven Platform", "From concept to life.", socials `href="#"`, Careers link `javascript:void(0)` | Old tagline, dead links |
| Docs | `xtopia-company-profile.md`, `xtopia-brand-identity.md`, `xtopia-website-design-plan.md` | Pre-October; superseded by `docs/rebrand-2026/` |

### Target sitemap

```
index.html
about.html                 Story · The XTOPIA Advantage · One Group · Footprint · Values
verticals.html             Ecosystem hub (5 businesses)
  verticals/trofi.html     TROFI — Food & Hospitality          (update)
  verticals/beyond.html    BEYOND — Sports & Active Living     (rebuild, absorbs befit.html)
  verticals/mhya.html      MHYA — Development & Places         (new, replaces developments.html)
  verticals/arada.html     ARADA Saudi — Master-planned Comm.  (NEW)
  verticals/xeed.html      XEED — Agriculture & Food           (NEW)
  verticals/befit.html        → redirect to beyond.html#sports
  verticals/developments.html → redirect to mhya.html
people.html                Leadership · Co-founders · Board · business teams
careers.html · contact.html
```

---

## Phase 0 — Design system: the new look  ✅

**Why first:** every later section depends on it. This phase alone should make the site feel "in colour".

### 0.1 Tokens — `css/variables.css`  ✅
- [x] Added surface tokens (kept existing brand tokens). Also added `--color-taupe-text: #5C4B3A` (not in the
  original spec) — `--color-taupe` (`#9D8A75`) on cream fails WCAG AA for text (2.9:1), so it is now reserved
  for decorative rules/dividers only; label and secondary-text colour uses `--color-taupe-text` (7.3:1 on cream).
- [x] Added theme classes in `css/layout.css`: `.theme-light` (cream bg, `#2E2E2E` text, navy numbers, maroon
  italics) and `.theme-dark` (black bg, `#FFFBF7` text, light-blue `#BFD4DD` numbers/labels). Not yet applied to
  existing page sections (still `.section--dark` / `.bg-cream` etc.) — that lands with each page's content phase
  (2–7) when its markup is touched.

### 0.2 Typography — `css/typography.css`  ✅ ⚠️ client decision: use the **profile's** fonts, not the current website's

Font usage measured directly from the October 2026 PDF (font name + size + colour of every text span):

| Role in the profile | Font | Example text in the profile | Web token |
|---|---|---|---|
| Section titles (sentence case, bold) | **Montserrat Bold 700** | "The platform", "One business.", "Two arms.", "The XTOPIA advantage" | `--font-heading` |
| Uppercase headlines, subheads, tracked caps labels | **Montserrat Regular 400** (Bold 700 for spaced labels) | "WE SEE CHALLENGES AS", "Dine-in builds", "OUR THREE-YEAR AMBITION", "T H E  E N T R E P R E N E U R  B R I N G S" | `--font-heading` |
| Intro / lead paragraphs | **Montserrat Light 300** | "XTOPIA is a Jeddah-based, community-focused…" | `--font-heading` |
| Italic second line of every title, names, taglines | **Book Antiqua Italic** | "*build better.*", "*in numbers*", "*Multiple routes to growth.*", co-founder names | `--font-accent` |
| Big stat numbers | **Barques ExtraBold 800 / Bold 700** — navy `#00263E` on light, light-blue `#BFD4DD` on dark | "6K+", "70M+", "74+", "200K" | `--font-number` |
| Body copy, card descriptions, list items, top header strip | **Acumin Concept Light 300 / Regular 400** | "Partner with developers and landlords…", "Customer & Sector Insight", "XTOPIA · PRIVATE & CONFIDENTIAL" | `--font-body` |

Tasks:
- [x] Added **Montserrat** (300/400/500/600/700, self-hosted woff2, SIL OFL, files already in `assets/Fonts/Montserrat/`) `@font-face` in `typography.css`.
- [x] Added tokens in `typography.css`: `--font-heading`, `--font-body`, `--font-accent`, `--font-number` as specified.
- [x] Replaced **all 59** `'Gotham'` references across `typography.css` / `sections.css` / `components.css` (0 remain in `css/`):
  - `.type-hero / .type-display / .type-heading` → `--font-heading` (700 for `.type-display`/`.type-heading`, 400 for `.type-hero`). Dropped forced `text-transform: uppercase` on `.type-hero`/`.type-display`/`.type-heading`.
  - `.type-subhead` → `--font-heading` 300
  - `body`, `.type-body`, `.type-caption`, card/body text (`hero-card__desc`, `award-card__accolade`, `proj-mix`, `contact__detail-value`, form inputs) → `--font-body` 300
  - `.type-label` / eyebrows → `--font-heading` 700, uppercase, letter-spacing 0.3em
  - All stat numbers (`.feature__stat .num`, `.acc-stat .num`, `.vstat .num`, new `.type-number`/`.stat-row__num`) → `--font-number` 800. (`.ticker__num` / `fw-col__num` left as `--font-heading` — decorative ticker/step digits, not profile "big stat" numbers; the ticker itself is marked for removal in Phase 2.)
  - All other tracked-caps/heading-style Gotham refs (nav, footer, buttons, cards, tables, filters) → `--font-heading`, weight kept as authored (200/300 — Montserrat's loaded 300 is the nearest match; not fine-tuned to 700 per-selector given Phase 2–7 will rebuild most of this markup anyway).
- [x] `em / .u-italic / .type-italic` stay Book Antiqua Italic — colour `--accent-italic` on light, `--text-on-dark` on dark (via new `.theme-light`/`.theme-dark` rules).
- [x] Barques is **no longer** the heading font — only `--font-number` (stat numbers). The `.flip__a .type-display` / `.flip__b .type-hero` Barques override in `sections.css` was deliberately left alone — `#flip` is slated for deletion in Phase 2, not touched here.
- [x] Minor one-off PDF fonts not implemented as separate faces — body/heading tokens cover them.
- [x] Preloads: only `index.html` preloaded fonts (other pages had none). Replaced its 2 preloads with `Montserrat-700.woff2`, `Montserrat-300.woff2`, kept `Barques-ExtraBold.otf`; dropped the `AcuminVariableConcept.otf` preload (body text isn't typically above-the-fold-critical on the hero).

### 0.3 New reusable components — `css/components.css` (+ small JS if needed)  ✅
- [x] **Split title** `.title-split` — line 1 **Montserrat Bold** (not Barques — see 0.2: Barques is numbers-only per the
  client's final font decision, which postdates this bullet), line 2 Book Antiqua italic (e.g. **Taking TROFI** *further.*).
- [x] **Stat row** `.stat-row` — big Barques number (navy on light / light-blue on dark via `--accent-number(-dark)`),
  label in brackets `[ EMPLOYEES ]` (via CSS `::before`/`::after`), thin vertical dividers; markup leaves `data-count`
  on `.stat-row__num` for the existing count-up JS to hook into.
- [x] **X-mask media** `.x-mask` — image clipped to the XTOPIA X shape via CSS `mask-image`, referencing the real
  `x-monogram-dark.svg` / `x-monogram-white.svg` files directly (not an inlined data URI — simpler to maintain, same
  result). Variants: `--lg` (hero/cover), `--card`.
- [x] **Watermark X** `.x-watermark` — 7% opacity X centered behind the section (works on both themes, swaps mask
  asset on `.theme-dark`).
- [x] **Business cover** `.biz-cover` — centered X-mask image + business logo + maroon/cream italic line.
- [x] **Numbered points** `.points` — `01 / 02 / 03 / 04` 2-column grid with title + text.
- [ ] Confidential-style header strip — skipped (optional, "ask client").

### 0.4 Assets  ✅ final decisions (2026-10-14)
> Assets extracted from the PDF are in `assets/images/rebrand-2026/` (see its `README.md` for sizes).
> - **Logos: there are no original files — the SVGs in `assets/images/rebrand-2026/logos/` ARE the final logos.** Always use the `.svg` (white on dark, dark on light); never the old PNG logos for TROFI/BEYOND/MHYA/ARADA/XEED.
> - **People photos: use what exists now.** For each person pick the larger file between `assets/images/photos/team/` (existing) and `assets/images/rebrand-2026/people/` (from profile). Display them at card size (≤ 240px wide), grayscale, as in the profile.
> - **Co-founder / leadership file names are verified correct** (incl. AlHassan vs Abdulrahman Al Shareef).
> - Small photos (🔴 in the README) → cards/thumbnails only, never full-width.
- [x] ~~Create `assets/images/rebrand-2026/` and add: ARADA Saudi logo, XEED logo (light + dark), MHYA logo (check existing `logo-mahya-*` matches the new mark), per-business X images, XEED photos, Slovakia park photos, SOHO new renders, 4-country map, leadership photos (Jordana, Khalid Abdelmajeed), co-founder photos (Ahmed Tawfik, Tamer Serour). Source: client originals; fallback = images extracted from the PDF.~~ Done — extracted from the PDF.
- [ ] Name files semantically like the existing convention (`logo-arada-saudi-dark.png`, `xeed-farm-rows-aerial.jpg`).

**Acceptance:** ✅ `docs/rebrand-2026/styleguide.html` (not linked from nav) shows tokens, both themes, all new
components, real fonts/logos/photos from `rebrand-2026`. Verified served locally (`python -m http.server 8000`) —
all linked CSS/font/image/logo paths return 200. DevTools → Computed should confirm titles = Montserrat, numbers =
Barques, italics = Book Antiqua, body = Acumin.

---

## Phase 1 — Structure: nav, footer, sitemap, redirects  ✅

- [x] **Partials sync:** created `partials/nav.html`, `partials/nav-overlay.html`, `partials/footer.html` and
  `tools/sync-partials.py`. Markers (`<!-- @nav:start -->…<!-- @nav:end -->`, same for `nav-overlay`/`footer`)
  wrapped around the existing blocks in all 10 production pages (11 was a miscount — there are 10: the 6 root
  pages + `verticals/{trofi,beyond,befit,developments}.html`; `verticals/{mhya,arada,xeed}.html` added below
  also get markers). `verticals/befit.html` / `developments.html` were turned into redirect stubs (no nav/footer
  shell) and are intentionally excluded from the sync list. The script auto-rewrites every local `href`/`src` in
  the partial with a `../` prefix for pages under `verticals/`; this fixed a pre-existing dead link
  (`verticals/trofi.html` footer linked `../community.html` instead of `../about.html#story`).
  `nav.js` now sets `.is-active` from `location.pathname` instead of it being hand-written per page — required
  to keep the three partials byte-identical across every page (including treating any `verticals/*` subpage as
  "Our Ecosystem" active).
- [x] **Nav (desktop dropdown + mobile overlay):** About → Our Story · The XTOPIA Advantage · Our Footprint.
  Our Ecosystem is now a mega-menu (`.dropdown__menu--mega` in `components.css`) with one logo (SVG, white-on-dark)
  + sector label per business: TROFI · BEYOND · MHYA · **ARADA Saudi** (`.dropdown__mega-tag` "Partnership" badge) ·
  XEED. Mobile overlay keeps the five as plain name-only text links (ARADA Saudi gets a "(Partnership)" suffix)
  — sector labels were dropped from the overlay after the design-quality check flagged the full "BEYOND — Sports
  & Active Living" style strings as long uppercase passages (`.nav-overlay__sub a` is uppercase); the desktop
  mega-menu already shows the sector clearly. Careers · People · Contact unchanged.
- [x] **Footer:** tagline → **A world** *to belong to.* (`to belong to.` as an `<em>`, which already renders Book
  Antiqua Italic site-wide via the existing global rule); descriptor → "Built around people · Powered by
  entrepreneurs"; Ecosystem column lists the 5 businesses; Careers → `careers.html#positions` (added
  `id="positions"` to careers.html's Open Positions section — no other content on that page touched); social
  icons wrapped `hidden` with `data-confirm="social-links"` + `<!-- CONFIRM -->` comment (no URLs yet); email
  stays `info@xtopia.com` with `data-confirm="email-domain"` + `<!-- CONFIRM -->` comment (domain still open per
  PLAN "Still open" §5).
- [x] **Meta:** `<title>`/`description` updated on all 6 root pages to drop "Community-Driven Platform" /
  old-positioning language, sourced from `CONTENT.md` §1 and §4 where applicable. Also fixed a pre-existing bug:
  `people.html` had `about.html`'s exact title/description (copy-paste leftover). `verticals/trofi.html` and
  `beyond.html` meta already had no deprecated text, so left untouched (out of scope, their rewrite is Phase 4).
- [x] Created `verticals/mhya.html`, `arada.html`, `xeed.html` — nav/overlay/footer via partials, a `.biz-cover`
  hero (Phase 0 component) with the real logo + CONTENT.md italic line, and a next-vertical link
  (MHYA→ARADA→XEED→TROFI, continuing the existing TROFI→BEYOND chain). No other sections — full content is
  Phase 4.
- [x] `verticals/befit.html` → redirects to `beyond.html#sports`; `verticals/developments.html` → redirects to
  `mhya.html`. Both use `<meta http-equiv="refresh">` + `<link rel="canonical">` (absolute `xtopia.life` URL) +
  a visible link, `noindex`, no nav/footer/CSS/JS shell (they're transient pointers, not real pages).
- [x] Loader + favicon: unchanged.
- [x] Preloaded `Montserrat-700.woff2` / `Montserrat-300.woff2` / `Barques-ExtraBold.otf` in every page's
  `<head>` (previously only `index.html` had any font preload). Bumped `?v=63` → `?v=64` on all CSS/JS links
  everywhere (including the styleguide).

**Acceptance:** ✅ Verified via a local server (`python -m http.server`) + a script that extracts every
`href`/`src` inside the nav/overlay/footer markers on all 11 pages (10 production + the 3 new vertical pages)
and resolves each one relative to its page — all returned 200. `python tools/sync-partials.py` run twice in a
row: first run reports `updated` for all 11 pages, second run reports `unchanged` for all 11 — confirmed
idempotent.

**Not done in this phase (deliberately, per scope):** `partials/nav.html`'s new "The XTOPIA Advantage" link
points to `about.html#advantage`, which doesn't exist until Phase 5 — acceptable, an anchor to a missing id just
scrolls to top, it doesn't 404. `#flip`/old positioning copy inside page `<main>` content (e.g. index.html's CTA
section still says "Community-Driven Platform") was left alone — that's Phase 2+ content, not nav/footer/meta.

---

## Phase 2 — Home page (`index.html`)  ⬜

Order and theme of the new home (L = light cream, D = black):

| # | Section | Theme | Action |
|---|---|---|---|
| 1.1 | Hero | D | **Update** |
| 1.2 | Who we are + 5-business strip | L | **Rewrite** (replaces "Who are we?") |
| 1.3 | Platform in numbers + map | D | **Rewrite** (replaces ticker) |
| 1.4 | The XTOPIA Advantage | L | **New** (replaces Flip + Framework) |
| 1.5 | Our Ecosystem — 5 businesses | D | **Rebuild** (was 4 cards on light-blue) |
| 1.6 | ARADA × XTOPIA partnership | L | **New** — client priority |
| 1.7 | Featured: SOHO Jeddah | D | **Fix data** |
| 1.8 | One group | L | **New** |
| 1.9 | Leadership teaser | D | **New** |
| 1.10 | Closing CTA "A world to belong to." | D (X image bg) | **Rewrite** |

- [ ] **1.1 Hero** — keep video/Three.js grid; replace `COMMUNITY • DRIVEN • PLATFORM` with **WE SEE CHALLENGES AS OPPORTUNITIES TO** *build better.*; bottom strip `BUILT AROUND PEOPLE · POWERED BY ENTREPRENEURS · DESIGNED TO SCALE`; location label → `Jeddah, Saudi Arabia`. Optional: hero image inside `.x-mask--lg` (profile cover).
- [ ] **1.2 Who we are** — 3 paragraphs from CONTENT §1; side title **One platform.** *Multiple ways to build.*; below: 5 tall image tiles (logo + sector) linking to each business (profile p.2). Remove olive inline bg.
- [ ] **1.3 Numbers** — `.stat-row` with 6 stats from CONTENT §2 + 4-country map (new asset; old `map-global-presence-5-countries.png` is wrong). Delete old ticker markup (or keep ticker with new numbers as a thin band — decide in review).
- [ ] **1.4 The XTOPIA Advantage** — two columns (entrepreneur brings / XTOPIA brings) meeting at a central `.x-mask` image; caption line. GSAP: items slide in from each side. Delete `#flip` and `#framework` sections + `flip_bg.png` / framework icons usage (keep files until final cleanup).
- [ ] **1.5 Ecosystem** — intro *Co-founded by Ali Al Shareef alongside entrepreneurs who know their sectors from within.*; 5 cards (TROFI, BEYOND, MHYA, ARADA Saudi, XEED): X image + logo + sector + maroon/cream italic line + 2 key stats + Explore →. Optional hover: co-founder names.
- [ ] **1.6 ARADA × XTOPIA** — **Complete communities.** *Built around Saudi life.*; two-column ARADA vs XTOPIA capability list; *Fully integrated ecosystem.*; Arada proof numbers ⚠️; 3 project cards (Al Remal, Marasem, Bawabat Makkah) with renders already in `assets/images/photos/developments/` → link `verticals/arada.html`.
- [ ] **1.7 SOHO Jeddah** — label "A MHYA destination · Opening January 2027"; title **A destination shaped around** *everyday life.*; stats 42.5K built-up · 14K commercial · 13.5K administrative · 75 units; keep video.
- [ ] **1.8 One group** — 3 steps (build the place → bring it to life → will supply it) with logos and connecting arrows/line animated on scroll.
- [ ] **1.9 Leadership teaser** — 5 portraits (grayscale) + names/titles ⚠️ CONFIRM list → `people.html`.
- [ ] **1.10 Closing** — **A world** *to belong to.* + 3 lines (Community is the reason…) + `Get in touch →` (and secondary `Partner with us →`).

**Acceptance:** no text from the old positioning remains (`grep -i "flips this\|anchor\|community-driven\|From concept to life" index.html` returns nothing); light/dark rhythm alternates; mobile layout OK.

---

## Phase 3 — Ecosystem hub (`verticals.html`)  ⬜
- [ ] Hero: **One platform.** *Multiple ways to build.* — subtitle drop "Anchor · Develop · Activate" → `Food · Sport · Places · Communities · Agriculture`.
- [ ] Accordion → 5 panels with new descriptions + stats (CONTENT §5–9). Remove BeFit/Developments panels.
- [ ] Add "One group" mini-diagram at bottom linking to about.html#one-group.

---

## Phase 4 — Business pages (shared template)  ⬜

Template order for each page: **A** `.biz-cover` (light) → **B** what it is + `.stat-row` → **C** formats/portfolio → **D** projects/places → **E** **Taking X further** (`.points` + big target number, ⚠️) → **F** co-founders → **G** next business link (cycle TROFI → BEYOND → MHYA → ARADA → XEED → TROFI) + forward-looking disclaimer.

### 4.1 TROFI — `verticals/trofi.html` ⬜
- [ ] Cover: *Redefining how food brands grow*
- [ ] B: **One business.** *Multiple routes to growth.* + Dine-in/Cloud kitchens split + stats 74+ / 29+ / 12 / 20M+ (was 30+/12/20M)
- [ ] C: portfolio heading "30+ brands" → "29+ brands"; keep logo wall + Innovation Lab (relabel "Opening 2026–2027")
- [ ] Keep Awards section (already matches)
- [ ] E: Taking TROFI further (50+ / 90% + 4 points)
- [ ] F: co-founders AlHassan & Abdulrahman Al Shareef · G: next → BEYOND

### 4.2 BEYOND — `verticals/beyond.html` (rebuild) ⬜
- [ ] Cover: *Movement becomes a way of life* (new BEYOND logo variant)
- [ ] B: **Two arms.** *One community.* — `#sports` (35+ / 100K / 100+) and `#destinations` (2.8M / 650 / 750K)
- [ ] C: **A family of formats** — 5 formats with logos from `assets/images/logos/sports-brands/` + Seasonal beach gyms band
- [ ] Move useful BeFit content (app points program, real-estate partner logos) here ⚠️ CONFIRM still current
- [ ] D: **Places brought to life** — destination logos/photos (Boulevard, Lake District, My Park, AKTI, SOHO *Opening 2027*, Marassi Water World, Seasonal activations)
- [ ] E: Taking BEYOND further (200K, 2x + 4 points) · F: Aly Mazhar · G: next → MHYA

### 4.3 MHYA — `verticals/mhya.html` (new) ⬜
- [ ] Cover: *Thoughtfully developed, distinctively lived* (logo `logo-mahya-*` — verify vs new mark)
- [ ] B: **Places with purpose.** *Local demand. The right operators.* + 3 formats + What MHYA brings
- [ ] D1: SOHO Jeddah block (CONTENT §7) — reuse renders + video
- [ ] D2: Neighbourhood Destinations — reuse `assets/images/photos/parks/park-mahya-*`
- [ ] D3: Industrial & Logistics, Slovakia — Sihot Park + Ferovo Park cards
- [ ] Fund partners strip (SNB Capital, SEDCO, Al Rajhi) from old developments page ⚠️ CONFIRM
- [ ] E: Taking MHYA further (3 points) · F: Ayoub Buhdeima · G: next → ARADA

### 4.4 ARADA Saudi — `verticals/arada.html` (new, priority) ⬜
- [ ] Cover: ARADA Saudi logo + *A partnership for Saudi communities*
- [ ] **Complete communities.** *Built around Saudi life.* + ARADA | XTOPIA columns + *Fully integrated ecosystem.*
- [ ] **Proven delivery.** *Global ambition.* 4 stats + 3 selected projects (Aljada, Thameside West, Masaar) ⚠️
- [ ] **The capability to deliver at scale.** 4 numbered points
- [ ] **Taking ARADA Saudi further** — full-bleed landscape image, then 3 project sections (Al Remal, Marasem, Bawabat Makkah) each: city, tagline, 2 stats, proposed mix, render, location map (`assets/images/maps/map-al-remal-…` exists)
- [ ] G: next → XEED

### 4.5 XEED — `verticals/xeed.html` (new) ⬜
- [ ] Cover: *From seed to xeed* (logo: start from `logos/partners/logo-xeed-corporation.png`, replace with new)
- [ ] **Rooted in farming.** *Connected to markets.* + 3 capabilities with icons + stats 53M+ / 3,000+ / 50K / 3M+
- [ ] **We grow. We manage. We source.** 3 photo cards + "one shared route to market" flow line
- [ ] E: Taking XEED further — *Built in Egypt. Growing in Saudi Arabia.* 4 steps
- [ ] F: Ahmed Tawfik & Tamer Serour · G: next → TROFI

---

## Phase 5 — About (`about.html`)  ⬜
- [ ] Hero: "WE ARE XTOPIA." keep; paragraph → CONTENT §1 Who we are.
- [ ] `#story`: rewrite around the new model (people → entrepreneurs → businesses). Draft from CONTENT §1 + §3; ⚠️ CONFIRM copy with client.
- [ ] New `#advantage` (full version of The XTOPIA Advantage) and `#one-group`.
- [ ] `#values`: keep the 5 values but reword "anchor / envelope / development" language to the business-building model ⚠️ CONFIRM.
- [ ] `#presence`: **4 countries** (remove Kuwait), new map, add per-country note (Saudi: HQ Jeddah · Egypt: XEED/BEYOND · UK: TROFI · Slovakia: MHYA industrial) ⚠️ CONFIRM.

## Phase 6 — People (`people.html`)  ⬜
- [ ] Hero: **THE PEOPLE** *behind the platform*; subtitle drops "future of destinations".
- [ ] XTOPIA Leadership Team per CONTENT §11 ⚠️ (Jordana, Khalid Abdelmajeed, Nomaan, Alaa).
- [ ] New "Co-founders" row: one card per business (logo + founder photos).
- [ ] Rename team sections → TROFI · BEYOND · MHYA · add XEED. Board unchanged.

## Phase 7 — Careers, Contact & cleanup  ⬜
- [ ] Careers copy: "shaping the built environment" → "building businesses around people"; add `id="positions"`.
- [ ] Contact: headline keep or → **Let's build** *something together.*; add "Partner with us" subject option (entrepreneurs / landowners / developers).
- [ ] Remove now-unused CSS (`.flip`, `.framework`, old ticker if dropped) and unused assets (move to `assets/_archive/`, don't delete).
- [ ] Update `README.md` + `SKILLS.md` (page list, positioning); mark the 3 old `xtopia-*.md` docs as superseded (header note).

## Phase 8 — QA & launch  ⬜
- [ ] `grep` for all ⚠️ `CONFIRM` markers → client sign-off list; remove unapproved items.
- [ ] Link check all pages; no console errors; Lighthouse ≥ 90 perf on home (compress new images to WebP ≤ 300 KB).
- [ ] Reduced-motion + mobile pass; RTL not required.
- [ ] Merge `rebrand-oct-2026` → `main` only after client approval of a preview.

---

## Decisions already taken (do not ask again)
| # | Topic | Decision |
|---|---|---|
| D1 | Original logo files | None exist → use the traced SVGs in `assets/images/rebrand-2026/logos/` as final |
| D2 | High-res people photos | None → use the photos available in the repo (best of `photos/team/` vs `rebrand-2026/people/`) |
| D3 | Photo ↔ name mapping | Verified correct by Zakaria |
| D4 | Fonts | Use the profile's type system (Montserrat + Book Antiqua Italic + Barques numbers + Acumin body), not the current website fonts — see Phase 0.2 |
| D5 | Colours | Default: use the values sampled from the profile (replace only if the client sends official HEX) (cream `#F6F0E4`, text `#2E2E2E`, navy `#00263E`, light-blue `#BFD4DD`, maroon `#350004`) |

## Still open — ask the client
1. Publication approval for confidential items: Arada financials, "Taking X further" targets, proposed projects.
2. Leadership list: Jordana Semaan (CPO), Khalid Abdelmajeed vs Nomaan Yunus (CFO), Alaa Saad.
3. Taif and Al Jawhara projects — keep or remove?
4. BeFit 360 app + points program, fund partners, real-estate partners — still current?
5. Social media URLs and official email domain.
6. Separate "Partnerships" item in the main nav, or is ARADA in Ecosystem + home section enough?

## Progress log
| Date | Phase | Notes |
|---|---|---|
| 2026-10-14 | — | Plan created from October 2026 profile + codebase audit |
| 2026-10-14 | 0.2 / 0.4 | Fonts switched to the profile's system (Montserrat added to `assets/Fonts/Montserrat/`); logo/photo decisions D1–D5 recorded |
| 2026-10-14 | 0.4 | 97 temporary assets extracted from the PDF → `assets/images/rebrand-2026/` |
| 2026-10-14 | 0 | Phase 0 complete: tokens + `.theme-light`/`.theme-dark` (variables.css/layout.css); Montserrat loaded, all 59 Gotham refs replaced with `--font-heading`/`--font-body`/`--font-number` tokens (typography.css/sections.css/components.css); new components `.title-split`, `.stat-row`, `.x-mask`, `.x-watermark`, `.biz-cover`, `.points`; `docs/rebrand-2026/styleguide.html` created and verified. Added `--color-taupe-text` (not in original spec) to fix a WCAG AA contrast failure on the sampled taupe token. Bumped cache-bust to `?v=63` on all 10 pages; updated index.html's font preloads. Also added a deploy-time strip step to `.github/workflows/deploy-pages.yml` (removes docs/tools/partials/CLAUDE.md/SKILLS.md/xtopia-*.md from the published copy only). No HTML page content/structure touched. |
| 2026-10-14 | 1 | Phase 1 complete: `partials/{nav,nav-overlay,footer}.html` + `tools/sync-partials.py` (idempotent, verified by running twice); Ecosystem nav is now a mega-menu with the 5 business logos/sectors + ARADA "Partnership" tag (new `.dropdown__menu--mega` styles); footer tagline/descriptor/Ecosystem column/Careers link updated per CONTENT.md, socials hidden + email flagged `data-confirm`; `nav.js` now computes `.is-active` from the URL instead of it being hardcoded per page (required for identical partials); created `verticals/{mhya,arada,xeed}.html` skeletons (biz-cover hero only, full content is Phase 4) and turned `befit.html`/`developments.html` into redirect stubs; meta title/description cleaned up on all 6 root pages (also fixed a pre-existing bug — people.html was duplicating about.html's meta); font preloads added to every page, cache-bust → `?v=64`. All nav/overlay/footer links verified 200 via a local server. |
