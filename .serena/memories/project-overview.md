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
- **Database:** Convex (deployment: descriptive-yak-588)
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
  ConvexClientProvider.tsx -- Convex provider with env var validation
  robots.ts, sitemap.ts, icon.tsx, opengraph-image.tsx
  privacy/page.tsx        -- GDPR privacy policy
  resources/page.tsx      -- Resources page (worksheets, assessment, extras)
  api/subscribe/route.ts  -- POST: rate limited, Turnstile-verified, validated
components/
  Header.tsx              -- Sticky glass header (scroll-aware), "Buy" CTA, "Newsletter"/"Infolettre" nav link
  UnsubscribePopover.tsx  -- Click popover: "use the link in our emails"
  Hero.tsx                -- Full-viewport: layered gradients, 3D book cover, dotted path
  AboutBook.tsx           -- Italic serif pull quote + description
  BuyBook.tsx             -- 3 format cards (Digital/Hardcover/Softcover), "Coming Soon" pre-launch
  ThreePillars.tsx        -- Glassmorphism cards: Curiosity/Adaptability/Resilience
  AboutAuthor.tsx         -- Photo with radial glow + bio with role subtitle
  EmailSignup.tsx         -- Glass form: firstName + lastName row, email + button row, math CAPTCHA, lang auto-detect, focus:border-accent/40, locale-aware privacy link
  Footer.tsx              -- Two-column layout, dotted divider, nav synced with header
  Resources.tsx           -- Resources page: 3 sub-sections (worksheets, assessment, extras), glassmorphism cards, "Coming Soon" state
  SectionBadge.tsx        -- Line-accent label (horizontal lines flanking text)
  DottedPath.tsx          -- SVG motif variants (Hero, Divider, Connector, Vertical)
  AnimateOnScroll.tsx     -- IntersectionObserver scroll animations (threshold 0.15)
  LanguageToggle.tsx      -- EN|FR pill toggle (plain <a> links, no client state)
  WebMCPProvider.tsx      -- WebMCP tools (getBookInfo, subscribeNewsletter)
convex/
  schema.ts               -- subscribers: email, firstName?, lastName?, preferredLang?, subscribedAt, unsubscribedAt?
  subscribers.ts          -- subscribe (with profile update on re-subscribe) + unsubscribe mutations
public/
  book-cover.png          -- 3D perspective cover photo (768x768)
  author-photo.jpg        -- JP headshot, dark background (2400x3000)
  resources/              -- PDF downloads directory (empty, awaiting files)
  humans.txt, llms.txt
```

## Design Tokens (globals.css @theme)
- Navy: 950 (#0D0F14), 900 (#141B2D), 800 (#1E2D4D), 700 (#29406F), 600 (#2F4A82)
- Accent: #CB4A33, hover: #D7674C, glow: rgba(203,74,51,0.15)
- Offwhite: #F5F6F9, gray-muted: #C6CBC7, gray-secondary: #7A8299
- Glass: rgba(20,27,45,0.6), glass-border: rgba(245,246,249,0.1)
- Grain overlay: SVG feTurbulence noise at 3% opacity
- Glow utilities: .glow-accent, .glow-accent-soft

## Security Measures
- CSP + X-Content-Type-Options, X-Frame-Options, HSTS, Referrer-Policy, Permissions-Policy
- Rate limiting: 5 req/IP/60s on /api/subscribe
- Input validation: type, length (254 max), format regex on all API routes
- Generic error messages (no internals leaked)
- Turnstile CAPTCHA: integrated but needs keys to activate
- Convex: soft-delete unsubscribe, re-subscribe support, profile update on re-subscribe
- API validation: firstName required (max 100), lastName optional (max 100), preferredLang defaults to "en"

## Branding Rule
- Book title: "THE" white, "EXPLORER" orange/accent, "MINDSET" white
- Header logo TEM: T white, E orange, M white
- Consistent across Header, Hero, Footer

## Key Decisions
- Goal: audience building via email capture + book pre-launch
- Book launches March 12, 2026. BuyBook cards have "Coming Soon" (no links yet)
- WebMCP protocol for AI agent discoverability (progressive enhancement)
- SEO + GEO: JSON-LD (Book + Person + WebSite), AI crawler-friendly robots.txt
- NEVER use em dashes (—) in any content or copy. Use periods, commas, or restructure.
- French copy must be natural Quebec French, not machine-translated.
- Keep CTA button text short (must fit container in both EN and FR).

## Section Order (page.tsx)
Hero → AboutBook → BuyBook → ThreePillars → AboutAuthor → EmailSignup → Footer
Backgrounds: Hero(gradient) → About(900) → Buy(900) → Pillars(800) → Author(900) → Signup(800) → Footer

## i18n (French Translation)
- **Routing:** `/` = English (default), `/fr` = French. Middleware redirects `/en` → `/`, `/newsletter` → `/#join`, `/fr/newsletter` → `/fr#join`
- **Dictionaries:** `dictionaries/en.json` + `fr.json` (~80 strings each, keyed by section)
- **getDictionary.ts:** Typed helper, returns `Dictionary` type inferred from `en.json`
- **Components:** All accept `dict` prop (typed per section). Zero hardcoded strings.
- **LanguageToggle:** `EN | FR` pill in header, plain `<a>` links, no client state
- **html lang:** Middleware sets `x-lang` header → root layout reads via `headers()` → `<html lang={lang}>`
- **Hybrid translation:** UI text in French, book title "THE EXPLORER MINDSET" stays English always
- **SEO:** hreflang alternates in metadata, per-language meta title/description
- **Pages are dynamic (ƒ)** because root layout reads headers() — expected for i18n
- **Privacy:** `/privacy` (EN) and `/fr/privacy` (FR) both from dictionaries
- **Design doc:** `docs/plans/2026-02-26-i18n-french-design.md`

## Newsletter Signup
- **Fields:** firstName (required), lastName (optional), email (required), preferredLang (auto-detected from page lang)
- **Form layout:** Two-row glass container — names row (side-by-side on desktop, stacked on mobile) above email + button row
- **Profile behavior:** New subscribers get all fields stored; re-subscribers get profile updated; already-active get profile refreshed
- **Math CAPTCHA:** Client-side generation + server-side verification (a + b addition)
- **Focus states:** All inputs use `focus:border-accent/40` (WCAG 2.4.7)
- **Privacy link:** Locale-aware (`/fr/privacy` on French page)
- **Button text:** EN "Start Exploring", FR "S'inscrire" (shorter to fit container)
- **Design doc:** `docs/plans/2026-02-26-newsletter-fields-design.md`

## Resources Page
- **URL:** `/resources` (EN), `/fr/resources` (FR). Referenced in book as theexplorermindset.com/resources
- **Sub-sections:** Book Companion Worksheets (90 Days Plan, 48 Hours Plan), Explorer Mindset Assessment, Extras (Workshop)
- **Status:** All "Coming Soon" until PDFs dropped in `public/resources/`
- **Nav:** "Resources"/"Ressources" added to header and footer
- **No gate:** Public page, no authentication
- **Design doc:** `docs/plans/2026-02-26-resources-page-design.md`

## Pending
- Add resource PDFs to `public/resources/` and swap "Coming Soon" for download buttons
- Activate BuyBook Amazon.ca links when available (currently "Coming Soon")
- Activate Turnstile keys on Vercel
- Configure custom domain theexplorermindset.com
- Email sending service (Resend) for newsletter delivery
- Double opt-in when email sending is set up
- Analytics package (upcoming)