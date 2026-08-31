# Open questions and flagged gaps

Status as of 30 August 2026 (updated after the logo and registration link arrived). Everything here is either unanswered, unconfirmed, or
internally inconsistent in the brief. Nothing below has been guessed at in the code —
where an answer is missing, the site says so and points at the phone.

---

## Blocking launch

- [ ] **Ohio driver training school licence number.** Needed for the trust section, and
      it is the strongest credibility signal the site can carry.
- [ ] **Is the school listed in the state's approved-school lookup?**
      The requirements page sends visitors to
      <https://apps.dps.ohio.gov/DETS/public/schools>. If Progressive is not listed there,
      that link actively costs conversions.
- [ ] **A vector version of the logo.** What was supplied is a PNG screenshot, which was
      trimmed and cleaned into `logo-mark.png` and `logo-full.png`. Those are fine at the
      sizes the site uses, but an SVG or the original artwork would be sharper and much
      smaller, and is what a print shop will ask for.
- [ ] **Per-course minimum ages.** Unanswered for the $600 and $550 courses. The site
      shows "Call to confirm" rather than inventing a number. (21+ for the adult course
      comes from the client's own course name.)

---

## Blocking complete content

- [ ] **Trust/credibility material.** Years in business, students taught, instructor
      certifications, insurance/bonding, testimonials. The trust section currently uses
      only facts the client actually confirmed — nothing is invented — which makes it
      thinner than it should be. This is also why there is no About page yet.
- [ ] **What is included in each price?** Is the car provided? Is the Driver Education
      Certificate fee included? Is there a surcharge for pickup?
- [ ] **What to bring, and prerequisites.** Never fully answered. Specifically: does a
      student need a TIPIC in hand before their **first behind-the-wheel lesson**? The
      client's source material mentions the TIPIC only in connection with test day.
- [ ] **Pickup rules.** "Limited student pickup based on availability" is unwritable as
      given. What radius, what criteria, what cost?
- [ ] **Payment methods**, and where payment happens — in person, or through the
      registration portal?
- [ ] **Refund / cancellation policy.** People ask, and it is worth publishing.
- [ ] **What do 21+ students actually need, and why take the 12-hour course?** See the
      contradiction below.
- [ ] **Is Suite 28 somewhere students go**, or admin only given the classroom is online?
      This decides whether the site should push directions and a map.

---

## Operational

- [ ] **Domain.** None yet. The contact form works without one; a branded email sender
      needs one.
- [ ] **Web3Forms access key** — required before the contact form works at all.
- [ ] **Who monitors the Gmail inbox, and how quickly?** Should submitters get an
      automatic acknowledgement?
- [ ] **Existing Google Business Profile, Facebook page, or reviews** to link to.
      Worth saying plainly: for "driving school near me" searches, a claimed and
      well-maintained Google Business Profile will likely out-earn this website. The site
      is built to feed it — consistent name, address and phone throughout.
- [ ] **Account ownership** — who holds the domain, Vercel and GitHub accounts, the
      client or the developer?
- [ ] **Photo consent** for anyone identifiable in the video stills.

---

## Contradictions and risks found in the brief

1. **The audience and the FAQ point in opposite directions.** The brief says the business
   skews adult (21+), but every piece of supplied FAQ material covers only the 18–20
   Class D path. The $800 adult course — the most expensive product — has no supporting
   content at all. The requirements page handles this honestly: it states that the steps
   apply to ages 18–20 and routes 21+ visitors to a phone call. That is a stopgap, not a
   solution.

2. **The BMV 5791 link the client supplied was dead.** `publicsafety.ohio.gov/links/
   bmv5791.pdf` returned 404, verified along with four other URL patterns. The BMV's own
   forms page still advertises it, so this is the state's broken link rather than a
   transcription error. The site now uses
   `dam.assets.ohio.gov/image/upload/publicsafety.ohio.gov/bmv5791.pdf` (200, 166 KB,
   current version including the hour log). The original URL is preserved in a comment in
   `src/content/bmv.ts`. `npm run links:check` guards against a repeat.

3. **Possible omission on the affidavit.** Public BMV guidance describes form BMV 5791 as
   **notarised** for applicants under 21. The client's summary says only "completed". His
   wording has not been altered — but a student who arrives un-notarised fails the
   appointment, so this needs confirming.

(Formerly listed here: whether Somali-speaking service was genuine, and whether the
business name was right. Both are now confirmed — see Resolved.)

---

## Resolved

- **Hours confirmed (30 August 2026), and they resolve an earlier contradiction.** The
  original brief said 9 AM–5 PM, which could not accommodate an 8-hour driving course.
  The real answer is that office and in-car hours are different: office Monday–Friday
  9:00 AM–3:00 PM, lessons Monday–Thursday and at weekends including 6:00–8:00 PM
  evenings, plus a single Friday afternoon slot. Both are on the site; only the office
  hours go into structured data.

- **Pricing confirmed by the client (30 August 2026).** $600 / $550 / $800 are correct as
  given. The $50 gap between the 24-hour-plus-drive package and the drive-only course is
  intentional, not a typo.

- **Legal name** — the logo artwork reads "PROGRESSIVE DRIVING SCHOOL LLC · COLUMBUS, OH",
  confirming both the name and the city. The site shows the short name in headings and the
  full legal name in the footer, copyright and structured data.
- **Registration URL** — `https://form.jotform.com/262005642367050`, set in
  `site.registerUrl`. Every Register control routes through `/register` to reach it.
- **Logo** — supplied and in use. The palette is now sampled from it rather than a
  placeholder: `#1a4390` accent blue, `#071c49` navy, `#3b3e42` charcoal.
- **Somali** — the client confirmed the school serves Somali-speaking students. The site
  says so in the header, the trust section, the contact page and the FAQ, and declares it
  to search engines via `knowsLanguage`. A separate Somali version of the site was built
  and then removed at the client's direction; the full translation remains in git history
  (commit `ee75529`) if it is ever wanted again.

## Deliberately out of scope

No payment plans, no discounts, no promo or coupon UI anywhere in the codebase. No stock
photography. No CMS. No separate Somali version of the site. Nothing copied from the
inspiration site beyond page-level information architecture.
