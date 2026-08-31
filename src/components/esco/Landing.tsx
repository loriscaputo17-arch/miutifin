"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLocale } from "next-intl";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import { ESCO_TOKENS } from "@/components/esco/theme";
import { useEscoCopy } from "@/components/esco/content";
import { EscoNavbar } from "@/components/esco/Navbar";
import { EscoFooter } from "@/components/esco/Footer";

/* ============================================================
   ESCO — LANDING DI ACQUISIZIONE
   Cinque sezioni. Il form sta nell'hero, non in fondo.
   Contatto: telefono di default, email a un tap.
   ============================================================ */

const S = `
/* ============================================================
   HERO
   ============================================================ */
.e-hero{position:relative;padding:clamp(7.5rem,13vw,10rem) 0 clamp(3rem,6vw,4.5rem);overflow:hidden}
.e-hero::before{
  content:'';position:absolute;top:-30%;right:-12%;width:78%;height:130%;pointer-events:none;
  background:radial-gradient(ellipse at center,rgba(216,72,28,.16),transparent 62%);
}
.e-hero::after{
  content:'';position:absolute;inset:0;pointer-events:none;
  background-image:
    linear-gradient(var(--e-line-2) 1px,transparent 1px),
    linear-gradient(90deg,var(--e-line-2) 1px,transparent 1px);
  background-size:72px 72px;
  -webkit-mask-image:radial-gradient(ellipse 75% 70% at 40% 30%,#000,transparent 80%);
  mask-image:radial-gradient(ellipse 75% 70% at 40% 30%,#000,transparent 80%);
}
.e-hero-grid{
  position:relative;z-index:1;
  display:grid;grid-template-columns:1.05fr .95fr;gap:clamp(2rem,5vw,4rem);align-items:center;
}
@media(max-width:920px){.e-hero-grid{grid-template-columns:1fr;gap:2.5rem}}

.e-hero h1{margin:1.5rem 0 0}
.e-rot{display:inline-flex;align-items:center;overflow:hidden;color:var(--e-ac-b);
  line-height:1.08;padding:.04em .05em .1em;margin:-.04em -.05em -.1em;max-width:100%}
.e-hero-sub{margin-top:1.6rem;max-width:46ch}

/* ---------- form con switch telefono / email ---------- */
.e-join{margin-top:2.2rem;max-width:540px}
.e-tabs{
  position:relative;display:grid;grid-template-columns:1fr 1fr;
  width:100%;max-width:300px;padding:4px;border-radius:100px;
  background:var(--e-paper-3);border:1px solid var(--e-line);margin-bottom:.85rem;
}
.e-tabs-pill{
  position:absolute;top:4px;left:4px;width:calc(50% - 4px);height:calc(100% - 8px);
  border-radius:100px;background:var(--e-paper-2);
  box-shadow:0 1px 3px rgba(20,17,14,.12);
  transition:transform .26s cubic-bezier(.4,0,.2,1);pointer-events:none;
}
.e-tabs-pill.email{transform:translateX(100%)}
.e-tab{
  position:relative;z-index:1;
  display:flex;align-items:center;justify-content:center;height:40px;
  border:none;background:transparent;border-radius:100px;
  font-size:14px;font-weight:500;letter-spacing:-.01em;
  color:var(--e-mut);transition:color .2s ease;
}
.e-tab:hover{color:var(--e-ink)}
.e-tab.a{color:var(--e-ink)}
.e-join-row{display:flex;gap:10px;flex-wrap:wrap}
.e-in{
  flex:1 1 auto;min-width:230px;height:54px;padding:0 20px;
  background:var(--e-paper-2);border:1px solid var(--e-line);border-radius:100px;
  font-family:var(--e-fb);font-size:16px;color:var(--e-ink);letter-spacing:-.012em;
  outline:none;transition:border-color .18s ease,box-shadow .18s ease;
}
.e-in::placeholder{color:var(--e-mut-2)}
.e-in:focus{border-color:var(--e-ac);box-shadow:0 0 0 3px var(--e-ac-wash)}
.e-in.bad{border-color:var(--e-ac-2);box-shadow:0 0 0 3px rgba(216,72,28,.14)}
.e-join .e-btn{flex:0 0 auto;height:54px;box-shadow:0 6px 16px -10px rgba(216,72,28,.55)}
@media(max-width:600px){
  .e-join-row{flex-direction:column}
  /* in colonna l'asse principale e' verticale: senza flex:none
     la basis azzera l'altezza del campo */
  .e-in{flex:0 0 auto;width:100%;min-width:0}
  .e-join .e-btn{flex:0 0 auto;width:100%}
}
.e-join-note{
  margin-top:1rem;font-size:13.5px;color:var(--e-mut);letter-spacing:-.005em;
  display:flex;align-items:flex-start;gap:9px;line-height:1.45;
}
.e-join-note::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--e-ok);flex-shrink:0;margin-top:.42em}
.e-join-err{margin-top:.9rem;font-size:14px;color:var(--e-ac-b);font-weight:500}

/* consenso: obbligatorio, si raccolgono numeri di telefono */
.e-consent{
  display:flex;align-items:flex-start;gap:10px;margin-top:.95rem;
  font-size:13.5px;line-height:1.45;color:var(--e-mut);letter-spacing:-.005em;cursor:pointer;
}
.e-consent input{
  appearance:none;-webkit-appearance:none;flex-shrink:0;margin-top:.1em;
  width:20px;height:20px;border-radius:6px;
  border:1px solid var(--e-line-3);background:var(--e-paper-2);
  cursor:pointer;position:relative;transition:background .15s ease,border-color .15s ease;
}
.e-consent input:checked{background:var(--e-ac);border-color:var(--e-ac)}
.e-consent input:checked::after{
  content:'';position:absolute;left:6.5px;top:3px;width:5px;height:10px;
  border:solid #fff;border-width:0 2px 2px 0;transform:rotate(43deg);
}
.e-consent.bad input{border-color:var(--e-ac-2);box-shadow:0 0 0 3px rgba(216,72,28,.14)}
.e-consent a{color:var(--e-ink);text-decoration:underline;text-underline-offset:2px}
.e-consent a:hover{color:var(--e-ac-b)}
.e-turnstile{margin-top:.9rem;min-height:0}
.e-turnstile:not(:empty){min-height:65px}
/* honeypot: invisibile alle persone, irresistibile per i bot */
.e-hp{position:absolute;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none}
.e-join-ok{
  margin-top:2.2rem;max-width:540px;padding:1.7rem 1.9rem;
  background:var(--e-paper-2);border:1px solid var(--e-ac-line);border-radius:20px;
  box-shadow:0 20px 40px -28px rgba(20,17,14,.4);
}
.e-join-ok strong{
  display:block;font-family:var(--e-fd);font-size:1.55rem;font-weight:600;
  letter-spacing:-.03em;color:var(--e-ink);margin-bottom:.5rem;
}

/* stats */
.e-hero-stats{display:flex;gap:2.4rem;flex-wrap:wrap;margin-top:2.4rem;padding-top:1.6rem;border-top:1px solid var(--e-line)}
.e-hero-stat b{display:block;font-family:var(--e-fd);font-size:1.55rem;font-weight:600;letter-spacing:-.035em;color:var(--e-ink)}
.e-hero-stat span{
  display:block;margin-top:5px;font-family:var(--e-fm);font-size:10.5px;letter-spacing:.12em;
  text-transform:uppercase;color:var(--e-mut-2);
}

/* ============================================================
   TAMBURO 3D — sei esperienze della giornata
   raggio = (larghezza/2) / tan(180/n) => tamburo chiuso, senza vuoti
   ============================================================ */
.e-stage{position:relative;height:430px;display:flex;align-items:center;justify-content:center;perspective:1250px}
@media(max-width:920px){.e-stage{height:400px}}
.e-stage-label{
  position:absolute;top:4px;left:50%;transform:translateX(-50%);z-index:3;
  font-family:var(--e-fm);font-size:11px;letter-spacing:.14em;text-transform:uppercase;
  color:var(--e-mut-2);white-space:nowrap;
}
.e-ring{
  --e-r:208px;                 /* raggio = (larghezza/2) / tan(180/6) */
  position:relative;width:236px;height:312px;
  transform-style:preserve-3d;transform:rotateX(-7deg);
  animation:e-ring-spin 34s linear infinite;
}
@keyframes e-ring-spin{
  from{transform:rotateX(-7deg) rotateY(0deg)}
  to{transform:rotateX(-7deg) rotateY(-360deg)}
}
.e-stage:hover .e-ring{animation-play-state:paused}
.e-card{
  position:absolute;inset:0;border-radius:20px;padding:1.4rem;
  background:var(--e-paper-2);border:1px solid var(--e-line);
  backface-visibility:hidden;-webkit-backface-visibility:hidden;
  display:flex;flex-direction:column;
  box-shadow:0 22px 44px -26px rgba(20,17,14,.55);
}
.e-card:nth-child(1){transform:rotateY(0deg)   translateZ(var(--e-r))}
.e-card:nth-child(2){transform:rotateY(60deg)  translateZ(var(--e-r))}
.e-card:nth-child(3){transform:rotateY(120deg) translateZ(var(--e-r))}
.e-card:nth-child(4){transform:rotateY(180deg) translateZ(var(--e-r))}
.e-card:nth-child(5){transform:rotateY(240deg) translateZ(var(--e-r))}
.e-card:nth-child(6){transform:rotateY(300deg) translateZ(var(--e-r))}
.e-card-top{display:flex;align-items:center;justify-content:space-between;gap:.8rem;margin-bottom:auto}
.e-card-time{
  font-family:var(--e-fm);font-size:12px;letter-spacing:.06em;color:var(--e-ac-b);
  background:var(--e-ac-wash);border-radius:100px;padding:6px 12px;
}
.e-card-match{font-family:var(--e-fm);font-size:10.5px;color:var(--e-mut-2);letter-spacing:.08em;text-align:right}
.e-card-match b{display:block;font-size:17px;color:var(--e-ink);letter-spacing:-.02em}
.e-card-t{
  font-family:var(--e-fd);font-size:1.4rem;font-weight:600;letter-spacing:-.03em;line-height:1.12;
  color:var(--e-ink);margin-bottom:.5rem;
}
.e-card-m{font-family:var(--e-fm);font-size:11px;color:var(--e-mut);letter-spacing:.02em;line-height:1.5}
.e-card-bar{margin-top:1.1rem;height:3px;border-radius:3px;background:var(--e-line);overflow:hidden}
.e-card-bar i{display:block;height:100%;border-radius:3px;background:var(--e-ac)}

/* Mobile: niente scale (deformava la prospettiva). Si riduce il tamburo
   davvero. Raggio = (larghezza / 2) / tan(30°) -> il cilindro resta chiuso
   e l'ingombro orizzontale sta dentro allo schermo. */
@media(max-width:640px){
  .e-stage{height:326px;padding-top:2.6rem}
  .e-stage-label{top:0}
  .e-ring{--e-r:152px;width:176px;height:238px}
  .e-card{padding:1.05rem;border-radius:18px}
  .e-card-t{font-size:1.12rem;margin-bottom:.35rem}
  .e-card-time{font-size:10.5px;padding:5px 10px}
  .e-card-m{font-size:10px}
  .e-card-match{font-size:9.5px}
  .e-card-match b{font-size:14px}
  .e-card-bar{margin-top:.8rem}
}
@media(max-width:400px){
  .e-stage{height:300px;padding-top:2.4rem}
  .e-ring{--e-r:139px;width:160px;height:222px}
  .e-card-t{font-size:1.05rem}
}

/* ============================================================
   STATEMENT
   ============================================================ */
.e-state{padding:clamp(4.5rem,9vw,7.5rem) 0;border-top:1px solid var(--e-line)}
.e-state-h{
  font-family:var(--e-fd);font-weight:600;
  font-size:clamp(2.2rem,6vw,4.4rem);line-height:1.02;letter-spacing:-.042em;
  color:var(--e-ink);max-width:16ch;
}
.e-state-h em{font-style:normal;color:var(--e-mut-2)}
.e-state-sub{margin-top:1.8rem;max-width:48ch}

/* ============================================================
   HOW
   ============================================================ */
.e-how{padding:var(--e-sec) 0;border-top:1px solid var(--e-line)}
.e-how-grid{
  display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--e-line);
  border:1px solid var(--e-line);border-radius:18px;overflow:hidden;margin-top:2.2rem;
}
@media(max-width:820px){.e-how-grid{grid-template-columns:1fr}}
.e-how-cell{background:var(--e-paper-2);padding:2rem;transition:background .3s ease}
.e-how-cell:hover{background:var(--e-paper-3)}
.e-how-n{font-family:var(--e-fm);font-size:11px;letter-spacing:.14em;color:var(--e-ac-b);margin-bottom:1.4rem}
.e-how-t{font-family:var(--e-fd);font-size:1.35rem;font-weight:600;letter-spacing:-.028em;color:var(--e-ink);margin-bottom:.6rem}

/* ============================================================
   CITTA'
   ============================================================ */
.e-cities{padding:var(--e-sec) 0;border-top:1px solid var(--e-line)}
.e-cities-head{display:flex;align-items:flex-end;justify-content:space-between;gap:2rem;flex-wrap:wrap;margin-bottom:2.2rem}
.e-cities-grid{
  display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--e-line);
  border:1px solid var(--e-line);border-radius:18px;overflow:hidden;
}
@media(max-width:820px){.e-cities-grid{grid-template-columns:repeat(2,1fr)}}
.e-city{
  background:var(--e-paper-2);padding:1.3rem 1.4rem;
  display:flex;align-items:center;justify-content:space-between;gap:.8rem;transition:background .3s ease;
}
.e-city:hover{background:var(--e-paper-3)}
.e-city-n{font-family:var(--e-fd);font-size:1.15rem;font-weight:600;letter-spacing:-.028em;color:var(--e-ink)}
.e-city-s{font-family:var(--e-fm);font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--e-mut-2);text-align:right}
.e-city-s.live{color:var(--e-ok)}
.e-city-s.live::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--e-ok);display:inline-block;margin-right:7px;vertical-align:middle}
.e-cities-note{margin-top:1.6rem;font-size:15px;color:var(--e-mut);letter-spacing:-.01em}

/* ============================================================
   CTA FINALE
   ============================================================ */
.e-final{padding:clamp(5rem,11vw,9rem) 0;border-top:1px solid var(--e-line);position:relative;overflow:hidden;text-align:center}
.e-final::before{
  content:'';position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(ellipse 55% 60% at 50% 55%,rgba(216,72,28,.13),transparent 68%);
}
.e-final-in{position:relative;z-index:1;max-width:760px;margin:0 auto}
.e-final h2{margin-bottom:1.2rem}
.e-final h2 em{font-style:normal;color:var(--e-ac-b)}
.e-final .e-lead{margin:0 auto}
.e-final .e-join{margin:2.2rem auto 0;display:flex;flex-direction:column;align-items:center}
.e-final .e-join-row{width:100%;justify-content:center}
.e-final .e-join-note{justify-content:center;text-align:left}
.e-final .e-join-ok{margin:2.2rem auto 0;text-align:left}
.e-stores{
  margin-top:3rem;padding-top:2rem;border-top:1px solid var(--e-line);
  display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;
}
.e-store{
  padding:10px 18px;border:1px solid var(--e-line);border-radius:100px;
  font-size:14px;color:var(--e-mut);letter-spacing:-.01em;background:var(--e-paper-2);
}

/* CTA sticky mobile */
.e-sticky{display:none}
@media(max-width:768px){
  .e-sticky{
    display:block;position:fixed;left:0;right:0;bottom:0;z-index:150;
    padding:10px 14px calc(10px + env(safe-area-inset-bottom,0px));
    background:rgba(246,243,236,.93);border-top:1px solid var(--e-line);
    backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
    transition:transform .3s ease,opacity .3s ease;
  }
  .e-sticky.off{transform:translateY(120%);opacity:0;pointer-events:none}
  .e-sticky .e-btn{width:100%}
}

/* ============================================================
   MOBILE — rifatto guardando un 390px reale
   ============================================================ */
@media(max-width:900px){
  .e-hero{padding:6.4rem 0 2.5rem}
  .e-hero-grid{gap:2.2rem}
  /* su mobile: prima la promessa e il form, il tamburo sotto */
  .e-hero-copy{order:1}
  .e-stage{order:2;margin-top:.4rem}
}
@media(max-width:600px){
  .e-hero{padding:5.9rem 0 2rem}
  .e-hero h1{margin-top:1.1rem}
  .e-hero-sub{margin-top:1.1rem;max-width:100%}

  /* form: due pill a meta' schermo, campo e bottone a piena larghezza */
  .e-join{margin-top:1.7rem;max-width:100%}
  .e-tabs{max-width:100%;margin-bottom:.75rem}
  .e-tab{height:42px;font-size:14.5px}
  .e-join-row{gap:10px}
  .e-in{height:54px;min-height:54px;font-size:16px;padding:0 18px}  /* 16px: sotto, iOS zooma da solo */
  .e-join .e-btn{height:54px;min-height:54px;font-size:16px}
  .e-join-note{margin-top:.85rem;font-size:13px}
  .e-join-ok{padding:1.4rem 1.5rem;max-width:100%}
  .e-join-ok strong{font-size:1.35rem}

  /* stats: tre colonne strette invece di un a-capo storto */
  .e-hero-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-top:2rem;padding-top:1.3rem}
  .e-hero-stat b{font-size:1.3rem}
  .e-hero-stat span{font-size:9.5px;letter-spacing:.08em;line-height:1.35}

  .e-state{padding:3.6rem 0}
  .e-state-sub{margin-top:1.2rem}
  .e-how{padding:3.6rem 0}
  .e-how-grid{margin-top:1.6rem;border-radius:16px}
  .e-how-cell{padding:1.5rem}
  .e-how-n{margin-bottom:1rem}
  .e-how-t{font-size:1.25rem}

  .e-cities{padding:3.6rem 0}
  .e-cities-head{margin-bottom:1.6rem}
  .e-cities-grid{border-radius:16px}
  .e-city{flex-direction:column;align-items:flex-start;gap:.3rem;padding:1.05rem 1.1rem}
  .e-city-n{font-size:1.05rem}
  .e-city-s{text-align:left}
  .e-cities-note{font-size:14px;margin-top:1.2rem}

  .e-final{padding:4.2rem 0}
  .e-final .e-join{margin-top:1.7rem}
  .e-stores{margin-top:2.2rem;padding-top:1.6rem}

  /* la sticky non deve mangiarsi il footer */
  .esco-root main{padding-bottom:5.2rem}
}
@media(max-width:380px){
  .e-tab{font-size:13.5px}
  .e-hero-stats{gap:.7rem}
  .e-hero-stat b{font-size:1.15rem}
}
`;

