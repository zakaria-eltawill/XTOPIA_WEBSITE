# XTOPIA — Full Website Design Plan
> **Version:** 1.0 · 2026
> **Type:** Cinematic, Scroll-Driven, Community-Destination Platform
> **Direction:** Dark-luxury editorial meets architectural brutalism — restrained, powerful, alive

---

## DESIGN PHILOSOPHY

### The Big Idea
XTOPIA flips the script on how destinations are built. The website must flip the script on how corporate websites feel. This is **not** a standard real estate or F&B website. It is a living, moving destination in itself — a digital representation of the physical energy XTOPIA creates.

### Aesthetic Direction: **"Architectural Dark Cinema"**
- **Dominant feel:** A high-end architectural film reel. Dark, considered, cinematic.
- **Not:** A flashy startup. Not a real estate brochure. Not a lifestyle magazine.
- **Yes:** The weight of a physical space. The texture of concrete and cream linen. The silence before a crowd fills a room.
- **References to draw from:** Brutalist editorial + luxury Saudi modernity + the XTOPIA brand itself.

### Design Principles
1. **Gravity** — Every element should feel like it has weight. No floating, airy UI.
2. **Restraint with Impact** — Generous empty space that suddenly gives way to something massive.
3. **Motion with Purpose** — Animations reveal, don't decorate. Every movement tells part of the story.
4. **Texture over Flatness** — The XTOPIA grid pattern, grain overlays, and subtle noise give physical depth.
5. **Typography as Architecture** — Type is a structural element, not just text.

---

## TECH STACK

```
Framework:       HTML / CSS / Vanilla JS  (or Next.js if SSR needed)
3D Engine:       Three.js  (for 3D hero, particle fields, geometric shapes)
Animation:       GSAP + ScrollTrigger  (primary scroll engine)
                 Lenis  (smooth scroll momentum)
Cursor:          Custom magnetic cursor
Scroll:          Lenis smooth scroll + GSAP ScrollTrigger pinning
Fonts:           BARQUES (primary) — self-hosted or Fontshare
                 Book Antiqua — Google Fonts / system
                 Acumin Variable Concept — Adobe Fonts / self-hosted
3D Particles:    Three.js PointCloud or custom WebGL shader
Video:           HTML5 background video (muted, autoplay, loop)
Icons:           Custom SVG icon set (no icon libraries)
```

---

## COLOR SYSTEM (CSS Variables)

```css
:root {
  /* Core */
  --c-void:        #111010;   /* Near-black — primary background */
  --c-charcoal:    #1A1919;   /* Slightly lighter dark panels */
  --c-cream:       #F0EDE3;   /* Primary text / accent on dark */
  --c-cream-dim:   #C8C5BC;   /* Secondary text on dark */

  /* Brand Palette */
  --c-sage:        #C2C7A3;
  --c-olive:       #4F5438;
  --c-steel:       #BFD4DE;
  --c-navy:        #00263D;
  --c-burgundy:    #360005;

  /* UI */
  --c-line:        rgba(240,237,227,0.12);   /* Subtle dividers */
  --c-line-bright: rgba(240,237,227,0.35);
  --c-overlay:     rgba(17,16,16,0.72);

  /* Gradients */
  --g-fade-up:    linear-gradient(to top, var(--c-void) 0%, transparent 100%);
  --g-fade-down:  linear-gradient(to bottom, var(--c-void) 0%, transparent 100%);
}
```

---

## TYPOGRAPHY SYSTEM

```css
/* Display — BARQUES ExtraBold/Heavy */
.type-hero      { font: 900 clamp(72px,10vw,180px)/0.9 'BARQUES'; letter-spacing: -0.02em; }
.type-display   { font: 800 clamp(48px,7vw,120px)/0.95 'BARQUES'; letter-spacing: -0.01em; }

/* Heading — BARQUES Bold */
.type-heading   { font: 700 clamp(32px,4vw,64px)/1.1 'BARQUES'; }
.type-subhead   { font: 400 clamp(18px,2vw,28px)/1.3 'BARQUES'; }

/* Accent — Book Antiqua Italic (used sparingly for warmth) */
.type-italic    { font: 400 italic clamp(24px,3vw,48px)/1.2 'Book Antiqua'; }

/* Descriptor / Labels — Acumin Variable Concept ExtraLight */
.type-label     { font: 200 12px/1 'Acumin Variable Concept'; letter-spacing: 0.3em; text-transform: uppercase; }
.type-caption   { font: 200 14px/1.4 'Acumin Variable Concept'; letter-spacing: 0.15em; }

/* Body — BARQUES Regular */
.type-body      { font: 400 clamp(16px,1.2vw,18px)/1.7 'BARQUES'; }
```

