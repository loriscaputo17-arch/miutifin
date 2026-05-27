"use client";

import React, { useEffect, useRef, useState } from "react";
import { ESCO_STYLES } from "@/components/esco/styles";
import { EscoNavbar } from "@/components/esco/Navbar";
import { EscoFooter } from "@/components/esco/Footer";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import { useTranslations } from "next-intl";
import { EscoLoader } from "@/components/esco/Loader";

/* ─────────────────────────────────────────
   HOOKS
───────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCounter(target: number, duration = 2000, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number; const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return val;
}

function MobileStickyCta() {
  const t = useTranslations("esco.hero");
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <a href="#waitlist" className={`esco-mobile-cta ${show ? "v" : ""}`}>
      {t("ctaPrimary")} →
    </a>
  );
}


/* ─────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────── */
function Fade({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`esco-fade ${inView ? "v" : "h"}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ── HERO ── */
/* ── HERO ── */
function Hero() {
  const t = useTranslations("esco.hero");
  const { ref, inView } = useInView(0.3);

  // Stats reali da Supabase
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
        // Se fallisce, semplicemente non mostriamo i numeri — meglio niente che bugie
      }
    };
    fetchStats();
  }, []);

  // Counter animato solo quando abbiamo i dati e siamo in view
  const animateMembers = useCounter(stats?.members ?? 0, 1800, inView && stats !== null);

  const labels = t.raw("stats") as { members: string; reviewedWeek: string; citiesLive: string };

  // Form state
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!isValidEmail(trimmed)) {
      setErr(t("errors.invalidEmail"));
      return;
    }
    setLoading(true);
    setErr(null);

    try {
      const sb = createSupabaseBrowserClient();
      const { error } = await sb.from("waitlist").insert({
        email: trimmed,
        source: "esco_landing_hero",
      });
      if (error) {
        if (error.code === "23505") setErr(t("errors.alreadyOnList"));
        else if (error.code === "42501") setErr(t("errors.invalidEmail"));
        else setErr(t("errors.generic"));
        setLoading(false);
        return;
      }
      setDone(true);
      setLoading(false);
      // Aggiorna le stats dopo che l'utente si è iscritto (incrementa il count)
      if (stats) {
        setStats({ ...stats, members: stats.members + 1, thisWeek: stats.thisWeek + 1 });
      }
    } catch {
      setErr(t("errors.network"));
      setLoading(false);
    }
  };

  return (
    <section className="esco-hero" ref={ref}>
      <span className="esco-hero-bg">esco</span>

      {/* Stats solo se le abbiamo davvero */}
      {stats && stats.members > 0 && (
        <div className="esco-hero-stats">
          <div className="esco-hero-stat">
            <strong>{animateMembers.toLocaleString()}</strong>
            <span>{labels.members}</span>
          </div>
          {stats.thisWeek > 0 && (
            <>
              <div className="esco-hero-stat-sep" />
              <div className="esco-hero-stat">
                <strong>{stats.thisWeek}</strong>
                <span>{labels.reviewedWeek}</span>
              </div>
            </>
          )}
          <div className="esco-hero-stat-sep" />
          <div className="esco-hero-stat">
            <strong>{stats.citiesLive}</strong>
            <span>{labels.citiesLive}</span>
          </div>
        </div>
      )}

      <div className="esco-wrap esco-hero-inner">
        <div className="esco-eyebrow">
          <span className="esco-dot" />
          <span>{t("eyebrow")}</span>
        </div>

        <h1 className="esco-h1">
          {t("titleLine1")} <em>{t("titleLine1Em")}</em><br />
          <span className="underline">{t("titleLine2")}</span>
        </h1>

        <p className="esco-hero-sub">{t("subtitle")}</p>

        {done ? (
          <div className="esco-hero-form-success">
            <strong>{t("success.title")}</strong>
            <span>{t("success.desc")}</span>
          </div>
        ) : (
          <>
            <form onSubmit={submit} className="esco-hero-form">
              <input
                type="email"
                required
                placeholder={t("placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                aria-label={t("placeholder")}
              />
              <button type="submit" disabled={loading}>
                {loading ? t("submitting") : t("submit")}
                {!loading && <span className="esco-arr">→</span>}
              </button>
            </form>
            {err && <p className="esco-hero-form-err">{err}</p>}

            {/* Hint con count reale, solo se abbiamo dati e ce ne sono */}
            {stats && stats.thisWeek > 0 && (
              <p className="esco-hero-hint">
                <span className="esco-dot" />
                <span>
                  {t.rich("hint", {
                    count: stats.thisWeek,
                    em: (chunks) => <em>{chunks}</em>,
                  })}
                </span>
              </p>
            )}
          </>
        )}

        {/*<div className="esco-hero-meta">
          <a href="#login" className="esco-hero-meta-link">
            {t("alreadyInvited")} <strong>{t("openApp")} →</strong>
          </a>
        </div>*/}
      </div>
    </section>
  );
}

function Intro() {
  const t = useTranslations("esco.intro");
  return (
    <section className="esco-intro">
      <div className="esco-wrap">
        <Fade>
          <p>{t("linePre")} <em>{t("lineEm")}</em> {t("linePost")} <strong>{t("lineStrong")}</strong></p>
        </Fade>
      </div>
    </section>
  );
}

function HowItWorks() {
  const t = useTranslations("esco.how");
  const items = t.raw("items") as { n: string; title: string; body: string }[];
  return (
    <section className="esco-how" id="how">
      <div className="esco-wrap"><div className="esco-label">{t("label")}</div></div>
      <div className="esco-how-grid">
        {items.map((s, i) => (
          <Fade key={s.n} delay={i * 80}>
            <div className="esco-how-cell">
              <div className="esco-how-n">{s.n}</div>
              <div className="esco-how-t">{s.title}</div>
              <p className="esco-how-b">{s.body}</p>
            </div>
          </Fade>
        ))}
      </div>
    </section>
  );
}

function Simulator() {
  const t = useTranslations("esco.simulator");
  const [who, setWho] = useState<"date" | "friends" | "solo">("date");
  const [when, setWhen] = useState<"day" | "evening" | "night">("evening");
  const [mood, setMood] = useState<"relaxed" | "energetic">("relaxed");

  const groups = t.raw("groups") as { who: string; when: string; mood: string };
  const opt = t.raw("options") as Record<string, string>;
  const samples = t.raw("samples") as Record<string, { title: string; body: string }>;
  const key = `${who}-${when}-${mood}`;
  const out = samples[key] || samples["date-evening-relaxed"];

  return (
    <section className="esco-sim" id="try">
      <div className="esco-wrap">
        <div className="esco-sim-grid">
          <div>
            <div className="esco-label">{t("label")}</div>
            <h2 className="esco-h2" style={{ marginBottom: "1.2rem" }}>
              {t("titleLine1")} <em>{t("titleLine1Em")}</em>
            </h2>
            <p className="esco-lead" style={{ marginBottom: "2.5rem" }}>{t("lead")}</p>
            <div className="esco-sim-controls">
              <div>
                <div className="esco-sim-glabel">{groups.who}</div>
                <div className="esco-sim-tags">
                  {(["date", "friends", "solo"] as const).map(o => (
                    <button key={o} className={`esco-sim-tag ${who === o ? "a" : ""}`} onClick={() => setWho(o)}>{opt[o]}</button>
                  ))}
                </div>
              </div>
              <div>
                <div className="esco-sim-glabel">{groups.when}</div>
                <div className="esco-sim-tags">
                  {(["day", "evening", "night"] as const).map(o => (
                    <button key={o} className={`esco-sim-tag ${when === o ? "a" : ""}`} onClick={() => setWhen(o)}>{opt[o]}</button>
                  ))}
                </div>
              </div>
              <div>
                <div className="esco-sim-glabel">{groups.mood}</div>
                <div className="esco-sim-tags">
                  {(["relaxed", "energetic"] as const).map(o => (
                    <button key={o} className={`esco-sim-tag ${mood === o ? "a" : ""}`} onClick={() => setMood(o)}>{opt[o]}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="esco-sim-output">
            <div className="esco-sim-out-meta">{t("outputMeta")}</div>
            <h3 className="esco-sim-out-t">{out.title}</h3>
            <p className="esco-sim-out-b">{out.body}</p>
            <div className="esco-sim-out-foot">
              <strong>{t("outputFoot")}</strong>{t("outputFootRest")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Journeys() {
  const t = useTranslations("esco.journeysSection");
  const items = t.raw("items") as { label: string; title: string; body: string; tags: string[] }[];
  return (
    <section className="esco-journeys" id="journeys">
      <div className="esco-wrap">
        <div className="esco-journeys-head">
          <div>
            <div className="esco-label">{t("label")}</div>
            <h2 className="esco-h2">{t("titleLine1")} <em>{t("titleLine1Em")}</em></h2>
          </div>
          <p className="esco-lead">{t("lead")}</p>
        </div>
        <div className="esco-journey-list">
          {items.map((j, i) => (
            <Fade key={j.title} delay={i * 100}>
              <article className="esco-journey">
                <div className="esco-journey-num">0{i + 1}</div>
                <div>
                  <div className="esco-journey-meta">{j.label}</div>
                  <h3 className="esco-journey-t">{j.title}</h3>
                  <p className="esco-journey-b">{j.body}</p>
                  <div className="esco-journey-tags">
                    {j.tags.map(tag => <span key={tag} className="esco-journey-tag">{tag}</span>)}
                  </div>
                </div>
              </article>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

function Signal() {
  const t = useTranslations("esco.signal");
  const words = t.raw("words") as string[];
  return (
    <section className="esco-signal" id="signal">
      <div className="esco-wrap">
        <div className="esco-label">{t("label")}</div>
        <h2 className="esco-signal-h">{t("titleLine1")} <em>{t("titleLine1Em")}</em></h2>
        <p className="esco-signal-p">{t("lead")}</p>
        <div className="esco-signal-cloud">
          {words.map(s => <span key={s} className="esco-signal-word">{s}</span>)}
        </div>
        <p className="esco-signal-foot">
          {t("foot")} <em>{t("footEm")}</em>{t("footRest")}
        </p>
      </div>
    </section>
  );
}

function Access() {
  const t = useTranslations("esco.access");
  const items = t.raw("items") as { n: string; title: string; body: string }[];
  return (
    <section className="esco-access" id="access">
      <div className="esco-wrap">
        <div className="esco-access-grid">
          <div className="esco-access-side">
            <div className="esco-label">{t("label")}</div>
            <h2 className="esco-h2">{t("titleLine1")} <em>{t("titleLine1Em")}</em></h2>
            <p className="esco-access-p" style={{ marginTop: "1.5rem" }}>{t("p1")}</p>
            <p className="esco-access-p">{t("p2")}</p>
          </div>
          <div className="esco-access-mech">
            {items.map(item => (
              <div key={item.n} className="esco-access-row">
                <div className="esco-access-n">{item.n}</div>
                <div>
                  <div className="esco-access-t">{item.title}</div>
                  <p className="esco-access-d">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Cities() {
  const t = useTranslations("esco.citiesSection");
  const [totalMembers, setTotalMembers] = useState<number | null>(null);

  useEffect(() => {
    const sb = createSupabaseBrowserClient();
    sb.rpc("get_cities_stats").then(({ data, error }) => {
      if (!error && data && data.length > 0) {
        setTotalMembers(data[0].member_count);
      }
    });
  }, []);

  // Finché non hai un sistema di tracking per città, mostra solo "Live"/"Soon"
  // senza numeri specifici per città (che sarebbero finti)
  const CITIES = [
    { name: "Milano", live: true },
    { name: "London", live: false, eta: "Q4 2026"  },
    { name: "Barcelona", live: false, eta: "Q4 2026"  },
    { name: "Paris", live: false, eta: "Q4 2026"  },
    { name: "Berlin", live: false, eta: "Q4 2026" },
    { name: "Lisbon", live: false, eta: "Q4 2026" },
    { name: "New York", live: false, eta: "Q4 2026" },
    { name: "Tokyo", live: false, eta: "2027" },
  ];

  return (
    <section className="esco-cities" id="cities">
      <div className="esco-wrap">
        <div className="esco-cities-head">
          <div>
            <div className="esco-label">{t("label")}</div>
            <h2 className="esco-h2">{t("titleLine1")} <em>{t("titleLine1Em")}</em></h2>
          </div>
          <p className="esco-lead">{t("lead")}</p>
        </div>
        <div className="esco-cities-grid">
          {CITIES.map(c => (
            <div key={c.name} className="esco-city-cell">
              <span className="esco-city-name">{c.name}</span>
              <span className={`esco-city-status ${c.live ? "live" : "soon"}`}>
                {c.live ? t("live") : t("soon")}
                {!c.live && <span className="esco-city-members">{c.eta}</span>}
              </span>
            </div>
          ))}
        </div>
        {totalMembers !== null && totalMembers > 0 && (
          <p style={{ 
            marginTop: "3rem", 
            textAlign: "center", 
            fontFamily: "var(--f-serif)", 
            fontStyle: "italic", 
            fontSize: "1.1rem", 
            color: "var(--ink-3)" 
          }}>
            {totalMembers.toLocaleString()} {t("membersTotal")}
          </p>
        )}
      </div>
    </section>
  );
}

function FAQ() {
  const t = useTranslations("esco.faq");
  const items = t.raw("items") as { q: string; a: string }[];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="esco-faq" id="faq">
      <div className="esco-wrap">
        <div className="esco-faq-grid">
          <div className="esco-faq-side">
            <div className="esco-label">{t("label")}</div>
            <h2 className="esco-h2">{t("titleLine1")} <em>{t("titleLine1Em")}</em></h2>
          </div>
          <div className="esco-faq-list">
            {items.map((f, i) => (
              <div key={i} className="esco-faq-item">
                <button className="esco-faq-q" onClick={() => setOpen(open === i ? null : i)}>
                  <span>{f.q}</span>
                  <span className={`esco-faq-icon ${open === i ? "o" : ""}`} />
                </button>
                <div className={`esco-faq-a ${open === i ? "o" : ""}`}>
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

function Waitlist() {
  const t = useTranslations("esco.waitlist");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!isValidEmail(trimmed)) {
      setErr(t("errors.invalidEmail"));
      return;
    }
    setLoading(true);
    setErr(null);

    try {
      const sb = createSupabaseBrowserClient();
      const { error } = await sb.from("waitlist").insert({
        email: trimmed,
        source: "esco_landing",
      });
      if (error) {
        if (error.code === "23505") setErr(t("errors.alreadyOnList"));
        else setErr(t("errors.generic"));
        setLoading(false);
        return;
      }
      setDone(true);
      setLoading(false);
    } catch {
      setErr(t("errors.network"));
      setLoading(false);
    }
  };

  const stores = t.raw("stores") as Record<string, string>;

  return (
    <section className="esco-waitlist" id="waitlist">
      <span className="esco-waitlist-bg">join</span>
      <div className="esco-wrap-tight">
        <div className="esco-label">{t("label")}</div>
        <h2 className="esco-waitlist-h">{t("titleLine1")} <em>{t("titleLine1Em")}</em></h2>
        <p className="esco-waitlist-p">{t("subtitle")}</p>

        {done ? (
          <p className="esco-waitlist-success">{t("success")}</p>
        ) : (
          <>
            <form onSubmit={submit} className="esco-waitlist-form">
              <input
                type="email" required
                placeholder={t("placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="esco-waitlist-input"
              />
              <button type="submit" disabled={loading} className="esco-waitlist-btn">
                {loading ? t("submitting") : `${t("submit")} →`}
              </button>
            </form>
            {err && (
              <p style={{ marginTop: "1rem", fontSize: 12, color: "var(--terra)", fontFamily: "var(--f-serif)", fontStyle: "italic" }}>
                {err}
              </p>
            )}
          </>
        )}
        <p className="esco-waitlist-note">{t("note")}</p>

        <div className="esco-waitlist-stores">
          <span className="esco-waitlist-stores-label">{stores.label}</span>
          <a href="#" className="esco-store">
            <div>
              <small>{stores.appStoreSmall}</small>
              <strong>{stores.appStore}</strong>
            </div>
          </a>
          <a href="#" className="esco-store">
            <div>
              <small>{stores.playSmall}</small>
              <strong>{stores.play}</strong>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function EscoPage() {
  return (
    <div className="esco-root">
      <EscoLoader />
      <style>{ESCO_STYLES}</style>
      <div className="esco-grain" />
      <EscoNavbar />
      <main>
        <Hero />
        <Intro />
        <HowItWorks />
        <Simulator />
        <Journeys />
        <Signal />
        <Access />
        <Cities />
        <FAQ />
        <Waitlist />
        <EscoFooter />
      </main>
      <MobileStickyCta />

    </div>
  );
}