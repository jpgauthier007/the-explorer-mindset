# French Translation — Design Document

**Date:** 2026-02-26
**Status:** Approved

## Goal

Add French language support to the Explorer Mindset one-pager with a seamless toggle. No hardcoded strings — all UI text externalized into per-language dictionaries.

## Key Decisions

| Decision | Choice | Rationale |
|---|---|---|
| URL strategy | Subdirectory: `/` (EN), `/fr` (FR) | SEO-friendly, Next.js convention, hreflang support |
| Default language | English at `/`, no prefix | Keeps existing URLs, book brand is English |
| Translation scope | Hybrid — UI text in French, book title stays English | Published title is English, French readers buy that title |
| String storage | Single JSON dictionary per language | ~50-80 strings, no library needed for a one-pager |
| Toggle placement | Header pill (EN \| FR), left of "Buy" CTA | Visible on sticky header, doesn't compete with CTA |

## Routing & File Structure

```
app/
  [lang]/
    page.tsx              -- Main one-pager (receives lang param)
    layout.tsx            -- Root layout (html lang, metadata, alternates)
    privacy/page.tsx      -- Privacy policy (translated)
    not-found.tsx         -- 404 page (translated)
    api/subscribe/route.ts -- Shared, no translation
  dictionaries/
    en.json               -- All English strings
    fr.json               -- All French strings
    getDictionary.ts      -- Helper: loads right JSON by lang param
  middleware.ts           -- Redirects /en → /, validates lang param
```

### How Routing Works

- `/` serves English (default, no prefix).
- `/fr` serves French.
- `[lang]` dynamic segment only catches `fr`.
- Middleware redirects `/en/*` to `/*` to avoid duplicate content.
- `generateStaticParams` returns `[{ lang: "fr" }]` for static generation.

## Dictionary Structure

Single JSON per language, keyed by section. Components receive only their section.

```json
{
  "meta": {
    "title": "The Explorer Mindset — A Guide to Growth",
    "description": "Discover the three traits..."
  },
  "header": {
    "navBook": "The Book",
    "navFramework": "Framework",
    "navAuthor": "Author",
    "navJoin": "Join",
    "ctaBuy": "Buy"
  },
  "hero": {
    "subtitle": "A Guide to Growth for Your Life, Family, and Work",
    "author": "Jean-Philippe Gauthier"
  },
  "aboutBook": {
    "badge": "About the Book",
    "pullQuote": "...",
    "description": "..."
  },
  "buyBook": {
    "badge": "Get the Book",
    "heading": "Start your journey today.",
    "subtitle": "Available in three formats — choose the one that fits your adventure.",
    "launchDate": "Coming March 12, 2026",
    "comingSoon": "Coming Soon",
    "formats": {
      "digital": { "name": "Digital Copy", "description": "Instant access on Kindle. Read anywhere, anytime." },
      "hardcover": { "name": "Hardcover", "description": "Premium edition. A beautiful addition to your bookshelf." },
      "softcover": { "name": "Softcover", "description": "Lightweight and portable. Perfect for reading on the go." }
    }
  },
  "threePillars": {
    "badge": "The Framework",
    "heading": "Three traits that change everything.",
    "pillars": [
      { "number": "01 — Trait One", "title": "Curiosity", "description": "..." },
      { "number": "02 — Trait Two", "title": "Adaptability", "description": "..." },
      { "number": "03 — Trait Three", "title": "Resilience", "description": "..." }
    ]
  },
  "aboutAuthor": {
    "badge": "About the Author",
    "name": "Jean-Philippe Gauthier",
    "role": "...",
    "bio": "..."
  },
  "emailSignup": {
    "badge": "Join the Journey",
    "heading": "The world won't stop changing.",
    "headingAccent": "Choose how you grow",
    "headingEnd": "with it.",
    "description": "Sign up for reflections on curiosity, adaptability, and resilience — straight to your inbox.",
    "placeholder": "Your email address",
    "submit": "Start Exploring",
    "submitting": "Joining...",
    "mathPrompt": "What is",
    "mathPlaceholder": "?",
    "successMessage": "You're on the path. Welcome aboard.",
    "alreadyMessage": "You're already subscribed — stay tuned!",
    "errorMath": "Incorrect answer. Please try again.",
    "errorGeneric": "Something went wrong. Please try again.",
    "noSpam": "No spam",
    "privacy": "Privacy"
  },
  "footer": {
    "tagline": "A guide to growth for your life, family, and work.",
    "copyright": "© 2026 Jean-Philippe Gauthier. All rights reserved.",
    "privacy": "Privacy",
    "navBook": "The Book",
    "navFramework": "Framework",
    "navAuthor": "Author",
    "navJoin": "Join",
    "navBuy": "Buy"
  },
  "privacy": {
    "title": "Privacy Policy",
    "content": "..."
  },
  "notFound": {
    "heading": "...",
    "description": "...",
    "cta": "..."
  }
}
```

