"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Footer } from "@/components/homepage/Footer";

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
    --ink-3:rgba(245,245,244,0.36);
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
    font-size:clamp(3.2rem,11vw,10rem);
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
    background:linear-gradient(180deg,transparent 40%,rgba(5,5,5,0.85) 100%);
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

export default function TermsPage() {
  const router = useRouter();

  return (
    <>
      <style>{S}</style>

      <main className="min-h-screen bg-black px-6 py-32">
        <div className="max-w-4xl mx-auto">

          {/* BACK BUTTON */}
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 mb-12 px-4 py-2 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all text-xs font-medium"
            aria-label="Back to previous page"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>

          {/* HEADER */}
          <div className="border-b border-white/10 pb-12 mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-red-500 mb-4">
              Legal · Terms
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold">
              Terms & Conditions
            </h1>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/40">
              <span>Last updated: <span className="text-white/70">November 13, 2025</span></span>
              <span>Version: <span className="text-white/70">2.0</span></span>
              <span>Applies to: <span className="text-white/70">miutifin.com & /esco</span></span>
            </div>
          </div>

          {/* TOC */}
          <nav className="mb-16 p-6 border border-white/10 rounded-xl bg-white/[0.02]">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-4">
              Sections
            </p>
            <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-white/60 list-decimal list-inside">
              <li><a href="#summary" className="hover:text-white">Summary in plain language</a></li>
              <li><a href="#scope" className="hover:text-white">Scope &amp; what these Terms cover</a></li>
              <li><a href="#definitions" className="hover:text-white">Definitions</a></li>
              <li><a href="#agency-services" className="hover:text-white">Agency services (Miutifin)</a></li>
              <li><a href="#esco-access" className="hover:text-white">ESCO access &amp; membership</a></li>
              <li><a href="#accounts" className="hover:text-white">Accounts &amp; invitations</a></li>
              <li><a href="#user-conduct" className="hover:text-white">User conduct</a></li>
              <li><a href="#content" className="hover:text-white">Content &amp; venues</a></li>
              <li><a href="#ai-disclaimer" className="hover:text-white">AI-generated content</a></li>
              <li><a href="#intellectual-property" className="hover:text-white">Intellectual property</a></li>
              <li><a href="#third-parties" className="hover:text-white">Third-party services</a></li>
              <li><a href="#availability" className="hover:text-white">Service availability</a></li>
              <li><a href="#liability" className="hover:text-white">Limitation of liability</a></li>
              <li><a href="#termination" className="hover:text-white">Termination</a></li>
              <li><a href="#changes" className="hover:text-white">Changes to these Terms</a></li>
              <li><a href="#governing-law" className="hover:text-white">Governing law &amp; disputes</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ol>
          </nav>

          {/* CONTENT */}
          <div className="space-y-14 text-white/70 leading-relaxed text-sm">

            {/* 1 — SUMMARY */}
            <section id="summary">
              <h2 className="text-xl font-medium text-white mb-4">1. Summary in plain language</h2>
              <p>Before the legal version: this is what matters.</p>
              <ul className="mt-4 space-y-2 list-disc list-inside marker:text-red-500">
                <li><strong>Miutifin</strong> is a software factory that builds software products. <strong>ESCO</strong> is our private network for city experiences — invitation-only.</li>
                <li>By using either, you agree to use them lawfully and respectfully.</li>
                <li>If you're invited to ESCO, you get <strong>three invites</strong> of your own. Don't sell them or use them in bad faith.</li>
                <li>ESCO recommendations are AI-curated suggestions, not guarantees. Venues are independent third parties — they aren't run by us.</li>
                <li>We can suspend or close accounts that break the rules.</li>
                <li>We aren't liable for outcomes outside our control (a closed venue, a bad night, weather).</li>
              </ul>
              <p className="mt-4 text-white/40 italic">The rest is the formal version.</p>
            </section>

            {/* 2 — SCOPE */}
            <section id="scope">
              <h2 className="text-xl font-medium text-white mb-4">2. Scope &amp; what these Terms cover</h2>
              <p>
                These Terms &amp; Conditions (&quot;Terms&quot;) govern your access to and use of <strong>miutifin.com</strong> and any services we operate under it, including <strong>ESCO</strong> (<code className="text-xs px-2 py-1 bg-white/5 rounded">miutifin.com/esco</code> and related mobile applications).
              </p>
              <p className="mt-3">
                By accessing, browsing, registering, or otherwise using the Platform, you agree to be bound by these Terms. If you do not agree, you must not use the Platform.
              </p>
              <p className="mt-3">
                These Terms work together with our{" "}
                <Link href="/privacy" className="text-white underline hover:text-white/80">Privacy Policy</Link>{" "}
                and{" "}
                <Link href="/cookies" className="text-white underline hover:text-white/80">Cookie Policy</Link>.
              </p>
            </section>

            {/* 3 — DEFINITIONS */}
            <section id="definitions">
              <h2 className="text-xl font-medium text-white mb-4">3. Definitions</h2>
              <ul className="space-y-3 list-disc list-inside marker:text-red-500">
                <li><strong>&quot;Miutifin&quot;</strong>, &quot;we&quot;, &quot;us&quot; — the entity operating the Platform.</li>
                <li><strong>&quot;ESCO&quot;</strong> — the private, invitation-only network for city experiences operated by Miutifin.</li>
                <li><strong>&quot;Platform&quot;</strong> — the website, mobile app, and related services, including both Miutifin and ESCO.</li>
                <li><strong>&quot;User&quot;</strong> — anyone who accesses the Platform.</li>
                <li><strong>&quot;Member&quot;</strong> — a User who has been approved for ESCO and holds an active account.</li>
                <li><strong>&quot;Invite&quot;</strong> — a single-use code that grants someone access to ESCO membership.</li>
                <li><strong>&quot;Journey&quot;</strong> — a personalized AI-composed sequence of places and timing within ESCO.</li>
                <li><strong>&quot;Content&quot;</strong> — anything published on the Platform, including venue listings, journeys, descriptions, and user contributions.</li>
                <li><strong>&quot;Venue&quot;</strong> — a third-party place (bar, restaurant, club, gallery, etc.) referenced in ESCO. Venues are independent businesses, not operated by Miutifin.</li>
              </ul>
            </section>

            {/* 4 — AGENCY SERVICES */}
            <section id="agency-services">
              <h2 className="text-xl font-medium text-white mb-4">4. Agency services (Miutifin)</h2>
              <p>
                Miutifin provides custom software development services — including AI integrations, web and mobile applications, robotics, and digital strategy — as an independent contractor.
              </p>
              <p className="mt-3">
                Project-specific terms (scope, deliverables, pricing, timelines, IP assignment) are governed by a <strong>separate written agreement</strong> signed with each client. Those agreements take precedence over these general Terms for project work.
              </p>
              <p className="mt-3">
                Submitting the contact form does not create a contractual relationship. A contract begins only after we agree on scope in writing.
              </p>
            </section>

            {/* 5 — ESCO ACCESS */}
            <section id="esco-access">
              <h2 className="text-xl font-medium text-white mb-4">5. ESCO access &amp; membership</h2>
              <p>
                ESCO is a <strong>private, invitation-only network</strong>. Access is granted in one of two ways:
              </p>
              <ul className="mt-3 space-y-2 list-disc list-inside marker:text-red-500">
                <li>Application through the public waitlist, with approval at our sole discretion (typically in weekly batches).</li>
                <li>Invitation from an existing Member who has remaining invites.</li>
              </ul>
              <p className="mt-4">
                We reserve the right, at our sole discretion and without prior notice, to:
              </p>
              <ul className="mt-3 space-y-2 list-disc list-inside marker:text-red-500">
                <li>Approve, deny, or postpone any waitlist application</li>
                <li>Limit access by city, region, or membership cap</li>
                <li>Revoke invitations or suspend accounts that violate these Terms</li>
                <li>Close access entirely for any reason or no reason</li>
              </ul>
              <p className="mt-4 text-white/50">
                ESCO is not a guaranteed service. Membership is a privilege we extend, not a right.
              </p>
            </section>

            {/* 6 — ACCOUNTS */}
            <section id="accounts">
              <h2 className="text-xl font-medium text-white mb-4">6. Accounts &amp; invitations</h2>
              <h3 className="text-base font-medium text-white mt-6 mb-3">6.1 Account responsibility</h3>
              <p>
                You are responsible for:
              </p>
              <ul className="mt-3 space-y-2 list-disc list-inside marker:text-red-500">
                <li>Keeping your account credentials confidential</li>
                <li>All activity that occurs under your account</li>
                <li>Notifying us immediately of unauthorized access</li>
                <li>Providing accurate, up-to-date information during registration</li>
              </ul>

              <h3 className="text-base font-medium text-white mt-6 mb-3">6.2 Invitations</h3>
              <p>
                Each active Member receives <strong>three (3) invitations</strong>. Invitations:
              </p>
              <ul className="mt-3 space-y-2 list-disc list-inside marker:text-red-500">
                <li>Are personal, single-use, and tied to your account</li>
                <li>May not be sold, traded, listed, or otherwise commercialized</li>
                <li>May be revoked by us if used in bad faith or to bypass our access policies</li>
              </ul>
              <p className="mt-4 text-white/50">
                Selling or attempting to sell invitations is grounds for immediate account termination.
              </p>

              <h3 className="text-base font-medium text-white mt-6 mb-3">6.3 Age requirement</h3>
              <p>
                You must be at least <strong>16 years old</strong> to use the Platform. Some features (e.g. nightlife-related venues) may require you to be of legal age in your country.
              </p>
            </section>

            {/* 7 — USER CONDUCT */}
            <section id="user-conduct">
              <h2 className="text-xl font-medium text-white mb-4">7. User conduct</h2>
              <p>By using the Platform, you agree <strong>not</strong> to:</p>
              <ul className="mt-3 space-y-2 list-disc list-inside marker:text-red-500">
                <li>Use the Platform for unlawful, harmful, or fraudulent purposes</li>
                <li>Attempt to access systems, data, or accounts that don&apos;t belong to you</li>
                <li>Use automated scripts, bots, or scrapers without our written permission</li>
                <li>Submit false, misleading, or impersonating information</li>
                <li>Harass, threaten, or harm other Members or third parties</li>
                <li>Interfere with the operation of the Platform or attempt to overload our infrastructure</li>
                <li>Reverse engineer, decompile, or attempt to derive source code from the Platform</li>
                <li>Use the Platform to send unsolicited promotional content</li>
                <li>Circumvent access controls, invitation systems, or geographic restrictions</li>
              </ul>
            </section>

            {/* 8 — CONTENT */}
            <section id="content">
              <h2 className="text-xl font-medium text-white mb-4">8. Content &amp; venues</h2>
              <h3 className="text-base font-medium text-white mt-6 mb-3">8.1 Curated content</h3>
              <p>
                ESCO curates and surfaces information about places, venues, events, and experiences. This content is provided for <strong>informational and discovery purposes only</strong>. We do not own, operate, control, or warrant any third-party venue.
              </p>

              <h3 className="text-base font-medium text-white mt-6 mb-3">8.2 No guarantees on third parties</h3>
              <p>
                Availability, pricing, opening hours, atmosphere, dress codes, and quality of any third-party venue may change without notice. We make reasonable efforts to keep listings accurate but provide no guarantees.
              </p>

              <h3 className="text-base font-medium text-white mt-6 mb-3">8.3 Bookings &amp; transactions</h3>
              <p>
                Any bookings, payments, or transactions made with a third-party venue are governed by that venue&apos;s own terms. We are not a party to those transactions and are not responsible for refunds, cancellations, or disputes with venues.
              </p>

              <h3 className="text-base font-medium text-white mt-6 mb-3">8.4 User-submitted content</h3>
              <p>
                If you submit venue suggestions, ratings, photos, or other content, you grant Miutifin a non-exclusive, worldwide, royalty-free license to use, display, and adapt that content within the Platform.
              </p>
            </section>

            {/* 9 — AI DISCLAIMER */}
            <section id="ai-disclaimer">
              <h2 className="text-xl font-medium text-white mb-4">9. AI-generated content</h2>
              <p>
                ESCO uses artificial intelligence to compose personalized journeys, descriptions, and recommendations.
              </p>
              <p className="mt-3">
                AI-generated content:
              </p>
              <ul className="mt-3 space-y-2 list-disc list-inside marker:text-red-500">
                <li>Is a <strong>suggestion</strong>, not a guarantee or recommendation in any professional sense</li>
                <li>May contain inaccuracies, omissions, or outdated information</li>
                <li>Should be verified before acting on it (e.g. confirming opening hours, booking availability)</li>
                <li>Is not financial, medical, legal, or safety advice</li>
              </ul>
              <p className="mt-4 text-white/50">
                You remain responsible for your own decisions. ESCO suggests a path; you choose to follow it.
              </p>
            </section>

            {/* 10 — IP */}
            <section id="intellectual-property">
              <h2 className="text-xl font-medium text-white mb-4">10. Intellectual property</h2>
              <p>
                All intellectual property rights in the Platform — including the brand, design, software, logos, illustrations, original content, and journey composition algorithms — are owned by Miutifin or its licensors.
              </p>
              <p className="mt-3">
                Except as permitted by applicable law (e.g. private personal use), you may not:
              </p>
              <ul className="mt-3 space-y-2 list-disc list-inside marker:text-red-500">
                <li>Copy, reproduce, or redistribute Platform content</li>
                <li>Create derivative works based on our content or interfaces</li>
                <li>Use our trademarks, logos, or brand without written permission</li>
                <li>Mirror, frame, or systematically extract data from the Platform</li>
              </ul>
              <p className="mt-4 text-white/50">
                Third-party venue names, logos, and trademarks belong to their respective owners and are referenced under fair use for the purpose of identification.
              </p>
            </section>

            {/* 11 — THIRD PARTIES */}
            <section id="third-parties">
              <h2 className="text-xl font-medium text-white mb-4">11. Third-party services</h2>
              <p>
                The Platform integrates with third-party providers (e.g. Supabase, Vercel, Anthropic, OpenAI, Plausible, Google Places). Your use of those services is also governed by their own terms.
              </p>
              <p className="mt-3">
                We are not responsible for the policies, practices, or content of third-party services. See our{" "}
                <Link href="/privacy" className="text-white underline hover:text-white/80">Privacy Policy</Link>{" "}
                for the full list.
              </p>
            </section>

            {/* 12 — AVAILABILITY */}
            <section id="availability">
              <h2 className="text-xl font-medium text-white mb-4">12. Service availability</h2>
              <p>
                The Platform is provided on an <strong>&quot;as is&quot; and &quot;as available&quot;</strong> basis. We do not guarantee:
              </p>
              <ul className="mt-3 space-y-2 list-disc list-inside marker:text-red-500">
                <li>Uninterrupted, error-free, or secure access</li>
                <li>That features will remain available, unchanged, or supported indefinitely</li>
                <li>That bugs or issues will be fixed within any specific timeframe</li>
              </ul>
              <p className="mt-4">
                We may perform maintenance, update features, or temporarily suspend access without notice when necessary.
              </p>
            </section>

            {/* 13 — LIABILITY */}
            <section id="liability">
              <h2 className="text-xl font-medium text-white mb-4">13. Limitation of liability</h2>
              <p>
                To the maximum extent permitted by applicable law:
              </p>
              <ul className="mt-3 space-y-2 list-disc list-inside marker:text-red-500">
                <li>Miutifin is not liable for any indirect, incidental, consequential, special, or punitive damages arising from your use of the Platform.</li>
                <li>Our total liability for any direct damages shall not exceed <strong>the amount you paid us in the twelve months preceding the claim</strong>, or one hundred euros (€100) if no payment was made.</li>
                <li>We are not liable for the actions, content, or services of third parties, including venues, payment processors, or AI providers.</li>
                <li>We are not liable for losses caused by events outside our reasonable control (force majeure, infrastructure outages, government actions).</li>
              </ul>
              <p className="mt-4 text-white/50">
                Nothing in these Terms limits liability that cannot be limited under applicable consumer protection law.
              </p>
            </section>

            {/* 14 — TERMINATION */}
            <section id="termination">
              <h2 className="text-xl font-medium text-white mb-4">14. Termination</h2>
              <h3 className="text-base font-medium text-white mt-6 mb-3">14.1 Termination by us</h3>
              <p>
                We may suspend, restrict, or terminate your access to the Platform at any time, with or without notice, if:
              </p>
              <ul className="mt-3 space-y-2 list-disc list-inside marker:text-red-500">
                <li>You violate these Terms</li>
                <li>You misuse invitations or the access system</li>
                <li>You engage in fraudulent or abusive behavior</li>
                <li>We discontinue the service entirely</li>
              </ul>

              <h3 className="text-base font-medium text-white mt-6 mb-3">14.2 Termination by you</h3>
              <p>
                You can close your account at any time by contacting us. After closure, your data is deleted in accordance with our{" "}
                <Link href="/privacy" className="text-white underline hover:text-white/80">Privacy Policy</Link>.
              </p>
            </section>

            {/* 15 — CHANGES */}
            <section id="changes">
              <h2 className="text-xl font-medium text-white mb-4">15. Changes to these Terms</h2>
              <p>
                We may update these Terms from time to time. Material changes will be communicated to active Members by email at least <strong>14 days before</strong> they take effect.
              </p>
              <p className="mt-3">
                Continued use of the Platform after changes are published constitutes acceptance of the revised Terms. If you don&apos;t agree with a change, your remedy is to stop using the Platform.
              </p>
            </section>

            {/* 16 — GOVERNING LAW */}
            <section id="governing-law">
              <h2 className="text-xl font-medium text-white mb-4">16. Governing law &amp; disputes</h2>
              <p>
                These Terms are governed by the laws of <strong>Italy</strong>, without regard to conflict-of-law principles.
              </p>
              <p className="mt-3">
                Any dispute arising from these Terms or your use of the Platform will be resolved:
              </p>
              <ul className="mt-3 space-y-2 list-disc list-inside marker:text-red-500">
                <li>First, by good-faith negotiation between the parties</li>
                <li>If unresolved, by the competent courts of <strong>Milan, Italy</strong></li>
              </ul>
              <p className="mt-4 text-white/50">
                If you are a consumer resident in the European Union, mandatory consumer protection laws of your country of residence will still apply. Nothing in this clause prevents you from filing a complaint through the EU Online Dispute Resolution platform at{" "}
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener" className="text-white underline hover:text-white/80">
                  ec.europa.eu/consumers/odr
                </a>.
              </p>
            </section>

            {/* 17 — CONTACT */}
            <section id="contact">
              <h2 className="text-xl font-medium text-white mb-4">17. Contact</h2>
              <div className="border border-white/10 rounded-xl p-6 bg-white/[0.02]">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Legal contact</p>
                <p>For any question regarding these Terms:</p>
                <p className="mt-3">
                  <a
                    href="mailto:miutifin.ask@gmail.com"
                    className="text-white text-base font-medium underline hover:text-white/80"
                  >
                    miutifin.ask@gmail.com
                  </a>
                </p>
                <p className="mt-4 text-xs text-white/40">
                  We aim to respond within 24 hours during business days.
                </p>
              </div>
            </section>

            {/* FOOTER NOTE */}
            <div className="pt-8 border-t border-white/10 text-xs text-white/30">
              <p>
                These Terms are provided in English for international clarity. Italian residents may request an Italian translation by writing to the address above. In case of conflict, the English version prevails for non-mandatory provisions; mandatory provisions under EU and Italian consumer law are interpreted according to local law.
              </p>
            </div>

          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}