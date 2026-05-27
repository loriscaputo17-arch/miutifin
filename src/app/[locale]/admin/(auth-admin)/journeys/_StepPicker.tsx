"use client";

import { useState, useEffect, useRef } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

const STYLES = `
  .sp{position:relative;width:100%}
  .sp-input{padding:11px 14px;border:1px solid rgba(26,24,21,0.10);border-radius:10px;font-size:13px;background:#fff;font-family:inherit;color:#1a1815;letter-spacing:-0.1px;width:100%;transition:all .15s}
  .sp-input:focus{outline:none;border-color:#dc2626}
  .sp-results{position:absolute;top:calc(100% + 4px);left:0;right:0;background:#fff;border:1px solid rgba(26,24,21,0.10);border-radius:12px;max-height:320px;overflow-y:auto;z-index:10;box-shadow:0 8px 24px rgba(0,0,0,0.08)}
  .sp-item{display:grid;grid-template-columns:42px 1fr;gap:10px;padding:8px;cursor:pointer;border-bottom:1px solid rgba(26,24,21,0.05);align-items:center;transition:background .12s}
  .sp-item:last-child{border-bottom:none}
  .sp-item:hover{background:#f5f0e8}
  .sp-thumb{width:42px;height:42px;border-radius:8px;background:#e8dfd1;object-fit:cover;flex-shrink:0}
  .sp-info{min-width:0}
  .sp-name{font-size:12px;font-weight:600;color:#1a1815;letter-spacing:-0.1px;line-height:1.3;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .sp-meta{display:flex;gap:6px;align-items:center;font-size:10px;color:rgba(26,24,21,0.55);margin-top:2px}
  .sp-kind{font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:1px 6px;border-radius:100px}
  .sp-kind.place{background:rgba(26,24,21,0.08);color:#1a1815}
  .sp-kind.event{background:rgba(220,38,38,0.10);color:#dc2626}
  .sp-empty{padding:18px;text-align:center;font-style:italic;color:rgba(26,24,21,0.42);font-size:12px}
`;

interface Entity {
  entity_type: "place" | "event";
  entity_id: string;
  name: string;
  cover_image: string | null;
  address: string | null;
}

interface StepPickerProps {
  cityId: string;
  onPick: (entity: Entity) => void;
}

export function StepPicker({ cityId, onPick }: StepPickerProps) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Entity[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const sb = createSupabaseBrowserClient();

  // Click outside chiude
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Search debounced
  useEffect(() => {
    if (!cityId) {
      setResults([]);
      return;
    }
    const t = setTimeout(async () => {
      setLoading(true);
      const { data } = await sb.rpc("admin_search_entities", {
        p_city_id: cityId,
        p_search: search.trim() || "",
        p_limit: 30,
      });
      setLoading(false);
      setResults((data ?? []) as Entity[]);
    }, 200);
    return () => clearTimeout(t);
  }, [search, cityId]);

  const pick = (e: Entity) => {
    onPick(e);
    setSearch("");
    setOpen(false);
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="sp" ref={wrapRef}>
        <input
          type="text"
          className="sp-input"
          placeholder={cityId ? "Search a place or event to add..." : "Pick a city first"}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          disabled={!cityId}
        />

        {open && cityId && (
          <div className="sp-results">
            {loading ? (
              <div className="sp-empty">Searching...</div>
            ) : results.length === 0 ? (
              <div className="sp-empty">No matches.</div>
            ) : (
              results.map((r) => (
                <div
                  key={`${r.entity_type}-${r.entity_id}`}
                  className="sp-item"
                  onClick={() => pick(r)}
                >
                  {r.cover_image ? (
                    <img src={r.cover_image} alt="" className="sp-thumb" />
                  ) : (
                    <div className="sp-thumb" />
                  )}
                  <div className="sp-info">
                    <div className="sp-name">{r.name}</div>
                    <div className="sp-meta">
                      <span className={`sp-kind ${r.entity_type}`}>{r.entity_type}</span>
                      {r.address && <span>{r.address}</span>}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}