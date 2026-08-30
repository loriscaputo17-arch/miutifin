import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

/* ============================================================
   SEO — costruzione dei metadati per Next App Router
   Legge i testi da messages/{locale}.json, aggiunge canonical,
   hreflang e Open Graph. Il tag keywords resta perche' non fa
   danno, ma Google lo ignora dal 2009: non aspettarti nulla.
   ============================================================ */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://miutifin.com";

export const LOCALES = ["it", "en"] as const;
export type Locale = (typeof LOCALES)[number];

type Args = {
  locale: string;
  /** percorso senza prefisso lingua: "" per la home, "esco", "privacy", "terms" */
  path?: string;
  /** chiave dei messaggi: "metadata" per il sito, "esco.metadata" per ESCO */
  namespace?: string;
  /** immagine di anteprima specifica della pagina */
  image?: string;
};

export async function buildMetadata({
  locale,
  path = "",
  namespace = "metadata",
  image,
}: Args): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const clean = path.replace(/^\/|\/$/g, "");
  const url = clean ? `${SITE_URL}/${locale}/${clean}` : `${SITE_URL}/${locale}`;
  const og = image ?? (clean === "esco" ? "/og/esco.png" : "/og/miutifin.png");

  const has = (k: string) => {
    try { return Boolean(t(k)); } catch { return false; }
  };

  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    keywords: (() => {
      try { return t.raw("keywords") as string[]; } catch { return undefined; }
    })(),

    // canonical + hreflang: senza questi le due lingue competono tra loro
    alternates: {
      canonical: url,
      languages: {
        it: clean ? `${SITE_URL}/it/${clean}` : `${SITE_URL}/it`,
        en: clean ? `${SITE_URL}/en/${clean}` : `${SITE_URL}/en`,
        "x-default": clean ? `${SITE_URL}/it/${clean}` : `${SITE_URL}/it`,
      },
    },

    openGraph: {
      type: "website",
      url,
      siteName: has("siteName") ? t("siteName") : "Miutifin",
      locale: has("ogLocale") ? t("ogLocale") : locale === "en" ? "en_US" : "it_IT",
      title: has("ogTitle") ? t("ogTitle") : t("title"),
      description: has("ogDescription") ? t("ogDescription") : t("description"),
      images: [
        {
          url: og,
          width: 1200,
          height: 630,
          alt: has("ogImageAlt") ? t("ogImageAlt") : t("title"),
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: has("twitterTitle") ? t("twitterTitle") : t("title"),
      description: has("twitterDescription") ? t("twitterDescription") : t("description"),
      images: [og],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}