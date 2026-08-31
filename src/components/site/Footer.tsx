import Link from "next/link";
import { bmv, bmvPlaceholders, type BmvLinkKey } from "@/content/bmv";
import { copy } from "@/content/copy";
import { formatAddress, officeHours, mapsUrl, site } from "@/content/site";
import { interpolate } from "@/lib/format";
import { navItems } from "@/lib/nav";
import { Container } from "@/components/ui/Container";
import { ExternalLink } from "@/components/ui/ExternalLink";

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 font-sans text-xs font-semibold tracking-[0.14em] text-brand-200 uppercase">
      {children}
    </h2>
  );
}

export function Footer() {
  const items = navItems();
  const linkKeys = Object.keys(bmv.links) as BmvLinkKey[];

  return (
    <footer className="bg-brand-900 text-brand-100">
      <Container width="wide">
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-1">
            <p className="font-display text-lg font-semibold text-white">
              {site.name}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-brand-200">
              {copy.footer.tagline}
            </p>
            <p className="mt-3 text-sm font-medium text-white">
              {copy.common.languagesNote}
            </p>
            <a
              href={site.phone.href}
              aria-label={copy.a11y.callAria}
              className="mt-5 inline-block font-display text-2xl font-semibold text-white"
            >
              {site.phone.display}
            </a>
          </div>

          <div>
            <ColumnHeading>{copy.footer.navHeading}</ColumnHeading>
            <ul className="space-y-2.5 text-sm">
              {items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <div>
              <ColumnHeading>{copy.footer.contactHeading}</ColumnHeading>
              <address className="space-y-2 text-sm leading-relaxed not-italic">
                <p>
                  <a href={`mailto:${site.email}`} className="break-all hover:text-white">
                    {site.email}
                  </a>
                </p>
                <p className="text-brand-200">{formatAddress()}</p>
                <p>
                  <ExternalLink
                    href={mapsUrl()}
                    newTabLabel={copy.a11y.opensInNewTab}
                    className="text-white decoration-brand-400"
                  >
                    {copy.contactPage.directionsLink}
                  </ExternalLink>
                </p>
              </address>
            </div>

            <div>
              <ColumnHeading>{copy.footer.hoursHeading}</ColumnHeading>
              <p className="text-sm font-medium text-white">
                {copy.hours.officeHeading}
              </p>
              <p className="text-sm text-brand-200">{officeHours()}</p>
              <p className="mt-3 text-sm font-medium text-white">
                {copy.hours.drivesHeading}
              </p>
              {site.hours.drives.map((block) => (
                <p key={block.days} className="text-sm text-brand-200">
                  {block.days}: {block.slots.join(", ")}
                </p>
              ))}
            </div>

            <div>
              <ColumnHeading>{copy.footer.serviceAreaHeading}</ColumnHeading>
              <p className="text-sm text-brand-200">
                {site.serviceArea.join(" · ")}
              </p>
            </div>
          </div>

          <div>
            <ColumnHeading>{copy.footer.officialLinksHeading}</ColumnHeading>
            <ul className="space-y-3 text-sm">
              {linkKeys.map((key) => (
                <li key={key}>
                  <ExternalLink
                    href={bmv.links[key]}
                    newTabLabel={copy.a11y.opensInNewTab}
                    className="decoration-brand-500 hover:text-white"
                  >
                    {interpolate(
                      copy.requirementsPage.linkLabels[key],
                      bmvPlaceholders(),
                    )}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-7 text-xs leading-relaxed text-brand-300">
          <p className="max-w-3xl">{copy.footer.disclaimer}</p>
          <p className="mt-3">
            {interpolate(copy.footer.rights, {
              year: new Date().getFullYear(),
              name: site.legalName,
            })}
          </p>
        </div>
      </Container>
    </footer>
  );
}
