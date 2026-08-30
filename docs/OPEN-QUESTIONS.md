# Open questions and flagged gaps

Status as of 30 August 2026. Everything here is either unanswered, unconfirmed, or
internally inconsistent in the brief. Nothing below has been guessed at in the code —
where an answer is missing, the site says so and points at the phone.

---

## Blocking launch

- [ ] **Confirm the legal name.** "Progressive Driving School LLC" was inferred from the
      business email address; the client never stated it. The site shows "Progressive
      Driving School" in the header and headings, with the full LLC name in the footer,
      copyright and structured data. Both come from `site.name` / `site.legalName`.
- [ ] **Registration URL.** `site.registerUrl` is `null`, so every Register button
      currently falls back to the contact page. One destination for all three courses, or
      one per course? Is the 24-hour online course hosted by a third-party vendor?
- [ ] **Days of the week for business hours.** We have 9 AM – 5 PM and nothing else.
      Also: are those *office* hours or *lesson* hours? An 8-hour drive cannot fit in a
      single 9–5 day, and adult learners typically need evenings and weekends. Until this
      is answered the site shows the time range plus "Call to confirm", and structured
      data omits `openingHours` entirely.
- [ ] **Confirm the $600 / $550 pricing.** ⚠️ **Highest-risk number on the site.**
      $600 (24-hour online + 8-hour drive) minus $550 (8-hour drive only) prices 24 hours
      of classroom instruction at **$50**. The other two courses are internally
      consistent at roughly $67–69 per driving hour. Verify this is not a typo before
      launch.
- [ ] **Ohio driver training school licence number.** Needed for the trust section, and
      it is the strongest credibility signal the site can carry.
- [ ] **Is the school listed in the state's approved-school lookup?**
      The requirements page sends visitors to
      <https://apps.dps.ohio.gov/DETS/public/schools>. If Progressive is not listed there,
      that link actively costs conversions.
- [ ] **Logo files.** SVG preferred, horizontal and stacked lockups, plus any existing
      brand colours or fonts. The palette is a neutral placeholder until then.
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
- [ ] **Is Somali-speaking instruction and phone support genuinely available?** See the
      contradiction below.

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

1. **The pricing delta is anomalous.** See above. The single most important thing to
   confirm before this site goes live.

2. **Hours don't fit the service.** 9 AM – 5 PM, no days given, against an 8-hour driving
   course and an audience of working adults.

3. **The audience and the FAQ point in opposite directions.** The brief says the business
   skews adult (21+), but every piece of supplied FAQ material covers only the 18–20
   Class D path. The $800 adult course — the most expensive product — has no supporting
   content at all. The requirements page handles this honestly: it states that the steps
   apply to ages 18–20 and routes 21+ visitors to a phone call. That is a stopgap, not a
   solution.

4. **The BMV 5791 link the client supplied was dead.** `publicsafety.ohio.gov/links/
   bmv5791.pdf` returned 404, verified along with four other URL patterns. The BMV's own
   forms page still advertises it, so this is the state's broken link rather than a
   transcription error. The site now uses
   `dam.assets.ohio.gov/image/upload/publicsafety.ohio.gov/bmv5791.pdf` (200, 166 KB,
   current version including the hour log). The original URL is preserved in a comment in
   `src/content/bmv.ts`. `npm run links:check` guards against a repeat.

5. **Possible omission on the affidavit.** Public BMV guidance describes form BMV 5791 as
   **notarised** for applicants under 21. The client's summary says only "completed". His
   wording has not been altered — but a student who arrives un-notarised fails the
   appointment, so this needs confirming.

6. **A bilingual site implies Somali-speaking service.** Building a first-class Somali
   version tells visitors they can be served in Somali. Confirm that instruction and
   phone support genuinely are available in Somali, or the site over-promises. The FAQ
   answer on this is deliberately vague pending confirmation.

7. **Business name never stated** — taken from an email address.

---

## Deliberately out of scope

No payment plans, no discounts, no promo or coupon UI anywhere in the codebase. No stock
photography. No machine translation. No CMS. Nothing copied from the inspiration site
beyond page-level information architecture.
