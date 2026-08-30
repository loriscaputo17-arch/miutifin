/* ============================================================
   INFORMATIVA PRIVACY — IT / EN
   Copre: modulo contatti miutifin, lista d'attesa ESCO,
   newsletter, account membri (profilo, preferenze, attivita'),
   dati tecnici. Fornitori: Supabase, Vercel, Anthropic/OpenAI,
   Google Places.
   Segnaposto [TRA PARENTESI]: vedi PRIVACY-DA-COMPILARE.md
   ============================================================ */

import { LEGAL_EMAIL as E, type LegalDoc } from "@/components/legal/legal-types";

export const PRIVACY: Record<"it" | "en", LegalDoc> = {
  it: {
    eyebrow: "Legale · Privacy",
    title: "Informativa sulla privacy",
    updated: "28 agosto 2026",
    version: "3.0",
    scope: "miutifin.com e ESCO",
    updatedLabel: "Ultimo aggiornamento",
    versionLabel: "Versione",
    scopeLabel: "Si applica a",
    tocLabel: "Indice",
    back: "Indietro",
    langNote: "This policy is also available in English — switch the language in the navigation bar.",
    sections: [
      {
        id: "sintesi",
        title: "1. In breve",
        blocks: [
          { p: "Prima della versione formale, ecco cosa succede davvero." },
          {
            ul: [
              "Se entri nella **lista d'attesa** di ESCO ci lasci un solo contatto — telefono oppure email — e lo usiamo per avvisarti quando si apre un posto nella tua città. Se scegli il telefono ti scriviamo su WhatsApp o SMS: non ti chiamiamo.",
              "Se ci scrivi dal **modulo contatti** di miutifin.com, teniamo quello che inserisci per risponderti sul progetto.",
              "Se diventi **membro di ESCO**, conserviamo il tuo account, le tue preferenze di gusto e quello che salvi: sono i dati che permettono all'app di comporre percorsi su misura per te.",
              "Registriamo **quando** hai dato il consenso, perché la legge ci chiede di poterlo dimostrare.",
              "Ci appoggiamo a pochi fornitori affidabili. **Non vendiamo i tuoi dati, non facciamo pubblicità profilata, non li passiamo a operatori di marketing.**",
              "Puoi chiederci in qualsiasi momento di vedere o cancellare i tuoi dati. Rispondiamo entro 30 giorni.",
            ],
          },
          { note: "Il resto della pagina è la versione formale di queste sei righe." },
        ],
      },
      {
        id: "titolare",
        title: "2. Chi tratta i tuoi dati",
        blocks: [
          { p: "Il titolare del trattamento è **[RAGIONE SOCIALE]**, con sede in **[INDIRIZZO COMPLETO]**, P. IVA **[NUMERO]**, che gestisce miutifin.com e il servizio ESCO." },
          { p: `Per qualsiasi questione relativa ai tuoi dati puoi scrivere a **${E}**.` },
          { note: "Non abbiamo nominato un Responsabile della protezione dei dati (DPO): non rientriamo nei casi in cui il GDPR lo rende obbligatorio." },
        ],
      },
      {
        id: "dati",
        title: "3. Quali dati raccogliamo",
        blocks: [
          { p: "Dipende da come interagisci con noi. Non raccogliamo mai più di quello che serve a una finalità precisa." },

          { h3: "3.1 Se ci scrivi dal modulo di miutifin.com" },
          {
            ul: [
              "**Nome e cognome**, **azienda**, **email di lavoro**",
              "**Tipo di progetto** e, se lo indichi, il **budget di massima**",
              "**Il messaggio** che ci scrivi",
              "**Il consenso** e la data in cui l'hai dato",
            ],
          },

          { h3: "3.2 Se entri nella lista d'attesa di ESCO" },
          {
            ul: [
              "**Il tuo numero di telefono oppure la tua email** — uno dei due, scegli tu. Non chiediamo entrambi.",
              "**Il consenso e il momento in cui l'hai dato** (data e ora).",
              "**Da quale punto del sito** ti sei iscritto e in **quale lingua** stavi navigando.",
              "**Un'impronta del tuo indirizzo IP**, cifrata a senso unico: serve solo a contare le iscrizioni che arrivano dalla stessa connessione ed evitare abusi. Dall'impronta non si risale all'indirizzo.",
            ],
          },
          { note: "Se ci lasci l'email, la salviamo anche in forma normalizzata (senza i punti e senza le estensioni dopo il +, che alcuni provider ignorano) per riconoscere le iscrizioni doppie della stessa casella." },

          { h3: "3.3 Se ti iscrivi alla newsletter" },
          { ul: ["**La tua email**", "Se lo indichi, il **numero di telefono**"] },

          { h3: "3.4 Se diventi membro di ESCO" },
          { p: "Quando completi la registrazione dopo l'invito raccogliamo:" },
          {
            ul: [
              "**Dati di accesso**: email, password (salvata solo come hash, mai in chiaro), token di sessione",
              "**Profilo**: username, nickname, immagine (facoltativa), breve biografia (facoltativa), città, data di nascita (facoltativa)",
              "**Preferenze di gusto**: categorie preferite, interessi musicali, fascia di prezzo, preferenza giorno/sera, dresscode",
              "**Attività**: posti che salvi, eventi a cui partecipi, valutazioni che dai, percorsi che componi",
            ],
          },
          { note: "Preferenze e attività sono ciò che permette a ESCO di comporre percorsi personalizzati: senza quei dati il servizio non può funzionare." },

          { h3: "3.5 Dati tecnici (chiunque visiti il sito)" },
          {
            ul: [
              "**Dispositivo e browser**: tipo, versione, lingua",
              "**Indirizzo IP**: lo ricevono i nostri fornitori di hosting per consegnarti le pagine. Nella lista d'attesa noi ne conserviamo solo un'impronta cifrata, per limitare i tentativi ripetuti.",
            ],
          },

          { h3: "3.6 Numeri pubblici" },
          { p: "Sulle pagine mostriamo dei conteggi complessivi — quante persone sono in lista, quante città sono attive, quante iscrizioni sono arrivate questa settimana. Sono somme: da lì non si risale a nessuna persona." },
        ],
      },
      {
        id: "finalita",
        title: "4. Perché li usiamo",
        blocks: [
          {
            table: {
              head: ["Finalità", "Dati usati"],
              rows: [
                ["Far funzionare il servizio: account, percorsi, preferenze, inviti", "Dati dell'account, preferenze, attività"],
                ["Avvisarti quando la beta apre nella tua città", "Telefono o email della lista d'attesa"],
                ["Rispondere alla tua richiesta di progetto", "Dati del modulo contatti"],
                ["Dimostrare che ci hai dato il consenso", "Consenso e data"],
                ["Evitare iscrizioni automatiche e abusi", "Impronta dell'IP, numero di tentativi"],
                ["Migliorare il prodotto", "Statistiche aggregate, senza tracciamento individuale"],
                ["Adempiere a obblighi di legge", "Quelli richiesti di volta in volta"],
              ],
            },
          },
          { note: "Non usiamo i tuoi dati per pubblicità profilata e non prendiamo decisioni interamente automatizzate che producano effetti giuridici su di te. I percorsi suggeriti da ESCO sono proposte: la scelta resta tua." },
        ],
      },
      {
        id: "base",
        title: "5. Su quale base giuridica",
        blocks: [
          {
            table: {
              head: ["Trattamento", "Base giuridica (GDPR art. 6)"],
              rows: [
                ["Modulo contatti miutifin", "Misure precontrattuali — art. 6.1.b"],
                ["Lista d'attesa ESCO", "Il tuo consenso — art. 6.1.a"],
                ["Newsletter", "Il tuo consenso — art. 6.1.a"],
                ["Account e funzioni da membro", "Esecuzione del contratto — art. 6.1.b"],
                ["Sicurezza e prevenzione degli abusi", "Legittimo interesse — art. 6.1.f"],
                ["Statistiche aggregate", "Legittimo interesse — art. 6.1.f"],
                ["Obblighi normativi", "Obbligo legale — art. 6.1.c"],
              ],
            },
          },
          { p: "Dove la base è il consenso puoi **revocarlo quando vuoi**, scrivendo all'indirizzo in fondo alla pagina. La revoca non rende illegittimo quello che abbiamo fatto prima." },
          { note: "Il nostro legittimo interesse nella prevenzione degli abusi è mantenere il servizio funzionante e la lista pulita. Abbiamo valutato che non prevalga sui tuoi diritti: l'indirizzo IP non viene mai conservato in chiaro." },
        ],
      },
      {
        id: "destinatari",
        title: "6. Con chi li condividiamo",
        blocks: [
          { p: "**Non vendiamo i tuoi dati e non li cediamo a inserzionisti o reti pubblicitarie.** Li tratta solo chi ci fornisce l'infrastruttura necessaria a far funzionare la piattaforma." },
          {
            table: {
              head: ["Fornitore", "Cosa tratta"],
              rows: [
                ["**Supabase** — database, autenticazione, archiviazione", "Account, profilo, preferenze e contenuti. Regione: **[VERIFICA LA TUA: Francoforte / altra]**"],
                ["**Vercel** — hosting del sito", "Dati tecnici della richiesta (IP, intestazioni) per la consegna delle pagine e la sicurezza"],
                ["**Anthropic / OpenAI** — composizione dei percorsi", "Solo i segnali di preferenza necessari a una singola composizione. Nessun dato di profilo, nessun identificativo. I contenuti inviati non vengono usati per addestrare i loro modelli."],
                ["**Google Places** — dati sui luoghi", "Ricerche di luoghi e coordinate necessarie a mostrarti i posti"],
              ],
            },
          },
          { note: "Tutti i fornitori sono vincolati da accordi di responsabile del trattamento ai sensi dell'art. 28 GDPR." },
        ],
      },
      {
        id: "trasferimenti",
        title: "7. Trasferimenti fuori dall'Unione Europea",
        blocks: [
          { p: "L'infrastruttura principale è nell'Unione Europea. Alcuni fornitori — in particolare quelli di intelligenza artificiale e di hosting — hanno sede negli Stati Uniti e possono trattare dati fuori dall'UE. In quei casi il trasferimento è protetto da:" },
          {
            ul: [
              "**Clausole Contrattuali Standard** approvate dalla Commissione Europea",
              "oppure una **decisione di adeguatezza**, come il quadro UE–USA sulla protezione dei dati",
              "in aggiunta a misure tecniche: cifratura, minimizzazione dei dati inviati, nessun addestramento sui contenuti",
            ],
          },
        ],
      },
      {
        id: "conservazione",
        title: "8. Per quanto tempo li teniamo",
        blocks: [
          {
            table: {
              head: ["Dato", "Conservazione"],
              rows: [
                ["Messaggi dal modulo contatti", "24 mesi dall'ultimo scambio"],
                ["Contatto nella lista d'attesa (non approvato)", "18 mesi, poi cancellato"],
                ["Account membri attivi", "Per tutta la durata dell'account, più 30 giorni dopo la cancellazione"],
                ["Iscritti alla newsletter", "Fino a quando ti disiscrivi"],
                ["Consenso e data", "Per tutta la durata del trattamento e 5 anni dopo, come prova"],
                ["Impronta dell'indirizzo IP", "Cancellata entro 30 giorni"],
                ["Statistiche aggregate", "A tempo indeterminato: non contengono dati personali"],
              ],
            },
          },
          { p: "Se ci chiedi la cancellazione procediamo entro 30 giorni, salvo che una norma ci obblighi a conservare qualcosa più a lungo (per esempio le fatture)." },
        ],
      },
      {
        id: "sicurezza",
        title: "9. Come li proteggiamo",
        blocks: [
          { p: "Proteggiamo i dati personali con misure tecniche e organizzative proporzionate al rischio:" },
          {
            ul: [
              "Cifratura del traffico (TLS 1.2 o superiore) e dei dati a riposo",
              "Password salvate solo come hash, mai in chiaro",
              "**Sicurezza a livello di riga su ogni tabella**: ciascuno accede soltanto ai propri dati",
              "**Il browser non può leggere né scrivere la lista dei contatti**: ogni iscrizione passa da un nostro server, e sul database non esiste alcun permesso di lettura pubblica",
              "L'indirizzo IP è salvato solo come impronta cifrata a senso unico, con un limite di tentativi per connessione",
              "Accesso ai dati limitato alle persone del team che ne hanno bisogno",
              "Revisioni periodiche di sicurezza e aggiornamento delle dipendenze",
            ],
          },
          { note: "Nessun sistema è sicuro al 100%. Se dovessimo rilevare una violazione che ti riguarda, avviseremo te e il Garante entro 72 ore, come previsto dagli articoli 33 e 34 del GDPR." },
        ],
      },
      {
        id: "diritti",
        title: "10. I tuoi diritti",
        blocks: [
          { p: "In qualsiasi momento puoi chiederci di:" },
          {
            ul: [
              "**Accedere** ai dati che abbiamo su di te e ricevere una copia",
              "**Correggere** quelli sbagliati o incompleti",
              "**Cancellare** tutto quello che ti riguarda",
              "**Limitare** o **opporti** al trattamento fondato sul legittimo interesse",
              "**Ricevere i tuoi dati** in un formato leggibile da un altro servizio",
              "**Revocare il consenso**, senza dover spiegare perché",
            ],
          },
          { p: `Basta scrivere a **${E}**. Rispondiamo entro 30 giorni e non chiediamo nulla in cambio, salvo richieste manifestamente infondate o eccessive.` },
          { p: "Se pensi che stiamo trattando i tuoi dati in modo scorretto puoi rivolgerti al **Garante per la protezione dei dati personali** ([garanteprivacy.it](https://www.garanteprivacy.it)) o all'autorità del tuo Paese di residenza." },
        ],
      },
      {
        id: "cookie",
        title: "11. Cookie",
        blocks: [
          { p: "Usiamo il numero minimo di cookie necessario a far funzionare la piattaforma:" },
          {
            ul: [
              "**Autenticazione**: per tenerti collegato al tuo account (cookie di sessione Supabase)",
              "**Lingua**: per ricordare se navighi in italiano o in inglese",
              "**Protezione dei moduli**: token di sicurezza contro l'invio fraudolento dei form",
            ],
          },
          { p: "**Non usiamo cookie pubblicitari, di retargeting o di tracciamento tra siti diversi.** Per questo non trovi un banner che ti chiede il consenso: per i cookie tecnici non serve." },
          { note: "**[SE UN GIORNO AGGIUNGI ANALYTICS O PIXEL PUBBLICITARI, QUESTA SEZIONE VA RISCRITTA E SERVIRÀ UN BANNER.]**" },
        ],
      },
      {
        id: "minori",
        title: "12. Minori",
        blocks: [
          { p: "La piattaforma non è rivolta a chi ha meno di 16 anni e non raccogliamo consapevolmente i loro dati. Se pensi che un minore ci abbia lasciato i suoi contatti, scrivici: li cancelliamo subito." },
        ],
      },
      {
        id: "modifiche",
        title: "13. Modifiche",
        blocks: [
          { p: "Possiamo aggiornare questa informativa. Le modifiche sostanziali vengono comunicate ai membri attivi via email almeno 14 giorni prima. La data e il numero di versione in cima alla pagina indicano l'ultima revisione." },
        ],
      },
      {
        id: "contatti",
        title: "14. Contatti",
        blocks: [
          { p: `Per qualsiasi domanda o richiesta sui tuoi dati: **${E}**` },
          { note: "Cerchiamo di rispondere entro 24 ore, e comunque entro i 30 giorni previsti dal GDPR." },
        ],
      },
    ],
  },

  en: {
    eyebrow: "Legal · Privacy",
    title: "Privacy Policy",
    updated: "28 August 2026",
    version: "3.0",
    scope: "miutifin.com and ESCO",
    updatedLabel: "Last updated",
    versionLabel: "Version",
    scopeLabel: "Applies to",
    tocLabel: "Contents",
    back: "Back",
    langNote: "Questa informativa è disponibile anche in italiano — cambia lingua dalla barra di navigazione.",
    sections: [
      {
        id: "sintesi",
        title: "1. In short",
        blocks: [
          { p: "Before the formal version, here's what actually happens." },
          {
            ul: [
              "If you join the ESCO **waiting list** you give us one contact — phone or email — and we use it to tell you when a spot opens in your city. If you choose the phone we message you on WhatsApp or SMS: we don't call.",
              "If you write through the miutifin.com **contact form**, we keep what you enter so we can reply about your project.",
              "If you become an **ESCO member**, we keep your account, your taste preferences and what you save: that's the data that lets the app compose journeys for you.",
              "We record **when** you gave consent, because the law requires us to be able to prove it.",
              "We rely on a small number of trusted providers. **We don't sell your data, we don't run profiled advertising, we don't pass it to marketers.**",
              "You can ask to see or delete your data at any time. We reply within 30 days.",
            ],
          },
          { note: "The rest of this page is the formal version of those six lines." },
        ],
      },
      {
        id: "titolare",
        title: "2. Who processes your data",
        blocks: [
          { p: "The data controller is **[LEGAL ENTITY NAME]**, registered at **[FULL ADDRESS]**, VAT **[NUMBER]**, operating miutifin.com and the ESCO service." },
          { p: `For anything about your data, write to **${E}**.` },
          { note: "We have not appointed a Data Protection Officer: we don't fall within the cases where the GDPR makes it mandatory." },
        ],
      },
      {
        id: "dati",
        title: "3. What we collect",
        blocks: [
          { p: "It depends on how you interact with us. We never collect more than a specific purpose requires." },

          { h3: "3.1 If you write through the miutifin.com form" },
          {
            ul: [
              "**Full name**, **company**, **work email**",
              "**Project type** and, if you provide it, an **indicative budget**",
              "**The message** you write",
              "**Your consent** and the date you gave it",
            ],
          },

          { h3: "3.2 If you join the ESCO waiting list" },
          {
            ul: [
              "**Your phone number or your email** — one of the two, your choice. We don't ask for both.",
              "**Your consent and the moment you gave it** (date and time).",
              "**Which part of the site** you signed up from and **which language** you were browsing in.",
              "**A one-way fingerprint of your IP address**: it only serves to count sign-ups from the same connection and prevent abuse. The address cannot be recovered from it.",
            ],
          },
          { note: "If you leave an email, we also store a normalised form of it (without dots and without the +suffix some providers ignore) to spot duplicate sign-ups from the same mailbox." },

          { h3: "3.3 If you subscribe to the newsletter" },
          { ul: ["**Your email address**", "Optionally, your **phone number**"] },

          { h3: "3.4 If you become an ESCO member" },
          { p: "When you complete registration after an invitation, we collect:" },
          {
            ul: [
              "**Authentication data**: email, password (stored as a hash, never in clear text), session tokens",
              "**Profile**: username, nickname, avatar (optional), short bio (optional), city, birthday (optional)",
              "**Taste preferences**: preferred categories, music interests, price tier, day/night preference, dress code",
              "**Activity**: places you save, events you attend, ratings you give, journeys you compose",
            ],
          },
          { note: "Preferences and activity are what allow ESCO to compose personalised journeys: without that data the service cannot work." },

          { h3: "3.5 Technical data (anyone visiting)" },
          {
            ul: [
              "**Device and browser**: type, version, language",
              "**IP address**: our hosting providers receive it to deliver pages. On the waiting list we only keep an encrypted fingerprint, to limit repeated attempts.",
            ],
          },

          { h3: "3.6 Public numbers" },
          { p: "The pages show aggregate counts — how many people are on the list, how many cities are live, how many sign-ups came this week. They are sums: no individual can be identified from them." },
        ],
      },
      {
        id: "finalita",
        title: "4. Why we use them",
        blocks: [
          {
            table: {
              head: ["Purpose", "Data used"],
              rows: [
                ["Running the service: accounts, journeys, preferences, invites", "Account data, preferences, activity"],
                ["Telling you when the beta opens in your city", "Waiting list phone or email"],
                ["Replying to your project enquiry", "Contact form data"],
                ["Proving you gave consent", "Consent and timestamp"],
                ["Preventing automated sign-ups and abuse", "IP fingerprint, attempt count"],
                ["Improving the product", "Aggregate statistics, no individual tracking"],
                ["Meeting legal obligations", "Whatever is required at the time"],
              ],
            },
          },
          { note: "We don't use your data for profiled advertising and we don't make fully automated decisions producing legal effects on you. ESCO's suggested journeys are proposals: the choice stays yours." },
        ],
      },
      {
        id: "base",
        title: "5. Legal basis",
        blocks: [
          {
            table: {
              head: ["Processing", "Legal basis (GDPR art. 6)"],
              rows: [
                ["miutifin contact form", "Pre-contractual measures — art. 6.1.b"],
                ["ESCO waiting list", "Your consent — art. 6.1.a"],
                ["Newsletter", "Your consent — art. 6.1.a"],
                ["Account and member features", "Contract performance — art. 6.1.b"],
                ["Security and abuse prevention", "Legitimate interest — art. 6.1.f"],
                ["Aggregate statistics", "Legitimate interest — art. 6.1.f"],
                ["Regulatory obligations", "Legal obligation — art. 6.1.c"],
              ],
            },
          },
          { p: "Where the basis is consent you can **withdraw it whenever you want**, by writing to the address at the bottom. Withdrawal doesn't make what we did before unlawful." },
          { note: "Our legitimate interest in abuse prevention is keeping the service working and the list clean. We assessed it doesn't override your rights: the IP address is never stored in clear text." },
        ],
      },
      {
        id: "destinatari",
        title: "6. Who we share them with",
        blocks: [
          { p: "**We don't sell your data and we don't give it to advertisers or marketing networks.** It's only processed by the providers running our infrastructure." },
          {
            table: {
              head: ["Provider", "What it processes"],
              rows: [
                ["**Supabase** — database, authentication, storage", "Accounts, profile, preferences and content. Region: **[CHECK YOURS: Frankfurt / other]**"],
                ["**Vercel** — website hosting", "Technical request data (IP, headers) for delivery and security"],
                ["**Anthropic / OpenAI** — journey composition", "Only the preference signals needed for a single composition. No profile data, no identifiers. Inputs are not used to train their models."],
                ["**Google Places** — place data", "Place lookups and coordinates needed to show you venues"],
              ],
            },
          },
          { note: "All providers are bound by data processing agreements under GDPR art. 28." },
        ],
      },
      {
        id: "trasferimenti",
        title: "7. Transfers outside the EU",
        blocks: [
          { p: "Our main infrastructure is in the European Union. Some providers — notably the AI and hosting ones — are US-based and may process data outside the EU. In those cases the transfer is protected by:" },
          {
            ul: [
              "**Standard Contractual Clauses** approved by the European Commission",
              "or an **adequacy decision**, such as the EU–US Data Privacy Framework",
              "plus technical safeguards: encryption, minimisation of what is sent, no training on inputs",
            ],
          },
        ],
      },
      {
        id: "conservazione",
        title: "8. How long we keep them",
        blocks: [
          {
            table: {
              head: ["Data", "Retention"],
              rows: [
                ["Contact form messages", "24 months from the last exchange"],
                ["Waiting list contact (not approved)", "18 months, then deleted"],
                ["Active member accounts", "For the life of the account, plus 30 days after deletion"],
                ["Newsletter subscribers", "Until you unsubscribe"],
                ["Consent and timestamp", "For the duration of processing and 5 years after, as evidence"],
                ["IP fingerprint", "Deleted within 30 days"],
                ["Aggregate statistics", "Indefinitely: they contain no personal data"],
              ],
            },
          },
          { p: "If you ask us to delete your data we do it within 30 days, unless a law requires us to keep something longer (invoices, for example)." },
        ],
      },
      {
        id: "sicurezza",
        title: "9. How we protect them",
        blocks: [
          { p: "We protect personal data with technical and organisational measures proportionate to the risk:" },
          {
            ul: [
              "Encryption in transit (TLS 1.2+) and at rest",
              "Passwords stored only as hashes, never in clear text",
              "**Row-level security on every table**: each person only reaches their own data",
              "**The browser can neither read nor write the contact list**: every sign-up goes through our server, and the database grants no public read permission",
              "The IP address is stored only as a one-way fingerprint, with a per-connection attempt limit",
              "Access limited to the team members who need it",
              "Regular security reviews and dependency updates",
            ],
          },
          { note: "No system is 100% secure. If we detect a breach affecting you, we'll notify you and the supervisory authority within 72 hours, as required by GDPR art. 33–34." },
        ],
      },
      {
        id: "diritti",
        title: "10. Your rights",
        blocks: [
          { p: "At any time you can ask us to:" },
          {
            ul: [
              "**Access** the data we hold about you and receive a copy",
              "**Correct** anything wrong or incomplete",
              "**Delete** everything about you",
              "**Restrict** or **object to** processing based on legitimate interest",
              "**Receive your data** in a format another service can read",
              "**Withdraw consent**, without having to explain why",
            ],
          },
          { p: `Just write to **${E}**. We reply within 30 days, free of charge, unless a request is manifestly unfounded or excessive.` },
          { p: "If you think we're handling your data improperly you can contact the Italian **Garante per la protezione dei dati personali** ([garanteprivacy.it](https://www.garanteprivacy.it)) or the authority in your country of residence." },
        ],
      },
      {
        id: "cookie",
        title: "11. Cookies",
        blocks: [
          { p: "We use the minimum number of cookies needed to run the platform:" },
          {
            ul: [
              "**Authentication**: to keep you signed in (Supabase session cookies)",
              "**Language**: to remember whether you browse in Italian or English",
              "**Form protection**: security tokens against fraudulent submissions",
            ],
          },
          { p: "**We use no advertising, retargeting or cross-site tracking cookies.** That's why there's no consent banner: technical cookies don't require one." },
          { note: "**[IF YOU EVER ADD ANALYTICS OR ADVERTISING PIXELS, THIS SECTION MUST BE REWRITTEN AND A BANNER WILL BE REQUIRED.]**" },
        ],
      },
      {
        id: "minori",
        title: "12. Children",
        blocks: [
          { p: "The platform is not intended for anyone under 16 and we don't knowingly collect their data. If you believe a minor has left us their contact, write to us: we delete it immediately." },
        ],
      },
      {
        id: "modifiche",
        title: "13. Changes",
        blocks: [
          { p: "We may update this policy. Material changes are communicated to active members by email at least 14 days in advance. The date and version at the top show the latest revision." },
        ],
      },
      {
        id: "contatti",
        title: "14. Contact",
        blocks: [
          { p: `For any question or request about your data: **${E}**` },
          { note: "We aim to reply within 24 hours, and always within the 30 days the GDPR allows." },
        ],
      },
    ],
  },
};