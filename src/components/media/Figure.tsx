import Image from "next/image";
import { media, type MediaSlot } from "@/content/media";

/**
 * An image slot.
 *
 * Renders nothing until a real photograph exists. An empty slot used to draw a
 * neutral placeholder block, which reads to a visitor as a broken image rather
 * than as "a photo is coming" - so callers ask hasMedia() and lay out without
 * the image instead.
 *
 * Once `src` is set the aspect ratio is still reserved up front, so the image
 * cannot shift the layout as it loads.
 *
 * To fill a slot: drop the file into public/images/ and set `src` in
 * src/content/media.ts.
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

  if (!entry.src) return null;

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
