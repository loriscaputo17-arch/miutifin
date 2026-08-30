"use client";

import { useLocale } from "next-intl";
import { useEscoCopy } from "@/components/esco/content";

const S = `
.e-foot{border-top:1px solid var(--e-line);padding:2.6rem 0 2.2rem}
.e-foot-in{
  display:flex;align-items:center;justify-content:space-between;gap:1.5rem;flex-wrap:wrap;
}
.e-foot-brand{display:flex;align-items:center;gap:11px}
.e-foot-logo{
  width:38px;height:38px;border-radius:11px;background:var(--e-paper-2);border:1px solid var(--e-line);
  display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;
}
.e-foot-logo img{width:38px;height:38px;object-fit:contain}
.e-foot-name{font-family:var(--e-fd);font-size:22px;font-weight:600;letter-spacing:-.05em;color:var(--e-ink)}
.e-foot-tag{font-size:14.5px;color:var(--e-mut);margin-top:2px;letter-spacing:-.01em}
.e-foot-links{display:flex;gap:22px;flex-wrap:wrap}
.e-foot-links a{font-size:14.5px;color:var(--e-mut);transition:color .18s ease}
.e-foot-links a:hover{color:var(--e-ink)}
.e-foot-bottom{
  display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap;
  margin-top:2.2rem;padding-top:1.3rem;border-top:1px solid var(--e-line);
  font-family:var(--e-fm);font-size:12px;color:var(--e-mut-2);letter-spacing:.04em;
}
.e-foot-bottom a:hover{color:var(--e-ink)}
@media(max-width:600px){
  .e-foot{padding:2.2rem 0 1.8rem}
  .e-foot-in{flex-direction:column;align-items:flex-start;gap:1.6rem}
  .e-foot-links{gap:14px 20px}
  .e-foot-bottom{margin-top:1.8rem;flex-direction:column;align-items:flex-start;gap:.6rem;font-size:11.5px}
}
`;

export function EscoFooter() {
  const locale = useLocale();
  const c = useEscoCopy(locale);

  return (
    <>
      <style>{S}</style>
      <footer className="e-foot">
        <div className="e-wrap">
          <div className="e-foot-in">
            <div className="e-foot-brand">
              <span className="e-foot-logo"><img src="/images/esco_colored_logo.png" alt="" /></span>
              <div>
                <div className="e-foot-name">ESCO</div>
                <div className="e-foot-tag">{c.footer.tag}</div>
              </div>
            </div>
            <div className="e-foot-links">
              {c.footer.links.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
            </div>
          </div>
          <div className="e-foot-bottom">
            <span>© {new Date().getFullYear()} Miutifin — {c.footer.rights}</span>
            <a href={`/${locale}`}>{c.footer.studio} ↗</a>
          </div>
        </div>
      </footer>
    </>
  );
}