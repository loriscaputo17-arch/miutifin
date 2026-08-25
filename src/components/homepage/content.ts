/* ============================================================
   MIUTIFIN — COPY
   Tutto il testo del sito in un unico file, IT + EN.
   Se preferisci restare su next-intl, questo file si travasa
   in messages/it.json e messages/en.json senza cambiare la UI.
   ============================================================ */

export type Locale = "it" | "en";

export const CONTENT = {
  it: {
    nav: {
      links: [
        { label: "Servizi", href: "#servizi" },
        { label: "ESCO", href: "#esco" },
        { label: "Collective", href: "#collective" },
        { label: "FAQ", href: "#faq" },
      ],
      cta: "Prenota una call",
      menu: "Menu",
      close: "Chiudi",
      language: "Lingua",
      status: "Disponibili per nuovi progetti",
    },

    hero: {
      badge: "Software house · Milano",
      line1: "Costruiamo",
      rotating: ["AI", "robotica", "software", "dati"],
      line2: "per le aziende.",
      sub: "Miutifin è una software house e un collettivo di ingegneri. Progettiamo modelli, prodotti e sistemi — e li mandiamo in produzione. Da Milano, per l'Italia e per l'Europa.",
      ctaPrimary: "Prenota una call",
      ctaSecondary: "Guarda ESCO",
      proof: [
        { n: "15", l: "ingegneri nel collettivo" },
        { n: "7", l: "mercati serviti" },
        { n: "24h", l: "tempo di risposta" },
      ],
    },

    rail: {
      label: "Competenze",
      items: [
        "AI applicata",
        "Machine learning",
        "LLM & RAG",
        "Computer vision",
        "Robotica",
        "Data engineering",
        "App iOS & Android",
        "Piattaforme web",
        "Product design",
        "Cloud & DevOps",
      ],
    },

    pillars: {
      label: "Chi siamo",
      title: "Tre cose, fatte bene.",
      lead: "Non siamo un'agenzia che rivende ore. Siamo ingegneri che costruiscono software — per i clienti e per sé.",
      items: [
        {
          k: "Consulenza",
          t: "Team senior, dentro il tuo prodotto",
          d: "Entriamo in affiancamento o prendiamo in carico un pezzo di roadmap. Codice che passa in review, non slide.",
          link: "Vedi i servizi",
          href: "#servizi",
        },
        {
          k: "Prodotti",
          t: "Costruiamo anche roba nostra",
          d: "ESCO è la nostra app di discovery per posti, eventi ed esperienze. Stesso team, stesso standard.",
          link: "Scopri ESCO",
          href: "#esco",
        },
        {
          k: "Collective",
          t: "Una rete, non un organigramma",
          d: "Sviluppatori forti che scegliamo uno a uno e che lavorano insieme da anni. Si scala in giorni, non in trimestri.",
          link: "Entra nel collettivo",
          href: "#collective",
        },
      ],
    },

    services: {
      label: "Servizi",
      title: "Cosa possiamo costruire.",
      lead: "Competenze trasversali su un unico team. Un solo interlocutore dal primo brief al deploy.",
      items: [
        {
          t: "AI & machine learning",
          d: "Modelli su misura, LLM in produzione, RAG sui tuoi dati, agenti che fanno lavoro vero. Valutazione, guardrail e costi sotto controllo.",
          tags: ["LLM & RAG", "Fine-tuning", "Agenti", "Eval"],
        },
        {
          t: "Prodotti digitali",
          d: "App iOS e Android, piattaforme web, portali interni. Dalla ricerca utente al rilascio sugli store, con analytics dal giorno uno.",
          tags: ["React & Next.js", "Swift", "Kotlin", "Supabase"],
        },
        {
          t: "Robotica & sistemi",
          d: "Percezione, controllo, integrazione con macchine e linee di produzione. Software affidabile dove un bug costa fermo impianto.",
          tags: ["Computer vision", "ROS", "Edge", "IoT"],
        },
        {
          t: "Dati & infrastruttura",
          d: "Pipeline, warehouse e metriche che qualcuno guarda davvero. Cloud dimensionato su quello che ti serve, non su quello che vende il fornitore.",
          tags: ["Pipeline", "Warehouse", "Cloud", "DevOps"],
        },
        {
          t: "Design & interfacce",
          d: "Design system, prototipi navigabili, interfacce che reggono il carico di funzioni senza diventare illeggibili.",
          tags: ["Design system", "Prototipi", "UX writing"],
        },
      ],
      stepsLabel: "Come si parte",
      steps: [
        { n: "01", t: "Call", d: "30 minuti. Capiamo se c'è un progetto e se siamo noi le persone giuste." },
        { n: "02", t: "Scoping", d: "Una settimana. Perimetro, architettura, tempi e prezzo fisso per la prima fase." },
        { n: "03", t: "Build", d: "Sprint da due settimane. Demo funzionante alla fine di ognuno." },
      ],
      cta: "Parliamo del tuo progetto",
    },

    esco: {
      label: "Il nostro prodotto",
      title: "ESCO",
      claim: "Cosa fare stasera, dove sei.",
      desc: "Un'app di discovery per posti, eventi ed esperienze. Niente feed infinito: tre proposte buone, adesso, vicino a te. È il banco di prova dove usiamo su noi stessi le tecnologie che portiamo ai clienti.",
      stats: [
        { n: "Milano", l: "prima città" },
        { n: "Beta", l: "stato" },
        { n: "2026", l: "lancio pubblico" },
      ],
      cta: "Entra nella beta",
      mockTitle: "Stasera a Milano",
      mockSub: "Tre proposte per te",
      mockItems: [
        { t: "Cinema all'aperto in Bovisa", m: "21:00 · 1,2 km · gratis" },
        { t: "Set techno, cortile industriale", m: "23:30 · 3,4 km · 15 €" },
        { t: "Cicchetti e vino, Isola", m: "19:30 · 800 m · 20 €" },
      ],
    },

    collective: {
      label: "Collective",
      title: "Un collettivo, non un organigramma.",
      lead: "Miutifin è una rete di sviluppatori che si sono scelti. Ognuno porta un pezzo: chi fa modelli, chi fa robotica, chi fa prodotto. Insieme copriamo quello che di solito richiede tre fornitori diversi.",
      points: [
        "Ogni progetto ha un ingegnere responsabile, non un account manager.",
        "Il team si compone sul problema: non ti vendiamo le persone che abbiamo in panchina.",
        "Il codice è tuo dal primo commit, sul tuo repository.",
        "Se un progetto non è nelle nostre corde, te lo diciamo e ti mandiamo da chi lo fa meglio.",
      ],
      joinTitle: "Sviluppi e vuoi entrare?",
      joinDesc: "Cerchiamo persone forti su AI, robotica, backend e prodotto. Si entra su progetto, si resta se funziona.",
      joinCta: "Scrivici",
    },

    faq: {
      label: "FAQ",
      title: "Le domande che ci fanno tutti.",
      items: [
        {
          q: "Come lavorate: a corpo o a tempo?",
          a: "Prima fase sempre a prezzo fisso, dopo lo scoping. Da lì si continua a sprint o con un team dedicato a canone mensile, decidi tu.",
        },
        {
          q: "Quanto costa partire?",
          a: "Lo scoping da una settimana ha un costo fisso e si scala interamente sul progetto se andiamo avanti. Un primo rilascio in produzione parte tipicamente da 15-20k.",
        },
        {
          q: "Lavorate solo su AI?",
          a: "No. L'AI è dove ci chiamano più spesso, ma metà del lavoro è prodotto, dati e infrastruttura. Spesso la risposta giusta a un problema non è un modello.",
        },
        {
          q: "Siete a Milano o da remoto?",
          a: "Base a Milano, team distribuito. Per i clienti italiani ci vediamo di persona quando serve — kickoff, workshop, review importanti.",
        },
      ],
    },

    contact: {
      label: "Contatti",
      title: "Raccontaci cosa devi costruire.",
      sub: "Rispondiamo entro 24 ore lavorative. Se il progetto non fa per noi, lo diciamo subito.",
      reassure: [
        "Prima call di 30 minuti, senza impegno",
        "Ti risponde un ingegnere, non un commerciale",
        "NDA firmato prima di entrare nei dettagli",
      ],
      emailLabel: "Email",
      email: "miutifin.ask@gmail.com",
      whereLabel: "Dove siamo",
      where: "Milano, Italia",
      form: {
        name: "Nome e cognome",
        namePh: "Mario Rossi",
        company: "Azienda",
        companyPh: "Nome azienda",
        email: "Email di lavoro",
        emailPh: "nome@azienda.it",
        type: "Di cosa hai bisogno",
        typePh: "Seleziona",
        types: ["AI & machine learning", "Prodotto digitale", "Robotica & sistemi", "Dati & infrastruttura", "Design", "Altro"],
        budget: "Budget indicativo",
        budgetPh: "Preferisco non dirlo",
        budgets: ["Sotto 15k", "15k – 50k", "50k – 150k", "Oltre 150k"],
        optional: "opzionale",
        message: "Il progetto in due righe",
        messagePh: "Cosa vuoi costruire, entro quando, cosa vi blocca oggi.",
        consent: "Ho letto e accetto la ",
        privacy: "privacy policy",
        submit: "Invia richiesta",
        sending: "Invio in corso",
        errors: {
          name: "Scrivi nome e cognome.",
          company: "Scrivi il nome dell'azienda.",
          emailReq: "Serve un'email per risponderti.",
          emailBad: "Questa email non sembra valida.",
          type: "Scegli di cosa hai bisogno.",
          message: "Scrivi almeno una riga sul progetto.",
          consent: "Devi accettare la privacy policy.",
          generic: "Invio non riuscito. Riprova o scrivici a miutifin.ask@gmail.com.",
        },
      },
      successTitle: "Richiesta arrivata.",
      successDesc: "Ti rispondiamo entro 24 ore lavorative dall'indirizzo miutifin.ask@gmail.com.",
      stickyCta: "Prenota una call",
    },

    footer: {
      tagline: "Software house e collettivo di ingegneri. Milano.",
      colProduct: "Prodotto",
      colCompany: "Studio",
      colContact: "Contatti",
      product: [
        { label: "ESCO", href: "#esco" },
        { label: "Servizi", href: "#servizi" },
        { label: "Collective", href: "#collective" },
      ],
      company: [
        { label: "FAQ", href: "#faq" },
        { label: "Contatti", href: "#contatti" },
        { label: "Privacy", href: "/privacy" },
      ],
      responseLabel: "Risposta",
      responseValue: "entro 24 ore",
      rights: "Tutti i diritti riservati.",
      status: "Disponibili per nuovi progetti",
    },
  },

  en: {
    nav: {
      links: [
        { label: "Services", href: "#servizi" },
        { label: "ESCO", href: "#esco" },
        { label: "Collective", href: "#collective" },
        { label: "FAQ", href: "#faq" },
      ],
      cta: "Book a call",
      menu: "Menu",
      close: "Close",
      language: "Language",
      status: "Taking on new projects",
    },

    hero: {
      badge: "Software house · Milan",
      line1: "We build",
      rotating: ["AI", "robotics", "software", "data"],
      line2: "for European companies.",
      sub: "Miutifin is a software house and a collective of engineers. We design models, products and systems — and ship them to production. From Milan, for Italy and Europe.",
      ctaPrimary: "Book a call",
      ctaSecondary: "See ESCO",
      proof: [
        { n: "15", l: "engineers in the collective" },
        { n: "7", l: "markets served" },
        { n: "24h", l: "response time" },
      ],
    },

    rail: {
      label: "Capabilities",
      items: [
        "Applied AI",
        "Machine learning",
        "LLM & RAG",
        "Computer vision",
        "Robotics",
        "Data engineering",
        "iOS & Android apps",
        "Web platforms",
        "Product design",
        "Cloud & DevOps",
      ],
    },

    pillars: {
      label: "Who we are",
      title: "Three things, done properly.",
      lead: "We're not an agency reselling hours. We're engineers who build software — for clients and for ourselves.",
      items: [
        {
          k: "Consulting",
          t: "Senior team, inside your product",
          d: "We embed with your people or own a slice of the roadmap. Code that passes review, not slides.",
          link: "See services",
          href: "#servizi",
        },
        {
          k: "Products",
          t: "We build our own too",
          d: "ESCO is our discovery app for places, events and experiences. Same team, same standard.",
          link: "Discover ESCO",
          href: "#esco",
        },
        {
          k: "Collective",
          t: "A network, not an org chart",
          d: "Strong developers we pick one by one, who have worked together for years. We scale in days, not quarters.",
          link: "Join the collective",
          href: "#collective",
        },
      ],
    },

    services: {
      label: "Services",
      title: "What we can build.",
      lead: "Cross-disciplinary skills on a single team. One counterpart from first brief to deploy.",
      items: [
        {
          t: "AI & machine learning",
          d: "Custom models, LLMs in production, RAG over your data, agents that do real work. Evaluation, guardrails and costs under control.",
          tags: ["LLM & RAG", "Fine-tuning", "Agents", "Evals"],
        },
        {
          t: "Digital products",
          d: "iOS and Android apps, web platforms, internal tools. From user research to store release, with analytics from day one.",
          tags: ["React & Next.js", "Swift", "Kotlin", "Supabase"],
        },
        {
          t: "Robotics & systems",
          d: "Perception, control, integration with machines and production lines. Reliable software where a bug means downtime.",
          tags: ["Computer vision", "ROS", "Edge", "IoT"],
        },
        {
          t: "Data & infrastructure",
          d: "Pipelines, warehouses and metrics someone actually reads. Cloud sized for what you need, not for what the vendor sells.",
          tags: ["Pipelines", "Warehouse", "Cloud", "DevOps"],
        },
        {
          t: "Design & interfaces",
          d: "Design systems, clickable prototypes, interfaces that hold up under a heavy feature load without becoming unreadable.",
          tags: ["Design systems", "Prototypes", "UX writing"],
        },
      ],
      stepsLabel: "How we start",
      steps: [
        { n: "01", t: "Call", d: "30 minutes. We find out whether there's a project and whether we're the right people." },
        { n: "02", t: "Scoping", d: "One week. Scope, architecture, timeline and a fixed price for phase one." },
        { n: "03", t: "Build", d: "Two-week sprints. A working demo at the end of each one." },
      ],
      cta: "Tell us about your project",
    },

    esco: {
      label: "Our product",
      title: "ESCO",
      claim: "What to do tonight, right where you are.",
      desc: "A discovery app for places, events and experiences. No endless feed: three good options, right now, near you. It's the proving ground where we run our own client technology on ourselves.",
      stats: [
        { n: "Milan", l: "first city" },
        { n: "Beta", l: "status" },
        { n: "2026", l: "public launch" },
      ],
      cta: "Join the beta",
      mockTitle: "Tonight in Milan",
      mockSub: "Three picks for you",
      mockItems: [
        { t: "Open-air cinema in Bovisa", m: "9:00 PM · 1.2 km · free" },
        { t: "Techno set, industrial courtyard", m: "11:30 PM · 3.4 km · €15" },
        { t: "Cicchetti and wine, Isola", m: "7:30 PM · 800 m · €20" },
      ],
    },

    collective: {
      label: "Collective",
      title: "A collective, not an org chart.",
      lead: "Miutifin is a network of developers who chose each other. Each brings a piece: models, robotics, product. Together we cover what usually takes three separate vendors.",
      points: [
        "Every project has a lead engineer, not an account manager.",
        "The team is assembled around the problem, not around who's on the bench.",
        "The code is yours from the first commit, in your repository.",
        "If a project isn't for us, we say so and point you to someone better.",
      ],
      joinTitle: "You build things. Want in?",
      joinDesc: "We're looking for strong people in AI, robotics, backend and product. You join on a project and stay if it works.",
      joinCta: "Get in touch",
    },

    faq: {
      label: "FAQ",
      title: "What everyone asks us.",
      items: [
        {
          q: "Fixed price or time and materials?",
          a: "Phase one is always fixed price, after scoping. From there you choose: sprint by sprint, or a dedicated team on a monthly retainer.",
        },
        {
          q: "What does it cost to start?",
          a: "The one-week scoping has a fixed fee, fully credited against the project if we go ahead. A first production release typically starts around €15–20k.",
        },
        {
          q: "Do you only do AI?",
          a: "No. AI is what we get called for most, but half the work is product, data and infrastructure. Often the right answer to a problem isn't a model.",
        },
        {
          q: "Milan or remote?",
          a: "Based in Milan, distributed team. For clients here we show up in person when it matters — kickoff, workshops, big reviews.",
        },
      ],
    },

    contact: {
      label: "Contact",
      title: "Tell us what you need to build.",
      sub: "We reply within 24 working hours. If the project isn't for us, we'll say so straight away.",
      reassure: [
        "First 30-minute call, no strings",
        "An engineer replies, not a salesperson",
        "NDA signed before we get into detail",
      ],
      emailLabel: "Email",
      email: "miutifin.ask@gmail.com",
      whereLabel: "Where we are",
      where: "Milan, Italy",
      form: {
        name: "Full name",
        namePh: "Jane Smith",
        company: "Company",
        companyPh: "Company name",
        email: "Work email",
        emailPh: "you@company.com",
        type: "What you need",
        typePh: "Select",
        types: ["AI & machine learning", "Digital product", "Robotics & systems", "Data & infrastructure", "Design", "Something else"],
        budget: "Rough budget",
        budgetPh: "Rather not say",
        budgets: ["Under €15k", "€15k – 50k", "€50k – 150k", "Over €150k"],
        optional: "optional",
        message: "The project in two lines",
        messagePh: "What you want to build, by when, what's blocking you today.",
        consent: "I have read and accept the ",
        privacy: "privacy policy",
        submit: "Send request",
        sending: "Sending",
        errors: {
          name: "Enter your full name.",
          company: "Enter your company name.",
          emailReq: "We need an email to reply to.",
          emailBad: "That email doesn't look valid.",
          type: "Pick what you need.",
          message: "Write at least a line about the project.",
          consent: "You need to accept the privacy policy.",
          generic: "Couldn't send. Try again or email miutifin.ask@gmail.com.",
        },
      },
      successTitle: "Request received.",
      successDesc: "We'll reply within 24 working hours from miutifin.ask@gmail.com.",
      stickyCta: "Book a call",
    },

    footer: {
      tagline: "Software house and collective of engineers. Milan.",
      colProduct: "Product",
      colCompany: "Studio",
      colContact: "Contact",
      product: [
        { label: "ESCO", href: "#esco" },
        { label: "Services", href: "#servizi" },
        { label: "Collective", href: "#collective" },
      ],
      company: [
        { label: "FAQ", href: "#faq" },
        { label: "Contact", href: "#contatti" },
        { label: "Privacy", href: "/privacy" },
      ],
      responseLabel: "Response",
      responseValue: "within 24 hours",
      rights: "All rights reserved.",
      status: "Taking on new projects",
    },
  },
} as const;

export function useCopy(locale: string) {
  return CONTENT[(locale === "en" ? "en" : "it") as Locale];
}