# The Explorer Mindset - One-Pager Design

**Date:** 2026-02-25
**Goal:** Build an audience through email capture, with the book as the hook
**Type:** Single-page marketing site

---

## Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (design tokens from `docs/System Design.md`)
- **Fonts:** Montserrat (display) + Inter (body) via Google Fonts / next/font
- **Email storage:** Convex (existing deployment at `https://agreeable-starfish-139.convex.cloud`)
- **Hosting:** Vercel
- **Domain:** theexplorermindset.com

---

## Page Structure

Six sections, single scrollable page. Alternating navy backgrounds create visual rhythm.

```
┌─────────────────────────────────────┐
│  1. HERO                            │  ← #2F4A82 → #23375E gradient
│     Title + Book Cover              │
├─────────────────────────────────────┤
│  2. ABOUT THE BOOK                  │  ← #1C2C4A (deeper navy)
│     Pull quote + description        │
├─────────────────────────────────────┤
│  3. THREE PILLARS                   │  ← #23375E (primary navy)
│     Curiosity / Adaptability /      │
│     Resilience cards                │
├─────────────────────────────────────┤
│  4. ABOUT THE AUTHOR                │  ← #1C2C4A (deeper navy)
│     Photo + bio                     │
├─────────────────────────────────────┤
│  5. EMAIL SIGNUP                    │  ← #23375E → #2F4A82 gradient
│     "Join the Journey" form         │
├─────────────────────────────────────┤
│  6. FOOTER                          │  ← #151517 (deepest navy)
│     Minimal branding                │
└─────────────────────────────────────┘
```

---

## Section 1: Hero

**Background:** Full-viewport height, gradient from `#2F4A82` (top-left) to `#23375E` (bottom-right). Subtle dotted path SVG in background at ~15% opacity.

**Desktop layout (two columns):**

| Left (60%) | Right (40%) |
|---|---|
| Stacked title | Book cover image |
| Subtitle | |
| Author credit | |

**Title treatment:**
- "THE" - white (`#F5F6F9`), Montserrat extra-bold, uppercase, 56-72px
- "EXPLORER" - orange (`#CB4A33`), Montserrat extra-bold, uppercase, 56-72px
- "MINDSET" - white (`#F5F6F9`), Montserrat extra-bold, uppercase, 56-72px
- Letter-spacing: +0.08em to +0.12em
- Line-height: 0.95 (tight stacking)

**Subtitle:** *"A Guide to Growth for Your Life, Family, and Work"*
- Inter, 18-20px, off-white (`#F5F6F9`), normal weight
- Margin-top: 24px

**Author credit:** *"By Jean-Philippe Gauthier | Foreword by Sean Downey"*
- Inter, 16px, muted gray (`#777F97`)
- Margin-top: 12px

**Book cover image:**
- Slight rotation (2-3 degrees clockwise)
- Soft drop shadow (`0 20px 60px rgba(0,0,0,0.4)`)
- Max-height: ~500px

**Scroll indicator:** Subtle animated chevron at bottom center, white at 40% opacity, gentle bounce animation.

**Mobile:** Stacks vertically - title first, then book cover (centered, max-width ~280px), subtitle below.

---

## Section 2: About the Book

**Background:** Solid `#1C2C4A`.

**Section label:** Orange pill badge centered at top.
- "ABOUT THE BOOK"
- Montserrat, 12-14px, uppercase, tracking +0.08em
- Background: `#CB4A33`, text: white, rounded-full, px-4 py-1

**Headline (pull quote):**
- *"Swap safety for curiosity and discover how energizing that choice can be."*
- Centered, Montserrat bold, 28-32px, off-white
- Max-width: 700px, margin: 0 auto

**Body copy:**
- Centered, Inter 18px, line-height 1.7, color `#C6BBC7`
- Max-width: 650px

Content:

> Change isn't slowing down. It shapes how we lead, parent, and live. The question isn't whether you can keep up - it's how you'll move through it.
>
> This guide shows why an Explorer Mindset fuels happiness, resilience, and forward momentum. You'll find practical ways to experiment every day, adapt on the fly, transform setbacks into springboards, and ask bigger questions that pull you toward purpose.