---

## GLOBAL COMPONENTS

### Custom Cursor
- Default: Small cream circle (8px), no outline
- On hover (links, CTAs): Expands to 48px ring with `MIX-BLEND-MODE: difference`
- On hover (images): Shows `"VIEW ↗"` text inside the ring
- On drag/scroll sections: Morphs to `"DRAG →"` with arrow
- Implementation: `mousemove` listener, GSAP `.to()` for lag/magnetic pull

### Navigation
- **Position:** Fixed top, full-width
- **Default state:** Transparent with cream logo top-left; nav links top-right in Acumin label style
- **Scrolled state (after 80px):** Ultra-thin backdrop blur, `rgba(17,16,16,0.85)` background, thin bottom border `rgba(240,237,227,0.1)`
- **Logo:** XTOPIA wordmark SVG, cream on dark
- **Nav links:** `COMMUNITY · ABOUT · PROJECTS · EXPERIENCES` — spaced, uppercase, Acumin ExtraLight, letter-spacing 0.25em
- **CTA button:** Hairline cream border pill `[ CONTACT → ]` — on hover: fills cream, text flips to void black
- **Mobile:** Full-screen overlay menu — grid of nav items, each filling a cell, with staggered reveal. Background uses the XTOPIA grid pattern at low opacity.
- **Hamburger:** Two horizontal lines → X, animated with GSAP

### Page Loader
- Full-screen black overlay
- XTOPIA wordmark draws itself via SVG stroke animation (2.5s)
- Counter `00 → 100` in top-right (Acumin, monospace numbers)
- Fades out with a vertical wipe reveal, exposing the hero beneath
- Total duration: ~3.5s, then never shown again (sessionStorage flag)

### Grid Texture Overlay
- The brand's cross-line grid pattern applied as a `::before` pseudo-element on key sections
- `opacity: 0.04 → 0.08` depending on section
- `background-size: 80px 80px` using CSS repeating linear gradients
- Adds tactile depth without competing with content

### Scroll Progress Indicator
- Thin cream line, 2px wide, runs along the very left edge of the viewport
- Grows from top to bottom as user scrolls (GSAP ScrollTrigger scrub)

---

## SITE MAP — 7 PAGES + OVERLAY SECTIONS

```
/                   → Home (Landing)
/about              → About & The Framework
/verticals          → What We Do (5 Verticals hub)
  /verticals/trofi              → TROFI F&B
  /verticals/befit              → BeFit 360 Sports
  /verticals/developments       → XTOPIA Developments
  /verticals/mahya              → MAHYA Neighborhood Parks
  /verticals/beyond             → BEYOND Activations
/projects           → Development Projects
/community          → Community & Experiences
/contact            → Contact
```

---

---

# PAGE 01 — HOME `/`

## Purpose
Make an immediate, visceral impression. Establish the XTOPIA philosophy in motion. Draw the user into the world before they read a single word.

---

## SECTION 1.1 — HERO (Full Screen, 3D)

**Visual:**
- **Three.js background:** A slowly rotating 3D grid of thin cream lines on void black — the XTOPIA grid pattern rendered in 3D perspective, with a subtle depth-of-field blur toward the edges. Grid planes recede into infinity.
- **Over this:** Full-screen video (muted, autoplay) crossfaded at `opacity: 0.25` — aerial footage of the SOHO Jeddah development or community footage from the assets.
- **Grain overlay:** CSS noise texture at 4% opacity, animated with subtle movement.

