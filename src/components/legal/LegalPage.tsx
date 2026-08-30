"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { TOKENS } from "@/components/homepage/theme";
import { Navbar } from "@/components/homepage/Navbar";
import { Footer } from "@/components/homepage/Footer";
import type { Block, LegalDoc } from "@/components/legal/legal-types";

/* ============================================================
   Impaginazione condivisa da privacy e termini.
   Usa i token della home: niente CSS della landing importato
   a peso morto per una pagina di testo.
   ============================================================ */

const S = `
.lg-page{padding:clamp(7rem,11vw,9.5rem) 0 clamp(4rem,8vw,6rem)}
.lg-wrap{max-width:820px;margin:0 auto;padding:0 var(--mf-pad)}

.lg-back{
  display:inline-flex;align-items:center;gap:8px;height:38px;padding:0 16px;
  border:1px solid var(--mf-line);border-radius:100px;background:transparent;
  font-size:13.5px;color:var(--mf-mut);transition:border-color .18s ease,color .18s ease;
}
.lg-back:hover{border-color:var(--mf-ink);color:var(--mf-ink)}

.lg-head{padding-bottom:2.2rem;margin-bottom:2.5rem;border-bottom:1px solid var(--mf-line)}
.lg-head h1{margin:1.2rem 0 0}
.lg-meta{display:flex;flex-wrap:wrap;gap:.9rem 2.4rem;margin-top:1.7rem}
.lg-meta div{display:flex;flex-direction:column;gap:5px}
.lg-meta .l{font-family:var(--mf-fm);font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--mf-mut-2)}
.lg-meta .v{font-size:14.5px;color:var(--mf-ink-2)}

.lg-toc{
  border:1px solid var(--mf-line);border-radius:var(--mf-r);
  background:var(--mf-bg-2);padding:1.6rem;margin-bottom:3.5rem;
}
.lg-toc-l{font-family:var(--mf-fm);font-size:10.5px;letter-spacing:.13em;text-transform:uppercase;color:var(--mf-mut-2);margin-bottom:1.1rem}
.lg-toc ol{display:grid;grid-template-columns:1fr 1fr;gap:.6rem 1.5rem;list-style:none}
@media(max-width:640px){.lg-toc ol{grid-template-columns:1fr}}
.lg-toc a{font-size:14.5px;color:var(--mf-mut);letter-spacing:-.01em;transition:color .18s ease}
.lg-toc a:hover{color:var(--mf-red-b)}

.lg-sec{margin-bottom:3.2rem;scroll-margin-top:100px}
.lg-sec h2{
  font-family:var(--mf-fd);font-size:clamp(1.25rem,2vw,1.5rem);font-weight:600;
  letter-spacing:-.026em;color:var(--mf-ink);margin-bottom:1.1rem;
}
.lg-sec h3{
  font-family:var(--mf-fd);font-size:1.05rem;font-weight:600;letter-spacing:-.02em;
  color:var(--mf-ink-2);margin:2rem 0 .9rem;
}
.lg-sec p{font-size:15.5px;line-height:1.72;color:var(--mf-mut);letter-spacing:-.008em;margin-bottom:1rem}
.lg-sec p strong,.lg-sec li strong{color:var(--mf-ink);font-weight:600}
.lg-sec a{color:var(--mf-ink);text-decoration:underline;text-underline-offset:3px}
.lg-sec a:hover{color:var(--mf-red-b)}

.lg-ul{margin-bottom:1.2rem}
/* NIENTE flex su li: in un contenitore flex ogni frammento di testo
   diventa un elemento a se', quindi un <strong> a meta' frase spezza
   la riga in tre blocchi separati dal gap. Pallino in posizione
   assoluta: il testo resta un flusso continuo. */
.lg-ul li{
  position:relative;padding-left:22px;margin-bottom:.7rem;
  font-size:15.5px;line-height:1.65;color:var(--mf-mut);letter-spacing:-.008em;
}
.lg-ul li:last-child{margin-bottom:0}
.lg-ul li::before{
  content:'';position:absolute;left:0;top:.62em;
  width:6px;height:6px;border-radius:2px;background:var(--mf-red-b);
}

.lg-note{
  border-left:2px solid var(--mf-line-3);padding:.2rem 0 .2rem 1.1rem;margin:1.2rem 0;
  font-size:14.5px;line-height:1.65;color:var(--mf-mut-2);letter-spacing:-.008em;
}

.lg-table-wrap{overflow-x:auto;margin:1.2rem 0 1.4rem;-webkit-overflow-scrolling:touch}
.lg-table{width:100%;border-collapse:collapse;min-width:460px}
.lg-table th{
  text-align:left;padding:.8rem 1rem .8rem 0;border-bottom:1px solid var(--mf-line);
  font-family:var(--mf-fm);font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;
  color:var(--mf-mut-2);font-weight:500;white-space:nowrap;
}
.lg-table td{
  padding:.85rem 1rem .85rem 0;border-bottom:1px solid var(--mf-line-2);
  font-size:14.5px;line-height:1.55;color:var(--mf-mut);vertical-align:top;letter-spacing:-.008em;
}
.lg-table td:first-child{color:var(--mf-ink-2);padding-right:1.5rem}
.lg-table td strong{color:var(--mf-ink)}

.lg-foot{
  margin-top:3.5rem;padding-top:1.6rem;border-top:1px solid var(--mf-line);
  font-size:13.5px;color:var(--mf-mut-2);line-height:1.6;
}
`;

