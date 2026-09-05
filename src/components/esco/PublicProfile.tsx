"use client";

import { motion } from "framer-motion";
import { ESCO_TOKENS } from "@/components/esco/theme";
import { EscoNavbar } from "@/components/esco/Navbar";
import { EscoFooter } from "@/components/esco/Footer";

const ACCENT: Record<string, string> = {
  member: "#C1121F", dj: "#1D3557", format: "#7B2CBF",
  concierge: "#B08968", chef: "#2D6A4F",
};
const LABEL: Record<string, string> = {
  member: "Member", dj: "DJ", format: "Format",
  concierge: "Concierge", chef: "Chef",
};

const S = `
.p-wrap{padding:clamp(7rem,12vw,9rem) 0 clamp(3rem,6vw,5rem)}
.p-top{display:flex;align-items:flex-start;justify-content:space-between;gap:2rem}
.p-eyebrow{font-family:var(--e-fm);font-size:11px;letter-spacing:.24em;text-transform:uppercase;font-weight:700}
.p-name{font-family:var(--e-fd);font-size:clamp(2.6rem,7vw,4.2rem);font-weight:400;letter-spacing:-.045em;line-height:1.02;color:var(--e-ink);margin:.4rem 0 0}
.p-city{margin-top:.9rem;font-size:15px;color:var(--e-mut);}
.p-tagline{margin-top:1.5rem;font-size:clamp(1.15rem,2.4vw,1.5rem);color:var(--e-ink);letter-spacing:-.02em;max-width:34ch;line-height:1.35}
.p-bio{margin-top:1rem;font-size:16px;color:var(--e-mut);line-height:1.6;max-width:52ch}
.p-avatar{width:clamp(120px,22vw,180px);height:clamp(120px,22vw,180px);border-radius:50%;object-fit:cover;background:var(--e-paper-3);border:1px solid var(--e-line);flex-shrink:0}
.p-verified{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;color:#fff;font-size:13px;margin-left:10px;vertical-align:middle}
.p-genres{display:flex;gap:7px;flex-wrap:wrap;margin-top:1.4rem}
.p-genre{padding:5px 12px;border:1px solid var(--e-line);border-radius:100px;font-family:var(--e-fm);font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--e-mut)}
.p-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:2rem}
.p-links{display:flex;gap:10px;flex-wrap:wrap;margin-top:1.4rem; margin-bottom:1.4rem}
.p-link{display:inline-flex;align-items:center;gap:7px;padding:9px 16px;border:1px solid var(--e-line);border-radius:100px;font-size:14px;color:var(--e-mut);background:var(--e-paper-2);transition:color .2s,border-color .2s}
.p-link:hover{color:var(--e-ink);border-color:var(--e-line-3)}
.p-sec{margin-top:clamp(3rem,7vw,5rem);padding-top:2.2rem;border-top:1px solid var(--e-line)}
.p-sec-lab{font-family:var(--e-fm);font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--e-mut-2);margin-bottom:1.4rem}
.p-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:18px}
.p-card{max-width:280px;border-radius:16px;overflow:hidden;background:var(--e-paper-2);border:1px solid var(--e-line)}
.p-card img{width:100%;aspect-ratio:.82;object-fit:cover;display:block;background:var(--e-paper-3)}
.p-card-b{padding:.9rem 1rem 1.1rem}
.p-card-t{font-family:var(--e-fd);font-size:1.05rem;font-weight:600;letter-spacing:-.025em;color:var(--e-ink);line-height:1.2}
.p-card-m{font-family:var(--e-fm);font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;margin-top:.5rem}
.p-cta{margin-top:clamp(3.5rem,8vw,6rem);padding:clamp(2.2rem,5vw,3.2rem);border-radius:22px;background:var(--e-paper-2);border:1px solid var(--e-line);text-align:center;position:relative;overflow:hidden}
.p-cta::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 70% at 50% 40%,rgba(216,72,28,.11),transparent 70%);pointer-events:none}
.p-cta-in{position:relative;z-index:1}
.p-cta h2{font-family:var(--e-fd);font-size:clamp(1.7rem,4.5vw,2.6rem);font-weight:600;letter-spacing:-.04em;color:var(--e-ink);line-height:1.08}
.p-cta h2 em{font-style:italic;font-weight:400;color:var(--e-ac-b)}
.p-cta p{margin-top:.9rem;font-size:16px;color:var(--e-mut);max-width:44ch;margin-inline:auto;line-height:1.55}
.p-cta .e-btn{margin-top:1.8rem}
.p-card-a{display:block;transition:border-color .2s ease,transform .2s ease}
.p-card-a:hover{border-color:var(--e-line-3);transform:translateY(-2px)}
.p-card-link{font-family:var(--e-fm);font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;font-weight:700;margin-top:.6rem}
@media(max-width:600px){
  .p-wrap{padding:6rem 0 3rem}
  .p-top{flex-direction:column;align-items:flex-start;gap:1.6rem}
  .p-top > div{order:2;flex:1 1 auto}
  .p-avatar{order:1;width:170px;height:170px}
  .p-name{font-size:2.4rem}
  .p-tagline{max-width:100%}
  .p-bio{max-width:100%}
  .p-grid{grid-template-columns:repeat(2,1fr);gap:12px}
  .p-actions{width:100%}
  .p-actions .e-btn{flex:1 1 auto;justify-content:center}
  .p-grid{grid-template-columns:repeat(2,1fr);gap:12px}
  .p-card{max-width:none}
}
`;

