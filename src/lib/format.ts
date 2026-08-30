/**
 * Replace {placeholders} in a copy string with real values.
 *
 * Copy files hold prose; numbers that can change (BMV hour requirements,
 * course hours) live in the content data files and are injected here. That
 * keeps a rule change a one-line edit in one file instead of a hunt through
 * two languages of prose.
 */
export function interpolate(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

/** "2026-08-30" -> "August 30, 2026" (always rendered in en-US). */
export function formatVerifiedDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