/* Cloudflare Turnstile: se la chiave pubblica non c'e' (sviluppo locale)
   il widget non si carica e la route lascia passare. */
const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      remove: (id: string) => void;
    };
  }
}

function useTurnstile(onToken: (t: string) => void) {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!TURNSTILE_KEY || !box.current) return;
    let widgetId: string | undefined;

    const render = () => {
      if (!window.turnstile || !box.current || widgetId) return;
      widgetId = window.turnstile.render(box.current, {
        sitekey: TURNSTILE_KEY,
        callback: onToken,
        "expired-callback": () => onToken(""),
        theme: "light",
        size: "flexible",
      });
    };

    if (window.turnstile) {
      render();
    } else if (!document.getElementById("cf-turnstile-script")) {
      const sc = document.createElement("script");
      sc.id = "cf-turnstile-script";
      sc.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      sc.async = true;
      sc.defer = true;
      sc.onload = render;
      document.head.appendChild(sc);
    } else {
      const t = setInterval(() => { if (window.turnstile) { render(); clearInterval(t); } }, 200);
      return () => clearInterval(t);
    }

    return () => { if (widgetId && window.turnstile) window.turnstile.remove(widgetId); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return box;
}

const rise = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ============================================================
   FORM — switch telefono / email, telefono di default
   ============================================================ */
