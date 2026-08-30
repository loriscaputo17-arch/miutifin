/* ============================================================
   INFORMATIVA COOKIE — IT / EN
   Usa lo stesso motore di privacy e termini.
   Coerente con la §11 della privacy: solo cookie tecnici,
   nessun banner richiesto.
   ============================================================ */

import { LEGAL_EMAIL as E, type LegalDoc } from "@/components/legal/legal-types";

export const COOKIES: Record<"it" | "en", LegalDoc> = {
  it: {
    eyebrow: "Legale · Cookie",
    title: "Informativa sui cookie",
    updated: "28 agosto 2026",
    version: "2.0",
    scope: "miutifin.com e ESCO",
    updatedLabel: "Ultimo aggiornamento",
    versionLabel: "Versione",
    scopeLabel: "Si applica a",
    tocLabel: "Indice",
    back: "Indietro",
    langNote: "This cookie policy is also available in English.",
    sections: [
      {
        id: "sintesi",
        title: "1. In breve",
        blocks: [
          { p: "**Non ti tracciamo.** Usiamo solo i cookie necessari a far funzionare il sito, e per quelli la legge non richiede il tuo consenso — per questo non trovi un banner che ti chiede di accettare qualcosa." },
          {
            ul: [
              "Nessun cookie pubblicitario, di retargeting o di tracciamento fra siti diversi.",
              "Nessun profilo costruito su cosa guardi.",
              "Nessun dato ceduto a inserzionisti o reti pubblicitarie.",
            ],
          },
          { note: "Il resto della pagina spiega quali sono e perché ci sono." },
        ],
      },
      {
        id: "cosa-sono",
        title: "2. Cosa sono i cookie",
        blocks: [
          { p: "Un cookie è un piccolo file che un sito salva sul tuo dispositivo. Serve a ricordare qualcosa fra una pagina e l'altra: che hai fatto l'accesso, in che lingua stai navigando, che il modulo che stai inviando è davvero tuo." },
          { p: "Alcuni si cancellano quando chiudi il browser (**di sessione**), altri restano per un periodo definito (**persistenti**). Quelli che usiamo noi sono elencati qui sotto." },
        ],
      },
      {
        id: "quali",
        title: "3. Quali cookie usiamo",
        blocks: [
          {
            table: {
              head: ["Cookie", "A cosa serve"],
              rows: [
                ["**Sessione di accesso** — Supabase", "Ti tiene collegato al tuo account fra una pagina e l'altra. Senza, dovresti rifare l'accesso a ogni schermata. Dura quanto la sessione, si rinnova mentre usi il servizio."],
                ["**Lingua** — next-intl", "Ricorda se navighi in italiano o in inglese, così non devi riselezionarlo. Persistente, un anno."],
                ["**Protezione dei moduli**", "Un token che verifica che il modulo inviato provenga davvero dal nostro sito e non da un altro. Di sessione."],
              ],
            },
          },
          { p: "Sono tutti **cookie tecnici**: senza di loro il servizio non funziona o funziona peggio. Per questa categoria l'articolo 122 del Codice Privacy non richiede il consenso preventivo." },
          { note: "Se un giorno aggiungeremo strumenti di analisi o pixel pubblicitari, questa pagina verrà riscritta e comparirà un banner per il consenso. Fino ad allora, il banner non c'è perché non serve." },
        ],
      },
      {
        id: "terze-parti",
        title: "4. Cookie di terze parti",
        blocks: [
          { p: "Alcuni fornitori che ci danno l'infrastruttura possono impostare cookie tecnici propri quando carichi le pagine:" },
          {
            ul: [
              "**Supabase** — autenticazione e sessione",
              "**Vercel** — consegna delle pagine e sicurezza della rete",
            ],
          },
          { p: "Non sono cookie di profilazione e non alimentano nessuna rete pubblicitaria. L'elenco completo dei fornitori e di cosa trattano è nella [informativa sulla privacy](/privacy)." },
        ],
      },
      {
        id: "gestire",
        title: "5. Come gestirli o cancellarli",
        blocks: [
          { p: "Puoi bloccare o cancellare i cookie dalle impostazioni del tuo browser, in qualsiasi momento e senza chiedercelo." },
          {
            ul: [
              "**Chrome** — Impostazioni → Privacy e sicurezza → Cookie e altri dati dei siti",
              "**Safari** — Impostazioni → Privacy → Gestisci dati dei siti web",
              "**Firefox** — Impostazioni → Privacy e sicurezza → Cookie e dati dei siti web",
              "**Edge** — Impostazioni → Cookie e autorizzazioni sito",
            ],
          },
          { note: "Bloccandoli tutti, l'accesso al tuo account smette di funzionare e la lingua torna a quella predefinita a ogni visita. Non è un modo per convincerti a tenerli: è quello che succede, e ti conviene saperlo prima." },
        ],
      },
      {
        id: "modifiche",
        title: "6. Modifiche",
        blocks: [
          { p: "Se cambiamo i cookie che usiamo, aggiorniamo questa pagina e la data in cima. Un'aggiunta che richiedesse il consenso — analisi, pubblicità — verrebbe comunicata prima di attivarla." },
        ],
      },
      {
        id: "contatti",
        title: "7. Contatti",
        blocks: [
          { p: `Per qualsiasi domanda sui cookie o sui tuoi dati: **${E}**` },
          { p: "Trovi tutto il resto nella [informativa sulla privacy](/privacy) e nei [termini e condizioni](/terms)." },
        ],
      },
    ],
  },

  en: {
    eyebrow: "Legal · Cookies",
    title: "Cookie Policy",
    updated: "28 August 2026",
    version: "2.0",
    scope: "miutifin.com and ESCO",
    updatedLabel: "Last updated",
    versionLabel: "Version",
    scopeLabel: "Applies to",
    tocLabel: "Contents",
    back: "Back",
    langNote: "Questa informativa sui cookie è disponibile anche in italiano.",
    sections: [
      {
        id: "sintesi",
        title: "1. In short",
        blocks: [
          { p: "**We don't track you.** We only use the cookies needed to run the site, and those don't require your consent by law — which is why there's no banner asking you to accept anything." },
          {
            ul: [
              "No advertising, retargeting or cross-site tracking cookies.",
              "No profile built from what you look at.",
              "No data passed to advertisers or ad networks.",
            ],
          },
          { note: "The rest of this page explains which ones there are and why." },
        ],
      },
      {
        id: "cosa-sono",
        title: "2. What cookies are",
        blocks: [
          { p: "A cookie is a small file a site stores on your device. It remembers something between one page and the next: that you're signed in, which language you're browsing in, that the form you're submitting is really yours." },
          { p: "Some are deleted when you close the browser (**session**), others last for a set period (**persistent**). The ones we use are listed below." },
        ],
      },
      {
        id: "quali",
        title: "3. Which cookies we use",
        blocks: [
          {
            table: {
              head: ["Cookie", "What it does"],
              rows: [
                ["**Login session** — Supabase", "Keeps you signed in between pages. Without it you'd log in again on every screen. Lasts for the session, refreshed while you use the service."],
                ["**Language** — next-intl", "Remembers whether you browse in Italian or English so you don't have to pick again. Persistent, one year."],
                ["**Form protection**", "A token verifying that a submitted form really came from our site and not another one. Session."],
              ],
            },
          },
          { p: "These are all **technical cookies**: without them the service doesn't work, or works worse. This category doesn't require prior consent under Italian law (art. 122 of the Privacy Code) or the ePrivacy Directive." },
          { note: "If we ever add analytics tools or advertising pixels, this page will be rewritten and a consent banner will appear. Until then there's no banner because none is needed." },
        ],
      },
      {
        id: "terze-parti",
        title: "4. Third-party cookies",
        blocks: [
          { p: "Some infrastructure providers may set their own technical cookies when pages load:" },
          {
            ul: [
              "**Supabase** — authentication and session",
              "**Vercel** — page delivery and network security",
            ],
          },
          { p: "These are not profiling cookies and they don't feed any ad network. The full list of providers and what they process is in our [privacy policy](/privacy)." },
        ],
      },
      {
        id: "gestire",
        title: "5. How to manage or delete them",
        blocks: [
          { p: "You can block or delete cookies from your browser settings, at any time and without asking us." },
          {
            ul: [
              "**Chrome** — Settings → Privacy and security → Cookies and other site data",
              "**Safari** — Settings → Privacy → Manage website data",
              "**Firefox** — Settings → Privacy & security → Cookies and site data",
              "**Edge** — Settings → Cookies and site permissions",
            ],
          },
          { note: "If you block them all, signing in stops working and the language resets on every visit. That's not a way to talk you into keeping them: it's simply what happens, and it's better to know beforehand." },
        ],
      },
      {
        id: "modifiche",
        title: "6. Changes",
        blocks: [
          { p: "If we change the cookies we use, we update this page and the date at the top. Anything that would require consent — analytics, advertising — would be announced before being switched on." },
        ],
      },
      {
        id: "contatti",
        title: "7. Contact",
        blocks: [
          { p: `For any question about cookies or your data: **${E}**` },
          { p: "Everything else is in the [privacy policy](/privacy) and the [terms and conditions](/terms)." },
        ],
      },
    ],
  },
};