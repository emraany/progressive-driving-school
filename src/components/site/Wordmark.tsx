import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

/**
 * The logo mark plus a typeset wordmark.
 *
 * The supplied logo is a stacked lockup whose own "PROGRESSIVE DRIVING SCHOOL
 * LLC / COLUMBUS, OH" type would be about four pixels tall in a 64px header.
 * So the emblem is used as the mark and the name is set in live text beside
 * it: legible at every size, selectable, and translatable.
 */
export function Wordmark() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2.5 py-2">
      <Image
        src={site.logo.mark}
        alt=""
        aria-hidden="true"
        width={site.logo.markWidth}
        height={site.logo.markHeight}
        priority
        className="h-9 w-auto sm:h-10"
      />
      {/* On the narrowest phones (320px) the mark stands alone: the typeset
          name plus the Register button and menu toggle will not fit together.
          The accessible name below is always present. */}
      <span className="hidden font-display text-[0.98rem] leading-[1.15] font-semibold text-ink-900 min-[360px]:block sm:text-lg">
        Progressive
        <span className="block font-sans text-[0.7rem] font-medium tracking-[0.11em] text-ink-500 uppercase sm:text-[0.72rem]">
          Driving School
        </span>
      </span>
      <span className="sr-only">{site.name} — home</span>
    </Link>
  );
}
