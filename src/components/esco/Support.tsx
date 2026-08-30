"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { ESCO_TOKENS } from "@/components/esco/theme";
import { EscoNavbar } from "@/components/esco/Navbar";
import { EscoFooter } from "@/components/esco/Footer";

/* ============================================================
   Pagina di supporto.
   Serve anche per la submission su App Store: Apple chiede un
   Support URL raggiungibile e con un contatto reale, e rifiuta
   se la pagina e' un segnaposto.
   ============================================================ */

const EMAIL = "miutifin.ask@gmail.com";

const S = `
.sp{padding:clamp(7rem,11vw,9.5rem) 0 clamp(4rem,8vw,6rem)}
.sp-wrap{max-width:760px;margin:0 auto;padding:0 var(--e-pad)}
.sp-h1{font-family:var(--e-fd);font-weight:600;color:var(--e-ink);
  font-size:clamp(2.2rem,5.5vw,3.6rem);line-height:1.02;letter-spacing:-.04em;margin:1.2rem 0 1rem}
.sp-lead{font-size:clamp(1.02rem,1.3vw,1.15rem);line-height:1.6;color:var(--e-ink-2);max-width:52ch}

.sp-box{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--e-line);
  border:1px solid var(--e-line);border-radius:18px;overflow:hidden;margin:2.5rem 0}
@media(max-width:640px){.sp-box{grid-template-columns:1fr}}
.sp-cell{background:var(--e-paper-2);padding:1.6rem;display:flex;flex-direction:column;gap:6px}
.sp-cell .l{font-family:var(--e-fm);font-size:10.5px;letter-spacing:.13em;text-transform:uppercase;color:var(--e-mut-2)}
.sp-cell .v{font-size:1.05rem;font-family:var(--e-fd);font-weight:600;letter-spacing:-.02em;color:var(--e-ink)}
.sp-cell .n{font-size:13.5px;color:var(--e-mut);line-height:1.5}
.sp-cell a{color:var(--e-ac-b);text-decoration:none}
.sp-cell a:hover{text-decoration:underline}

.sp-sec{margin-top:3rem}
.sp-sec h2{font-family:var(--e-fd);font-size:clamp(1.3rem,2.4vw,1.7rem);font-weight:600;
  letter-spacing:-.03em;color:var(--e-ink);margin-bottom:1.2rem}
.sp-q{border-bottom:1px solid var(--e-line)}
.sp-q:first-child{border-top:1px solid var(--e-line)}
.sp-q button{width:100%;background:none;border:none;text-align:left;padding:1.15rem 0;
  display:flex;align-items:center;justify-content:space-between;gap:1.5rem;cursor:pointer;
  font-family:var(--e-fd);font-size:1.02rem;font-weight:600;letter-spacing:-.02em;color:var(--e-ink)}
.sp-q button:hover{color:var(--e-ac-b)}
.sp-q i{font-style:normal;color:var(--e-mut-2);font-size:1.3rem;line-height:1;transition:transform .25s}
.sp-q.on i{transform:rotate(45deg);color:var(--e-ac-b)}
.sp-a{overflow:hidden;max-height:0;transition:max-height .3s cubic-bezier(.4,0,.2,1)}
.sp-q.on .sp-a{max-height:340px}
.sp-a p{padding-bottom:1.2rem;font-size:15px;line-height:1.65;color:var(--e-mut);max-width:62ch}
.sp-a a{color:var(--e-ac-b)}

.sp-foot{margin-top:3rem;padding-top:1.5rem;border-top:1px solid var(--e-line);
  font-size:13.5px;color:var(--e-mut-2);line-height:1.6}
.sp-foot a{color:var(--e-ac-b);text-decoration:none}
`;

