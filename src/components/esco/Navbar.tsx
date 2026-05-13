"use client";

import { useEffect, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

export function EscoNavbar({ activePath }: { activePath?: string } = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Stats reali da Supabase (stesso RPC dell'Hero)
  const [stats, setStats] = useState<{ members: number; citiesLive: number } | null>(null);

  const locale = useLocale() as "it" | "en";
  const t = useTranslations("esco.nav");
  const router = useRouter();
  const pathname = usePathname();

  const NAV_LINKS = [
    { label: t("preview"), href: "/esco#preview" },
    { label: t("access"), href: "/esco#access" },
    { label: t("cities"), href: "/esco#cities" },
  ];

  const switchLang = (next: "it" | "en") => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Fetch stats reali da Supabase
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const sb = createSupabaseBrowserClient();
        const { data, error } = await sb.rpc("get_landing_stats");
        if (!error && data) {
          setStats({
            members: (data as { members: number }).members,
            citiesLive: (data as { citiesLive: number }).citiesLive,
          });
        }
      } catch {
        // Silenzioso — se fallisce, non mostriamo le stats
      }
    };
    fetchStats();
  }, []);

  const LangSwitch = ({ small = false }: { small?: boolean }) => (
    <div className="esco-lang" role="group" aria-label={t("language")}>
      <span className={`esco-lang-pill ${locale === "en" ? "en" : ""}`} aria-hidden />
      <button
        type="button"
        className={locale === "it" ? "a" : ""}
        onClick={() => switchLang("it")}
        aria-pressed={locale === "it"}
        disabled={isPending}
      >IT</button>
      <button
        type="button"
        className={locale === "en" ? "a" : ""}
        onClick={() => switchLang("en")}
        aria-pressed={locale === "en"}
        disabled={isPending}
      >EN</button>
    </div>
  );

  return (
    <>
      <nav className={`esco-nav ${scrolled ? "s" : ""}`}>
        <div className="esco-nav-inner">
          <div className="esco-brand">
            <a href={`/${locale}/esco`} className="esco-brand-logo" aria-label="ESCO home">
              <img src="/images/esco_logo.png" alt="ESCO" />
            </a>
            <a href={`/${locale}/esco`}>
              <span className="esco-brand-name">esco</span>
            </a>
            <a href={`/${locale}`} className="esco-brand-back">
              <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
              miutifin
            </a>
          </div>

          <div className="esco-nav-links">
            {NAV_LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                className={activePath && l.href.startsWith(activePath) ? "active" : ""}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="esco-nav-right">
            <LangSwitch />
            <a href="/esco#waitlist" className="esco-nav-cta">{t("cta")}</a>
            <button
              className={`esco-burger ${open ? "o" : ""}`}
              onClick={() => setOpen(!open)}
              aria-label="menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`esco-mob ${open ? "o" : ""}`}>
        <div className="esco-mob-eyebrow">{t("menu")}</div>
        <div className="esco-mob-list">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              <span>{l.label}</span>
              <span className="arr">→</span>
            </a>
          ))}
          <a href="/esco/journal" onClick={() => setOpen(false)}>
            <span>{t("journal")}</span><span className="arr">→</span>
          </a>
          <a href="/esco/press" onClick={() => setOpen(false)}>
            <span>{t("press")}</span><span className="arr">→</span>
          </a>
          <a href={`/${locale}`} onClick={() => setOpen(false)}>
            <span>{t("back")}</span><span className="arr">→</span>
          </a>
        </div>

        <div className="esco-mob-lang">
          <span className="esco-mob-lang-label">{t("language")}</span>
          <LangSwitch />
        </div>

        <div className="esco-mob-foot">
          <a href="/esco#waitlist" onClick={() => setOpen(false)} className="esco-mob-cta">
            {t("cta")} →
          </a>
          {/* Stats reali — appaiono solo se ci sono dati */}
          {stats && (
            <div className="esco-mob-foot-info">
              <span className="live">{t("citiesLive", { count: stats.citiesLive })}</span>
              {stats.members > 0 && (
                <span>{t("membersCount", { count: stats.members.toLocaleString() })}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}