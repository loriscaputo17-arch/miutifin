"use client";

import { useLocale } from "next-intl";
import { SocialLinks } from "@/components/homepage/SocialIcons";
import { useCopy } from "@/components/homepage/content";

const S = `
.mf-foot{border-top:1px solid var(--mf-line);background:var(--mf-bg);overflow:hidden}
.mf-foot-grid{
  display:grid;grid-template-columns:1.6fr 1fr 1fr 1.2fr;gap:clamp(2rem,5vw,4rem);
  padding:clamp(3.5rem,6vw,5rem) 0 clamp(2.5rem,5vw,3.5rem);
}
@media(max-width:860px){.mf-foot-grid{grid-template-columns:1fr 1fr;row-gap:2.5rem}}
@media(max-width:520px){.mf-foot-grid{grid-template-columns:1fr}}

.mf-foot-logo{display:flex;align-items:center;gap:11px}
.mf-foot-logo-box{
  width:40px;height:40px;border-radius:11px;background:var(--mf-bg-3);border:1px solid var(--mf-line);
  display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;
}
.mf-foot-logo-box img{width:24px;height:24px;object-fit:contain}
.mf-foot-logo-name{font-family:var(--mf-fd);font-size:22px;font-weight:600;letter-spacing:-.035em;color:var(--mf-ink)}
.mf-foot-logo-name b{color:var(--mf-red-b);font-weight:600}

.mf-foot-tag{font-size:15.5px;color:var(--mf-mut);line-height:1.6;max-width:30ch;margin:1.2rem 0 1.6rem;letter-spacing:-.01em}
.mf-foot-social{display:flex;gap:12px}
.mf-foot-social a{
  width:38px;height:38px;border:1px solid var(--mf-line);border-radius:10px;
  display:flex;align-items:center;justify-content:center;color:var(--mf-mut);
  transition:border-color .18s ease,color .18s ease;
}
.mf-foot-social a:hover{border-color:var(--mf-line-3);color:var(--mf-ink)}

.mf-foot-h{
  font-family:var(--mf-fm);font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;
  color:var(--mf-mut-2);margin-bottom:1.1rem;
}
.mf-foot-links{display:flex;flex-direction:column;gap:12px}
.mf-foot-links a{font-size:15.5px;color:var(--mf-mut);transition:color .18s ease;letter-spacing:-.01em}
.mf-foot-links a:hover{color:var(--mf-ink)}
.mf-foot-val{font-size:15.5px;color:var(--mf-ink-2);letter-spacing:-.01em}
.mf-foot-val a:hover{color:var(--mf-red-b)}
.mf-foot-val + .mf-foot-h{margin-top:1.5rem}

.mf-foot-bottom{
  display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap;
  padding:1.4rem 0;border-top:1px solid var(--mf-line);
  font-family:var(--mf-fm);font-size:12px;letter-spacing:.04em;color:var(--mf-mut-2);
}
.mf-foot-bottom .mf-dot{width:6px;height:6px;border-radius:50%;background:#22c55e;display:inline-block;margin-right:7px}

.mf-foot-mark{
  font-family:var(--mf-fd);font-weight:600;
  font-size:clamp(4rem,17vw,15rem);line-height:.78;letter-spacing:-.055em;
  color:rgba(247,247,245,0.05);
  margin-bottom:-.14em;user-select:none;pointer-events:none;white-space:nowrap;
}
.mf-foot-mark b{color:rgba(255,95,82,0.14);font-weight:600}
`;

export function Footer() {
  const locale = useLocale();
  const c = useCopy(locale);

  return (
    <>
      <style>{S}</style>
      <footer className="mf-foot">
        <div className="mf-wrap">
          <div className="mf-foot-grid">
            <div>
              <div className="mf-foot-logo">
                <span className="mf-foot-logo-box"><img src="/logo_small_trasparent.png" alt="" /></span>
                <span className="mf-foot-logo-name">miutifin<b>.</b></span>
              </div>
              <p className="mf-foot-tag">{c.footer.tagline}</p>
              <SocialLinks className="mf-foot-social" size={19} />
            </div>

            <div>
              <div className="mf-foot-h">{c.footer.colProduct}</div>
              <ul className="mf-foot-links">
                {c.footer.product.map(l => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
              </ul>
            </div>

            <div>
              <div className="mf-foot-h">{c.footer.colCompany}</div>
              <ul className="mf-foot-links">
                {c.footer.company.map(l => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
              </ul>
            </div>

            <div>
              <div className="mf-foot-h">{c.contact.emailLabel}</div>
              <div className="mf-foot-val">
                <a href={`mailto:${c.contact.email}`}>{c.contact.email}</a>
              </div>
              <div className="mf-foot-h">{c.contact.whereLabel}</div>
              <div className="mf-foot-val">{c.contact.where}</div>
              <div className="mf-foot-h">{c.footer.responseLabel}</div>
              <div className="mf-foot-val">{c.footer.responseValue}</div>
            </div>
          </div>

          <div className="mf-foot-bottom">
            <span><span className="mf-dot" />{c.footer.status}</span>
            <span>© {new Date().getFullYear()} miutifin — {c.footer.rights}</span>
          </div>

          <div className="mf-foot-mark" aria-hidden>miutifin<b>.</b></div>
        </div>
      </footer>
    </>
  );
}