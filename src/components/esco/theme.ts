/* ============================================================
   ESCO — DESIGN TOKENS
   Carta calda + arancio bruciato: la palette della vecchia ESCO,
   ripulita e con i contrasti rifatti.
   miutifin e' scura, ESCO e' chiara: due marchi della stessa casa
   che non si confondono mai.
   Vuoi tornare al vermiglio pieno? --e-ac:#E63946 e --e-ac-b:#B8232F.
   ============================================================ */

export const ESCO_TOKENS = `
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=Inter:wght@400;450;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

.esco-root{
  /* Carta */
  --e-paper:#F6F3EC;
  --e-paper-2:#FFFFFF;
  --e-paper-3:#EFEAE0;

  /* Inchiostro — contrasti verificati su --e-paper */
  --e-ink:#14110E;      /* titoli           ~16:1 */
  --e-ink-2:#3D362F;    /* testo forte      ~10:1 */
  --e-mut:#655C52;      /* corpo            ~6:1  */
  --e-mut-2:#8A8073;    /* label piccole    ~4:1  */

  --e-line:rgba(20,17,14,0.11);
  --e-line-2:rgba(20,17,14,0.055);
  --e-line-3:rgba(20,17,14,0.22);

  /* Accento: arancio bruciato */
  --e-ac:#D8481C;       /* riempimenti, testo bianco sopra */
  --e-ac-2:#B93A13;     /* hover */
  --e-ac-b:#AF3813;     /* accento su carta: serve piu' scuro per leggersi */
  --e-ac-wash:rgba(216,72,28,0.10);
  --e-ac-line:rgba(216,72,28,0.28);

  --e-ok:#1E7F45;

  --e-fd:'Inter Tight','Inter',system-ui,-apple-system,sans-serif;
  --e-fb:'Inter',system-ui,-apple-system,sans-serif;
  --e-fm:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace;

  --e-wrap:1180px;
  --e-pad:clamp(1.25rem,4vw,2.5rem);
  --e-sec:clamp(4rem,8vw,6.5rem);

  background:var(--e-paper);color:var(--e-ink);
  -webkit-tap-highlight-color:transparent;
  font-family:var(--e-fb);font-size:16px;line-height:1.5;
  -webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;
  min-height:100vh;width:100%;position:relative;overflow-x:hidden;
}

html:has(.esco-root){background:#F6F3EC!important}
body:has(.esco-root){background:#F6F3EC!important;color:#14110E!important;margin:0!important}

.esco-root *,.esco-root *::before,.esco-root *::after{box-sizing:border-box;margin:0;padding:0}
.esco-root a{color:inherit;text-decoration:none}
.esco-root button{font-family:inherit;cursor:pointer}
.esco-root ul{list-style:none}
.esco-root img{display:block;max-width:100%}
.esco-root ::selection{background:var(--e-ac);color:#fff}
.esco-root :focus-visible{outline:2px solid var(--e-ac);outline-offset:3px;border-radius:6px}

/* grana leggera: da' il tocco "carta" senza sporcare il testo */
.e-grain{
  position:fixed;inset:0;z-index:1;pointer-events:none;
  opacity:.13;mix-blend-mode:multiply;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E");
}
.esco-root main{position:relative;z-index:2}

.e-wrap{max-width:var(--e-wrap);margin:0 auto;padding:0 var(--e-pad)}
.e-sec{padding:var(--e-sec) 0}

.e-lab{
  display:inline-flex;flex-wrap:wrap;align-items:center;gap:9px;
  font-family:var(--e-fm);font-size:11px;font-weight:500;
  letter-spacing:.14em;text-transform:uppercase;color:var(--e-mut);
}
.e-lab::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--e-ac);flex-shrink:0}

.e-h1{
  font-family:var(--e-fd);font-weight:600;color:var(--e-ink);
  font-size:clamp(2.15rem,8.2vw,5.6rem);line-height:.99;letter-spacing:-.042em;
}
.e-h2{
  font-family:var(--e-fd);font-weight:600;color:var(--e-ink);
  font-size:clamp(1.75rem,5.2vw,3.4rem);line-height:1.05;letter-spacing:-.036em;
}
.e-lead{font-size:clamp(1rem,1.3vw,1.2rem);line-height:1.6;color:var(--e-ink-2);letter-spacing:-.012em;max-width:50ch}
.e-body{font-size:15.5px;line-height:1.65;color:var(--e-mut);letter-spacing:-.008em}

.e-btn{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  height:52px;padding:0 24px;border-radius:100px;border:1px solid transparent;
  font-family:var(--e-fb);font-size:15.5px;font-weight:500;letter-spacing:-.012em;
  white-space:nowrap;transition:background .18s ease,border-color .18s ease,color .18s ease;
}
.e-btn-p{background:var(--e-ac);color:#fff !important;box-shadow:0 10px 26px -12px rgba(216,72,28,.6)}
.e-btn-p:hover:not(:disabled){background:var(--e-ac-2)}
.e-btn-p:disabled{opacity:.62;cursor:wait}
.e-btn-s{background:transparent;color:var(--e-ink);border-color:var(--e-line-3)}
.e-btn-s:hover{border-color:var(--e-ink);background:rgba(20,17,14,.04)}
.e-arr{display:inline-block;transition:transform .18s ease}
.e-btn:hover .e-arr{transform:translateX(3px)}

@media (prefers-reduced-motion:reduce){
  .esco-root *,.esco-root *::before,.esco-root *::after{
    animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;
  }
}
`;