**Section divider:** Centered dotted horizontal line at bottom.
- Width: ~200px, orange (`#CB4A33`) at 30% opacity
- Dashed stroke, 2px, rounded caps

---

## Section 3: The Three Pillars

**Background:** Solid `#23375E`.

**Section label:** Orange pill - "THE FRAMEWORK" - centered.

**Headline:**
- *"Three traits that change everything."*
- Centered, Montserrat bold, 28-32px, off-white

**Card grid:** Three cards in a row (desktop), stacked on mobile.
- Gap: 24px
- Max-width: 1120px, centered

**Each card:**
- Background: `#29406F`
- Border: `rgba(245,246,249,0.08)` 1px solid
- Rounded: `2xl` (16px)
- Padding: 32px

**Card content:**
- **Orange dot:** 24px circle, `#CB4A33`, top of card
- **Title:** Montserrat semi-bold, 20-24px, white, margin-top 16px
- **Description:** Inter 16px, `#C6BBC7`, margin-top 12px, line-height 1.6

**Card copy:**

| Pillar | Description |
|---|---|
| Curiosity | *"The desire to understand and learn. To ask 'what if' before settling for 'that's how it is.'"* |
| Adaptability | *"The ability to adjust when the ground shifts. To welcome detours as part of the journey."* |
| Resilience | *"The capacity to recover and keep moving. To turn every fall into forward momentum."* |

**Connecting motif (desktop):** Subtle dotted line connecting the three orange dots horizontally across the cards. Orange at 20% opacity, dashed, 2px stroke.

---

## Section 4: About the Author

**Background:** Solid `#1C2C4A`.

**Section label:** Orange pill - "ABOUT THE AUTHOR" - centered.

**Desktop layout (two columns, vertically centered):**

| Left (40%) | Right (60%) |
|---|---|
| Author photo | Bio text |

**Author photo:**
- Rounded `2xl` (16px)
- Subtle orange border: 2px solid `rgba(203,74,51,0.4)`
- Max-width: ~350px
- Source: Author headshot from back cover

**Bio headline:** *"Jean-Philippe Gauthier"*
- Montserrat bold, 28-32px, white

**Bio text:** Inter 18px, `#C6BBC7`, line-height 1.7

> A seasoned leader, coach, and trusted advisor with a thirty-year career, including more than a decade at Google. He describes himself as an "ordinary man," not a natural-born risk-taker. He developed this mindset to navigate life's twists.
>
> He wrote this book out of a deep desire to guide his children, Anaïs and Louis, and his nephews, Jules and Samuel.

**Mobile:** Stacks vertically - photo centered (max-width ~250px), text below.

---

## Section 5: Email Signup

**Background:** Gradient `#23375E` → `#2F4A82` (reversed hero gradient, sense of arrival).

**Dotted path motif:** Subtle curved SVG line flowing from above the headline toward the form. Orange at 15% opacity.

**Section label:** Orange pill - "JOIN THE JOURNEY" - centered.

**Headline:**
- *"The world won't stop changing. Choose how you grow with it."*
- Centered, Montserrat bold, 28-32px, off-white
- Max-width: 600px

**Subtext:**
- *"Sign up for reflections on curiosity, adaptability, and resilience - straight to your inbox."*
- Centered, Inter 18px, `#C6BBC7`

**Form:** Centered, max-width 500px.

Desktop: single row (input + button inline).

| Element | Spec |
|---|---|
| Email input | bg: `#1C2C4A`, border: `rgba(245,246,249,0.14)`, placeholder: *"Your email address"* in `#777F97`, rounded-xl, px-5 py-3, text white, focus: border `#CB4A33` + ring |
| Submit button | bg: `#CB4A33`, text: white, *"Subscribe"*, rounded-xl, px-6 py-3, hover: `#D7674C`, font: Montserrat semi-bold |

Mobile: Input and button stack vertically, full width, 12px gap.

**Trust line:** Below form, centered.
- *"No spam. Unsubscribe anytime."*
- Inter 14px, `#777F97`

**Success state:** On submit, replace form with:
- *"You're on the path."*
- Checkmark icon in orange, Inter 18px, off-white

**Error state:** Inline below input, Inter 14px, orange text.

---

## Section 6: Footer

**Background:** Solid `#151517`.
**Top border:** 1px solid `rgba(245,246,249,0.14)`.
**Padding:** 40px vertical.

