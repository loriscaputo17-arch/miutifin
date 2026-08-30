"use client";

import { useLocale } from "next-intl";
import { LegalPage } from "@/components/legal/LegalPage";
import { TERMS } from "@/components/legal/terms-content";

export default function TermsPage() {
  const locale = useLocale();
  return <LegalPage doc={TERMS[locale === "en" ? "en" : "it"]} />;
}