**Content Layout:**
```
[Top-left]  XTOPIA wordmark  (small, Acumin label weight)
[Top-right] Nav links

[Center-bottom, 60% from top]
  COMMUNITY              ← Acumin label, cream-dim, tracks mouse slightly (parallax)
  DRIVEN                 ← BARQUES Heavy, ~12vw, cream, each word on its own line
  DESTINATION            ← same
  PLATFORM               ← same, last word fades in last

[Bottom-left]  "SCROLL TO EXPLORE  ↓"  ← Acumin ExtraLight, animated bouncing arrow
[Bottom-right] "EST. 2026 · SAUDI ARABIA"  ← Acumin label
```

**Animations:**
- On load (after loader): Words stagger up from `translateY(120px)` with blur `filter: blur(8px) → 0`, each word 80ms apart
- Subtle `mousemove` parallax on the hero text (words move at different depths)
- The 3D grid slowly rotates on Y axis (0.0003 rad/frame), responding to mouse with a gentle tilt (Three.js)
- CTA arrow pulses with a `scaleY` breath animation

---

## SECTION 1.2 — THE FLIP STATEMENT (Scroll Trigger: Pin)

**Visual:** White/cream background — the only light section on the homepage. A stark contrast moment.

**Mechanics:**
- Section pins for ~200vh of scroll distance
- Text reveals word-by-word as user scrolls (GSAP ScrollTrigger scrub)

**Content:**
```
[Large centered type, ~8vw, BARQUES Light, dark charcoal]

"MOST DESTINATIONS            ← reveals first (left-to-right opacity)
ARE BUILT FIRST,              ← second
THEN FILLED                   ← third
WITH LIFE."                   ← fourth, pause

[After a scroll beat, old text blurs out and new text snaps in:]

"XTOPIA                       ← BARQUES ExtraBold, massive, same size
FLIPS THIS."                  ← Book Antiqua italic for "this" — warm contrast
```

**Bottom of pin:** A thin horizontal cream-on-cream divider with the label `THE XTOPIA FRAMEWORK ↓`

---

## SECTION 1.3 — THE FRAMEWORK (3-Column Animated)

**Visual:** Returns to dark. Three columns, each with a large number.

**Content:**
```
01  ANCHOR          02  DEVELOP         03  ACTIVATE
────────────────    ────────────────    ────────────────
Establish 5         Wrap the built      The space between
community           environment         becomes a living,
verticals with      around proven       programmable
real scale          demand.             framework.
before building.

[Under each column: a thin animated line draws itself left-to-right on scroll]
```

**Animation:**
- Columns stagger in from bottom (ScrollTrigger), 150ms apart
- The "01 · 02 · 03" numbers count up from `00` when entering viewport
- Connecting line between columns draws itself with an SVG stroke animation
- On hover each column, the background subtly tints to the column's associated color (cream wash)

---

## SECTION 1.4 — STATS BAR (Horizontal Scroll Ticker)

**Visual:** Full-width, dark background, single horizontal strip

**Content (infinite ticker, auto-scrolling left):**
```
9+ Countries  ·  3,000+ Employees  ·  100K+ Active Members  ·  35M+ SQM  ·  20M Meals Served  ·  18+ Neighborhood Parks  ·  30+ F&B Brands  ·  10 Destination Developments  ·  [repeats]
```

**Style:**
- Numbers in BARQUES ExtraBold, large (~40px)
- Labels in Acumin ExtraLight, small (12px), below each number
- Separated by the XTOPIA `·` bullet in sage green
- Smooth CSS `animation: marquee linear infinite` (pauses on hover)

---

## SECTION 1.5 — VERTICALS (5-Panel Horizontal Scroll)

**Concept:** 5 large panels, side by side, that the user scrolls through horizontally while the page appears to scroll vertically (GSAP horizontal scroll section).

**Each panel:**
```
Panel 1: TROFI
Panel 2: BEFIT 360
Panel 3: DEVELOPMENTS
Panel 4: MAHYA
Panel 5: BEYOND
```

**Panel anatomy:**
- Full-height panel (~100vh × ~80vw each)
- Background: Full-bleed image from assets, with a dark overlay gradient bottom-to-top
- Bottom-left: Vertical number `01` in giant faded type (Acumin, `opacity: 0.15`, `font-size: 30vw`)
- Center: Sub-brand logo SVG (TROFI, BeFit, etc.)
- Bottom: One-line brand tagline in Book Antiqua italic
- Bottom-right: `EXPLORE →` pill CTA in hairline cream border

