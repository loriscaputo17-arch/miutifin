import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://miutifin.com";
  const lastModified = new Date();

  const routes = [
    "",
    "/esco",
    "/esco/journal",
    "/esco/press",
    "/esco/cookies",
    "/esco/privacy",
    "/esco/terms",
  ];

  const locales = ["it", "en"];

  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1.0 : route === "/esco" ? 0.9 : 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}${route}`])
        ),
      },
    }))
  );
}