"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

export function EscoFooter() {
  const t = useTranslations("esco.footer");
  const locale = useLocale() as "it" | "en";
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const submitNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!isValidEmail(trimmed)) {
      setErr(t("newsletterErrorGeneric"));
      return;
    }
    setLoading(true);
    setErr(null);

    try {
      const sb = createSupabaseBrowserClient();
      const { error } = await sb.from("newsletter").insert({ email: trimmed });

      if (error) {
        if (error.code === "23505") setSubscribed(true);
        else setErr(t("newsletterErrorGeneric"));
        setLoading(false);
        return;
      }

      setSubscribed(true);
      setLoading(false);
    } catch {
      setErr(t("newsletterErrorNetwork"));
      setLoading(false);
    }
  };

  return (
    <footer className="esco-foot">
      <div className="esco-wrap">
        <p className="esco-foot-manifesto">
          {t("manifestoLine1")} <em>{t("manifestoEm")}</em>
        </p>

        <div className="esco-foot-grid">
          <div>
            <div className="esco-foot-brand-row">
              <a href={`/${locale}/esco`} className="flex items-center gap-4">

              <div className="esco-foot-logo">
                <img src="/images/esco_logo.png" alt="ESCO" />
              </div>
              <span className="esco-foot-name">esco</span>
              </a>
            </div>
            <p className="esco-foot-tag">{t("tag")}</p>
            <div className="esco-foot-newsletter">
              <span className="esco-foot-newsletter-label">{t("newsletterLabel")}</span>
              {subscribed ? (
                <p style={{ fontSize: 13, color: "var(--terra)", fontFamily: "var(--f-serif)", fontStyle: "italic" }}>
                  {t("newsletterSuccess")}
                </p>
              ) : (
                <>
                  <form className="esco-foot-newsletter-form" onSubmit={submitNewsletter}>
                    <input
                      type="email"
                      required
                      placeholder={t("newsletterPlaceholder")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                    />
                    <button type="submit" disabled={loading}>
                      {loading ? t("newsletterSubmitting") : `${t("newsletterSubmit")} →`}
                    </button>
                  </form>
                  {err && <p style={{ fontSize: 11, color: "var(--terra)", marginTop: 4 }}>{err}</p>}
                </>
              )}
            </div>
          </div>

          <div>
            <h4 className="esco-foot-col-title">{t("columns.product")}</h4>
            <ul className="esco-foot-links">
              <li><a href="/esco#how">{t("links.howItWorks")}</a></li>
              <li><a href="/esco#try">{t("links.tryIt")}</a></li>
              <li><a href="/esco#journeys">{t("links.journeys")}</a></li>
              <li><a href="/esco#signal">{t("links.signal")}</a></li>
              <li><a href="/esco#cities">{t("links.cities")} <span className="live-tag">{t("links.citiesLive", { count: 1 })}</span></a></li>
            </ul>
          </div>

          <div>
            <h4 className="esco-foot-col-title">{t("columns.network")}</h4>
            <ul className="esco-foot-links">
              <li><a href="/esco#access">{t("links.requestAccess")}</a></li>
              <li><a href="/esco#access">{t("links.inviteSystem")}</a></li>
              <li><a href="/esco/login">{t("links.members")}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="esco-foot-col-title">{t("columns.support")}</h4>
            <ul className="esco-foot-links">
              <li><a href="/esco#faq">{t("links.faq")}</a></li>
              <li><a href="mailto:miutifin.ask@gmail.com">{t("links.contact")}</a></li>
              <li><a href="/privacy">{t("links.privacy")}</a></li>
              <li><a href="/terms">{t("links.terms")}</a></li>
              <li><a href="/esco/cookies">{t("links.cookies")}</a></li>
            </ul>
          </div>
        </div>

        <div className="esco-foot-bottom">
          <div className="esco-foot-status">{t("status")}</div>
          <div className="esco-foot-social">
            <a href="https://www.instagram.com/miutifinglobal" aria-label="Instagram">IG</a>
            <a href="https://www.linkedin.com/company/miutifin" aria-label="LinkedIn">IN</a>
          </div>
          <div className="esco-foot-meta">
            <span>© {new Date().getFullYear()} Miutifin</span>
            <a href="/">miutifin.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}