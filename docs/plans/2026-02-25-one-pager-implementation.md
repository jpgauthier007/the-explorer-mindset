# The Explorer Mindset One-Pager Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a stunning single-page marketing site for "The Explorer Mindset" that captures emails via Convex, is SEO/GEO-optimized, and implements the WebMCP protocol.

**Architecture:** Next.js App Router with a single `page.tsx` composed of six section components. Convex handles email storage via a server action. WebMCP tools are registered client-side with feature detection. All styling via Tailwind with custom design tokens from the book jacket.

**Tech Stack:** Next.js 15 (App Router), Tailwind CSS 4, Convex, TypeScript, next/font (Montserrat + Inter)

**Design reference:** `docs/plans/2026-02-25-one-pager-design.md` and `docs/System Design.md`

---

## Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `tailwind.config.ts`, `postcss.config.mjs`

**Step 1: Initialize Next.js with Tailwind**

```bash
cd /Users/jpgauthier/Coding/the-website
npx create-next-app@latest . --typescript --tailwind --eslint --app --src=false --import-alias="@/*" --use-npm
```

Accept overwrite prompts for existing files. Choose defaults for everything.

**Step 2: Verify it runs**

```bash
npm run dev
```

Visit `http://localhost:3000`. Expected: default Next.js page.

**Step 3: Clean starter files**

Strip `app/page.tsx` to a minimal placeholder:

```tsx
export default function Home() {
  return (
    <main>
      <h1>The Explorer Mindset</h1>
    </main>
  );
}
```

Strip `app/globals.css` to just the Tailwind directives:

```css
@import "tailwindcss";
```

**Step 4: Commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Next.js 15 + Tailwind project"
```

---

## Task 2: Configure Design Tokens + Fonts

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Step 1: Set up fonts in layout.tsx**

```tsx
import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Explorer Mindset - A Guide to Growth for Your Life, Family, and Work",
  description:
    "By Jean-Philippe Gauthier. A practical guide to building curiosity, adaptability, and resilience for navigating an uncertain future. Foreword by Sean Downey.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="bg-navy-950 text-white antialiased font-body">
        {children}
      </body>
    </html>
  );
}
```

**Step 2: Configure Tailwind design tokens in globals.css**

Replace `app/globals.css` with:

```css
@import "tailwindcss";

@theme {
  /* Navy family (backgrounds) */
  --color-navy-950: #151517;
  --color-navy-900: #1C2C4A;
  --color-navy-800: #23375E;
  --color-navy-700: #29406F;
  --color-navy-600: #2F4A82;

  /* Orange family (accent) */
  --color-accent: #CB4A33;
  --color-accent-hover: #D7674C;

  /* Neutrals */
  --color-offwhite: #F5F6F9;
  --color-gray-muted: #C6BBC7;
  --color-gray-secondary: #777F97;

  /* Border tokens */
  --color-border-subtle: rgba(245, 246, 249, 0.14);
  --color-border-strong: rgba(245, 246, 249, 0.22);

  /* Font families */
  --font-display: var(--font-montserrat), ui-sans-serif, system-ui, sans-serif;
  --font-body: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
}
```

**Step 3: Verify tokens work**

Update `app/page.tsx` temporarily:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-navy-800 flex items-center justify-center">
      <h1 className="font-display text-6xl font-extrabold uppercase tracking-wider text-offwhite">
        THE <span className="text-accent">EXPLORER</span> MINDSET
      </h1>
    </main>
  );
}
```

Run `npm run dev` and verify: navy background, white+orange title, Montserrat font.

**Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx app/page.tsx
git commit -m "feat: configure design tokens, fonts, and Tailwind theme"
```

---

## Task 3: Shared Components (SectionBadge + DottedPath SVG)

**Files:**
- Create: `components/SectionBadge.tsx`
- Create: `components/DottedPath.tsx`

**Step 1: Create SectionBadge component**

This is the orange pill label used in every section ("ABOUT THE BOOK", "THE FRAMEWORK", etc.)

```tsx
// components/SectionBadge.tsx
export function SectionBadge({ label }: { label: string }) {
  return (
    <span className="inline-block bg-accent text-offwhite text-xs font-display font-semibold uppercase tracking-[0.08em] px-4 py-1.5 rounded-full">
      {label}
    </span>
  );
}
```

**Step 2: Create DottedPath SVG component**

The signature dotted-path motif from the book cover. Multiple variants for different sections.

```tsx
// components/DottedPath.tsx
export function DottedPathHero({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 500"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M 50 0 Q 200 100 150 250 Q 100 400 300 500"
        stroke="#CB4A33"
        strokeWidth="3"
        strokeDasharray="8 12"
        strokeLinecap="round"
        opacity="0.15"
      />
      <circle cx="50" cy="0" r="6" fill="#CB4A33" opacity="0.3" />
      <circle cx="300" cy="500" r="6" fill="#CB4A33" opacity="0.3" />
    </svg>
  );
}