**Hover state per panel:**
- Image scale up `1.0 → 1.04` (smooth 600ms)
- Overlay lightens slightly
- CTA animates right `→`

**Transition between panels:**
- GSAP `horizontal` ScrollTrigger container
- Panels have a subtle parallax (background image moves at 0.7× the panel speed)

---

## SECTION 1.6 — FEATURED PROJECT REVEAL

**Concept:** SOHO Jeddah as the hero project. Cinematic full-screen reveal.

**Visual:**
- Dark section, text left
- Right side: Architectural image of SOHO Jeddah in a shaped container (angled clip-path, not a plain rectangle)
- The image has a subtle Ken Burns (slow zoom) effect

**Content:**
```
[Label]  FEATURED PROJECT · 2026

[Display]  SOHO
           JEDDAH

[Sub]  A lifestyle community empowered
       by local culture.

[Stats row]  42,500 SQM  ·  14,000 Commercial  ·  Opening Sept 2026

[CTA]  VIEW PROJECT →
```

**Animation:**
- Image clip-path animates from `inset(100% 0 0 0)` → `inset(0% 0 0 0)` on scroll enter (wipe up reveal)
- Text staggers left-to-right after image starts revealing
- Stats count up from 0 when entering viewport

---

## SECTION 1.7 — COMMUNITY QUOTE BREAK

**Concept:** A full-screen typographic moment. No images.

**Visual:** Void black background. Giant text only.

```
[Center, stacked]

LET'S BUILD         ← BARQUES Bold, ~9vw, cream
SOMETHING           ← same
great together      ← Book Antiqua italic, ~7vw, cream-dim — different weight contrast

[Bottom-center]  "COMMUNITY · DRIVEN · PLATFORM"  — Acumin label, tracked wide
```

**Animation:**
- Each line has a ScrollTrigger that pins briefly while the line fades in with a directional blur
- The italic line has a slightly delayed entry with a subtle right-to-left wipe

---

## SECTION 1.8 — AWARDS & PARTNERS STRIP

**Content:** Logos of key awards and global partners on a cream background strip.
```
Row 1 (Awards):     Fact · What's On · Time Out · Middle East 50 Best
Row 2 (Partners):   Nike · Lululemon · EMAAR · Emirates · Adidas · Alo
```

**Style:**
- Cream background, dark logos
- Auto-scrolling ticker (opposite direction to Section 1.4)
- On hover: ticker slows to 30% speed

---

## SECTION 1.9 — HOMEPAGE FOOTER CTA

**Content:**
```
[Large centered]  READY TO BUILD      ← BARQUES ExtraBold, ~8vw
                  SOMETHING GREAT?    ← same, Book Antiqua italic on "GREAT"

[Below]  [ GET IN TOUCH → ]          ← Large pill button, cream background, dark text

[Tiny below]  "EST. 2026 · COMMUNITY-DRIVEN DESTINATION PLATFORM"
```

**Animation:** On scroll into view, the `?` animates in last with a bounce, the button pulses once.

---

---

# PAGE 02 — ABOUT `/about`

## Purpose
Tell the XTOPIA story with depth. The framework. The mission. The team.

---

## SECTION 2.1 — ABOUT HERO

**Visual:** Half dark, half architecture photograph (SOHO aerial)

```
[Left, vertically centered]
  [Label]  WHO WE ARE

  [Display, stacked]
  WE ARE
  XTOPIA.

  [Body]  We believe the future is built through
          connection. Not by working alone, but
          by creating together...

  [CTA]  MEET THE TEAM ↓
```

---

## SECTION 2.2 — PHILOSOPHY (Scroll-Pinned Text Swap)

Three pinned screens, each staying for ~150vh of scroll:

**Screen A:** "We believe the future is built through connection."
**Screen B:** "Rooted in culture, driven by purpose."
**Screen C:** "XTOPIA is more than a space. It's a movement."

Each screen: Giant centered text, void background, single sentence. Words fade in sequentially per scroll delta.

---

## SECTION 2.3 — THE FRAMEWORK (Deep Dive)