function JoinForm({ c, source, locale }: { c: ReturnType<typeof useEscoCopy>; source: string; locale: string }) {
  const h = c.hero;
  const [mode, setMode] = useState<"phone" | "email">("email");
  const [value, setValue] = useState("");
  const [consent, setConsent] = useState(false);
  const [trap, setTrap] = useState("");            // honeypot
  const [token, setToken] = useState("");          // Turnstile
  const turnstileBox = useTurnstile(setToken);
  const [bad, setBad] = useState<"field" | "consent" | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const switchTo = (next: "phone" | "email") => {
    if (next === mode) return;
    setMode(next); setValue(""); setBad(null); setErr(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const raw = value.trim();
    const looksOk = mode === "phone" ? raw.replace(/\D/g, "").length >= 8 : EMAIL_RE.test(raw);
    if (!looksOk) {
      setBad("field");
      setErr(mode === "phone" ? h.errors.invalidPhone : h.errors.invalidEmail);
      return;
    }
    if (!consent) { setBad("consent"); setErr(h.errors.consent); return; }

    setBad(null); setErr(null); setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode, value: raw, consent: true, locale,
          source: `${source}_${mode}`, token, trap,
        }),
      });

      if (res.ok) { setDone(true); return; }

      const data = (await res.json().catch(() => ({}))) as { error?: string };
      switch (data.error) {
        case "already":      setErr(h.errors.already); break;
        case "rate_limited": setErr(h.errors.tooMany); break;
        case "robot":        setErr(h.errors.robot); break;
        case "consent":      setBad("consent"); setErr(h.errors.consent); break;
        case "invalid":
          setBad("field");
          setErr(mode === "phone" ? h.errors.invalidPhone : h.errors.invalidEmail);
          break;
        default:             setErr(h.errors.generic);
      }
    } catch {
      setErr(h.errors.network);
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <motion.div className="e-join-ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <strong>{h.successTitle}</strong>
        <p className="e-body">{h.successDesc}</p>
      </motion.div>
    );
  }

  return (
    <form className="e-join" onSubmit={submit} noValidate>
      <div className="e-tabs" role="tablist">
        <span className={`e-tabs-pill ${mode === "email" ? "email" : ""}`} aria-hidden />
        <button
          type="button" role="tab" aria-selected={mode === "phone"}
          className={`e-tab ${mode === "phone" ? "a" : ""}`} onClick={() => switchTo("phone")}
        >{h.tabPhone}</button>
        <button
          type="button" role="tab" aria-selected={mode === "email"}
          className={`e-tab ${mode === "email" ? "a" : ""}`} onClick={() => switchTo("email")}
        >{h.tabEmail}</button>
      </div>

      <div className="e-join-row">
        <input
          key={mode}
          type={mode === "phone" ? "tel" : "email"}
          inputMode={mode === "phone" ? "tel" : "email"}
          autoComplete={mode === "phone" ? "tel" : "email"}
          className={`e-in ${bad === "field" ? "bad" : ""}`}
          placeholder={mode === "phone" ? h.phonePh : h.emailPh}
          value={value}
          onChange={ev => { setValue(ev.target.value); if (bad === "field") { setBad(null); setErr(null); } }}
          disabled={loading}
          aria-label={mode === "phone" ? h.tabPhone : h.tabEmail}
          aria-invalid={bad === "field"}
        />
        <button type="submit" className="e-btn e-btn-p" disabled={loading}>
          {loading ? h.sending : <>{h.cta} <span className="e-arr">→</span></>}
        </button>
      </div>

      {/* honeypot */}
      <input
        className="e-hp" type="text" tabIndex={-1} autoComplete="off"
        aria-hidden="true" value={trap} onChange={ev => setTrap(ev.target.value)}
      />

      <div ref={turnstileBox} className="e-turnstile" />

      <label className={`e-consent ${bad === "consent" ? "bad" : ""}`}>
        <input
          type="checkbox" checked={consent}
          onChange={ev => { setConsent(ev.target.checked); if (bad === "consent") { setBad(null); setErr(null); } }}
          aria-invalid={bad === "consent"}
        />
        <span>
          {h.consent}
          <a href={`/${locale}/privacy`} target="_blank" rel="noopener noreferrer">{h.privacy}</a>.
        </span>
      </label>

      {err
        ? <p className="e-join-err" role="alert">{err}</p>
        : <p className="e-join-note">{mode === "phone" ? h.notePhone : h.noteEmail}</p>}
    </form>
  );
}

