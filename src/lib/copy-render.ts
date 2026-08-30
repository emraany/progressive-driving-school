import { bmvPlaceholders } from "@/content/bmv";
import type { Course } from "@/content/courses";
import { interpolate } from "./format";

/**
 * Copy strings carry {placeholders} that are filled from the content data
 * files. Which set of values applies depends on context, and getting it wrong
 * would print a wrong number:
 *
 *   - BMV and FAQ text describes Ohio's requirement -> 24 classroom / 8 drive.
 *   - Course text describes THAT course -> the adult course's {driveHours}
 *     is 12, not 8.
 *
 * Two named helpers instead of one shared one, so the distinction is explicit
 * at every call site.
 */

/** For BMV steps, the test-day checklist, FAQ answers and link labels. */
export function renderBmv(text: string): string {
  return interpolate(text, bmvPlaceholders());
}

/** For a course's name, tagline, audience and "what's included" bullets. */
export function renderCourse(text: string, course: Course): string {
  return interpolate(text, {
    classroomHours: course.classroomHours,
    driveHours: course.driveHours,
    price: course.price,
  });
}