Full-width, alternating left/right layout for each of the 3 framework pillars:

**01 ANCHOR** — Left text, right animated 3D icon (Three.js anchor shape, rotating slowly in cream wireframe)
**02 DEVELOP** — Right text, left architectural image
**03 ACTIVATE** — Left text, right video loop of a live activation event

Each section scrolls in with a split reveal: text from left, visual from right, meeting in the middle.

---

## SECTION 2.4 — GLOBAL PRESENCE MAP

**Visual:** Dark world map (SVG or canvas), with XTOPIA location dots pulsing in cream/gold.

Countries: Saudi Arabia · UAE · Egypt · Kuwait · Bahrain · Qatar · UK · Cyprus · Slovakia

Each dot:
- Pulsing ring animation (CSS keyframes, staggered)
- On hover: Country name label fades in above dot
- Saudi Arabia: Larger dot with more intense pulse (HQ)

**Below map:** `9+ Countries` counter with Acumin label

---

## SECTION 2.5 — BOARD & LEADERSHIP

**Layout:** A staggered grid of portraits (black & white photography from assets)

**Board members displayed first**, then Leadership Team.

Each card:
- B&W photo fills card
- Bottom bar slides up on hover: Name in BARQUES Bold + Title in Acumin label
- Subtle grain overlay on each photo
- Cards appear in a staggered ScrollTrigger cascade (bottom-to-top, 100ms apart)

**Board:**
Mohammad Dahban (Chairman) · Ali Alshareef (Founder, Group CEO) · Anas Alsairafy · Abdullah Alsayed · Amr Sulaiman

**Executive Team:**
Ali Alshareef · Tariq Altuwaijri · Jordana Semaan · Nomaan Yunus · Nadim Kayyali · Alaa Saad

---

---

# PAGE 03 — VERTICALS HUB `/verticals`

## Purpose
Introduce all 5 business verticals as distinct-yet-unified arms of one platform.

---

## SECTION 3.1 — VERTICALS HERO

```
[Stacked, centered]
  [Label]  THE ECOSYSTEM
  [Display, huge]  ONE PLATFORM.
                   FIVE EXPRESSIONS.

[Below, tracked label]  ANCHOR  ·  DEVELOP  ·  ACTIVATE
```

Background: The XTOPIA grid pattern in 3D perspective (Three.js), cream lines on void.

---

## SECTION 3.2 — VERTICAL SELECTOR (Full-Screen Accordion)

**Concept:** 5 horizontal bars stacked, each representing one vertical. Default: all equal height (~20vh each). On hover/click: selected bar expands to ~70vh, others compress to 8vh.

**Each bar (collapsed):**
```
[Left] 01  TROFI · F&B GROUP
[Right] Food as a Social Connector →
```

**Selected bar (expanded):**
- Background image fades in (full bleed)
- Sub-brand logo appears
- Stats row fades in (30+ Brands · 12 Cities · 20M Meals)
- `EXPLORE VERTICAL →` CTA slides in from right

**Verticals:**
1. `01 · TROFI · F&B GROUP` — olive green accent
2. `02 · BEFIT 360 · SPORTS & WELLNESS` — steel blue accent
3. `03 · XTOPIA DEVELOPMENTS · REAL ESTATE` — sage green accent
4. `04 · MAHYA · NEIGHBORHOOD PARKS` — deep olive accent
5. `05 · BEYOND · ACTIVATIONS` — cream/burgundy accent

---

---

# PAGE 04 — VERTICAL DETAIL PAGES

Each vertical has its own page. They share a structure but differ in color accent, imagery, and content.

## Template Structure:

### Section A — Vertical Hero
- Full-screen, dark-dominant
- Sub-brand logo large and centered
- Tagline in Book Antiqua italic below
- Background: Layered parallax imagery (3 layers at different scroll speeds)
- Scroll indicator: `DISCOVER ↓`

### Section B — What It Is
- Split layout: text left, key visual right
- 2–3 paragraph description
- 3 key stats in large BARQUES type

### Section C — Brands / Sub-brands Grid
- Masonry-style brand logo grid
- On hover each logo: Shows brand name + one-line description
- For TROFI: Full 20-brand grid + Innovation Lab section

