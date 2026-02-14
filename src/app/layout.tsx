import type { Metadata } from "next";
import "./globals.css";
import { CityProvider } from "@/context/CityContext";

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
      <body className="bg-black text-white">
        <CityProvider>
          {children}
        </CityProvider>
      </body>
    </html>
  );
}

