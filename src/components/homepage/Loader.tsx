"use client";

import { useEffect, useState } from "react";

/* ============================================================
   Il loader vecchio teneva la gente ferma 3 secondi davanti a
   un'orbita che gira. Nessuno dei siti di riferimento ne ha uno.
   Questo dura 600ms, appare solo alla prima visita della sessione
   e sparisce appena la pagina è pronta. Se vuoi, cancellalo del tutto.
   ============================================================ */

const S = `
.mf-load{
  position:fixed;inset:0;z-index:9999;background:var(--mf-bg,#08080A);
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;
  transition:opacity .45s ease,visibility .45s;
}
.mf-load.out{opacity:0;visibility:hidden;pointer-events:none}
.mf-load-mark{
  font-family:'Inter Tight','Inter',system-ui,sans-serif;
  font-size:30px;font-weight:600;letter-spacing:-0.04em;color:#F7F7F5;
}
.mf-load-mark b{color:#DC2626;font-weight:600}
.mf-load-bar{width:132px;height:2px;border-radius:2px;background:rgba(247,247,245,.12);overflow:hidden}
.mf-load-bar i{
  display:block;height:100%;width:100%;background:#FF5F52;border-radius:2px;
  transform-origin:left;transform:scaleX(0);animation:mf-load-fill .6s cubic-bezier(.4,0,.2,1) forwards;
}
@keyframes mf-load-fill{to{transform:scaleX(1)}}
@media (prefers-reduced-motion:reduce){
  .mf-load-bar i{animation:none;transform:scaleX(1)}
}
`;

export function MiutifinLoader() {
  const [show, setShow] = useState(false);
  const [out, setOut] = useState(false);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("mf-seen") === "1"; } catch { /* storage bloccato */ }
    if (seen) return;

    setShow(true);
    try { sessionStorage.setItem("mf-seen", "1"); } catch { /* noop */ }

    const a = setTimeout(() => setOut(true), 600);
    const b = setTimeout(() => setShow(false), 1080);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);

  if (!show) return null;

  return (
    <>
      <style>{S}</style>
      <div className={`mf-load ${out ? "out" : ""}`} aria-hidden="true">
        <div className="mf-load-mark">miutifin<b>.</b></div>
        <div className="mf-load-bar"><i /></div>
      </div>
    </>
  );
}