"use client";

import { useEffect, useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

/* ============================================================
   Campi del draft, al posto della textarea JSON.

   Il payload resta un oggetto: questo componente lo legge e lo
   riscrive campo per campo. Chi vuole ancora il JSON grezzo ha
   l'interruttore in alto — su un payload strano e' piu' veloce
   sistemarlo a mano che cercare il campo giusto.

   La CATEGORIA non sta nel payload: e' una colonna del draft.
   L'LLM non la assegna (non conosce i tuoi id) e finora restava
   sempre vuota, per questo la salviamo direttamente qui.
   ============================================================ */

export const DRAFT_FIELDS_CSS = `
  .df-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px 14px}
  @media(max-width:720px){.df-grid{grid-template-columns:1fr}}
  .df-f{display:flex;flex-direction:column;gap:5px}
  .df-f.wide{grid-column:1 / -1}
  .df-l{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(26,24,21,0.55)}
  .df-l .req{color:#dc2626;margin-left:3px}
  .df-l .hint{font-weight:500;letter-spacing:0;text-transform:none;color:rgba(26,24,21,0.42);margin-left:6px;font-size:10px}
  .df-i,.df-t,.df-s{width:100%;padding:10px 12px;border:1px solid rgba(26,24,21,0.10);border-radius:9px;
    font-size:13px;background:#fafaf7;color:#1a1815;outline:none;font-family:inherit;transition:all .15s}
  .df-i:focus,.df-t:focus,.df-s:focus{border-color:#dc2626;background:#fff}
  .df-i.miss,.df-s.miss{border-color:#dc2626;background:rgba(220,38,38,0.04)}
  .df-t{min-height:96px;resize:vertical;line-height:1.55}
  .df-s{cursor:pointer;appearance:none;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath fill='%231a1815' d='M5 6 0 0h10z'/%3E%3C/svg%3E");
    background-repeat:no-repeat;background-position:right 12px center;padding-right:32px}
  .df-mono{font-family:Menlo,Monaco,monospace;font-size:12px}
  .df-switch{display:flex;gap:6px;margin-bottom:16px}
  .df-switch button{background:transparent;border:1px solid rgba(26,24,21,0.10);padding:6px 14px;border-radius:100px;
    font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;font-family:inherit;color:#1a1815}
  .df-switch button.on{background:#1a1815;color:#fff;border-color:#1a1815}
  .df-raw{width:100%;padding:14px;border:1px solid rgba(26,24,21,0.10);border-radius:10px;font-size:12px;
    background:#fafaf7;font-family:Menlo,Monaco,monospace;color:#1a1815;outline:none;min-height:440px;resize:vertical;line-height:1.55}
  .df-raw:focus{border-color:#dc2626;background:#fff}
  .df-raw.bad{border-color:#b8392f;background:rgba(184,57,47,0.04)}
  .df-warn{background:rgba(220,38,38,0.05);border:1px solid rgba(220,38,38,0.20);border-radius:9px;
    padding:10px 12px;font-size:12px;color:#b8392f;margin-bottom:14px;line-height:1.5}
  .df-extra{margin-top:14px;padding-top:12px;border-top:1px solid rgba(26,24,21,0.06);
    font-size:11px;color:rgba(26,24,21,0.42);font-family:Menlo,monospace;line-height:1.6}
`;

type Payload = Record<string, any>;
type Cat = { id: string; name: string; slug: string; type: string };

/* Solo i campi che esistono davvero in tabella: scriverne altri
   li fa scartare silenziosamente dall'import. */
const CAMPI_EVENT = [
  "title", "slug", "description", "start_at", "end_at", "venue_name",
  "price_min", "price_max", "ticket_url", "website_url", "phone",
  "booking_email", "cover_image", "lat", "lng", "popularity", "place_id",
];
const CAMPI_PLACE = [
  "name", "slug", "description", "address", "lat", "lng", "price_level",
  "popularity", "cover_image", "website_url", "phone", "instagram_handle",
  "whatsapp_number", "booking_url", "booking_email",
];

/* ISO con fuso  <->  valore di <input type="datetime-local"> */
function isoToLocal(iso?: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}
function localToIso(v: string): string | null {
  if (!v) return null;
  const d = new Date(v);
  if (isNaN(d.getTime())) return null;
  // offset italiano: +02:00 da marzo a ottobre, +01:00 il resto
  const m = d.getMonth() + 1;
  const off = m >= 3 && m <= 10 ? "+02:00" : "+01:00";
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(m)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}:00${off}`;
}

export function DraftFields({
  kind, payload, onChange, draftId, cityId, categoryId, onCategoryChange,
}: {
  kind: "place" | "event";
  payload: Payload;
  onChange: (next: Payload) => void;
  draftId: string;
  cityId?: string | null;
  categoryId?: string | null;
  onCategoryChange?: (id: string | null) => void;
}) {
  const sb = createSupabaseBrowserClient();
  const [mode, setMode] = useState<"form" | "json">("form");
  const [raw, setRaw] = useState(() => JSON.stringify(payload, null, 2));
  const [cats, setCats] = useState<Cat[]>([]);

  useEffect(() => {
    sb.from("categories").select("id, name, slug, type").eq("type", kind)
      .order("name")
      .then(({ data }) => setCats((data as Cat[]) || []));
  }, [kind, sb]);

  // il JSON grezzo si risincronizza solo quando si entra in quella vista
  useEffect(() => {
    if (mode === "json") setRaw(JSON.stringify(payload, null, 2));
  }, [mode]); // eslint-disable-line react-hooks/exhaustive-deps

  const set = (k: string, v: any) => {
    const next = { ...payload };
    if (v === "" || v === null || v === undefined) delete next[k];
    else next[k] = v;
    onChange(next);
  };

  const setCategoria = async (id: string) => {
    onCategoryChange?.(id || null);
    // la categoria e' una colonna del draft: si salva subito, senza
    // aspettare "Save changes" che riguarda solo il payload
    await sb.from("content_drafts").update({ category_id: id || null }).eq("id", draftId);
  };

  const noti = kind === "event" ? CAMPI_EVENT : CAMPI_PLACE;
  const extra = useMemo(
    () => Object.keys(payload).filter((k) => !noti.includes(k)),
    [payload, noti],
  );

  const mancanti = useMemo(() => {
    const out: string[] = [];
    if (kind === "event") {
      if (!payload.title) out.push("titolo");
      if (!payload.start_at) out.push("data e ora");
    } else {
      if (!payload.name) out.push("nome");
    }
    if (!payload.slug) out.push("slug");
    if (!cityId) out.push("città");
    if (!categoryId) out.push("categoria");
    return out;
  }, [payload, kind, cityId, categoryId]);

  const F = ({ k, label, tipo = "text", hint, wide, req }: {
    k: string; label: string; tipo?: string; hint?: string; wide?: boolean; req?: boolean;
  }) => (
    <div className={`df-f${wide ? " wide" : ""}`}>
      <label className="df-l">
        {label}{req && <span className="req">*</span>}
        {hint && <span className="hint">{hint}</span>}
      </label>
      <input
        className={`df-i${req && !payload[k] ? " miss" : ""}${tipo === "url" ? " df-mono" : ""}`}
        type={tipo === "number" ? "number" : "text"}
        value={payload[k] ?? ""}
        onChange={(e) =>
          set(k, tipo === "number"
            ? (e.target.value === "" ? "" : Number(e.target.value))
            : e.target.value)}
      />
    </div>
  );

  return (
    <>
      <div className="df-switch">
        <button type="button" className={mode === "form" ? "on" : ""} onClick={() => setMode("form")}>Campi</button>
        <button type="button" className={mode === "json" ? "on" : ""} onClick={() => setMode("json")}>JSON</button>
      </div>

      {mancanti.length > 0 && (
        <div className="df-warn">
          <strong>Manca {mancanti.join(", ")}.</strong> Senza questi la pubblicazione
          viene rifiutata dall'import.
        </div>
      )}

      {mode === "json" ? (
        <textarea
          className={`df-raw${(() => { try { JSON.parse(raw); return ""; } catch { return " bad"; } })()}`}
          value={raw}
          spellCheck={false}
          onChange={(e) => {
            setRaw(e.target.value);
            try { onChange(JSON.parse(e.target.value)); } catch { /* si scrive: non e' ancora valido */ }
          }}
        />
      ) : (
        <>
          <div className="df-grid">
            <div className="df-f">
              <label className="df-l">Categoria<span className="req">*</span>
                <span className="hint">salvata subito</span>
              </label>
              <select
                className={`df-s${!categoryId ? " miss" : ""}`}
                value={categoryId || ""}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="">— scegli —</option>
                {cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            {kind === "event" ? (
              <>
                <F k="title" label="Titolo" req wide />
                <F k="slug" label="Slug" req hint="minuscolo, con trattini" />
                <F k="venue_name" label="Nome della sala" hint="come scritto in origine" />

                <div className="df-f">
                  <label className="df-l">Inizio<span className="req">*</span></label>
                  <input
                    className={`df-i${!payload.start_at ? " miss" : ""}`}
                    type="datetime-local"
                    value={isoToLocal(payload.start_at)}
                    onChange={(e) => set("start_at", localToIso(e.target.value))}
                  />
                </div>
                <div className="df-f">
                  <label className="df-l">Fine<span className="hint">se nota</span></label>
                  <input
                    className="df-i"
                    type="datetime-local"
                    value={isoToLocal(payload.end_at)}
                    onChange={(e) => set("end_at", localToIso(e.target.value))}
                  />
                </div>

                <F k="price_min" label="Prezzo da" tipo="number" hint="0 se gratuito" />
                <F k="price_max" label="Prezzo a" tipo="number" />
                <F k="ticket_url" label="Link biglietti" tipo="url" wide />
                <F k="website_url" label="Sito" tipo="url" />
                <F k="phone" label="Telefono" />
              </>
            ) : (
              <>
                <F k="name" label="Nome" req wide />
                <F k="slug" label="Slug" req />
                <F k="address" label="Indirizzo" hint="via e civico: serve al geocoding" />
                <F k="price_level" label="Fascia di prezzo" tipo="number" hint="1-4" />
                <F k="popularity" label="Popolarità" tipo="number" />
                <F k="website_url" label="Sito" tipo="url" />
                <F k="phone" label="Telefono" />
                <F k="instagram_handle" label="Instagram" hint="senza @" />
                <F k="whatsapp_number" label="WhatsApp" />
                <F k="booking_url" label="Link prenotazione" tipo="url" />
                <F k="booking_email" label="Email prenotazione" />
              </>
            )}

            <div className="df-f wide">
              <label className="df-l">Descrizione</label>
              <textarea
                className="df-t"
                value={payload.description ?? ""}
                onChange={(e) => set("description", e.target.value)}
              />
            </div>

            <F k="lat" label="Latitudine" tipo="number" hint="vuota: la mette il resolver" />
            <F k="lng" label="Longitudine" tipo="number" />
            <F k="cover_image" label="Immagine" tipo="url" wide />
          </div>

          {extra.length > 0 && (
            <div className="df-extra">
              Campi nel payload che la tabella non ha: {extra.join(", ")}.
              Vengono ignorati dall'import — guardali nella vista JSON.
            </div>
          )}
        </>
      )}
    </>
  );
}