export function DottedPathDivider({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 4"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <line
        x1="0"
        y1="2"
        x2="200"
        y2="2"
        stroke="#CB4A33"
        strokeWidth="2"
        strokeDasharray="6 10"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}

export function DottedPathConnector({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M 0 150 Q 100 50 200 150 Q 300 250 400 150"
        stroke="#CB4A33"
        strokeWidth="2.5"
        strokeDasharray="8 12"
        strokeLinecap="round"
        opacity="0.15"
      />
    </svg>
  );
}
```

**Step 3: Commit**

```bash
git add components/
git commit -m "feat: add SectionBadge and DottedPath shared components"
```

---

## Task 4: Hero Section

**Files:**
- Create: `components/Hero.tsx`
- Add: Book cover image to `public/book-cover.png`

**Step 1: Prepare book cover asset**

Crop the front cover from `docs/BookBrushImage-2026-2-20-11-1241.png` - extract just the right half (front cover) and save as `public/book-cover.png`. If cropping isn't feasible programmatically, use the full image for now and we'll crop later.

**Step 2: Build Hero component**

```tsx
// components/Hero.tsx
import Image from "next/image";
import { DottedPathHero } from "./DottedPath";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-navy-600 via-navy-700 to-navy-800">
      {/* Background dotted path motif */}
      <DottedPathHero className="absolute right-0 top-0 h-full w-1/2 opacity-60 pointer-events-none hidden md:block" />

      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-5 md:px-10 py-20 md:py-0">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Left: Title */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-display font-extrabold uppercase leading-[0.95] tracking-[0.08em]">
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-offwhite">
                THE
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-accent">
                EXPLORER
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-offwhite">
                MINDSET
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-offwhite/90 font-body max-w-md mx-auto md:mx-0">
              A Guide to Growth for Your Life, Family, and Work
            </p>

            <p className="mt-3 text-base text-gray-secondary font-body">
              By Jean-Philippe Gauthier&ensp;|&ensp;Foreword by Sean Downey
            </p>
          </div>

          {/* Right: Book Cover */}
          <div className="flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-96">
            <div className="rotate-2 drop-shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-transform duration-500 hover:rotate-0">
              <Image
                src="/book-cover.png"
                alt="The Explorer Mindset book cover"
                width={400}
                height={600}
                priority
                className="rounded-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-offwhite/40"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
```

**Step 3: Wire into page.tsx**

```tsx
// app/page.tsx
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

**Step 4: Verify visually**

Run `npm run dev`. Expected: full-viewport hero with stacked title (THE / EXPLORER in orange / MINDSET), floating book cover, gradient navy background, bounce chevron at bottom.

**Step 5: Commit**

```bash
git add components/Hero.tsx app/page.tsx public/book-cover.png
git commit -m "feat: build hero section with title, book cover, and scroll indicator"
```

---

## Task 5: About the Book Section

**Files:**
- Create: `components/AboutBook.tsx`
- Modify: `app/page.tsx`

**Step 1: Build AboutBook component**

```tsx
// components/AboutBook.tsx
import { SectionBadge } from "./SectionBadge";
import { DottedPathDivider } from "./DottedPath";

export function AboutBook() {
  return (
    <section className="bg-navy-900 py-16 md:py-24">
      <div className="mx-auto max-w-[1120px] px-5 md:px-10 text-center">
        <SectionBadge label="About the Book" />

        <blockquote className="mt-10 max-w-2xl mx-auto font-display font-bold text-2xl md:text-3xl text-offwhite leading-snug">
          &ldquo;Swap safety for curiosity and discover how energizing that
          choice can be.&rdquo;
        </blockquote>

        <div className="mt-8 max-w-[650px] mx-auto space-y-5 text-gray-muted font-body text-base md:text-lg leading-relaxed">
          <p>
            Change isn&rsquo;t slowing down. It shapes how we lead, parent, and
            live. The question isn&rsquo;t whether you can keep up&mdash;it&rsquo;s
            how you&rsquo;ll move through it.
          </p>
          <p>
            This guide shows why an Explorer Mindset fuels happiness, resilience,
            and forward momentum. You&rsquo;ll find practical ways to experiment
            every day, adapt on the fly, transform setbacks into springboards,
            and ask bigger questions that pull you toward purpose.
          </p>
        </div>

        <DottedPathDivider className="mx-auto mt-14 w-48" />
      </div>
    </section>
  );
}
```

**Step 2: Add to page.tsx**

```tsx
import { Hero } from "@/components/Hero";
import { AboutBook } from "@/components/AboutBook";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutBook />
    </main>
  );
}
```

**Step 3: Verify visually and commit**

```bash
git add components/AboutBook.tsx app/page.tsx
git commit -m "feat: add About the Book section with pull quote and description"
```

---

## Task 6: Three Pillars Section

**Files:**
- Create: `components/ThreePillars.tsx`
- Modify: `app/page.tsx`

**Step 1: Build ThreePillars component**

```tsx
// components/ThreePillars.tsx
import { SectionBadge } from "./SectionBadge";

const pillars = [
  {
    title: "Curiosity",
    description:
      "The desire to understand and learn. To ask \"what if\" before settling for \"that's how it is.\"",
  },
  {
    title: "Adaptability",
    description:
      "The ability to adjust when the ground shifts. To welcome detours as part of the journey.",
  },
  {
    title: "Resilience",
    description:
      "The capacity to recover and keep moving. To turn every fall into forward momentum.",
  },
];

export function ThreePillars() {
  return (
    <section className="relative bg-navy-800 py-16 md:py-24">
      <div className="mx-auto max-w-[1120px] px-5 md:px-10">
        <div className="text-center">
          <SectionBadge label="The Framework" />
          <h2 className="mt-6 font-display font-bold text-2xl md:text-3xl text-offwhite">
            Three traits that change everything.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group relative bg-navy-700 border border-white/[0.08] rounded-2xl p-8 transition-all duration-300 hover:border-accent/30 hover:bg-navy-700/80"
            >
              {/* Orange dot */}
              <div className="w-6 h-6 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125" />

              <h3 className="mt-5 font-display font-semibold text-xl text-offwhite">
                {pillar.title}
              </h3>
              <p className="mt-3 text-gray-muted font-body text-base leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Connecting dotted line between dots (desktop) */}
        <div className="hidden md:block absolute top-[calc(50%+40px)] left-1/2 -translate-x-1/2 w-[60%] pointer-events-none">
          <svg viewBox="0 0 600 4" fill="none" aria-hidden="true">
            <line
              x1="0" y1="2" x2="600" y2="2"
              stroke="#CB4A33"
              strokeWidth="2"
              strokeDasharray="8 12"
              strokeLinecap="round"
              opacity="0.2"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Add to page.tsx**

Add `import { ThreePillars } from "@/components/ThreePillars";` and place `<ThreePillars />` after `<AboutBook />`.

**Step 3: Verify and commit**

```bash
git add components/ThreePillars.tsx app/page.tsx
git commit -m "feat: add Three Pillars section with cards and connecting motif"
```

---

## Task 7: About the Author Section

**Files:**
- Create: `components/AboutAuthor.tsx`
- Add: Author photo to `public/author-photo.jpg`
- Modify: `app/page.tsx`

**Step 1: Prepare author photo**

Extract/crop the author headshot from the back cover of `docs/BookBrushImage-2026-2-20-11-1241.png` and save as `public/author-photo.jpg`. If not feasible, use a placeholder and note for later.

**Step 2: Build AboutAuthor component**

```tsx
// components/AboutAuthor.tsx
import Image from "next/image";
import { SectionBadge } from "./SectionBadge";

export function AboutAuthor() {
  return (
    <section className="bg-navy-900 py-16 md:py-24">
      <div className="mx-auto max-w-[1120px] px-5 md:px-10">
        <div className="text-center mb-12">
          <SectionBadge label="About the Author" />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Author photo */}
          <div className="flex-shrink-0 w-60 md:w-80">
            <div className="rounded-2xl overflow-hidden border-2 border-accent/40">
              <Image
                src="/author-photo.jpg"
                alt="Jean-Philippe Gauthier"
                width={400}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-offwhite">
              Jean-Philippe Gauthier
            </h2>

            <div className="mt-5 space-y-4 text-gray-muted font-body text-base md:text-lg leading-relaxed max-w-xl">
              <p>
                A seasoned leader, coach, and trusted advisor with a thirty-year
                career, including more than a decade at Google. He describes
                himself as an &ldquo;ordinary man,&rdquo; not a natural-born
                risk-taker. He developed this mindset to navigate life&rsquo;s
                twists.
              </p>
              <p>
                He wrote this book out of a deep desire to guide his children,
                Ana&iuml;s and Louis, and his nephews, Jules and Samuel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Add to page.tsx and commit**

```bash
git add components/AboutAuthor.tsx app/page.tsx public/author-photo.jpg
git commit -m "feat: add About the Author section with photo and bio"
```

---

## Task 8: Convex Setup + Subscriber Mutation

**Files:**
- Create: `convex/schema.ts`
- Create: `convex/subscribers.ts`
- Modify: `package.json` (add convex dependency)
- Create: `app/ConvexClientProvider.tsx`
- Modify: `app/layout.tsx`

**Step 1: Install Convex**

```bash
npm install convex
```

**Step 2: Initialize Convex**

```bash
npx convex init
```

This creates the `convex/` directory with `_generated/` files.

**Step 3: Create schema**

```ts
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  subscribers: defineTable({
    email: v.string(),
    subscribedAt: v.number(),
  }).index("by_email", ["email"]),
});
```

**Step 4: Create subscriber mutation**

```ts
// convex/subscribers.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const subscribe = mutation({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    const normalizedEmail = email.toLowerCase().trim();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      throw new Error("Invalid email address");
    }

    // Check for duplicate
    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .first();

    if (existing) {
      // Silently succeed - don't reveal if email exists
      return { success: true };
    }

    await ctx.db.insert("subscribers", {
      email: normalizedEmail,
      subscribedAt: Date.now(),
    });

    return { success: true };
  },
});
```

**Step 5: Create Convex client provider**

```tsx
// app/ConvexClientProvider.tsx
"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
```

**Step 6: Wrap layout with Convex provider**

Update `app/layout.tsx` body to:

```tsx
<body className="bg-navy-950 text-white antialiased font-body">
  <ConvexClientProvider>{children}</ConvexClientProvider>
</body>
```

Add the import: `import { ConvexClientProvider } from "./ConvexClientProvider";`

**Step 7: Create `.env.local`**

```
NEXT_PUBLIC_CONVEX_URL=https://agreeable-starfish-139.convex.cloud
```

**Step 8: Deploy Convex schema**

```bash
npx convex dev --once
```

Expected: schema deployed, `subscribers` table created.

**Step 9: Commit**

```bash
git add convex/ app/ConvexClientProvider.tsx app/layout.tsx .env.local
git commit -m "feat: set up Convex with subscribers schema and mutation"
```

Note: If `.env.local` is gitignored (it should be), create a `.env.example` with `NEXT_PUBLIC_CONVEX_URL=` and commit that instead.

---

## Task 9: Email Signup Section

**Files:**
- Create: `components/EmailSignup.tsx`
- Modify: `app/page.tsx`

**Step 1: Build EmailSignup component**

```tsx
// components/EmailSignup.tsx
"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SectionBadge } from "./SectionBadge";
import { DottedPathConnector } from "./DottedPath";

export function EmailSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const subscribe = useMutation(api.subscribers.subscribe);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      await subscribe({ email });
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <section
      id="join"
      className="relative bg-gradient-to-br from-navy-800 to-navy-600 py-16 md:py-24 overflow-hidden"
    >
      {/* Background dotted path */}
      <DottedPathConnector className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1120px] px-5 md:px-10 text-center">
        <SectionBadge label="Join the Journey" />

        <h2 className="mt-8 font-display font-bold text-2xl md:text-3xl text-offwhite max-w-xl mx-auto leading-snug">
          The world won&rsquo;t stop changing. Choose how you grow with it.
        </h2>

        <p className="mt-4 text-gray-muted font-body text-base md:text-lg max-w-lg mx-auto">
          Sign up for reflections on curiosity, adaptability, and
          resilience&mdash;straight to your inbox.
        </p>

        {status === "success" ? (
          <div className="mt-10 flex items-center justify-center gap-3 text-offwhite text-lg font-body">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#CB4A33" />
              <path d="M7 12.5l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            You&rsquo;re on the path.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            toolName="subscribeNewsletter"
            toolDescription="Subscribe to The Explorer Mindset newsletter"
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full sm:flex-1 bg-navy-900 border border-border-subtle text-offwhite placeholder:text-gray-secondary rounded-xl px-5 py-3 font-body text-base focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full sm:w-auto bg-accent text-offwhite font-display font-semibold rounded-xl px-6 py-3 text-base hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent/40 transition-colors disabled:opacity-60 cursor-pointer"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-3 text-accent text-sm font-body">{errorMessage}</p>
        )}

        {status !== "success" && (
          <p className="mt-4 text-gray-secondary text-sm font-body">
            No spam. Unsubscribe anytime.
          </p>
        )}
      </div>
    </section>
  );
}
```

**Step 2: Add to page.tsx and commit**

```bash
git add components/EmailSignup.tsx app/page.tsx
git commit -m "feat: add email signup section with Convex integration"
```

---

## Task 10: Footer

**Files:**
- Create: `components/Footer.tsx`
- Modify: `app/page.tsx`

**Step 1: Build Footer component**

```tsx
// components/Footer.tsx
export function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-border-subtle py-10">
      <div className="mx-auto max-w-[1120px] px-5 md:px-10 text-center space-y-2">
        <p className="font-display text-sm uppercase tracking-[0.08em] text-gray-secondary">
          The Explorer Mindset
        </p>
        <p className="font-body text-sm text-gray-secondary">
          theexplorermindset.com
        </p>
        <p className="font-body text-sm text-gray-secondary">
          &copy; 2026 Jean-Philippe Gauthier
        </p>
      </div>
    </footer>
  );
}
```

**Step 2: Assemble complete page**

Final `app/page.tsx`:

```tsx
import { Hero } from "@/components/Hero";
import { AboutBook } from "@/components/AboutBook";
import { ThreePillars } from "@/components/ThreePillars";
import { AboutAuthor } from "@/components/AboutAuthor";
import { EmailSignup } from "@/components/EmailSignup";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutBook />
      <ThreePillars />
      <AboutAuthor />
      <EmailSignup />
      <Footer />
    </main>
  );
}
```

**Step 3: Commit**

```bash
git add components/Footer.tsx app/page.tsx
git commit -m "feat: add footer and assemble complete one-pager"
```

---

## Task 11: SEO + GEO Implementation

**Files:**
- Modify: `app/layout.tsx` (extended metadata + JSON-LD)
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`
- Create: `public/llms.txt`

**Step 1: Extended metadata + JSON-LD in layout.tsx**

Add to `app/layout.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Explorer Mindset - A Guide to Growth for Your Life, Family, and Work",
  description:
    "By Jean-Philippe Gauthier. A practical guide to building curiosity, adaptability, and resilience for navigating an uncertain future. Foreword by Sean Downey.",
  authors: [{ name: "Jean-Philippe Gauthier" }],
  openGraph: {
    title: "The Explorer Mindset",
    description: "A Guide to Growth for Your Life, Family, and Work",
    url: "https://theexplorermindset.com",
    siteName: "The Explorer Mindset",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "book",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Explorer Mindset",
    description: "A Guide to Growth for Your Life, Family, and Work",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://theexplorermindset.com",
  },
};
```

Add JSON-LD as a `<script>` tag inside the `<head>` area of the layout's `<html>`:

```tsx
<head>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "Book",
          name: "The Explorer Mindset",
          subtitle: "A Guide to Growth for Your Life, Family, and Work",
          author: {
            "@type": "Person",
            name: "Jean-Philippe Gauthier",
            url: "https://theexplorermindset.com",
          },
          datePublished: "2026-02-25",
          description:
            "A practical guide to building curiosity, adaptability, and resilience for navigating an uncertain future.",
          inLanguage: "en",
          genre: ["Self-Help", "Personal Development", "Leadership"],
        },
        {
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Jean-Philippe Gauthier",
          jobTitle: "Author, Leader, Coach",
          description:
            "A seasoned leader, coach, and trusted advisor with a thirty-year career, including more than a decade at Google.",
          url: "https://theexplorermindset.com",
        },
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "The Explorer Mindset",
          url: "https://theexplorermindset.com",
        },
      ]),
    }}
  />
