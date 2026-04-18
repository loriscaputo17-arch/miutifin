"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

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

  /* NAV */
  .nav{
    position:fixed;top:14px;left:50%;transform:translateX(-50%);
    z-index:200;width:calc(100% - 2rem);max-width:1200px;
    height:52px;padding:0 20px;
    display:flex;align-items:center;justify-content:space-between;
    border-radius:100px;
    background:rgba(10,10,10,0.6);
    border:1px solid rgba(255,255,255,0.08);
    backdrop-filter:blur(24px) saturate(180%);
    -webkit-backdrop-filter:blur(24px) saturate(180%);
    transition:background .3s,border-color .3s,box-shadow .3s,top .3s;
  }
  .nav.s{background:rgba(7,7,7,0.95);border-color:rgba(255,255,255,0.1);box-shadow:0 8px 48px rgba(0,0,0,0.65),inset 0 1px 0 rgba(255,255,255,0.04);top:10px}
  .nav-logo{display:flex;align-items:center;gap:9px;text-decoration:none}
  .nav-logo-box{width:30px;height:30px;border-radius:7px;background:var(--rg);border:1px solid rgba(220,38,38,0.28);display:flex;align-items:center;justify-content:center;overflow:hidden}
  .nav-logo-box img{width:18px;height:14px;object-fit:contain}
  .nav-logo-name{font-size:14px;font-weight:700;letter-spacing:-0.02em}
  .nav-ul{display:flex;gap:28px;list-style:none;align-items:center}
  .nav-ul a{font-size:13px;font-weight:500;color:var(--m);transition:color .2s}
  .nav-ul a:hover{color:var(--w)}
  .nav-btn{padding:8px 16px;border-radius:100px;background:var(--r);color:#fff;font-size:13px;font-weight:600;letter-spacing:-0.01em;transition:all .2s;box-shadow:0 0 20px rgba(220,38,38,0.2);white-space:nowrap}
  .nav-btn:hover{background:#ef4444;box-shadow:0 0 30px rgba(220,38,38,0.35);transform:translateY(-1px)}
  .burger{display:none;flex-direction:column;gap:5px;padding:8px;background:none;border:none;cursor:pointer;z-index:300}
  .burger span{display:block;width:20px;height:1.5px;background:#fff;transition:all .3s;transform-origin:center}
  .burger.o span:nth-child(1){transform:rotate(45deg) translate(4.5px,4.5px)}
  .burger.o span:nth-child(2){opacity:0;transform:scaleX(0)}
  .burger.o span:nth-child(3){transform:rotate(-45deg) translate(4.5px,-4.5px)}
  .mob-menu{position:fixed;inset:0;z-index:250;background:rgba(5,5,5,0.98);backdrop-filter:blur(28px);display:flex;flex-direction:column;padding:88px 2rem 2rem;transform:translateX(100%);transition:transform .42s cubic-bezier(.76,0,.24,1)}
  .mob-menu.o{transform:translateX(0)}
  .mob-menu a{font-size:clamp(2rem,7vw,3rem);font-weight:800;letter-spacing:-0.04em;color:rgba(255,255,255,0.1);padding:.35rem 0;border-bottom:1px solid var(--b2);transition:color .2s;display:block}
  .mob-menu a:hover{color:#fff}
  .mob-close{position:absolute;top:18px;right:18px;width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--m);font-size:20px;font-weight:300;transition:all .2s}
  .mob-close:hover{background:var(--rm);border-color:rgba(220,38,38,0.25);color:#fff}
  .mob-foot{margin-top:auto;padding-top:2rem}
  .mob-foot a{display:block;padding:15px 20px;background:var(--r);border-radius:14px;font-size:16px;font-weight:700;color:#fff;text-align:center}
  @media(max-width:768px){.nav-ul,.nav-btn{display:none!important}.burger{display:flex!important}}
`;

export function Navbar() {
    function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const fn = () => setY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return y;
}

  const y = useScrollY();
    const [open, setOpen] = useState(false);
    useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
    

  return (
    <>
    <style>{S}</style>

      <nav className={`nav ${y > 40 ? "s" : ""}`}>
        <a href="/" className="nav-logo">
          <div className="nav-logo-box"><img src="/logo_small_trasparent.png" alt="miutifin" /></div>
          <span className="nav-logo-name">miutifin</span>
        </a>
        <ul className="nav-ul">{NAV_LINKS.map(l => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}</ul>
        <a href="#contact" className="nav-btn hm">Start a project →</a>
        <button className={`burger ${open ? "o" : ""}`} onClick={() => setOpen(!open)} aria-label="menu"><span /><span /><span /></button>
      </nav>
      <div className={`mob-menu ${open ? "o" : ""}`}>
        <button className="mob-close" onClick={() => setOpen(false)}>✕</button>
        {NAV_LINKS.map(l => <a key={l.label} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>)}
        <div className="mob-foot"><a href="#contact" onClick={() => setOpen(false)}>Start a project →</a></div>
      </div>
    </>
  );
}