`fr.json` mirrors the exact same keys with French values.

## Component Refactoring Pattern

Every component receives a typed `dict` prop. No language awareness inside components.

```tsx
// Before
export function Header() {
  return <a href="#about">The Book</a>;
}

// After
type HeaderDict = {
  navBook: string;
  navFramework: string;
  navAuthor: string;
  navJoin: string;
  ctaBuy: string;
};

export function Header({ dict, lang }: { dict: HeaderDict; lang: string }) {
  return <a href="/#about">{dict.navBook}</a>;
}
```

### LanguageToggle Component

Small pill toggle in the header, left of the "Buy" CTA:

```tsx
export function LanguageToggle({ lang }: { lang: string }) {
  return (
    <div className="flex items-center rounded-full border border-white/[0.1] ...">
      <a href="/"
         className={lang === "en" ? "bg-white/[0.08] text-offwhite" : "text-gray-secondary"}>
        EN
      </a>
      <a href="/fr"
         className={lang === "fr" ? "bg-white/[0.08] text-offwhite" : "text-gray-secondary"}>
        FR
      </a>
    </div>
  );
}
```

Uses plain `<a>` links — no client-side state, no hydration issues. Full page load switches language.

## Page-Level Wiring

```tsx
// app/[lang]/page.tsx
import { getDictionary } from "@/dictionaries/getDictionary";

export default async function Home({ params }: { params: { lang: string } }) {
  const lang = params.lang ?? "en";
  const dict = await getDictionary(lang);

  return (
    <>
      <Header dict={dict.header} lang={lang} />
      <main>
        <Hero dict={dict.hero} />
        <AboutBook dict={dict.aboutBook} />
        <BuyBook dict={dict.buyBook} />
        <ThreePillars dict={dict.threePillars} />
        <AboutAuthor dict={dict.aboutAuthor} />
        <EmailSignup dict={dict.emailSignup} />
        <Footer dict={dict.footer} lang={lang} />
      </main>
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: "fr" }];
}
```

### getDictionary.ts

```tsx
const dictionaries = {
  en: () => import("./en.json").then((m) => m.default),
  fr: () => import("./fr.json").then((m) => m.default),
};

export async function getDictionary(lang: string) {
  const loader = dictionaries[lang as keyof typeof dictionaries] ?? dictionaries.en;
  return loader();
}
```

### Middleware

```tsx
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["fr"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect /en/* to /* to avoid duplicate content
  if (pathname.startsWith("/en")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/en/, "") || "/";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
```

## SEO & Metadata

### hreflang (automatic via Next.js alternates)

```tsx
// app/[lang]/layout.tsx
export async function generateMetadata({ params }) {
  const dict = await getDictionary(params.lang);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: "https://theexplorermindset.com",
      languages: {
        en: "https://theexplorermindset.com",
        fr: "https://theexplorermindset.com/fr",
      },
    },
  };
}
```

### HTML lang attribute

```tsx
<html lang={params.lang === "fr" ? "fr" : "en"}>
```

### JSON-LD

Stays English with explicit `inLanguage: "en"`. Describes the published book.

## What Stays English (Never Translated)

- Book title "THE EXPLORER MINDSET" in Hero
- TEM logo in Header and Footer
- Book cover image
- Author name "Jean-Philippe Gauthier"
- Amazon.ca URLs
- API routes (`/api/subscribe`)
- Convex schema and mutations
- OG image
- JSON-LD structured data

## What Gets Translated

- All UI copy: badges, headings, descriptions, CTAs, form labels, error messages
- Privacy policy page
- 404 page copy
- Meta title and description
- Footer tagline and copyright text
- UnsubscribePopover text

## Implementation Order

1. Create `dictionaries/en.json`, `dictionaries/fr.json`, `dictionaries/getDictionary.ts`
2. Set up `app/[lang]/` routing structure + middleware
3. Refactor components one at a time to accept `dict` props
4. Create `LanguageToggle` component, add to Header
5. Write French translations in `fr.json`
6. Wire up SEO: metadata, hreflang, html lang attribute
7. Update Footer with `LanguageToggle` or lang-aware links
8. Test both languages, verify static generation
9. Deploy
