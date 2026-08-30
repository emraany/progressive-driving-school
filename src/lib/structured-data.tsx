import { courses, type Course } from "@/content/courses";
import type { Copy } from "@/content/copy/types";
import { formatAddress, site } from "@/content/site";
import { localePath, type Locale } from "./i18n";

const ORG_ID = `${site.url}/#organization`;

/**
 * The business itself.
 *
 * NOTE: `openingHours` is deliberately absent. The client gave 9 AM - 5 PM but
 * never the days of the week, and publishing a guess in structured data is
 * worse than publishing nothing - search engines surface it as fact. Add it
 * here once `site.hours.days` is confirmed.
 */
export function organizationSchema(locale: Locale) {
  const a = site.address;
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EducationalOrganization"],
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: `${site.url}${localePath(locale)}`,
    telephone: site.phone.display,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${a.street}, ${a.unit}`,
      addressLocality: a.city,
      addressRegion: a.state,
      postalCode: a.zip,
      addressCountry: a.country,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Franklin County, Ohio" },
      { "@type": "City", name: "Columbus, Ohio" },
    ],
    description: formatAddress(),
    knowsLanguage: site.publishedLocales,
  };
}

/**
 * Strips the currency symbol for machine consumption only. The visible price
 * is always the exact string from courses.ts, never this.
 */
function numericPrice(course: Course): string {
  return course.price.replace(/[^0-9.]/g, "");
}

export function courseSchema(locale: Locale, copy: Copy) {
  return courses.map((course) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: copy.courses[course.id].name,
    description: copy.courses[course.id].tagline,
    url: `${site.url}${localePath(locale, "courses")}#${course.id}`,
    provider: { "@id": ORG_ID },
    inLanguage: locale,
    offers: {
      "@type": "Offer",
      price: numericPrice(course),
      priceCurrency: "USD",
      category: "Paid",
      availability: "https://schema.org/InStock",
    },
  }));
}

export function faqSchema(copy: Copy, interpolated: (s: string) => string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: Object.values(copy.faq.items).map((item) => ({
      "@type": "Question",
      name: interpolated(item.q),
      acceptedAnswer: { "@type": "Answer", text: interpolated(item.a) },
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Data is authored in this repo, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
