import type { Copy } from "@/content/copy/types";
import { localePath, type Locale } from "./i18n";

export interface NavItem {
  href: string;
  label: string;
}

export function navItems(locale: Locale, copy: Copy): NavItem[] {
  return [
    { href: localePath(locale), label: copy.nav.home },
    { href: localePath(locale, "courses"), label: copy.nav.courses },
    { href: localePath(locale, "requirements"), label: copy.nav.requirements },
    { href: localePath(locale, "contact"), label: copy.nav.contact },
  ];
}

/**
 * Every "Register" control in the site points here, never at an external URL
 * directly. The real destination lives in one place (site.registerUrl) and is
 * resolved by the /register route, so swapping it in is a one-line edit.
 */
export function registerHref(locale: Locale): string {
  return localePath(locale, "register");
}
