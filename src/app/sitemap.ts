import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { LOCALE_TAGS, localePath } from "@/lib/i18n";

/** Locale-less routes. /register is excluded: it is a redirect, not a page. */
const ROUTES = ["", "courses", "requirements", "contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of ROUTES) {
    for (const locale of site.publishedLocales) {
      const languages: Record<string, string> = {};
      for (const alt of site.publishedLocales) {
        languages[LOCALE_TAGS[alt]] = `${site.url}${localePath(alt, route)}`;
      }

      entries.push({
        url: `${site.url}${localePath(locale, route)}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "monthly" : "yearly",
        priority: route === "" ? 1 : route === "courses" ? 0.9 : 0.8,
        alternates: { languages },
      });
    }
  }

  return entries;
}
