import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ClockIcon, MailIcon, MapIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";
import { getCopy } from "@/content/copy";
import { courses } from "@/content/courses";
import { formatAddress, hoursRange, mapsUrl, site } from "@/content/site";
import { renderCourse } from "@/lib/copy-render";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const copy = getCopy(lang);
  return buildMetadata({
    locale: lang,
    path: "contact",
    title: copy.contactPage.title,
    description: copy.contactPage.description,
  });
}

function InfoRow({
  icon,
  heading,
  children,
}: {
  icon: React.ReactNode;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="mt-0.5 text-brand-600">{icon}</span>
      <div className="min-w-0">
        <h3 className="font-sans text-xs font-semibold tracking-[0.13em] text-ink-500 uppercase">
          {heading}
        </h3>
        <div className="mt-1.5 text-base leading-relaxed text-ink-900">{children}</div>
      </div>
    </div>
  );
}

export default async function ContactPage({ params }: Params) {
  const { lang } = await params;
  const copy = getCopy(lang);
  const page = copy.contactPage;

  const courseOptions = courses.map((course) => ({
    value: course.id,
    label: `${renderCourse(copy.courses[course.id].shortName, course)} — ${course.price}`,
  }));

  // Every language is offered here, not just the published ones: a Somali
  // speaker reading the English site should still be able to ask for Somali.
  const languageOptions = LOCALES.map((locale) => ({
    value: locale,
    label: LOCALE_LABELS[locale],
  }));

  return (
    <>
      <Section tone="raised" width="wide" className="border-b border-line">
        <SectionHeader heading={page.heading} lede={page.intro} />
      </Section>

      <Container width="wide">
        <div className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <h2 className="text-(length:--text-h3) font-semibold">
              {page.infoHeading}
            </h2>

            <div className="mt-7 space-y-7">
              <InfoRow icon={<PhoneIcon />} heading={page.phoneHeading}>
                <a
                  href={site.phone.href}
                  aria-label={copy.a11y.callAria}
                  className="font-display text-2xl font-semibold text-ink-900"
                >
                  {site.phone.display}
                </a>
              </InfoRow>

              <InfoRow icon={<MailIcon />} heading={page.emailHeading}>
                <a href={`mailto:${site.email}`} className="break-all underline decoration-brand-300 underline-offset-4">
                  {site.email}
                </a>
              </InfoRow>

              <InfoRow icon={<PinIcon />} heading={page.addressHeading}>
                <address className="not-italic">{formatAddress()}</address>
                <p className="mt-2 text-sm">
                  <ExternalLink
                    href={mapsUrl()}
                    newTabLabel={copy.a11y.opensInNewTab}
                    className="font-medium text-brand-700"
                  >
                    {page.directionsLink}
                  </ExternalLink>
                </p>
              </InfoRow>

              <InfoRow icon={<ClockIcon />} heading={page.hoursHeading}>
                <p>{hoursRange()}</p>
                {/* Days of the week are unconfirmed - say so, don't guess. */}
                {site.hours.days ? (
                  <p>{site.hours.days}</p>
                ) : (
                  <p className="mt-1 text-sm text-ink-500">
                    {copy.common.callToConfirm}
                  </p>
                )}
              </InfoRow>

              <InfoRow icon={<MapIcon />} heading={page.serviceAreaHeading}>
                <p>{site.serviceArea.join(" · ")}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {page.pickupNote}
                </p>
              </InfoRow>
            </div>
          </div>

          <Card id="enroll" className="p-7 sm:p-9">
            <h2 className="text-(length:--text-h3) font-semibold">
              {copy.form.heading}
            </h2>
            <p className="mt-2.5 mb-8 text-base leading-relaxed text-ink-500">
              {copy.form.intro}
            </p>
            <ContactForm
              copy={copy}
              locale={lang}
              courseOptions={courseOptions}
              languageOptions={languageOptions}
            />
          </Card>
        </div>
      </Container>
    </>
  );
}
