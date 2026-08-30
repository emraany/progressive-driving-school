/**
 * Locale primitives. This module imports nothing, so it is safe to use from
 * anywhere (including content files) without circular-import risk.
 *
 * Which locales are actually PUBLISHED is a separate, editable decision — see
 * `publishedLocales` in src/content/site.ts.
 */

export const LOCALES = ["en", "so"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Endonyms — a language is always named in its own language. */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  so: "Soomaali",
};

/** BCP-47 tags for <html lang> and hreflang. */
export const LOCALE_TAGS: Record<Locale, string> = {
  en: "en-US",
  so: "so",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Build a locale-prefixed path. `path` is the locale-less route
 * ("" for home, "courses", "contact", ...).
 */
export function localePath(locale: Locale, path = ""): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `/${locale}/${clean}` : `/${locale}`;
}

/**
 * Given a full pathname like "/en/courses", swap the locale segment.
 * Used by the language switcher so a visitor stays on the same page.
 */
export function swapLocaleInPath(pathname: string, next: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = next;
    return `/${segments.join("/")}`;
  }
  return localePath(next, pathname);
}
