import { copy } from "@/content/copy";
import type { Course } from "@/content/courses";
import { renderCourse } from "@/lib/copy-render";
import { Card } from "@/components/ui/Card";
import { CheckIcon } from "@/components/ui/icons";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-surface-sunken px-3 py-1 text-xs font-medium text-ink-700">
      {children}
    </span>
  );
}

/**
 * No Register button here, deliberately. One sits in the sticky header on every
 * page and one in the hero; repeating it on all three cards put six identical
 * buttons on the courses page without telling anyone which course they were
 * signing up for - the form asks that anyway.
 */
export function CourseCard({
  course,
  detailed = false,
}: {
  course: Course;
  detailed?: boolean;
}) {
  const c = copy.courses[course.id];
  const r = (s: string) => renderCourse(s, course);

  return (
    <Card as="article" id={detailed ? course.id : undefined} className="flex flex-col p-6 sm:p-7">
      {/* The badge row is always present, invisible when it does not apply, so
          titles and prices line up across the three cards. */}
      <p
        className={`mb-4 inline-flex w-fit rounded-full px-3 py-1 text-xs leading-snug font-semibold ${
          course.satisfiesClassD
            ? "bg-brand-50 text-brand-700"
            : "invisible select-none"
        }`}
        aria-hidden={course.satisfiesClassD ? undefined : true}
      >
        {course.satisfiesClassD ? copy.common.classDBadge : " "}
      </p>

      <h3 className="text-(length:--text-h3) leading-snug font-semibold">
        {detailed ? r(c.name) : r(c.shortName)}
      </h3>
      <p className="mt-2 min-h-[2.7em] text-sm leading-relaxed text-ink-500">
        {r(c.tagline)}
      </p>

      {/* The price is the exact string from courses.ts, rendered verbatim. */}
      <p className="mt-5 font-display text-4xl font-semibold text-ink-900">
        {course.price}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {course.classroomHours > 0 ? (
          <Chip>
            {copy.common.classroomHoursLabel}: {course.classroomHours}{" "}
            {copy.common.hoursUnit}
          </Chip>
        ) : null}
        <Chip>
          {copy.common.driveHoursLabel}: {course.driveHours} {copy.common.hoursUnit}
        </Chip>
        <Chip>
          {copy.common.ageLabel}:{" "}
          {course.minAge !== null ? `${course.minAge}+` : copy.common.callToConfirm}
        </Chip>
      </div>

      {detailed ? (
        <>
          <p className="mt-5 text-sm leading-relaxed text-ink-700">{r(c.audience)}</p>
          <h4 className="mt-6 mb-3 text-xs font-semibold tracking-[0.13em] text-ink-500 uppercase">
            {copy.common.includesLabel}
          </h4>
          <ul className="space-y-2.5 text-sm leading-relaxed text-ink-700">
            {c.includes.map((item) => (
              <li key={item} className="flex gap-2.5">
                <CheckIcon className="mt-[0.3em] h-3.5 w-3.5 text-brand-600" />
                <span>{r(item)}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="mt-5 text-sm leading-relaxed text-ink-700">{r(c.audience)}</p>
      )}
    </Card>
  );
}