**Content (centered):**
- Book title: "THE EXPLORER MINDSET" - Montserrat 14px, uppercase, `#777F97`, tracking wide
- Domain: *theexplorermindset.com* - Inter 14px, `#777F97`
- Copyright: *"© 2026 Jean-Philippe Gauthier"* - Inter 14px, `#777F97`

Spaced vertically with 8px gaps. No social icons for now.

---

## Data Model (Convex)

### Table: `subscribers`

| Field | Type | Notes |
|---|---|---|
| email | string | Unique, required, validated |
| subscribedAt | number | Timestamp (Date.now()) |

### Mutations

- `subscribers.subscribe` - Accepts email, validates format, checks for duplicates, inserts record. Returns success/error.

### Queries

- `subscribers.list` - Admin use only (for later). Returns all subscribers.

---

## Assets Needed

| Asset | Source | Notes |
|---|---|---|
| Book cover (front) | Crop from `docs/BookBrushImage-2026-2-20-11-1241.png` | Front cover only, high-res |
| Author photo | Crop from back cover or source file | Headshot, square crop preferred |
| Dotted path SVG | Create in code | SVG with dashed stroke, orange, curved path |
| Favicon | Derive from cover | Orange dot or "E" monogram |

---

## Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| < 640px (mobile) | Single column, stacked layouts, reduced font sizes |
| 640-1024px (tablet) | Two-column where possible, adjusted spacing |
| > 1024px (desktop) | Full layout as designed |

---

## Performance Notes

- Use `next/image` for optimized book cover and author photo
- Use `next/font` for Montserrat + Inter (self-hosted, no layout shift)
- Dotted path motifs as inline SVG (no extra requests)
- Single page = single route, minimal JS bundle
- Convex mutation is the only client-side interaction

---

## Animations (subtle, optional)

- **Scroll indicator:** Gentle bounce (CSS keyframe), 2s loop
- **Cards:** Fade-in + slight translate-up on scroll into view (intersection observer)
- **Form success:** Simple fade transition
- **No parallax, no heavy animations** - keep it calm and confident per brand principles

---

## SEO + GEO (Generative Engine Optimization)

The site must be optimized for both traditional search engines and AI-powered generative engines (ChatGPT, Perplexity, Gemini, Claude).

### Meta & Head

```html
<title>The Explorer Mindset - A Guide to Growth for Your Life, Family, and Work</title>
<meta name="description" content="By Jean-Philippe Gauthier. A practical guide to building curiosity, adaptability, and resilience for navigating an uncertain future. Foreword by Sean Downey." />
<meta name="author" content="Jean-Philippe Gauthier" />
<link rel="canonical" href="https://theexplorermindset.com" />

<!-- Open Graph -->
<meta property="og:title" content="The Explorer Mindset" />
<meta property="og:description" content="A Guide to Growth for Your Life, Family, and Work" />
<meta property="og:image" content="/og-image.png" />
<meta property="og:url" content="https://theexplorermindset.com" />
<meta property="og:type" content="book" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="The Explorer Mindset" />
<meta name="twitter:description" content="A Guide to Growth for Your Life, Family, and Work" />
<meta name="twitter:image" content="/og-image.png" />
```

### Structured Data (JSON-LD)

Embed in `<head>` for AI and search engine parsing:

**1. Book schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "The Explorer Mindset",
  "subtitle": "A Guide to Growth for Your Life, Family, and Work",
  "author": {
    "@type": "Person",
    "name": "Jean-Philippe Gauthier",
    "url": "https://theexplorermindset.com"
  },
  "datePublished": "2026-02-25",
  "description": "A practical guide to building curiosity, adaptability, and resilience for navigating an uncertain future.",
  "publisher": {
    "@type": "Organization",
    "name": "Anonymous"
  },
  "inLanguage": "en",
  "genre": ["Self-Help", "Personal Development", "Leadership"],
  "keywords": ["explorer mindset", "curiosity", "adaptability", "resilience", "personal growth", "leadership"]
}
```

**2. Person schema (author):**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jean-Philippe Gauthier",
  "jobTitle": "Author, Leader, Coach",
  "description": "A seasoned leader, coach, and trusted advisor with a thirty-year career, including more than a decade at Google.",
  "url": "https://theexplorermindset.com",
  "sameAs": []
}
```

