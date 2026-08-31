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
    /** When someone can ring the office and get an answer. */
    office: {
      days: string;
      /** For structured data. schema.org day names. */
      daysOfWeek: string[];
      display: string;
      /** 24-hour, for structured data. */
      opens: string;
      closes: string;
    };
    /** When behind-the-wheel lessons actually run. Different from the office,
     *  and the reason lessons can be booked in the evening and at weekends. */
    drives: { days: string; slots: string[] }[];
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
    office: {
      days: "Monday – Friday",
      daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      display: "9:00 AM – 3:00 PM",
      opens: "09:00",
      closes: "15:00",
    },
    drives: [
      {
        days: "Monday – Thursday",
        slots: [
          "9:00 – 11:00 AM",
          "11:30 AM – 1:30 PM",
          "2:00 – 4:00 PM",
          "6:00 – 8:00 PM",
        ],
      },
      {
        days: "Friday",
        slots: ["2:15 – 4:15 PM"],
      },
      {
        days: "Saturday – Sunday",
        slots: ["11:30 AM – 1:30 PM", "2:00 – 4:00 PM", "6:00 – 8:00 PM"],
      },
    ],
  },

  serviceArea: ["Franklin County", "Columbus, Ohio"],

  languages: ["English", "Somali"],

  registerUrl: "https://form.jotform.com/262005642367050",

  url: "https://www.progressivedrivingschoolohio.com",

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

/** "Monday – Friday, 9:00 AM – 3:00 PM" */
export function officeHours(): string {
  return `${site.hours.office.days}, ${site.hours.office.display}`;
}

/** "Mon – Fri, 9:00 AM – 3:00 PM" - the compact form for the header bar. */
export function officeHoursShort(): string {
  return `${site.hours.office.days.replace(/(\w{3})\w*/g, "$1")}, ${site.hours.office.display}`;
}
