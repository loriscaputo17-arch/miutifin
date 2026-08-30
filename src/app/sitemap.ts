import type { MetadataRoute } from "next";
import { SITE_URL, LOCALES } from "@/lib/seo";

/* Le pagine che esistono davvero. Aggiungine una solo quando e' online:
   una sitemap che elenca 404 fa perdere fiducia al crawler. */
const PAGES = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "esco", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "terms", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return LOCALES.flatMap(locale =>
    PAGES.map(p => ({
      url: p.path ? `${SITE_URL}/${locale}/${p.path}` : `${SITE_URL}/${locale}`,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map(l => [l, p.path ? `${SITE_URL}/${l}/${p.path}` : `${SITE_URL}/${l}`])
        ),
      },
    }))
  );
}