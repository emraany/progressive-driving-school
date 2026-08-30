/**
 * ============================================================================
 * COURSES & PRICING — the only place prices exist.
 *
 * Prices are exact strings, rendered verbatim. They are deliberately NOT
 * numbers: no currency formatter ever runs on them, so "$600" can never
 * become "$600.00". Course names and descriptions are translated and live in
 * src/content/copy/{en,so}.ts, keyed by the ids below — so changing a price
 * here updates English and Somali at the same time.
 * ============================================================================
 */

export const COURSE_IDS = ["online24plus8", "drive8", "adult12"] as const;

export type CourseId = (typeof COURSE_IDS)[number];

export interface Course {
  id: CourseId;
  /** Exact price string. Rendered as-is. Do not round or reformat. */
  price: string;
  /** Hours of classroom/online instruction. 0 = no classroom component. */
  classroomHours: number;
  /** Hours of behind-the-wheel instruction. */
  driveHours: number;
  /**
   * Minimum age, or null where the client has not confirmed one. The UI shows
   * "contact us to confirm eligibility" for null rather than inventing a number.
   */
  minAge: number | null;
  /** True where this course meets the Ohio Class D requirement for ages 18-20. */
  satisfiesClassD: boolean;
}

export const courses: readonly Course[] = [
  {
    id: "online24plus8",
    price: "$600",
    classroomHours: 24,
    driveHours: 8,
    // TODO(client): minimum age not confirmed.
    minAge: null,
    satisfiesClassD: true,
  },
  {
    id: "drive8",
    price: "$550",
    classroomHours: 0,
    driveHours: 8,
    // TODO(client): minimum age not confirmed.
    minAge: null,
    satisfiesClassD: false,
  },
  {
    id: "adult12",
    price: "$800",
    classroomHours: 0,
    driveHours: 12,
    // 21 comes from the client's own course name, "Adult (21 and older)".
    minAge: 21,
    satisfiesClassD: false,
  },
];

export function getCourse(id: CourseId): Course {
  const course = courses.find((c) => c.id === id);
  if (!course) throw new Error(`Unknown course id: ${id}`);
  return course;
}
