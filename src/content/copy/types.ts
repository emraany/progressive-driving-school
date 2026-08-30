/**
 * ============================================================================
 * THE COPY CONTRACT
 *
 * Both src/content/copy/en.ts and so.ts are declared `satisfies Copy`. A key
 * that exists in English but is missing in Somali fails `tsc` — a missing
 * translation can never reach a live page as a blank.
 *
 * Nothing in this file holds a price, phone number, hour count, or URL. Those
 * are facts, they live in ../site.ts, ../courses.ts and ../bmv.ts, and both
 * languages read the same copy of them. Prose here can reference them with
 * {placeholders}.
 * ============================================================================
 */

import type { BmvLinkKey, BmvStepId, TestDayItemId } from "../bmv";
import type { CourseId } from "../courses";
import type { FaqId } from "../faq";
import type { MediaSlot } from "../media";

export interface PageMeta {
  /** <title>. The business name is appended automatically. */
  title: string;
  /** <meta name="description">. Aim for 140-160 characters. */
  description: string;
}

export interface TrustPoint {
  title: string;
  body: string;
}

export interface CourseCopy {
  /** Full course name as shown on the courses page. */
  name: string;
  /** Compact name for cards and the contact form dropdown. */
  shortName: string;
  /** One line under the name. */
  tagline: string;
  /** Who the course is for. */
  audience: string;
  /** "What's included" bullets. Same facts in both languages. */
  includes: string[];
}

export interface FaqEntry {
  q: string;
  a: string;
}

export interface Copy {
  /** Screen-reader and assistive-technology strings. */
  a11y: {
    skipToContent: string;
    primaryNav: string;
    openMenu: string;
    closeMenu: string;
    callAria: string;
    registerAria: string;
    languageSwitcher: string;
    opensInNewTab: string;
  };

  nav: {
    home: string;
    courses: string;
    requirements: string;
    contact: string;
  };

  actions: {
    call: string;
    register: string;
    viewCourses: string;
    viewRequirements: string;
    contactUs: string;
    learnMore: string;
  };

  /** Reused single-purpose strings. */
  common: {
    /** Shown wherever the business has not confirmed a detail. */
    callToConfirm: string;
    priceLabel: string;
    ageLabel: string;
    classroomHoursLabel: string;
    driveHoursLabel: string;
    includesLabel: string;
    hoursUnit: string;
    classDBadge: string;
    onlineBadge: string;
  };

  home: PageMeta & {
    hero: {
      eyebrow: string;
      heading: string;
      subheading: string;
      note: string;
    };
    coursesSection: {
      heading: string;
      intro: string;
    };
    trust: {
      heading: string;
      intro: string;
      points: TrustPoint[];
    };
    requirementsTeaser: {
      heading: string;
      body: string;
    };
    serviceArea: {
      heading: string;
      body: string;
      pickupNote: string;
    };
    finalCta: {
      heading: string;
      body: string;
    };
  };

  coursesPage: PageMeta & {
    heading: string;
    intro: string;
    enrollment: {
      heading: string;
      body: string;
    };
    help: {
      heading: string;
      body: string;
    };
  };

  requirementsPage: PageMeta & {
    heading: string;
    intro: string;
    audienceNote: string;
    adultNote: string;
    stepLabel: string;
    officialLinksHeading: string;
    /** Link labels, keyed identically to the URLs in ../bmv.ts `links`. */
    linkLabels: Record<BmvLinkKey, string>;
    certificateNote: string;
    testDay: {
      heading: string;
      intro: string;
      items: Record<TestDayItemId, string>;
    };
    disclaimer: string;
    /** Uses {date}. */
    lastVerifiedLabel: string;
  };

  contactPage: PageMeta & {
    heading: string;
    intro: string;
    infoHeading: string;
    phoneHeading: string;
    emailHeading: string;
    addressHeading: string;
    hoursHeading: string;
    serviceAreaHeading: string;
    pickupNote: string;
    directionsLink: string;
  };

  courses: Record<CourseId, CourseCopy>;

  bmv: {
    steps: Record<BmvStepId, { title: string; body: string }>;
  };

  faq: {
    heading: string;
    intro: string;
    items: Record<FaqId, FaqEntry>;
  };

  form: {
    heading: string;
    intro: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    languageLabel: string;
    courseLabel: string;
    coursePlaceholder: string;
    courseOther: string;
    messageLabel: string;
    messagePlaceholder: string;
    optionalSuffix: string;
    submit: string;
    submitting: string;
    successHeading: string;
    successBody: string;
    errorHeading: string;
    /** Uses {phone}. A form failure must never cost a lead. */
    errorBody: string;
    privacyNote: string;
    errors: {
      nameRequired: string;
      contactRequired: string;
      emailInvalid: string;
      messageRequired: string;
    };
  };

  footer: {
    tagline: string;
    navHeading: string;
    contactHeading: string;
    hoursHeading: string;
    serviceAreaHeading: string;
    officialLinksHeading: string;
    /** Uses {year} and {name}. */
    rights: string;
    /** Makes clear the school is not the BMV. */
    disclaimer: string;
  };

  /** Alt text for each image slot. Written for the photo that will land there. */
  media: Record<MediaSlot, string>;
}
