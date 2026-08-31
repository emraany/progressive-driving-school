import Image from "next/image";
import { media, type MediaSlot } from "@/content/media";
import { site } from "@/content/site";

/**
 * An image slot.
 *
 * Until a photograph exists the slot renders a neutral branded panel: a soft
 * tint drawn from the logo palette with the mark watermarked faintly in the
 * middle. That reads as deliberate page furniture rather than a broken image,
 * which a plain empty box did.
 *
 * The panel occupies exactly the aspect ratio the real photo will, so dropping
 * a file in causes no reflow and no layout shift.
 *
 * To fill a slot: put the file in public/images/ and set `src` in
 * src/content/media.ts. Nothing here changes.
 */
export function Figure({
  slot,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  rounded = true,
}: {
  slot: MediaSlot;
  /** From copy.media[slot]. */
  alt: string;
  className?: string;
  sizes?: string;
  rounded?: boolean;
}) {
  const entry = media[slot];
  const shape = `${rounded ? "rounded-(--radius-card)" : ""} overflow-hidden`;

  if (!entry.src) {
    return (
      <div
        aria-hidden="true"
        style={{ aspectRatio: entry.aspect }}
        className={`${shape} relative w-full border border-line bg-surface-sunken ${className}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(115%_85%_at_22%_12%,var(--color-brand-50),transparent_72%)]" />
        <Image
          src={site.logo.mark}
          alt=""
          width={site.logo.markWidth}
          height={site.logo.markHeight}
          className="absolute top-1/2 left-1/2 w-[34%] -translate-x-1/2 -translate-y-1/2 opacity-[0.14] grayscale"
        />
      </div>
    );
  }

  return (
    <div
      style={{ aspectRatio: entry.aspect }}
      className={`${shape} relative w-full bg-surface-sunken ${className}`}
    >
      <Image
        src={entry.src}
        alt={alt}
        fill
        sizes={sizes}
        priority={entry.priority}
        className="object-cover"
      />
    </div>
  );
}
