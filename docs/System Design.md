# The Explorer Mindset Website Design System (Tailwind)
Version: 0.1 (draft from book jacket)

## Goal
Build a website that visually matches the book jacket:
- Deep navy background with subtle gradient
- Bold, uppercase display typography for key headings
- Warm orange accent for emphasis, badges, and CTAs
- Clean, minimal layout with lots of breathing room
- A dotted “path” motif as a signature graphic element

---

## Brand Principles
### Look and feel
- Confident, calm, modern
- High contrast (navy + white), energized by orange accents
- Minimal decoration, one signature motif (dotted path)

### What to avoid
- Too many colors
- Multiple accent colors fighting the orange
- Overly rounded “playful” UI (keep it clean)

---

## Color System

### Source palette (sampled from jacket)
Use these as your base tokens.

#### Navy family (backgrounds)
- Navy 950: **#151517** (near-black, deepest shade)
- Navy 900: **#1C2C4A** (deep navy)
- Navy 800: **#23375E** (primary navy)
- Navy 700: **#29406F** (slightly lighter navy)
- Navy 600: **#2F4A82** (highlight navy)

#### Orange family (accent)
- Orange 600: **#CB4A33** (primary cover orange)
- Orange 500: **#D7674C** (lighter orange for hover/secondary)

#### Neutrals (text, lines)
- White: **#F5F6F9** (off-white used for text)
- Gray 300: **#C6BBC7** (cool gray for subtle UI)
- Gray 500: **#777F97** (muted slate for secondary text)

---

## Semantic Color Tokens (recommended)
Map the palette into semantic tokens so components stay consistent.

### Backgrounds
- --bg: Navy 800 (#23375E)
- --bg-elevated: Navy 700 (#29406F)
- --bg-subtle: Navy 900 (#1C2C4A)
- --bg-deep: Navy 950 (#151517)

### Text
- --text-primary: White (#F5F6F9)
- --text-secondary: Gray 500 (#777F97)
- --text-muted: Gray 300 (#C6BBC7)

### Borders / Dividers
- --border-subtle: rgba(245,246,249,0.14)
- --border-strong: rgba(245,246,249,0.22)

### Brand Accent
- --accent: Orange 600 (#CB4A33)
- --accent-hover: Orange 500 (#D7674C)
- --accent-contrast: White (#F5F6F9)

---

## Gradients
The cover uses a subtle navy gradient (not flashy).

### Primary background gradient (hero)
- From: #2F4A82 (Navy 600)
- Via:  #29406F (Navy 700)
- To:   #23375E (Navy 800)

Tailwind idea:
- bg-gradient-to-br from-navy-600 via-navy-700 to-navy-800

---

## Typography

### Font stacks (pick 1 option)
Option A (recommended, matches cover vibe):
- Display: **Montserrat**
- Body: **Inter**

Option B (system-only, no external fonts):
- Display: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto
- Body: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto

### Type scale (Tailwind sizes)
Use a tight, bold scale for display, relaxed for body.

- Display XL: 56–72px (leading 0.9–1.0, tracking wide)
- H1: 40–48px (extra-bold, uppercase optional)
- H2: 28–32px (bold)
- H3: 20–24px (semi-bold)
- Body: 16–18px (leading 1.6)
- Small: 14px (leading 1.5)

### Title styling rules (cover-inspired)
- Uppercase for hero title words
- Extra-bold weight
- Tracking: +0.06em to +0.12em on all-caps headings
- Keep line breaks intentional (stacked title effect)

---

## Spacing and Layout

### Layout grid
- Max width: 1120–1200px
- Side padding: 20–24px mobile, 32–40px desktop
- Section spacing: 64–96px desktop, 40–64px mobile

### Corner radius
Keep it modern, not bubbly:
- Cards: rounded-2xl
- Buttons: rounded-xl
- Inputs: rounded-xl

### Shadows
Subtle only:
- Card shadow: soft, low spread
- Avoid heavy drop shadows on navy backgrounds

---

## Iconography and Motif

### Signature motif: dotted path
Use the orange dotted path as a repeatable brand element.
Rules:
- Use only in hero areas, section dividers, or callouts
- Keep stroke consistent (2–4px)
- Use dashed line with rounded caps
- Endpoints can be orange dots (small circles)

Suggested Tailwind color:
- stroke-accent (Orange 600)
- opacity 0.85 for dashed lines

---

## Imagery
- Prefer high-contrast photos with dark backgrounds or strong subject separation
- Add a subtle navy overlay if needed:
  - overlay: rgba(35,55,94,0.35) to rgba(28,44,74,0.55)

---

## UI Components

### Buttons
Primary (CTA):
- bg: accent (#CB4A33)
- text: off-white
- hover: accent-hover (#D7674C)
- focus ring: accent at 40% opacity

Secondary:
- bg: transparent
- border: rgba(245,246,249,0.25)
- text: off-white
- hover: bg white at 6–10% opacity

Tertiary (link button):
- text: accent
- hover: accent-hover
- underline on hover only

### Cards
- bg: --bg-elevated
- border: subtle white opacity
- padding: 24–32px
- header text: primary
- body text: secondary

### Inputs
- bg: --bg-subtle
- border: subtle
- placeholder: Gray 500
- focus: border accent + ring accent 30%

### Badges / Pills
- bg: accent
- text: white
- radius: full
- letter spacing slightly wider

---

## Tailwind Token Plan

### Add these colors in tailwind.config
Create a `navy`, `accent`, and `neutral` group:
- navy: 950/900/800/700/600
- accent: 600/500
- neutral: white, 500, 300

Also add semantic aliases (recommended):
- bg, bg-elevated, text-primary, text-secondary, border-subtle, accent

---

## Example Page Sections (cover-matching)

### Hero
- Full-bleed gradient navy background
- Big stacked title:
  - THE (white)
  - EXPLORER (accent)
  - MINDSET (white)
- Dotted path graphic on the right (desktop) or below title (mobile)
- Subtitle in a circular accent badge (like the cover) if you want it literal

### Section headers
- All caps label (small)
- Bold title (H2)
- Short paragraph under (max 60–70 characters per line)

### Footer
- Solid Navy 900 background
- Thin top border in white opacity
- Simple links, no clutter

---

## Open Items to Confirm
1) Final font choice (Montserrat + Inter vs other)
2) Do you want the circular badge element reused site-wide or only on the homepage?
3) Primary button style: solid orange or white?
4) Do you want a light theme too?

Once you answer, I’ll produce:
- Final token map (with semantic names)
- Full Tailwind config snippet
- Component class recipes (Button, Card, Input, Nav, Footer, Hero)
- A “page blueprint” for Home, About the Book, Newsletter, Assessment, Contact