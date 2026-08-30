"use client";

import { useEffect, useState, useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useEscoCopy } from "@/components/esco/content";

const S = `
.e-nav{
  position:fixed;top:0;left:0;right:0;z-index:200;height:74px;display:flex;align-items:center;
  background:rgba(246,243,236,.72);backdrop-filter:blur(16px) saturate(180%);
  -webkit-backdrop-filter:blur(16px) saturate(180%);
  border-bottom:1px solid transparent;transition:border-color .25s ease,background .25s ease,height .25s ease;
}
.e-nav.s{border-bottom-color:var(--e-line);background:rgba(246,243,236,.94);height:66px}
.e-nav-in{
  width:100%;max-width:var(--e-wrap);margin:0 auto;padding:0 var(--e-pad);
  display:flex;align-items:center;justify-content:space-between;gap:1.5rem;
}
.e-brand{display:flex;align-items:center;gap:12px;min-width:0}
.e-brand-logo{
  width:42px;height:42px;border-radius:12px;background:var(--e-paper-2);border:1px solid var(--e-line);
  display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;
}
.e-brand-logo img{width:42px;height:42px;object-fit:contain}
.e-brand-name{font-family:var(--e-fd);font-size:24px;font-weight:900;letter-spacing:-.05em;color:var(--e-ink)}
.e-brand-back{
  display:none;align-items:center;gap:6px;padding-left:14px;margin-left:2px;
  border-left:1px solid var(--e-line);font-size:13.5px;color:var(--e-mut-2);transition:color .2s ease;
}
.e-brand-back:hover{color:var(--e-ink)}
@media(min-width:820px){.e-brand-back{display:inline-flex}}

.e-nav-right{display:flex;align-items:center;gap:14px}
.e-lang{display:inline-flex;align-items:center;gap:6px;font-family:var(--e-fm);font-size:12px;letter-spacing:.1em}
.e-lang button{background:none;border:none;padding:2px;color:var(--e-mut-2);font:inherit;transition:color .18s ease}
.e-lang button:hover{color:var(--e-ink)}
.e-lang button.a{color:var(--e-ink);font-weight:500}
.e-lang button:disabled{opacity:.5;cursor:wait}
.e-lang i{color:var(--e-line-3);font-style:normal}
.e-nav-cta{height:42px;padding:0 20px;font-size:14.5px}
@media(max-width:560px){
  .e-nav-cta{display:none}
  .e-nav{height:64px}
  .e-nav.s{height:58px}
  .e-brand-logo{width:36px;height:36px;border-radius:10px}
  .e-brand-logo img{width:36px;height:36px}
  .e-brand-name{font-size:21px}
}
`;

export function EscoNavbar() {
  const locale = useLocale();
  const c = useEscoCopy(locale);
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const switchLang = (next: "it" | "en") => {
    if (next === locale) return;
    startTransition(() => router.replace(pathname, { locale: next }));
  };

  return (
    <>
      <style>{S}</style>
      <nav className={`e-nav ${scrolled ? "s" : ""}`}>
        <div className="e-nav-in">
          <div className="e-brand">
            <a href={`/${locale}/esco`} className="e-brand-logo" aria-label="ESCO">
              <img src="/images/esco_colored_logo.png" alt="" />
            </a>
            <a href={`/${locale}/esco`}><span className="e-brand-name">ESCO</span></a>
            <a href={`/${locale}`} className="e-brand-back">← {c.nav.back}</a>
          </div>

          <div className="e-nav-right">
            <div className="e-lang" role="group" aria-label={c.nav.language}>
              <button type="button" className={locale === "it" ? "a" : ""} onClick={() => switchLang("it")} disabled={isPending} aria-pressed={locale === "it"}>IT</button>
              <i aria-hidden>/</i>
              <button type="button" className={locale === "en" ? "a" : ""} onClick={() => switchLang("en")} disabled={isPending} aria-pressed={locale === "en"}>EN</button>
            </div>
            <a href="#join" className="e-btn e-btn-p e-nav-cta">{c.nav.cta}</a>
          </div>
        </div>
      </nav>
    </>
  );
}