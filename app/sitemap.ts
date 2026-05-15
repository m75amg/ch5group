import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";

const PAGES: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "about", priority: 0.8, changeFrequency: "monthly" },
  { path: "media-platform", priority: 0.8, changeFrequency: "monthly" },
  { path: "services", priority: 0.8, changeFrequency: "monthly" },
  { path: "programs", priority: 0.8, changeFrequency: "monthly" },
  { path: "partners", priority: 0.8, changeFrequency: "monthly" },
  { path: "contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "terms", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return PAGES.flatMap((page) =>
    routing.locales.map((locale) => {
      const url = `${SITE_URL}/${locale}${page.path ? `/${page.path}` : ""}`;
      return {
        url,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [
              l,
              `${SITE_URL}/${l}${page.path ? `/${page.path}` : ""}`,
            ]),
          ),
        },
      };
    }),
  );
}
