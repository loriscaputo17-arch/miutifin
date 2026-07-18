"use client";

import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/homepage/Navbar";
import { Footer } from "@/components/homepage/Footer";

function useInView(threshold = 0.07) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const fn = () => setY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return y;
}

/* ── DATA ── */
const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

const CITIES = [
  { code: "LA", name: "Los Angeles", tag: "West Coast", lat: 34, lon: -118 },
  { code: "NY", name: "New York", tag: "East Coast", lat: 40, lon: -74 },
  { code: "SF", name: "San Francisco", tag: "Silicon Valley", lat: 37, lon: -122 },
  { code: "MCO", name: "Monaco", tag: "Riviera", lat: 43, lon: 7 },
  { code: "MIL", name: "Milano", tag: "Design Hub", lat: 45, lon: 9 },
  { code: "LDN", name: "London", tag: "Finance & Tech", lat: 51, lon: -0.1 },
  { code: "BCN", name: "Barcelona", tag: "Innovation", lat: 41, lon: 2 },
  { code: "BKK", name: "Bangkok", tag: "SE Asia", lat: 13, lon: 100 },
];

const MILESTONES = [
  { year: "2019", event: "The idea", desc: "A university student with a laptop, too many questions and a one-way ticket. The first client: a startup in Milan that needed a website and got a product strategy." },
  { year: "2020", event: "First team", desc: "Remote before remote was cool. A developer in London, a designer in Barcelona, a data scientist in San Francisco. The first distributed sprint." },
  { year: "2021", event: "First AI project", desc: "GPT-3 just dropped. We were already building with it. A US media company needed an intelligent content pipeline — we delivered in 6 weeks." },
  { year: "2022", event: "7 countries", desc: "From Bangkork to Monaco. Real teams, real timezone coverage. Not contractors — collaborators with skin in the game." },
  { year: "2023", event: "100+ projects", desc: "Software, AI, robotics, video generation, SEO. Startups, enterprises, university research labs. The portfolio spoke for itself." },
  { year: "2024", event: "AI-native rebrand", desc: "The agency didn't just adopt AI — it became it. Every workflow, every product, every client engagement touched by intelligence." },
  { year: "2025", icon: "◈", event: "Now", desc: "120+ projects, 7 countries, 94% retention. A community of the world's best builders, obsessed with what comes next." },
];

const PILLARS = [
  { icon: "⬡", title: "Real Tech", body: "We don't outsource to juniors. Every line of code, every architecture decision, every AI pipeline is crafted by senior engineers who've shipped things that matter." },
  { icon: "◈", title: "Real Marketing", body: "Growth that compounds. SEO, AI content, performance campaigns and brand positioning — built on data, not gut feelings and influencer deals." },
  { icon: "△", title: "Community-first", body: "Miutifin is a hub, not just an agency. A global network of devs, AI researchers, designers and strategists who collaborate because they want to, not because they're assigned." },
  { icon: "◎", title: "University ties", body: "We work with research labs and academic institutions — because the cutting edge of tech is still being written in university buildings." },
];

const MANIFESTO_LINES = [
  "We were tired of agencies that overpromise.",
  "Tired of code that no one wants to maintain.",
  "Tired of 'AI strategies' with nothing shipped.",
  "So we built the team we always wanted to hire.",
  "Distributed. Senior. Radically honest.",
  "That's Miutifin.",
];

