"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTransition } from "react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("language");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: "it" | "en") => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: 3,
        borderRadius: 100,
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.02)",
        opacity: isPending ? 0.5 : 1,
        transition: "opacity .2s",
      }}
      role="group"
      aria-label={t("switcher")}
    >
      {(["it", "en"] as const).map((lng) => {
        const active = locale === lng;
        return (
          <button
            key={lng}
            onClick={() => switchTo(lng)}
            disabled={isPending}
            aria-pressed={active}
            style={{
              padding: "4px 10px",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              borderRadius: 100,
              border: "none",
              cursor: isPending ? "wait" : "pointer",
              background: active ? "rgba(220,38,38,0.12)" : "transparent",
              color: active ? "#fff" : "rgba(255,255,255,0.4)",
              transition: "background .2s, color .2s",
            }}
          >
            {lng}
          </button>
        );
      })}
    </div>
  );
}