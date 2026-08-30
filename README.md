# Progressive Driving School

Marketing site for Progressive Driving School LLC, Columbus, Ohio.
Next.js (App Router) + TypeScript + Tailwind v4, statically generated, hosted on Vercel.

English is live. Somali is fully built but not published — see
[docs/TRANSLATION.md](docs/TRANSLATION.md).

```bash
npm install
npm run dev          # http://localhost:3000 (both languages visible in dev)
npm run check        # typecheck + lint + i18n
npm run links:check  # verifies the Ohio BMV links still resolve
```

---

## Making edits

The design principle behind this codebase: **facts live in one place, prose lives in
another.** Prices, phone numbers, hour counts and URLs are stored once and read by both
languages, so a price change updates English and Somali at the same time and the two can
never drift apart.

Everything below is a one-line edit in `src/content/`. No build knowledge required —
these files can be edited straight from the GitHub web UI, which redeploys automatically.

| To change… | Edit | Notes |
|---|---|---|
| A price | `src/content/courses.ts` | Exact string, e.g. `"$600"`. Never reformatted. |
| Phone, email, address | `src/content/site.ts` | Phone needs both `display` and `href`. |
| Business hours | `src/content/site.ts` → `hours` | Set `days` once confirmed (see below). |
| The registration link | `src/content/site.ts` → `registerUrl` | See "Register button" below. |
| Ohio BMV rules or links | `src/content/bmv.ts` | Then bump `lastVerified`. |
| Any visible English text | `src/content/copy/en.ts` | Also update `so.ts`. |
| Add a photo | `src/content/media.ts` | See "Photography" below. |
| The logo | `src/content/site.ts` → `logo` | See "Logo" below. |
| Brand colours | `src/app/globals.css` | The only file with colours in it. |

### The Register button

Every "Register" control links to `/{lang}/register`, never to an external URL. That
route reads `site.registerUrl` and redirects.

- **While `registerUrl` is `null`** (now): it redirects to the contact page, so the
  primary call to action still goes somewhere useful instead of nowhere.
- **To go live**: set `registerUrl` to the real URL. One line, and every Register button
  on the site switches over.

### Logo

Drop an SVG into `public/logo/` and set `site.logo.src` (e.g. `"/logo/logo.svg"`) with
its intrinsic width and height. The header swaps from the typeset wordmark to the real
mark with no other change.

Then derive the palette from the logo and replace the `--color-brand-*` and
`--color-accent-*` values in `src/app/globals.css`. That file is the only place a colour
is defined — no component contains a hex value — so the whole site re-skins from those
two scales. Check the new colours for WCAG AA contrast (4.5:1 body text, 3:1 for large
headings and controls).

### Photography

Image slots are declared in `src/content/media.ts` with their final aspect ratios
already reserved, so the layout is identical before and after photos arrive — no reflow,
no layout shift, nothing to restructure.

1. Export stills at **2000px wide or larger**.
2. Save into `public/images/`.
3. Set `src` for that slot in `media.ts`.
4. Update the alt text under `media` in **both** copy files.

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
    [lang]/            Every page. This is the root layout, so <html lang> is always right.
      page.tsx         Home
      courses/         Courses and pricing
      requirements/    Ohio requirements (ages 18-20) + FAQ
      contact/         Contact details + form
      register/        Redirect chokepoint -> site.registerUrl
    api/contact/       Resend delivery path (inactive; see below)
    globals.css        Design tokens. The only file that defines a colour.
  components/
    site/              Header, Footer, LangSwitcher, MobileMenu, CourseCard, CallButton
    ui/                Button, Card, Container, Section, ExternalLink, icons
    media/Figure       Image slot with reserved aspect ratio
    forms/ContactForm  Client-side form
  content/             ← all editable content (see the table above)
  lib/                 i18n, SEO, structured data, form transport
scripts/               i18n and link checks
```

`/` redirects to `/en` (configured in `next.config.ts`). Somali pages are excluded from
the production build until published, so `/so` returns 404 rather than showing an
unfinished translation.

---

## The contact form

Submissions go to `progressivedrivingschoolllc@gmail.com`.

Because the business has no domain yet, the form posts to **Web3Forms**, a hosted
endpoint that delivers straight to Gmail with no DNS setup. Set it up once:

1. Sign up at <https://web3forms.com> using the business Gmail address.
2. Put the access key in `.env.local` and in the Vercel project's environment variables:
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
friction on the site's single most important conversion. Add one only if spam actually
appears.

If the form ever fails, the error state shows the phone number. A form outage must never
cost a lead.

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server. Both locales are built so Somali can be previewed. |
| `npm run build` | Production build. Only published locales. |
| `npm run check` | `typecheck` + `lint` + `i18n:check`. Run before pushing. |
| `npm run links:check` | Requests every Ohio BMV URL and fails on anything but 200. |
| `npm run i18n:check` | Somali progress, structure drift, placeholder drift. |
| `npm run i18n:scaffold` | Regenerates `so.ts` from `en.ts`. `--force` to overwrite. |

**Run `links:check` before every deploy, and every few months.** The site links to four
Ohio government URLs the business does not control. One of them was already dead when
the client supplied it — `publicsafety.ohio.gov/links/bmv5791.pdf` returns 404, and the
BMV's own forms page still advertises it. They will rot again.

---

## Deploying

Push to GitHub, import the repo in Vercel, and set the environment variables from
`.env.example`. Nothing else to configure — no database, no CMS, no build settings.

Before the first production deploy, set `site.url` to the real domain. It is used for
canonical URLs, hreflang tags, the sitemap and structured data.

---

## Outstanding

See [docs/OPEN-QUESTIONS.md](docs/OPEN-QUESTIONS.md) — what still needs answering before
launch, and where the client's brief was incomplete or self-contradictory.
