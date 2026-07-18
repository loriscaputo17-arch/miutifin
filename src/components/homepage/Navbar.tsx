"use client";

import { useState, useEffect, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { SocialLinks } from "@/components/homepage/SocialIcons";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --r:#dc2626; --rg:rgba(220,38,38,0.18); --rm:rgba(220,38,38,0.08);
    --w:#fff; --m:rgba(255,255,255,0.42); --d:rgba(255,255,255,0.18);
    --b:rgba(255,255,255,0.07); --b2:rgba(255,255,255,0.04);
    --bg:#080808; --bg2:#0d0d0d; --bg3:#111;
    --f:'Inter',system-ui,sans-serif;
    --rad:14px; --rad2:20px; --rad3:10px;
  }
  html{scroll-behavior:smooth}
  body{background:var(--bg);color:var(--w);font-family:var(--f);-webkit-font-smoothing:antialiased;overflow-x:hidden}
  ::selection{background:rgba(220,38,38,0.3)}
  a{text-decoration:none;color:inherit}
  button{font-family:var(--f)}

  .nav{
    position:fixed;top:14px;left:50%;transform:translateX(-50%);
    z-index:200;width:calc(100% - 2rem);max-width:70vw;
    height:52px;padding:0 12px 0 12px;
    display:flex;align-items:center;justify-content:space-between;
    border-radius:20px;
    background:rgba(10,10,10,0.6);
    border:1px solid rgba(255,255,255,0.08);
    backdrop-filter:blur(24px) saturate(180%);
    -webkit-backdrop-filter:blur(24px) saturate(180%);
    transition:background .3s,border-color .3s,box-shadow .3s,top .3s;
  }
  @media(max-width:780px){.nav{max-width:95vw;}}

  .nav.s{background:rgba(7,7,7,0.95);border-color:rgba(255,255,255,0.1);box-shadow:0 8px 48px rgba(0,0,0,0.65),inset 0 1px 0 rgba(255,255,255,0.04);top:10px}
  .nav-logo{display:flex;align-items:center;gap:9px;text-decoration:none}
  .nav-logo-box{width:30px;height:30px;border-radius:7px;background:var(--rg);border:1px solid rgba(220,38,38,0.28);display:flex;align-items:center;justify-content:center;overflow:hidden}
  .nav-logo-box img{width:18px;height:14px;object-fit:contain}
  .nav-logo-name{font-size:14px;font-weight:700;letter-spacing:-0.02em}
  .nav-ul{display:flex;gap:28px;list-style:none;align-items:center}
  .nav-ul a{font-size:13px;font-weight:500;color:var(--m);transition:color .2s}
  .nav-ul a:hover{color:var(--w)}

  .nav-right{display:flex;align-items:center;gap:10px}

  .lang{
    display:inline-flex;align-items:center;
    height:36px;padding:3px;border-radius:100px;
    background:rgba(255,255,255,0.03);
    border:1px solid rgba(255,255,255,0.06);
    position:relative;
  }
  .lang-pill{
    position:absolute;top:3px;bottom:3px;width:calc(50% - 3px);
    background:rgba(220,38,38,0.14);
    border:1px solid rgba(220,38,38,0.25);
    border-radius:100px;
    transition:transform .3s cubic-bezier(.4,0,.2,1);
    pointer-events:none;
  }
  .lang-pill.en{transform:translateX(calc(100% + 0px))}
  .lang button{
    position:relative;z-index:1;
    background:none;border:none;cursor:pointer;
    padding:0 12px;height:30px;
    font-size:11px;font-weight:700;letter-spacing:.08em;
    color:rgba(255,255,255,0.45);
    transition:color .2s;
    border-radius:100px;
  }
  .lang button.a{color:#fff}
  .lang button:not(.a):hover{color:rgba(255,255,255,0.7)}
  .lang button:disabled{opacity:.5;cursor:wait}

  .nav-btn{
    padding:9px 16px;border-radius:100px;background:var(--r);color:#fff;
    font-size:13px;font-weight:600;letter-spacing:-0.01em;transition:all .2s;
    box-shadow:0 0 20px rgba(220,38,38,0.2);white-space:nowrap;
    display:inline-flex;align-items:center;gap:5px;
  }
  .nav-btn:hover{background:#ef4444;box-shadow:0 0 30px rgba(220,38,38,0.35);transform:translateY(-1px)}

  .burger{
    display:none;flex-direction:column;gap:5px;
    width:36px;height:36px;
    align-items:center;justify-content:center;
    background:rgba(255,255,255,0.03);
    border:1px solid rgba(255,255,255,0.06);
    border-radius:50%;cursor:pointer;z-index:300;
    transition:background .25s,border-color .25s;
  }
  .burger:hover{background:rgba(255,255,255,0.06);border-color:rgba(255,255,255,0.12)}
  .burger span{display:block;width:16px;height:1.5px;background:#fff;transition:all .3s;transform-origin:center}
  .burger.o{background:rgba(220,38,38,0.14);border-color:rgba(220,38,38,0.3)}
  .burger.o span:nth-child(1){transform:rotate(45deg) translate(4px,4px)}
  .burger.o span:nth-child(2){opacity:0;transform:scaleX(0)}
  .burger.o span:nth-child(3){transform:rotate(-45deg) translate(4px,-4px)}

  .mob-menu{
    position:fixed;inset:0;z-index:250;
    background:rgba(5,5,5,0.96);
    backdrop-filter:blur(32px) saturate(180%);
    -webkit-backdrop-filter:blur(32px) saturate(180%);
    display:flex;flex-direction:column;
    padding:96px clamp(1.5rem,6vw,2.5rem) clamp(1.5rem,4vw,2rem);
    transform:translateX(100%);
    transition:transform .5s cubic-bezier(.76,0,.24,1);
    overflow-y:auto;
  }
  .mob-menu.o{transform:translateX(0)}

  .mob-menu::before{
    content:'';position:absolute;
    top:-30%;left:-20%;width:80%;height:80%;
    background:radial-gradient(circle,rgba(220,38,38,0.18) 0%,transparent 60%);
    filter:blur(80px);
    opacity:0.6;pointer-events:none;
  }
  .mob-menu::after{
    content:'';position:absolute;
    right:-10%;width:60%;height:60%;
    background:radial-gradient(circle,rgba(220,38,38,0.08) 0%,transparent 60%);
    filter:blur(80px);pointer-events:none;
  }

  .mob-close{
    position:absolute;top:22px;right:clamp(1.5rem,6vw,2.5rem);
    width:36px;height:36px;border-radius:50%;
    background:rgba(255,255,255,0.04);
    border:1px solid rgba(255,255,255,0.08);
    display:flex;align-items:center;justify-content:center;
    cursor:pointer;color:var(--m);font-size:18px;font-weight:300;
    transition:all .2s;z-index:2;
  }
  .mob-close:hover{background:var(--rm);border-color:rgba(220,38,38,0.28);color:#fff}

  .mob-eyebrow{
    font-size:10px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;
    color:rgba(255,255,255,0.28);margin-bottom:1.5rem;
    display:flex;align-items:center;gap:10px;position:relative;z-index:1;
  }
  .mob-eyebrow::before{
    content:'';width:18px;height:1px;background:rgba(220,38,38,0.5);
  }

  .mob-list{position:relative;z-index:1;display:flex;flex-direction:column}
  .mob-list a{
    font-size:clamp(2rem,8vw,3.4rem);
    font-weight:800;letter-spacing:-0.04em;
    color:rgba(255,255,255,0.85);
    padding:.75rem 0;
    border-bottom:1px solid rgba(255,255,255,0.05);
    transition:color .25s,padding-left .3s,border-color .25s;
    display:flex;align-items:center;justify-content:space-between;gap:1rem;
    line-height:1;
  }
  .mob-list a .arr{
    font-size:18px;color:rgba(255,255,255,0.18);
    transition:color .25s,transform .3s;
  }
  .mob-list a:hover{
    color:#fff;padding-left:8px;
    border-color:rgba(220,38,38,0.25);
  }
  .mob-list a:hover .arr{color:var(--r);transform:translateX(4px)}

  .mob-lang-row{
    margin-top:2rem;display:flex;align-items:center;gap:14px;position:relative;z-index:1;
  }
  .mob-lang-label{
    font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;
    color:rgba(255,255,255,0.3);
  }

  .mob-foot{
    margin-top:auto;padding-top:2.5rem;position:relative;z-index:1;
    display:flex;flex-direction:column;gap:14px;
  }
  .mob-cta{
    display:flex;align-items:center;justify-content:center;gap:6px;
    padding:18px 24px;background:var(--r);border-radius:14px;
    font-size:15px;font-weight:700;color:#fff;text-align:center;
    box-shadow:0 0 0 1px rgba(220,38,38,0.4),0 12px 40px rgba(220,38,38,0.28);
    transition:all .2s;
  }
  .mob-cta:hover{background:#ef4444}
  .mob-social{display:flex;gap:16px;align-items:center}
  .mob-social a{
    color:rgba(255,255,255,0.45);display:inline-flex;align-items:center;justify-content:center;
    transition:color .2s,transform .2s;
  }
  .mob-social a:hover{color:var(--r);transform:scale(1.1)}
  .mob-foot-info{
    display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;
    padding-top:.7rem;
  }
  .mob-foot-info span{
    font-size:11px;color:rgba(255,255,255,0.22);font-weight:500;
    letter-spacing:.02em;
  }
  .mob-foot-info .dot{
    width:5px;height:5px;border-radius:50%;background:#22c55e;display:inline-block;
    margin-right:5px;box-shadow:0 0 8px rgba(34,197,94,0.5);
  }

  /* IMPORTANTE: nascondi solo lo switch nella nav, non quello nel mobile menu */
  @media(max-width:768px){
    .nav-ul,.nav-btn{display:none!important}
    .nav > .nav-right > .lang{display:none!important}
    .burger{display:flex!important}
  }
`;

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const fn = () => setY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return y;
}

export function Navbar() {
  const y = useScrollY();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const locale = useLocale() as "it" | "en";
  const t = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();

  const NAV_LINKS = [
    { label: t("services"), href: "#services" },
    { label: t("process"), href: "#process" },
    { label: t("faq"), href: "#faq" },
    { label: t("contact"), href: "#contact" },
  ];

  const switchLang = (next: "it" | "en") => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <style>{S}</style>

      <nav className={`nav ${y > 40 ? "s" : ""}`}>
        <a href={`/${locale}`} className="nav-logo">
          <div className="nav-logo-box"><img src="/logo_small_trasparent.png" alt="miutifin" /></div>
          <span className="nav-logo-name">miutifin</span>
        </a>

        <ul className="nav-ul">
          {NAV_LINKS.map(l => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}
        </ul>

        <div className="nav-right">
          <div className="lang" role="group" aria-label={t("language")}>
            <span className={`lang-pill ${locale === "en" ? "en" : ""}`} aria-hidden />
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

          <a href="#contact" className="nav-btn">{t("cta")} →</a>

          <button
            className={`burger ${open ? "o" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label="menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mob-menu ${open ? "o" : ""}`}>
        <button className="mob-close" onClick={() => setOpen(false)} aria-label="close menu">✕</button>

        <div className="mob-eyebrow">{t("menu")}</div>

        <div className="mob-list">
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}>
              <span>{l.label}</span>
              <span className="arr">→</span>
            </a>
          ))}
        </div>

        <div className="mob-lang-row">
          <span className="mob-lang-label">{t("language")}</span>
          <div className="lang">
            <span className={`lang-pill ${locale === "en" ? "en" : ""}`} aria-hidden />
            <button
              type="button"
              className={locale === "it" ? "a" : ""}
              onClick={() => { switchLang("it"); setOpen(false); }}
              disabled={isPending}
            >IT</button>
            <button
              type="button"
              className={locale === "en" ? "a" : ""}
              onClick={() => { switchLang("en"); setOpen(false); }}
              disabled={isPending}
            >EN</button>
          </div>
        </div>

        <div className="mob-foot">
          <a href="#contact" onClick={() => setOpen(false)} className="mob-cta">
            {t("cta")} →
          </a>
          <SocialLinks className="mob-social" size={22} />
          <div className="mob-foot-info">
            <span><span className="dot" />{t("available")}</span>
            <span>{t("replyTime")}</span>
          </div>
        </div>
      </div>
    </>
  );
}