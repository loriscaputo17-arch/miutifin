import type { Metadata } from "next";
import "./globals.css";
import { CityProvider } from "@/context/CityContext";
import { PostHogProvider } from "@/context/providers";
import { PostHogPageView } from "@/context/posthog-pageview";
import Script from "next/script";
import { Suspense } from "react";

const BASE_URL = "https://miutifin.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Miutifin | Tech Agency – AI, Software Development, Robotics & Marketing",
    template: "%s | Miutifin",
  },
  description:
    "Miutifin is a full-stack tech agency specialising in AI development, software engineering, robotics automation, and AI-driven marketing. We build LLM integrations, web & mobile apps, ROS 2 systems, and data-driven growth strategies.",
  keywords: [
    "tech agency",
    "software development agency",
    "AI development",
    "artificial intelligence agency",
    "machine learning",
    "LLM integration",
    "AI agents",
    "robotics automation",
    "ROS 2",
    "computer vision",
    "AI marketing",
    "marketing AI",
    "SEO agency",
    "growth hacking",
    "startup support",
    "MVP development",
    "web app development",
    "mobile app development",
    "video AI",
    "generative AI",
    "Next.js",
    "React",
    "Python",
    "OpenAI",
    "Anthropic",
    "digital strategy",
  ],
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
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Miutifin",
    title: "Miutifin | Tech Agency – AI, Software Development, Robotics & Marketing",
    description:
      "Full-stack tech agency. We build AI systems, software products, robotics solutions and run AI-powered marketing campaigns. 120+ projects delivered.",
    images: [
      {
        url: "/miutifinlogo.png",
        width: 1200,
        height: 630,
        alt: "Miutifin – Tech Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Miutifin | Tech Agency – AI, Software Development & Robotics",
    description:
      "Full-stack tech agency specialising in AI, software engineering, robotics and AI-driven marketing. 120+ projects delivered.",
    images: ["/miutifinlogo.png"],
    creator: "@miutifin",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data – Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Miutifin",
              url: "https://miutifin.com",
              logo: "https://miutifin.com/miutifinlogo.png",
              description:
                "Miutifin is a full-stack tech agency specialising in AI development, software engineering, robotics automation, and AI-driven marketing.",
              foundingDate: "2023",
              areaServed: "Worldwide",
              serviceType: [
                "Software Development",
                "Artificial Intelligence",
                "Robotics & Automation",
                "AI Marketing",
                "SEO & Digital Marketing",
                "Video AI & Generative AI",
                "Startup Support",
                "Digital Strategy",
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
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Software Development", description: "Web apps, mobile, REST/GraphQL APIs and cloud-native architectures." } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Artificial Intelligence", description: "LLM integration, AI agents, fine-tuning, RAG pipelines and intelligent automation." } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Robotics & Automation", description: "Embedded systems, ROS 2, computer vision and industrial automation." } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Marketing & SEO", description: "Technical SEO, AI-driven content strategy, performance campaigns and growth hacking." } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Video AI & Generative", description: "Synthetic avatars, voice cloning, video generation and AI creative pipelines." } },
                ],
              },
            }),
          }}
        />
        {/* Structured Data – WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Miutifin",
              url: "https://miutifin.com",
              description: "Full-stack tech agency: AI, software engineering, robotics and AI-driven marketing.",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://miutifin.com/?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
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
        <PostHogProvider>
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          <CityProvider>
            {children}
          </CityProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
