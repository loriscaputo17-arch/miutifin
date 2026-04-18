import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/(protected)/",
          "/auth/",
          "/admin/",
          "/secret/",
        ],
      },
      {
        // Block AI training scrapers from protected content
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "CCBot",
          "anthropic-ai",
          "Claude-Web",
          "Omgilibot",
          "FacebookBot",
        ],
        disallow: ["/"],
      },
    ],
    sitemap: "https://miutifin.com/sitemap.xml",
    host: "https://miutifin.com",
  };
}
