/* ============================================================
   ESCO — COPY (IT + EN)
   Esperienze, non solo serate: mostre, sport, teatro, cibo,
   concerti. Mattina, pomeriggio e sera.
   ============================================================ */

export type Locale = "it" | "en";

export const ESCO_CONTENT = {
  it: {
    nav: {
      back: "miutifin",
      cta: "Entra nella lista",
      language: "Lingua",
    },

    hero: {
      eyebrow: "Beta privata · Milano",
      line1: "Oggi",
      line2: "esco",
      rotating: [
        "a vedere una mostra.",
        "a giocare a padel.",
        "a teatro.",
        "a mangiare bene.",
        "e non so ancora dove.",
      ],
      sub: "Tre esperienze scelte per te, vicino a dove sei, per l'ora in cui hai tempo. Mostre, sport, concerti, posti dove mangiare. Niente feed infinito da spulciare.",

      /* form con switch */
      tabPhone: "Telefono",
      tabEmail: "Email",
      phonePh: "+39 340 123 4567",
      emailPh: "la-tua@email.it",
      cta: "Entra nella lista",
      sending: "Un attimo",
      notePhone: "Ti scriviamo su WhatsApp quando tocca a te. Niente chiamate, niente spam.",
      noteEmail: "Una mail sola, quando si apre un posto nella tua città.",
      consent: "Acconsento a essere ricontattato per la beta. Ho letto la ",
      privacy: "privacy policy",
      successTitle: "Ci sei.",
      successDesc: "Ti scriviamo quando apriamo un posto nella tua città. Nel frattempo, zero messaggi inutili.",
      errors: {
        consent: "Serve il tuo consenso per poterti scrivere.",
        invalidPhone: "Controlla il numero, non sembra giusto.",
        invalidEmail: "Controlla l'email, non sembra valida.",
        already: "Sei già in lista. Ti scriviamo noi.",
        robot: "Verifica non riuscita. Ricarica la pagina e riprova.",
        tooMany: "Troppi tentativi. Riprova tra un'ora.",
        generic: "Non è andata. Riprova tra un attimo.",
        network: "Connessione persa. Riprova.",
      },

      cardsLabel: "Oggi a Milano",
      matchLabel: "match",
      cards: [
        { time: "11:00", title: "Mostra fotografica", meta: "Tortona · 2,1 km · 12 €", match: "94" },
        { time: "13:00", title: "Pranzo di quartiere", meta: "Navigli · 1,4 km · 18 €", match: "89" },
        { time: "15:30", title: "Padel, campo libero", meta: "Bicocca · 3,8 km · 9 €/h", match: "91" },
        { time: "18:30", title: "Aperitivo con vista", meta: "Isola · 800 m · 15 €", match: "88" },
        { time: "20:45", title: "Teatro, prima serata", meta: "Porta Romana · 4,2 km · 22 €", match: "93" },
        { time: "23:00", title: "Concerto in cortile", meta: "Lambrate · 3,4 km · 15 €", match: "86" },
      ],
    },

    statement: {
      pre: "Il problema non è",
      em: "cosa fare.",
      post: "È decidere.",
      sub: "Hai due ore libere di martedì pomeriggio o una domenica intera. Passi venti minuti a cercare, chiedi a tre amici, finisce che resti a casa. ESCO sceglie al posto tuo, e ci prende.",
    },

    how: {
      label: "Come funziona",
      items: [
        { n: "01", t: "Dici come stai", d: "Quanto tempo hai, con chi sei, che voglia hai oggi. Tre tap, non un questionario." },
        { n: "02", t: "ESCO sceglie", d: "Legge la città in tempo reale — cosa apre adesso, quanto dista, quanto costa — e ti dà tre opzioni. Non trenta." },
        { n: "03", t: "Esci", d: "Prenoti dall'app dove si può. Il resto della giornata è tua." },
      ],
    },

    cities: {
      label: "Dove siamo",
      title: "Milano adesso. Il resto a breve.",
      live: "Live",
      soon: "In arrivo",
      items: [
        { name: "Milano", live: true },
        { name: "Roma", live: false, eta: "Q4 2026" },
        { name: "Londra", live: false, eta: "Q4 2026" },
        { name: "Barcellona", live: false, eta: "Q4 2026" },
        { name: "Parigi", live: false, eta: "Q1 2027" },
        { name: "Berlino", live: false, eta: "Q1 2027" },
        { name: "Lisbona", live: false, eta: "Q1 2027" },
        { name: "New York", live: false, eta: "2027" },
      ],
      askCity: "La tua città non c'è? Lascia il contatto lo stesso: apriamo dove ci chiedete di aprire.",
    },

    final: {
      title: "Oggi decidi tu.",
      titleEm: "O decidiamo noi.",
      sub: "Entra nella beta. Servono trenta secondi e un numero di telefono.",
      storesLabel: "In arrivo su App Store",
    },

    stats: {
      members: "in lista",
      thisWeek: "questa settimana",
      cities: "città live",
    },

    footer: {
      tag: "Un prodotto miutifin. Costruito a Milano.",
      links: [
        { label: "Come funziona", href: "#how" },
        { label: "Città", href: "#cities" },
        { label: "Privacy", href: "/privacy" },
        { label: "Termini", href: "/terms" },
      ],
      studio: "miutifin.com",
      rights: "Tutti i diritti riservati.",
    },
  },

  en: {
    nav: {
      back: "miutifin",
      cta: "Join the list",
      language: "Language",
    },

    hero: {
      eyebrow: "Private beta · Milan",
      line1: "Today",
      line2: "I'm out",
      rotating: [
        "seeing an exhibition.",
        "playing padel.",
        "at the theatre.",
        "eating something good.",
        "and I've no idea where.",
      ],
      sub: "Three experiences picked for you, near where you are, for the hours you actually have free. Exhibitions, sport, gigs, places to eat. No endless feed to dig through.",

      tabPhone: "Phone",
      tabEmail: "Email",
      phonePh: "+44 7700 900123",
      emailPh: "your@email.com",
      cta: "Join the list",
      sending: "One sec",
      notePhone: "We message you on WhatsApp when it's your turn. No calls, no spam.",
      noteEmail: "One email, when a spot opens in your city.",
      consent: "I agree to be contacted about the beta. I've read the ",
      privacy: "privacy policy",
      successTitle: "You're in.",
      successDesc: "We'll reach out when a spot opens in your city. No filler in the meantime.",
      errors: {
        consent: "We need your consent before we can write to you.",
        invalidPhone: "That number doesn't look right.",
        invalidEmail: "That email doesn't look right.",
        already: "You're already on the list. We'll be in touch.",
        robot: "Verification failed. Reload the page and try again.",
        tooMany: "Too many attempts. Try again in an hour.",
        generic: "That didn't go through. Try again in a moment.",
        network: "Connection dropped. Try again.",
      },

      cardsLabel: "Today in Milan",
      matchLabel: "match",
      cards: [
        { time: "11:00", title: "Photography exhibition", meta: "Tortona · 2.1 km · €12", match: "94" },
        { time: "13:00", title: "Neighbourhood lunch", meta: "Navigli · 1.4 km · €18", match: "89" },
        { time: "15:30", title: "Padel, court free", meta: "Bicocca · 3.8 km · €9/h", match: "91" },
        { time: "18:30", title: "Rooftop aperitivo", meta: "Isola · 800 m · €15", match: "88" },
        { time: "20:45", title: "Theatre, early show", meta: "Porta Romana · 4.2 km · €22", match: "93" },
        { time: "23:00", title: "Courtyard gig", meta: "Lambrate · 3.4 km · €15", match: "86" },
      ],
    },

    statement: {
      pre: "The problem isn't",
      em: "what to do.",
      post: "It's deciding.",
      sub: "You've got two free hours on a Tuesday afternoon, or a whole Sunday. You search for twenty minutes, poll three friends, and end up staying in. ESCO picks for you, and gets it right.",
    },

    how: {
      label: "How it works",
      items: [
        { n: "01", t: "Say where you're at", d: "How much time you have, who you're with, what you feel like today. Three taps, not a questionnaire." },
        { n: "02", t: "ESCO picks", d: "It reads the city live — what's open now, how far, what it costs — and gives you three options. Not thirty." },
        { n: "03", t: "Go", d: "Book from the app where you can. The rest of the day is yours." },
      ],
    },

    cities: {
      label: "Where we are",
      title: "Milan now. The rest shortly.",
      live: "Live",
      soon: "Soon",
      items: [
        { name: "Milan", live: true },
        { name: "Rome", live: false, eta: "Q4 2026" },
        { name: "London", live: false, eta: "Q4 2026" },
        { name: "Barcelona", live: false, eta: "Q4 2026" },
        { name: "Paris", live: false, eta: "Q1 2027" },
        { name: "Berlin", live: false, eta: "Q1 2027" },
        { name: "Lisbon", live: false, eta: "Q1 2027" },
        { name: "New York", live: false, eta: "2027" },
      ],
      askCity: "Your city missing? Leave your contact anyway — we open where you ask us to.",
    },

    final: {
      title: "Today you decide.",
      titleEm: "Or we decide for you.",
      sub: "Join the beta. Takes thirty seconds and a phone number.",
      storesLabel: "Coming to the App Store",
    },

    stats: {
      members: "on the list",
      thisWeek: "this week",
      cities: "cities live",
    },

    footer: {
      tag: "A miutifin product. Built in Milan.",
      links: [
        { label: "How it works", href: "#how" },
        { label: "Cities", href: "#cities" },
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
      ],
      studio: "miutifin.com",
      rights: "All rights reserved.",
    },
  },
} as const;

export function useEscoCopy(locale: string) {
  return ESCO_CONTENT[(locale === "en" ? "en" : "it") as Locale];
}