import type { Metadata } from "next";
import { site } from "@/content/site";
import { DEFAULT_LOCALE, LOCALE_TAGS, localePath, type Locale } from "./i18n";

/**
 * Metadata for one page in one locale.
 *
 * hreflang alternates list only PUBLISHED locales, so an unfinished Somali
 * site is never advertised to search engines. Adding "so" to
 * site.publishedLocales starts advertising it everywhere at once.
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  noIndex = false,
}: {
  locale: Locale;
  /** Locale-less route: "" for home, "courses", "contact", ... */
  path: string;
  title: string;
  description: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${site.url}${localePath(locale, path)}`;

  const languages: Record<string, string> = {};
  for (const l of site.publishedLocales) {
    languages[LOCALE_TAGS[l]] = `${site.url}${localePath(l, path)}`;
  }
  languages["x-default"] = `${site.url}${localePath(DEFAULT_LOCALE, path)}`;

  return {
    title,
    description,
    alternates: { canonical: url, languages },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      siteName: site.name,
      title: `${title} | ${site.name}`,
      description,
      url,
      locale: LOCALE_TAGS[locale],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
