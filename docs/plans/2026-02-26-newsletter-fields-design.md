# Newsletter Signup Enhancement — Design Document

**Date:** 2026-02-26
**Status:** Approved

## Goal

Enhance the newsletter signup form to capture first name, last name, and communication language preference in addition to email.

## Key Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Field requirements | First name required, last name optional | Personalized greetings improve open rates; last name adds friction |
| Language preference | Auto-detect from page language | User already chose by being on `/` or `/fr`; zero friction |
| Form layout | Name row above existing email row | Preserves glass card feel, minimal visual change |

## Form Layout

### Desktop
```
┌─────────────────────────────────────────────────────────┐
│  [ First name        ]   [ Last name (optional)        ]│
│  [ Your email address              ] [ START EXPLORING ]│
└─────────────────────────────────────────────────────────┘
              What is 5 + 3?  [ ? ]
```

### Mobile
All fields stack vertically: first name → last name → email → button.

## Bilingual Forms

**English (`/`):** "First name", "Last name (optional)", preferredLang auto-set to "en"
**French (`/fr`):** "Prénom", "Nom (facultatif)", preferredLang auto-set to "fr"

## Convex Schema

```ts
subscribers: defineTable({
  email: v.string(),
  firstName: v.optional(v.string()),    // NEW — optional at schema level for backward compat
  lastName: v.optional(v.string()),     // NEW
  preferredLang: v.optional(v.string()),// NEW — "en" or "fr"
  subscribedAt: v.number(),
  unsubscribedAt: v.optional(v.number()),
}).index("by_email", ["email"]),
```

All new fields are `v.optional()` because existing records lack them. Required constraint on firstName enforced at the API route level.

## Convex Mutation

- **New subscriber:** stores firstName, lastName, preferredLang alongside email
- **Re-subscribe:** updates all fields including new ones, clears unsubscribedAt
- **Already active:** returns alreadySubscribed, also updates name/lang if provided

## API Route

- Accept: `firstName` (required, string, max 100), `lastName` (optional, string, max 100), `lang` ("en" or "fr")
- Validate firstName is non-empty after trim
- Pass to Convex mutation

## Dictionary Additions

| Key | en.json | fr.json |
|---|---|---|
| `placeholderFirstName` | "First name" | "Prénom" |
| `placeholderLastName` | "Last name (optional)" | "Nom (facultatif)" |

## Implementation Order

1. Convex schema — add 3 optional fields, deploy
2. Convex mutation — accept and store new fields
3. API route — accept, validate, pass new fields
4. Dictionaries — add placeholder keys
5. EmailSignup component — add lang prop, two new inputs, two-row layout
6. Wire lang prop in page.tsx and [lang]/page.tsx
7. Frontend design audit
8. Build, test, commit, deploy
