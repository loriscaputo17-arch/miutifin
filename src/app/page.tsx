"use client";

import React, { useEffect, useRef, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

function useInView(threshold = 0.08) {
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
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  { icon: "◈", title: "Software Development", desc: "Production-grade web apps, mobile, APIs and cloud-native architectures. Code built to scale — not just to ship.", tag: "Engineering" },
  { icon: "⬡", title: "Artificial Intelligence", desc: "LLM integration, autonomous agents, fine-tuning, RAG pipelines and intelligent automation that works in production.", tag: "AI / ML" },
  { icon: "△", title: "Algorithms & Data", desc: "ETL pipelines, recommendation engines, predictive analytics and real-time dashboards.", tag: "Data Science" },
  { icon: "◎", title: "Robotics & Automation", desc: "Embedded systems, ROS 2, computer vision and industrial automation.", tag: "Robotics" },
  { icon: "▣", title: "Video AI & Generative", desc: "Synthetic avatars, voice cloning, AI video generation and automated creative pipelines at scale.", tag: "Generative AI" },
  { icon: "◇", title: "SEO & Digital Marketing", desc: "Technical SEO, AI-driven content strategy, performance campaigns and growth hacking.", tag: "Growth" },
  { icon: "⬘", title: "Startup Support", desc: "MVP in weeks. Scalable architecture, technical pitch decks and hands-on mentoring.", tag: "Ventures" },
  { icon: "◰", title: "Digital Strategy", desc: "Transformation roadmaps, tech advisory and competitive positioning.", tag: "Strategy" },
  { icon: "⬟", title: "UX / UI Design", desc: "Interfaces that convert. Design systems, rapid prototyping and CRO optimisation.", tag: "Design" },
];

const STATS = [
  { value: "120+", label: "Projects shipped" },
  { value: "7", label: "Countries" },
  { value: "98%", label: "Retention rate" },
  { value: "6×", label: "Avg. client ROI" },
];

const COUNTRIES = [
  { flag: "🇺🇸", name: "USA" }, { flag: "🇦🇺", name: "Australia" },
  { flag: "🇬🇧", name: "UK" }, { flag: "🇩🇪", name: "Germany" },
  { flag: "🇫🇷", name: "France" }, { flag: "🇪🇸", name: "Spain" }, { flag: "🇮🇹", name: "Italy" },
];

const PROCESS = [
  { n: "01", title: "Discovery", desc: "Free 30-min call. We analyse your goals, stack and market — and give you an honest assessment." },
  { n: "02", title: "Architecture", desc: "Scalable, secure, performance-first. No tech debt baked in from day one." },
  { n: "03", title: "Build & Iterate", desc: "Weekly sprints, live demos, tight feedback loops. You always know what's happening." },
  { n: "04", title: "Launch & Scale", desc: "We don't vanish post-launch. Monitoring, optimisation and support — as long as you need it." },
];

const PROBLEMS = [
  { bad: "Agency ghosts you mid-project", good: "Dedicated senior lead from day one. Direct access, no account managers." },
  { bad: "Codebase nobody wants to touch", good: "Production-grade code with docs, tests and architecture that scales." },
  { bad: "AI buzzwords, nothing shipped", good: "We deploy AI where it creates real value — and tell you honestly when it doesn't." },
  { bad: "Offshore team, timezone hell", good: "7-country network. Overlap with any timezone. Async by design, responsive by culture." },
];

const FAQS = [
  { q: "Why are you different from other agencies?", a: "You work directly with senior engineers, designers and strategists — not account managers who relay messages. We're in 7 countries, which means faster delivery, competitive pricing and genuine market insight wherever you operate." },
  { q: "How long does it take to build an MVP?", a: "3–6 weeks for most projects. We've done it faster with tight scope. After a discovery call we give you a precise estimate — not a range designed to protect us." },
  { q: "How do you keep costs competitive globally?", a: "Our distributed model matches the right talent to each task regardless of geography. Senior architects in Europe, execution strength where it makes sense, local insight everywhere. A-players, not interns." },
  { q: "Do you work with early-stage startups?", a: "It's one of our core focuses. 40+ founders supported from first commit to funding round. We know what investors look for in a technical stack and team." },
  { q: "How does onboarding work?", a: "Free discovery call → detailed proposal with fixed costs and timeline → first sprint starts within 48h. No hourly billing surprises." },
  { q: "What does post-launch support look like?", a: "Active monitoring, critical bug fixes, infrastructure optimisation and feature development based on real user data. Monthly plans, no lock-in." },
];

const TECH_TAGS = ["Next.js","React","Python","TensorFlow","PyTorch","OpenAI API","LangChain","ROS 2","Node.js","Supabase","PostgreSQL","Docker","Kubernetes","AWS","Vercel","n8n","Stable Diffusion","Runway ML","HeyGen","Whisper","GPT-4o","Claude API","Figma","Framer"];

/* ── STYLES ── */
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

  /* HERO */
  .hero{position:relative;min-height:100svh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:100px clamp(1rem,5vw,4rem) 80px;overflow:hidden}
  .hero-bg{position:absolute;inset:0;z-index:0;pointer-events:none}
  .hero-bg-dot{
    position:absolute;border-radius:50%;
    background:radial-gradient(circle,var(--r) 0%,transparent 70%);
    opacity:0.12;filter:blur(80px);
  }
  .hero-bg-dot.a{width:600px;height:600px;top:-200px;left:-100px;animation:hbm 18s ease-in-out infinite alternate}
  .hero-bg-dot.b{width:500px;height:400px;top:10%;right:-150px;animation:hbm 22s ease-in-out infinite alternate-reverse;opacity:.09}
  .hero-bg-dot.c{width:400px;height:400px;bottom:-100px;left:35%;animation:hbm 16s ease-in-out infinite alternate;opacity:.07}
  @keyframes hbm{0%{transform:translate(0,0)}50%{transform:translate(30px,-25px)}100%{transform:translate(-20px,30px)}}
  .hero-noise{position:absolute;inset:0;z-index:1;opacity:.022;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
  .hero-grid{position:absolute;inset:0;z-index:1;background-image:linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px);background-size:56px 56px;mask-image:radial-gradient(ellipse 70% 60% at 50% 50%,black,transparent)}
  .hero-inner{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;max-width:900px}
  .hero-eyebrow{display:inline-flex;align-items:center;gap:8px;padding:5px 13px;border-radius:100px;border:1px solid rgba(220,38,38,0.2);background:rgba(220,38,38,0.05);font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(220,38,38,0.8);margin-bottom:1.8rem}
  .hero-dot{width:5px;height:5px;border-radius:50%;background:var(--r);animation:pd 2s infinite}
  @keyframes pd{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}
  .hero-h1{font-size:clamp(3.2rem,9vw,7.5rem);font-weight:900;letter-spacing:-0.055em;line-height:.92;color:#fff;margin-bottom:1.6rem}
  .hero-h1 em{font-style:normal;background:linear-gradient(90deg,#ff3333 0%,#ff6b35 30%,#fff 55%,#ff3333 80%,#ff6b35 100%);background-size:220% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:sh 3s linear infinite}
  @keyframes sh{0%{background-position:0% center}100%{background-position:220% center}}
  .hero-sub{font-size:clamp(1rem,1.8vw,1.12rem);color:rgba(255,255,255,0.38);line-height:1.75;max-width:520px;letter-spacing:-0.01em;margin-bottom:2.2rem}
  .hero-cta-row{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
  .btn-r{padding:13px 26px;border-radius:12px;background:var(--r);color:#fff;font-weight:700;font-size:14px;letter-spacing:-0.01em;transition:all .2s;box-shadow:0 0 0 1px rgba(220,38,38,0.5),0 8px 32px rgba(220,38,38,0.26);display:inline-flex;align-items:center;gap:6px}
  .btn-r:hover{background:#ef4444;transform:translateY(-2px);box-shadow:0 0 0 1px rgba(220,38,38,0.6),0 12px 40px rgba(220,38,38,0.36)}
  .btn-g{padding:13px 26px;border-radius:12px;border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);font-weight:500;font-size:14px;letter-spacing:-0.01em;transition:all .2s;display:inline-flex;align-items:center;gap:6px}
  .btn-g:hover{border-color:rgba(255,255,255,0.2);color:#fff}
  .hero-proof{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:18px;margin-top:2.2rem;font-size:11px;font-weight:600;color:rgba(255,255,255,0.2);letter-spacing:.02em}
  .hero-proof-sep{width:1px;height:12px;background:var(--b)}
  .hero-scroll{position:absolute;bottom:26px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:5px;opacity:.1;z-index:2}
  .hero-scroll-line{width:1px;height:40px;background:linear-gradient(to bottom,transparent,#fff);animation:sd 2.2s ease-in-out infinite}
  @keyframes sd{0%{transform:scaleY(0);transform-origin:top;opacity:0}45%{opacity:1}100%{transform:scaleY(1);transform-origin:top;opacity:0}}

  /* MARQUEE */
  .mq-wrap{padding:16px 0;overflow:hidden;border-top:1px solid var(--b);border-bottom:1px solid var(--b);background:rgba(255,255,255,0.006)}
  .mq-track{display:flex;gap:40px;white-space:nowrap;animation:mq 38s linear infinite}
  .mq-item{flex-shrink:0;font-size:9px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,0.11);display:flex;align-items:center;gap:12px}
  .mq-item::before{content:'◆';font-size:4px;color:rgba(220,38,38,0.28)}
  @keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}

  /* SECTION WRAPPER */
  .wrap{max-width:1200px;margin:0 auto;padding:0 clamp(1rem,5vw,3rem)}
  .sec{padding:clamp(5rem,10vw,8rem) 0}
  .sec-label{font-size:10px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--r);margin-bottom:14px;display:flex;align-items:center;gap:10px}
  .sec-label::before{content:'';display:block;width:16px;height:1px;background:var(--r)}
  .sec-h2{font-size:clamp(2rem,4.5vw,3.4rem);font-weight:800;letter-spacing:-0.04em;line-height:1.02;color:#fff}
  .sec-sub{font-size:14px;color:var(--m);line-height:1.75;max-width:440px;letter-spacing:-0.01em}

  /* FULL-WIDTH SECTION BG */
  .sec-full{background:var(--bg)}
  .sec-alt{background:var(--bg2)}

  /* PROBLEM BENTO */
  .prob-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.05);border-radius:var(--rad2);overflow:hidden;margin-top:3rem}
  @media(max-width:680px){.prob-grid{grid-template-columns:1fr}}
  .prob-card{background:var(--bg);padding:2rem;transition:background .3s}
  .prob-card:hover{background:rgba(220,38,38,0.025)}
  .prob-bad{font-size:13px;color:rgba(255,100,100,0.45);line-height:1.6;margin-bottom:.9rem;padding-left:1.2rem;position:relative}
  .prob-bad::before{content:'✕';position:absolute;left:0;color:rgba(220,38,38,0.35);font-size:10px;top:2px}
  .prob-good{font-size:14px;color:rgba(255,255,255,0.82);line-height:1.65;font-weight:500;letter-spacing:-0.01em;padding-left:1.2rem;position:relative}
  .prob-good::before{content:'✓';position:absolute;left:0;color:#4ade80;font-size:10px;top:3px}

  /* SERVICES — EL-style big bento */
  .svc-head{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1.5rem;margin-bottom:3rem}
  .svc-bento{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.05);border-radius:var(--rad2);overflow:hidden}
  @media(max-width:900px){.svc-bento{grid-template-columns:repeat(2,1fr)}}
  @media(max-width:540px){.svc-bento{grid-template-columns:1fr}}
  .svc-card{background:var(--bg);padding:2rem;position:relative;overflow:hidden;transition:background .3s;cursor:default}
  .svc-card:hover{background:rgba(220,38,38,0.04)}
  .svc-card:first-child{grid-column:span 2}
  @media(max-width:540px){.svc-card:first-child{grid-column:span 1}}
  .svc-tag{display:inline-block;padding:2px 9px;border-radius:100px;font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(220,38,38,0.55);background:rgba(220,38,38,0.06);margin-bottom:14px}
  .svc-icon{font-size:24px;color:rgba(255,255,255,0.04);margin-bottom:10px;display:block;transition:color .3s}
  .svc-card:hover .svc-icon{color:rgba(220,38,38,0.2)}
  .svc-title{font-size:14px;font-weight:700;letter-spacing:-0.02em;color:#fff;margin-bottom:7px}
  .svc-desc{font-size:13px;color:var(--m);line-height:1.7}
  .svc-arr{position:absolute;bottom:1.2rem;right:1.4rem;font-size:12px;color:rgba(255,255,255,0.05);transition:all .3s}
  .svc-card:hover .svc-arr{color:rgba(220,38,38,0.28);transform:translate(2px,-2px)}

  /* STATS STRIP */
  .stats-row{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--b);border-bottom:1px solid var(--b)}
  @media(max-width:600px){.stats-row{grid-template-columns:repeat(2,1fr)}}
  .stat{padding:2.8rem 0;text-align:center;border-right:1px solid var(--b);position:relative;overflow:hidden}
  .stat:last-child{border-right:none}
  .stat::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:36px;height:1px;background:var(--r);opacity:0;transition:opacity .4s}
  .stat:hover::before{opacity:1}
  @media(max-width:600px){.stat:nth-child(2){border-right:none}.stat:nth-child(3){border-top:1px solid var(--b)}.stat:nth-child(4){border-top:1px solid var(--b)}}
  .stat-n{font-size:clamp(2.6rem,5.5vw,4rem);font-weight:800;letter-spacing:-0.055em;color:#fff;line-height:1}
  .stat-l{margin-top:7px;font-size:11px;font-weight:500;color:var(--m);letter-spacing:.02em}

  /* COUNTRIES */
  .countries-sec{border-top:1px solid var(--b);border-bottom:1px solid var(--b);background:rgba(255,255,255,0.004)}
  .countries-inner{max-width:1200px;margin:0 auto;padding:2.5rem clamp(1rem,5vw,3rem);display:flex;flex-direction:column;align-items:center;gap:1.4rem}
  .countries-l{font-size:10px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,0.18)}
  .countries-pills{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
  .c-pill{display:flex;align-items:center;gap:7px;padding:6px 14px;border-radius:100px;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);font-size:12px;font-weight:600;color:rgba(255,255,255,0.4);transition:all .2s}
  .c-pill:hover{border-color:rgba(220,38,38,0.22);color:#fff;background:rgba(220,38,38,0.03)}

  /* PROCESS TIMELINE */
  .proc-grid{display:grid;grid-template-columns:repeat(4,1fr);margin-top:3rem}
  @media(max-width:880px){.proc-grid{grid-template-columns:repeat(2,1fr)}}
  @media(max-width:540px){.proc-grid{grid-template-columns:1fr}}
  .proc-card{padding:2rem;border:1px solid var(--b);margin:-1px 0 0 -1px;background:var(--bg);transition:background .3s,border-color .3s;position:relative}
  .proc-card:hover{background:rgba(220,38,38,0.025);border-color:rgba(220,38,38,0.12);z-index:1}
  .proc-n-bg{font-size:2.8rem;font-weight:800;letter-spacing:-0.06em;color:rgba(255,255,255,0.028);line-height:1;margin-bottom:.9rem}
  .proc-pill{width:32px;height:32px;border-radius:50%;border:1px solid rgba(220,38,38,0.2);display:flex;align-items:center;justify-content:center;margin-bottom:1.1rem;font-size:9px;font-weight:700;color:var(--r)}
  .proc-t{font-size:15px;font-weight:700;letter-spacing:-0.02em;color:#fff;margin-bottom:7px}
  .proc-d{font-size:13px;color:var(--m);line-height:1.7}

  /* TWO-COL SECTIONS */
  .split{display:grid;grid-template-columns:1fr 1fr;gap:clamp(2.5rem,6vw,6rem);align-items:center;padding:clamp(5rem,10vw,8rem) 0}
  .split.rev{direction:rtl}
  .split.rev>*{direction:ltr}
  @media(max-width:860px){.split,.split.rev{grid-template-columns:1fr;direction:ltr}}
  .split-visual{position:relative;border-radius:var(--rad2);overflow:hidden;aspect-ratio:4/3;background:var(--bg3)}
  .split-visual::after{content:'';position:absolute;inset:0;border:1px solid rgba(255,255,255,0.055);border-radius:var(--rad2);pointer-events:none}
  .split-ph{width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b0b;position:relative;overflow:hidden}
  .split-ph::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.006) 2px,rgba(255,255,255,0.006) 4px)}
  .split-ph::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 75% 55% at 50% 40%,rgba(220,38,38,0.07),transparent)}
  .split-ph-sym{font-size:60px;opacity:.04;position:relative;z-index:1}
  .split-fc{position:absolute;bottom:1.2rem;left:1.2rem;right:1.2rem;padding:11px 15px;background:rgba(6,6,6,0.88);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.06);border-radius:11px;display:flex;align-items:center;gap:11px;z-index:2}
  .split-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;animation:pd 2s infinite}
  .split-ft{font-size:12px;font-weight:600;color:#fff;letter-spacing:-0.01em}
  .split-fs{font-size:10px;color:var(--m);margin-top:1px}
  .split-content{}
  .split-content .sec-h2{margin-bottom:1rem}
  .split-p{font-size:14px;color:var(--m);line-height:1.8;letter-spacing:-0.01em;margin-bottom:1.5rem}

  /* WHY GRID */
  .why-g{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.05);border-radius:18px;overflow:hidden;margin-top:2.5rem}
  @media(max-width:860px){.why-g{grid-template-columns:repeat(2,1fr)}}
  @media(max-width:520px){.why-g{grid-template-columns:1fr}}
  .why-card{background:var(--bg);padding:1.6rem;transition:background .3s}
  .why-card:hover{background:rgba(220,38,38,0.03)}
  .why-icon{font-size:18px;color:rgba(220,38,38,0.2);margin-bottom:.7rem;display:block}
  .why-t{font-size:13px;font-weight:700;letter-spacing:-0.02em;color:#fff;margin-bottom:5px}
  .why-d{font-size:12px;color:var(--m);line-height:1.7}

  /* STARTUP MINI CARDS */
  .mini-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:1.6rem}
  .mini-card{padding:.9rem 1.1rem;border-radius:10px;border:1px solid rgba(255,255,255,0.05);background:rgba(255,255,255,0.016)}
  .mini-v{font-size:18px;font-weight:800;letter-spacing:-0.04em;color:#fff;margin-bottom:3px}
  .mini-l{font-size:10px;color:var(--m);font-weight:700;letter-spacing:.06em;text-transform:uppercase}

  /* FAQ */
  .faq-list{margin-top:2rem}
  .faq-item{border-bottom:1px solid rgba(255,255,255,0.05)}
  .faq-q{width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:1.25rem 0;display:flex;align-items:center;justify-content:space-between;gap:16px;color:#fff;font-size:14px;font-weight:600;letter-spacing:-0.015em;line-height:1.4;transition:color .2s}
  .faq-q:hover{color:rgba(255,255,255,0.65)}
  .faq-ico{flex-shrink:0;width:24px;height:24px;border-radius:50%;border:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:300;color:var(--m);transition:all .3s;line-height:1}
  .faq-ico.o{transform:rotate(45deg);border-color:rgba(220,38,38,0.38);color:var(--r)}
  .faq-a{overflow:hidden;max-height:0;transition:max-height .4s ease,padding .3s}
  .faq-a.o{max-height:280px;padding-bottom:1.2rem}
  .faq-a p{font-size:13px;color:var(--m);line-height:1.8}

  /* CONTACT */
  .contact-wrap{max-width:680px;margin:0 auto}
  .contact-head{text-align:center;margin-bottom:2.2rem}
  .c-form{background:rgba(255,255,255,0.016);border:1px solid rgba(255,255,255,0.04);border-radius:22px;padding:clamp(1.8rem,4vw,3rem)}
  .c-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
  @media(max-width:580px){.c-row{grid-template-columns:1fr}}
  .c-field{display:flex;flex-direction:column;gap:7px;margin-bottom:15px}
  .c-label{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,0.2)}
  .c-label .req{color:var(--r);margin-left:2px}
  .c-input,.c-ta{background:rgba(255,255,255,0.026);border:1px solid rgba(255,255,255,0.048);border-radius:10px;padding:11px 14px;font-size:14px;font-family:var(--f);color:#fff;outline:none;width:100%;transition:border-color .2s,background .2s;-webkit-appearance:none;letter-spacing:-0.01em}
  .c-input::placeholder,.c-ta::placeholder{color:rgba(255,255,255,0.1)}
  .c-input:hover,.c-ta:hover{border-color:rgba(255,255,255,0.08);background:rgba(255,255,255,0.032)}
  .c-input:focus,.c-ta:focus{border-color:rgba(220,38,38,0.3);background:rgba(220,38,38,0.02);box-shadow:0 0 0 3px rgba(220,38,38,0.05)}
  .c-ta{resize:none;line-height:1.65}
  .c-privacy{font-size:11px;color:rgba(255,255,255,0.15);line-height:1.6;margin:0 0 16px}
  .c-privacy a{color:rgba(255,255,255,0.28);text-decoration:underline;text-underline-offset:2px}
  .c-submit{width:100%;padding:15px 24px;border-radius:12px;background:var(--r);border:none;color:#fff;font-family:var(--f);font-size:14px;font-weight:700;letter-spacing:-0.01em;cursor:pointer;transition:all .2s;box-shadow:0 0 0 1px rgba(220,38,38,0.38),0 8px 32px rgba(220,38,38,0.16)}
  .c-submit:hover:not(:disabled){background:#ef4444;transform:translateY(-2px);box-shadow:0 0 0 1px rgba(220,38,38,0.5),0 12px 40px rgba(220,38,38,0.26)}
  .c-submit:disabled{opacity:.55;cursor:not-allowed}
  .c-success{text-align:center;padding:5rem 2rem;border:1px solid rgba(255,255,255,0.04);border-radius:22px;background:rgba(255,255,255,0.016)}
  .c-success-icon{width:58px;height:58px;border-radius:50%;background:rgba(220,38,38,0.07);border:1px solid rgba(220,38,38,0.16);display:flex;align-items:center;justify-content:center;margin:0 auto 1.3rem;font-size:22px;color:var(--r)}

  /* FOOTER */
  .footer{border-top:1px solid var(--b);padding:clamp(3rem,6vw,5rem) clamp(1rem,5vw,3rem) clamp(1.3rem,3vw,2rem)}
  .footer-inner{max-width:1200px;margin:0 auto}
  .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1.2fr;gap:clamp(2rem,5vw,4rem);padding-bottom:2.8rem;border-bottom:1px solid var(--b)}
  @media(max-width:860px){.footer-grid{grid-template-columns:1fr 1fr}}
  @media(max-width:520px){.footer-grid{grid-template-columns:1fr}}
  .f-brand-tag{font-size:1.45rem;font-weight:800;letter-spacing:-0.04em;color:#fff;line-height:1.15;margin:1.1rem 0 .85rem}
  .f-brand-tag span{color:var(--r)}
  .f-brand-desc{font-size:13px;color:rgba(255,255,255,0.24);line-height:1.8;max-width:270px}
  .f-col-title{font-size:10px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,0.16);margin-bottom:1rem}
  .f-links{list-style:none;display:flex;flex-direction:column;gap:8px}
  .f-links a{font-size:13px;color:rgba(255,255,255,0.28);transition:color .2s;letter-spacing:-0.01em}
  .f-links a:hover{color:#fff}
  .f-ci{display:flex;align-items:flex-start;gap:9px;margin-bottom:11px}
  .f-ci-icon{width:26px;height:26px;border-radius:6px;background:rgba(220,38,38,0.05);border:1px solid rgba(220,38,38,0.1);display:flex;align-items:center;justify-content:center;font-size:10px;flex-shrink:0;margin-top:1px;color:var(--r)}
  .f-ci-l{font-size:10px;color:rgba(255,255,255,0.2);margin-bottom:2px;font-weight:600;letter-spacing:.05em;text-transform:uppercase}
  .f-ci-v{font-size:13px;color:rgba(255,255,255,0.55);letter-spacing:-0.01em}
  .f-ci-v a{color:rgba(255,255,255,0.55);transition:color .2s}
  .f-ci-v a:hover{color:#fff}
  .f-social{display:flex;gap:7px;margin-top:1.3rem}
  .f-social a{width:28px;height:28px;border-radius:6px;border:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;font-size:11px;color:rgba(255,255,255,0.25);font-weight:700;transition:all .2s}
  .f-social a:hover{border-color:rgba(220,38,38,0.26);color:var(--r);background:rgba(220,38,38,0.04)}
  .f-bottom{padding-top:1.3rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px}
  .f-copy{font-size:11px;color:rgba(255,255,255,0.13);letter-spacing:-0.01em}
  .f-built{font-size:11px;color:rgba(255,255,255,0.1);display:flex;align-items:center;gap:5px}
  .f-built span{color:var(--r);font-size:9px}

  /* UTILS */
  .fade{transition:opacity .65s ease,transform .65s ease}
  .fade.h{opacity:0;transform:translateY(28px)}
  .fade.v{opacity:1;transform:translateY(0)}
  @media(max-width:768px){.hm{display:none!important}}
`;

/* ── NAV ── */
function Navbar() {
  const y = useScrollY();
  const [open, setOpen] = useState(false);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  return (
    <>
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

/* ── HERO ── */
function Hero() {
  const [wi, setWi] = useState(0);
  const [fade, setFade] = useState(true);
  const words = ["Artificial Intelligence", "Software Engineering", "Robotics & Automation", "Video AI & Generative", "Growth & SEO", "Data Science", "Startup Support"];
  useEffect(() => {
    const iv = setInterval(() => { setFade(false); setTimeout(() => { setWi(i => (i + 1) % words.length); setFade(true); }, 300); }, 2800);
    return () => clearInterval(iv);
  }, []);
  return (
    <section className="hero">
      <div className="hero-bg"><div className="hero-bg-dot a" /><div className="hero-bg-dot b" /><div className="hero-bg-dot c" /></div>
      <div className="hero-noise" /><div className="hero-grid" />
      <div className="hero-inner">
        <div className="hero-eyebrow"><span className="hero-dot" />Global Tech Team · 7 Countries · AI-Native</div>
        <h1 className="hero-h1">
          Stop settling.<br />
          Build with <em style={{ opacity: fade ? 1 : 0, transform: fade ? "translateY(0)" : "translateY(10px)", display: "inline-block", transition: "opacity .3s, transform .3s" }}>{words[wi]}</em>
        </h1>
        <p className="hero-sub">Most agencies overpromise, underdeliver and disappear. We&apos;re a distributed senior team across 7 countries — fast, AI-native and radically transparent. Competitive pricing. Zero compromise on quality.</p>
        <div className="hero-cta-row">
          <a href="#contact" className="btn-r">Get a free discovery call</a>
          <a href="#services" className="btn-g">See what we build →</a>
        </div>
        <div className="hero-proof">
          <span>✓ 120+ projects</span><div className="hero-proof-sep hm" />
          <span>✓ 7 countries</span><div className="hero-proof-sep hm" />
          <span>✓ 98% retention</span><div className="hero-proof-sep hm" />
          <span>✓ Reply in 24h</span>
        </div>
      </div>
      <div className="hero-scroll"><div className="hero-scroll-line" /><span style={{ fontSize: 8, letterSpacing: ".25em", textTransform: "uppercase" }}>scroll</span></div>
    </section>
  );
}

/* ── MARQUEE ── */
function Marquee() {
  const items = [...TECH_TAGS, ...TECH_TAGS];
  return <div className="mq-wrap"><div className="mq-track">{items.map((t, i) => <span key={i} className="mq-item">{t}</span>)}</div></div>;
}

/* ── FADE WRAPPER ── */
function Fade({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`fade ${inView ? "v" : "h"}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ── PROBLEM SECTION ── */
function ProblemSection() {
  const { ref, inView } = useInView();
  return (
    <div className="sec-full">
      <div className="wrap"><div className="sec">
        <Fade><span className="sec-label">The real problem</span></Fade>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem", marginBottom: "3rem" }}>
          <Fade><h2 className="sec-h2">You&apos;ve been burned<br />by bad tech partners.</h2></Fade>
          <Fade delay={100}><p className="sec-sub">Unreliable agencies, low-quality code and non-scalable tech are killing great ideas. Here&apos;s what changes with us.</p></Fade>
        </div>
        <div ref={ref} className="prob-grid">
          {PROBLEMS.map((p, i) => (
            <div key={i} className="prob-card" style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(18px)", transition: `opacity .55s ease ${i * 80}ms, transform .55s ease ${i * 80}ms` }}>
              <p className="prob-bad">{p.bad}</p>
              <p className="prob-good">{p.good}</p>
            </div>
          ))}
        </div>
      </div></div>
    </div>
  );
}

/* ── SERVICES ── */
function Services() {
  const { ref, inView } = useInView();
  return (
    <div className="sec-alt">
      <div className="wrap"><div className="sec" id="services">
        <div className="svc-head">
          <div>
            <Fade><span className="sec-label">What we build</span></Fade>
            <Fade delay={80}><h2 className="sec-h2">Every capability<br />under one roof.</h2></Fade>
          </div>
          <Fade delay={160}><p className="sec-sub">From AI agents to robotics, growth hacking to design systems — senior talent across every discipline, available now.</p></Fade>
        </div>
        <div ref={ref} className="svc-bento">
          {SERVICES.map((s, i) => (
            <div key={s.title} className="svc-card" style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(18px)", transition: `opacity .5s ease ${i * 40}ms, transform .5s ease ${i * 40}ms` }}>
              <span className="svc-tag">{s.tag}</span>
              <span className="svc-icon">{s.icon}</span>
              <div className="svc-title">{s.title}</div>
              <p className="svc-desc">{s.desc}</p>
              <span className="svc-arr">↗</span>
            </div>
          ))}
        </div>
      </div></div>
    </div>
  );
}

/* ── STATS ── */
function Stats() {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className="stats-row">
      {STATS.map((s, i) => (
        <div key={s.label} className="stat" style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)", transition: `opacity .6s ease ${i * 90}ms, transform .6s ease ${i * 90}ms` }}>
          <div className="stat-n">{s.value}</div>
          <div className="stat-l">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ── COUNTRIES ── */
function Countries() {
  const { ref, inView } = useInView();
  return (
    <div className="countries-sec">
      <div ref={ref} className="countries-inner" style={{ opacity: inView ? 1 : 0, transition: "opacity .6s ease" }}>
        <p className="countries-l">Active in 7 countries — local insight, global execution</p>
        <div className="countries-pills">
          {COUNTRIES.map(c => (
            <div key={c.name} className="c-pill">
              <span style={{ fontSize: 16 }}>{c.flag}</span><span>{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── SPLIT SECTION ── */
interface SplitProps {
  reverse?: boolean; symbol: string;
  dotColor?: string; dotLabel: string; dotSub: string;
  children: React.ReactNode;
}
function Split({ reverse, symbol, dotColor = "#22c55e", dotLabel, dotSub, children }: SplitProps) {
  const { ref, inView } = useInView();
  return (
    <div className="sec-full">
      <div className="wrap">
        <div ref={ref} className={`split ${reverse ? "rev" : ""}`}>
          <div className="split-visual" style={{ opacity: inView ? 1 : 0, transform: inView ? "scale(1) translateY(0)" : "scale(.97) translateY(24px)", transition: "opacity .7s ease .1s, transform .7s ease .1s" }}>
            <div className="split-ph"><span className="split-ph-sym">{symbol}</span></div>
            <div className="split-fc">
              <div className="split-dot" style={{ background: dotColor, boxShadow: `0 0 8px ${dotColor}55` }} />
              <div><div className="split-ft">{dotLabel}</div><div className="split-fs">{dotSub}</div></div>
            </div>
          </div>
          <div className="split-content" style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "opacity .7s ease .25s, transform .7s ease .25s" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── PROCESS ── */
function Process() {
  const { ref, inView } = useInView();
  return (
    <div className="sec-alt">
      <div className="wrap"><div className="sec" id="process">
        <Fade><span className="sec-label">How we work</span></Fade>
        <Fade delay={80}><h2 className="sec-h2" style={{ marginBottom: 0 }}>From first call to launch,<br />no surprises.</h2></Fade>
        <div ref={ref} className="proc-grid">
          {PROCESS.map((p, i) => (
            <div key={p.n} className="proc-card" style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(18px)", transition: `opacity .5s ease ${i * 110}ms, transform .5s ease ${i * 110}ms` }}>
              <div className="proc-n-bg">{p.n}</div>
              <div className="proc-pill">{p.n}</div>
              <div className="proc-t">{p.title}</div>
              <p className="proc-d">{p.desc}</p>
            </div>
          ))}
        </div>
      </div></div>
    </div>
  );
}

/* ── WHY US ── */
const WHY = [
  { icon: "⬡", t: "Global team, local insight", d: "People in 7 countries. We understand your market — timezone, culture, compliance and all." },
  { icon: "△", t: "Competitive pricing, zero compromise", d: "Distributed model keeps costs lean without cutting seniority. A-players, not interns." },
  { icon: "◎", t: "Speed that doesn't break things", d: "MVP in 3–6 weeks. Architecture built to scale from day one — no rewrites, no regrets." },
  { icon: "◈", t: "AI-native across every layer", d: "We embed AI into product, marketing, ops and CX — not as buzzword, but as a genuine multiplier." },
  { icon: "◇", t: "Radical transparency", d: "Weekly updates, clear metrics, real access to the team. No middlemen, no BS." },
  { icon: "⬘", t: "Full ownership, always", d: "We work like co-founders. Your deadline is our deadline. Your success is the only KPI." },
];
function WhyUs() {
  const { ref, inView } = useInView();
  return (
    <Split symbol="⬡" dotColor="#dc2626" dotLabel="Senior team, 7 countries" dotSub="No junior handoffs — ever">
      <span className="sec-label">Why miutifin</span>
      <h2 className="sec-h2">Not just another<br />agency. <span style={{ color: "var(--r)" }}>A real<br />tech partner.</span></h2>
      <p className="split-p">We&apos;re across the US, UK, Australia, France, Germany, Spain and Italy. Local market insight plus a distributed cost model — senior talent at pricing that doesn&apos;t require a Series B.</p>
      <blockquote style={{ paddingLeft: "1rem", borderLeft: "2px solid rgba(220,38,38,0.25)", fontSize: "0.9rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.65, marginBottom: "1.6rem", letterSpacing: "-0.01em" }}>
        &ldquo;We don&apos;t sell retainers to juniors. Every client works directly with the people who actually know what they&apos;re doing.&rdquo;
        <footer style={{ marginTop: 7, fontSize: 11, color: "var(--m)", fontWeight: 700 }}>— miutifin team</footer>
      </blockquote>
      <a href="#contact" className="btn-r" style={{ marginBottom: "2rem", display: "inline-flex" }}>Talk to the team →</a>
      <div ref={ref} className="why-g">
        {WHY.map((w, i) => (
          <div key={w.t} className="why-card" style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(14px)", transition: `opacity .5s ease ${i * 60}ms, transform .5s ease ${i * 60}ms` }}>
            <span className="why-icon">{w.icon}</span>
            <div className="why-t">{w.t}</div>
            <p className="why-d">{w.d}</p>
          </div>
        ))}
      </div>
    </Split>
  );
}

/* ── STARTUP ── */
function StartupSection() {
  return (
    <Split reverse symbol="⬟" dotColor="#f59e0b" dotLabel="40+ startups scaled" dotSub="From idea to funding round">
      <span className="sec-label">Startup & Product</span>
      <h2 className="sec-h2">Zero to <span style={{ color: "var(--r)" }}>production</span><br />in weeks.</h2>
      <p className="split-p">We&apos;ve taken 40+ startups from napkin sketch to live product. Scalable architecture, fast MVP, investor-ready pitch deck and mentoring from people who&apos;ve done it. Your runway is finite — we don&apos;t waste it.</p>
      <div className="mini-grid">
        {[["3–6 wks","MVP to production"],["40+","Startups scaled"],["Seed → A","Track record"],["48h","First commit"]].map(([v,l]) => (
          <div key={l} className="mini-card"><div className="mini-v">{v}</div><div className="mini-l">{l}</div></div>
        ))}
      </div>
    </Split>
  );
}

/* ── AI SHOWCASE ── */
function AiShowcase() {
  return (
    <Split symbol="◈" dotColor="#22c55e" dotLabel="Live AI pipeline" dotSub="GPT-4o + Claude in production">
      <span className="sec-label">AI & Automation</span>
      <h2 className="sec-h2">AI that ships.<br />Not AI <span style={{ color: "var(--r)" }}>that slides.</span></h2>
      <p className="split-p">Most teams talk about AI. We&apos;ve been running it in production across 40+ projects. Agents, RAG pipelines, video generation, voice cloning — deployed, monitored, iterated.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: "1.8rem" }}>
        {["Custom LLMs and agent systems per product","RAG on proprietary company knowledge bases","Synthetic video, voice cloning & AI avatars","Automated ops workflows that actually save time"].map(item => (
          <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--r)", flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", letterSpacing: "-0.01em" }}>{item}</span>
          </div>
        ))}
      </div>
      <a href="#contact" className="btn-g" style={{ display: "inline-flex" }}>See our AI capabilities →</a>
    </Split>
  );
}

/* ── FAQ ── */
function FAQ() {
  const { ref, inView } = useInView();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="sec-alt">
      <div className="wrap"><div className="sec" id="faq">
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <Fade><span className="sec-label" style={{ justifyContent: "center" }}>FAQ</span></Fade>
            <Fade delay={80}><h2 className="sec-h2">Questions we actually<br />get asked</h2></Fade>
            <Fade delay={140}><p style={{ marginTop: ".8rem", fontSize: 13, color: "var(--m)" }}>Still not sure? <a href="#contact" style={{ color: "var(--r)" }}>Let&apos;s talk.</a></p></Fade>
          </div>
          <div ref={ref} className="faq-list">
            {FAQS.map((f, i) => (
              <div key={i} className="faq-item" style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(12px)", transition: `opacity .5s ease ${i * 38}ms, transform .5s ease ${i * 38}ms` }}>
                <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                  {f.q}<span className={`faq-ico ${open === i ? "o" : ""}`}>+</span>
                </button>
                <div className={`faq-a ${open === i ? "o" : ""}`}><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div></div>
    </div>
  );
}

/* ── CONTACT ── */
function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setErr(null);
    const sb = createSupabaseBrowserClient();
    const { error } = await sb.from("contact_leads").insert({ name: form.name, company: form.company || null, email: form.email, message: form.message });
    setLoading(false);
    if (error) setErr("Something went wrong. Please email us directly.");
    else setSent(true);
  };
  return (
    <div className="sec-full">
      <div className="wrap"><div className="sec" id="contact">
        <div className="contact-wrap">
          <div className="contact-head">
            <Fade><span className="sec-label" style={{ justifyContent: "center" }}>Contact</span></Fade>
            <Fade delay={80}><h2 className="sec-h2">Ready to build something<br />that actually works?</h2></Fade>
            <Fade delay={140}><p style={{ marginTop: ".8rem", fontSize: 13, color: "var(--m)", lineHeight: 1.75 }}>Free discovery call. No pitch deck, no sales team — just a direct conversation about your project.</p></Fade>
          </div>
          <Fade delay={180}>
            {sent ? (
              <div className="c-success">
                <div className="c-success-icon">✓</div>
                <p style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.03em", color: "#fff", marginBottom: 8 }}>Message received!</p>
                <p style={{ fontSize: 13, color: "var(--m)" }}>We&apos;ll reply within 24 hours with a concrete next step.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="c-form">
                <div className="c-row">
                  <div className="c-field">
                    <label className="c-label">Full name <span className="req">*</span></label>
                    <input type="text" required value={form.name} onChange={set("name")} placeholder="John Smith" className="c-input" />
                  </div>
                  <div className="c-field">
                    <label className="c-label">Company</label>
                    <input type="text" value={form.company} onChange={set("company")} placeholder="Optional" className="c-input" />
                  </div>
                </div>
                <div className="c-field">
                  <label className="c-label">Email <span className="req">*</span></label>
                  <input type="email" required value={form.email} onChange={set("email")} placeholder="john@company.com" className="c-input" />
                </div>
                <div className="c-field">
                  <label className="c-label">Tell us about your project <span className="req">*</span></label>
                  <textarea required rows={5} value={form.message} onChange={set("message")} placeholder="Where are you at? What do you want to build or fix? Be direct — we can handle it." className="c-ta" />
                </div>
                {err && <p style={{ fontSize: 12, color: "#ef4444", marginBottom: 12 }}>{err}</p>}
                <p className="c-privacy">By submitting you agree to our <a href="/privacy">privacy policy</a>. No spam, no sales sequences.</p>
                <button type="submit" disabled={loading} className="c-submit">{loading ? "Sending…" : "Send message →"}</button>
              </form>
            )}
            <p style={{ marginTop: "1.2rem", textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.15)" }}>
              Prefer email? <a href="mailto:miutifin.ask@gmail.com" style={{ color: "rgba(255,255,255,0.3)" }}>miutifin.ask@gmail.com</a>
            </p>
          </Fade>
        </div>
      </div></div>
    </div>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div className="nav-logo-box"><img src="/logo_small_trasparent.png" alt="miutifin" /></div>
              <span style={{ fontWeight: 800, fontSize: 14, letterSpacing: "-0.02em" }}>miutifin</span>
            </div>
            <p className="f-brand-tag">The future<br />starts <span>here.</span></p>
            <p className="f-brand-desc">Global tech agency. Senior teams in 7 countries delivering AI, software, robotics, growth and strategy — at prices that make sense.</p>
            <div className="f-social">
              <a href="https://www.linkedin.com/company/miutifin" title="LinkedIn">in</a>
              <a href="https://www.instagram.com/miutifinglobal" title="Instagram">ig</a>
            </div>
          </div>
          <div>
            <h4 className="f-col-title">Services</h4>
            <ul className="f-links">{["Software Development","Artificial Intelligence","Video AI","SEO & Marketing","Startup Support","Robotics"].map(s => <li key={s}><a href="#services">{s}</a></li>)}</ul>
          </div>
          <div>
            <h4 className="f-col-title">Company</h4>
            <ul className="f-links">{[{l:"About us",h:"/about"},{l:"Process",h:"#process"},{l:"Case studies",h:"#"},{l:"FAQ",h:"#faq"},{l:"Privacy Policy",h:"/privacy"},{l:"Terms",h:"/terms"}].map(x => <li key={x.l}><a href={x.h}>{x.l}</a></li>)}</ul>
          </div>
          <div>
            <h4 className="f-col-title">Get in touch</h4>
            <div className="f-ci"><div className="f-ci-icon">@</div><div><div className="f-ci-l">Email</div><div className="f-ci-v"><a href="mailto:miutifin.ask@gmail.com">hello@miutifin.com</a></div></div></div>
            <div className="f-ci"><div className="f-ci-icon">◎</div><div><div className="f-ci-l">Presence</div><div className="f-ci-v">US · UK · AU · DE · FR · ES · IT</div></div></div>
            <div className="f-ci"><div className="f-ci-icon">⬡</div><div><div className="f-ci-l">Response</div><div className="f-ci-v">Within 24h guaranteed</div></div></div>
            <div style={{ marginTop: "1.3rem" }}><a href="#contact" className="btn-r" style={{ fontSize: 13, padding: "9px 18px" }}>Start now →</a></div>
          </div>
        </div>
        <div className="f-bottom">
          <p className="f-copy">© {new Date().getFullYear()} Miutifin — Worldwide</p>
          <p className="f-built">Built with <span>♥</span> and culture.</p>
        </div>
      </div>
    </footer>
  );
}

/* ── PAGE ── */
export default function AgencyLanding() {
  return (
    <>
      <style>{S}</style>
      <main style={{ background: "var(--bg)", color: "var(--w)", overflowX: "hidden" }}>
        <Navbar />
        <Hero />
        <Marquee />
        <ProblemSection />
        <Services />
        <Stats />
        <Countries />
        <StartupSection />
        <Process />
        <WhyUs />
        <AiShowcase />
        <FAQ />
        <Contact />
        <Footer />
      </main>
    </>
  );
}