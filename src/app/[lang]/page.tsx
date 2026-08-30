import type { Metadata } from "next";
import { CallButton } from "@/components/site/CallButton";
import { CourseCard } from "@/components/site/CourseCard";
import { Figure } from "@/components/media/Figure";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";
import { BMV_STEP_IDS } from "@/content/bmv";
import { getCopy } from "@/content/copy";
import { courses } from "@/content/courses";
import { site } from "@/content/site";
import { renderBmv } from "@/lib/copy-render";
import { localePath, type Locale } from "@/lib/i18n";
import { registerHref } from "@/lib/nav";
import { buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const copy = getCopy(lang);
  return buildMetadata({
    locale: lang,
    path: "",
    title: copy.home.title,
    description: copy.home.description,
  });
}

export default async function HomePage({ params }: Params) {
  const { lang } = await params;
  const copy = getCopy(lang);
  const { hero, coursesSection, trust, requirementsTeaser, serviceArea, finalCta } =
    copy.home;

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line bg-surface-raised">
        <Container width="wide">
          <div className="grid items-center gap-10 py-14 sm:py-18 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
            <div>
              <p className="mb-4 text-xs font-semibold tracking-[0.14em] text-brand-600 uppercase">
                {hero.eyebrow}
              </p>
              <h1 className="text-(length:--text-hero) leading-[1.06] font-semibold">
                {hero.heading}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-700 sm:text-lg">
                {hero.subheading}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href={registerHref(lang)} variant="primary" size="lg">
                  {copy.actions.register}
                </ButtonLink>
                <CallButton copy={copy} variant="outline" size="lg" showNumber />
              </div>

              <p className="mt-6 flex items-center gap-2 text-sm text-ink-500">
                <CheckIcon className="h-4 w-4 text-brand-600" />
                {hero.note}
              </p>
            </div>

            <Figure
              slot="heroPrimary"
              alt={copy.media.heroPrimary}
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
          </div>
        </Container>
      </section>

      {/* Courses */}
      <Section id="courses" width="wide">
        <SectionHeader
          heading={coursesSection.heading}
          lede={coursesSection.intro}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} copy={copy} locale={lang} />
          ))}
        </div>
        <p className="mt-8">
          <ButtonLink href={localePath(lang, "courses")} variant="outline" size="md">
            {copy.actions.viewCourses}
            <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
        </p>
      </Section>

      {/* Trust */}
      <Section tone="sunken" width="wide">
        <SectionHeader heading={trust.heading} lede={trust.intro} />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trust.points.map((point) => (
            <Card as="li" key={point.title} className="p-6">
              <h3 className="text-base leading-snug font-semibold">{point.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-500">
                {point.body}
              </p>
            </Card>
          ))}
        </ul>
      </Section>

      {/* Ohio requirements teaser */}
      <Section tone="brand" width="wide">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeader
            inverted
            heading={requirementsTeaser.heading}
            lede={renderBmv(requirementsTeaser.body)}
          />
          <div>
            <ol className="space-y-5">
              {BMV_STEP_IDS.map((id, index) => (
                <li key={id} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/12 font-display text-sm font-semibold text-white"
                  >
                    {index + 1}
                  </span>
                  <p className="pt-1 font-display text-lg leading-snug font-semibold text-white">
                    {renderBmv(copy.bmv.steps[id].title)}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-8">
              <ButtonLink
                href={localePath(lang, "requirements")}
                variant="onDark"
                size="md"
              >
                {copy.actions.viewRequirements}
                <ArrowRightIcon className="h-4 w-4" />
              </ButtonLink>
            </p>
          </div>
        </div>
      </Section>

      {/* Service area + final call to action */}
      <Section width="wide">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader heading={serviceArea.heading} lede={serviceArea.body} />
            <ul className="mt-5 flex flex-wrap gap-2">
              {site.serviceArea.map((area) => (
                <li
                  key={area}
                  className="rounded-full bg-surface-sunken px-3.5 py-1.5 text-sm font-medium text-ink-700"
                >
                  {area}
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-500">
              {serviceArea.pickupNote}
            </p>
          </div>

          <Card className="p-7 sm:p-9">
            <h2 className="text-(length:--text-h3) font-semibold">
              {finalCta.heading}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-700">
              {finalCta.body}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <CallButton copy={copy} variant="secondary" size="lg" showNumber />
              <ButtonLink
                href={localePath(lang, "contact")}
                variant="outline"
                size="lg"
              >
                {copy.actions.contactUs}
              </ButtonLink>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
