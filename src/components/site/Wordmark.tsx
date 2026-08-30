import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { localePath, type Locale } from "@/lib/i18n";

/**
 * Falls back to a typeset wordmark until a logo file exists. Set
 * `site.logo.src` and the real mark takes over - no layout change.
 */
export function Wordmark({ locale }: { locale: Locale }) {
  return (
    <Link
      href={localePath(locale)}
      className="flex shrink-0 items-center gap-2.5 py-2"
    >
      {site.logo.src ? (
        <Image
          src={site.logo.src}
          alt={site.name}
          width={site.logo.width}
          height={site.logo.height}
          priority
          className="h-9 w-auto sm:h-10"
        />
      ) : (
        <>
          <span
            aria-hidden="true"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-brand-700 font-display text-lg font-semibold text-white sm:h-10 sm:w-10"
          >
            P
          </span>
          <span className="font-display text-[0.98rem] leading-[1.15] font-semibold text-ink-900 sm:text-lg">
            Progressive
            <span className="block text-[0.7rem] font-sans font-medium tracking-[0.11em] text-ink-500 uppercase sm:text-[0.72rem]">
              Driving School
            </span>
          </span>
        </>
      )}
    </Link>
  );
}
