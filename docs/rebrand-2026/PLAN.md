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

## Phase 0 — Design system: the new look  ⬜

**Why first:** every later section depends on it. This phase alone should make the site feel "in colour".

### 0.1 Tokens — `css/variables.css`
- [ ] Add surface tokens (keep existing brand tokens):
  ```css
  --color-cream-warm: #F6F0E4;  /* profile page background (sampled) — main light surface */
  --color-sand:       #E4DBCC;  /* cards / secondary light surface */
  --color-taupe:      #9D8A75;  /* labels, rules, secondary text on light */
  --surface-light:    var(--color-cream-warm);
  --surface-dark:     #000000;  /* profile uses true black */
  --text-on-light:    #2E2E2E;  /* profile body text on cream */
  --text-on-dark:     #FFFBF7;  /* profile text on black */
  --accent-number:    var(--color-navy);        /* stat numbers on light (profile: #00263E) */
  --accent-number-dark: var(--color-light-blue);/* stat numbers + small caps labels on dark (profile: #BFD4DD) */
  --accent-italic:    var(--color-maroon);      /* italic taglines on light */
  ```
- [ ] Add theme classes in `css/layout.css`: `.theme-light` (cream bg, #2E2E2E text, navy numbers, maroon italics) and `.theme-dark` (black bg, #FFFBF7 text, light-blue `#BFD4DD` numbers/labels). Every `<section>` must carry exactly one.

### 0.2 Typography — `css/typography.css`  ⚠️ client decision: use the **profile's** fonts, not the current website's

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
- [ ] Add **Montserrat** (300/400/500/600/700, self-hosted woff2, SIL OFL) — files already in `assets/Fonts/Montserrat/` → declare `@font-face` in `typography.css`.
- [ ] Add tokens: `--font-heading: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;` `--font-body: 'Acumin Variable Concept', 'Montserrat', sans-serif;` `--font-accent: 'Book Antiqua', Georgia, serif;` `--font-number: 'Barques', 'Montserrat', sans-serif;`
- [ ] Replace **all 59** `'Gotham'` references (never loaded → site currently renders in Arial/Helvetica):
  - `.type-hero / .type-display / .type-heading` → `--font-heading` (700 for sentence-case titles, 400 for uppercase headlines). Drop forced `text-transform: uppercase` on section titles — the profile uses sentence case ("One business.").
  - `.type-subhead`, lead paragraphs → `--font-heading` 300
  - `body`, `.type-body`, `.type-caption`, card text → `--font-body` 300/400
  - `.type-label` / eyebrows → `--font-heading` 700, uppercase, letter-spacing ≈ 0.3em
  - All `data-count` / stat numbers / `.ticker__num` / `.feature__stat .num` → `--font-number` 800
- [ ] `em / .u-italic / .type-italic` stay Book Antiqua Italic — colour `--accent-italic` on light, `--text-on-dark` on dark.
- [ ] Barques is **no longer** the heading font — only numbers (and nothing else).
- [ ] Ignore the minor fonts that appear once or twice in the PDF (Open Sans, Lora Italic, Times NR MT Pro Italic, Calibri, Noto Sans, Canva Sans) — map them to the tokens above.
- [ ] Preload `Montserrat-700.woff2`, `Montserrat-300.woff2`, `Barques-ExtraBold.otf` in every page `<head>` (replace the current Barques-ExtraBold + Acumin preloads).

### 0.3 New reusable components — `css/components.css` (+ small JS if needed)
- [ ] **Split title** `.title-split` — line 1 Barques bold, line 2 Book Antiqua italic (e.g. **Taking TROFI** *further.*).
- [ ] **Stat row** `.stat-row` — big Barques number (navy on light / cream on dark), label in brackets `[ EMPLOYEES ]`, thin vertical dividers; reuse existing `data-count` count-up.
- [ ] **X-mask media** `.x-mask` — image clipped to the XTOPIA X shape via CSS `mask-image` (inline SVG data URI). Variants: `--lg` (hero/cover), `--card`.
- [ ] **Watermark X** `.x-watermark` — huge, 6–8% opacity X behind light sections (profile p.4, 7, 16, 22).
- [ ] **Business cover** `.biz-cover` — light bg, centered X-mask image + business logo + maroon italic line (profile p.6/10/15/21/29). Used at top of each business page.
- [ ] **Numbered points** `.points` — `01 / 02 / 03 / 04` with title + text (the "Taking X further" blocks).
- [ ] **Confidential-style header strip** (optional, ask client): tiny `XTOPIA · …   OCTOBER 2026` label row.

### 0.4 Assets  ✅ final decisions (2026-10-14)
> Assets extracted from the PDF are in `assets/images/rebrand-2026/` (see its `README.md` for sizes).
> - **Logos: there are no original files — the SVGs in `assets/images/rebrand-2026/logos/` ARE the final logos.** Always use the `.svg` (white on dark, dark on light); never the old PNG logos for TROFI/BEYOND/MHYA/ARADA/XEED.
> - **People photos: use what exists now.** For each person pick the larger file between `assets/images/photos/team/` (existing) and `assets/images/rebrand-2026/people/` (from profile). Display them at card size (≤ 240px wide), grayscale, as in the profile.
> - **Co-founder / leadership file names are verified correct** (incl. AlHassan vs Abdulrahman Al Shareef).
> - Small photos (🔴 in the README) → cards/thumbnails only, never full-width.
- [x] ~~Create `assets/images/rebrand-2026/` and add: ARADA Saudi logo, XEED logo (light + dark), MHYA logo (check existing `logo-mahya-*` matches the new mark), per-business X images, XEED photos, Slovakia park photos, SOHO new renders, 4-country map, leadership photos (Jordana, Khalid Abdelmajeed), co-founder photos (Ahmed Tawfik, Tamer Serour). Source: client originals; fallback = images extracted from the PDF.~~ Done — extracted from the PDF.
- [ ] Name files semantically like the existing convention (`logo-arada-saudi-dark.png`, `xeed-farm-rows-aerial.jpg`).

**Acceptance:** a test page `docs/rebrand-2026/styleguide.html` (not linked from nav) shows tokens, both themes, all new components, real fonts rendering (DevTools → Computed: titles = Montserrat, numbers = Barques, italics = Book Antiqua, body = Acumin).

---

## Phase 1 — Structure: nav, footer, sitemap, redirects  ⬜

- [ ] **Partials sync:** create `partials/nav.html`, `partials/nav-overlay.html`, `partials/footer.html` and `tools/sync-partials.py` that replaces content between `<!-- @nav:start -->…<!-- @nav:end -->` (etc.) in all pages and rewrites paths for `verticals/` (prefix `../`). Wrap the existing blocks in all 11 pages with these markers.
- [ ] **Nav (desktop dropdown + mobile overlay):**
  - About → Our Story · The XTOPIA Advantage · Our Footprint
  - Our Ecosystem → TROFI · BEYOND · MHYA · **ARADA Saudi** (small "Partnership" tag) · XEED — each item: logo + sector label (mega-menu)
  - Careers · People · Contact (unchanged sub-items)
- [ ] **Footer:** tagline → **A world** *to belong to.*; descriptor "Community-Driven Platform" → "Built around people · Powered by entrepreneurs"; ecosystem column = 5 businesses; replace "From concept to life."; socials → real URLs ⚠️ CONFIRM (hide icons until provided); Careers "Join the Team" → `careers.html#positions`; email ⚠️ CONFIRM `info@xtopia.com` vs `@xtopia.life`.
- [ ] **Meta** on every page: `<title>` and `description` drop "Community-Driven Platform" → e.g. `XTOPIA — Community-focused business-building platform`.
- [ ] Create skeleton pages `verticals/mhya.html`, `verticals/arada.html`, `verticals/xeed.html` (copy the vertical template: vhero + sections) so links don't 404.
- [ ] Turn `verticals/befit.html` and `verticals/developments.html` into redirect stubs (`<meta http-equiv="refresh">` + `<link rel="canonical">` + visible link).
- [ ] Loader + favicon: keep.

**Acceptance:** every nav/footer link resolves on every page (root and `verticals/`); `python tools/sync-partials.py` is idempotent.

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
