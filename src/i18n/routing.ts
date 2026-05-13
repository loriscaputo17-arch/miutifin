import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["it", "en"],
  defaultLocale: "it",
  // "as-needed" → italiano senza prefisso (/), inglese con prefisso (/en/...)
  localePrefix: "as-needed",
  // Auto-detect dalla lingua del browser
  localeDetection: true,
});

export type Locale = (typeof routing.locales)[number];

// Navigation helpers che mantengono la locale automaticamente
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);