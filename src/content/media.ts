/**
 * ============================================================================
 * IMAGE SLOTS
 *
 * Photography arrives later (stills pulled from the client's video of the cars
 * and classroom). Each slot declares its final aspect ratio NOW, so <Figure>
 * reserves exactly the right space and the layout is pixel-identical before
 * and after real images land — no reflow, no layout shift, no restructuring.
 *
 * To add a photo: drop the file in public/images/ and set `src` below.
 * Alt text is translated and lives in the copy files under `media`.
 * ============================================================================
 */

export const MEDIA_SLOTS = [
  "heroPrimary",
  "coursesBanner",
  "trustPortrait",
  "requirementsBanner",
  "contactExterior",
] as const;

export type MediaSlot = (typeof MEDIA_SLOTS)[number];

export interface MediaEntry {
  /** Path under /public, e.g. "/images/hero.jpg". null = not yet supplied. */
  src: string | null;
  /** CSS aspect-ratio value. Reserved whether or not `src` is set. */
  aspect: string;
  /** Intrinsic size of the real file, needed by next/image. */
  width: number;
  height: number;
  /** Render at higher priority (above the fold). */
  priority?: boolean;
}

export const media: Record<MediaSlot, MediaEntry> = {
  heroPrimary: { src: "/images/road-ahead.svg", aspect: "4 / 3", width: 1600, height: 1200, priority: true },
  coursesBanner: { src: null, aspect: "16 / 9", width: 1920, height: 1080 },
  trustPortrait: { src: null, aspect: "3 / 4", width: 1200, height: 1600 },
  requirementsBanner: { src: "/images/road-overhead.svg", aspect: "16 / 9", width: 1920, height: 1080 },
  contactExterior: { src: null, aspect: "3 / 2", width: 1800, height: 1200 },
};
