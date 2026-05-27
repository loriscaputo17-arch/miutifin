"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const STYLES = `
  .sc{background:#fff;border:1px solid rgba(26,24,21,0.10);border-radius:14px;padding:16px;position:relative}
  .sc.dragging{opacity:.5;border-color:#dc2626}
  .sc-head{display:grid;grid-template-columns:32px 56px 1fr auto;gap:12px;align-items:center;margin-bottom:12px}
  .sc-handle{cursor:grab;color:rgba(26,24,21,0.32);font-size:18px;font-weight:700;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:8px;transition:background .15s;user-select:none;letter-spacing:-2px}
  .sc-handle:hover{background:rgba(26,24,21,0.05);color:#1a1815}
  .sc-handle:active{cursor:grabbing}
  .sc-num{width:32px;height:32px;border-radius:50%;background:#dc2626;color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700}
  .sc-thumb{width:56px;height:56px;border-radius:10px;background:#e8dfd1;object-fit:cover}
  .sc-info{min-width:0}
  .sc-name{font-size:13px;font-weight:600;color:#1a1815;letter-spacing:-0.1px;line-height:1.3}
  .sc-meta{font-size:10px;color:rgba(26,24,21,0.55);display:flex;gap:8px;margin-top:3px}
  .sc-kind{font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:1px 6px;border-radius:100px}
  .sc-kind.place{background:rgba(26,24,21,0.08);color:#1a1815}
  .sc-kind.event{background:rgba(220,38,38,0.10);color:#dc2626}
  .sc-remove{background:transparent;border:none;color:rgba(26,24,21,0.42);font-size:18px;cursor:pointer;padding:6px;border-radius:8px;transition:all .15s}
  .sc-remove:hover{background:rgba(184,57,47,0.10);color:#b8392f}
  .sc-body{display:flex;flex-direction:column;gap:10px;padding-top:8px;border-top:1px solid rgba(26,24,21,0.05)}
  .sc-row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px}
  @media(max-width:640px){.sc-row{grid-template-columns:1fr}}
  .sc-field{display:flex;flex-direction:column;gap:3px}
  .sc-label{font-size:10px;font-weight:600;color:rgba(26,24,21,0.55);letter-spacing:.05em;text-transform:uppercase}
  .sc-input,.sc-select,.sc-textarea{padding:8px 11px;border:1px solid rgba(26,24,21,0.10);border-radius:8px;font-size:12px;background:#fafaf7;font-family:inherit;color:#1a1815;letter-spacing:-0.1px}
  .sc-input:focus,.sc-select:focus,.sc-textarea:focus{outline:none;border-color:#dc2626;background:#fff}
  .sc-textarea{resize:vertical;min-height:60px;line-height:1.4}
  .sc-transit{background:#f5f0e8;border-radius:10px;padding:10px 14px;margin-top:8px;display:flex;flex-direction:column;gap:6px}
  .sc-transit-label{font-size:9px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(26,24,21,0.55)}
  .sc-transit-row{display:grid;grid-template-columns:1fr 1fr;gap:8px}
`;

const TRANSIT_OPTIONS = [
  { value: "", label: "—" },
  { value: "walk", label: "Walk" },
  { value: "transit", label: "Transit" },
  { value: "taxi", label: "Taxi" },
  { value: "bike", label: "Bike" },
  { value: "car", label: "Car" },
];

export interface JourneyStep {
  entity_type: "place" | "event";
  entity_id: string;
  entity_name: string;
  entity_cover: string | null;
  entity_address: string | null;
  entity_lat?: number | null;
  entity_lng?: number | null;
  note: string;
  suggested_time: string;
  duration_min: string;
  next_transit_mode: string;
  next_duration_min: string;
  next_note: string;
}

interface StepCardProps {
  id: string;
  step: JourneyStep;
  index: number;
  isLast: boolean;
  onChange: (updates: Partial<JourneyStep>) => void;
  onRemove: () => void;
}

export function StepCard({ id, step, index, isLast, onChange, onRemove }: StepCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <style>{STYLES}</style>
      <div ref={setNodeRef} style={style} className={`sc ${isDragging ? "dragging" : ""}`}>
        <div className="sc-head">
          <div className="sc-handle" {...attributes} {...listeners}>⋮⋮</div>
          <div className="sc-num">{index + 1}</div>
          {step.entity_cover ? (
            <img src={step.entity_cover} alt="" className="sc-thumb" />
          ) : (
            <div className="sc-thumb" />
          )}
          <div className="sc-info">
            <div className="sc-name">{step.entity_name}</div>
            <div className="sc-meta">
              <span className={`sc-kind ${step.entity_type}`}>{step.entity_type}</span>
              {step.entity_address && <span>{step.entity_address}</span>}
            </div>
          </div>
          <button type="button" className="sc-remove" onClick={onRemove}>×</button>
        </div>

        <div className="sc-body">
          <div className="sc-row">
            <div className="sc-field">
              <label className="sc-label">Suggested time</label>
              <input
                className="sc-input"
                value={step.suggested_time}
                onChange={(e) => onChange({ suggested_time: e.target.value })}
                placeholder="e.g. 11:00, around sunset"
              />
            </div>
            <div className="sc-field">
              <label className="sc-label">Duration (min)</label>
              <input
                className="sc-input"
                value={step.duration_min}
                onChange={(e) => onChange({ duration_min: e.target.value })}
                type="number"
                min="0"
                placeholder="60"
              />
            </div>
          </div>

          <div className="sc-field">
            <label className="sc-label">Editorial note</label>
            <textarea
              className="sc-textarea"
              value={step.note}
              onChange={(e) => onChange({ note: e.target.value })}
              placeholder="What makes this step special. Specific detail, sensorial."
            />
          </div>

          {!isLast && (
            <div className="sc-transit">
              <div className="sc-transit-label">Then go to the next step</div>
              <div className="sc-transit-row">
                <div className="sc-field">
                  <label className="sc-label">By</label>
                  <select
                    className="sc-select"
                    value={step.next_transit_mode}
                    onChange={(e) => onChange({ next_transit_mode: e.target.value })}
                  >
                    {TRANSIT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
                <div className="sc-field">
                  <label className="sc-label">Minutes</label>
                  <input
                    className="sc-input"
                    value={step.next_duration_min}
                    onChange={(e) => onChange({ next_duration_min: e.target.value })}
                    type="number"
                    min="0"
                    placeholder="10"
                  />
                </div>
              </div>
              <div className="sc-field">
                <label className="sc-label">Transit note (optional)</label>
                <input
                  className="sc-input"
                  value={step.next_note}
                  onChange={(e) => onChange({ next_note: e.target.value })}
                  placeholder="e.g. 'Take the side streets, not Corso Buenos Aires'"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}