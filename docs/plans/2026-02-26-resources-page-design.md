# Resources Page Design

## Goal
A standalone bilingual page at `/resources` and `/fr/resources` where book readers can access companion materials. Referenced in the book as `theexplorermindset.com/resources`.

## Architecture
- Public page, no gating or authentication
- Bilingual page UI (EN/FR), PDFs in English only
- Three sub-sections with glassmorphism cards
- All items "Coming Soon" at launch; swap to download buttons when PDFs are added
- PDFs served from `public/resources/`
- Reuses existing header/footer with "Resources" added to nav

## Sub-sections

### 1. Book Companion Worksheets (2 cards)
- **90 Days Plan**: A structured 90-day plan to build Explorer Mindset habits
- **48 Hours Plan**: A quick-start guide to begin the explorer journey this weekend

### 2. The Explorer Mindset Assessment (1 card)
- Coming soon placeholder
- Self-assessment tool for curiosity, adaptability, and resilience

### 3. Extras (1 card)
- **Workshop**: Coming soon placeholder

## Implementation

### New files
- `app/resources/page.tsx` - EN resources page
- `app/[lang]/resources/page.tsx` - FR resources page
- `components/Resources.tsx` - Main component with three sub-sections

### Modified files
- `dictionaries/en.json` - Add `resources` section + `navResources` in header/footer
- `dictionaries/fr.json` - Same
- `components/Header.tsx` - Add "Resources" nav link
- `components/Footer.tsx` - Add "Resources" nav link
- `middleware.ts` - Ensure `/fr/resources` gets correct `x-lang` header

### No changes to
- Convex schema/mutations
- API endpoints
- No new dependencies
