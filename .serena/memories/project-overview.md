# The Explorer Mindset - Website Project

## What This Is
A one-pager marketing site for "The Explorer Mindset" book by Jean-Philippe Gauthier.
- **Published:** February 25, 2026
- **Subtitle:** A Guide to Growth for Your Life, Family, and Work
- **Foreword:** Sean Downey
- **Themes:** Curiosity, Adaptability, Resilience
- **Domain:** theexplorermindset.com (Vercel alias: the-website-mu.vercel.app)
- **GitHub:** https://github.com/jpgauthier007/the-explorer-mindset

## Tech Stack
- **Framework:** Next.js 16.1.6 (App Router) with TypeScript + Turbopack
- **Styling:** Tailwind CSS v4 (uses `@theme` directive in globals.css, NOT tailwind.config.ts)
- **Database:** Convex (deployment: descriptive-yak-588) — subscribers + resources CMS + file storage
- **Hosting:** Vercel
- **Fonts:** Montserrat (display) + Source Serif 4 (body) via next/font/google
- **CAPTCHA:** Cloudflare Turnstile (installed, graceful degradation without keys)

## Project Structure
```
app/
  layout.tsx              -- Root layout: ConvexProvider, WebMCP, JSON-LD, metadata
  page.tsx                -- Assembles Header + 7 sections + Footer
  globals.css             -- Tailwind @theme: navy/accent/glass/grain tokens
  not-found.tsx           -- Explorer-themed 404 page
  admin/page.tsx          -- Admin CMS route (no auth yet)
  resources/page.tsx      -- Redirects to /resources/worksheets
  resources/(sections)/layout.tsx -- EN sections shared layout (Header + sub-nav + Footer)
  resources/(sections)/{worksheets,assessment,extras}/page.tsx
  api/subscribe/route.ts  -- POST: rate limited, Turnstile-verified, validated
components/
  Header.tsx              -- Sticky glass header (scroll-aware). All anchor links use ${home}#anchor. Mobile: hamburger (sm:hidden) opens full-screen navy overlay with staggered nav links + BUY CTA. Body scroll locked while open.
  Hero.tsx                -- Full-viewport: layered gradients, 3D book cover, dotted path
  AboutBook.tsx           -- Italic serif pull quote + description
  BuyBook.tsx             -- 3 format cards (Digital/Hardcover/Softcover), "Coming Soon" pre-launch. EN launch: April 16, 2026. FR launch: December 3, 2026.
  Hero.tsx                -- Book cover: 900x1384px (resized from 6656x10240 — was 13x over Vercel's 5M pixel optimization limit, causing silent failure)

CRITICAL: Vercel Next.js image optimization hard limit = 5,120,000 pixels. Images larger than ~2000x2500px will silently fail. Always resize with sips before committing: sips -z [height] [width] file.png
  ThreePillars.tsx        -- Glassmorphism cards: Curiosity/Adaptability/Resilience
  AboutAuthor.tsx         -- Photo with radial glow + bio
  EmailSignup.tsx         -- Glass form: firstName + lastName row, email + button row, math CAPTCHA, lang auto-detect
  Footer.tsx              -- Two-column layout, dotted divider, nav synced with header
  Resources.tsx           -- Resources hub (bypassed by redirect). Shows 3 overview cards.
  ResourcesSubNav.tsx     -- Sliding underline tab nav (client, usePathname + ref-measured positions)
  ResourcesWorksheets.tsx -- Client component: queries Convex listBySection, falls back to dict; serves urlEn or urlFr by lang
  ResourcesAssessment.tsx -- Assessment card (dict only, no Convex yet)
  ResourcesExtras.tsx     -- Client component: same pattern as ResourcesWorksheets
  admin/AdminCMS.tsx      -- Tab bar (Resources | Gratitude). Resources: two-column panels (Worksheets|Extras), EN+FR PDF upload, publish pill, inline edit+delete
  admin/GratitudeCMS.tsx  -- Gratitude CMS: Featured People panel (name, roleEN/FR, noteEN/FR) + Name Groups panel (labelEN/FR, names one-per-line textarea)
  Gratitude.tsx           -- Client component: reads from Convex (listFeatured + listGroups), falls back to dict; bilingual role/note/label by lang
  SectionBadge.tsx        -- Line-accent label (horizontal lines flanking text)
  DottedPath.tsx          -- SVG motif variants
  LanguageToggle.tsx      -- EN|FR pill toggle (plain <a> links, no client state)
  WebMCPProvider.tsx      -- WebMCP tools (getBookInfo, subscribeNewsletter)
convex/
  schema.ts               -- subscribers + resources + assessmentSessions + gratitudeFeatured + gratitudeGroups tables
  assessment.ts           -- submitAssessment mutation: validates email, scores 18 answers server-side, stores full session (all answers + scores + profile), upserts subscriber
  subscribers.ts          -- subscribe + unsubscribe mutations
  resources.ts            -- list (admin), listBySection (public), generateUploadUrl, create, update, togglePublished, remove
  gratitude.ts            -- generateUploadUrl, listFeatured (resolves photoUrl), listGroups, createFeatured, updateFeatured (replaces photo + deletes old), removeFeatured (deletes photo from storage), createGroup, updateGroup, removeGroup
```

