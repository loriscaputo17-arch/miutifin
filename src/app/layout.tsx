import type { Metadata } from "next";
import "./globals.css";
import { CityProvider } from "@/context/CityContext";
import { PostHogProvider } from "@/context/providers";
import { PostHogPageView } from "@/context/posthog-pageview";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Miutifin – Discover Your Journey",
  description:
    "A private platform to explore events, places and journeys. Visibility is intentional. Access is limited.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
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
          <PostHogPageView />
          <CityProvider>
            {children}
          </CityProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
