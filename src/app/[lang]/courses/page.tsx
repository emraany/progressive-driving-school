import type { Metadata } from "next";
import { CallButton } from "@/components/site/CallButton";
import { CourseCard } from "@/components/site/CourseCard";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section, SectionHeader } from "@/components/ui/Section";
import { getCopy } from "@/content/copy";
import { courses } from "@/content/courses";
import { localePath, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { courseSchema, JsonLd } from "@/lib/structured-data";

type Params = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const copy = getCopy(lang);
  return buildMetadata({
    locale: lang,
    path: "courses",
    title: copy.coursesPage.title,
    description: copy.coursesPage.description,
  });
}

export default async function CoursesPage({ params }: Params) {
  const { lang } = await params;
  const copy = getCopy(lang);
  const page = copy.coursesPage;

  return (
    <>
      <Section tone="raised" width="wide" className="border-b border-line">
        <SectionHeader heading={page.heading} lede={page.intro} />
      </Section>

      <Section width="wide">
        <div className="grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              copy={copy}
              locale={lang}
              detailed
            />
          ))}
        </div>
      </Section>

      <Section tone="sunken" width="wide">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-7 sm:p-9">
            <h2 className="text-(length:--text-h3) font-semibold">
              {page.enrollment.heading}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-700">
              {page.enrollment.body}
            </p>
          </Card>

          <Card className="p-7 sm:p-9">
            <h2 className="text-(length:--text-h3) font-semibold">
              {page.help.heading}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-700">
              {page.help.body}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <CallButton copy={copy} variant="secondary" size="md" showNumber />
              <ButtonLink
                href={localePath(lang, "contact")}
                variant="outline"
                size="md"
              >
                {copy.actions.contactUs}
              </ButtonLink>
            </div>
          </Card>
        </div>
      </Section>

      <JsonLd data={courseSchema(lang, copy)} />
    </>
  );
}