</head>
```

**Step 2: Create robots.ts**

```ts
// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
    ],
    sitemap: "https://theexplorermindset.com/sitemap.xml",
  };
}
```

**Step 3: Create sitemap.ts**

```ts
// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://theexplorermindset.com",
      lastModified: new Date("2026-02-25"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
```

**Step 4: Create llms.txt**

```
# The Explorer Mindset

> A book by Jean-Philippe Gauthier about building curiosity, adaptability,
> and resilience for navigating an uncertain future.

## About
The Explorer Mindset is a practical guide for personal and professional growth.
It introduces a framework built on three traits: Curiosity, Adaptability, and Resilience.
Written for anyone navigating change - in their career, family, or personal life.

## Author
Jean-Philippe Gauthier is a seasoned leader, coach, and advisor with a thirty-year
career including more than a decade at Google. Foreword by Sean Downey.

## Links
- Website: https://theexplorermindset.com
- Newsletter signup: https://theexplorermindset.com#join
```

Save to `public/llms.txt`.

**Step 5: Commit**

```bash
git add app/layout.tsx app/robots.ts app/sitemap.ts public/llms.txt
git commit -m "feat: add SEO metadata, JSON-LD, robots.txt, sitemap, and llms.txt"
```

---

## Task 12: WebMCP Implementation

**Files:**
- Create: `components/WebMCPProvider.tsx`
- Modify: `app/layout.tsx`

**Step 1: Create WebMCP provider component**

```tsx
// components/WebMCPProvider.tsx
"use client";

import { useEffect } from "react";

export function WebMCPProvider() {
  useEffect(() => {
    // Feature detection: only register if WebMCP is supported
    if (typeof navigator === "undefined") return;
    if (!("modelContext" in navigator)) return;

    const mc = (navigator as any).modelContext;

    // Tool 1: Get book info
    mc.registerTool({
      name: "getBookInfo",
      description:
        "Get information about The Explorer Mindset book by Jean-Philippe Gauthier",
      inputSchema: {
        type: "object",
        properties: {},
        required: [],
      },
      async execute() {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                title: "The Explorer Mindset",
                subtitle:
                  "A Guide to Growth for Your Life, Family, and Work",
                author: "Jean-Philippe Gauthier",
                foreword: "Sean Downey",
                published: "2026-02-25",
                description:
                  "A practical guide to building curiosity, adaptability, and resilience for navigating an uncertain future.",
                themes: ["Curiosity", "Adaptability", "Resilience"],
                audience:
                  "Anyone navigating change in their career, family, or personal life",
                website: "https://theexplorermindset.com",
              }),
            },
          ],
        };
      },
    });

    // Tool 2: Subscribe to newsletter
    mc.registerTool({
      name: "subscribeNewsletter",
      description:
        "Subscribe to The Explorer Mindset newsletter for reflections on curiosity, adaptability, and resilience",
      inputSchema: {
        type: "object",
        properties: {
          email: {
            type: "string",
            description: "Email address to subscribe",
            pattern: "^[^@]+@[^@]+\\.[^@]+$",
          },
        },
        required: ["email"],
      },
      async execute({ email }: { email: string }) {
        try {
          const res = await fetch("/api/subscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
          const data = await res.json();
          return {
            content: [
              {
                type: "text",
                text: data.success
                  ? "Successfully subscribed to The Explorer Mindset newsletter."
                  : `Subscription failed: ${data.error}`,
              },
            ],
          };
        } catch {
          return {
            content: [
              {
                type: "text",
                text: "Subscription failed due to a network error.",
              },
            ],
          };
        }
      },
    });

    return () => {
      mc.unregisterTool?.("getBookInfo");
      mc.unregisterTool?.("subscribeNewsletter");
    };
  }, []);

  return null;
}
```

**Step 2: Create API route for WebMCP subscribe tool**

The WebMCP `subscribeNewsletter` tool needs an HTTP endpoint since it can't use React hooks.

```ts
// app/api/subscribe/route.ts
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    const result = await convex.mutation(api.subscribers.subscribe, { email });
    return Response.json(result);
  } catch (error) {
    return Response.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}
