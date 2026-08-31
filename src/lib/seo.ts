import type { Metadata } from "next";
import { site } from "@/content/site";

export function buildMetadata({
  path,
  title,
  description,
}: {
  /** Route path, e.g. "/" or "/courses". */
  path: string;
  title: string;
  description: string;
}): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: `${title} | ${site.name}`,
      description,
      url,
      locale: "en_US",
      images: [{ url: site.logo.full, width: site.logo.fullWidth, height: site.logo.fullHeight }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
