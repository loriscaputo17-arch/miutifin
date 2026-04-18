"use client";

import { useState } from "react";

const S = `

  /* FOOTER */
  .footer{border-top:1px solid var(--b);padding:clamp(3rem,6vw,5rem) clamp(1rem,5vw,3rem) clamp(1.3rem,3vw,2rem)}
  .footer-inner{max-width:1200px;margin:0 auto}
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
  .f-social a{width:28px;height:28px;border-radius:6px;border:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;font-size:11px;color:rgba(255,255,255,0.25);font-weight:700;transition:all .2s}
  .f-social a:hover{border-color:rgba(220,38,38,0.26);color:var(--r);background:rgba(220,38,38,0.04)}
  .f-bottom{padding-top:1.3rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px}
  .f-copy{font-size:11px;color:rgba(255,255,255,0.13);letter-spacing:-0.01em}
  .f-built{font-size:11px;color:rgba(255,255,255,0.1);display:flex;align-items:center;gap:5px}
  .f-built span{color:var(--r);font-size:9px}
`;

export function Footer() {

  return (
    <>
        <style>{S}</style>

    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div className="nav-logo-box"><img src="/logo_small_trasparent.png" alt="miutifin" /></div>
              <span style={{ fontWeight: 800, fontSize: 14, letterSpacing: "-0.02em" }}>miutifin</span>
            </div>
            <p className="f-brand-tag">The future<br />starts <span>here.</span></p>
            <p className="f-brand-desc">Global tech agency. Senior teams in 7 countries delivering AI, software, robotics, growth and strategy — at prices that make sense.</p>
            <div className="f-social">
              <a href="https://www.linkedin.com/company/miutifin" title="LinkedIn">in</a>
              <a href="https://www.instagram.com/miutifinglobal" title="Instagram">ig</a>
            </div>
          </div>
          <div>
            <h4 className="f-col-title">Services</h4>
            <ul className="f-links">{["Software Development","Artificial Intelligence","Video AI","SEO & Marketing","Startup Support","Robotics"].map(s => <li key={s}><a href="#services">{s}</a></li>)}</ul>
          </div>
          <div>
            <h4 className="f-col-title">Company</h4>
            <ul className="f-links">{[{l:"About us",h:"/about"},{l:"Process",h:"#process"},{l:"Case studies",h:"#"},{l:"FAQ",h:"#faq"},{l:"Privacy Policy",h:"/privacy"},{l:"Terms",h:"/terms"}].map(x => <li key={x.l}><a href={x.h}>{x.l}</a></li>)}</ul>
          </div>
          <div>
            <h4 className="f-col-title">Get in touch</h4>
            <div className="f-ci"><div className="f-ci-icon">@</div><div><div className="f-ci-l">Email</div><div className="f-ci-v"><a href="mailto:miutifin.ask@gmail.com">miutifin.ask@gmail.com</a></div></div></div>
            <div className="f-ci"><div className="f-ci-icon">◎</div><div><div className="f-ci-l">Presence</div><div className="f-ci-v">US · UK · AU · DE · FR · ES · IT</div></div></div>
            <div className="f-ci"><div className="f-ci-icon">⬡</div><div><div className="f-ci-l">Response</div><div className="f-ci-v">Within 24h guaranteed</div></div></div>
            <div style={{ marginTop: "1.3rem" }}><a href="#contact" className="btn-r" style={{ fontSize: 13, padding: "9px 18px" }}>Start now →</a></div>
          </div>
        </div>
        <div className="f-bottom">
          <p className="f-copy">© {new Date().getFullYear()} Miutifin — Worldwide</p>
          <p className="f-built">Built with <span>♥</span> and culture.</p>
        </div>
      </div>
    </footer>
    </>
  );
}