### Section D — Specific Feature Callout
- TROFI: Awards section with media logos
- BeFit 360: App showcase mockup + membership stats
- Developments: Projects list with locations
- MAHYA: Park diagram / feature breakdown
- BEYOND: Destination portfolio carousel

### Section E — Partners Strip
- Relevant partner logos for that vertical
- Auto-scroll ticker

### Section F — CTA to adjacent vertical
- `NEXT: BEFIT 360 →` — always links to the next vertical in sequence

---

---

# PAGE 05 — PROJECTS `/projects`

## Purpose
Showcase all 6 development projects with architectural depth and real data.

---

## SECTION 5.1 — PROJECTS HERO

```
[Label]  DESTINATION DEVELOPMENTS
[Display]  WHERE LIFE          ← BARQUES ExtraBold
           HAPPENS.            ← same

[Body]  10 destination developments across Saudi Arabia.
        35M+ SQM. Rooted in culture, designed for life.
```

Background: Slow horizontal pan across SOHO Jeddah architectural render.

---

## SECTION 5.2 — PROJECTS GRID (Masonry + Filter)

**Filter bar (Acumin label, hairline buttons):**
```
[ ALL ]  [ JEDDAH ]  [ RIYADH ]  [ TAIF ]  [ MAKKAH ]
```

**Projects:**

| Project | Location | Key Stat |
|---------|----------|----------|
| SOHO Jeddah | Jeddah Corniche | 42,500 SQM · Opening Sept 2026 |
| Al Remal | Riyadh | 2.66M SQM · 4,000 Units |
| Marasem | North Jeddah | 1.2B SAR · 1M+ SQM |
| Bawabat Makkah | Makkah | 6.8M SQM |
| Taif | Taif | 160,000 SQM · 161 Plots |
| Al Jawhara | Riyadh | 4.5B SAR · 1M SQM |

**Card design:**
- Tall rectangular card (portrait orientation, 3:4 ratio)
- Full-bleed architectural image
- Bottom: Project name in BARQUES Bold, location in Acumin label
- On hover: Overlay slides up with stats + `VIEW →` CTA
- Cards stagger in on scroll with a `clipPath` wipe reveal

---

## SECTION 5.3 — FEATURED PROJECT DEEP-DIVE (SOHO Jeddah)

Full-screen dedicated section with:
- Large architectural renders (from assets)
- Floor breakdown animation (Levels 0→10 stacking up visually)
- Location map (embedded, styled dark)
- Key specs in a styled data table
- "Opening September 2026" countdown timer (optional)

---

---

# PAGE 06 — COMMUNITY `/community`

## Purpose
Bring the human, lived-in side of XTOPIA to life. Events, experiences, people.

---

## SECTION 6.1 — COMMUNITY HERO

```
[Label]  OUR COMMUNITY
[Display, large + italic mix]
  LET'S BUILD         ← BARQUES ExtraBold
  SOMETHING           ← same
  great together.     ← Book Antiqua italic
```

Background: Warm photography from F&B and sports assets — muted tones, people connecting.

---

## SECTION 6.2 — COMMUNITY PILLARS

Three full-width panels, stacked, each pinned briefly on scroll:

**Panel A — Food Culture** (TROFI context)
- Warm imagery of dining scenes
- Text: "Food is the original social connector. TROFI builds the tables where communities form."

**Panel B — Movement & Wellness** (BeFit 360 context)
- Action photography — group fitness
- Text: "We believe well-being is lived daily. BeFit 360 puts the gym in the neighborhood."

**Panel C — Live Experiences** (BEYOND context)
- Event photography — crowds, activations
- Text: "Not events. Social ignition. BEYOND turns destinations into living culture."

---

## SECTION 6.3 — MAHYA PARK INTERACTIVE

**Visual:** An isometric-style illustration (or 3D Three.js scene) of a MAHYA Park layout.

Interactive elements:
- Hover each zone (F&B, Sports, Playground, Mosque, etc.) → Tooltip popup with zone name + description
- Zones light up in cream when hovered
- Background rotates slowly (Three.js OrbitControls, auto-rotate)