/* Grassetto con **doppio asterisco** e link con [testo](url):
   evita di duplicare ogni frase in JSX per una parola in evidenza. */
function rich(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((chunk, i) => {
    if (chunk.startsWith("**") && chunk.endsWith("**")) {
      return <strong key={i}>{chunk.slice(2, -2)}</strong>;
    }
    const link = chunk.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const external = link[2].startsWith("http");
      return (
        <a
          key={i} href={link[2]}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >{link[1]}</a>
      );
    }
    return <React.Fragment key={i}>{chunk}</React.Fragment>;
  });
}

function renderBlock(b: Block, i: number) {
  if ("p" in b) return <p key={i}>{rich(b.p)}</p>;
  if ("h3" in b) return <h3 key={i}>{b.h3}</h3>;
  if ("note" in b) return <p key={i} className="lg-note">{rich(b.note)}</p>;
  if ("ul" in b) {
    return <ul key={i} className="lg-ul">{b.ul.map((li, j) => <li key={j}>{rich(li)}</li>)}</ul>;
  }
  return (
    <div key={i} className="lg-table-wrap">
      <table className="lg-table">
        <thead><tr><th>{b.table.head[0]}</th><th>{b.table.head[1]}</th></tr></thead>
        <tbody>
          {b.table.rows.map((row, j) => (
            <tr key={j}><td>{rich(row[0])}</td><td>{rich(row[1])}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function LegalPage({ doc }: { doc: LegalDoc }) {
  const router = useRouter();

  return (
    <>
      <style>{TOKENS}</style>
      <style>{S}</style>
      <Navbar />

      <main className="lg-page">
        <div className="lg-wrap">
          <button className="lg-back" onClick={() => router.back()}>
            <span aria-hidden>←</span> {doc.back}
          </button>

          <header className="lg-head">
            <span className="mf-lab" style={{ marginTop: "1.8rem" }}>{doc.eyebrow}</span>
            <h1 className="mf-h2">{doc.title}</h1>
            <div className="lg-meta">
              <div><span className="l">{doc.updatedLabel}</span><span className="v">{doc.updated}</span></div>
              <div><span className="l">{doc.versionLabel}</span><span className="v">{doc.version}</span></div>
              <div><span className="l">{doc.scopeLabel}</span><span className="v">{doc.scope}</span></div>
            </div>
          </header>

          <nav className="lg-toc">
            <div className="lg-toc-l">{doc.tocLabel}</div>
            <ol>
              {doc.sections.map(s => (
                <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
              ))}
            </ol>
          </nav>

          {doc.sections.map(s => (
            <section key={s.id} id={s.id} className="lg-sec">
              <h2>{s.title}</h2>
              {s.blocks.map(renderBlock)}
            </section>
          ))}

          <p className="lg-foot">{doc.langNote}</p>
        </div>
      </main>

      <Footer />
    </>
  );
}