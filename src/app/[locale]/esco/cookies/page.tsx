"use client";

import { useLocale } from "next-intl";
import { LegalPage } from "@/components/legal/LegalPage";
import { COOKIES } from "@/components/legal/cookies-content";

export default function CookiesPage() {
  const locale = useLocale();
  return <LegalPage doc={COOKIES[locale === "en" ? "en" : "it"]} />;
}