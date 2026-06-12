"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import { Navbar } from "@/components/homepage/Navbar";
import { Footer } from "@/components/homepage/Footer";
import { useLocale } from "next-intl";
import { MiutifinLoader } from "@/components/homepage/Loader";

/* ============================================================
   STYLES — design system
   ============================================================ */
const S = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Instrument+Serif:ital@0;1&display=swap');

  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    /* Reds */
    --r:#dc2626;
    --r-bright:#ef4444;
    --r-soft:rgba(220,38,38,0.08);
    --r-glow:rgba(220,38,38,0.18);
    --r-line:rgba(220,38,38,0.32);
    /* Neutrals */
    --bg:#050505;
    --bg-2:#0a0a0a;
    --bg-3:#0f0f0f;
    --ink:#f5f5f4;
    --ink-2:rgba(245,245,244,0.62);
    --ink-3:rgba(245,245,244,0.84);
    --ink-4:rgba(245,245,244,0.16);
    --line:rgba(245,245,244,0.08);
    --line-2:rgba(245,245,244,0.04);
    /* Type */
    --f-sans:'Inter',system-ui,-apple-system,sans-serif;
    --f-serif:'Instrument Serif',Georgia,serif;
  }
  html{scroll-behavior:smooth;background:var(--bg)}
  body{
    background:var(--bg);color:var(--ink);
    font-family:var(--f-sans);
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
    overflow-x:hidden;
  }
  ::selection{background:var(--r);color:#fff}
  a{text-decoration:none;color:inherit}
  button{font-family:var(--f-sans);cursor:pointer}
  img,video{display:block;max-width:100%}

  /* Global noise/grain layer */
  .grain{
    position:fixed;inset:0;z-index:9999;pointer-events:none;
    opacity:0.04;mix-blend-mode:overlay;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  /* Layout helpers */
  .wrap{max-width:70vw;margin:0 auto;padding:0 clamp(1.25rem,5vw,3.5rem)}
  .wrap-tight{max-width:1100px;margin:0 auto;padding:0 clamp(1.25rem,5vw,3.5rem)}
  @media(max-width:780px){.wrap{max-width:95vw;}}

  .eyebrow{
    display:inline-flex;align-items:center;gap:10px;
    font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;
    color:var(--ink-3);
  }
  .eyebrow::before{
    content:'';width:18px;height:1px;background:var(--r);
  }
  .eyebrow.center::before{display:none}
  .eyebrow .num{color:var(--r);font-variant-numeric:tabular-nums}

  /* Display headline — serif italic for editorial flair */
  .display{
    font-family:var(--f-serif);font-weight:400;
    font-size:clamp(3.2rem,9vw,8rem);
    line-height:0.92;letter-spacing:-0.02em;
    color:var(--ink);
  }
  .display em{font-style:italic;color:var(--ink-3)}
  .display .red{color:var(--r);font-style:italic}

  /* H2 sans, big & tight */
  .h2{
    font-family:var(--f-sans);font-weight:700;
    font-size:clamp(2rem,5vw,4rem);
    line-height:1;letter-spacing:-0.04em;
  }
  .h2 em{font-family:var(--f-serif);font-style:italic;font-weight:400;color:var(--ink-2)}

  /* ============================================================
     HERO
     ============================================================ */
  .hero{
    position:relative;min-height:100svh;
    display:flex;flex-direction:column;justify-content:flex-end;
    padding:0;overflow:hidden;
    background:var(--bg);
  }
  /* Media slot — full-bleed background */
  .hero-media{
    position:absolute;inset:0;z-index:0;
    background:
      radial-gradient(ellipse 80% 60% at 30% 30%,rgba(220,38,38,0.18),transparent 50%),
      radial-gradient(ellipse 60% 50% at 80% 70%,rgba(220,38,38,0.08),transparent 50%),
      linear-gradient(180deg,#0a0a0a 0%,#050505 100%);
  }
  .hero-media::before{
    content:'';position:absolute;inset:0;
    background-image:
      linear-gradient(rgba(245,245,244,0.025) 1px,transparent 1px),
      linear-gradient(90deg,rgba(245,245,244,0.025) 1px,transparent 1px);
    background-size:80px 80px;
    mask-image:radial-gradient(ellipse 100% 80% at 50% 40%,black,transparent 90%);
  }
  /* Animated dot field for hero */
  .hero-orb{
    position:absolute;border-radius:50%;
    filter:blur(100px);
    background:radial-gradient(circle,var(--r) 0%,transparent 70%);
    opacity:0.32;
  }
  .hero-orb.a{width:700px;height:700px;top:-15%;left:-10%;animation:orb-a 22s ease-in-out infinite alternate}
  .hero-orb.b{width:500px;height:500px;top:30%;right:-8%;animation:orb-b 28s ease-in-out infinite alternate;opacity:0.22}
  @keyframes orb-a{0%{transform:translate(0,0) scale(1)}100%{transform:translate(80px,-40px) scale(1.15)}}
  @keyframes orb-b{0%{transform:translate(0,0) scale(1)}100%{transform:translate(-60px,50px) scale(0.9)}}

  /* Vignette + bottom fade */
  .hero-fade{
    position:absolute;inset:0;z-index:1;pointer-events:none;
    background:
      radial-gradient(ellipse 100% 70% at 50% 0%,transparent,rgba(5,5,5,0.6)),
      linear-gradient(180deg,transparent 30%,var(--bg) 100%);
  }

  .hero-inner{
    position:relative;z-index:2;
    width:100%;max-width:1400px;margin:0 auto;
    padding:0 clamp(1.25rem,5vw,3.5rem) clamp(3rem,8vw,6rem);
    display:flex;flex-direction:column;gap:2rem;
  }
  .hero-top{
    position:absolute;top:clamp(6rem,12vw,9rem);left:clamp(30rem,5vw,3.5rem);
    display:flex;align-items:center;gap:14px;
  }
  .hero-pulse{
    width:8px;height:8px;border-radius:50%;background:var(--r);
    box-shadow:0 0 0 0 rgba(220,38,38,0.6);
    animation:hero-pulse 2s infinite;
  }
  @keyframes hero-pulse{
    0%{box-shadow:0 0 0 0 rgba(220,38,38,0.6)}
    100%{box-shadow:0 0 0 14px rgba(220,38,38,0)}
  }
  .hero-top-text{font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-2)}

  .hero-headline{
    font-family:var(--f-serif);font-weight:400;
    font-size:clamp(3.2rem,8vw,10rem);
    line-height:0.88;letter-spacing:-0.025em;
    color:var(--ink);
  }
  .hero-headline em{font-style:italic;color:var(--ink-3)}
  .hero-headline .red{color:var(--r);font-style:italic}

  .hero-bottom{
    display:grid;grid-template-columns:1fr auto;gap:3rem;align-items:end;
    padding-top:2rem;border-top:1px solid var(--line);
  }
  @media(max-width:780px){.hero-bottom{grid-template-columns:1fr;gap:1.5rem}}
  .hero-sub{
    font-size:clamp(0.95rem,1.4vw,1.1rem);
    color:var(--ink-2);max-width:520px;line-height:1.6;letter-spacing:-0.005em;
  }
  .hero-cta{display:flex;gap:12px;flex-wrap:wrap}

  /* Buttons */
  .btn{
    display:inline-flex;align-items:center;gap:8px;
    padding:14px 24px;border-radius:100px;
    font-size:13px;font-weight:600;letter-spacing:-0.005em;
    transition:all .25s cubic-bezier(.4,0,.2,1);
    white-space:nowrap;
  }
  .btn-r{
    background:var(--r);color:#fff;
    box-shadow:0 0 0 1px var(--r-line),0 4px 24px rgba(220,38,38,0.25);
  }
  .btn-r:hover{
    background:var(--r-bright);transform:translateY(-2px);
    box-shadow:0 0 0 1px var(--r),0 12px 40px rgba(220,38,38,0.4);
  }
  .btn-ghost{
    border:1px solid var(--line);color:var(--ink-2);background:transparent;
  }
  .btn-ghost:hover{border-color:var(--ink-3);color:var(--ink);background:rgba(245,245,244,0.02)}
  .btn .arr{transition:transform .25s}
  .btn:hover .arr{transform:translateX(3px)}

  /* Hero scroll indicator */
  .hero-scroll-i{
    position:absolute;bottom:1.4rem;right:clamp(1.25rem,5vw,3.5rem);z-index:3;
    display:flex;flex-direction:column;align-items:center;gap:8px;
    font-size:9px;font-weight:600;letter-spacing:.25em;text-transform:uppercase;color:var(--ink-3);
  }
  .hero-scroll-i .line{
    width:1px;height:32px;background:linear-gradient(to bottom,var(--ink-3),transparent);
    animation:scroll-line 2.4s ease-in-out infinite;
  }
  @keyframes scroll-line{
    0%{transform:scaleY(0);transform-origin:top;opacity:0}
    50%{opacity:1}
    100%{transform:scaleY(1);transform-origin:top;opacity:0}
  }

  /* ============================================================
     MARQUEE STRIP — minimal, editorial
     ============================================================ */
  .strip{
    border-top:1px solid var(--line);border-bottom:1px solid var(--line);
    overflow:hidden;
    background:var(--bg-2);
    padding:1.4rem 0;
  }
  .strip-track{
    display:flex;gap:4rem;white-space:nowrap;
    animation:strip-scroll 50s linear infinite;
  }
  .strip-item{
    flex-shrink:0;display:flex;align-items:center;gap:1rem;
    font-family:var(--f-serif);
    font-size:1.5rem;color:var(--ink-3);
  }
  .strip-item::before{
    content:'';width:6px;height:6px;border-radius:50%;background:var(--r);
  }
  @keyframes strip-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}

  /* ============================================================
     MANIFESTO — scrollytelling
     ============================================================ */
  .manifesto{
    padding:clamp(8rem,15vw,14rem) 0;
    position:relative;
    
  }
  .manifesto-eyebrow{margin-bottom:6rem}
  .manifesto-line{
    font-family:var(--f-serif);font-weight:400;font-style:italic;
    font-size:clamp(2.4rem,7vw,6rem);
    line-height:1.05;letter-spacing:-0.025em;
    color:var(--ink-4);
    transition:color .6s;
  }
  .manifesto-line.active{color:var(--ink)}
  .manifesto-line + .manifesto-line{margin-top:1.5rem}
  .manifesto-line .red{color:var(--r)}

  /* ============================================================
     WORKS — asymmetric showcase grid
     ============================================================ */
  .works{padding:clamp(5rem,10vw,8rem) 0;background:var(--bg-2);position:relative}
  .works-head{
    display:flex;justify-content:space-between;align-items:flex-end;
    flex-wrap:wrap;gap:2rem;margin-bottom:5rem;
  }
  .works-head .lead{max-width:480px;font-size:14px;color:var(--ink-2);line-height:1.7}
  .works-grid{
    display:grid;
    grid-template-columns:repeat(12,1fr);
    grid-auto-rows:minmax(180px,auto);
    gap:1rem;
  }
  @media(max-width:900px){.works-grid{grid-template-columns:repeat(6,1fr)}}
  @media(max-width:540px){.works-grid{grid-template-columns:1fr;grid-auto-rows:auto}}
  .work-card{
    position:relative;overflow:hidden;
    border-radius:16px;
    background:var(--bg-3);
    border:1px solid var(--line);
    transition:transform .5s cubic-bezier(.4,0,.2,1),border-color .3s;
    cursor:pointer;
    isolation:isolate;
  }
  .work-card:hover{border-color:var(--ink-4);transform:translateY(-4px)}
  /* Different sizes */
  .work-card.lg{grid-column:span 7;grid-row:span 2;min-height:480px}
  .work-card.md{grid-column:span 5;grid-row:span 2;min-height:480px}
  .work-card.sm{grid-column:span 4;min-height:280px}
  .work-card.tall{grid-column:span 4;grid-row:span 2;min-height:480px}
  .work-card.wide{grid-column:span 8;min-height:280px}
  @media(max-width:900px){
    .work-card.lg,.work-card.md{grid-column:span 6;grid-row:auto;min-height:380px}
    .work-card.sm,.work-card.wide,.work-card.tall{grid-column:span 6;grid-row:auto;min-height:280px}
  }
  @media(max-width:540px){
    .work-card.lg,.work-card.md,.work-card.sm,.work-card.wide,.work-card.tall{grid-column:span 1;min-height:300px}
  }
  /* Media placeholder inside work card */
  .work-media{
    position:absolute;inset:0;z-index:0;
    background:
      radial-gradient(ellipse at 30% 20%,rgba(220,38,38,0.1),transparent 60%),
      linear-gradient(135deg,#0d0d0d 0%,#080808 100%);
    transition:transform .6s cubic-bezier(.4,0,.2,1);
  }
  .work-card:hover .work-media{transform:scale(1.04)}
  .work-media::before{
    content:'';position:absolute;inset:0;
    background-image:
      linear-gradient(rgba(245,245,244,0.015) 1px,transparent 1px),
      linear-gradient(90deg,rgba(245,245,244,0.015) 1px,transparent 1px);
    background-size:32px 32px;
  }
  /* Big monogram for placeholder */
  .work-mono{
    position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
    font-family:var(--f-serif);font-style:italic;font-weight:400;
    font-size:clamp(8rem,18vw,16rem);
    color:rgba(220,38,38,0.05);
    z-index:1;line-height:1;
    transition:color .4s;
  }
  .work-card:hover .work-mono{color:rgba(220,38,38,0.1)}
  .work-overlay{
    position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;justify-content:flex-end;
    padding:clamp(1.4rem,2.5vw,2rem);
    background:linear-gradient(180deg, transparent 40%, rgb(5 5 5) 100%);
  }
  .work-tag{
    display:inline-flex;align-self:flex-start;align-items:center;gap:6px;
    padding:4px 10px;border-radius:100px;
    background:rgba(220,38,38,0.08);border:1px solid var(--r-line);
    font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--r);
    margin-bottom:1rem;
  }
  .work-title{
    font-family:var(--f-serif);font-weight:600;
    font-size:clamp(1.4rem,2.5vw,2rem);
    color:var(--ink);line-height:1.05;letter-spacing:-0.02em;
    margin-bottom:0.4rem;
  }
  .work-desc{
    font-size:13px;color:var(--ink-3);line-height:1.55;
    max-width:340px;
  }

  /* ============================================================
     CAPABILITIES — editorial column
     ============================================================ */
  .caps{padding:clamp(6rem,12vw,10rem) 0;position:relative}
  .caps-head{
    display:grid;grid-template-columns:1fr 1.4fr;gap:4rem;
    margin-bottom:6rem;align-items:end;
  }
  @media(max-width:900px){.caps-head{grid-template-columns:1fr;gap:2rem}}
  .caps-list{
    border-top:1px solid var(--line);
  }
  .cap-row{
    display:grid;grid-template-columns:80px 1fr 2fr 1fr;
    gap:2rem;padding:2.2rem 0;
    border-bottom:1px solid var(--line);
    align-items:center;
    cursor:pointer;
    transition:background .4s;
    position:relative;
  }
  .cap-row::before{
    content:'';position:absolute;left:-2rem;right:-2rem;top:0;bottom:0;
    background:rgba(220,38,38,0.02);opacity:0;transition:opacity .35s;
    z-index:-1;border-radius:8px;
  }
  .cap-row:hover::before{opacity:1}
  @media(max-width:780px){.cap-row{grid-template-columns:50px 1fr;gap:1rem}.cap-row .cap-desc,.cap-row .cap-meta{grid-column:span 2}}
  .cap-num{font-family:var(--f-serif);font-style:italic;font-size:1.2rem;color:var(--ink-4);font-variant-numeric:tabular-nums}
  .cap-name{
    font-family:var(--f-serif);font-style:italic;font-weight:400;
    font-size:clamp(1.4rem,2.5vw,2rem);color:var(--ink);
    line-height:1.05;letter-spacing:-0.02em;
    transition:color .3s;
  }
  .cap-row:hover .cap-name{color:var(--r)}
  .cap-desc{font-size:14px;color:var(--ink-2);line-height:1.6;letter-spacing:-0.005em}
  .cap-meta{font-size:11px;color:var(--ink-3);letter-spacing:.05em;text-align:right}
  @media(max-width:780px){.cap-meta{text-align:left}}

  /* ============================================================
     STATS — splash section
     ============================================================ */
  .splash{
    padding:clamp(6rem,14vw,11rem) 0;background:var(--bg-2);
    border-top:1px solid var(--line);border-bottom:1px solid var(--line);
    position:relative;overflow:hidden;
  }
  .splash::before{
    content:'';position:absolute;width:80%;height:140%;top:-20%;left:-20%;
    background:radial-gradient(ellipse,rgba(220,38,38,0.05),transparent 60%);
    pointer-events:none;
  }
  .splash-head{margin-bottom:5rem;position:relative}
  .splash-grid{
    display:grid;grid-template-columns:repeat(2,1fr);gap:0;position:relative;
  }
  .splash-cell{
    padding:3rem 0;border-top:1px solid var(--line);
  }
  .splash-cell:nth-child(odd){padding-right:3rem;border-right:1px solid var(--line)}
  .splash-cell:nth-child(even){padding-left:3rem}
  @media(max-width:780px){
    .splash-cell:nth-child(odd){padding-right:0;border-right:none}
    .splash-cell:nth-child(even){padding-left:0}
    .splash-grid{grid-template-columns:1fr}
  }
  .splash-num{
    font-family:var(--f-serif);font-weight:400;
    font-size:clamp(4rem,12vw,9rem);line-height:0.9;letter-spacing:-0.04em;
    color:var(--ink);
  }
  .splash-num .red{color:var(--r)}
  .splash-label{
    margin-top:1rem;font-size:12px;color:var(--ink-3);
    letter-spacing:.1em;text-transform:uppercase;font-weight:600;
  }
  .splash-detail{margin-top:1rem;font-size:14px;color:var(--ink-2);line-height:1.6;max-width:380px}

  /* ============================================================
     MAP — 7 countries
     ============================================================ */
  .map-sec{padding:clamp(6rem,12vw,10rem) 0;position:relative;overflow:hidden}
  .map-head{display:grid;grid-template-columns:1fr 1fr;gap:4rem;margin-bottom:4rem;align-items:end}
  @media(max-width:900px){.map-head{grid-template-columns:1fr;gap:2rem}}
  .map-canvas{
    position:relative;
    aspect-ratio:2/1;width:100%;
    border-radius:24px;overflow:hidden;
    background:radial-gradient(ellipse at 50% 50%,#0a0a0a,#050505);
    border:1px solid var(--line);
  }
  .map-canvas svg{width:100%;height:100%;display:block}
  .map-canvas .country-dot{fill:var(--r);transform-origin:center;transform-box:fill-box}
  .map-canvas .country-pulse{fill:var(--r);opacity:0.3;animation:map-pulse 2.6s ease-in-out infinite;transform-origin:center;transform-box:fill-box}
  @keyframes map-pulse{0%,100%{transform:scale(1);opacity:0.3}50%{transform:scale(2);opacity:0}}
  .map-legend{
    position:absolute;bottom:1.4rem;left:1.4rem;right:1.4rem;
    display:flex;flex-wrap:wrap;gap:8px;justify-content:center;
  }
  .map-pill{
    display:inline-flex;align-items:center;gap:8px;
    padding:6px 12px;border-radius:100px;
    background:rgba(10,10,10,0.7);backdrop-filter:blur(8px);
    border:1px solid var(--line);
    font-size:11px;font-weight:600;color:var(--ink-2);
  }
  .map-pill .d{width:5px;height:5px;border-radius:50%;background:var(--r)}

  /* ============================================================
     PROCESS — sticky scrollytelling
     ============================================================ */
  .proc{padding:clamp(5rem,10vw,8rem) 0;background:var(--bg-2)}
  .proc-grid{
    display:grid;grid-template-columns:1fr 1.2fr;gap:4rem;align-items:flex-start;
  }
  @media(max-width:900px){.proc-grid{grid-template-columns:1fr;gap:3rem}}
  .proc-sticky{position:sticky;top:120px;align-self:flex-start}
  @media(max-width:900px){.proc-sticky{position:relative;top:0}}
  .proc-sticky .h2{margin-top:2rem}
  .proc-list{display:flex;flex-direction:column;gap:1rem}
  .proc-step{
    padding:2rem;border-radius:16px;
    background:var(--bg-3);border:1px solid var(--line);
    transition:border-color .4s,background .4s;
  }
  .proc-step:hover{border-color:var(--r-line);background:rgba(220,38,38,0.02)}
  .proc-step-head{display:flex;align-items:center;gap:1rem;margin-bottom:1rem}
  .proc-step-n{
    font-family:var(--f-serif);font-style:italic;
    font-size:1.6rem;color:var(--r);font-variant-numeric:tabular-nums;
  }
  .proc-step-t{font-size:18px;font-weight:600;letter-spacing:-0.02em;color:var(--ink)}
  .proc-step-d{font-size:14px;color:var(--ink-2);line-height:1.7}

  /* ============================================================
     TEAM — placeholder big media
     ============================================================ */
  .team{padding:clamp(6rem,12vw,10rem) 0;position:relative}
  .team-head{display:grid;grid-template-columns:1fr 1fr;gap:4rem;margin-bottom:4rem;align-items:end}
  @media(max-width:900px){.team-head{grid-template-columns:1fr;gap:2rem}}
  .team-grid{
    display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;
  }
  @media(max-width:780px){.team-grid{grid-template-columns:repeat(2,1fr)}}
  @media(max-width:520px){.team-grid{grid-template-columns:1fr}}
  .team-card{
    aspect-ratio:3/4;border-radius:16px;overflow:hidden;
    background:var(--bg-3);border:1px solid var(--line);
    position:relative;cursor:pointer;
    transition:transform .5s cubic-bezier(.4,0,.2,1);
  }
  .team-card:hover{transform:translateY(-4px)}
  .team-media{
    position:absolute;inset:0;
    background:
      radial-gradient(ellipse at 30% 30%,rgba(220,38,38,0.08),transparent 60%),
      linear-gradient(135deg,#0d0d0d,#080808);
    display:flex;align-items:center;justify-content:center;
    transition:transform .6s cubic-bezier(.4,0,.2,1);
  }
  .team-card:hover .team-media{transform:scale(1.05)}
  .team-media-mono{
    font-family:var(--f-serif);font-style:italic;font-weight:400;
    font-size:clamp(5rem,8vw,7rem);
    color:rgba(220,38,38,0.1);
  }
  .team-info{
    position:absolute;bottom:1.2rem;left:1.2rem;right:1.2rem;z-index:2;
  }
  .team-name{font-family:var(--f-serif);font-style:italic;font-size:1.3rem;color:var(--ink);line-height:1.1}
  .team-role{margin-top:4px;font-size:11px;color:var(--ink-3);letter-spacing:.06em;text-transform:uppercase;font-weight:600}

  /* ============================================================
     FAQ
     ============================================================ */
  .faq{padding:clamp(5rem,10vw,8rem) 0;background:var(--bg-2)}
  .faq-grid{display:grid;grid-template-columns:1fr 1.6fr;gap:5rem}
  @media(max-width:900px){.faq-grid{grid-template-columns:1fr;gap:3rem}}
  .faq-side{position:sticky;top:120px;align-self:flex-start}
  @media(max-width:900px){.faq-side{position:relative;top:0}}
  .faq-list{border-top:1px solid var(--line)}
  .faq-item{border-bottom:1px solid var(--line)}
  .faq-q{
    width:100%;background:none;border:none;
    text-align:left;padding:1.6rem 0;
    display:flex;justify-content:space-between;align-items:center;gap:2rem;
    font-size:clamp(15px,1.4vw,17px);font-weight:500;color:var(--ink);
    letter-spacing:-0.015em;line-height:1.4;
    transition:color .25s;
  }
  .faq-q:hover{color:var(--r)}
  .faq-icon{
  width:28px;height:28px;border-radius:50%;
  border:1px solid var(--line);
  display:flex;align-items:center;justify-content:center;
  color:var(--ink-3);
  transition:all .35s cubic-bezier(.4,0,.2,1);flex-shrink:0;
  position:relative;
}
  .faq-icon::before,
.faq-icon::after{
  content:'';position:absolute;
  top:50%;left:50%;
  background:currentColor;
  transition:transform .35s cubic-bezier(.4,0,.2,1);
}
.faq-icon::before{
  width:10px;height:1.5px;
  transform:translate(-50%,-50%);
}
.faq-icon::after{
  width:1.5px;height:10px;
  transform:translate(-50%,-50%);
}
.faq-icon.o{transform:rotate(135deg);color:var(--r);border-color:var(--r-line)}
  .faq-a{overflow:hidden;max-height:0;transition:max-height .45s cubic-bezier(.4,0,.2,1)}
  .faq-a.o{max-height:400px;padding-bottom:1.6rem}
  .faq-a p{font-size:14px;color:var(--ink-2);line-height:1.75;max-width:680px}

  /* ============================================================
     CTA FINALE — manifesto
     ============================================================ */
  .cta-fin{
    padding:clamp(6rem,15vw,12rem) 0;text-align:center;
    position:relative;overflow:hidden;
  }
  .cta-fin::before{
    content:'';position:absolute;inset:0;
    background:radial-gradient(ellipse 60% 50% at 50% 50%,rgba(220,38,38,0.08),transparent 70%);
  }
  .cta-fin-eyebrow{margin-bottom:2.5rem;justify-content:center}
  .cta-fin-eyebrow::before{display:none}
  .cta-fin-h{
    font-family:var(--f-serif);font-weight:400;
    font-size:clamp(2.6rem,8vw,7rem);line-height:0.95;letter-spacing:-0.025em;
    margin:0 auto 2.5rem;max-width:14ch;
  }
  .cta-fin-h em{font-style:italic;color:var(--r)}
  .cta-fin-p{font-size:15px;color:var(--ink-2);max-width:480px;margin:0 auto 2.5rem;line-height:1.7}

  /* ============================================================
     CONTACT
     ============================================================ */
  .contact{padding:clamp(5rem,10vw,8rem) 0;background:var(--bg-2)}
  .contact-grid{display:grid;grid-template-columns:1fr 1.4fr;gap:5rem;align-items:flex-start}
  @media(max-width:900px){.contact-grid{grid-template-columns:1fr;gap:3rem}}
  .contact-side h2{margin-bottom:1.5rem}
  .contact-side p{font-size:14px;color:var(--ink-2);line-height:1.7;max-width:380px}
  .contact-detail{margin-top:2rem;display:flex;flex-direction:column;gap:1rem}
  .contact-detail-i{display:flex;align-items:flex-start;gap:12px}
  .contact-detail-i .l{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-3);font-weight:700}
  .contact-detail-i .v{margin-top:3px;font-size:14px;color:var(--ink);font-family:var(--f-serif);font-style:italic}
  .contact-detail-i .v a{transition:color .2s}.contact-detail-i .v a:hover{color:var(--r)}

  .form{
    background:var(--bg-3);border:1px solid var(--line);
    border-radius:20px;padding:clamp(1.8rem,3vw,2.5rem);
  }
  .form-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
  @media(max-width:600px){.form-row{grid-template-columns:1fr}}
  .form-field{display:flex;flex-direction:column;gap:8px;margin-bottom:1.2rem}
  .form-label{font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-3)}
  .form-label .req{color:var(--r);margin-left:3px}
  .form-input,.form-ta{
    background:rgba(245,245,244,0.02);border:1px solid var(--line);border-radius:10px;
    padding:13px 16px;font-size:14px;color:var(--ink);font-family:var(--f-sans);
    outline:none;width:100%;transition:all .25s;-webkit-appearance:none;
    letter-spacing:-0.005em;
  }
  .form-input::placeholder,.form-ta::placeholder{color:var(--ink-4)}
  .form-input:focus,.form-ta:focus{border-color:var(--r-line);background:rgba(220,38,38,0.02);box-shadow:0 0 0 3px rgba(220,38,38,0.06)}
  .form-ta{resize:none;line-height:1.65;min-height:120px}
  .form-privacy{font-size:11px;color:var(--ink-4);line-height:1.6;margin:0 0 1rem}
  .form-privacy a{color:var(--ink-3);text-decoration:underline;text-underline-offset:2px}
  .form-submit{
    width:100%;padding:16px 24px;border-radius:12px;background:var(--r);border:none;
    color:#fff;font-family:var(--f-sans);font-size:14px;font-weight:600;letter-spacing:-0.005em;
    transition:all .25s;
    box-shadow:0 0 0 1px var(--r-line),0 4px 24px rgba(220,38,38,0.18);
  }
  .form-submit:hover:not(:disabled){background:var(--r-bright);transform:translateY(-2px);box-shadow:0 0 0 1px var(--r),0 12px 40px rgba(220,38,38,0.32)}
  .form-submit:disabled{opacity:.55;cursor:not-allowed;transform:none}
  .form-success{
    text-align:center;padding:4rem 2rem;
    background:var(--bg-3);border:1px solid var(--line);border-radius:20px;
  }
  .form-success-icon{
    width:54px;height:54px;border-radius:50%;
    background:rgba(220,38,38,0.08);border:1px solid var(--r-line);
    display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;
    font-size:22px;color:var(--r);
  }

  /* Hide on small */
  @media(max-width:780px){.hide-mob{display:none!important}}

  /* ============================================================
   ESCO TEASER — cinematic break, terra-colored
   ============================================================ */
  .esco-teaser {
    padding: clamp(8rem, 16vw, 14rem) 0;
    position: relative;
    overflow: hidden;
    background: linear-gradient(180deg, var(--bg) 0%, #0a0805 50%, var(--bg) 100%);
  }
  .esco-teaser::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 70% 50% at 50% 50%, rgba(180, 100, 80, 0.12), transparent 70%),
      radial-gradient(ellipse 40% 30% at 80% 30%, rgba(220, 100, 70, 0.06), transparent 60%);
    pointer-events: none;
  }
  .esco-teaser::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(245, 245, 244, 0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(245, 245, 244, 0.015) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent 90%);
    pointer-events: none;
  }

  .esco-teaser-inner {
    position: relative;
    z-index: 2;
    text-align: center;
    max-width: 920px;
    margin: 0 auto;
  }

  .esco-teaser-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(220, 100, 70, 0.8);
    margin-bottom: 3rem;
  }
  .esco-teaser-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #c87060;
    box-shadow: 0 0 0 0 rgba(200, 112, 96, 0.6);
    animation: esco-teaser-pulse 2s infinite;
  }
  @keyframes esco-teaser-pulse {
    0%   { box-shadow: 0 0 0 0 rgba(200, 112, 96, 0.6); }
    100% { box-shadow: 0 0 0 14px rgba(200, 112, 96, 0); }
  }

  .esco-teaser-mark {
    font-family: var(--f-serif);
    font-style: italic;
    font-weight: 400;
    font-size: clamp(5rem, 14vw, 11rem);
    line-height: 0.9;
    letter-spacing: -0.04em;
    color: var(--ink);
    margin-bottom: 2.5rem;
    position: relative;
    display: inline-block;
  }
  .esco-teaser-mark::after {
    content: '';
    position: absolute;
    bottom: 0.2em;
    right: -0.3em;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #c87060;
  }

  .esco-teaser-title {
    font-family: var(--f-serif);
    font-weight: 400;
    font-size: clamp(1.8rem, 4vw, 3rem);
    line-height: 1.15;
    letter-spacing: -0.025em;
    color: var(--ink);
    max-width: 24ch;
    margin: 0 auto 2rem;
  }
  .esco-teaser-title em {
    font-style: italic;
    color: #c87060;
  }

  .esco-teaser-desc {
    font-size: clamp(0.95rem, 1.3vw, 1.1rem);
    line-height: 1.7;
    color: var(--ink-2);
    max-width: 560px;
    margin: 0 auto 3.5rem;
  }

  .esco-teaser-stats {
    display: flex;
    justify-content: center;
    gap: clamp(2rem, 5vw, 4rem);
    margin-bottom: 4rem;
    flex-wrap: wrap;
  }
  .esco-teaser-stat {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
  }
  .esco-teaser-stat strong {
    font-family: var(--f-serif);
    font-weight: 400;
    font-style: italic;
    font-size: clamp(2rem, 4vw, 3rem);
    color: var(--ink);
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  .esco-teaser-stat span {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-3);
  }

  .esco-teaser-cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
  }
  .esco-teaser-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 18px 36px;
    border-radius: 100px;
    background: #c87060;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.005em;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow:
      0 0 0 1px rgba(200, 112, 96, 0.4),
      0 8px 32px rgba(200, 112, 96, 0.25);
  }
  .esco-teaser-btn:hover {
    background: #d68573;
    transform: translateY(-3px);
    box-shadow:
      0 0 0 1px #c87060,
      0 16px 48px rgba(200, 112, 96, 0.4);
  }
  .esco-teaser-btn .arr {
    transition: transform 0.3s;
  }
  .esco-teaser-btn:hover .arr {
    transform: translateX(5px);
  }
  .esco-teaser-meta {
    font-size: 11px;
    color: var(--ink-3);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-family: var(--f-serif);
    font-style: italic;
    text-transform: none;
    letter-spacing: 0;
  }
