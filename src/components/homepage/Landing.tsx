"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLocale } from "next-intl";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import { Navbar } from "@/components/homepage/Navbar";
import { Footer } from "@/components/homepage/Footer";
import { MiutifinLoader } from "@/components/homepage/Loader";
import { TOKENS } from "@/components/homepage/theme";
import { useCopy } from "@/components/homepage/content";

/* ============================================================
   MIUTIFIN — LANDING (dark)
   Otto sezioni. Nessuna sezione chiara: cambia solo il livello
   di fondale (bg / bg-2) per separarle.
   ============================================================ */

const S = `
/* ============================================================
   HERO
   ============================================================ */
.mf-hero{position:relative;padding:clamp(8rem,13vw,11rem) 0 clamp(3rem,6vw,4.5rem);overflow:hidden}
.mf-hero::before{
  content:'';position:absolute;inset:0;z-index:0;pointer-events:none;
  background-image:
    linear-gradient(var(--mf-line-2) 1px,transparent 1px),
    linear-gradient(90deg,var(--mf-line-2) 1px,transparent 1px);
  background-size:64px 64px;
  -webkit-mask-image:radial-gradient(ellipse 70% 65% at 50% 25%,#000,transparent 78%);
  mask-image:radial-gradient(ellipse 70% 65% at 50% 25%,#000,transparent 78%);
}
.mf-hero::after{
  content:'';position:absolute;top:-30%;left:-10%;width:70%;height:90%;z-index:0;pointer-events:none;
  background:radial-gradient(ellipse at center,rgba(220,38,38,.10),transparent 65%);
  filter:blur(30px);
}
.mf-hero-in{position:relative;z-index:1}
.mf-hero h1{margin:1.6rem 0 0;max-width:16ch}
.mf-hero-rot{
  display:inline-flex;align-items:center;
  background:var(--mf-red-wash);color:var(--mf-red-b);
  border:1px solid rgba(255,95,82,.22);
  border-radius:14px;padding:0 .16em;overflow:hidden;
}
.mf-hero-sub{margin-top:1.7rem;max-width:46ch}
.mf-hero-cta{display:flex;gap:10px;flex-wrap:wrap;margin-top:2.3rem}

.mf-proof{
  display:grid;grid-template-columns:repeat(3,minmax(0,1fr));
  margin-top:clamp(3rem,6vw,4.5rem);border-top:1px solid var(--mf-line);
}
.mf-proof div{padding:1.4rem 1.5rem 0 0}
.mf-proof div + div{border-left:1px solid var(--mf-line);padding-left:1.5rem}
@media(max-width:640px){
  .mf-proof{grid-template-columns:1fr}
  .mf-proof div + div{border-left:none;border-top:1px solid var(--mf-line);padding-left:0;margin-top:.2rem}
}
.mf-proof-n{
  font-family:var(--mf-fd);font-size:clamp(1.8rem,2.6vw,2.2rem);font-weight:600;
  letter-spacing:-.035em;line-height:1;color:var(--mf-ink);
}
.mf-proof-l{
  margin-top:8px;font-family:var(--mf-fm);font-size:11px;letter-spacing:.1em;
  text-transform:uppercase;color:var(--mf-mut-2);
}

/* ============================================================
   RAIL competenze — label fissa, nastro che scorre a fianco
   ============================================================ */
.mf-rail{border-top:1px solid var(--mf-line);border-bottom:1px solid var(--mf-line);background:var(--mf-bg-2)}
.mf-rail-in{
  display:flex;align-items:center;gap:1.5rem;padding:1.15rem 0;
  max-width:var(--mf-wrap);margin:0 auto;
}
.mf-rail-lab{flex-shrink:0;padding-left:var(--mf-pad)}
.mf-rail-vp{
  flex:1;min-width:0;overflow:hidden;
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 4%,#000 92%,transparent);
  mask-image:linear-gradient(90deg,transparent,#000 4%,#000 92%,transparent);
}
.mf-rail-track{
  display:flex;gap:2.4rem;width:max-content;white-space:nowrap;
  animation:mf-rail 42s linear infinite;
}
@keyframes mf-rail{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.mf-rail-i{
  display:inline-flex;align-items:center;gap:10px;
  font-size:14.5px;color:var(--mf-ink-2);letter-spacing:-.01em;flex-shrink:0;
}
.mf-rail-i::before{content:'';width:4px;height:4px;border-radius:50%;background:var(--mf-red-b);flex-shrink:0}
@media(max-width:700px){.mf-rail-lab{display:none}.mf-rail-in{padding-left:0}}

/* ============================================================
   Testata di sezione
   ============================================================ */
.mf-head{display:grid;grid-template-columns:1fr 1fr;gap:clamp(1.5rem,4vw,4rem);align-items:end;margin-bottom:clamp(2.5rem,5vw,3.5rem)}
@media(max-width:860px){.mf-head{grid-template-columns:1fr;align-items:start;gap:1.2rem}}
.mf-head h2{margin-top:1.1rem}

/* ============================================================
   PILASTRI
   ============================================================ */
.mf-pill-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
@media(max-width:900px){.mf-pill-grid{grid-template-columns:1fr}}
.mf-pill{
  background:var(--mf-bg-2);border:1px solid var(--mf-line);border-radius:var(--mf-r);
  padding:clamp(1.6rem,2.4vw,2rem);display:flex;flex-direction:column;
  transition:border-color .2s ease,background .2s ease,transform .2s ease;
}
.mf-pill:hover{border-color:var(--mf-line-3);background:var(--mf-bg-3);transform:translateY(-3px)}
.mf-pill-k{
  font-family:var(--mf-fm);font-size:11px;letter-spacing:.14em;text-transform:uppercase;
  color:var(--mf-red-b);margin-bottom:1.6rem;
}
.mf-pill h3{margin-bottom:.7rem}
.mf-pill p{margin-bottom:1.6rem}
.mf-pill a{
  margin-top:auto;font-size:14.5px;font-weight:500;color:var(--mf-ink);
  display:inline-flex;align-items:center;gap:7px;letter-spacing:-.012em;
}
.mf-pill a:hover{color:var(--mf-red-b)}

/* ============================================================
   SERVIZI
   ============================================================ */
.mf-svc-list{border-top:1px solid var(--mf-line)}
.mf-svc-row{
  display:grid;grid-template-columns:1fr 1.5fr;gap:clamp(1rem,3vw,3rem);
  padding:2rem 0;border-bottom:1px solid var(--mf-line);align-items:start;
}
@media(max-width:780px){.mf-svc-row{grid-template-columns:1fr;gap:.7rem;padding:1.6rem 0}}
.mf-svc-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:.9rem}
.mf-svc-tag{
  font-family:var(--mf-fm);font-size:11px;letter-spacing:.05em;color:var(--mf-mut);
  border:1px solid var(--mf-line);border-radius:100px;padding:5px 11px;background:var(--mf-bg-2);
}

.mf-steps{
  display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--mf-line);
  border:1px solid var(--mf-line);border-radius:var(--mf-r);overflow:hidden;margin-top:1rem;
}
@media(max-width:780px){.mf-steps{grid-template-columns:1fr}}
.mf-step{background:var(--mf-bg-2);padding:1.7rem}
.mf-step-n{font-family:var(--mf-fm);font-size:11px;letter-spacing:.14em;color:var(--mf-red-b);margin-bottom:.9rem}
.mf-step-t{font-family:var(--mf-fd);font-size:17.5px;font-weight:600;letter-spacing:-.02em;margin-bottom:.4rem;color:var(--mf-ink)}
.mf-svc-cta{display:flex;margin-top:2.2rem}

/* ============================================================
   ESCO — fondale rialzato + alone rosso, la card resta bianca
   ============================================================ */
.mf-esco{background:var(--mf-bg-2);padding:var(--mf-sec) 0;position:relative;overflow:hidden;
  border-top:1px solid var(--mf-line);border-bottom:1px solid var(--mf-line)}
.mf-esco::before{
  content:'';position:absolute;top:-20%;right:-5%;width:60%;height:140%;pointer-events:none;
  background:radial-gradient(ellipse at center,rgba(220,38,38,.12),transparent 62%);filter:blur(20px);
}
.mf-esco-grid{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:clamp(2.5rem,6vw,5rem);align-items:center}
@media(max-width:900px){.mf-esco-grid{grid-template-columns:1fr}}
.mf-esco-mark{
  font-family:var(--mf-fd);font-size:clamp(3rem,6vw,4.6rem);font-weight:600;
  letter-spacing:-.035em;line-height:1;margin:1.2rem 0 .8rem;color:var(--mf-ink);
}
.mf-esco-mark i{color:var(--mf-red-b);font-style:normal}
.mf-esco-claim{
  font-family:var(--mf-fd);font-size:clamp(1.35rem,2.2vw,1.8rem);font-weight:500;
  letter-spacing:-.03em;line-height:1.15;margin-bottom:1.2rem;color:var(--mf-ink);
}
.mf-esco-desc{font-size:16px;line-height:1.65;color:var(--mf-ink-2);max-width:48ch;letter-spacing:-.01em}
.mf-esco-stats{display:flex;gap:2.5rem;flex-wrap:wrap;margin:2rem 0 2.2rem}
.mf-esco-stat b{display:block;font-family:var(--mf-fd);font-size:1.4rem;font-weight:600;letter-spacing:-.03em;color:var(--mf-ink)}
.mf-esco-stat span{
  display:block;margin-top:6px;font-family:var(--mf-fm);font-size:10.5px;letter-spacing:.12em;
  text-transform:uppercase;color:var(--mf-mut-2);
}

/* mock: unico oggetto chiaro della pagina, e' il prodotto */
.mf-mock{
  background:var(--mf-card);border-radius:20px;padding:1.5rem;color:var(--mf-card-ink);
  box-shadow:0 40px 90px -35px rgba(0,0,0,.9);max-width:430px;width:100%;
}
@media(max-width:900px){.mf-mock{margin:0 auto}}
.mf-mock-top{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;margin-bottom:1.2rem}
.mf-mock-t{font-family:var(--mf-fd);font-size:21px;font-weight:600;letter-spacing:-.03em;color:var(--mf-card-ink)}
.mf-mock-s{font-size:13.5px;color:var(--mf-card-mut);margin-top:3px}
.mf-mock-pill{
  font-family:var(--mf-fm);font-size:10px;letter-spacing:.1em;text-transform:uppercase;
  background:rgba(220,38,38,.1);color:var(--mf-red);border-radius:100px;padding:5px 10px;white-space:nowrap;
}
.mf-mock-i{display:flex;align-items:center;gap:12px;padding:.9rem 0;border-top:1px solid var(--mf-card-line)}
.mf-mock-ix{
  width:34px;height:34px;border-radius:10px;background:#FAFAF8;border:1px solid var(--mf-card-line);
  display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;color:var(--mf-red);
  font-family:var(--mf-fm);
}
.mf-mock-it{font-size:14.5px;font-weight:500;letter-spacing:-.012em;line-height:1.3;color:var(--mf-card-ink)}
.mf-mock-im{font-family:var(--mf-fm);font-size:11px;color:var(--mf-card-mut);margin-top:4px;letter-spacing:.02em}

/* ============================================================
   COLLECTIVE
   ============================================================ */
.mf-col-grid{display:grid;grid-template-columns:1fr 1.15fr;gap:clamp(2rem,5vw,4.5rem);align-items:start}
@media(max-width:900px){.mf-col-grid{grid-template-columns:1fr;gap:2rem}}
.mf-col-points{display:flex;flex-direction:column;border-top:1px solid var(--mf-line)}
.mf-col-points li{
  position:relative;padding:1.15rem 0 1.15rem 21px;border-bottom:1px solid var(--mf-line);
  font-size:16px;line-height:1.55;letter-spacing:-.011em;color:var(--mf-ink-2);
}
.mf-col-points li::before{
  content:'';position:absolute;left:0;top:calc(1.15rem + .5em);
  width:7px;height:7px;border-radius:2px;background:var(--mf-red-b);
}
.mf-join{
  margin-top:1.6rem;background:var(--mf-bg-2);border:1px solid var(--mf-line);border-radius:var(--mf-r);
  padding:1.7rem;display:flex;align-items:center;justify-content:space-between;gap:1.5rem;flex-wrap:wrap;
}
.mf-join p{margin-top:.5rem;max-width:44ch}

/* ============================================================
   FAQ
   ============================================================ */
.mf-faq-grid{display:grid;grid-template-columns:1fr 1.5fr;gap:clamp(2rem,5vw,4.5rem);align-items:start}
@media(max-width:900px){.mf-faq-grid{grid-template-columns:1fr;gap:2rem}}
.mf-faq-list{border-top:1px solid var(--mf-line)}
.mf-faq-i{border-bottom:1px solid var(--mf-line)}
.mf-faq-q{
  width:100%;background:none;border:none;text-align:left;padding:1.4rem 0;
  display:flex;align-items:center;justify-content:space-between;gap:1.5rem;
  font-family:var(--mf-fd);font-size:clamp(16.5px,1.5vw,18.5px);font-weight:600;
  letter-spacing:-.022em;color:var(--mf-ink);transition:color .18s ease;
}
.mf-faq-q:hover{color:var(--mf-red-b)}
.mf-faq-x{width:22px;height:22px;flex-shrink:0;position:relative;color:var(--mf-mut);transition:transform .3s ease,color .2s ease}
.mf-faq-x::before,.mf-faq-x::after{content:'';position:absolute;top:50%;left:50%;background:currentColor;transform:translate(-50%,-50%)}
.mf-faq-x::before{width:11px;height:1.5px}
.mf-faq-x::after{width:1.5px;height:11px;transition:opacity .25s ease}
.mf-faq-i.o .mf-faq-x{transform:rotate(90deg);color:var(--mf-red-b)}
.mf-faq-i.o .mf-faq-x::after{opacity:0}
.mf-faq-a{overflow:hidden;max-height:0;transition:max-height .35s cubic-bezier(.4,0,.2,1)}
.mf-faq-i.o .mf-faq-a{max-height:320px}
.mf-faq-a p{padding-bottom:1.5rem;max-width:62ch;color:var(--mf-mut)}

/* ============================================================
   CONTATTI
   ============================================================ */
.mf-contact{background:var(--mf-bg-2);border-top:1px solid var(--mf-line)}
.mf-contact-grid{display:grid;grid-template-columns:1fr 1.1fr;gap:clamp(2.5rem,6vw,5rem);align-items:start}
@media(max-width:900px){.mf-contact-grid{grid-template-columns:1fr}}
.mf-re{margin-top:2rem;display:flex;flex-direction:column;gap:.9rem}
.mf-re li{position:relative;padding-left:20px;font-size:15.5px;color:var(--mf-ink-2);letter-spacing:-.011em;line-height:1.45}
.mf-re li::before{content:'✓';position:absolute;left:0;top:1px;color:var(--mf-red-b);font-size:12px;font-weight:700}
.mf-cinfo{margin-top:2.4rem;display:flex;gap:2.5rem;flex-wrap:wrap}
.mf-cinfo-l{font-family:var(--mf-fm);font-size:10.5px;letter-spacing:.13em;text-transform:uppercase;color:var(--mf-mut-2);margin-bottom:7px}
.mf-cinfo-v{font-size:15.5px;letter-spacing:-.012em;color:var(--mf-ink)}
.mf-cinfo-v a:hover{color:var(--mf-red-b)}

.mf-form{background:var(--mf-bg);border:1px solid var(--mf-line);border-radius:18px;padding:clamp(1.5rem,3vw,2rem)}
.mf-f-row{display:grid;grid-template-columns:1fr 1fr;gap:.9rem}
@media(max-width:560px){.mf-f-row{grid-template-columns:1fr}}
.mf-f{display:flex;flex-direction:column;gap:8px;margin-bottom:1.1rem}
.mf-f-l{
  font-family:var(--mf-fm);font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;
  color:var(--mf-mut);display:flex;gap:5px;align-items:baseline;
}
.mf-f-l i{color:var(--mf-mut-2);font-style:normal;text-transform:none;letter-spacing:.02em;font-size:10px}
.mf-in,.mf-ta,.mf-sel{
  width:100%;background:var(--mf-bg-2);border:1px solid var(--mf-line);border-radius:10px;
  padding:13px 14px;font-family:var(--mf-fb);font-size:15.5px;color:var(--mf-ink);
  letter-spacing:-.012em;outline:none;transition:border-color .18s ease,box-shadow .18s ease;
  -webkit-appearance:none;appearance:none;
}
.mf-in::placeholder,.mf-ta::placeholder{color:var(--mf-mut-2)}
.mf-in:focus,.mf-ta:focus,.mf-sel:focus{border-color:var(--mf-line-3);box-shadow:0 0 0 3px rgba(247,247,245,.05)}
.mf-in.bad,.mf-ta.bad,.mf-sel.bad{border-color:var(--mf-red-b);box-shadow:0 0 0 3px rgba(220,38,38,.12)}
.mf-ta{resize:vertical;min-height:108px;line-height:1.55}
.mf-sel{
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath fill='%23A8A8B2' d='M5 6 0 0h10z'/%3E%3C/svg%3E");
  background-repeat:no-repeat;background-position:right 14px center;padding-right:38px;cursor:pointer;
}
.mf-sel option{background:var(--mf-bg-2);color:var(--mf-ink)}
.mf-err{font-size:13px;color:var(--mf-red-b);letter-spacing:-.005em}
.mf-consent{display:flex;gap:10px;align-items:flex-start;font-size:14px;color:var(--mf-mut);line-height:1.45;cursor:pointer}
.mf-consent a{color:var(--mf-ink);text-decoration:underline;text-underline-offset:2px}
.mf-consent input{
  appearance:none;-webkit-appearance:none;width:18px;height:18px;flex-shrink:0;margin-top:1px;
  border:1px solid var(--mf-line-3);border-radius:5px;background:var(--mf-bg-2);cursor:pointer;
  position:relative;transition:background .15s ease,border-color .15s ease;
}
.mf-consent input:checked{background:var(--mf-red);border-color:var(--mf-red)}
.mf-consent input:checked::after{
  content:'✓';position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
  color:#fff;font-size:11px;font-weight:700;
}
.mf-submit{width:100%;height:54px;font-size:16px;margin-top:1.2rem}
.mf-spin{
  width:14px;height:14px;border-radius:50%;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;
  animation:mf-spin .7s linear infinite;
}
@keyframes mf-spin{to{transform:rotate(360deg)}}
.mf-ok{
  background:var(--mf-bg);border:1px solid var(--mf-line);border-radius:18px;
  padding:clamp(2.5rem,6vw,4rem) 2rem;text-align:center;
}
.mf-ok-x{
  width:46px;height:46px;border-radius:50%;background:var(--mf-red-wash);color:var(--mf-red-b);
  display:flex;align-items:center;justify-content:center;margin:0 auto 1.2rem;font-size:19px;
}

/* ---------- CTA sticky mobile ---------- */
.mf-sticky{display:none}
@media(max-width:768px){
  .mf-sticky{
    display:block;position:fixed;left:0;right:0;bottom:0;z-index:150;
    padding:10px 14px calc(10px + env(safe-area-inset-bottom,0px));
    background:rgba(8,8,10,.92);border-top:1px solid var(--mf-line);
    backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
    transition:transform .3s ease,opacity .3s ease;
  }
  .mf-sticky.off{transform:translateY(120%);opacity:0;pointer-events:none}
  .mf-sticky .mf-btn{width:100%;height:52px}
}
`;

