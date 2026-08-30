"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_LABELS, swapLocaleInPath, type Locale } from "@/lib/i18n";

/**
 * Renders nothing unless more than one locale is actually reachable, so the
 * site never offers a language that would 404.
 *
 * `locales` comes from localesToBuild(), not from publishedLocales: in
 * development and on a PREVIEW_ALL_LOCALES deploy every locale is built, so
 * the switcher must appear there too or the Somali pages are unreachable
 * except by typing the URL. In production the two lists are the same.
 *
 * Switching preserves the current page rather than dumping the visitor on the
 * home page.
 */
export function LangSwitcher({
  current,
  label,
  locales,
}: {
  current: Locale;
  label: string;
  locales: Locale[];
}) {
  const pathname = usePathname();

  if (locales.length < 2) return null;

  return (
    <nav aria-label={label} className="flex items-center gap-1">
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={swapLocaleInPath(pathname, locale)}
            hrefLang={locale}
            aria-current={active ? "true" : undefined}
            className={`rounded px-2 py-2 text-sm font-medium transition-colors ${
              active
                ? "text-white underline decoration-2 underline-offset-4"
                : "text-brand-200 hover:text-white"
            }`}
          >
            {LOCALE_LABELS[locale]}
          </Link>
        );
      })}
    </nav>
  );
}