const T = {
  it: {
    eyebrow: "Supporto",
    h1: "Serve una mano?",
    lead: "Scrivici: rispondiamo entro 24 ore lavorative, e ti risponde una persona del team.",
    cells: [
      { l: "Email", v: EMAIL, n: "Il modo più veloce. Scrivi da qui per qualsiasi cosa.", mail: true },
      { l: "Dove siamo", v: "Milano, Italia", n: "ESCO è un prodotto miutifin." },
      { l: "Tempo di risposta", v: "Entro 24 ore", n: "Nei giorni lavorativi. Il fine settimana andiamo più a rilento." },
      { l: "Segnalare un errore", v: "Scrivici l'indirizzo", n: "Un locale chiuso, un orario sbagliato, un posto che non esiste più: dicci quale ed è sistemato." },
    ],
    faqTitle: "Domande frequenti",
    faq: [
      { q: "Come entro nella beta?",
        a: "Lasci il numero o l'email nella pagina di ESCO. Gli inviti partono a scaglioni: ti scriviamo quando si apre un posto nella tua città." },
      { q: "In quali città funziona?",
        a: "Al momento solo Milano. Altre città arrivano man mano che il catalogo è pronto: preferiamo una città fatta bene a dieci fatte a metà." },
      { q: "Quanto costa?",
        a: "Durante la beta è gratuita." },
      { q: "Ho trovato un errore su un locale",
        a: `Scrivici a ${EMAIL} con il nome del posto e cosa non torna. Correggiamo entro pochi giorni: le segnalazioni sono il modo migliore che abbiamo per tenere il catalogo pulito.` },
      { q: "Come cancello il mio account o i miei dati?",
        a: `Scrivi a ${EMAIL} chiedendo la cancellazione. Procediamo entro 30 giorni e ti confermiamo quando è fatto. Non serve spiegare perché.` },
      { q: "Voglio proporre il mio locale",
        a: "Scrivici. Non si paga per entrare: valutiamo se il posto ha senso per chi usa ESCO, e se sì lo inseriamo." },
      { q: "L'app non funziona / si chiude da sola",
        a: "Dicci che telefono usi e quale versione di sistema, e cosa stavi facendo quando è successo. Con quelle tre informazioni di solito troviamo il problema in poco tempo." },
    ],
    footPre: "Vedi anche la ",
    privacy: "privacy policy",
    and: " e i ",
    terms: "termini e condizioni",
  },
  en: {
    eyebrow: "Support",
    h1: "Need a hand?",
    lead: "Write to us: we reply within 24 working hours, and a person on the team answers.",
    cells: [
      { l: "Email", v: EMAIL, n: "The fastest way. Write here about anything.", mail: true },
      { l: "Where we are", v: "Milan, Italy", n: "ESCO is a miutifin product." },
      { l: "Response time", v: "Within 24 hours", n: "On working days. Weekends are slower." },
      { l: "Report a mistake", v: "Send us the place", n: "A closed venue, a wrong time, a place that no longer exists: tell us which and we fix it." },
    ],
    faqTitle: "Frequently asked",
    faq: [
      { q: "How do I get into the beta?",
        a: "Leave your phone number or email on the ESCO page. Invites go out in waves: we write when a spot opens in your city." },
      { q: "Which cities does it cover?",
        a: "Milan only, for now. Other cities follow as the catalogue is ready: we'd rather have one city done properly than ten done halfway." },
      { q: "What does it cost?",
        a: "It's free during the beta." },
      { q: "I found a mistake about a venue",
        a: `Write to ${EMAIL} with the name of the place and what's wrong. We fix it within a few days: reports are the best way we have to keep the catalogue clean.` },
      { q: "How do I delete my account or my data?",
        a: `Write to ${EMAIL} asking for deletion. We do it within 30 days and confirm when it's done. No explanation needed.` },
      { q: "I'd like to suggest my venue",
        a: "Write to us. There's no fee to be listed: we assess whether the place makes sense for who uses ESCO, and if so we add it." },
      { q: "The app crashes or won't work",
        a: "Tell us which phone and OS version you're on, and what you were doing when it happened. With those three things we usually find the problem quickly." },
    ],
    footPre: "See also the ",
    privacy: "privacy policy",
    and: " and the ",
    terms: "terms and conditions",
  },
} as const;

export default function EscoSupport() {
  const locale = useLocale();
  const t = T[locale === "en" ? "en" : "it"];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="esco-root">
      <style>{ESCO_TOKENS}</style>
      <style>{S}</style>
      <div className="e-grain" />
      <EscoNavbar />

      <main className="sp">
        <div className="sp-wrap">
          <span className="e-lab">{t.eyebrow}</span>
          <h1 className="sp-h1">{t.h1}</h1>
          <p className="sp-lead">{t.lead}</p>

          <div className="sp-box">
            {t.cells.map((c) => (
              <div className="sp-cell" key={c.l}>
                <span className="l">{c.l}</span>
                <span className="v">
                  {"mail" in c && c.mail ? <a href={`mailto:${c.v}`}>{c.v}</a> : c.v}
                </span>
                <span className="n">{c.n}</span>
              </div>
            ))}
          </div>

          <section className="sp-sec">
            <h2>{t.faqTitle}</h2>
            {t.faq.map((f, i) => (
              <div className={`sp-q${open === i ? " on" : ""}`} key={f.q}>
                <button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                  <span>{f.q}</span>
                  <i aria-hidden>+</i>
                </button>
                <div className="sp-a"><p>{f.a}</p></div>
              </div>
            ))}
          </section>

          <p className="sp-foot">
            {t.footPre}
            <a href={`/${locale}/privacy`}>{t.privacy}</a>
            {t.and}
            <a href={`/${locale}/terms`}>{t.terms}</a>.
          </p>
        </div>
      </main>

      <EscoFooter />
    </div>
  );
}