`;

/* ============================================================
   COMPONENTS
   ============================================================ */

/* -------- HERO -------- */
function Hero() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section className="hero" ref={ref}>
      <motion.div className="hero-media" style={{ y }}>
        <div className="hero-orb a" />
        <div className="hero-orb b" />
      </motion.div>
      <div className="hero-fade" />

      <motion.div className="hero-inner" style={{ opacity }}>
        <h1 className="hero-headline">
          <motion.span
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "block" }}
          >
            {t("headlineLine1")}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "block" }}
          >
            {t("headlineLine2")} <em>{t("headlineLine2Em")}</em>
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "block" }}
          >
            <span className="red">{t("headlineLine3")}</span>
          </motion.span>
        </h1>

        <motion.div
          className="hero-bottom"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="hero-sub">{t("subtitle")}</p>
          <div className="hero-cta">
            <a href="#contact" className="btn btn-r">
              {t("ctaPrimary")} <span className="arr">→</span>
            </a>
            <a href="#works" className="btn btn-ghost">{t("ctaSecondary")}</a>
          </div>
        </motion.div>
      </motion.div>

      <div className="hero-scroll-i">
        <span>{t("scroll")}</span>
        <span className="line" />
      </div>
    </section>
  );
}

/* -------- STRIP MARQUEE -------- */
function Strip() {
  const t = useTranslations("strip");
  const items = t.raw("items") as string[];
  const all = [...items, ...items];
  return (
    <div className="strip">
      <div className="strip-track">
        {all.map((s, i) => <span key={i} className="strip-item">{s}</span>)}
      </div>
    </div>
  );
}

/* -------- MANIFESTO -------- */
function Manifesto() {
  const t = useTranslations("manifesto");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 20%"] });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      if (v < 0.33) setActive(0);
      else if (v < 0.66) setActive(1);
      else setActive(2);
    });
    return () => unsub();
  }, [scrollYProgress]);

  const lines = [
    <>{t("line1")}</>,
    <>{t("line2Pre")} <span className="red">{t("line2Red")}</span></>,
    <>{t("line3")}</>,
  ];

  return (
    <section className="manifesto" ref={ref}>
      <div className="wrap">
        <div className="manifesto-eyebrow eyebrow"><span className="num">01</span> {t("eyebrow")}</div>
        {lines.map((l, i) => (
          <div key={i} className={`manifesto-line ${active >= i ? "active" : ""}`}>{l}</div>
        ))}
      </div>
    </section>
  );
}

/* -------- WORKS -------- */
type Work = { tag: string; title: string; desc: string; mono: string; size: string; image?: string; };
function Works() {
  const t = useTranslations("works");
  const items = t.raw("items") as Work[];

  return (
    <section className="works" id="works">
      <div className="wrap">
        <div className="works-head">
          <div>
            <div className="eyebrow"><span className="num">02</span> {t("eyebrow")}</div>
            <h2 className="h2" style={{ marginTop: "1.4rem" }}>
              {t("titleLine1")} <em>{t("titleLine1Em")}</em><br />{t("titleLine2")}
            </h2>
          </div>
          <p className="lead">{t("lead")}</p>
        </div>

        <div className="works-grid">
          {items.map((w, i) => (
            <motion.div
              key={i}
              className={`work-card ${w.size}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div 
                className="work-media" 
                style={w.image ? {
                  backgroundImage: `url(${w.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                } : undefined}
              />
              {!w.image && <div className="work-mono">{w.mono}</div>}
              <div className="work-overlay">
                <span className="work-tag">
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "currentColor" }} />
                  {w.tag}
                </span>
                <h3 className="work-title">{w.title}</h3>
                <p className="work-desc">{w.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- CAPABILITIES -------- */
type Cap = { num: string; name: string; desc: string; meta: string };
function Capabilities() {
  const t = useTranslations("capabilities");
  const items = t.raw("items") as Cap[];

  return (
    <section className="caps" id="services">
      <div className="wrap">
        <div className="caps-head">
          <div>
            <div className="eyebrow"><span className="num">03</span> {t("eyebrow")}</div>
            <h2 className="h2" style={{ marginTop: "1.4rem" }}>
              {t("titleLine1")}<br /><em>{t("titleLine2Em")}</em>
            </h2>
          </div>
          <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.7, maxWidth: 480 }}>
            {t("lead")}
          </p>
        </div>

        <div className="caps-list">
          {items.map((c, i) => (
            <motion.div
              key={c.num}
              className="cap-row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
            >
              <div className="cap-num">{c.num}</div>
              <div className="cap-name">{c.name}</div>
              <p className="cap-desc">{c.desc}</p>
              <div className="cap-meta">{c.meta}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- SPLASH STATS -------- */
type Stat = { num: string; label: string; detail: string };
function Splash() {
  const t = useTranslations("stats");
  const items = t.raw("items") as Stat[];

  return (
    <section className="splash">
      <div className="wrap">
        <div className="splash-head">
          <div className="eyebrow"><span className="num">04</span> {t("eyebrow")}</div>
          <h2 className="h2" style={{ marginTop: "1.4rem", maxWidth: "20ch" }}>
            {t("titleLine1")} <em>{t("titleLine1Em")}</em><br />{t("titleLine2")}
          </h2>
        </div>
        <div className="splash-grid">
          {items.map((s, i) => (
            <motion.div
              key={s.label}
              className="splash-cell"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <div className="splash-num">
                {s.num.includes("+") || s.num.includes("%") || s.num.includes("×") ? (
                  <>{s.num.replace(/[+%×]/g, "")}<span className="red">{s.num.match(/[+%×]/)?.[0]}</span></>
                ) : s.num}
              </div>
              <div className="splash-label">{s.label}</div>
              <p className="splash-detail">{s.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- WORLD MAP -------- */
const COUNTRY_COORDS: Record<string, { x: number; y: number }> = {
  USA: { x: 22, y: 42 },
  UK: { x: 47, y: 32 },
  Germany: { x: 51, y: 33 },
  Germania: { x: 51, y: 33 },
  France: { x: 49, y: 36 },
  Francia: { x: 49, y: 36 },
  Spain: { x: 47, y: 40 },
  Spagna: { x: 47, y: 40 },
  Italy: { x: 51.5, y: 39 },
  Italia: { x: 51.5, y: 39 },
  Australia: { x: 84, y: 75 },
};

function WorldMap() {
  const t = useTranslations("map");
  const countries = t.raw("countries") as string[];

  return (
    <section className="map-sec">
      <div className="wrap">
        <div className="map-head">
          <div>
            <div className="eyebrow"><span className="num">05</span> {t("eyebrow")}</div>
            <h2 className="h2" style={{ marginTop: "1.4rem" }}>
              {t("titleLine1")}<br /><em>{t("titleLine2Em")}</em>
            </h2>
          </div>
          <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.7, maxWidth: 460 }}>
            {t("lead")}
          </p>
        </div>

        <motion.div
          className="map-canvas"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg viewBox="0 0 100 50" preserveAspectRatio="xMidYMid meet">
            <defs>
              <pattern id="dots" x="0" y="0" width="1.2" height="1.2" patternUnits="userSpaceOnUse">
                <circle cx="0.6" cy="0.6" r="0.18" fill="rgba(245,245,244,0.06)" />
              </pattern>
            </defs>
            <g fill="rgba(245,245,244,0.04)" stroke="rgba(245,245,244,0.06)" strokeWidth="0.1">
              <path d="M5,15 Q8,10 18,11 Q28,12 30,18 Q32,24 28,28 Q22,30 16,28 Q10,26 6,22 Q4,18 5,15 Z" />
              <path d="M22,32 Q28,30 30,36 Q31,42 27,46 Q23,48 20,44 Q19,38 22,32 Z" />
              <path d="M44,24 Q52,22 56,26 Q56,32 50,34 Q44,33 43,28 Q43,25 44,24 Z" />
              <path d="M48,34 Q56,32 58,38 Q58,46 53,48 Q47,47 46,40 Q46,36 48,34 Z" />
              <path d="M58,18 Q72,16 80,22 Q82,28 76,32 Q66,32 60,28 Q57,23 58,18 Z" />
              <path d="M78,38 Q86,36 89,40 Q88,44 83,45 Q78,44 77,41 Q77,39 78,38 Z" />
            </g>
            <rect width="100" height="50" fill="url(#dots)" />

            {countries.map((name, i) => {
              const coords = COUNTRY_COORDS[name];
              if (!coords) return null;
              return (
                <g key={name}>
                  <circle cx={coords.x} cy={coords.y} r="1.2" className="country-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                  <circle cx={coords.x} cy={coords.y} r="0.6" className="country-dot" />
                  <text
                    x={coords.x} y={coords.y - 1.5}
                    fontSize="1.3" fill="rgba(245,245,244,0.5)"
                    fontFamily="Inter,sans-serif" fontWeight="600"
                    textAnchor="middle" letterSpacing="0.05em"
                  >{name}</text>
                </g>
              );
            })}
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

/* -------- PROCESS -------- */
type Step = { n: string; t: string; d: string };
function Process() {
  const t = useTranslations("process");
  const items = t.raw("items") as Step[];

  return (
    <section className="proc" id="process">
      <div className="wrap">
        <div className="proc-grid">
          <div className="proc-sticky">
            <div className="eyebrow"><span className="num">06</span> {t("eyebrow")}</div>
            <h2 className="h2" style={{ marginTop: "1.4rem" }}>
              {t("titleLine1")}<br /><em>{t("titleLine2Em")}</em>
            </h2>
            <p style={{ marginTop: "1.5rem", fontSize: 14, color: "var(--ink-2)", lineHeight: 1.7, maxWidth: 380 }}>
              {t("lead")}
            </p>
          </div>

          <div className="proc-list">
            {items.map((p, i) => (
              <motion.div
                key={p.n}
                className="proc-step"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="proc-step-head">
                  <span className="proc-step-n">{p.n}</span>
                  <span className="proc-step-t">{p.t}</span>
                </div>
                <p className="proc-step-d">{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- FAQ -------- */
type Q = { q: string; a: string };
function Faq() {
  const t = useTranslations("faq");
  const items = t.raw("items") as Q[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="faq" id="faq">
      <div className="wrap">
        <div className="faq-grid">
          <div className="faq-side">
            <div className="eyebrow"><span className="num">08</span> {t("eyebrow")}</div>
            <h2 className="h2" style={{ marginTop: "1.4rem" }}>
              {t("titleLine1")}<br />{t("titleLine2Pre")} <em>{t("titleLine2Em")}</em>
            </h2>
            <p style={{ marginTop: "1.5rem", fontSize: 14, color: "var(--ink-2)", lineHeight: 1.7, maxWidth: 320 }}>
              {t("leadPre")} <a href="#contact" style={{ color: "var(--r)" }}>{t("leadLink")}</a>
            </p>
          </div>

          <div className="faq-list">
            {items.map((f, i) => (
              <div key={i} className="faq-item">
                <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                  <span>{f.q}</span>
<span className={`faq-icon ${open === i ? "o" : ""}`} />
                </button>
                <div className={`faq-a ${open === i ? "o" : ""}`}>
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- CTA FINALE -------- */
function CtaFin() {
  const t = useTranslations("ctaFinal");
  return (
    <section className="cta-fin">
      <div className="wrap-tight">
        <div className="cta-fin-eyebrow eyebrow">{t("eyebrow")}</div>
        <h2 className="cta-fin-h">
          {t("titleLine1")}<br />{t("titleLine2Pre")} <em>{t("titleLine2Em")}</em>
        </h2>
        <p className="cta-fin-p">{t("subtitle")}</p>
        <a href="#contact" className="btn btn-r" style={{ padding: "16px 32px", fontSize: 14 }}>
          {t("cta")} <span className="arr">→</span>
        </a>
      </div>
    </section>
  );
}

/* -------- CONTACT -------- */
function Contact() {
  const t = useTranslations("contact");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setErr(null);
    const sb = createSupabaseBrowserClient();
    const { error } = await sb.from("contact_leads").insert({
      name: form.name, company: form.company || null, email: form.email, message: form.message
    });
    setLoading(false);
    if (error) setErr(t("form.errorGeneric"));
    else setSent(true);
  };

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="contact-grid">
          <div className="contact-side">
            <div className="eyebrow"><span className="num">09</span> {t("eyebrow")}</div>
            <h2 className="h2" style={{ marginTop: "1.4rem" }}>
              {t("titleLine1")}<br /><em>{t("titleLine2Em")}</em>
            </h2>
            <p>{t("subtitle")}</p>
            <div className="contact-detail">
              <div className="contact-detail-i">
                <div>
                  <div className="l">{t("details.emailLabel")}</div>
                  <div className="v"><a href="mailto:miutifin.ask@gmail.com">miutifin.ask@gmail.com</a></div>
                </div>
              </div>
              <div className="contact-detail-i">
                <div>
                  <div className="l">{t("details.replyLabel")}</div>
                  <div className="v">{t("details.replyValue")}</div>
                </div>
              </div>
              <div className="contact-detail-i">
                <div>
                  <div className="l">{t("details.availabilityLabel")}</div>
                  <div className="v">{t("details.availabilityValue")}</div>
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="form-success"
              >
                <div className="form-success-icon">✓</div>
                <p style={{ fontFamily: "var(--f-serif)", fontStyle: "italic", fontSize: "1.6rem", color: "var(--ink)", marginBottom: 8 }}>
                  {t("success.title")}
                </p>
                <p style={{ fontSize: 13, color: "var(--ink-2)" }}>
                  {t("success.desc")}
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={submit}
                className="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label">{t("form.nameLabel")} <span className="req">*</span></label>
                    <input type="text" required value={form.name} onChange={set("name")} placeholder={t("form.namePlaceholder")} className="form-input" />
                  </div>
                  <div className="form-field">
                    <label className="form-label">{t("form.companyLabel")}</label>
                    <input type="text" value={form.company} onChange={set("company")} placeholder={t("form.companyPlaceholder")} className="form-input" />
                  </div>
                </div>
                <div className="form-field">
                  <label className="form-label">{t("form.emailLabel")} <span className="req">*</span></label>
                  <input type="email" required value={form.email} onChange={set("email")} placeholder={t("form.emailPlaceholder")} className="form-input" />
                </div>
                <div className="form-field">
                  <label className="form-label">{t("form.messageLabel")} <span className="req">*</span></label>
                  <textarea required rows={5} value={form.message} onChange={set("message")} placeholder={t("form.messagePlaceholder")} className="form-ta" />
                </div>
                {err && <p style={{ fontSize: 12, color: "#ef4444", marginBottom: 12 }}>{err}</p>}
                <p className="form-privacy">
                  {t("form.privacyPre")} <a href="/privacy">{t("form.privacyLink")}</a>{t("form.privacyPost")}
                </p>
                <button type="submit" disabled={loading} className="form-submit">
                  {loading ? t("form.submitting") : `${t("form.submit")} →`}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* -------- ESCO TEASER -------- */
function EscoTeaser() {
  const t = useTranslations("escoTeaser");
  const locale = useLocale();
  const [stats, setStats] = useState<{ members: number; thisWeek: number; citiesLive: number } | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const sb = createSupabaseBrowserClient();
        const { data, error } = await sb.rpc("get_landing_stats");
        if (!error && data) {
          setStats(data as { members: number; thisWeek: number; citiesLive: number });
        }
      } catch {
        // silenzioso
      }
    };
    fetchStats();
  }, []);

  return (
    <section className="esco-teaser">
      <div className="wrap">
        <motion.div
          className="esco-teaser-inner"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >

          <div className="esco-teaser-mark">esco</div>

          <h2 className="esco-teaser-title">
            <em>{t("titleLine1Em")}</em><br />
            {t("titleLine2")}
          </h2>

          <p className="esco-teaser-desc">{t("description")}</p>

          {stats && (
            <div className="esco-teaser-stats">
              {stats.members > 0 && (
                <div className="esco-teaser-stat">
                  <strong>{stats.members.toLocaleString()}</strong>
                  <span>{t("stats.members")}</span>
                </div>
              )}
              <div className="esco-teaser-stat">
                <strong>{stats.citiesLive}</strong>
                <span>{t("stats.cities")}</span>
              </div>
              {stats.thisWeek > 0 && (
                <div className="esco-teaser-stat">
                  <strong>{stats.thisWeek}</strong>
                  <span>{t("stats.thisWeek")}</span>
                </div>
              )}
            </div>
          )}

          <div className="esco-teaser-cta">
            <a href={`/${locale}/esco`} className="esco-teaser-btn">
              {t("cta")} <span className="arr">→</span>
            </a>
            <span className="esco-teaser-meta">{t("metaText")}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function AgencyLanding() {
  return (
    <>
      <MiutifinLoader />
      <style>{S}</style>
      <div className="grain" />
      <main style={{ background: "var(--bg)", color: "var(--ink)" }}>
        <Navbar />
        <Hero />
        <Strip />
        <EscoTeaser />
        <Manifesto />
        <Works />
        <Capabilities />
        <Splash />
        <WorldMap />
        <Process />
        <Faq />
        <CtaFin />
        <Contact />
        <Footer />
      </main>
    </>
  );
}