/**
 * ============================================================================
 * BUSINESS FACTS — edit this file to change contact details, hours, the
 * registration link, or the logo.
 * ============================================================================
 */

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
  /** Languages the school can serve students in. */
  languages: string[];
  /** Where the Register button sends people. Every Register control on the
   *  site routes through /register, which reads this one value. */
  registerUrl: string | null;
  /** Canonical origin, no trailing slash. Update when a real domain exists. */
  url: string;
  social: { google: string | null; facebook: string | null };
  /** Logo mark shown in the header, and the full lockup for sharing cards. */
  logo: {
    mark: string;
    markWidth: number;
    markHeight: number;
    full: string;
    fullWidth: number;
    fullHeight: number;
  };
}

export const site: SiteConfig = {
  // Confirmed by the logo artwork: "PROGRESSIVE DRIVING SCHOOL LLC, COLUMBUS, OH".
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

  languages: ["English", "Somali"],

  registerUrl: "https://form.jotform.com/262005642367050",

  // TODO: replace with the real domain once one is purchased.
  url: "https://progressive-driving-school.vercel.app",

  social: {
    google: null,
    facebook: null,
  },

  logo: {
    mark: "/logo/logo-mark.png",
    markWidth: 357,
    markHeight: 240,
    full: "/logo/logo-full.png",
    fullWidth: 727,
    fullHeight: 600,
  },
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
  return `${site.hours.open} – ${site.hours.close}`;
}
