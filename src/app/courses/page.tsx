import type { Metadata } from "next";
import { CallButton } from "@/components/site/CallButton";
import { CourseCard } from "@/components/site/CourseCard";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section, SectionHeader } from "@/components/ui/Section";
import { copy } from "@/content/copy";
import { courses } from "@/content/courses";
import { REGISTER_HREF } from "@/lib/nav";
import { buildMetadata } from "@/lib/seo";
import { courseSchema, JsonLd } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  path: "/courses",
  title: copy.coursesPage.title,
  description: copy.coursesPage.description,
});

export default function CoursesPage() {
  const page = copy.coursesPage;

  return (
    <>
      <Section tone="raised" width="wide" className="border-b border-line">
        <SectionHeader heading={page.heading} lede={page.intro} />
      </Section>

      <Section width="wide">
        <div className="grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} detailed />
          ))}
        </div>
      </Section>

      <Section tone="sunken" width="wide">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* The single Register call to action on this page. The form asks
              which course you want, so one button covers all three. */}
          <Card className="p-7 sm:p-9">
            <h2 className="text-(length:--text-h3) font-semibold">
              {page.enrollment.heading}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-700">
              {page.enrollment.body}
            </p>
            <div className="mt-7">
              <ButtonLink href={REGISTER_HREF} variant="primary" size="lg">
                {copy.actions.register}
              </ButtonLink>
            </div>
          </Card>

          <Card className="p-7 sm:p-9">
            <h2 className="text-(length:--text-h3) font-semibold">
              {page.help.heading}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-700">
              {page.help.body}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <CallButton variant="secondary" size="md" showNumber />
              <ButtonLink href="/contact" variant="outline" size="md">
                {copy.actions.contactUs}
              </ButtonLink>
            </div>
          </Card>
        </div>
      </Section>

      <JsonLd data={courseSchema()} />
    </>
  );
}
