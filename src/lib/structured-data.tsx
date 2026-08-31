import { copy } from "@/content/copy";
import { courses, type Course } from "@/content/courses";
import { formatAddress, site } from "@/content/site";

const ORG_ID = `${site.url}/#organization`;

/**
 * The business itself.
 *
 * NOTE: `openingHours` is deliberately absent. The client gave 9 AM - 5 PM but
 * never the days of the week, and publishing a guess in structured data is
 * worse than publishing nothing - search engines surface it as fact. Add it
 * here once `site.hours.days` is confirmed.
 */
export function organizationSchema() {
  const a = site.address;
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EducationalOrganization"],
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}${site.logo.full}`,
    image: `${site.url}${site.logo.full}`,
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
    // Somali-speaking service is a genuine differentiator for this business,
    // so it is declared to search engines as well as stated on the page.
    knowsLanguage: site.languages,
  };
}

/**
 * Strips the currency symbol for machine consumption only. The visible price
 * is always the exact string from courses.ts, never this.
 */
function numericPrice(course: Course): string {
  return course.price.replace(/[^0-9.]/g, "");
}

export function courseSchema() {
  return courses.map((course) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: copy.courses[course.id].name,
    description: copy.courses[course.id].tagline,
    url: `${site.url}/courses#${course.id}`,
    provider: { "@id": ORG_ID },
    inLanguage: "en",
    offers: {
      "@type": "Offer",
      price: numericPrice(course),
      priceCurrency: "USD",
      category: "Paid",
      availability: "https://schema.org/InStock",
    },
  }));
}

export function faqSchema(render: (s: string) => string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: Object.values(copy.faq.items).map((item) => ({
      "@type": "Question",
      name: render(item.q),
      acceptedAnswer: { "@type": "Answer", text: render(item.a) },
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
