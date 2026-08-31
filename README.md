# Progressive Driving School

Marketing site for Progressive Driving School LLC, Columbus, Ohio.
Next.js (App Router) + TypeScript + Tailwind v4, statically generated, hosted on Vercel.

The site is in English. Somali-speaking service is offered in person and by phone, which
the copy states explicitly — there is no separate Somali version of the site.

```bash
npm install
npm run dev          # http://localhost:3000
npm run check        # typecheck + lint
npm run links:check  # verifies the Ohio BMV links still resolve
```

---

## Making edits

Content is separated from code. Prices, contact details, hour counts and official links
live once in `src/content/`, and the prose that surrounds them lives in one copy file.
A price change is one line and cannot get out of sync with anything else.

Everything below can be edited straight from the GitHub web UI, which redeploys
automatically. No build knowledge required.

| To change… | Edit | Notes |
|---|---|---|
| A price | `src/content/courses.ts` | Exact string, e.g. `"$600"`. Never reformatted. |
| Phone, email, address | `src/content/site.ts` | Phone needs both `display` and `href`. |
| Business hours | `src/content/site.ts` → `hours` | Set `days` once confirmed (see below). |
| The registration link | `src/content/site.ts` → `registerUrl` | See "Register button" below. |
| Ohio BMV rules or links | `src/content/bmv.ts` | Then bump `lastVerified`. |
| Any visible text | `src/content/copy/en.ts` | One file, in page order. |
| Add a photo | `src/content/media.ts` | See "Photography" below. |
| The logo | `src/content/site.ts` → `logo` | See "Logo" below. |
| Brand colours | `src/app/globals.css` | The only file with colours in it. |

### The Register button

Every "Register" control links to `/register`, never to the external form directly. That
route reads `site.registerUrl` and redirects — currently to the JotForm at
`form.jotform.com/262005642367050`. Changing where enrolment happens is one line.

If `registerUrl` is ever set back to `null`, the route falls back to the contact page so
the primary call to action never dead-ends.

There is deliberately **no Register button on the individual course cards**. One sits in
the sticky header on every page, one in the hero, and one on the courses page beside the
enrolment explanation. Repeating it per card produced six identical buttons that all led
to the same form, which asks which course you want anyway.

### Logo

`public/logo/` holds two assets, both generated from the artwork the client supplied:

- `logo-mark.png` — the emblem alone, used in the header
- `logo-full.png` — the complete lockup, used for link-preview cards

The header pairs the emblem with the name in live text. The full lockup's own type would
be about four pixels tall in a 64px header, so setting the name in HTML keeps it legible,
selectable and translatable.

The palette in `src/app/globals.css` is **sampled from the logo**: `brand-600 #1a4390` is
its accent blue, `brand-900 #071c49` its navy, `ink-700 #3b3e42` its charcoal. If the logo
ever changes, resample those and the whole site re-skins — no component contains a hex
value.

### Photography

Image slots are declared in `src/content/media.ts` with their final aspect ratios already
reserved, so the layout is identical before and after photos arrive — no reflow, no
layout shift, nothing to restructure.

1. Export stills at **2000px wide or larger**.
2. Save into `public/images/`.
3. Set `src` for that slot in `media.ts`.
4. Update the alt text under `media` in `src/content/copy/en.ts`.

`next/image` handles compression and AVIF/WebP. Two things to check before publishing
anyone's photo: consent from anyone identifiable, and no readable licence plates.

### Business hours

`site.hours.days` is `null` because the days of the week were never confirmed. While it
is null the site shows the time range and "Call to confirm", and the structured data
deliberately omits `openingHours` — publishing guessed hours as machine-readable fact is
worse than publishing none. Set `days` and both fix themselves.

---

## Project layout

```
src/
  app/
    page.tsx           Home
    courses/           Courses and pricing
    requirements/      Ohio requirements (ages 18-20) + FAQ
    contact/           Contact details + form
    register/          Redirect chokepoint -> site.registerUrl
    api/contact/       Resend delivery path (inactive; see below)
    globals.css        Design tokens. The only file that defines a colour.
  components/
    site/              Header, Footer, Wordmark, MobileMenu, CourseCard, CallButton
    ui/                Button, Card, Container, Section, ExternalLink, icons
    media/Figure       Image slot with reserved aspect ratio
    forms/ContactForm  Client-side form
  content/             ← all editable content (see the table above)
  lib/                 nav, SEO, structured data, form transport
scripts/links-check.mjs
```

---

## The contact form

Submissions go to `progressivedrivingschoolllc@gmail.com`.

Because the business has no domain yet, the form posts to **Web3Forms**, a hosted
endpoint that delivers straight to Gmail with no DNS setup. Set it up once:

1. Sign up at <https://web3forms.com> **using the business Gmail address** — Web3Forms
   routes mail by access key, not by anything in this code, so whoever signs up receives
   the submissions.
2. Put the key in `.env.local` and in the Vercel project's environment variables:
   ```
   NEXT_PUBLIC_WEB3FORMS_KEY=your-key
   ```

**The form does not work until that key is set.** The key is safe in client-side code —
that is how Web3Forms is designed.

A **Resend** implementation ships alongside it, fully written but inactive, for when the
business has a domain and wants a branded sender. Verify the domain in Resend, then set
`NEXT_PUBLIC_CONTACT_TRANSPORT=resend`, `RESEND_API_KEY` and `CONTACT_FROM_EMAIL`. No
code changes. See `src/lib/contact-transport.ts` and `.env.example`.

Spam is handled by a honeypot field and a submission-time trap. No CAPTCHA — that is
friction on the site's most important conversion. Add one only if spam actually appears.

If the form ever fails, the error state shows the phone number and keeps what the visitor
typed. A form outage must never cost a lead.

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server. |
| `npm run build` | Production build. |
| `npm run check` | `typecheck` + `lint`. Run before pushing. |
| `npm run links:check` | Requests every Ohio BMV URL and fails on anything but 200. |

**Run `links:check` before every deploy, and every few months.** The site links to four
Ohio government URLs the business does not control. One of them was already dead when the
client supplied it — `publicsafety.ohio.gov/links/bmv5791.pdf` returns 404, and the BMV's
own forms page still advertises it. They will rot again.

---

## Deploying

Push to GitHub, import the repo in Vercel, and set the environment variables from
`.env.example`. Nothing else to configure — no database, no CMS, no build settings.

Before the first production deploy, set `site.url` to the real domain. It is used for
canonical URLs, the sitemap and structured data.

---

## Outstanding

See [docs/OPEN-QUESTIONS.md](docs/OPEN-QUESTIONS.md) — what still needs answering, and
where the client's brief was incomplete or self-contradictory.
