# Somali (Af-Soomaali)

Somali is a **first-class version of the site**, not a translate widget. It has its own
URLs (`/so/...`), its own `<html lang>`, its own hreflang tags and sitemap entries, and
its own copy file.

## Status

**Translated — awaiting review by a fluent speaker. Not yet published.**

All 182 strings in `src/content/copy/so.ts` are translated. `npm run i18n:check` confirms
the structure and every `{placeholder}` match the English. Preview it at
`http://localhost:3000/so` with `npm run dev`.

It has **not** been added to `publishedLocales`, deliberately. This is a real business
publishing Ohio licensing requirements to a Somali-speaking audience, and a translation
that has not been read by a fluent speaker should not be the thing a student relies on
before a driving test. Have someone who speaks Somali read it — the uncle is the obvious
reviewer — then publish.

**Ask the reviewer to check these first**, in this order:

1. **The three BMV steps and the test-day checklist** (`bmv.steps`, `requirementsPage`).
   This is the content with real consequences if it is wrong.
2. **Course names, `audience`, and `includes`** — these sit next to prices.
3. **Form error messages** — short strings are the easiest to get subtly wrong.
4. Everything else.

## Publishing it

Add `"so"` to `publishedLocales` in `src/content/site.ts`:

```ts
publishedLocales: ["en", "so"],
```

That single edit builds the `/so` pages, reveals the language switcher in the header,
adds Somali to the sitemap, and starts advertising the hreflang alternates. Until then
`/so` returns 404 in production, so nothing unreviewed is reachable or indexed.

To let the client review it on a real URL first, set `PREVIEW_ALL_LOCALES=1` on a Vercel
**preview** deployment. Never set that in production.

---

## Translation decisions worth knowing

**Official names are deliberately left in English**: `TIPIC`, `BMV 5791`, `Class D`,
`Driver Education Certificate`, `Ohio BMV`, `Ohio Bureau of Motor Vehicles`. A student
has to find those exact words on a form and at the BMV counter — translating them would
work against the reader. Where one first appears, a Somali gloss follows in brackets,
e.g. `Driver Education Certificate-kaaga (shahaadada waxbarashada darawalnimada)`.

**Place names are unchanged**: Columbus, Franklin County, Ohio.

**The register is plain, not formal.** The audience is adult learners and parents, many
reading in a second language. Short sentences, everyday words.

---

## Rules when editing `so.ts`

**1. Never translate anything inside `{curly braces}`.**

```ts
body: "...{supervisedHours} saacadood oo tababar la kormeeray..."
```

Those are filled at render time from `src/content/bmv.ts`. Keep every placeholder exactly
as spelled — `{supervisedHours}`, not `{supervised_hours}`. Dropping one would silently
delete a legally significant number from the page. `i18n:check` compares placeholder
counts and fails if any go missing.

**2. Don't put prices, the phone number, the address, or URLs in this file.** They aren't
here. They live in `site.ts`, `courses.ts` and `bmv.ts` and are shared by both languages,
so there is one copy of each and the two versions can never disagree.

**3. Keep list lengths identical.** If an English `includes` array has four bullets, the
Somali one needs four. `i18n:check` catches this; `tsc` catches any missing key.

**4. Keep two paired labels short.** `courseLabel` sits beside `languageLabel` in a
two-column row on the contact form. If either wraps, the two dropdowns stop lining up.

## Adding a new string later

1. Add it to the `Copy` interface in `src/content/copy/types.ts`.
2. Add it to `en.ts` **and** `so.ts`. A missing key in either is a compile error.
3. `npm run check`.

Somali runs roughly 15–25% longer than English. Nothing in the layout is fixed-width, and
the current translation was verified to produce no horizontal overflow at 375, 768, 1024
and 1440px — but re-check the header and buttons after adding anything long.
