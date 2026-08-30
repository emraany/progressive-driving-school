import Image from "next/image";
import { media, type MediaSlot } from "@/content/media";

/**
 * An image slot.
 *
 * Photography arrives later. Until then this renders a neutral placeholder at
 * exactly the aspect ratio the real photo will occupy, so the page is laid out
 * identically before and after - no reflow when images land, and no layout
 * shift for visitors.
 *
 * To fill a slot: drop the file into public/images/ and set `src` in
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
  /** From copy.media[slot] - translated. */
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,var(--color-brand-100),transparent_62%)] opacity-70" />
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