## Convex Resources Schema
```
resources {
  section:        "worksheets" | "extras"
  titleEn/titleFr: string
  descriptionEn/descriptionFr: string
  fileIdEn?:      Id<"_storage">   -- EN PDF
  fileNameEn?:    string
  fileIdFr?:      Id<"_storage">   -- FR PDF
  fileNameFr?:    string
  published:      boolean          -- false = Coming Soon, true = Download button live
  order:          number
  createdAt/updatedAt: number
}
```

## Mobile Fixes
- **Navigation:** Hamburger (3 lines, accent-orange bottom) replaces BUY button on mobile. Full-screen overlay with large Montserrat nav links, staggered 55ms fade-in, LanguageToggle + BUY at bottom.
- **Horizontal overflow:** `overflow-x-hidden` on body (layout.tsx) + `overflow-hidden` on all standalone page wrappers (Resources.tsx, Gratitude.tsx, both EN+FR section layouts). Wide absolute glow blobs caused horizontal scroll on Android (Pixel).
- **Rule:** Any future page wrapper with absolute `w-[800px+]` glow elements MUST have `overflow-hidden` on the container.

## Design Audit Fixes (2026-02-27)
- Resources page header: centered (`text-center` + `mx-auto` on description) in both EN + FR section layouts
- EmailSignup CAPTCHA: moved inside glass form container as integrated third row — no more floating element below the form
- ThreePillars cards: padding increased `p-8/p-9` → `p-10/p-12`, gap `gap-5` → `gap-6`
- BuyBook icons: larger `w-8` → `w-11`, bolder `strokeWidth 1.5` → `1.75`
- AboutBook: description paragraphs `text-left` (pull quote stays centred)
- Hero subtitle: `max-w-sm` + `text-balance` to prevent orphan line break
- Footer tagline: `text-gray-muted` instead of `text-gray-secondary` (more readable)
- Admin empty state: `py-5` instead of `py-8`