export default function PublicProfile({ data }: { data: any }) {
  const p = data.profile;
  const accent = ACCENT[p.profile_kind] ?? ACCENT.member;
  const isPro = p.profile_kind !== "member";
  const wa = p.whatsapp_number?.replace(/[^0-9]/g, "");

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: `${p.nickname} — ESCO`, url }); } catch {}
    } else {
      navigator.clipboard.writeText(url);
    }
  };

  return (
    <div className="esco-root">
      <style>{ESCO_TOKENS}</style>
      <style>{S}</style>
      <div className="e-grain" />
      <EscoNavbar />

      <main>
        <section className="p-wrap">
          <div className="e-wrap">
            <motion.div className="p-top"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={{ flex: "1 1 320px" }}>
                {isPro && (
                  <div className="p-eyebrow" style={{ color: accent }}>
                    {LABEL[p.profile_kind]}
                  </div>
                )}
                <h1 className="p-name">
                  {p.nickname}
                  {p.is_verified && (
                    <span className="p-verified" style={{ background: accent }}>✓</span>
                  )}
                </h1>
                {p.city_name && <div className="p-city">{p.city_name}</div>}
                {p.tagline && <p className="p-tagline">{p.tagline}</p>}
                {p.bio && <p className="p-bio">{p.bio}</p>}

                {p.genres?.length > 0 && (
                  <div className="p-genres">
                    {p.genres.map((g: string) => (
                      <span className="p-genre" key={g}>{g}</span>
                    ))}
                  </div>
                )}

                <div className="p-actions">
                  {wa && (
                    <a
                      className="e-btn e-btn-p"
                      href={`https://wa.me/${wa}?text=${encodeURIComponent(`Hi ${p.nickname}, I found you on ESCO.`)}`}
                      target="_blank" rel="noopener noreferrer"
                    >
                      Text me <span className="e-arr">→</span>
                    </a>
                  )}
                  <button type="button" className="p-link" onClick={share}>
                    Share this profile
                  </button>
                </div>

                <div className="p-links">
                  {p.instagram_handle && (
                    <a className="p-link" target="_blank" rel="noopener noreferrer"
                       href={`https://instagram.com/${p.instagram_handle.replace(/^@/, "")}`}>
                      @{p.instagram_handle.replace(/^@/, "")}
                    </a>
                  )}
                  {p.website_url && (
                    <a className="p-link" href={p.website_url} target="_blank" rel="noopener noreferrer">
                      Website ↗
                    </a>
                  )}
                </div>
              </div>

              {p.avatar_url && (
                <img className="p-avatar" src={p.avatar_url} alt={p.nickname} />
              )}
            </motion.div>

            {data.upcoming.map((e: any) => {
                    const href = e.ticket_url || e.website_url;
                    const Card = (
                      <>
                        {e.cover_image && <img src={e.cover_image} alt="" />}
                        <div className="p-card-b">
                          <div className="p-card-t">{e.title}</div>
                          <div className="p-card-m" style={{ color: accent }}>
                            {new Date(e.start_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                            {e.venue_name ? ` · ${e.venue_name}` : ""}
                          </div>
                          {href && (
                            <div className="p-card-link" style={{ color: accent }}>
                              {e.ticket_url ? "Tickets" : "More"} ↗
                            </div>
                          )}
                        </div>
                      </>
                    );
                    return href ? (
                      <a className="p-card p-card-a" key={e.id} href={href}
                         target="_blank" rel="noopener noreferrer">{Card}</a>
                    ) : (
                      <article className="p-card" key={e.id}>{Card}</article>
                    );
                  })}

                              {data.places.map((v: any) => {
                    const href =
                      v.booking_url ||
                      v.website_url ||
                      (v.instagram_handle
                        ? `https://instagram.com/${v.instagram_handle.replace(/^@/, "")}`
                        : null);
                    const Card = (
                      <>
                        {v.cover_image && <img src={v.cover_image} alt="" />}
                        <div className="p-card-b">
                          <div className="p-card-t">{v.name}</div>
                          {v.category && (
                            <div className="p-card-m" style={{ color: "var(--e-mut-2)" }}>{v.category}</div>
                          )}
                          {href && (
                            <div className="p-card-link" style={{ color: accent }}>
                              {v.booking_url ? "Book" : "Visit"} ↗
                            </div>
                          )}
                        </div>
                      </>
                    );
                    return href ? (
                      <a className="p-card p-card-a" key={v.id} href={href}
                         target="_blank" rel="noopener noreferrer">{Card}</a>
                    ) : (
                      <article className="p-card" key={v.id}>{Card}</article>
                    );
                  })}

            <motion.div className="p-cta"
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }} transition={{ duration: .5 }}
            >
              <div className="p-cta-in">
                <h2>The rest is <em>inside the app.</em></h2>
                <p>
                  ESCO is by invitation. Places, nights and routes written for you —
                  in nine cities.
                </p>
                <a href="/esco#join" className="e-btn e-btn-p">
                  Request an invite <span className="e-arr">→</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
        <EscoFooter />
      </main>
    </div>
  );
}