**3. WebSite schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "The Explorer Mindset",
  "url": "https://theexplorermindset.com"
}
```

### GEO-Specific Optimizations

**Content structure for AI engines:**
- Each section starts with a clear, direct statement before expanding with context
- Clean heading hierarchy (H1 → H2 → H3) to signal topic boundaries
- FAQ-ready copy: the three pillars section naturally answers "What is an explorer mindset?"
- High fact-density: statistics, quotes, and specific claims AI engines can extract

**Semantic HTML:**
- Use `<article>`, `<section>`, `<header>`, `<footer>` semantic elements
- Each section gets a meaningful `<h2>` (not decorative)
- Author bio in a `<section>` with proper heading hierarchy
- Book description structured as extractable passages

**AI crawler access - `robots.txt`:**
```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://theexplorermindset.com/sitemap.xml
```

**`llms.txt` file** (at site root - guides AI systems):
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

**Sitemap** (`sitemap.xml`):
- Auto-generated by Next.js
- Single URL for now, expandable later

---

## WebMCP (Web Model Context Protocol)

Implement the WebMCP protocol so AI agents (Chrome 146+) can interact with the site as a structured tool rather than scraping HTML. This makes the site future-ready for the agentic web.

Reference: [W3C WebMCP Draft](https://webmcp.link/) | [Google announcement](https://www.marktechpost.com/2026/02/14/google-ai-introduces-the-webmcp-to-enable-direct-and-structured-website-interactions-for-new-ai-agents/)

### Tools to Expose

The site exposes two tools via WebMCP:

**1. `getBookInfo` - Returns structured book information**

An AI agent asking "tell me about The Explorer Mindset" gets clean JSON instead of parsing HTML.

```javascript
navigator.modelContext.registerTool({
  name: "getBookInfo",
  description: "Get information about The Explorer Mindset book by Jean-Philippe Gauthier",
  inputSchema: {
    type: "object",
    properties: {},
    required: []
  },
  async execute() {
    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          title: "The Explorer Mindset",
          subtitle: "A Guide to Growth for Your Life, Family, and Work",
          author: "Jean-Philippe Gauthier",
          foreword: "Sean Downey",
          published: "2026-02-25",
          description: "A practical guide to building curiosity, adaptability, and resilience for navigating an uncertain future.",
          themes: ["Curiosity", "Adaptability", "Resilience"],
          audience: "Anyone navigating change in their career, family, or personal life",
          website: "https://theexplorermindset.com"
        })
      }]
    };
  }
});
```

**2. `subscribeNewsletter` - Allows AI agents to subscribe users (with confirmation)**

```javascript
navigator.modelContext.registerTool({
  name: "subscribeNewsletter",
  description: "Subscribe to The Explorer Mindset newsletter for reflections on curiosity, adaptability, and resilience",
  inputSchema: {
    type: "object",
    properties: {
      email: {
        type: "string",
        description: "Email address to subscribe",
        pattern: "^[^@]+@[^@]+\\.[^@]+$"
      }
    },
    required: ["email"]
  },
  async execute({ email }) {
    // Uses the same Convex mutation as the form
    const result = await subscribeAction(email);
    return {
      content: [{
        type: "text",
        text: result.success
          ? "Successfully subscribed to The Explorer Mindset newsletter."
          : `Subscription failed: ${result.error}`
      }]
    };
  }
});
```

### Declarative Fallback

Also declare tools via HTML form attributes for agents that use the declarative API:

```html
<form toolname="subscribeNewsletter"
      tooldescription="Subscribe to The Explorer Mindset newsletter"
      action="/api/subscribe"
      method="POST">
  <input name="email" type="email" required
         placeholder="Your email address">
  <button type="submit">Subscribe</button>
</form>
```

### Implementation Notes

- WebMCP registration goes in a client component, loaded only when `navigator.modelContext` is available (feature detection)
- HTTPS required (Vercel provides this)
- Tools are registered on page load, no user interaction needed
- `subscribeNewsletter` should trigger `agent.requestUserInteraction()` for explicit user consent before executing
- Progressive enhancement: site works perfectly without WebMCP, tools are a bonus layer
