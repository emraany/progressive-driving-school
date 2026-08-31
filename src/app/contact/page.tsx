import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ClockIcon, MailIcon, MapIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";
import { copy } from "@/content/copy";
import { courses } from "@/content/courses";
import { formatAddress, officeHours, mapsUrl, site } from "@/content/site";
import { renderCourse } from "@/lib/copy-render";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/contact",
  title: copy.contactPage.title,
  description: copy.contactPage.description,
});

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

export default function ContactPage() {
  const page = copy.contactPage;

  const courseOptions = courses.map((course) => ({
    value: course.id,
    label: `${renderCourse(copy.courses[course.id].shortName, course)} — ${course.price}`,
  }));

  const languageOptions = site.languages.map((language) => ({
    value: language.toLowerCase(),
    label: language,
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
                <p className="mt-1.5 text-sm font-medium text-brand-700">
                  {copy.common.languagesNote}
                </p>
              </InfoRow>

              <InfoRow icon={<MailIcon />} heading={page.emailHeading}>
                <a
                  href={`mailto:${site.email}`}
                  className="break-all underline decoration-brand-300 underline-offset-4"
                >
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
                <p className="text-sm font-semibold text-ink-900">
                  {copy.hours.officeHeading}
                </p>
                <p className="text-base">{officeHours()}</p>

                {/* Lessons run outside office hours - evenings and weekends -
                    which is the whole reason these are listed separately. */}
                <p className="mt-4 text-sm font-semibold text-ink-900">
                  {copy.hours.drivesHeading}
                </p>
                <dl className="mt-1 space-y-2">
                  {site.hours.drives.map((block) => (
                    <div key={block.days} className="sm:flex sm:gap-3">
                      <dt className="text-base font-medium whitespace-nowrap">
                        {block.days}
                      </dt>
                      <dd className="text-base text-ink-700">
                        {block.slots.join(" · ")}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">
                  {copy.hours.drivesNote}
                </p>
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
              courseOptions={courseOptions}
              languageOptions={languageOptions}
            />
          </Card>
        </div>
      </Container>
    </>
  );
}