/* ============================================================
   HERO
   ============================================================ */
function Hero({ c, locale }: { c: ReturnType<typeof useEscoCopy>; locale: string }) {
  const h = c.hero;
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const [stats, setStats] = useState<{ members: number; thisWeek: number; citiesLive: number } | null>(null);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI(v => (v + 1) % h.rotating.length), 2400);
    return () => clearInterval(id);
  }, [h.rotating.length, reduce]);

  useEffect(() => {
    (async () => {
      try {
        const sb = createSupabaseBrowserClient();
        const { data, error } = await sb.rpc("get_landing_stats");
        if (!error && data) setStats(data as { members: number; thisWeek: number; citiesLive: number });
      } catch { /* se fallisce non mostriamo numeri: meglio niente che inventati */ }
    })();
  }, []);

  return (
    <section className="e-hero">
      <div className="e-wrap e-hero-grid">
        <div className="e-hero-copy">
          <motion.span className="e-lab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }}>
            {h.eyebrow}
          </motion.span>

          <motion.h1
            className="e-h1"
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7, ease: [0.22, 1, 0.36, 1] }}
          >
            {h.line1} {h.line2}<br />
            <span className="e-rot">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={h.rotating[i]}
                  initial={{ y: "70%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-70%", opacity: 0 }}
                  transition={{ duration: .34, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: "inline-block" }}
                >
                  {h.rotating[i]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p
            className="e-lead e-hero-sub"
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .6, delay: .12 }}
          >
            {h.sub}
          </motion.p>

          <motion.div id="join" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .2 }}>
            <JoinForm c={c} source="esco_hero" locale={locale} />
          </motion.div>

          {stats && (
            <motion.div className="e-hero-stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .6, delay: .35 }}>
              {stats.members > 0 && (
                <div className="e-hero-stat"><b>{stats.members.toLocaleString()}</b><span>{c.stats.members}</span></div>
              )}
              {stats.thisWeek > 0 && (
                <div className="e-hero-stat"><b>+{stats.thisWeek}</b><span>{c.stats.thisWeek}</span></div>
              )}
              <div className="e-hero-stat"><b>{stats.citiesLive}</b><span>{c.stats.cities}</span></div>
            </motion.div>
          )}
        </div>

        {/* tamburo 3D */}
        <motion.div
          className="e-stage"
          initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: .25, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="e-stage-label">{h.cardsLabel}</span>
          <div className="e-ring">
            {h.cards.map(card => (
              <article className="e-card" key={card.title}>
                <div className="e-card-top">
                  <span className="e-card-time">{card.time}</span>
                  <span className="e-card-match"><b>{card.match}%</b>{h.matchLabel}</span>
                </div>
                <h3 className="e-card-t">{card.title}</h3>
                <p className="e-card-m">{card.meta}</p>
                <div className="e-card-bar"><i style={{ width: `${card.match}%` }} /></div>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   SEZIONI CORTE
   ============================================================ */
function Statement({ c }: { c: ReturnType<typeof useEscoCopy> }) {
  return (
    <section className="e-state">
      <div className="e-wrap">
        <motion.h2 className="e-state-h" {...rise}>
          {c.statement.pre} <em>{c.statement.em}</em> {c.statement.post}
        </motion.h2>
        <motion.p className="e-lead e-state-sub" {...rise} transition={{ ...rise.transition, delay: .08 }}>
          {c.statement.sub}
        </motion.p>
      </div>
    </section>
  );
}

function How({ c }: { c: ReturnType<typeof useEscoCopy> }) {
  return (
    <section className="e-how" id="how">
      <div className="e-wrap">
        <motion.span className="e-lab" {...rise}>{c.how.label}</motion.span>
        <motion.div className="e-how-grid" {...rise} transition={{ ...rise.transition, delay: .06 }}>
          {c.how.items.map(s => (
            <div className="e-how-cell" key={s.n}>
              <div className="e-how-n">{s.n}</div>
              <div className="e-how-t">{s.t}</div>
              <p className="e-body">{s.d}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Cities({ c }: { c: ReturnType<typeof useEscoCopy> }) {
  return (
    <section className="e-cities" id="cities">
      <div className="e-wrap">
        <motion.div className="e-cities-head" {...rise}>
          <div>
            <span className="e-lab">{c.cities.label}</span>
            <h2 className="e-h2" style={{ marginTop: "1rem" }}>{c.cities.title}</h2>
          </div>
        </motion.div>

        <motion.div className="e-cities-grid" {...rise} transition={{ ...rise.transition, delay: .06 }}>
          {c.cities.items.map(city => (
            <div className="e-city" key={city.name}>
              <span className="e-city-n">{city.name}</span>
              <span className={`e-city-s ${city.live ? "live" : ""}`}>
                {city.live ? c.cities.live : ("eta" in city ? city.eta : c.cities.soon)}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.p className="e-cities-note" {...rise}>{c.cities.askCity}</motion.p>
      </div>
    </section>
  );
}

function Final({ c, locale }: { c: ReturnType<typeof useEscoCopy>; locale: string }) {
  return (
    <section className="e-final" id="waitlist">
      <div className="e-wrap e-final-in">
        <motion.h2 className="e-h2" {...rise}>
          {c.final.title} <em>{c.final.titleEm}</em>
        </motion.h2>
        <motion.p className="e-lead" {...rise} transition={{ ...rise.transition, delay: .06 }}>
          {c.final.sub}
        </motion.p>
        <motion.div {...rise} transition={{ ...rise.transition, delay: .12 }}>
          <JoinForm c={c} source="esco_final" locale={locale} />
        </motion.div>
        <motion.div className="e-stores" {...rise}>
          <span className="e-store">{c.final.storesLabel}</span>
        </motion.div>
      </div>
    </section>
  );
}

function StickyCta({ c }: { c: ReturnType<typeof useEscoCopy> }) {
  const [off, setOff] = useState(true);
  useEffect(() => {
    const fn = () => {
      const final = document.getElementById("waitlist");
      const near = final ? final.getBoundingClientRect().top < window.innerHeight * .85 : false;
      setOff(window.scrollY < 600 || near);
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div className={`e-sticky ${off ? "off" : ""}`} aria-hidden={off}>
      <a href="#waitlist" className="e-btn e-btn-p" tabIndex={off ? -1 : 0}>
        {c.nav.cta} <span className="e-arr">→</span>
      </a>
    </div>
  );
}

/* ============================================================
   PAGINA
   ============================================================ */
export default function EscoLanding() {
  const locale = useLocale();
  const c = useEscoCopy(locale);

  return (
    <div className="esco-root">
      <style>{ESCO_TOKENS}</style>
      <style>{S}</style>
      <div className="e-grain" />
      <EscoNavbar />
      <main>
        <Hero c={c} locale={locale} />
        <Statement c={c} />
        <How c={c} />
        <Cities c={c} />
        <Final c={c} locale={locale} />
        <EscoFooter />
      </main>
      <StickyCta c={c} />
    </div>
  );
}