import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Miutifin – Step into AI-driven efficiency",
  description:
    "Miutifin is an AI-driven orchestration layer that turns data into decisions and automated workflows.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}