/* ---------- reveal riutilizzabile ---------- */
const rise = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

/* ============================================================
   HERO
   ============================================================ */
function Hero({ c }: { c: ReturnType<typeof useCopy> }) {
  const words = c.hero.rotating;
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI(v => (v + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, [words.length, reduce]);

  return (
    <section className="mf-hero">
      <div className="mf-wrap mf-hero-in">
        <motion.span className="mf-lab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }}>
          {c.hero.badge}
        </motion.span>

        <motion.h1
          className="mf-h1"
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .7, ease: [0.22, 1, 0.36, 1] }}
        >
          {c.hero.line1}{" "}
          <span className="mf-hero-rot">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={words[i]}
                initial={{ y: "70%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-70%", opacity: 0 }}
                transition={{ duration: .32, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "inline-block" }}
              >
                {words[i]}
              </motion.span>
            </AnimatePresence>
          </span>
          <br />
          {c.hero.line2}
        </motion.h1>

        <motion.p
          className="mf-lead mf-hero-sub"
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .6, delay: .12 }}
        >
          {c.hero.sub}
        </motion.p>

        <motion.div
          className="mf-hero-cta"
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .6, delay: .2 }}
        >
          <a href="#contatti" className="mf-btn mf-btn-p">
            {c.hero.ctaPrimary} <span className="mf-arr">→</span>
          </a>
          <a href="#esco" className="mf-btn mf-btn-s">{c.hero.ctaSecondary}</a>
        </motion.div>

        <motion.div className="mf-proof" {...rise}>
          {c.hero.proof.map(p => (
            <div key={p.l}>
              <div className="mf-proof-n">{p.n}</div>
              <div className="mf-proof-l">{p.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   RAIL competenze
   ============================================================ */
function Rail({ c }: { c: ReturnType<typeof useCopy> }) {
  const items = [...c.rail.items, ...c.rail.items];
  return (
    <div className="mf-rail">
      <div className="mf-rail-in">
        <span className="mf-lab mf-rail-lab">{c.rail.label}</span>
        <div className="mf-rail-vp">
          <div className="mf-rail-track">
            {items.map((s, k) => <span key={`${s}-${k}`} className="mf-rail-i">{s}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PILASTRI
   ============================================================ */
function Pillars({ c }: { c: ReturnType<typeof useCopy> }) {
  return (
    <section className="mf-sec" id="studio">
      <div className="mf-wrap">
        <motion.div className="mf-head" {...rise}>
          <div>
            <span className="mf-lab">{c.pillars.label}</span>
            <h2 className="mf-h2">{c.pillars.title}</h2>
          </div>
          <p className="mf-lead">{c.pillars.lead}</p>
        </motion.div>

        <div className="mf-pill-grid">
          {c.pillars.items.map((p, k) => (
            <motion.article
              key={p.k}
              className="mf-pill"
              {...rise}
              transition={{ ...rise.transition, delay: k * 0.07 }}
            >
              <div className="mf-pill-k">{p.k}</div>
              <h3 className="mf-h3">{p.t}</h3>
              <p className="mf-body">{p.d}</p>
              <a href={p.href}>{p.link} <span aria-hidden>→</span></a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SERVIZI
   ============================================================ */
function Services({ c }: { c: ReturnType<typeof useCopy> }) {
  return (
    <section className="mf-sec" id="servizi">
      <div className="mf-wrap">
        <motion.div className="mf-head" {...rise}>
          <div>
            <span className="mf-lab">{c.services.label}</span>
            <h2 className="mf-h2">{c.services.title}</h2>
          </div>
          <p className="mf-lead">{c.services.lead}</p>
        </motion.div>

        <div className="mf-svc-list">
          {c.services.items.map((s, k) => (
            <motion.div key={s.t} className="mf-svc-row" {...rise} transition={{ ...rise.transition, delay: Math.min(k, 3) * 0.05 }}>
              <h3 className="mf-h3">{s.t}</h3>
              <div>
                <p className="mf-body">{s.d}</p>
                <div className="mf-svc-tags">
                  {s.tags.map(t => <span key={t} className="mf-svc-tag">{t}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...rise}>
          <div className="mf-lab" style={{ marginTop: "clamp(2.5rem,5vw,3.5rem)" }}>{c.services.stepsLabel}</div>
          <div className="mf-steps">
            {c.services.steps.map(s => (
              <div className="mf-step" key={s.n}>
                <div className="mf-step-n">{s.n}</div>
                <div className="mf-step-t">{s.t}</div>
                <p className="mf-body">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mf-svc-cta">
            <a href="#contatti" className="mf-btn mf-btn-p">
              {c.services.cta} <span className="mf-arr">→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   ESCO
   ============================================================ */
function Esco({ c, locale }: { c: ReturnType<typeof useCopy>; locale: string }) {
  return (
    <section className="mf-esco" id="esco">
      <div className="mf-wrap">
        <div className="mf-esco-grid">
          <motion.div {...rise}>
            <span className="mf-lab">{c.esco.label}</span>
            <div className="mf-esco-mark">ESCO<i>.</i></div>
            <p className="mf-esco-claim">{c.esco.claim}</p>
            <p className="mf-esco-desc">{c.esco.desc}</p>

            <div className="mf-esco-stats">
              {c.esco.stats.map(s => (
                <div className="mf-esco-stat" key={s.l}>
                  <b>{s.n}</b><span>{s.l}</span>
                </div>
              ))}
            </div>

            <a href={`/${locale}/esco`} className="mf-btn mf-btn-d">
              {c.esco.cta} <span className="mf-arr">→</span>
            </a>
          </motion.div>

          <motion.div {...rise} transition={{ ...rise.transition, delay: .1 }}>
            <div className="mf-mock">
              <div className="mf-mock-top">
                <div>
                  <div className="mf-mock-t">{c.esco.mockTitle}</div>
                  <div className="mf-mock-s">{c.esco.mockSub}</div>
                </div>
                <span className="mf-mock-pill">live</span>
              </div>
              {c.esco.mockItems.map((m, k) => (
                <div className="mf-mock-i" key={m.t}>
                  <span className="mf-mock-ix">{k + 1}</span>
                  <div>
                    <div className="mf-mock-it">{m.t}</div>
                    <div className="mf-mock-im">{m.m}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   COLLECTIVE
   ============================================================ */
function Collective({ c }: { c: ReturnType<typeof useCopy> }) {
  return (
    <section className="mf-sec" id="collective">
      <div className="mf-wrap">
        <div className="mf-col-grid">
          <motion.div {...rise}>
            <span className="mf-lab">{c.collective.label}</span>
            <h2 className="mf-h2" style={{ marginTop: "1.1rem" }}>{c.collective.title}</h2>
            <p className="mf-lead" style={{ marginTop: "1.3rem" }}>{c.collective.lead}</p>
          </motion.div>

          <motion.div {...rise} transition={{ ...rise.transition, delay: .08 }}>
            <ul className="mf-col-points">
              {c.collective.points.map(p => <li key={p}>{p}</li>)}
            </ul>

            <div className="mf-join">
              <div>
                <h3 className="mf-h3">{c.collective.joinTitle}</h3>
                <p className="mf-body">{c.collective.joinDesc}</p>
              </div>
              <a href="#contatti" className="mf-btn mf-btn-s">
                {c.collective.joinCta} <span className="mf-arr">→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FAQ
   ============================================================ */
function Faq({ c }: { c: ReturnType<typeof useCopy> }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mf-sec" id="faq">
      <div className="mf-wrap">
        <div className="mf-faq-grid">
          <motion.div {...rise}>
            <span className="mf-lab">{c.faq.label}</span>
            <h2 className="mf-h2" style={{ marginTop: "1.1rem" }}>{c.faq.title}</h2>
          </motion.div>

          <motion.div className="mf-faq-list" {...rise} transition={{ ...rise.transition, delay: .08 }}>
            {c.faq.items.map((f, k) => (
              <div className={`mf-faq-i ${open === k ? "o" : ""}`} key={f.q}>
                <button
                  className="mf-faq-q"
                  onClick={() => setOpen(open === k ? null : k)}
                  aria-expanded={open === k}
                >
                  <span>{f.q}</span>
                  <span className="mf-faq-x" aria-hidden />
                </button>
                <div className="mf-faq-a">
                  <p className="mf-body">{f.a}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CONTATTI
   ============================================================ */
type Form = {
  name: string; company: string; email: string;
  type: string; budget: string; message: string; consent: boolean;
};
type Key = keyof Form;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUIRED: Key[] = ["name", "company", "email", "type", "message", "consent"];

function Contact({ c, locale }: { c: ReturnType<typeof useCopy>; locale: string }) {
  const f = c.contact.form;
  const [form, setForm] = useState<Form>({
    name: "", company: "", email: "", type: "", budget: "", message: "", consent: false,
  });
  const [errors, setErrors] = useState<Partial<Record<Key, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<Key, boolean>>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [fatal, setFatal] = useState<string | null>(null);
  const refs = useRef<Partial<Record<Key, HTMLElement | null>>>({});

  const check = (k: Key, v: Form): string | undefined => {
    switch (k) {
      case "name": return v.name.trim().length < 2 ? f.errors.name : undefined;
      case "company": return v.company.trim().length < 2 ? f.errors.company : undefined;
      case "email":
        if (!v.email.trim()) return f.errors.emailReq;
        return EMAIL_RE.test(v.email.trim()) ? undefined : f.errors.emailBad;
      case "type": return !v.type ? f.errors.type : undefined;
      case "message": return v.message.trim().length < 8 ? f.errors.message : undefined;
      case "consent": return !v.consent ? f.errors.consent : undefined;
      default: return undefined;
    }
  };

  const set = (k: Key, value: string | boolean) => {
    const next = { ...form, [k]: value };
    setForm(next);
    if (touched[k]) setErrors(e => ({ ...e, [k]: check(k, next) }));
  };
  const blur = (k: Key) => {
    setTouched(t => ({ ...t, [k]: true }));
    setErrors(e => ({ ...e, [k]: check(k, form) }));
  };
  const cls = (base: string, k: Key) => (touched[k] && errors[k] ? `${base} bad` : base);
  const err = (k: Key) => (touched[k] && errors[k] ? <p className="mf-err" role="alert">{errors[k]}</p> : null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<Key, string>> = {};
    REQUIRED.forEach(k => { const m = check(k, form); if (m) next[k] = m; });
    setErrors(next);
    setTouched(REQUIRED.reduce((a, k) => ({ ...a, [k]: true }), {}));

    const first = REQUIRED.find(k => next[k]);
    if (first) { refs.current[first]?.focus?.(); return; }

    setLoading(true); setFatal(null);
    try {
      const sb = createSupabaseBrowserClient();
      const { error } = await sb.from("contact_leads").insert({
        name: form.name.trim(),
        company: form.company.trim(),
        email: form.email.trim(),
        phone: null,
        website: null,
        project_type: form.type,
        budget: form.budget || null,
        timeline: null,
        message: form.message.trim(),
      });
      if (error) setFatal(f.errors.generic);
      else setSent(true);
    } catch {
      setFatal(f.errors.generic);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mf-contact mf-sec" id="contatti">
      <div className="mf-wrap">
        <div className="mf-contact-grid">
          <motion.div {...rise}>
            <span className="mf-lab">{c.contact.label}</span>
            <h2 className="mf-h2" style={{ marginTop: "1.1rem" }}>{c.contact.title}</h2>
            <p className="mf-lead" style={{ marginTop: "1.2rem" }}>{c.contact.sub}</p>

            <ul className="mf-re">
              {c.contact.reassure.map(r => <li key={r}>{r}</li>)}
            </ul>

            <div className="mf-cinfo">
              <div>
                <div className="mf-cinfo-l">{c.contact.emailLabel}</div>
                <div className="mf-cinfo-v"><a href={`mailto:${c.contact.email}`}>{c.contact.email}</a></div>
              </div>
              <div>
                <div className="mf-cinfo-l">{c.contact.whereLabel}</div>
                <div className="mf-cinfo-v">{c.contact.where}</div>
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="ok" className="mf-ok" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="mf-ok-x">✓</div>
                <h3 className="mf-h3" style={{ marginBottom: 8 }}>{c.contact.successTitle}</h3>
                <p className="mf-body" style={{ maxWidth: "38ch", margin: "0 auto" }}>{c.contact.successDesc}</p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} noValidate className="mf-form" {...rise}>
                <div className="mf-f-row">
                  <div className="mf-f">
                    <label className="mf-f-l" htmlFor="mf-name">{f.name}</label>
                    <input
                      id="mf-name" ref={el => { refs.current.name = el; }}
                      className={cls("mf-in", "name")} value={form.name} placeholder={f.namePh}
                      onChange={e => set("name", e.target.value)} onBlur={() => blur("name")}
                      aria-invalid={!!(touched.name && errors.name)}
                    />
                    {err("name")}
                  </div>
                  <div className="mf-f">
                    <label className="mf-f-l" htmlFor="mf-co">{f.company}</label>
                    <input
                      id="mf-co" ref={el => { refs.current.company = el; }}
                      className={cls("mf-in", "company")} value={form.company} placeholder={f.companyPh}
                      onChange={e => set("company", e.target.value)} onBlur={() => blur("company")}
                      aria-invalid={!!(touched.company && errors.company)}
                    />
                    {err("company")}
                  </div>
                </div>

                <div className="mf-f">
                  <label className="mf-f-l" htmlFor="mf-em">{f.email}</label>
                  <input
                    id="mf-em" type="email" ref={el => { refs.current.email = el; }}
                    className={cls("mf-in", "email")} value={form.email} placeholder={f.emailPh}
                    onChange={e => set("email", e.target.value)} onBlur={() => blur("email")}
                    aria-invalid={!!(touched.email && errors.email)}
                  />
                  {err("email")}
                </div>

                <div className="mf-f-row">
                  <div className="mf-f">
                    <label className="mf-f-l" htmlFor="mf-ty">{f.type}</label>
                    <select
                      id="mf-ty" ref={el => { refs.current.type = el; }}
                      className={cls("mf-sel", "type")} value={form.type}
                      onChange={e => set("type", e.target.value)} onBlur={() => blur("type")}
                      aria-invalid={!!(touched.type && errors.type)}
                    >
                      <option value="">{f.typePh}</option>
                      {f.types.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {err("type")}
                  </div>
                  <div className="mf-f">
                    <label className="mf-f-l" htmlFor="mf-bu">{f.budget} <i>({f.optional})</i></label>
                    <select id="mf-bu" className="mf-sel" value={form.budget} onChange={e => set("budget", e.target.value)}>
                      <option value="">{f.budgetPh}</option>
                      {f.budgets.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>

                <div className="mf-f">
                  <label className="mf-f-l" htmlFor="mf-ms">{f.message}</label>
                  <textarea
                    id="mf-ms" rows={4} ref={el => { refs.current.message = el; }}
                    className={cls("mf-ta", "message")} value={form.message} placeholder={f.messagePh}
                    onChange={e => set("message", e.target.value)} onBlur={() => blur("message")}
                    aria-invalid={!!(touched.message && errors.message)}
                  />
                  {err("message")}
                </div>

                <div className="mf-f">
                  <label className="mf-consent">
                    <input
                      type="checkbox" ref={el => { refs.current.consent = el; }}
                      checked={form.consent}
                      onChange={e => set("consent", e.target.checked)} onBlur={() => blur("consent")}
                      aria-invalid={!!(touched.consent && errors.consent)}
                    />
                    <span>{f.consent}<a href={`/${locale}/privacy`} target="_blank" rel="noopener noreferrer">{f.privacy}</a>.</span>
                  </label>
                  {err("consent")}
                </div>

                {fatal && <p className="mf-err" role="alert">{fatal}</p>}

                <button type="submit" disabled={loading} className="mf-btn mf-btn-p mf-submit">
                  {loading
                    ? <><span className="mf-spin" aria-hidden />{f.sending}</>
                    : <>{f.submit} <span className="mf-arr">→</span></>}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA sticky mobile ---------- */
function StickyCta({ c }: { c: ReturnType<typeof useCopy> }) {
  const [off, setOff] = useState(false);
  useEffect(() => {
    const el = document.getElementById("contatti");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOff(e.isIntersecting), { rootMargin: "0px 0px -45% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div className={`mf-sticky ${off ? "off" : ""}`} aria-hidden={off}>
      <a href="#contatti" className="mf-btn mf-btn-p" tabIndex={off ? -1 : 0}>
        {c.contact.stickyCta} <span className="mf-arr">→</span>
      </a>
    </div>
  );
}

/* ============================================================
   PAGINA
   ============================================================ */
export default function Landing() {
  const locale = useLocale();
  const c = useCopy(locale);

  return (
    <>
      <style>{TOKENS}</style>
      <style>{S}</style>
      <MiutifinLoader />
      <Navbar />
      <main>
        <Hero c={c} />
        <Rail c={c} />
        <Pillars c={c} />
        <Services c={c} />
        <Esco c={c} locale={locale} />
        <Collective c={c} />
        <Faq c={c} />
        <Contact c={c} locale={locale} />
      </main>
      <Footer />
      <StickyCta c={c} />
    </>
  );
}