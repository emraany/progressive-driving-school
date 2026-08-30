import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { site } from "@/content/site";
import { DEFAULT_LOCALE, localePath } from "@/lib/i18n";

/** Deliberately English-only: an unmatched URL has no reliable locale. */
export default function NotFound() {
  return (
    <Section width="narrow" className="text-center">
      <h1 className="text-(length:--text-h1) font-semibold">Page not found</h1>
      <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink-500">
        That page doesn&apos;t exist. Try the home page, or call us on{" "}
        <a href={site.phone.href} className="font-semibold text-brand-700">
          {site.phone.display}
        </a>
        .
      </p>
      <p className="mt-8">
        <Link
          href={localePath(DEFAULT_LOCALE)}
          className="font-semibold text-brand-700 underline underline-offset-4"
        >
          Go to the home page
        </Link>
      </p>
    </Section>
  );
}