## Design Tokens (globals.css @theme)
- Navy: 950 (#0D0F14), 900 (#141B2D), 800 (#1E2D4D), 700 (#29406F), 600 (#2F4A82)
- Accent: #CB4A33, hover: #D7674C, glow: rgba(203,74,51,0.15)
- Offwhite: #F5F6F9, gray-muted: #C6CBC7, gray-secondary: #7A8299
- Glass: rgba(20,27,45,0.6), glass-border: rgba(245,246,249,0.1)
- Grain overlay: SVG feTurbulence noise at 3% opacity

## Security Measures
- CSP + X-Content-Type-Options, X-Frame-Options, HSTS, Referrer-Policy, Permissions-Policy
- Rate limiting: 5 req/IP/60s on /api/subscribe
- Input validation: type, length, format regex on all API routes
- Generic error messages (no internals leaked)
- Turnstile CAPTCHA: integrated but needs keys to activate
- Convex: soft-delete unsubscribe, re-subscribe support

## Branding Rule
- Book title: "THE" white, "EXPLORER" orange/accent, "MINDSET" white
- Header logo TEM: T white, E orange, M white

## Key Decisions
- NEVER use em dashes (—) in any content or copy. Use periods, commas, or restructure.
- French copy must be natural Quebec French, not machine-translated.
- Keep CTA button text short (must fit container in both EN and FR).
- WebMCP protocol for AI agent discoverability (progressive enhancement)
- SEO + GEO: JSON-LD (Book + Person + WebSite), AI crawler-friendly robots.txt

## Section Order (page.tsx)
Hero → AboutBook → BuyBook → ThreePillars → AboutAuthor → EmailSignup → Footer
Backgrounds: Hero(gradient) → About(900) → Buy(900) → Pillars(800) → Author(900) → Signup(800) → Footer
Hero byline (author name) replaced with: pulsing orange launch date pill + "Notify me when it's out →" link to #join.
Dict keys: hero.launchBadge (EN: "Coming April 16, 2026" / FR: "Disponible le 3 décembre 2026"), hero.notifyCta.

## i18n (French Translation)
- **Routing:** `/` = English (default), `/fr` = French. Middleware redirects `/en` → `/`
- **Dictionaries:** `dictionaries/en.json` + `fr.json` (~85 strings each, keyed by section)
- **Components:** All accept `dict` prop. Zero hardcoded strings.
- **LanguageToggle:** EN|FR pill in header, plain `<a>` links, no client state
- **html lang:** Middleware sets `x-lang` header → root layout reads via `headers()`
- **Hybrid:** UI in French, book title stays English always

## Resources Pages
- `/resources` redirects to `/resources/worksheets` (default)
- Sub-nav: sliding underline tabs (Worksheets / Assessment / Extras)
- Route group `(sections)` shares layout (Header + sub-nav + Footer) for EN and FR
- FR mirrors at `/fr/resources/{worksheets,assessment,extras}`
- Dict keys: `subnav.{worksheets,assessment,extras}`, `backResources`, `explore`, `{section}.hubDescription`

## Gratitude Page
- **Routes:** `/gratitude` (EN), `/fr/gratitude` (FR). Linked in header nav + footer.
- **Layout:** Header + Footer shell (same as Resources/Privacy pages)
- **Sections:** Opening quote (hardcoded dict) → Featured People cards (name, role, note) → dotted divider → Name Groups (label + list of names)
- **Convex tables:** `gratitudeFeatured` (name, roleEn, roleFr, noteEn, noteFr, photoId?, order) + `gratitudeGroups` (labelEn, labelFr, names[], order)
- **Photos:** Optional per featured person. Stored in Convex storage. Admin has circular preview upload zone. Public card shows circular avatar (w-24 h-24) with orange glow on hover; centers card content when present.
- **Public component:** `Gratitude.tsx` — client, reads from Convex, falls back to dict placeholders when empty
- **CMS:** Managed via `/admin` Gratitude tab (Featured People panel + Name Groups panel)
- **Groups input pattern:** Names entered one per line in textarea, split on save

## Admin CMS (/admin)
- **Tab bar:** Resources | Gratitude (local state, no routing)
- **Auth:** Currently unprotected. When ready: HTTP Basic Auth in middleware.ts, ADMIN_PASSWORD env var.

## Resources CMS (/admin)
- No password protection currently (was added then reverted). When ready: add HTTP Basic Auth block in middleware.ts checking `pathname.startsWith("/admin")` against `ADMIN_PASSWORD` env var — pattern already tested.
- Bilingual PDFs: EN and FR uploaded separately; public pages serve language-correct URL
- New resources saved as Draft; click pill to publish instantly (Convex reactive)
- Delete removes both PDFs from Convex storage
- Public fallback: no Convex records → dict placeholders show as "Coming Soon"
- CRITICAL loading pattern: undefined (loading) → skeleton cards. [] (confirmed empty) → dict fallback. [...data] → live data. Never use `undefined || length === 0` — causes flash of placeholder content on load. Applies to ResourcesWorksheets, ResourcesExtras, Gratitude.

## Newsletter Signup
- Fields: firstName (required), lastName (optional), email (required), preferredLang (auto-detected)
- Button text: EN "Start Exploring", FR "S'inscrire"
- Math CAPTCHA: client-side generation + server-side verification

## Assessment (/resources/assessment + /fr/resources/assessment)
- **18 questions**, 3 sections: Curiosity (Q1–6), Adaptability (Q7–12), Resilience (Q13–18). Rated 1–5.
- **Flow:** intro → section 1 → section 2 → section 3 → email gate → results
- **Email gate:** user enters email (+ optional firstName) AFTER completing all questions. Server-side scoring only — client never computes scores.
- **Convex:** `assessmentSessions` table stores email, firstName?, lang, all 18 answers as array, 3 section scores, totalScore, profile string, createdAt. Indexed by_email.
- **Profiles:** Mapmaker (18–36), Pathfinder (37–54), Trailblazer (55–72), Pioneer (73–90)
- **Component:** `Assessment.tsx` — client, multi-step state machine (Step type), animated score bars with CSS transition delay
- **Dict key:** `assessment` in en.json + fr.json — all 18 questions, scale labels, gate copy, results copy, all 4 profiles
- **No email sent** — results shown on screen only. Email delivery pending Resend setup.
- **CSP fix:** `img-src blob: https://*.convex.cloud https://*.convex.site` added to next.config.ts

## Pending
- Password protect /admin
- Activate BuyBook Amazon.ca links (currently "Coming Soon")
- Activate Turnstile keys on Vercel
- Configure custom domain theexplorermindset.com
- Email sending service (Resend) for newsletter delivery
- Double opt-in when email sending is set up
- Analytics package (upcoming)
