"use client";

import { useEffect, useState, useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { SocialLinks } from "@/components/homepage/SocialIcons";
import { TOKENS } from "@/components/homepage/theme";
import { useCopy } from "@/components/homepage/content";

const S = `
.mf-nav{
  position:fixed;top:0;left:0;right:0;z-index:200;height:76px;
  display:flex;align-items:center;
  background:rgba(8,8,10,0.72);
  backdrop-filter:blur(16px) saturate(180%);
  -webkit-backdrop-filter:blur(16px) saturate(180%);
  border-bottom:1px solid transparent;
  transition:border-color .25s ease,background .25s ease,height .25s ease;
}
.mf-nav.s{border-bottom-color:var(--mf-line);background:rgba(8,8,10,0.94);height:68px}
.mf-nav-in{
  width:100%;max-width:var(--mf-wrap);margin:0 auto;padding:0 var(--mf-pad);
  display:flex;align-items:center;justify-content:space-between;gap:2rem;
}

/* logo — piu' grande, icona e wordmark */
.mf-logo{display:flex;align-items:center;gap:11px}
.mf-logo-box{
  width:40px;height:40px;border-radius:11px;
  background:var(--mf-bg-3);border:1px solid var(--mf-line);
  display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;
}
.mf-logo-box img{width:24px;height:24px;object-fit:contain}
.mf-logo-name{
  font-family:var(--mf-fd);font-size:22px;font-weight:900;letter-spacing:-.035em;color:var(--mf-ink);
}
.mf-logo-name b{color:var(--mf-red-b);font-weight:600}

/* links desktop */
.mf-nav-ul{display:flex;align-items:center;gap:30px}
.mf-nav-ul a{
  font-size:15px;font-weight:450;color:var(--mf-mut);letter-spacing:-.012em;
  transition:color .18s ease;
}
.mf-nav-ul a:hover{color:var(--mf-ink)}

.mf-nav-right{display:flex;align-items:center;gap:16px}

/* lingua */
.mf-lang{display:inline-flex;align-items:center;gap:6px;font-family:var(--mf-fm);font-size:12px;letter-spacing:.1em}
.mf-lang button{
  background:none;border:none;padding:2px;color:var(--mf-mut-2);
  font-family:inherit;font-size:inherit;letter-spacing:inherit;transition:color .18s ease;
}
.mf-lang button:hover{color:var(--mf-ink)}
.mf-lang button.a{color:var(--mf-ink);font-weight:500}
.mf-lang button:disabled{opacity:.5;cursor:wait}
.mf-lang i{color:var(--mf-line-3);font-style:normal}

.mf-nav-cta{height:42px;padding:0 18px;font-size:14.5px}

/* burger */
.mf-burger{
  display:none;width:42px;height:42px;border:1px solid var(--mf-line);border-radius:11px;
  background:var(--mf-bg-2);flex-direction:column;align-items:center;justify-content:center;gap:4px;
  transition:border-color .18s ease;
}
.mf-burger:hover{border-color:var(--mf-line-3)}
.mf-burger span{display:block;width:16px;height:1.5px;background:var(--mf-ink);transition:transform .3s ease,opacity .2s ease}
.mf-burger.o span:nth-child(1){transform:translateY(2.75px) rotate(45deg)}
.mf-burger.o span:nth-child(2){opacity:0}
.mf-burger.o span:nth-child(3){transform:translateY(-2.75px) rotate(-45deg)}

/* sheet mobile */
.mf-sheet{
  position:fixed;inset:0;z-index:190;background:var(--mf-bg);
  padding:100px var(--mf-pad) calc(2rem + env(safe-area-inset-bottom,0px));
  display:flex;flex-direction:column;
  opacity:0;visibility:hidden;transform:translateY(-8px);
  transition:opacity .28s ease,transform .28s ease,visibility .28s;
}
.mf-sheet.o{opacity:1;visibility:visible;transform:none}
.mf-sheet-list{display:flex;flex-direction:column;border-top:1px solid var(--mf-line)}
.mf-sheet-list a{
  display:flex;align-items:center;justify-content:space-between;
  padding:1.15rem 0;border-bottom:1px solid var(--mf-line);
  font-family:var(--mf-fd);font-size:clamp(1.9rem,7.5vw,2.6rem);font-weight:600;
  letter-spacing:-.035em;color:var(--mf-ink);
}
.mf-sheet-list a span{font-size:16px;color:var(--mf-mut-2);font-family:var(--mf-fb)}
.mf-sheet-foot{margin-top:auto;padding-top:2rem;display:flex;flex-direction:column;gap:1.2rem}
.mf-sheet-foot .mf-btn{width:100%;height:54px;font-size:16px}
.mf-sheet-meta{
  display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap;
  font-family:var(--mf-fm);font-size:12px;letter-spacing:.06em;color:var(--mf-mut);
}
.mf-sheet-social{display:flex;gap:14px}
.mf-sheet-social a{color:var(--mf-mut);transition:color .18s ease}
.mf-sheet-social a:hover{color:var(--mf-red-b)}
.mf-dot{width:6px;height:6px;border-radius:50%;background:#22c55e;display:inline-block;margin-right:7px}

@media(max-width:900px){
  .mf-nav-ul,.mf-nav-cta{display:none}
  .mf-burger{display:flex}
}
`;

export function Navbar() {
  const locale = useLocale();
  const c = useCopy(locale);
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const switchLang = (next: "it" | "en") => {
    if (next === locale) return;
    startTransition(() => router.replace(pathname, { locale: next }));
  };

  const Lang = () => (
    <div className="mf-lang" role="group" aria-label={c.nav.language}>
      <button
        type="button" onClick={() => switchLang("it")} disabled={isPending}
        className={locale === "it" ? "a" : ""} aria-pressed={locale === "it"}
      >IT</button>
      <i aria-hidden>/</i>
      <button
        type="button" onClick={() => switchLang("en")} disabled={isPending}
        className={locale === "en" ? "a" : ""} aria-pressed={locale === "en"}
      >EN</button>
    </div>
  );

  return (
    <>
      <style>{TOKENS}</style>
      <style>{S}</style>

      <nav className={`mf-nav ${scrolled ? "s" : ""}`}>
        <div className="mf-nav-in">
          <a href={`/${locale}`} className="mf-logo" aria-label="miutifin">
            <span className="mf-logo-box">
              <img src="/logo_small_trasparent.png" alt="" />
            </span>
            <span className="mf-logo-name">miutifin<b>.</b></span>
          </a>

          <ul className="mf-nav-ul">
            {c.nav.links.map(l => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>

          <div className="mf-nav-right">
            <Lang />
            <a href="#contatti" className="mf-btn mf-btn-p mf-nav-cta">{c.nav.cta}</a>
            <button
              className={`mf-burger ${open ? "o" : ""}`}
              onClick={() => setOpen(v => !v)}
              aria-expanded={open}
              aria-label={open ? c.nav.close : c.nav.menu}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mf-sheet ${open ? "o" : ""}`} aria-hidden={!open}>
        <div className="mf-sheet-list">
          {c.nav.links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              {l.label}<span>↗</span>
            </a>
          ))}
        </div>

        <div className="mf-sheet-foot">
          <a href="#contatti" className="mf-btn mf-btn-p" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            {c.nav.cta} <span className="mf-arr">→</span>
          </a>
          <div className="mf-sheet-meta">
            <span><span className="mf-dot" />{c.nav.status}</span>
            <Lang />
          </div>
          <SocialLinks className="mf-sheet-social" size={20} />
        </div>
      </div>
    </>
  );
}