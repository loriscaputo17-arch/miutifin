/* ============================================================
   MIUTIFIN — DESIGN TOKENS (DARK)
   Un solo tema: fondo nero, testo chiaro, rosso come unico accento.
   Niente sezioni chiare: era quello a creare il mix illeggibile.
   L'unico elemento bianco della pagina e' la card mock di ESCO,
   ed e' voluto — e' il prodotto che deve saltare all'occhio.
   ============================================================ */

export const TOKENS = `
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=Inter:wght@400;450;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

:root{
  /* Fondali */
  --mf-bg:#08080A;
  --mf-bg-2:#0E0E12;
  --mf-bg-3:#15151A;

  /* Testo — contrasto verificato su --mf-bg */
  --mf-ink:#F7F7F5;      /* titoli            ~19:1 */
  --mf-ink-2:#D6D6DB;    /* testo importante  ~13:1 */
  --mf-mut:#A8A8B2;      /* corpo             ~8:1  */
  --mf-mut-2:#84848E;    /* label piccole     ~5:1  */

  /* Linee */
  --mf-line:rgba(247,247,245,0.11);
  --mf-line-2:rgba(247,247,245,0.06);
  --mf-line-3:rgba(247,247,245,0.22);

  /* Brand */
  --mf-red:#DC2626;      /* riempimenti */
  --mf-red-2:#EF4444;    /* hover */
  --mf-red-b:#FF5F52;    /* rosso su nero: serve piu' luce per leggersi */
  --mf-red-wash:rgba(220,38,38,0.13);

  /* Superficie chiara volontaria (mock ESCO) */
  --mf-card:#FFFFFF;
  --mf-card-ink:#0D0D0F;
  --mf-card-mut:#6E6E78;
  --mf-card-line:#E7E6E1;

  /* Type */
  --mf-fd:'Inter Tight','Inter',system-ui,-apple-system,sans-serif;
  --mf-fb:'Inter',system-ui,-apple-system,sans-serif;
  --mf-fm:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace;

  /* Layout */
  --mf-wrap:1240px;
  --mf-pad:clamp(1.25rem,4vw,2.5rem);
  --mf-sec:clamp(4.5rem,9vw,8rem);
  --mf-r:14px;
}

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;background:var(--mf-bg);-webkit-text-size-adjust:100%}
body{
  background:var(--mf-bg)!important;color:var(--mf-ink);
  font-family:var(--mf-fb);font-size:16px;line-height:1.5;
  -webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;
  overflow-x:hidden;
}
a{color:inherit;text-decoration:none}
button{font-family:inherit;cursor:pointer}
img,svg{display:block;max-width:100%}
ul{list-style:none}
::selection{background:var(--mf-red);color:#fff}
:focus-visible{outline:2px solid var(--mf-red-b);outline-offset:3px;border-radius:4px}

.mf-wrap{max-width:var(--mf-wrap);margin:0 auto;padding:0 var(--mf-pad)}
.mf-sec{padding:var(--mf-sec) 0}

/* label monospace */
.mf-lab{
  display:inline-flex;align-items:center;gap:9px;
  font-family:var(--mf-fm);font-size:11px;font-weight:500;
  letter-spacing:.14em;text-transform:uppercase;color:var(--mf-mut);
}
.mf-lab::before{content:'';width:6px;height:6px;background:var(--mf-red-b);border-radius:1px;flex-shrink:0}
.mf-lab.on-dark{color:var(--mf-mut)}

/* scala tipografica */
.mf-h1{
  font-family:var(--mf-fd);font-weight:600;color:var(--mf-ink);
  font-size:clamp(2.6rem,6.4vw,5.1rem);line-height:.98;letter-spacing:-.042em;
}
.mf-h2{
  font-family:var(--mf-fd);font-weight:600;color:var(--mf-ink);
  font-size:clamp(1.9rem,3.8vw,3.1rem);line-height:1.04;letter-spacing:-.035em;
}
.mf-h3{
  font-family:var(--mf-fd);font-weight:600;color:var(--mf-ink);
  font-size:clamp(1.2rem,1.7vw,1.4rem);line-height:1.2;letter-spacing:-.022em;
}
.mf-lead{
  font-size:clamp(1.02rem,1.2vw,1.15rem);line-height:1.6;color:var(--mf-ink-2);
  letter-spacing:-.011em;max-width:52ch;
}
.mf-body{font-size:15.5px;line-height:1.65;color:var(--mf-mut);letter-spacing:-.008em}
.mf-red{color:var(--mf-red-b)}

/* bottoni */
.mf-btn{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  height:48px;padding:0 22px;border-radius:100px;border:1px solid transparent;
  font-family:var(--mf-fb);font-size:15px;font-weight:500;letter-spacing:-.012em;
  white-space:nowrap;transition:background .18s ease,border-color .18s ease,color .18s ease;
}
.mf-btn .mf-arr{transition:transform .18s ease}
.mf-btn:hover .mf-arr{transform:translateX(3px)}
.mf-btn-p{background:var(--mf-red);color:#fff}
.mf-btn-p:hover{background:var(--mf-red-2)}
.mf-btn-s{background:transparent;color:var(--mf-ink);border-color:var(--mf-line-3)}
.mf-btn-s:hover{border-color:var(--mf-ink);background:rgba(247,247,245,.05)}
.mf-btn-d{background:var(--mf-ink);color:var(--mf-bg)}
.mf-btn-d:hover{background:#fff}

@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}
}
`;