import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "esco.metadata" });

  const baseUrl = "https://miutifin.com"; // sostituisci col tuo dominio reale
  const url = `${baseUrl}/${locale}/esco`;
  const ogImage = `${baseUrl}/images/esco-og.jpg`; // crea questa immagine 1200x630

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    
    alternates: {
      canonical: url,
      languages: {
        "it": `${baseUrl}/it/esco`,
        "en": `${baseUrl}/en/esco`,
        "x-default": `${baseUrl}/en/esco`,
      },
    },

    openGraph: {
      type: "website",
      url,
      title: t("ogTitle"),
      description: t("ogDescription"),
      siteName: "ESCO",
      locale: locale === "it" ? "it_IT" : "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "ESCO — The city, written for you",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [ogImage],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Structured data via metadata "other" (alternativa: <script> inline nel layout)
    other: {
      "application-name": "ESCO",
    },
  };
}

export default function EscoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ESCO",
    description: "Private network that writes journeys through your city. By invitation.",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "iOS, Android",
    url: "https://miutifin.com/esco",
    publisher: {
      "@type": "Organization",
      name: "Miutifin",
      url: "https://miutifin.com",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      availability: "https://schema.org/PreOrder",
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}