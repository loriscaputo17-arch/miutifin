/* ============================================================
   TERMINI E CONDIZIONI — IT / EN
   Stessi contenuti della versione precedente, tradotti e
   impaginati con il sistema condiviso.
   Segnaposto [TRA PARENTESI] da compilare.
   ============================================================ */

import { LEGAL_EMAIL as E, type LegalDoc } from "@/components/legal/legal-types";

export const TERMS: Record<"it" | "en", LegalDoc> = {
  it: {
    eyebrow: "Legale · Termini",
    title: "Termini e condizioni",
    updated: "28 agosto 2026",
    version: "3.0",
    scope: "miutifin.com e ESCO",
    updatedLabel: "Ultimo aggiornamento",
    versionLabel: "Versione",
    scopeLabel: "Si applicano a",
    tocLabel: "Indice",
    back: "Indietro",
    langNote: "These Terms are also available in English — switch the language in the navigation bar.",
    sections: [
      {
        id: "sintesi",
        title: "1. In breve",
        blocks: [
          { p: "Prima della versione legale, quello che conta davvero." },
          {
            ul: [
              "**Miutifin** è una software house che costruisce prodotti digitali. **ESCO** è la nostra rete privata per le esperienze in città: si entra su invito.",
              "Usando l'una o l'altra ti impegni a farlo nel rispetto della legge e delle altre persone.",
              "Se entri in ESCO ricevi **tre inviti** tuoi. Non venderli e non usarli in malafede.",
              "I suggerimenti di ESCO sono proposte curate dall'AI, non garanzie. I locali sono attività indipendenti: non li gestiamo noi.",
              "Possiamo sospendere o chiudere gli account che violano le regole.",
              "Non rispondiamo di quello che è fuori dal nostro controllo: un locale chiuso, una serata storta, il tempo.",
            ],
          },
          { note: "Il resto è la versione formale." },
        ],
      },
      {
        id: "ambito",
        title: "2. Ambito di applicazione",
        blocks: [
          { p: "Questi Termini regolano l'accesso e l'uso di **miutifin.com** e di ogni servizio che gestiamo al suo interno, incluso **ESCO** (miutifin.com/esco e le applicazioni mobili collegate)." },
          { p: "Accedendo alla piattaforma, registrandoti o semplicemente navigandola, accetti di essere vincolato da questi Termini. Se non li accetti, non puoi usare la piattaforma." },
          { p: "Si leggono insieme alla nostra [informativa sulla privacy](/privacy)." },
        ],
      },
      {
        id: "definizioni",
        title: "3. Definizioni",
        blocks: [
          {
            ul: [
              "**Miutifin**, «noi» — il soggetto che gestisce la piattaforma.",
              "**ESCO** — la rete privata su invito per le esperienze in città, gestita da Miutifin.",
              "**Piattaforma** — sito, app mobile e servizi collegati, sia di Miutifin sia di ESCO.",
              "**Utente** — chiunque acceda alla piattaforma.",
              "**Membro** — un utente approvato per ESCO con un account attivo.",
              "**Invito** — un codice monouso che dà accesso a ESCO.",
              "**Percorso** — una sequenza personalizzata di luoghi e orari composta dall'AI dentro ESCO.",
              "**Contenuto** — tutto ciò che è pubblicato sulla piattaforma: schede dei luoghi, percorsi, descrizioni, contributi degli utenti.",
              "**Locale** — un luogo di terzi (bar, ristorante, club, galleria) presente in ESCO. I locali sono attività indipendenti, non gestite da Miutifin.",
            ],
          },
        ],
      },
      {
        id: "consulenza",
        title: "4. Servizi di consulenza (Miutifin)",
        blocks: [
          { p: "Miutifin fornisce servizi di sviluppo software su misura — integrazioni di intelligenza artificiale, applicazioni web e mobile, robotica, strategia digitale — in qualità di fornitore indipendente." },
          { p: "Le condizioni di ogni progetto (perimetro, consegne, prezzi, tempi, cessione della proprietà intellettuale) sono regolate da un **contratto scritto separato** firmato con il singolo cliente. Per il lavoro su progetto quel contratto prevale su questi Termini generali." },
          { p: "L'invio del modulo contatti **non crea alcun rapporto contrattuale**: il contratto nasce solo quando concordiamo il perimetro per iscritto." },
        ],
      },
      {
        id: "accesso",
        title: "5. Accesso a ESCO",
        blocks: [
          { p: "ESCO è una **rete privata su invito**. Si entra in due modi:" },
          {
            ul: [
              "Candidatura dalla lista d'attesa pubblica, con approvazione a nostra discrezione (di norma a gruppi settimanali).",
              "Invito da un membro esistente che ha ancora inviti disponibili.",
            ],
          },
          { p: "Ci riserviamo il diritto, a nostra discrezione e senza preavviso, di:" },
          {
            ul: [
              "Approvare, rifiutare o rinviare qualsiasi candidatura",
              "Limitare l'accesso per città, area geografica o numero massimo di membri",
              "Revocare inviti o sospendere account che violano questi Termini",
              "Chiudere del tutto l'accesso, per qualsiasi motivo",
            ],
          },
          { note: "ESCO non è un servizio garantito: l'iscrizione è una possibilità che concediamo, non un diritto acquisito." },
        ],
      },
      {
        id: "account",
        title: "6. Account e inviti",
        blocks: [
          { h3: "6.1 Responsabilità sull'account" },
          {
            ul: [
              "Tenere riservate le tue credenziali",
              "Rispondere di tutto ciò che avviene con il tuo account",
              "Avvisarci subito in caso di accesso non autorizzato",
              "Fornire dati corretti e aggiornati in fase di registrazione",
            ],
          },
          { h3: "6.2 Inviti" },
          { p: "Ogni membro attivo riceve **tre inviti**. Gli inviti:" },
          {
            ul: [
              "Sono personali, monouso e legati al tuo account",
              "Non possono essere venduti, scambiati, messi all'asta o commercializzati in alcun modo",
              "Possono essere revocati se usati in malafede o per aggirare le nostre regole di accesso",
            ],
          },
          { note: "Vendere o tentare di vendere un invito comporta la chiusura immediata dell'account." },
          { h3: "6.3 Età minima" },
          { p: "Per usare la piattaforma devi avere almeno **16 anni**. Alcune funzioni, come i locali legati alla vita notturna, possono richiedere la maggiore età prevista nel tuo Paese." },
        ],
      },
      {
        id: "condotta",
        title: "7. Comportamento degli utenti",
        blocks: [
          { p: "Usando la piattaforma ti impegni a **non**:" },
          {
            ul: [
              "Usarla per scopi illeciti, dannosi o fraudolenti",
              "Tentare di accedere a sistemi, dati o account che non ti appartengono",
              "Usare script automatici, bot o scraper senza il nostro permesso scritto",
              "Inserire informazioni false, ingannevoli o spacciarti per un'altra persona",
              "Molestare, minacciare o danneggiare altri membri o terzi",
              "Interferire con il funzionamento della piattaforma o sovraccaricare la nostra infrastruttura",
              "Decompilare o tentare di ricavare il codice sorgente",
              "Inviare comunicazioni promozionali non richieste",
              "Aggirare i controlli di accesso, il sistema degli inviti o le limitazioni geografiche",
            ],
          },
        ],
      },
      {
        id: "contenuti",
        title: "8. Contenuti e locali",
        blocks: [
          { h3: "8.1 Contenuti curati" },
          { p: "ESCO seleziona e mostra informazioni su luoghi, locali, eventi ed esperienze. Sono contenuti **a scopo informativo e di scoperta**. Non possediamo, non gestiamo e non controlliamo alcun locale di terzi." },
          { h3: "8.2 Nessuna garanzia sui terzi" },
          { p: "Disponibilità, prezzi, orari, atmosfera, dresscode e qualità di un locale possono cambiare senza preavviso. Facciamo il possibile per tenere aggiornate le schede, ma non possiamo garantirne l'esattezza." },
          { h3: "8.3 Prenotazioni e pagamenti" },
          { p: "Prenotazioni, pagamenti e transazioni con un locale sono regolati dalle condizioni di quel locale. Non siamo parte di quei rapporti e non rispondiamo di rimborsi, cancellazioni o contestazioni." },
          { h3: "8.4 Contenuti che carichi tu" },
          { p: "Se proponi luoghi, valutazioni, foto o altri contenuti, concedi a Miutifin una licenza non esclusiva, valida in tutto il mondo e a titolo gratuito, per usarli, mostrarli e adattarli all'interno della piattaforma." },
        ],
      },
      {
        id: "ai",
        title: "9. Contenuti generati dall'intelligenza artificiale",
        blocks: [
          { p: "ESCO usa l'intelligenza artificiale per comporre percorsi, descrizioni e suggerimenti personalizzati. Quei contenuti:" },
          {
            ul: [
              "Sono una **proposta**, non una garanzia né una raccomandazione professionale",
              "Possono contenere imprecisioni, omissioni o informazioni non aggiornate",
              "Vanno verificati prima di agire (per esempio confermando orari e disponibilità)",
              "Non costituiscono consulenza finanziaria, medica, legale o in materia di sicurezza",
            ],
          },
          { note: "Le decisioni restano tue. ESCO propone un percorso: sei tu a scegliere se seguirlo." },
        ],
      },
      {
        id: "proprieta",
        title: "10. Proprietà intellettuale",
        blocks: [
          { p: "Tutti i diritti di proprietà intellettuale sulla piattaforma — marchio, design, software, loghi, illustrazioni, contenuti originali e algoritmi di composizione dei percorsi — appartengono a Miutifin o ai suoi licenzianti." },
          { p: "Salvo quanto consentito dalla legge (per esempio l'uso personale), non puoi:" },
          {
            ul: [
              "Copiare, riprodurre o ridistribuire i contenuti della piattaforma",
              "Creare opere derivate dai nostri contenuti o dalle nostre interfacce",
              "Usare marchi, loghi o segni distintivi senza permesso scritto",
              "Duplicare il sito, incorporarlo in frame o estrarne dati in modo sistematico",
            ],
          },
          { note: "Nomi, loghi e marchi dei locali appartengono ai rispettivi titolari e sono citati a soli fini identificativi." },
        ],
      },
      {
        id: "terzi",
        title: "11. Servizi di terze parti",
        blocks: [
          { p: "La piattaforma si appoggia a fornitori terzi (Supabase, Vercel, Anthropic, OpenAI, Google Places). L'uso di quei servizi è regolato anche dalle loro condizioni." },
          { p: "Non rispondiamo delle politiche, delle pratiche o dei contenuti di terze parti. L'elenco completo è nella [informativa sulla privacy](/privacy)." },
        ],
      },
      {
        id: "disponibilita",
        title: "12. Disponibilità del servizio",
        blocks: [
          { p: "La piattaforma è fornita **«così com'è» e «secondo disponibilità»**. Non garantiamo:" },
          {
            ul: [
              "Un accesso ininterrotto, privo di errori o sempre sicuro",
              "Che le funzioni restino disponibili, immutate o supportate a tempo indeterminato",
              "Che i problemi vengano risolti entro un tempo preciso",
            ],
          },
          { p: "Possiamo fare manutenzione, aggiornare funzioni o sospendere temporaneamente l'accesso quando necessario." },
        ],
      },
      {
        id: "responsabilita",
        title: "13. Limitazione di responsabilità",
        blocks: [
          { p: "Nei limiti massimi consentiti dalla legge:" },
          {
            ul: [
              "Miutifin non risponde di danni indiretti, incidentali, consequenziali o punitivi derivanti dall'uso della piattaforma.",
              "La responsabilità complessiva per danni diretti non supera **quanto ci hai pagato nei dodici mesi precedenti**, o cento euro se non hai effettuato pagamenti.",
              "Non rispondiamo delle azioni, dei contenuti o dei servizi di terzi, inclusi locali, sistemi di pagamento e fornitori di intelligenza artificiale.",
              "Non rispondiamo di eventi fuori dal nostro ragionevole controllo (forza maggiore, guasti dell'infrastruttura, provvedimenti dell'autorità).",
            ],
          },
          { note: "Nessuna clausola di questi Termini limita le responsabilità che la legge non consente di limitare, in particolare verso i consumatori." },
        ],
      },
      {
        id: "cessazione",
        title: "14. Cessazione",
        blocks: [
          { h3: "14.1 Da parte nostra" },
          { p: "Possiamo sospendere, limitare o chiudere il tuo accesso in qualsiasi momento, con o senza preavviso, se:" },
          {
            ul: [
              "Violi questi Termini",
              "Usi impropriamente gli inviti o il sistema di accesso",
              "Tieni comportamenti fraudolenti o abusivi",
              "Interrompiamo del tutto il servizio",
            ],
          },
          { h3: "14.2 Da parte tua" },
          { p: "Puoi chiudere il tuo account quando vuoi scrivendoci. Dopo la chiusura i tuoi dati vengono cancellati secondo quanto previsto dalla [informativa sulla privacy](/privacy)." },
        ],
      },
      {
        id: "modifiche",
        title: "15. Modifiche ai Termini",
        blocks: [
          { p: "Possiamo aggiornare questi Termini. Le modifiche sostanziali vengono comunicate ai membri attivi via email almeno **14 giorni prima** che entrino in vigore." },
          { p: "Continuare a usare la piattaforma dopo la pubblicazione delle modifiche significa accettarle. Se non le accetti, puoi smettere di usare la piattaforma." },
        ],
      },
      {
        id: "legge",
        title: "16. Legge applicabile e controversie",
        blocks: [
          { p: "Questi Termini sono regolati dalla **legge italiana**, senza applicazione delle norme sul conflitto di leggi." },
          { p: "Ogni controversia sarà risolta:" },
          {
            ul: [
              "prima con un tentativo di accordo in buona fede tra le parti",
              "se non si trova un accordo, dal **Foro di Milano**",
            ],
          },
          { note: "Se sei un consumatore residente nell'Unione Europea restano applicabili le norme imperative a tutela dei consumatori del tuo Paese, compreso il foro del tuo luogo di residenza. Puoi anche presentare un reclamo tramite la piattaforma europea di risoluzione delle controversie online: [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)." },
        ],
      },
      {
        id: "contatti",
        title: "17. Contatti",
        blocks: [
          { p: `Per qualsiasi domanda su questi Termini: **${E}**` },
          { note: "Cerchiamo di rispondere entro 24 ore nei giorni lavorativi." },
        ],
      },
    ],
  },

  en: {
    eyebrow: "Legal · Terms",
    title: "Terms & Conditions",
    updated: "28 August 2026",
    version: "3.0",
    scope: "miutifin.com and ESCO",
    updatedLabel: "Last updated",
    versionLabel: "Version",
    scopeLabel: "Applies to",
    tocLabel: "Contents",
    back: "Back",
    langNote: "Questi Termini sono disponibili anche in italiano — cambia lingua dalla barra di navigazione.",
    sections: [
      {
        id: "sintesi",
        title: "1. In short",
        blocks: [
          { p: "Before the legal version, here's what matters." },
          {
            ul: [
              "**Miutifin** is a software house that builds digital products. **ESCO** is our private network for city experiences — invitation only.",
              "By using either, you agree to do so lawfully and respectfully.",
              "If you're invited to ESCO, you get **three invites** of your own. Don't sell them or use them in bad faith.",
              "ESCO's suggestions are AI-curated proposals, not guarantees. Venues are independent businesses: we don't run them.",
              "We can suspend or close accounts that break the rules.",
              "We're not liable for what's outside our control: a closed venue, a bad night, the weather.",
            ],
          },
          { note: "The rest is the formal version." },
        ],
      },
      {
        id: "ambito",
        title: "2. Scope",
        blocks: [
          { p: "These Terms govern your access to and use of **miutifin.com** and any service we operate under it, including **ESCO** (miutifin.com/esco and related mobile apps)." },
          { p: "By accessing, browsing, registering or otherwise using the Platform, you agree to be bound by these Terms. If you don't agree, you must not use the Platform." },
          { p: "They work together with our [privacy policy](/privacy)." },
        ],
      },
      {
        id: "definizioni",
        title: "3. Definitions",
        blocks: [
          {
            ul: [
              "**Miutifin**, «we», «us» — the entity operating the Platform.",
              "**ESCO** — the private, invitation-only network for city experiences operated by Miutifin.",
              "**Platform** — the website, mobile app and related services, both Miutifin and ESCO.",
              "**User** — anyone who accesses the Platform.",
              "**Member** — a User approved for ESCO holding an active account.",
              "**Invite** — a single-use code granting access to ESCO.",
              "**Journey** — a personalised AI-composed sequence of places and timing within ESCO.",
              "**Content** — anything published on the Platform: venue listings, journeys, descriptions, user contributions.",
              "**Venue** — a third-party place (bar, restaurant, club, gallery) referenced in ESCO. Venues are independent businesses, not operated by Miutifin.",
            ],
          },
        ],
      },
      {
        id: "consulenza",
        title: "4. Agency services (Miutifin)",
        blocks: [
          { p: "Miutifin provides custom software development services — AI integrations, web and mobile applications, robotics, digital strategy — as an independent contractor." },
          { p: "Project-specific terms (scope, deliverables, pricing, timelines, IP assignment) are governed by a **separate written agreement** signed with each client. Those agreements take precedence over these general Terms for project work." },
          { p: "Submitting the contact form **does not create a contractual relationship**: a contract begins only once we agree scope in writing." },
        ],
      },
      {
        id: "accesso",
        title: "5. ESCO access",
        blocks: [
          { p: "ESCO is a **private, invitation-only network**. Access is granted in one of two ways:" },
          {
            ul: [
              "Application through the public waiting list, approved at our sole discretion (typically in weekly batches).",
              "Invitation from an existing Member who has invites left.",
            ],
          },
          { p: "We reserve the right, at our sole discretion and without prior notice, to:" },
          {
            ul: [
              "Approve, deny or postpone any application",
              "Limit access by city, region or membership cap",
              "Revoke invitations or suspend accounts that violate these Terms",
              "Close access entirely, for any reason",
            ],
          },
          { note: "ESCO is not a guaranteed service: membership is a privilege we extend, not an acquired right." },
        ],
      },
      {
        id: "account",
        title: "6. Accounts and invitations",
        blocks: [
          { h3: "6.1 Account responsibility" },
          {
            ul: [
              "Keeping your credentials confidential",
              "All activity occurring under your account",
              "Notifying us immediately of unauthorised access",
              "Providing accurate, up-to-date information at registration",
            ],
          },
          { h3: "6.2 Invitations" },
          { p: "Each active Member receives **three invitations**. Invitations:" },
          {
            ul: [
              "Are personal, single-use and tied to your account",
              "May not be sold, traded, listed or commercialised in any way",
              "May be revoked if used in bad faith or to bypass our access rules",
            ],
          },
          { note: "Selling or attempting to sell an invitation results in immediate account termination." },
          { h3: "6.3 Age requirement" },
          { p: "You must be at least **16 years old** to use the Platform. Some features, such as nightlife venues, may require you to be of legal age in your country." },
        ],
      },
      {
        id: "condotta",
        title: "7. User conduct",
        blocks: [
          { p: "By using the Platform you agree **not** to:" },
          {
            ul: [
              "Use it for unlawful, harmful or fraudulent purposes",
              "Attempt to access systems, data or accounts that aren't yours",
              "Use automated scripts, bots or scrapers without our written permission",
              "Submit false or misleading information, or impersonate someone",
              "Harass, threaten or harm other Members or third parties",
              "Interfere with the Platform's operation or overload our infrastructure",
              "Reverse engineer, decompile or attempt to derive source code",
              "Send unsolicited promotional content",
              "Circumvent access controls, the invitation system or geographic restrictions",
            ],
          },
        ],
      },
      {
        id: "contenuti",
        title: "8. Content and venues",
        blocks: [
          { h3: "8.1 Curated content" },
          { p: "ESCO curates and surfaces information about places, venues, events and experiences, **for information and discovery purposes**. We don't own, operate or control any third-party venue." },
          { h3: "8.2 No guarantees on third parties" },
          { p: "Availability, pricing, opening hours, atmosphere, dress codes and quality of any venue may change without notice. We make reasonable efforts to keep listings accurate but provide no guarantees." },
          { h3: "8.3 Bookings and payments" },
          { p: "Any booking, payment or transaction with a venue is governed by that venue's own terms. We are not a party to those transactions and are not responsible for refunds, cancellations or disputes." },
          { h3: "8.4 Content you submit" },
          { p: "If you submit venue suggestions, ratings, photos or other content, you grant Miutifin a non-exclusive, worldwide, royalty-free licence to use, display and adapt it within the Platform." },
        ],
      },
      {
        id: "ai",
        title: "9. AI-generated content",
        blocks: [
          { p: "ESCO uses artificial intelligence to compose personalised journeys, descriptions and recommendations. That content:" },
          {
            ul: [
              "Is a **suggestion**, not a guarantee or a professional recommendation",
              "May contain inaccuracies, omissions or outdated information",
              "Should be verified before acting on it (confirming hours and availability, for instance)",
              "Is not financial, medical, legal or safety advice",
            ],
          },
          { note: "The decisions remain yours. ESCO suggests a path: you choose whether to follow it." },
        ],
      },
      {
        id: "proprieta",
        title: "10. Intellectual property",
        blocks: [
          { p: "All intellectual property rights in the Platform — brand, design, software, logos, illustrations, original content and journey composition algorithms — belong to Miutifin or its licensors." },
          { p: "Except as permitted by law (private personal use, for example), you may not:" },
          {
            ul: [
              "Copy, reproduce or redistribute Platform content",
              "Create derivative works from our content or interfaces",
              "Use our trademarks, logos or brand without written permission",
              "Mirror, frame or systematically extract data from the Platform",
            ],
          },
          { note: "Venue names, logos and trademarks belong to their respective owners and are referenced for identification purposes only." },
        ],
      },
      {
        id: "terzi",
        title: "11. Third-party services",
        blocks: [
          { p: "The Platform integrates third-party providers (Supabase, Vercel, Anthropic, OpenAI, Google Places). Your use of those services is also governed by their own terms." },
          { p: "We are not responsible for the policies, practices or content of third parties. The full list is in our [privacy policy](/privacy)." },
        ],
      },
      {
        id: "disponibilita",
        title: "12. Service availability",
        blocks: [
          { p: "The Platform is provided **«as is» and «as available»**. We do not guarantee:" },
          {
            ul: [
              "Uninterrupted, error-free or always secure access",
              "That features remain available, unchanged or supported indefinitely",
              "That issues will be fixed within any specific timeframe",
            ],
          },
          { p: "We may carry out maintenance, update features or temporarily suspend access when necessary." },
        ],
      },
      {
        id: "responsabilita",
        title: "13. Limitation of liability",
        blocks: [
          { p: "To the maximum extent permitted by law:" },
          {
            ul: [
              "Miutifin is not liable for indirect, incidental, consequential or punitive damages arising from your use of the Platform.",
              "Total liability for direct damages shall not exceed **what you paid us in the preceding twelve months**, or one hundred euros if no payment was made.",
              "We are not liable for the acts, content or services of third parties, including venues, payment processors and AI providers.",
              "We are not liable for events outside our reasonable control (force majeure, infrastructure outages, acts of authorities).",
            ],
          },
          { note: "Nothing in these Terms limits liability that the law does not allow to be limited, particularly towards consumers." },
        ],
      },
      {
        id: "cessazione",
        title: "14. Termination",
        blocks: [
          { h3: "14.1 By us" },
          { p: "We may suspend, restrict or terminate your access at any time, with or without notice, if:" },
          {
            ul: [
              "You violate these Terms",
              "You misuse invitations or the access system",
              "You engage in fraudulent or abusive behaviour",
              "We discontinue the service entirely",
            ],
          },
          { h3: "14.2 By you" },
          { p: "You can close your account at any time by contacting us. After closure your data is deleted as set out in our [privacy policy](/privacy)." },
        ],
      },
      {
        id: "modifiche",
        title: "15. Changes to these Terms",
        blocks: [
          { p: "We may update these Terms. Material changes are communicated to active Members by email at least **14 days before** they take effect." },
          { p: "Continuing to use the Platform after changes are published means accepting them. If you don't accept them, you can stop using the Platform." },
        ],
      },
      {
        id: "legge",
        title: "16. Governing law and disputes",
        blocks: [
          { p: "These Terms are governed by **Italian law**, without regard to conflict-of-law rules." },
          { p: "Any dispute will be resolved:" },
          {
            ul: [
              "first by good-faith negotiation between the parties",
              "if unresolved, by the **courts of Milan**",
            ],
          },
          { note: "If you are a consumer resident in the European Union, the mandatory consumer protection rules of your country still apply, including the courts of your place of residence. You may also file a complaint through the EU online dispute resolution platform: [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)." },
        ],
      },
      {
        id: "contatti",
        title: "17. Contact",
        blocks: [
          { p: `For any question about these Terms: **${E}**` },
          { note: "We aim to reply within 24 hours on business days." },
        ],
      },
    ],
  },
};