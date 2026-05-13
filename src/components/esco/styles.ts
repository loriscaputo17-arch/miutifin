export const ESCO_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap');

  html:has(.esco-root){background:#f5f3ee !important}
  body:has(.esco-root){background:#f5f3ee !important;color:#0a0a0a !important;margin:0 !important}

  .esco-root{
    --paper:#f5f3ee;
    --paper-2:#efece5;
    --paper-3:#e6e2d8;
    --ink:#0a0a0a;
    --ink-2:rgba(10,10,10,0.62);
    --ink-3:rgba(10,10,10,0.42);
    --ink-4:rgba(10,10,10,0.18);
    --ink-5:rgba(10,10,10,0.08);
    --line:rgba(10,10,10,0.1);
    --line-2:rgba(10,10,10,0.05);

    /* Vermilion accent */
  --terra:#e63946;
  --terra-2:#d62839;
  --terra-soft:rgba(230,57,70,0.1);
  --terra-line:rgba(230,57,70,0.28);

    --f-sans:'Inter',system-ui,-apple-system,sans-serif;
    --f-serif:'Instrument Serif',Georgia,serif;

    background:var(--paper);
    color:var(--ink);
    font-family:var(--f-sans);
    -webkit-font-smoothing:antialiased;
    min-height:100vh;width:100%;
    position:relative;overflow-x:hidden;
  }
  .esco-root *,.esco-root *::before,.esco-root *::after{box-sizing:border-box;margin:0;padding:0}
  .esco-root ::selection{background:var(--terra);color:var(--paper)}
  .esco-root a{text-decoration:none;}
  .esco-root button{font-family:var(--f-sans);cursor:pointer}
  .esco-root img{display:block;max-width:100%}

  .esco-grain{
    position:fixed;inset:0;z-index:1;pointer-events:none;
    opacity:0.16;mix-blend-mode:multiply;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
  }
  .esco-root main{position:relative;z-index:2}

  .esco-wrap{max-width:1200px;margin:0 auto;padding:0 clamp(1rem,5vw,2.5rem)}
  .esco-wrap-tight{max-width:780px;margin:0 auto;padding:0 clamp(1rem,5vw,2.5rem)}

  /* ═══════════════════════════════════════
     NAVBAR
  ═══════════════════════════════════════ */
  .esco-nav{
    position:fixed;top:0;left:0;right:0;z-index:100;
    padding:14px clamp(1rem,5vw,2.5rem);
    background:rgba(245,243,238,0.72);
    backdrop-filter:blur(16px) saturate(140%);
    -webkit-backdrop-filter:blur(16px) saturate(140%);
    border-bottom:1px solid transparent;
    transition:all .3s;
  }
  .esco-nav.s{
    border-bottom-color:var(--line);
    background:rgba(245,243,238,0.94);
    padding-top:10px;padding-bottom:10px;
  }
  .esco-nav-inner{
    max-width:1320px;margin:0 auto;
    display:flex;justify-content:space-between;align-items:center;gap:1.5rem;
  }

  .esco-brand{display:flex;align-items:center;gap:10px;flex-shrink:0}
  .esco-brand-logo{
    width:34px;height:34px;border-radius:8px;
    background:var(--ink);
    display:flex;align-items:center;justify-content:center;
    flex-shrink:0;
  }
  .esco-brand-logo img{width:18px;height:18px;object-fit:contain}
  .esco-brand-name{
    font-size:26px;letter-spacing:-0.02em;color:var(--ink);
    line-height:1;font-weight:600;letter-spacing:-2px;
  }
  .esco-brand-back{
    display:none;align-items:center;gap:6px;
    font-size:11px;color:var(--ink-3);font-weight:500;
    padding-left:12px;margin-left:4px;
    border-left:1px solid var(--line);
    transition:color .2s;
  }
  .esco-brand-back:hover{color:var(--ink)}
  .esco-brand-back svg{width:10px;height:10px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
  @media(min-width:920px){.esco-brand-back{display:inline-flex}}

  .esco-nav-links{
    display:none;align-items:center;gap:2rem;
    flex:1;justify-content:center;
  }
  @media(min-width:920px){.esco-nav-links{display:flex}}
  .esco-nav-links a{
    font-size:13px;color:var(--ink-2);font-weight:500;
    letter-spacing:-0.005em;transition:color .2s;
  }
  .esco-nav-links a:hover{color:var(--ink)}

  .esco-nav-right{display:flex;align-items:center;gap:10px;flex-shrink:0}
  .esco-nav-member{
    display:none;font-size:12px;color:var(--ink-2);font-weight:500;
    letter-spacing:-0.005em;transition:color .2s;
    padding:8px 12px;
  }
  .esco-nav-member:hover{color:var(--terra)}
  @media(min-width:920px){.esco-nav-member{display:inline-flex}}
  .esco-nav-cta{
    font-size:12px;font-weight:500;color:var(--paper);
    padding:9px 18px;background:var(--terra);
    border-radius:100px;border:1px solid var(--terra);
    transition:all .2s;letter-spacing:-0.005em;white-space:nowrap;
  }
  .esco-nav-cta:hover{background:var(--ink);border-color:var(--ink);color:#fff}

  .esco-burger{
    display:flex;flex-direction:column;gap:4px;
    width:36px;height:36px;
    align-items:center;justify-content:center;
    background:transparent;border:1px solid var(--ink-4);
    border-radius:50%;cursor:pointer;
    transition:all .25s;
  }
  @media(min-width:920px){.esco-burger{display:none}}
  .esco-burger:hover{border-color:var(--ink)}
  .esco-burger span{display:block;width:14px;height:1.5px;background:var(--ink);transition:all .3s}
  .esco-burger.o{background:var(--ink);border-color:var(--ink)}
  .esco-burger.o span{background:var(--paper)}
  .esco-burger.o span:nth-child(1){transform:rotate(45deg) translate(3.5px,3.5px)}
  .esco-burger.o span:nth-child(2){opacity:0;transform:scaleX(0)}
  .esco-burger.o span:nth-child(3){transform:rotate(-45deg) translate(3.5px,-3.5px)}

  /* MOBILE MENU */
  .esco-mob{
    position:fixed;inset:0;z-index:99;
    background:var(--paper);
    transform:translateX(100%);
    transition:transform .5s cubic-bezier(.76,0,.24,1);
    padding:90px clamp(1.5rem,6vw,2.5rem) 2.5rem;
    display:flex;flex-direction:column;
    overflow-y:auto;
  }
  .esco-mob.o{transform:translateX(0)}
  .esco-mob-eyebrow{
    font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;
    color:var(--ink-3);margin-bottom:1.5rem;
    display:flex;align-items:center;gap:10px;
  }
  .esco-mob-eyebrow::before{content:'';width:18px;height:1px;background:var(--terra)}
  .esco-mob-list{display:flex;flex-direction:column}
  .esco-mob-list a{
    font-family:var(--f-serif);font-weight:400;
    font-size:clamp(2rem,8vw,3rem);
    color:var(--ink);letter-spacing:-0.025em;line-height:1.1;
    padding:.7rem 0;border-bottom:1px solid var(--line);
    display:flex;justify-content:space-between;align-items:center;gap:1rem;
    transition:color .25s,padding-left .3s;
  }
  .esco-mob-list a .arr{font-size:18px;color:var(--ink-3);transition:color .25s,transform .3s}
  .esco-mob-list a:hover{color:var(--terra);padding-left:8px}
  .esco-mob-list a:hover .arr{color:var(--terra);transform:translateX(4px)}
  .esco-mob-foot{
    margin-top:auto;padding-top:2.5rem;
    display:flex;flex-direction:column;gap:14px;
  }
  .esco-mob-cta{
    display:flex;align-items:center;justify-content:center;gap:6px;
    padding:16px 24px;background:var(--terra);color:var(--paper);
    border-radius:100px;font-size:14px;font-weight:500;
    transition:background .2s;
  }
  .esco-mob-cta:hover{background:var(--ink)}
  .esco-mob-foot-info{
    display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;
    padding-top:1rem;border-top:1px solid var(--line);
  }
  .esco-mob-foot-info span{font-size:11px;color:var(--ink-3);letter-spacing:.02em}
  .esco-mob-foot-info .live{color:var(--terra);font-weight:600}
  .esco-mob-foot-info .live::before{
    content:'';width:5px;height:5px;border-radius:50%;background:var(--terra);
    display:inline-block;margin-right:5px;vertical-align:middle;
    animation:esco-pulse 2.4s infinite;
  }

  /* ═══════════════════════════════════════
     HERO
  ═══════════════════════════════════════ */
  .esco-hero{
    min-height:100svh;position:relative;overflow:hidden;
    display:flex;flex-direction:column;justify-content:center;
    padding:130px clamp(1rem,5vw,2.5rem) 60px;
  }
  .esco-hero-bg{
    position:absolute;left:-2vw;bottom:-12vw;
    font-family:var(--f-serif);font-style:italic;font-weight:400;
    font-size:clamp(18rem,42vw,55rem);
    line-height:0.8;letter-spacing:-0.06em;
    color:var(--ink);opacity:0.04;
    pointer-events:none;user-select:none;
    z-index:0;white-space:nowrap;
  }
  .esco-hero-stats{
    position:absolute;top:96px;right:20%;
    display:flex;align-items:center;gap:1.4rem;z-index:3;
  }
  @media(max-width:780px){
    .esco-hero-stats{
      position:relative;top:0;right:0;
      margin-bottom:2rem;justify-content:flex-start;
      gap:1rem;flex-wrap:wrap;
    }
  }
  .esco-hero-stat{
    display:flex;flex-direction:column;align-items:flex-end;
    font-size:9px;letter-spacing:.06em;color:var(--ink-3);
    text-transform:uppercase;font-weight:500;line-height:1.4;
  }

  .esco-cta-hint{
    display:inline-flex;align-items:center;gap:10px;
    margin-top:1.2rem;
    font-size:12px;color:var(--ink-3);
    letter-spacing:-0.005em;
  }
  .esco-cta-hint em{
    font-family:var(--f-serif);font-style:italic;
    color:var(--terra);
  }

  .esco-btn-hero{
    position:relative;
    animation:esco-cta-breathe 3s ease-in-out infinite;
  }
  @keyframes esco-cta-breathe{
    0%,100%{box-shadow:0 0 0 0 rgba(230,57,70,0)}
    50%{box-shadow:0 0 0 8px rgba(230,57,70,0.08)}
  }

  .esco-mobile-cta{
    display:none;
    position:fixed;left:1rem;right:1rem;bottom:1rem;z-index:50;
    padding:14px 24px;background:var(--terra);color:var(--paper);
    border-radius:100px;font-size:14px;font-weight:500;text-align:center;
    box-shadow:0 8px 24px rgba(230,57,70,0.3);
    letter-spacing:-0.005em;
    transform:translateY(120%);
    transition:transform .4s cubic-bezier(.4,0,.2,1);
  }
  .esco-mobile-cta.v{transform:translateY(0)}
  @media(max-width:780px){.esco-mobile-cta{display:block}}

  @media(max-width:780px){.esco-hero-stat{align-items:flex-start}}
  .esco-hero-stat strong{
    font-family:var(--f-serif);font-style:italic;font-weight:400;
    font-size:clamp(1.2rem,2vw,1.5rem);letter-spacing:-0.02em;color:var(--ink);
    text-transform:none;line-height:1;
  }
  .esco-hero-stat-sep{width:1px;height:30px;background:var(--line)}
  @media(max-width:780px){.esco-hero-stat-sep{display:none}}

  .esco-hero-inner{position:relative;z-index:2;width:100%}

  .esco-eyebrow{
    display:inline-flex;align-items:center;gap:10px;
    font-size:11px;font-weight:500;letter-spacing:.04em;
    color:var(--ink-2);margin-bottom:2rem;
    flex-wrap:wrap;
  }
  .esco-dot{
    width:7px;height:7px;border-radius:50%;background:var(--terra);
    animation:esco-pulse 2.4s infinite;flex-shrink:0;
  }
  @keyframes esco-pulse{
    0%{box-shadow:0 0 0 0 rgba(230,57,70,0.4)}
    100%{box-shadow:0 0 0 12px rgba(230,57,70,0)}
  }
  .esco-hero-mark{
    font-family:var(--f-serif);font-size:13px;
    color:var(--ink-2);letter-spacing:-0.01em;margin-bottom:1.2rem;
  }
  .esco-h1{
    font-family:var(--f-serif);font-weight:400;
    font-size:clamp(3rem,10vw,9rem);
    line-height:0.92;letter-spacing:-0.03em;
    color:var(--ink);max-width:14ch;margin-bottom:1.8rem;
  }
  .esco-h1 em{font-style:italic;color:var(--terra)}
  .esco-h1 .underline{position:relative;display:inline-block}
  .esco-h1 .underline::after{
    content:'';position:absolute;left:0;right:0;bottom:0.06em;
    height:2px;
  }
  .esco-hero-sub{
    font-size:clamp(1rem,1.5vw,1.15rem);
    color:var(--ink-2);max-width:520px;line-height:1.65;
    letter-spacing:-0.005em;margin-bottom:2.5rem;
  }
  .esco-ctas{display:flex;gap:10px;flex-wrap:wrap;align-items:center}

  .esco-btn{
    display:inline-flex;align-items:center;gap:8px;
    padding:14px 24px;border-radius:100px;
    font-size:13px;font-weight:500;letter-spacing:-0.005em;
    transition:all .25s cubic-bezier(.4,0,.2,1);white-space:nowrap;
    border:1px solid transparent;cursor:pointer;
  }
  .esco-btn-ink{background:var(--terra);color:#fff;border-color:var(--terra)}
  .esco-btn-ink:hover{background:var(--ink);border-color:var(--ink);color:#fff}
  .esco-btn-line{background:transparent;color:var(--ink);border-color:var(--ink-4)}
  .esco-btn-line:hover{border-color:var(--ink)}
  .esco-arr{transition:transform .25s;display:inline-block}
  .esco-btn:hover .esco-arr{transform:translateX(3px)}

  .esco-hero-foot{
    margin-top:auto;padding-top:4rem;
    display:grid;grid-template-columns:repeat(3,auto);gap:2rem;
    justify-content:start;
  }
  @media(max-width:680px){.esco-hero-foot{grid-template-columns:1fr;gap:1.2rem}}
  .esco-foot-block{font-size:11px;color:var(--ink-3);letter-spacing:.02em;line-height:1.55;max-width:200px}
  .esco-foot-block strong{display:block;color:var(--ink);font-weight:500;margin-bottom:3px;letter-spacing:-0.005em;font-size:11px}

  /* ═══════════════════════════════════════
     INTRO
  ═══════════════════════════════════════ */
  .esco-intro{padding:clamp(4rem,10vw,8rem) 0;border-top:1px solid var(--line)}
  .esco-intro p{
    font-family:var(--f-serif);font-weight:400;
    font-size:clamp(1.6rem,4vw,3rem);
    line-height:1.2;letter-spacing:-0.02em;
    color:var(--ink);max-width:22ch;
  }
  .esco-intro em{font-style:italic;color:var(--terra)}
  .esco-intro strong{font-weight:400;font-style:italic;color:var(--ink-3)}

  /* SECTION LABEL & H2 */
  .esco-label{
    font-size:10px;font-weight:600;letter-spacing:.16em;
    text-transform:uppercase;color:var(--ink-3);
    margin-bottom:2.5rem;display:flex;align-items:center;gap:10px;
  }
  .esco-label::before{content:'';width:18px;height:1px;background:var(--terra)}
  .esco-h2{
    font-family:var(--f-serif);font-weight:400;
    font-size:clamp(2rem,5vw,4rem);
    line-height:1.0;letter-spacing:-0.025em;color:var(--ink);max-width:14ch;
  }
  .esco-h2 em{font-style:italic;color:var(--terra)}
  .esco-lead{font-size:14px;color:var(--ink-2);line-height:1.7;max-width:380px}

  /* HOW */
  .esco-how{padding:clamp(4rem,8vw,7rem) 0;border-top:1px solid var(--line)}
  .esco-how-grid{
    display:grid;grid-template-columns:repeat(3,1fr);
    gap:1px;background:var(--line);
    border-top:1px solid var(--line);border-bottom:1px solid var(--line);
  }
  @media(max-width:780px){.esco-how-grid{grid-template-columns:1fr}}
  .esco-how-cell{
    background:var(--paper);padding:clamp(1.8rem,3vw,2.5rem);
    display:flex;flex-direction:column;gap:1rem;
    transition:background .3s;position:relative;
  }
  .esco-how-cell:hover{background:var(--paper-2)}
  .esco-how-n{font-family:var(--f-serif);font-size:1.2rem;color:var(--terra)}
  .esco-how-t{
    font-family:var(--f-serif);font-weight:400;
    font-size:clamp(1.4rem,2.4vw,1.9rem);
    line-height:1.1;letter-spacing:-0.02em;color:var(--ink);
  }
  .esco-how-b{font-size:14px;color:var(--ink-2);line-height:1.7}

  /* SIMULATOR */
  .esco-sim{padding:clamp(4rem,10vw,8rem) 0;border-top:1px solid var(--line);background:var(--paper-2)}
  .esco-sim-grid{display:grid;grid-template-columns:1fr 1.3fr;gap:clamp(2rem,5vw,5rem);align-items:flex-start}
  @media(max-width:900px){.esco-sim-grid{grid-template-columns:1fr;gap:2.5rem}}
  .esco-sim-controls{display:flex;flex-direction:column;gap:1.8rem}
  .esco-sim-glabel{
    font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;
    color:var(--ink-3);margin-bottom:0.8rem;
  }
  .esco-sim-tags{display:flex;flex-wrap:wrap;gap:6px}
  .esco-sim-tag{
    padding:8px 16px;border-radius:100px;
    border:1px solid var(--ink-4);background:transparent;
    font-size:13px;color:var(--ink-2);letter-spacing:-0.005em;
    transition:all .2s;font-family:var(--f-sans);
  }
  .esco-sim-tag:hover{border-color:var(--ink-2);color:var(--ink)}
  .esco-sim-tag.a{background:var(--ink);color:var(--paper);border-color:var(--ink)}

  .esco-sim-output{
    background:var(--paper);border:1px solid var(--line);
    padding:clamp(1.8rem,4vw,3rem);
    min-height:380px;display:flex;flex-direction:column;
    position:relative;
  }
  .esco-sim-out-meta{
    font-size:10px;color:var(--terra);letter-spacing:.14em;
    text-transform:uppercase;font-weight:600;margin-bottom:1.2rem;
    display:flex;align-items:center;gap:8px;
  }
  .esco-sim-out-meta::before{
    content:'';width:6px;height:6px;border-radius:50%;background:var(--terra);
    animation:esco-pulse 2s infinite;
  }
  .esco-sim-out-t{
    font-family:var(--f-serif);font-weight:400;
    font-size:clamp(1.6rem,3.2vw,2.6rem);line-height:1.05;
    letter-spacing:-0.02em;color:var(--ink);margin-bottom:1.2rem;
  }
  .esco-sim-out-b{
    font-size:15px;color:var(--ink);line-height:1.75;
    letter-spacing:-0.005em;max-width:50ch;
  }
  .esco-sim-out-foot{
    margin-top:auto;padding-top:1.8rem;
    border-top:1px dashed var(--line);
    font-size:11px;color:var(--ink-3);letter-spacing:.02em;line-height:1.6;
  }
  .esco-sim-out-foot strong{color:var(--ink);font-weight:500}

  /* JOURNEYS */
  .esco-journeys{padding:clamp(4rem,10vw,8rem) 0;border-top:1px solid var(--line)}
  .esco-journeys-head{
    display:grid;grid-template-columns:1fr 1fr;gap:3rem;
    align-items:end;margin-bottom:4rem;
  }
  @media(max-width:780px){.esco-journeys-head{grid-template-columns:1fr;gap:1.5rem;margin-bottom:2.5rem}}
  .esco-journey-list{display:flex;flex-direction:column}
  .esco-journey{
    display:grid;grid-template-columns:80px 1fr;gap:clamp(1.5rem,4vw,4rem);
    padding:clamp(2.5rem,5vw,4rem) 0;
    border-top:1px solid var(--line);
    align-items:flex-start;
  }
  .esco-journey:last-child{border-bottom:1px solid var(--line)}
  @media(max-width:780px){.esco-journey{grid-template-columns:1fr;gap:1rem;padding:2rem 0}}
  .esco-journey-num{
    font-family:var(--f-serif);font-style:italic;font-weight:400;
    font-size:clamp(1.8rem,2.4vw,2.2rem);color:var(--terra);line-height:1;
  }
  .esco-journey-meta{
    font-size:11px;color:var(--ink-3);letter-spacing:.04em;
    text-transform:uppercase;font-weight:500;margin-bottom:1rem;
  }
  .esco-journey-t{
    font-family:var(--f-serif);font-weight:400;
    font-size:clamp(1.6rem,3.4vw,2.6rem);
    line-height:1.05;letter-spacing:-0.025em;
    color:var(--ink);margin-bottom:1.2rem;
  }
  .esco-journey-b{
    font-size:clamp(14px,1.6vw,16px);color:var(--ink);line-height:1.75;
    letter-spacing:-0.005em;margin-bottom:1.5rem;max-width:62ch;
  }
  .esco-journey-tags{display:flex;flex-wrap:wrap;gap:6px}
  .esco-journey-tag{
    font-size:10px;font-weight:500;color:var(--ink-2);
    padding:5px 11px;border:1px solid var(--ink-4);border-radius:100px;
    letter-spacing:.04em;text-transform:uppercase;
  }

  /* SIGNAL CLOUD */
  .esco-signal{
    padding:clamp(5rem,12vw,10rem) 0;
    border-top:1px solid var(--line);
    background:var(--ink);color:var(--paper);
    position:relative;overflow:hidden;
  }
  .esco-signal .esco-label{color:rgba(245,243,238,0.5)}
  .esco-signal .esco-label::before{background:var(--terra)}
  .esco-signal-h{
    font-family:var(--f-serif);font-weight:400;
    font-size:clamp(2rem,5vw,4rem);
    line-height:1.0;letter-spacing:-0.025em;
    color:var(--paper);max-width:18ch;margin-bottom:1.2rem;
  }
  .esco-signal-h em{font-style:italic;color:var(--terra)}
  .esco-signal-p{font-size:15px;color:rgba(245,243,238,0.6);line-height:1.7;max-width:480px;margin-bottom:3.5rem}
  .esco-signal-cloud{display:flex;flex-wrap:wrap;gap:0.5rem}
  .esco-signal-word{
    font-family:var(--f-serif);font-weight:400;
    padding:8px 18px;border:1px solid rgba(245,243,238,0.15);
    border-radius:100px;color:rgba(245,243,238,0.85);
    letter-spacing:-0.01em;transition:all .3s;
    font-size:clamp(0.95rem,1.5vw,1.4rem);
  }
  .esco-signal-word:hover{
    background:var(--terra);border-color:var(--terra);
    color:var(--paper);transform:translateY(-2px);
  }
  .esco-signal-foot{
    margin-top:3.5rem;padding-top:2rem;
    border-top:1px solid rgba(245,243,238,0.08);
    font-size:13px;color:rgba(245,243,238,0.5);
    line-height:1.7;max-width:540px;letter-spacing:-0.005em;
  }
  .esco-signal-foot em{font-style:italic;color:var(--paper)}

  /* ACCESS */
  .esco-access{padding:clamp(4rem,10vw,8rem) 0;border-top:1px solid var(--line)}
  .esco-access-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(2rem,5vw,5rem);align-items:flex-start}
  @media(max-width:820px){.esco-access-grid{grid-template-columns:1fr;gap:2.5rem}}
  .esco-access-side .esco-label{margin-bottom:1.5rem}
  .esco-access-p{font-size:15px;color:var(--ink-2);line-height:1.75;max-width:440px;margin-bottom:1.2rem}
  .esco-access-mech{background:var(--paper);border:1px solid var(--line)}
  .esco-access-row{
    display:grid;grid-template-columns:60px 1fr;gap:1.2rem;
    padding:1.6rem 1.8rem;border-bottom:1px solid var(--line);
    align-items:flex-start;
  }
  .esco-access-row:last-child{border-bottom:none}
  .esco-access-n{
  font-family:var(--f-serif);font-weight:400;
  font-size:1.8rem;color:var(--terra);line-height:1;
}
  .esco-access-t{
    font-size:14px;font-weight:600;color:var(--ink);
    margin-bottom:6px;letter-spacing:-0.01em;
  }
  .esco-access-d{font-size:13px;color:var(--ink-2);line-height:1.65}

  /* CITIES */
  .esco-cities{padding:clamp(4rem,10vw,8rem) 0;border-top:1px solid var(--line);background:var(--paper-2)}
  .esco-cities-head{
    display:flex;justify-content:space-between;align-items:flex-end;
    flex-wrap:wrap;gap:2rem;margin-bottom:3rem;
  }
  .esco-cities-grid{
    display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));
    gap:1px;background:var(--line);border:1px solid var(--line);
  }
  @media(max-width:520px){.esco-cities-grid{grid-template-columns:1fr 1fr}}
  .esco-city-cell{
    background:var(--paper);padding:1.4rem 1.5rem;
    display:flex;justify-content:space-between;align-items:center;
    transition:background .3s;gap:0.8rem;
  }
  .esco-city-cell:hover{background:var(--paper-3)}
  .esco-city-name{
    font-family:var(--f-serif);font-style:italic;
    font-size:clamp(1.2rem,2vw,1.5rem);color:var(--ink);letter-spacing:-0.02em;line-height:1;
  }
  .esco-city-status{
    font-size:9px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;
    color:var(--ink-3);text-align:right;line-height:1.3;
  }
  .esco-city-status.live{color:var(--terra)}
  .esco-city-status.live::before{
    content:'';width:5px;height:5px;border-radius:50%;background:var(--terra);
    display:inline-block;margin-right:6px;vertical-align:middle;
  }
  .esco-city-members{display:block;margin-top:2px;color:var(--ink-3);font-weight:500}

  /* FAQ */
  .esco-faq{padding:clamp(4rem,10vw,8rem) 0;border-top:1px solid var(--line)}
  .esco-faq-grid{display:grid;grid-template-columns:1fr 2fr;gap:clamp(2rem,5vw,5rem);align-items:flex-start}
  @media(max-width:820px){.esco-faq-grid{grid-template-columns:1fr;gap:2rem}}
  .esco-faq-side{position:sticky;top:120px;align-self:flex-start}
  @media(max-width:820px){.esco-faq-side{position:relative;top:0}}
  .esco-faq-list{border-top:1px solid var(--line)}
  .esco-faq-item{border-bottom:1px solid var(--line)}
  .esco-faq-q{
    width:100%;background:none;border:none;
    text-align:left;padding:1.5rem 0;
    display:flex;justify-content:space-between;align-items:center;gap:2rem;
    font-size:clamp(15px,1.4vw,17px);font-weight:500;color:var(--ink);
    letter-spacing:-0.015em;line-height:1.4;
    transition:color .25s;font-family:var(--f-sans);
  }
  .esco-faq-q:hover{color:var(--terra)}
  .esco-faq-icon{
    width:26px;height:26px;border-radius:50%;
    border:1px solid var(--ink-4);
    display:flex;align-items:center;justify-content:center;
    color:var(--ink-2);position:relative;flex-shrink:0;
    transition:all .35s cubic-bezier(.4,0,.2,1);
  }
  .esco-faq-icon::before,.esco-faq-icon::after{
    content:'';position:absolute;top:50%;left:50%;
    background:currentColor;
    transition:transform .35s cubic-bezier(.4,0,.2,1);
  }
  .esco-faq-icon::before{width:9px;height:1.5px;transform:translate(-50%,-50%)}
  .esco-faq-icon::after{width:1.5px;height:9px;transform:translate(-50%,-50%)}
  .esco-faq-icon.o{transform:rotate(135deg);border-color:var(--terra);color:var(--terra)}
  .esco-faq-a{overflow:hidden;max-height:0;transition:max-height .45s cubic-bezier(.4,0,.2,1)}
  .esco-faq-a.o{max-height:400px;padding-bottom:1.5rem}
  .esco-faq-a p{font-size:14px;color:var(--ink-2);line-height:1.75;max-width:62ch}

  /* WAITLIST */
  .esco-waitlist{
    padding:clamp(5rem,14vw,12rem) 0;
    border-top:1px solid var(--line);
    background:var(--paper);position:relative;overflow:hidden;text-align:center;
  }
  .esco-waitlist-bg{
    position:absolute;left:50%;bottom:-25vw;transform:translateX(-50%);
    font-family:var(--f-serif);font-style:italic;
    font-size:clamp(18rem,40vw,52rem);
    line-height:0.8;letter-spacing:-0.06em;
    color:var(--terra);opacity:0.05;
    pointer-events:none;user-select:none;z-index:0;
  }
  .esco-waitlist > .esco-wrap-tight{position:relative;z-index:2}
  .esco-waitlist .esco-label{justify-content:center;margin-bottom:1.5rem}
  .esco-waitlist-h{
    font-family:var(--f-serif);font-weight:400;
    font-size:clamp(2.4rem,7vw,5.5rem);
    line-height:0.95;letter-spacing:-0.025em;
    margin:0 auto 1.5rem;max-width:18ch;
  }
  .esco-waitlist-h em{font-style:italic;color:var(--terra)}
  .esco-waitlist-p{
    font-size:15px;color:var(--ink-2);
    max-width:520px;margin:0 auto 2.5rem;line-height:1.7;
  }
  .esco-waitlist-form{display:flex;gap:8px;max-width:460px;margin:0 auto 1.5rem}
  @media(max-width:480px){.esco-waitlist-form{flex-direction:column}}
  .esco-waitlist-input{
    flex:1;padding:14px 20px;border-radius:100px;
    background:transparent;border:1px solid var(--ink-4);
    color:var(--ink);font-size:14px;font-family:var(--f-sans);
    outline:none;letter-spacing:-0.005em;
    transition:border-color .2s,background .2s;
  }
  .esco-waitlist-input::placeholder{color:var(--ink-3)}
  .esco-waitlist-input:focus{border-color:var(--terra);background:var(--paper-2)}
  .esco-waitlist-btn{
    padding:14px 28px;border-radius:100px;
    background:var(--ink);color:var(--paper);
    font-family:var(--f-sans);font-weight:500;font-size:13px;
    border:none;letter-spacing:-0.005em;transition:all .2s;cursor:pointer;
  }
  .esco-waitlist-btn:hover{background:var(--terra)}
  .esco-waitlist-note{font-size:11px;color:var(--ink-3);letter-spacing:.02em}
  .esco-waitlist-success{font-family:var(--f-serif);font-size:1.6rem;color:var(--terra)}
  .esco-waitlist-stores{
    margin-top:3rem;padding-top:2.5rem;
    border-top:1px solid var(--line);
    display:flex;justify-content:center;align-items:center;gap:14px;flex-wrap:wrap;
  }
  .esco-waitlist-stores-label{
    font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;
    color:var(--ink-3);width:100%;text-align:center;margin-bottom:.3rem;
  }
  .esco-store{
    display:flex;align-items:center;gap:10px;
    padding:11px 18px;border-radius:12px;
    border:1px solid var(--ink-4);background:transparent;
    transition:all .2s;
  }
  .esco-store:hover{border-color:var(--terra);background:var(--paper-2)}
  .esco-store small{font-size:9px;color:var(--ink-3);letter-spacing:.08em;text-transform:uppercase;font-weight:500;display:block;margin-bottom:1px}
  .esco-store strong{font-size:14px;color:var(--ink);letter-spacing:-0.01em;font-weight:600}

  /* ═══════════════════════════════════════
     FOOTER (rich)
  ═══════════════════════════════════════ */
  .esco-foot{
    background:var(--ink);color:rgba(245,243,238,0.5);
    padding:clamp(4rem,8vw,6rem) 0 2rem;
    position:relative;overflow:hidden;
  }
  .esco-foot-manifesto{
    font-family:var(--f-serif);font-weight:400;
    font-size:clamp(1.5rem,3vw,2.4rem);
    line-height:1.25;letter-spacing:-0.02em;
    color:var(--paper);max-width:24ch;margin-bottom:5rem;
  }
  .esco-foot-manifesto em{font-style:italic;color:var(--terra)}

  .esco-foot-grid{
    display:grid;
    grid-template-columns:1.6fr 1fr 1fr 1fr;
    gap:clamp(2rem,4vw,3.5rem);
    padding-bottom:3.5rem;
    border-bottom:1px solid rgba(245,243,238,0.08);
    margin-bottom:2.5rem;
  }
  @media(max-width:900px){.esco-foot-grid{grid-template-columns:1fr 1fr;gap:2.5rem}}
  @media(max-width:520px){.esco-foot-grid{grid-template-columns:1fr;gap:2rem}}

  .esco-foot-brand{}
  .esco-foot-brand-row{display:flex;align-items:center;gap:10px;margin-bottom:1.2rem}
  .esco-foot-logo{
    width:80px;height:80px;border-radius:20px;
    background:rgba(245,243,238,0.06);
    border:1px solid rgba(245,243,238,0.1);
    display:flex;align-items:center;justify-content:center;
  }
  .esco-foot-logo img{width:40px;height:40px;object-fit:contain}
  .esco-foot-name{font-size:42px;color:var(--paper);letter-spacing:-0.02em;line-height:1;font-weight:600; letter-spacing:-2px;}
  .esco-foot-tag{
    font-size:13px;color:rgba(245,243,238,0.55);
    line-height:1.7;max-width:280px;margin-bottom:1.5rem;
  }
  .esco-foot-newsletter{
    display:flex;flex-direction:column;gap:8px;
    max-width:300px;
  }
  .esco-foot-newsletter-label{
    font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;
    color:rgba(245,243,238,0.4);
  }
  .esco-foot-newsletter-form{
    display:flex;gap:6px;align-items:stretch;
    border-bottom:1px solid rgba(245,243,238,0.15);
    padding-bottom:8px;
  }
  .esco-foot-newsletter input{
    flex:1;background:transparent;border:none;outline:none;
    color:var(--paper);font-family:var(--f-sans);font-size:13px;
    padding:6px 0;letter-spacing:-0.005em;
  }
  .esco-foot-newsletter input::placeholder{color:rgba(245,243,238,0.3)}
  .esco-foot-newsletter button{
    background:transparent;border:none;color:var(--terra);
    font-size:14px;
    cursor:pointer;letter-spacing:-0.01em;transition:color .2s;
  }
  .esco-foot-newsletter button:hover{color:var(--paper)}

  .esco-foot-col-title{
    font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;
    color:rgba(245,243,238,0.35);margin-bottom:1.2rem;
  }
  .esco-foot-links{list-style:none;display:flex;flex-direction:column;gap:10px}
  .esco-foot-links a{
    font-size:13px;color:rgba(245,243,238,0.7);
    transition:color .2s;letter-spacing:-0.005em;
    display:inline-flex;align-items:center;gap:6px;
  }
  .esco-foot-links a:hover{color:var(--paper)}
  .esco-foot-links .live-tag{
    font-size:8px;letter-spacing:.1em;color:var(--terra);
    border:1px solid var(--terra-line);padding:1px 5px;border-radius:4px;
    text-transform:uppercase;font-weight:600;
  }

  .esco-foot-bottom{
    display:flex;justify-content:space-between;align-items:center;
    flex-wrap:wrap;gap:1rem;
  }
  @media(max-width:680px){.esco-foot-bottom{flex-direction:column;align-items:flex-start;gap:1.2rem;padding-bottom: 5rem}}
  .esco-foot-status{
    display:flex;align-items:center;gap:8px;
    font-size:11px;color:rgba(245,243,238,0.4);letter-spacing:-0.005em;
  }
  .esco-foot-status::before{
    content:'';width:6px;height:6px;border-radius:50%;background:var(--terra);
    animation:esco-pulse 2.4s infinite;
  }
  .esco-foot-meta{
    display:flex;gap:18px;flex-wrap:wrap;align-items:center;
    font-size:11px;color:rgba(245,243,238,0.3);
  }
  .esco-foot-meta a{transition:color .2s}
  .esco-foot-meta a:hover{color:rgba(245,243,238,0.6)}

  .esco-foot-social{display:flex;gap:8px;align-items:center}
  .esco-foot-social a{
    width:32px;height:32px;border-radius:50%;
    border:1px solid rgba(245,243,238,0.12);
    display:flex;align-items:center;justify-content:center;
    color:rgba(245,243,238,0.5);font-size:11px;font-weight:600;
    transition:all .2s;
  }
  .esco-foot-social a:hover{border-color:var(--terra);color:var(--terra);background:rgba(230,57,70,0.08)}

  .esco-fade{transition:opacity .8s ease,transform .8s ease}
  .esco-fade.h{opacity:0;transform:translateY(20px)}
  .esco-fade.v{opacity:1;transform:translateY(0)}

  /* LANG SWITCH (navbar) */
.esco-lang{
  display:inline-flex;align-items:center;
  height:32px;padding:3px;border-radius:100px;
  background:rgba(10,10,10,0.04);
  border:1px solid var(--ink-5);
  position:relative;
}
.esco-lang-pill{
  position:absolute;top:3px;bottom:3px;width:calc(50% - 3px);
  background:var(--terra);border-radius:100px;
  transition:transform .3s cubic-bezier(.4,0,.2,1);pointer-events:none;
}
.esco-lang-pill.en{transform:translateX(calc(100% + 0px))}
.esco-lang button{
  position:relative;z-index:1;
  background:none;border:none;cursor:pointer;
  padding:0 12px;height:26px;
  font-size:10px;font-weight:700;letter-spacing:.08em;
  color:var(--ink-3);transition:color .2s;border-radius:100px;
  font-family:var(--f-sans);
}
.esco-lang button.a{color:#fff}
.esco-lang button:not(.a):hover{color:var(--ink)}
.esco-lang button:disabled{opacity:.5;cursor:wait}

@media(max-width:919px){
  /* nasconde lo switch desktop, resta visibile quello del mobile menu */
  .esco-nav .esco-lang{display:none}
}

.esco-mob-lang{
  margin-top:1.5rem;padding-top:1.5rem;
  border-top:1px solid var(--line);
  display:flex;align-items:center;gap:14px;
}
.esco-mob-lang-label{
  font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;
  color:var(--ink-3);
}
  /* HERO FORM */
.esco-hero-form{
  display:flex;gap:8px;
  max-width:520px;margin-bottom:1.2rem;
  background:rgba(245,243,238,0.6);
  border:1px solid var(--ink-4);
  border-radius:100px;
  padding:5px 5px 5px 22px;
  transition:all .25s;
  backdrop-filter:blur(8px);
}
.esco-hero-form:focus-within{
  border-color:var(--terra);
  background:var(--paper);
  box-shadow:0 0 0 4px rgba(230,57,70,0.08);
}
.esco-hero-form input{
  flex:1;background:transparent;border:none;outline:none;
  color:var(--ink);font-family:var(--f-sans);font-size:14px;
  letter-spacing:-0.005em;
  padding:0;
}
.esco-hero-form input::placeholder{color:var(--ink-3)}
.esco-hero-form input:disabled{opacity:.5}
.esco-hero-form button{
  padding:13px 24px;border-radius:100px;
  background:var(--terra);color:var(--paper);
  font-family:var(--f-sans);font-weight:500;font-size:13px;
  border:none;letter-spacing:-0.005em;
  transition:all .25s;cursor:pointer;
  display:inline-flex;align-items:center;gap:6px;
  white-space:nowrap;
}
.esco-hero-form button:hover:not(:disabled){background:var(--ink)}
.esco-hero-form button:disabled{opacity:.6;cursor:wait}
.esco-hero-form button .esco-arr{transition:transform .25s}
.esco-hero-form button:hover:not(:disabled) .esco-arr{transform:translateX(3px)}

@media(max-width:520px){
  .esco-hero-form{
    flex-direction:column;border-radius:24px;
    padding:6px;gap:0;background:transparent;
    border:none;
  }
  .esco-hero-form input{
    padding:14px 18px;border-radius:100px;
    background:rgba(245,243,238,0.6);
    border:1px solid var(--ink-4);
  }
  .esco-hero-form button{padding:14px 20px;justify-content:center}
}

.esco-hero-form-success{
  display:inline-flex;align-items:center;gap:10px;
  font-family:var(--f-serif);font-style:italic;
  font-size:1.3rem;color:var(--terra);
  letter-spacing:-0.01em;
  margin-bottom:1.2rem;
}
.esco-hero-form-success::before{
  content:'';width:8px;height:8px;border-radius:50%;background:var(--terra);
}

.esco-hero-form-err{
  font-size:12px;color:var(--terra);
  font-family:var(--f-serif);font-style:italic;
  margin-top:-0.6rem;margin-bottom:1.2rem;
  letter-spacing:-0.005em;
}

.esco-hero-meta{
  display:flex;align-items:center;gap:18px;flex-wrap:wrap;
  margin-bottom:1.2rem;font-size:12px;
}
.esco-hero-meta-link{
  color:var(--ink-2);font-weight:500;
  letter-spacing:-0.005em;transition:color .2s;
  display:inline-flex;align-items:center;gap:6px;
}
.esco-hero-meta-link:hover{color:var(--terra)}
.esco-hero-meta-link::before{
  content:'';width:4px;height:4px;border-radius:50%;
  background:var(--ink-4);transition:background .2s;
}
.esco-hero-meta-link:hover::before{background:var(--terra)}
.esco-hero-meta-link:first-child::before{display:none}

.esco-hero-hint{
  display:inline-flex;align-items:center;gap:10px;
  font-size:12px;color:var(--ink-3);
  letter-spacing:-0.005em;flex-wrap:wrap;
}
.esco-hero-hint em{
  font-family:var(--f-serif);font-style:italic;
  color:var(--terra);font-size:14px;letter-spacing:-0.01em;
}
`;