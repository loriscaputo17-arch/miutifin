"use client";

import { useTranslations } from "next-intl";
import { SocialLinks } from "@/components/homepage/SocialIcons";

const S = `
  /* FOOTER */
  .footer{border-top:1px solid var(--b);padding:clamp(3rem,6vw,5rem) clamp(1rem,5vw,3rem) clamp(1.3rem,3vw,2rem)}
  .footer-inner{max-width:70vw;margin:0 auto}
  @media(max-width:780px){.footer-inner{max-width:95vw;}}

  .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1.2fr;gap:clamp(2rem,5vw,4rem);padding-bottom:2.8rem;border-bottom:1px solid var(--b)}
  @media(max-width:860px){.footer-grid{grid-template-columns:1fr 1fr}}
  @media(max-width:520px){.footer-grid{grid-template-columns:1fr}}
  .f-brand-tag{font-size:1.45rem;font-weight:800;letter-spacing:-0.04em;color:#fff;line-height:1.15;margin:1.1rem 0 .85rem}
  .f-brand-tag span{color:var(--r)}
  .f-brand-desc{font-size:13px;color:rgba(255,255,255,0.24);line-height:1.8;max-width:270px}
  .f-col-title{font-size:10px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,0.16);margin-bottom:1rem}
  .f-links{list-style:none;display:flex;flex-direction:column;gap:8px}
  .f-links a{font-size:13px;color:rgba(255,255,255,0.28);transition:color .2s;letter-spacing:-0.01em}
  .f-links a:hover{color:#fff}
  .f-ci{display:flex;align-items:flex-start;gap:9px;margin-bottom:11px}
  .f-ci-icon{width:26px;height:26px;border-radius:6px;background:rgba(220,38,38,0.05);border:1px solid rgba(220,38,38,0.1);display:flex;align-items:center;justify-content:center;font-size:10px;flex-shrink:0;margin-top:1px;color:var(--r)}
  .f-ci-l{font-size:10px;color:rgba(255,255,255,0.2);margin-bottom:2px;font-weight:600;letter-spacing:.05em;text-transform:uppercase}
  .f-ci-v{font-size:13px;color:rgba(255,255,255,0.55);letter-spacing:-0.01em}
  .f-ci-v a{color:rgba(255,255,255,0.55);transition:color .2s}
  .f-ci-v a:hover{color:#fff}
  .f-social{display:flex;gap:7px;margin-top:1.3rem}
  .f-social a{width:30px;height:30px;border-radius:7px;border:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.35);transition:all .2s}
  .f-social a:hover{border-color:rgba(220,38,38,0.26);color:var(--r);background:rgba(220,38,38,0.04);transform:scale(1.1)}
  .f-bottom{padding-top:1.3rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px}
  .f-copy{font-size:11px;color:rgba(255,255,255,0.13);letter-spacing:-0.01em}
  .f-built{font-size:11px;color:rgba(255,255,255,0.1);display:flex;align-items:center;gap:5px}
  .f-built span{color:var(--r);font-size:9px}
  .btn-r{border-radius: 100px;}

  .nav-logo-box{width:30px;height:30px;border-radius:7px;background:var(--rg);border:1px solid rgba(220,38,38,0.28);display:flex;align-items:center;justify-content:center;overflow:hidden}
  .nav-logo-box img{width:18px;height:14px;object-fit:contain}
`;

type CompanyLink = { label: string; href: string };

export function Footer() {
  const t = useTranslations("footer");
  const services = t.raw("services") as string[];
  const company = t.raw("company") as CompanyLink[];

  return (
    <>
      <style>{S}</style>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div className="nav-logo-box">
                  <img src="/logo_small_trasparent.png" alt="miutifin" />
                </div>
                <span style={{ fontWeight: 800, fontSize: 14, letterSpacing: "-0.02em" }}>miutifin</span>
              </div>
              <p className="f-brand-tag">
                {t("tagline1")}<br />
                {t("tagline2")} <span>{t("tagline2Highlight")}</span>
              </p>
              <p className="f-brand-desc">{t("description")}</p>
              <SocialLinks className="f-social" size={16} />
            </div>

            {/* Services */}
            <div>
              <h4 className="f-col-title">{t("columns.services")}</h4>
              <ul className="f-links">
                {services.map(s => (
                  <li key={s}><a href="#services">{s}</a></li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="f-col-title">{t("columns.company")}</h4>
              <ul className="f-links">
                {company.map(x => (
                  <li key={x.label}><a href={x.href}>{x.label}</a></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="f-col-title">{t("columns.contact")}</h4>
              <div className="f-ci">
                <div className="f-ci-icon">@</div>
                <div>
                  <div className="f-ci-l">{t("info.emailLabel")}</div>
                  <div className="f-ci-v">
                    <a href="mailto:miutifin.ask@gmail.com">miutifin.ask@gmail.com</a>
                  </div>
                </div>
              </div>
              <div className="f-ci">
                <div className="f-ci-icon">◎</div>
                <div>
                  <div className="f-ci-l">{t("info.presenceLabel")}</div>
                  <div className="f-ci-v">{t("info.presenceValue")}</div>
                </div>
              </div>
              <div className="f-ci">
                <div className="f-ci-icon">⬡</div>
                <div>
                  <div className="f-ci-l">{t("info.responseLabel")}</div>
                  <div className="f-ci-v">{t("info.responseValue")}</div>
                </div>
              </div>
              <div style={{ marginTop: "1.3rem" }}>
                <a href="#contact" className="btn-r" style={{ fontSize: 13, padding: "9px 18px" }}>
                  {t("cta")} →
                </a>
              </div>
            </div>
          </div>

          <div className="f-bottom">
            <p className="f-copy">© {new Date().getFullYear()} {t("copyright")}</p>
            <p className="f-built">
              {t("builtWith")} <span>♥</span> {t("builtWithSuffix")}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}