**Stats below:**
```
100+              50–100+           600K+             1M+
Green Spaces      Jobs per Park     Youth Served      Annual Visitors
```

---

## SECTION 6.4 — EXPERIENCES CAROUSEL (BEYOND Portfolio)

**Full-width horizontal drag carousel:**

Cards for: Boulevard · The Lake District · My Park · Akti by Zahra · SOHO Jeddah · Marassi Water World

Each card:
- Full image
- Name overlay
- `EXPERIENCE ↗` on hover

**Instructions:** `DRAG TO EXPLORE →` label with animated cursor icon.

---

---

# PAGE 07 — CONTACT `/contact`

## Purpose
A premium contact experience. Not a generic form page.

---

## SECTION 7.1 — CONTACT HERO

**Visual:** Split screen — left: architectural dark (XTOPIA grid pattern full-screen), right: cream background with form

**Left side (dark):**
```
[XTOPIA logo, cream]

[Large type, bottom-left]
LET'S BUILD
SOMETHING
GREAT.

[Below]
"XTOPIA PLATFORM"
"COMMUNITY-DRIVEN DESTINATION PLATFORM"

[Very bottom]
Jeddah, Saudi Arabia
info@xtopia.com  (placeholder)
```

**Right side (cream):**
```
[Label, dark]  START A CONVERSATION

[Form — BARQUES style, underline-only inputs, dark on cream]
  NAME _______________
  EMAIL ______________
  MESSAGE ____________
         ____________
         ____________

  [ SEND A MESSAGE → ]  ← cream button on dark, arrow animates on hover
```

**Form interaction:**
- Each input label floats up on focus (CSS label animation)
- On submit: Button text becomes "SENDING..." with a loading dot animation, then "SENT ✓" in sage green
- Form has a subtle entrance: fields stagger in from right with blur

---

## SECTION 7.2 — FOOTER (Global)

**Dark background. Grid pattern texture at low opacity.**

```
[Top row]
  [Left]  XTOPIA logo (cream) + "COMMUNITY-DRIVEN DESTINATION PLATFORM" in Acumin label

[Main grid — 5 columns]
  ABOUT             COMMUNITY         EVENTS            CONTACT           EXPERIENCES
  Who We Are        Our Story         Upcoming          Get in Touch       TROFI
  Framework         Our People        Past Events       Careers            BeFit 360
  Global Presence   Partners          Partnerships      Press              Developments
                                                                           MAHYA
                                                                           BEYOND

[Bottom bar]
  [Left]  "© 2026 XTOPIA Platform. All rights reserved."
  [Right] Social icons (Instagram, LinkedIn, X) — minimal SVG, cream, hover: sage

[Between]  A thin cream/opacity line separator
```

**Footer animation:**
- On scroll into footer: XTOPIA logo animates its stroke in cream
- Column links stagger in from bottom, 60ms apart

---

---

# ANIMATION SYSTEM

## Scroll-Driven Animations (GSAP ScrollTrigger)

| Element | Trigger | Animation |
|---------|---------|-----------|
| Section headings | Enter viewport (80%) | `translateY(60px) → 0` + `opacity 0→1`, 800ms ease |
| Body text | Enter viewport (90%) | `translateY(30px) → 0` + `opacity 0→1`, delay 200ms |
| Images | Enter viewport (80%) | `clipPath: inset(100% 0 0 0) → inset(0%)` wipe up |
| Stat numbers | Enter viewport | Count up from 0, GSAP `from: {textContent:0}` |
| Cards grid | Enter viewport | Stagger `translateY(80px) → 0`, 100ms apart |
| Section transitions | Full page scroll | Pinned sections with scrub ratio 1 |
| Horizontal scroll | In `.horizontal-section` | `x: 0 → -totalWidth` with pin |

## 3D Elements (Three.js)

| Scene | Location | Description |
|-------|----------|-------------|
| Grid Field | Home hero | Infinite 3D grid of cream lines, slow Y-rotation, mouse tilt |
| Location Dots | About map | 3D pulsing spheres over flat map, OrbitControls disabled |
| MAHYA Park | Community | Isometric park scene, auto-rotate, hover highlights |
| Particle Cloud | Vertical hero pages | Floating cream particles forming the X-shape, disperse on scroll |

