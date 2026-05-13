import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Suspense } from "react";

import { routing } from "@/i18n/routing";
import { CityProvider } from "@/context/CityContext";
import { PostHogProvider } from "@/context/providers";
import { PostHogPageView } from "@/context/posthog-pageview";

import "../globals.css";

const BASE_URL = "https://miutifin.com";

// ── Metadata localizzati per locale ──
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  // Italiano = no prefisso URL, Inglese = /en
  const localePath = locale === routing.defaultLocale ? "" : `/${locale}`;
  const canonical = `${BASE_URL}${localePath}`;

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: t("title"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    authors: [{ name: "Miutifin", url: BASE_URL }],
    creator: "Miutifin",
    publisher: "Miutifin",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical,
      languages: {
        it: BASE_URL,
        en: `${BASE_URL}/en`,
        "x-default": BASE_URL,
      },
    },
    openGraph: {
      type: "website",
      locale: t("ogLocale"),
      alternateLocale: locale === "it" ? ["en_US"] : ["it_IT"],
      url: canonical,
      siteName: "Miutifin",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [
        {
          url: "/miutifinlogo.png",
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitterTitle"),
      description: t("twitterDescription"),
      images: ["/miutifinlogo.png"],
      creator: "@miutifin",
    },
    category: "technology",
  };
}

// ── Static rendering per ogni locale ──
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // Carica traduzioni server-side per structured data
  const tSchema = await getTranslations({ locale, namespace: "schema" });

  // ── Structured Data: Organization ──
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Miutifin",
    url: BASE_URL,
    logo: `${BASE_URL}/miutifinlogo.png`,
    description: tSchema("orgDescription"),
    foundingDate: "2023",
    areaServed: "Worldwide",
    serviceType: [
      tSchema("services.softwareDev.name"),
      tSchema("services.ai.name"),
      tSchema("services.robotics.name"),
      tSchema("services.aiMarketing.name"),
      tSchema("services.videoAi.name"),
    ],
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English", "Italian"],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Tech Agency Services",
      itemListElement: [
        "softwareDev",
        "ai",
        "robotics",
        "aiMarketing",
        "videoAi",
      ].map((key) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: tSchema(`services.${key}.name`),
          description: tSchema(`services.${key}.description`),
        },
      })),
    },
  };

  // ── Structured Data: WebSite ──
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Miutifin",
    url: BASE_URL,
    description: tSchema("websiteDescription"),
    inLanguage: locale === "it" ? "it-IT" : "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang={locale}>
      <head>
        {/* Structured Data – Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Structured Data – WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9R3DLG2H04"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9R3DLG2H04', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>

      <body className="bg-black text-white">
        <NextIntlClientProvider>
          <PostHogProvider>
            <Suspense fallback={null}>
              <PostHogPageView />
            </Suspense>
            <CityProvider>{children}</CityProvider>
          </PostHogProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}