```

**Step 3: Add WebMCPProvider to layout.tsx**

Inside the `<body>` tag, after `<ConvexClientProvider>`:

```tsx
<body className="bg-navy-950 text-white antialiased font-body">
  <ConvexClientProvider>{children}</ConvexClientProvider>
  <WebMCPProvider />
</body>
```

Add import: `import { WebMCPProvider } from "@/components/WebMCPProvider";`

**Step 4: Commit**

```bash
git add components/WebMCPProvider.tsx app/api/subscribe/route.ts app/layout.tsx
git commit -m "feat: implement WebMCP tools (getBookInfo, subscribeNewsletter) and subscribe API route"
```

---

## Task 13: Scroll Animations

**Files:**
- Create: `components/AnimateOnScroll.tsx`
- Modify: section components to wrap content

**Step 1: Create a lightweight scroll animation wrapper**

Uses Intersection Observer, no external library needed.

```tsx
// components/AnimateOnScroll.tsx
"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

export function AnimateOnScroll({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}
```

**Step 2: Wrap key content blocks in each section component**

Wrap the inner content of `AboutBook`, `ThreePillars`, `AboutAuthor`, and `EmailSignup` with `<AnimateOnScroll>`. The Hero does NOT get this treatment (it's visible immediately).

For the pillar cards, add staggered delays via inline `style={{ transitionDelay: "100ms" }}`, `200ms`, `300ms`.

**Step 3: Commit**

```bash
git add components/AnimateOnScroll.tsx components/AboutBook.tsx components/ThreePillars.tsx components/AboutAuthor.tsx components/EmailSignup.tsx
git commit -m "feat: add scroll-triggered fade-in animations"
```

---

## Task 14: OG Image + Favicon

**Files:**
- Create: `public/og-image.png`
- Create: `app/icon.tsx` or `public/favicon.ico`

**Step 1: Generate OG image**

Create a 1200x630 image that matches the site aesthetic: navy background, book title in white/orange, book cover thumbnail. This can be done with Next.js `ImageResponse` API or as a static asset.

For a static approach: create a simple OG image programmatically or crop/composite from the book cover.

**Step 2: Generate favicon**

Create a simple favicon - an orange dot (the path motif endpoint) or the letter "E" in Montserrat on navy background. Use Next.js `app/icon.tsx` for a generated favicon:

```tsx
// app/icon.tsx
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "#CB4A33",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    ),
    { ...size }
  );
}
```

**Step 3: Commit**

```bash
git add public/og-image.png app/icon.tsx
git commit -m "feat: add OG image and favicon"
```

---

## Task 15: Final Polish + Verify

**Step 1: Run build to catch errors**

```bash
npm run build
```

Fix any TypeScript or build errors.

**Step 2: Visual check of all sections**

```bash
npm run dev
```

Walk through each section on desktop and mobile (responsive mode in dev tools):
- [ ] Hero: title stacking, book cover float, gradient, scroll indicator
- [ ] About the Book: badge, quote, body text, divider
- [ ] Three Pillars: 3 cards with orange dots, hover states
- [ ] About the Author: photo with border, bio text, responsive stacking
- [ ] Email Signup: form works, success/error states, trust line
- [ ] Footer: minimal, correct copy
- [ ] Scroll animations trigger on each section

**Step 3: Test email signup end-to-end**

1. Enter email in form
2. Submit
3. Verify "You're on the path" success state
4. Check Convex dashboard for the new subscriber record

**Step 4: Validate SEO**

- Visit `/robots.txt` - should show all agents allowed
- Visit `/sitemap.xml` - should list the homepage
- Visit `/llms.txt` - should show book info
- View page source, verify JSON-LD scripts present
- Check `<title>` and `<meta>` tags

**Step 5: Final commit**

```bash
git add -A
git commit -m "chore: final polish and build verification"
```

---

## Summary

| Task | Description | Key Files |
|------|-------------|-----------|
| 1 | Scaffold Next.js + Tailwind | `package.json`, `app/layout.tsx` |
| 2 | Design tokens + fonts | `app/globals.css`, `app/layout.tsx` |
| 3 | Shared components | `components/SectionBadge.tsx`, `components/DottedPath.tsx` |
| 4 | Hero section | `components/Hero.tsx` |
| 5 | About the Book | `components/AboutBook.tsx` |
| 6 | Three Pillars | `components/ThreePillars.tsx` |
| 7 | About the Author | `components/AboutAuthor.tsx` |
| 8 | Convex setup | `convex/schema.ts`, `convex/subscribers.ts` |
| 9 | Email Signup | `components/EmailSignup.tsx` |
| 10 | Footer + assemble page | `components/Footer.tsx`, `app/page.tsx` |
| 11 | SEO + GEO | `app/robots.ts`, `app/sitemap.ts`, `public/llms.txt` |
| 12 | WebMCP | `components/WebMCPProvider.tsx`, `app/api/subscribe/route.ts` |
| 13 | Scroll animations | `components/AnimateOnScroll.tsx` |
| 14 | OG image + favicon | `public/og-image.png`, `app/icon.tsx` |
| 15 | Final polish + verify | Build, visual QA, end-to-end test |
