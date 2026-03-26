# Download Email Gate — Design

**Date:** 2026-03-26
**Scope:** Worksheets + Extras sections, Subscribers admin tab

## Goal

Capture first name and email before any PDF download on the Worksheets and Extras pages. Track the acquisition source (section + specific resource) in the database. Expose source fields in the admin Subscribers tab with inline editing.

## UX Flow

1. User clicks "Download" on a published resource card.
2. A glass modal appears (dark overlay behind) with:
   - Resource title at the top
   - First name field (required)
   - Email field (required)
   - "Download" submit button (orange, full width)
   - Privacy note linking to `/privacy` or `/fr/privacy` (lang-aware)
   - X close button top-right
3. On submit: validate, call Convex `subscribe` mutation with source + resourceTitle, then open the PDF URL in a new tab. Modal closes.
4. On error: show generic inline error. PDF does not open.
5. Already-subscribed users always see the modal. The mutation handles duplicates silently (profile update, first-touch attribution for source fields).

## Database Changes

Add two optional fields to the `subscribers` table in `convex/schema.ts`:

```ts
source: v.optional(v.string()),         // "worksheets" | "extras"
resourceTitle: v.optional(v.string()),  // e.g. "The Curiosity Map"
```

Both optional so existing subscribers (newsletter, assessment) are unaffected.

**Attribution rule:** On duplicate email, `source` and `resourceTitle` are only patched in if the subscriber does not already have them (first-touch attribution).

## Convex Changes

### `convex/subscribers.ts`

- `subscribe` mutation: add `source` and `resourceTitle` optional args. Apply first-touch attribution logic.
- `updateSubscriber` mutation: add `source` and `resourceTitle` to editable fields.

## Component Changes

### New: `components/DownloadGateModal.tsx`

Client component. Props:
```ts
{
  resourceTitle: string
  downloadUrl: string
  lang: Lang
  dict: { ... }   // modal copy keys
  onClose: () => void
}
```

State machine: `idle` | `submitting` | `error`. On success, calls `window.open(downloadUrl, "_blank")` then `onClose()`.

Reuses glass card style: `bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl`.
Overlay: `fixed inset-0 bg-navy-950/80 backdrop-blur-sm z-50`.

### `components/ResourcesWorksheets.tsx` + `components/ResourcesExtras.tsx`

Replace the `<a>` `DownloadButton` with a `<button>` that sets local state `{ open: true, item }`. Render `<DownloadGateModal>` when open. Pass `source` ("worksheets"/"extras") and `resourceTitle` through to the mutation.

## Admin Changes

### `components/admin/SubscribersCMS.tsx`

Add two columns to the subscribers table:
- **Source** — dropdown editor: blank / worksheets / extras
- **Resource** — free-text inline editor (same pattern as firstName/lastName)

Both editable inline. Click cell to edit, blur or Enter to save via `updateSubscriber` mutation.
On mobile, these columns can be hidden (table scrolls horizontally).

## Dictionary Keys to Add

Both `en.json` and `fr.json` under a `downloadGate` key:

```json
"downloadGate": {
  "title": "Download your resource",
  "firstName": "First name",
  "email": "Email address",
  "submit": "Download",
  "privacy": "We respect your privacy.",
  "privacyLink": "Privacy policy",
  "error": "Something went wrong. Please try again."
}
```

French:
```json
"downloadGate": {
  "title": "Téléchargez votre ressource",
  "firstName": "Prénom",
  "email": "Adresse courriel",
  "submit": "Télécharger",
  "privacy": "Nous respectons votre vie privée.",
  "privacyLink": "Politique de confidentialité",
  "error": "Une erreur est survenue. Veuillez réessayer."
}
```

## Files Touched

- `convex/schema.ts`
- `convex/subscribers.ts`
- `components/DownloadGateModal.tsx` (new)
- `components/ResourcesWorksheets.tsx`
- `components/ResourcesExtras.tsx`
- `components/admin/SubscribersCMS.tsx`
- `dictionaries/en.json`
- `dictionaries/fr.json`
- `dictionaries/getDictionary.ts` (if Dictionary type needs updating)
