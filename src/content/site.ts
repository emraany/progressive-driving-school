/**
 * ============================================================================
 * BUSINESS FACTS — edit this file to change contact details, hours, or the
 * registration link. Nothing here is translated: these values are shown
 * identically in English and Somali, so one edit updates both.
 * ============================================================================
 */

import { LOCALES, type Locale } from "@/lib/i18n";

export interface SiteConfig {
  /** Short name — header, headings, page titles. */
  name: string;
  /** Full legal name — footer, copyright, structured data. */
  legalName: string;
  phone: { display: string; href: string };
  email: string;
  address: {
    street: string;
    unit: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  hours: {
    open: string;
    close: string;
    /** null = days of the week not yet confirmed by the client. */
    days: string | null;
  };
  serviceArea: string[];
  /** null = not yet supplied. Every "Register" button routes through
   *  /{lang}/register, which falls back to the contact page while this is null.
   *  Filling this in is the only change needed to make registration live. */
  registerUrl: string | null;
  /** Locales visible to the public. Add "so" once src/content/copy/so.ts is
   *  translated — that single edit publishes the Somali site. */
  publishedLocales: Locale[];
  /** Canonical origin, no trailing slash. Update when a real domain exists. */
  url: string;
  social: { google: string | null; facebook: string | null };
  /** Logo file under /public. null = falls back to a typeset wordmark. */
  logo: { src: string | null; width: number; height: number };
}

export const site: SiteConfig = {
  // TODO(client): confirm exact legal name — this was inferred from the
  // business email address, never stated directly.
  name: "Progressive Driving School",
  legalName: "Progressive Driving School LLC",

  phone: {
    display: "614-734-4272",
    href: "tel:+16147344272",
  },

  email: "progressivedrivingschoolllc@gmail.com",

  address: {
    street: "2600 Oakstone Dr",
    unit: "Suite 28",
    city: "Columbus",
    state: "OH",
    zip: "43231",
    country: "US",
  },

  hours: {
    open: "9:00 AM",
    close: "5:00 PM",
    // TODO(client): days of the week were never given. Until this is filled in,
    // the site says "call to confirm" and structured data omits openingHours
    // entirely rather than publishing a guess.
    days: null,
  },

  serviceArea: ["Franklin County", "Columbus, Ohio"],

  // TODO(client): registration destination URL.
  registerUrl: null,

  publishedLocales: ["en", "so"],

  // TODO: replace with the real domain once one is purchased.
  url: "https://progressive-driving-school.vercel.app",

  social: {
    google: null,
    facebook: null,
  },

  // TODO(client): logo pending. Drop an SVG into public/logo/ and set `src`
  // (e.g. "/logo/logo.svg") with its intrinsic dimensions. The header swaps
  // from the typeset wordmark to the real mark with no other change.
  logo: { src: null, width: 200, height: 48 },
};

/** "2600 Oakstone Dr, Suite 28, Columbus, OH 43231" */
export function formatAddress(): string {
  const a = site.address;
  return `${a.street}, ${a.unit}, ${a.city}, ${a.state} ${a.zip}`;
}

export function mapsUrl(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${site.legalName}, ${formatAddress()}`,
  )}`;
}

/** "9:00 AM - 5:00 PM". Days are appended separately, only when confirmed. */
export function hoursRange(): string {
  return `${site.hours.open} \u2013 ${site.hours.close}`;
}

export function isLocalePublished(locale: Locale): boolean {
  return site.publishedLocales.includes(locale);
}

/**
 * Which locales get built as pages.
 *
 * Production builds only what is published, so an untranslated Somali site can
 * never be reached or indexed. Development always builds every locale so the
 * Somali layout can be previewed while it is being translated, and
 * PREVIEW_ALL_LOCALES=1 does the same on a Vercel preview deployment.
 */
export function localesToBuild(): Locale[] {
  if (process.env.NODE_ENV === "development") return [...LOCALES];
  if (process.env.PREVIEW_ALL_LOCALES === "1") return [...LOCALES];
  return site.publishedLocales;
}