/* ── STYLES ── */
const S = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --r:#dc2626; --rg:rgba(220,38,38,0.18); --rm:rgba(220,38,38,0.08);
    --w:#fff; --m:rgba(255,255,255,0.42); --d:rgba(255,255,255,0.18);
    --b:rgba(255,255,255,0.07); --b2:rgba(255,255,255,0.04);
    --bg:#080808; --bg2:#0d0d0d; --bg3:#111;
    --ff:'Syne',system-ui,sans-serif;
    --fb:'DM Sans',system-ui,sans-serif;
    --rad:14px; --rad2:20px;
  }
  html{scroll-behavior:smooth}
  body{background:var(--bg);color:var(--w);font-family:var(--fb);-webkit-font-smoothing:antialiased;overflow-x:hidden}
  ::selection{background:rgba(220,38,38,0.3)}
  a{text-decoration:none;color:inherit}
  button{font-family:var(--fb)}

  .nav-logo-box img {
        width: 18px;
        height: 14px;
        object-fit: contain;
    }

  /* ABOUT HERO */
  .about-hero{position:relative;min-height:100svh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:110px clamp(1rem,5vw,4rem) 80px;overflow:hidden}
  .ah-bg{position:absolute;inset:0;z-index:0;pointer-events:none}
  .ah-orb{position:absolute;border-radius:50%;background:radial-gradient(circle,var(--r) 0%,transparent 70%);filter:blur(100px)}
  .ah-orb.a{width:700px;height:700px;top:-300px;right:-200px;opacity:.08;animation:float1 20s ease-in-out infinite alternate}
  .ah-orb.b{width:500px;height:500px;bottom:-100px;left:-150px;opacity:.06;animation:float2 25s ease-in-out infinite alternate}
  .ah-orb.c{width:300px;height:300px;top:40%;left:50%;transform:translate(-50%,-50%);opacity:.04;animation:float1 15s ease-in-out infinite}
  @keyframes float1{0%{transform:translate(0,0) scale(1)}100%{transform:translate(40px,-30px) scale(1.1)}}
  @keyframes float2{0%{transform:translate(0,0)}100%{transform:translate(-30px,40px)}}
  .ah-grid{position:absolute;inset:0;z-index:1;background-image:linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse 80% 70% at 50% 40%,black 0%,transparent 100%)}
  .ah-inner{position:relative;z-index:2;max-width:900px;display:flex;flex-direction:column;align-items:center}
  .ah-eyebrow{display:inline-flex;align-items:center;gap:8px;padding:5px 14px;border-radius:100px;border:1px solid rgba(220,38,38,0.2);background:rgba(220,38,38,0.05);font-size:9px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:rgba(220,38,38,0.7);margin-bottom:2rem;font-family:var(--ff)}
  .ah-dot{width:5px;height:5px;border-radius:50%;background:var(--r);animation:pulse 2.2s infinite}
  @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.6)}}
  .ah-title{font-family:var(--ff);font-size:clamp(3rem,9vw,7rem);font-weight:800;letter-spacing:-0.055em;line-height:.92;color:#fff;margin-bottom:1.8rem}
  .ah-title .line2{display:block;background:linear-gradient(100deg,#ff3333 0%,#ff6b35 35%,#fff 60%,#ff3333 85%);background-size:220% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 4s linear infinite}
  @keyframes shimmer{0%{background-position:0% center}100%{background-position:220% center}}
  .ah-sub{font-size:clamp(1rem,1.8vw,1.1rem);color:rgba(255,255,255,0.35);line-height:1.8;max-width:540px;font-weight:300;font-style:italic;letter-spacing:.01em;margin-bottom:3rem}
  .ah-pill-row{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-bottom:2.5rem}
  .ah-pill{padding:6px 14px;border-radius:100px;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);font-size:11px;font-weight:600;color:rgba(255,255,255,0.35);font-family:var(--ff);letter-spacing:.05em;transition:all .25s}
  .ah-pill:hover{border-color:rgba(220,38,38,0.25);color:#fff;background:rgba(220,38,38,0.04)}
  .ah-scroll{position:absolute;bottom:28px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:6px;opacity:.08;z-index:2}
  .ah-scroll-line{width:1px;height:44px;background:linear-gradient(to bottom,transparent,#fff);animation:sd 2.4s ease-in-out infinite}
  @keyframes sd{0%{transform:scaleY(0);transform-origin:top;opacity:0}45%{opacity:1}100%{transform:scaleY(1);transform-origin:top;opacity:0}}
  .ah-scroll span{font-size:7px;letter-spacing:.3em;text-transform:uppercase;color:#fff}

  /* MANIFESTO */
  .manifesto{padding:clamp(5rem,10vw,9rem) clamp(1rem,5vw,4rem);background:var(--bg2);border-top:1px solid var(--b);border-bottom:1px solid var(--b);overflow:hidden}
  .manifesto-inner{max-width:1100px;margin:0 auto;display:flex;flex-direction:column;gap:0}
  .mf-line{display:flex;align-items:baseline;gap:clamp(.6rem,2vw,1.6rem);padding:clamp(.9rem,2vw,1.3rem) 0;border-bottom:1px solid rgba(255,255,255,0.03);opacity:0;transform:translateX(-30px);transition:opacity .7s ease,transform .7s ease}
  .mf-line.v{opacity:1;transform:translateX(0)}
  .mf-n{font-family:var(--ff);font-size:clamp(.55rem,.9vw,.7rem);font-weight:700;color:rgba(220,38,38,0.3);letter-spacing:.1em;min-width:28px;flex-shrink:0}
  .mf-text{font-family:var(--ff);font-size:clamp(1.6rem,4.5vw,3.8rem);font-weight:800;letter-spacing:-0.05em;line-height:1;color:rgba(255,255,255,0.12)}
  .mf-text.hl{color:#fff}
  .mf-text.hl2{background:linear-gradient(90deg,#dc2626,#ff6b35);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

  /* WRAP */
  .wrap{max-width:1200px;margin:0 auto;padding:0 clamp(1rem,5vw,3rem)}
  .sec{padding:clamp(5rem,10vw,8rem) 0}
  .sec-label{font-size:9px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--r);margin-bottom:14px;display:flex;align-items:center;gap:10px;font-family:var(--ff)}
  .sec-label::before{content:'';display:block;width:16px;height:1px;background:var(--r)}
  .sec-h2{font-family:var(--ff);font-size:clamp(2rem,4.5vw,3.4rem);font-weight:800;letter-spacing:-0.04em;line-height:1.02;color:#fff}

  /* FOUNDER SECTION */
  .founder-wrap{display:grid;grid-template-columns:1fr 1fr;gap:clamp(3rem,7vw,7rem);align-items:start;padding:clamp(5rem,10vw,8rem) 0}
  @media(max-width:860px){.founder-wrap{grid-template-columns:1fr}}
  .founder-sticky{position:sticky;top:100px}
  .founder-visual{aspect-ratio:3/4;border-radius:var(--rad2);background:var(--bg3);overflow:hidden;position:relative;margin-bottom:1.6rem}
  .founder-visual::after{content:'';position:absolute;inset:0;border:1px solid rgba(255,255,255,0.05);border-radius:var(--rad2)}
  .founder-ph{width:100%;height:100%;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
  .founder-ph-bg{position:absolute;inset:0;background:linear-gradient(160deg,#0f0f0f 0%,#1a0808 40%,#0a0808 100%)}
  .founder-ph-globe{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
  .globe-ring{position:absolute;border-radius:50%;border:1px solid rgba(220,38,38,0.07)}
  .globe-ring:nth-child(1){width:200px;height:200px;animation:spin 30s linear infinite}
  .globe-ring:nth-child(2){width:300px;height:300px;animation:spin 45s linear infinite reverse}
  .globe-ring:nth-child(3){width:400px;height:400px;animation:spin 60s linear infinite;border-color:rgba(220,38,38,0.04)}
  @keyframes spin{from{transform:rotate(0deg) rotateX(75deg)}to{transform:rotate(360deg) rotateX(75deg)}}
  .globe-center{position:relative;z-index:2;font-size:4rem;opacity:.06}
  .founder-city-dots{position:absolute;inset:0;z-index:3}
  .f-dot{position:absolute;width:6px;height:6px;border-radius:50%;background:var(--r);opacity:.5;transform:translate(-50%,-50%)}
  .f-dot::after{content:'';position:absolute;inset:-4px;border-radius:50%;border:1px solid rgba(220,38,38,0.3);animation:ripple 3s ease-out infinite}
  @keyframes ripple{0%{opacity:.6;transform:scale(1)}100%{opacity:0;transform:scale(2.5)}}
  .founder-tag{padding:11px 15px;background:rgba(6,6,6,0.9);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.06);border-radius:12px;display:flex;align-items:center;gap:11px}
  .founder-tag-dot{width:7px;height:7px;border-radius:50%;background:#22c55e;flex-shrink:0;box-shadow:0 0 8px #22c55e88;animation:pulse 2s infinite}
  .founder-tag-t{font-size:12px;font-weight:600;color:#fff;font-family:var(--ff)}
  .founder-tag-s{font-size:10px;color:var(--m);margin-top:1px}
  .founder-content .sec-h2{margin-bottom:1.4rem}
  .founder-p{font-size:14px;color:var(--m);line-height:1.9;letter-spacing:.005em;margin-bottom:1.2rem}
  .founder-p strong{color:rgba(255,255,255,0.75);font-weight:500}
  .founder-quote{margin:2rem 0;padding:1.4rem 1.6rem;background:rgba(220,38,38,0.03);border:1px solid rgba(220,38,38,0.1);border-radius:var(--rad);position:relative}
  .founder-quote::before{content:'"';position:absolute;top:-1rem;left:1.2rem;font-family:var(--ff);font-size:4rem;color:rgba(220,38,38,0.15);line-height:1}
  .founder-quote p{font-family:var(--ff);font-size:clamp(1.05rem,2vw,1.3rem);font-weight:700;letter-spacing:-0.03em;color:rgba(255,255,255,0.8);line-height:1.4}
  .founder-quote footer{margin-top:.8rem;font-size:10px;color:rgba(255,255,255,0.2);letter-spacing:.1em;text-transform:uppercase;font-family:var(--ff)}

  /* CITIES SECTION */
  .cities-sec{background:var(--bg2);border-top:1px solid var(--b);border-bottom:1px solid var(--b)}
  .cities-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.05);border-radius:var(--rad2);overflow:hidden;margin-top:2.5rem}
  @media(max-width:860px){.cities-grid{grid-template-columns:repeat(2,1fr)}}
  @media(max-width:440px){.cities-grid{grid-template-columns:1fr 1fr}}
  .city-card{background:var(--bg);padding:1.8rem 1.5rem;transition:background .3s;cursor:default;position:relative;overflow:hidden}
  .city-card:hover{background:rgba(220,38,38,0.03)}
  .city-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(220,38,38,0),transparent);transition:background .3s}
  .city-card:hover::before{background:linear-gradient(90deg,transparent,rgba(220,38,38,0.25),transparent)}
  .city-code{font-family:var(--ff);font-size:clamp(1.6rem,3vw,2.2rem);font-weight:800;letter-spacing:-0.05em;color:rgba(255,255,255,0.08);margin-bottom:.5rem;transition:color .3s}
  .city-card:hover .city-code{color:rgba(220,38,38,0.15)}
  .city-name{font-family:var(--ff);font-size:13px;font-weight:700;color:rgba(255,255,255,0.7);letter-spacing:-0.01em;margin-bottom:3px}
  .city-tag{font-size:10px;color:rgba(255,255,255,0.22);font-weight:500;letter-spacing:.05em}

  /* PILLARS */
  .pillars-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.05);border-radius:var(--rad2);overflow:hidden;margin-top:2.5rem}
  @media(max-width:640px){.pillars-grid{grid-template-columns:1fr}}
  .pillar-card{background:var(--bg);padding:2.2rem 2rem;transition:background .3s}
  .pillar-card:hover{background:rgba(220,38,38,0.03)}
  .pillar-icon{font-size:20px;color:rgba(220,38,38,0.18);margin-bottom:1rem;display:block;transition:color .3s}
  .pillar-card:hover .pillar-icon{color:rgba(220,38,38,0.35)}
  .pillar-t{font-family:var(--ff);font-size:15px;font-weight:800;letter-spacing:-0.03em;color:#fff;margin-bottom:.65rem}
  .pillar-d{font-size:13.5px;color:var(--m);line-height:1.8}

  /* TIMELINE */
  .tl{position:relative;margin-top:3rem;padding-left:2rem}
  .tl::before{content:'';position:absolute;left:0;top:0;bottom:0;width:1px;background:linear-gradient(to bottom,transparent,rgba(220,38,38,0.2) 10%,rgba(220,38,38,0.2) 90%,transparent)}
  .tl-item{position:relative;padding:0 0 2.8rem 2rem;opacity:0;transform:translateX(16px);transition:opacity .6s ease,transform .6s ease}
  .tl-item.v{opacity:1;transform:translateX(0)}
  .tl-item::before{content:'';position:absolute;left:-2rem;top:4px;width:9px;height:9px;border-radius:50%;background:var(--bg);border:1px solid rgba(220,38,38,0.3);transform:translateX(-4px)}
  .tl-item:hover::before{background:rgba(220,38,38,0.15);border-color:rgba(220,38,38,0.6)}
  .tl-year{font-family:var(--ff);font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:rgba(220,38,38,0.55);margin-bottom:5px}
  .tl-event{font-family:var(--ff);font-size:16px;font-weight:800;letter-spacing:-0.03em;color:#fff;margin-bottom:6px}
  .tl-desc{font-size:13px;color:var(--m);line-height:1.8;max-width:480px}

  /* COMMUNITY STRIP */
  .comm-strip{border-top:1px solid var(--b);border-bottom:1px solid var(--b);background:rgba(255,255,255,0.004);padding:3.5rem clamp(1rem,5vw,3rem)}
  .comm-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:clamp(2rem,5vw,5rem);align-items:center}
  @media(max-width:720px){.comm-inner{grid-template-columns:1fr;gap:2rem}}
  .comm-left h3{font-family:var(--ff);font-size:clamp(1.5rem,3vw,2.2rem);font-weight:800;letter-spacing:-0.04em;line-height:1.1;color:#fff;margin-bottom:.9rem}
  .comm-left p{font-size:13.5px;color:var(--m);line-height:1.8}
  .comm-tags{display:flex;flex-wrap:wrap;gap:8px}
  .comm-tag{padding:5px 12px;border-radius:6px;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);font-size:11px;font-weight:600;color:rgba(255,255,255,0.32);font-family:var(--ff);letter-spacing:.04em;transition:all .2s}
  .comm-tag:hover{border-color:rgba(220,38,38,0.2);color:rgba(255,255,255,0.7)}

  /* CTA SECTION */
  .about-cta{padding:clamp(5rem,10vw,9rem) clamp(1rem,5vw,3rem);text-align:center;position:relative;overflow:hidden}
  .about-cta-bg{position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 50%,rgba(220,38,38,0.06),transparent);pointer-events:none}
  .about-cta-inner{max-width:680px;margin:0 auto;position:relative;z-index:1}
  .about-cta h2{font-family:var(--ff);font-size:clamp(2rem,5vw,3.8rem);font-weight:800;letter-spacing:-0.05em;line-height:.98;color:#fff;margin-bottom:1.2rem}
  .about-cta h2 span{background:linear-gradient(90deg,#dc2626,#ff6b35);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
  .about-cta p{font-size:14px;color:var(--m);line-height:1.8;margin-bottom:2.2rem}
  .btn-r{padding:13px 28px;border-radius:12px;background:var(--r);color:#fff;font-weight:700;font-size:14px;letter-spacing:-0.01em;transition:all .2s;box-shadow:0 0 0 1px rgba(220,38,38,0.5),0 8px 32px rgba(220,38,38,0.26);display:inline-flex;align-items:center;gap:6px;font-family:var(--ff)}
  .btn-r:hover{background:#ef4444;transform:translateY(-2px);box-shadow:0 0 0 1px rgba(220,38,38,0.6),0 12px 40px rgba(220,38,38,0.36)}
  .btn-g{padding:13px 26px;border-radius:12px;border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);font-weight:500;font-size:14px;letter-spacing:-0.01em;transition:all .2s;display:inline-flex;align-items:center;gap:6px;font-family:var(--ff)}
  .btn-g:hover{border-color:rgba(255,255,255,0.22);color:#fff}
  .cta-btns{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}

  /* UTILS */
  .fade{transition:opacity .65s ease,transform .65s ease}
  .fade.h{opacity:0;transform:translateY(24px)}
  .fade.v{opacity:1;transform:translateY(0)}
  @media(max-width:768px){.hm{display:none!important}}
`;

/* ── FADE WRAPPER ── */
function Fade({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`fade ${inView ? "v" : "h"}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ── ABOUT HERO ── */
function AboutHero() {
  return (
    <section className="about-hero">
      <div className="ah-bg">
        <div className="ah-orb a" />
        <div className="ah-orb b" />
        <div className="ah-orb c" />
      </div>
      <div className="ah-grid" />
      <div className="ah-inner">
        <div className="ah-eyebrow"><span className="ah-dot" />Our story</div>
        <h1 className="ah-title">
          Born from<br />
          <span className="line2">curiosity & code.</span>
        </h1>
        <p className="ah-sub">
          A young traveler with a laptop and a vision — connecting the world&apos;s best builders to create things that actually matter.
        </p>
        <div className="ah-pill-row">
          {["LA", "New York", "San Francisco", "Monaco", "Milano", "London", "Barcelona", "Bangkok"].map(c => (
            <span key={c} className="ah-pill">{c}</span>
          ))}
        </div>
      </div>
      <div className="ah-scroll">
        <div className="ah-scroll-line" />
        <span>scroll</span>
      </div>
    </section>
  );
}

/* ── MANIFESTO ── */
function Manifesto() {
  const { ref, inView } = useInView(0.05);
  return (
    <div className="manifesto">
      <div ref={ref} className="manifesto-inner">
        {MANIFESTO_LINES.map((line, i) => (
          <div
            key={i}
            className={`mf-line ${inView ? "v" : ""}`}
            style={{ transitionDelay: `${i * 110}ms` }}
          >
            <span className="mf-n">0{i + 1}</span>
            <span className={`mf-text ${i === MANIFESTO_LINES.length - 1 ? "hl2" : i >= 3 ? "hl" : ""}`}>
              {line}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── FOUNDER ── */
function Founder() {
  const { ref, inView } = useInView();
  // Dots placed to vaguely represent world cities on a flat projection
  const dots = [
    { top: "42%", left: "22%" },  // LA
    { top: "38%", left: "28%" },  // NY
    { top: "44%", left: "19%" },  // SF
    { top: "36%", left: "53%" },  // Monaco
    { top: "35%", left: "52%" },  // Milano
    { top: "33%", left: "50%" },  // London
    { top: "36%", left: "51%" },  // Barcelona
    { top: "52%", left: "76%" },  // Bangkok
  ];
  return (
    <div style={{ background: "var(--bg)" }}>
      <div className="wrap">
        <div ref={ref} className="founder-wrap">
          {/* VISUAL */}
          <div
            className="founder-sticky"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: "opacity .8s ease .1s, transform .8s ease .1s" }}
          >
            <div className="founder-visual">
              <div className="founder-ph">
                <div className="founder-ph-bg" />
                <div className="founder-ph-globe">
                  <div className="globe-ring" />
                  <div className="globe-ring" />
                  <div className="globe-ring" />
                  <div className="globe-center">◈</div>
                </div>
                <div className="founder-city-dots">
                  {dots.map((d, i) => (
                    <div
                      key={i}
                      className="f-dot"
                      style={{ top: d.top, left: d.left, animationDelay: `${i * 0.4}s` }}
                    />
                  ))}
                </div>
              </div>
              <div className="founder-tag" style={{ position: "absolute", bottom: "1.2rem", left: "1.2rem", right: "1.2rem" }}>
                <div className="founder-tag-dot" />
                <div>
                  <div className="founder-tag-t">8 cities. 1 mission.</div>
                  <div className="founder-tag-s">Real tech, real people, real results</div>
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div
            className="founder-content"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: "opacity .8s ease .3s, transform .8s ease .3s" }}
          >
            <span className="sec-label">The origin</span>
            <h2 className="sec-h2" style={{ marginBottom: "1.6rem" }}>
              One idea,<br />
              <span style={{ color: "var(--r)" }}>one traveler,</span><br />
              seven countries.
            </h2>

            <p className="founder-p">
              Miutifin didn&apos;t start in a boardroom. It started in airports, co-working spaces, late-night calls between time zones and the shared obsession of people who believed <strong>technology should be built by those who truly love it.</strong>
            </p>
            <p className="founder-p">
              The founder — a young developer with a hunger for cultures and cutting-edge tech — spent years moving through the world&apos;s innovation hubs. <strong>Los Angeles, New York, San Francisco</strong> for the startup energy. <strong>Monaco and Milano</strong> for design and finance. <strong>London and Barcelona</strong> for talent and scale. <strong>Bangkok</strong> for speed and perspective.
            </p>
            <p className="founder-p">
              In every city, the same pattern: brilliant people doing mediocre work because the system around them wasn&apos;t built for excellence. Agencies bloated with account managers. Teams disconnected from clients. Junior developers shipped as senior. AI used as buzzword, not tool.
            </p>

            <div className="founder-quote">
              <p>&ldquo;I wanted to build the team I always wished I could hire. So I did.&rdquo;</p>
              <footer>— Miutifin founder</footer>
            </div>

            <p className="founder-p">
              The answer was a distributed community: <strong>senior developers, AI researchers, designers and strategists</strong> who operate across borders, cultures and disciplines — united by the belief that the best work happens when the right people are genuinely invested.
            </p>
            <p className="founder-p">
              Today that community spans universities, R&D labs, growth teams and product studios. <strong>Not a traditional agency. An innovation hub.</strong>
            </p>
            <a href="/#contact" className="btn-r" style={{ marginTop: "1rem", display: "inline-flex" }}>Join the mission →</a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── CITIES ── */
function Cities() {
  const { ref, inView } = useInView();
  return (
    <div className="cities-sec">
      <div className="wrap"><div className="sec">
        <Fade><span className="sec-label">Where we operate</span></Fade>
        <Fade delay={80}>
          <h2 className="sec-h2">
            Wherever tech<br />
            <span style={{ color: "var(--r)" }}>moves fastest.</span>
          </h2>
        </Fade>
        <Fade delay={120}>
          <p style={{ marginTop: ".8rem", fontSize: 14, color: "var(--m)", lineHeight: 1.8, maxWidth: 500 }}>
            Our presence isn&apos;t about flags on a slide. It&apos;s about people who grew up in those markets, understand the culture, and can execute without friction.
          </p>
        </Fade>
        <div ref={ref} className="cities-grid">
          {CITIES.map((c, i) => (
            <div
              key={c.code}
              className="city-card"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(18px)",
                transition: `opacity .5s ease ${i * 55}ms, transform .5s ease ${i * 55}ms`
              }}
            >
              <div className="city-code">{c.code}</div>
              <div className="city-name">{c.name}</div>
              <div className="city-tag">{c.tag}</div>
            </div>
          ))}
        </div>
      </div></div>
    </div>
  );
}

/* ── PILLARS ── */
function Pillars() {
  const { ref, inView } = useInView();
  return (
    <div style={{ background: "var(--bg)" }}>
      <div className="wrap"><div className="sec">
        <Fade><span className="sec-label">What we stand for</span></Fade>
        <Fade delay={80}>
          <h2 className="sec-h2">
            Not an agency.<br />
            <span style={{ color: "var(--r)" }}>A platform for builders.</span>
          </h2>
        </Fade>
        <div ref={ref} className="pillars-grid">
          {PILLARS.map((p, i) => (
            <div
              key={p.title}
              className="pillar-card"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(18px)",
                transition: `opacity .55s ease ${i * 90}ms, transform .55s ease ${i * 90}ms`
              }}
            >
              <span className="pillar-icon">{p.icon}</span>
              <div className="pillar-t">{p.title}</div>
              <p className="pillar-d">{p.body}</p>
            </div>
          ))}
        </div>
      </div></div>
    </div>
  );
}

/* ── TIMELINE ── */
function Timeline() {
  const { ref, inView } = useInView(0.05);
  return (
    <div style={{ background: "var(--bg2)", borderTop: "1px solid var(--b)", borderBottom: "1px solid var(--b)" }}>
      <div className="wrap"><div className="sec">
        <Fade><span className="sec-label">Our journey</span></Fade>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem,6vw,6rem)", alignItems: "start" }}>
          <div>
            <Fade delay={80}>
              <h2 className="sec-h2" style={{ marginBottom: "1.2rem" }}>
                From first commit<br />
                to <span style={{ color: "var(--r)" }}>120+ projects.</span>
              </h2>
            </Fade>
            <Fade delay={140}>
              <p style={{ fontSize: 14, color: "var(--m)", lineHeight: 1.8 }}>
                Every milestone earned in the field — not in pitch decks. Built client by client, country by country, commit by commit.
              </p>
            </Fade>
          </div>
          <div ref={ref} className="tl">
            {MILESTONES.map((m, i) => (
              <div
                key={m.year}
                className={`tl-item ${inView ? "v" : ""}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="tl-year">{m.year}</div>
                <div className="tl-event">{m.event}</div>
                <p className="tl-desc">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div></div>
    </div>
  );
}

/* ── COMMUNITY ── */
function Community() {
  const { ref, inView } = useInView();
  const tags = ["Senior Engineers","AI Researchers","Product Designers","Growth Hackers","Data Scientists","Roboticists","Embedded Systems","Creative Technologists","UX Architects","University Partners","Startup Founders","R&D Labs"];
  return (
    <div ref={ref} className="comm-strip" style={{ opacity: inView ? 1 : 0, transition: "opacity .7s ease" }}>
      <div className="comm-inner">
        <div className="comm-left">
          <h3>
            A hub for the<br />
            world&apos;s best builders.
          </h3>
          <p>
            Miutifin is more than a service. It&apos;s a community of experts who choose to collaborate because the work is interesting, the standards are high, and the ambition is shared. From university research labs to Silicon Valley startups — we are the connective tissue.
          </p>
        </div>
        <div className="comm-tags">
          {tags.map(t => <span key={t} className="comm-tag">{t}</span>)}
        </div>
      </div>
    </div>
  );
}

/* ── CTA ── */
function AboutCTA() {
  return (
    <div className="about-cta">
      <div className="about-cta-bg" />
      <div className="about-cta-inner">
        <Fade>
          <h2>
            Ready to build<br />
            <span>something real?</span>
          </h2>
        </Fade>
        <Fade delay={100}>
          <p>
            Free discovery call. No pitch decks, no account managers. Just a direct conversation with the people who will actually build it.
          </p>
        </Fade>
        <Fade delay={180}>
          <div className="cta-btns">
            <a href="/#contact" className="btn-r">Start a project →</a>
            <a href="/" className="btn-g">See our work</a>
          </div>
        </Fade>
      </div>
    </div>
  );
}

/* ── PAGE ── */
export default function AboutPage() {
  return (
    <>
      <style>{S}</style>
      <main style={{ background: "var(--bg)", color: "var(--w)", overflowX: "hidden" }}>
        <Navbar />
        <AboutHero />
        <Manifesto />
        <Founder />
        <Cities />
        <Pillars />
        <Timeline />
        <Community />
        <AboutCTA />
        <Footer />
      </main>
    </>
  );
}