## Micro-Interactions

| Trigger | Response |
|---------|----------|
| Hover any link | Cream underline slides in from left |
| Hover CTA button | Border expands outward 2px, text shifts right 4px |
| Hover navigation item | A tiny `·` dot appears below, scales in |
| Hover brand card | Image scales 1.04, info overlay slides up |
| Hover stat | Number quickly recounts (500ms) |
| Click anywhere on hero | Brief ripple in the 3D grid at cursor position |

---

---

# RESPONSIVE BREAKPOINTS

```
Desktop:    1440px+ (design baseline)
Laptop:     1024px–1439px
Tablet:     768px–1023px  (horizontal scrolls → vertical stacks)
Mobile:     < 768px        (full rethink of layouts)
```

### Mobile-specific adjustments:
- Full-screen menu (overlay, not dropdown)
- Horizontal scroll sections → vertical scroll with swipeable carousel
- 3D scenes simplified (lower polygon count, no mouse parallax)
- Font sizes use `clamp()` throughout (already specified above)
- GSAP ScrollTrigger scrub values reduced for performance
- Lenis disabled on mobile (native scroll preferred for performance)

---

---

# PERFORMANCE GUIDELINES

- **Images:** WebP format, lazy-loaded, `srcset` for responsive sizes
- **Three.js:** Dispose of geometries/materials on page leave; use `requestAnimationFrame` pause when tab not visible
- **GSAP:** `will-change: transform` only on actively animating elements; removed after animation complete
- **Fonts:** Preloaded with `<link rel="preload">` for BARQUES; subset if large
- **Video:** Poster image shown before video loads; `playsinline` + `muted` + `loop` attributes
- **Reduced Motion:** All GSAP animations check `window.matchMedia('(prefers-reduced-motion: reduce)')` and fall back to instant opacity fades

---

---

# COPY GUIDELINES FOR DEVELOPERS

Use these exact strings from the brand for consistency:

```
Brand name:      XTOPIA  (always all-caps)
Tagline:         COMMUNITY-DRIVEN DESTINATION PLATFORM
                 or COMMUNITY · DRIVEN · PLATFORM  (with bullets, nav version)
Hero copy:       "XTOPIA Flips This."
Closing:         "One Platform. Multiple Expressions of Life."
F&B tagline:     "Food as a Social Connector."
Sports tagline:  "Well-being as a Lifestyle."
Parks tagline:   "Active Ecosystems Woven into Daily Rhythms."
Events tagline:  "Not Events. Social Ignition."
Dev tagline:     "From Daily Life to City-Scale Impact."
CTA style:       Always uppercase + arrow: "EXPLORE →" / "VIEW PROJECT →" / "GET IN TOUCH →"
```

---

---

# FILE & FOLDER STRUCTURE (Recommended)

```
/
├── index.html               → Home
├── about.html               → About
├── verticals.html           → Verticals Hub
├── verticals/
│   ├── trofi.html
│   ├── befit.html
│   ├── developments.html
│   ├── mahya.html
│   └── beyond.html
├── projects.html
├── community.html
├── contact.html
├── assets/
│   ├── images/              → (already populated)
│   ├── fonts/               → BARQUES, Book Antiqua, Acumin
│   ├── icons/               → SVG icons
│   └── video/               → Background video loops
├── css/
│   ├── reset.css
│   ├── variables.css        → CSS custom properties
│   ├── typography.css
│   ├── layout.css
│   ├── components.css       → Cursor, nav, loader, footer
│   └── animations.css       → Keyframe definitions
├── js/
│   ├── main.js              → Init, smooth scroll (Lenis)
│   ├── loader.js            → Page loader
│   ├── cursor.js            → Custom cursor
│   ├── three-hero.js        → Three.js grid scene
│   ├── three-map.js         → Three.js map dots
│   ├── scroll-animations.js → All GSAP ScrollTrigger
│   └── horizontal-scroll.js → Horizontal section handler
└── brand/
    ├── xtopia-brand-identity.md    → (from first PDF)
    └── xtopia-company-profile.md   → (from second PDF)
```

---

*XTOPIA Website Design Plan · 2026 · For use with Claude Code*
