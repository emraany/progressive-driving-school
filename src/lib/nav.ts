import { copy } from "@/content/copy";

export interface NavItem {
  href: string;
  label: string;
}

/** Locale-less routes, in nav and sitemap order. */
export const ROUTES = ["/", "/courses", "/requirements", "/contact"] as const;

export function navItems(): NavItem[] {
  return [
    { href: "/", label: copy.nav.home },
    { href: "/courses", label: copy.nav.courses },
    { href: "/requirements", label: copy.nav.requirements },
    { href: "/contact", label: copy.nav.contact },
  ];
}

/**
 * Every "Register" control links here, never to the external URL directly, so
 * the destination lives in exactly one place (site.registerUrl) and swapping
 * it is a one-line change.
 */
export const REGISTER_HREF = "/register";
