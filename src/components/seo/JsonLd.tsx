import { SITE_URL } from "@/lib/seo";

/* ============================================================
   Dati strutturati.
   Servono a due cose concrete: far comparire il pannello a
   destra nei risultati di Google (indirizzo, social, logo) e
   far capire ai motori che ESCO e' un prodotto e non una
   pagina qualsiasi.
   ============================================================ */

function Ld({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationLd({ locale }: { locale: string }) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Miutifin",
        url: `${SITE_URL}/${locale}`,
        logo: `${SITE_URL}/logo_small_trasparent.png`,
        email: "miutifin.ask@gmail.com",
        description:
          locale === "en"
            ? "Software house and engineering collective in Milan: AI, digital products, robotics and data systems."
            : "Software house e collettivo di ingegneri a Milano: AI, prodotti digitali, robotica e sistemi dati.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Milano",
          addressCountry: "IT",
          // streetAddress: "[VIA E NUMERO]",   // compila quando hai la sede
          // postalCode: "[CAP]",
        },
        sameAs: [
          "https://www.linkedin.com/company/miutifin",
          "https://www.instagram.com/miutifinglobal",
        ],
      }}
    />
  );
}

export function WebSiteLd({ locale }: { locale: string }) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Miutifin",
        url: `${SITE_URL}/${locale}`,
        inLanguage: locale === "en" ? "en" : "it",
        publisher: { "@type": "Organization", name: "Miutifin" },
      }}
    />
  );
}

export function EscoLd({ locale }: { locale: string }) {
  const en = locale === "en";
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "MobileApplication",
        name: "ESCO",
        applicationCategory: "LifestyleApplication",
        operatingSystem: "iOS",
        url: `${SITE_URL}/${locale}/esco`,
        description: en
          ? "Three experiences picked for you every day: exhibitions, sport, theatre, places to eat, near where you are."
          : "Tre esperienze scelte per te ogni giorno: mostre, sport, teatro, posti dove mangiare, vicino a dove sei.",
        inLanguage: en ? "en" : "it",
        author: { "@type": "Organization", name: "Miutifin", url: SITE_URL },
        // Niente "offers" e niente "aggregateRating" finche' non c'e' un
        // prezzo reale e recensioni vere: inventarli e' una penalizzazione
        // manuale, non un vantaggio.
        audience: {
          "@type": "Audience",
          geographicArea: { "@type": "City", name: "Milano" },
        },
      }}
    />
  );
}