import Link from "next/link";
import type { Copy } from "@/content/copy/types";
import { hoursRange, localesToBuild, site } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { navItems, registerHref } from "@/lib/nav";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PhoneIcon } from "@/components/ui/icons";
import { LangSwitcher } from "./LangSwitcher";
import { MobileMenu } from "./MobileMenu";
import { Wordmark } from "./Wordmark";

/**
 * The phone number sits in the top bar, which is part of the sticky header, so
 * it is on screen without scrolling on every page at every viewport width -
 * the site's single most important conversion path.
 */
export function Header({ locale, copy }: { locale: Locale; copy: Copy }) {
  const items = navItems(locale, copy);
  const locales = localesToBuild();

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-brand-800 text-brand-100">
        <Container width="wide">
          <div className="flex h-10 items-center justify-between gap-3">
            <a
              href={site.phone.href}
              aria-label={copy.a11y.callAria}
              className="-mx-1 flex items-center gap-2 rounded px-1 py-2 text-sm font-semibold tracking-wide text-white"
            >
              <PhoneIcon className="h-4 w-4" />
              {site.phone.display}
            </a>
            <div className="flex items-center gap-4">
              <span className="hidden text-sm text-brand-200 sm:inline">
                {hoursRange()}
              </span>
              <LangSwitcher
                current={locale}
                label={copy.a11y.languageSwitcher}
                locales={locales}
              />
            </div>
          </div>
        </Container>
      </div>

      <div className="relative border-b border-line bg-surface-raised/95 backdrop-blur supports-[backdrop-filter]:bg-surface-raised/85">
        <Container width="wide">
          <div className="flex h-16 items-center justify-between gap-4">
            <Wordmark locale={locale} />

            <nav
              aria-label={copy.a11y.primaryNav}
              className="hidden lg:flex lg:items-center lg:gap-1"
            >
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded px-3 py-2.5 text-[0.9375rem] font-medium text-ink-700 transition-colors hover:bg-surface-sunken hover:text-ink-900"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <ButtonLink
                href={registerHref(locale)}
                variant="primary"
                size="sm"
                aria-label={copy.a11y.registerAria}
              >
                {copy.actions.register}
              </ButtonLink>
              <MobileMenu
                items={items}
                navLabel={copy.a11y.primaryNav}
                openLabel={copy.a11y.openMenu}
                closeLabel={copy.a11y.closeMenu}
              />
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
