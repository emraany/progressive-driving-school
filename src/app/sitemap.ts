import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { ROUTES } from "@/lib/nav";

/** /register is excluded: it is a redirect to an external form, not a page. */
export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${site.url}${route === "/" ? "" : route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "monthly" : "yearly",
    priority: route === "/" ? 1 : route === "/courses" ? 0.9 : 0.8,
  }));
}
