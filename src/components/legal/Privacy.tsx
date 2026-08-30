"use client";

import { useLocale } from "next-intl";
import { LegalPage } from "@/components/legal/LegalPage";
import { PRIVACY } from "@/components/legal/privacy-content";

export default function PrivacyPage() {
  const locale = useLocale();
  return <LegalPage doc={PRIVACY[locale === "en" ? "en" : "it"]} />;
}