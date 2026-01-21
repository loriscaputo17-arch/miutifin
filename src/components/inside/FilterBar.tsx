"use client";

import { useState } from "react";

/* ----------------------------------
   TYPES
---------------------------------- */

export type TimeFilter = "now" | "today" | "tonight" | "weekend";

export type Filters = {
  time: TimeFilter;
  price: (1 | 2 | 3)[];
  types: ("event" | "place" | "activity" | "journey")[];
};

type Props = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

const TIMES: { label: string; value: TimeFilter }[] = [
  { label: "Now", value: "now" },
  { label: "Today", value: "today" },
  { label: "Tonight", value: "tonight" },
  { label: "Weekend", value: "weekend" },
];

const PRICES: (1 | 2 | 3)[] = [1, 2, 3];

const timeLabelMap: Record<TimeFilter, string> = {
  now: "Now",
  today: "Today",
  tonight: "Tonight",
  weekend: "Weekend",
};

function getBudgetLabel(price: (1 | 2 | 3)[]) {
  if (price.length === 0) return "Any budget";
  if (price.length === 1) return "€".repeat(price[0]);
  return "Budget";
}


export default function FilterBar({ filters, setFilters }: Props) {
  const [open, setOpen] = useState<null | "time" | "price" | "mobile">(null);

  return (
    <div className="px-6 mt-6">

      {/* =======================
          DESKTOP FILTERS
      ======================= */}
      <div className="hidden md:flex gap-4">

        {/* TIME */}
        <Dropdown
            label={timeLabelMap[filters.time]}
            open={open === "time"}
            onToggle={() => setOpen(open === "time" ? null : "time")}
        >
          {TIMES.map((t) => (
            <Option
              key={t.value}
              active={filters.time === t.value}
              onClick={() => {
                setFilters((f) => ({ ...f, time: t.value }));
                setOpen(null);
              }}
            >
              {t.label}
            </Option>
          ))}
        </Dropdown>

        {/* PRICE */}
        <Dropdown
            label={getBudgetLabel(filters.price)}
            open={open === "price"}
            onToggle={() => setOpen(open === "price" ? null : "price")}
        >
          {PRICES.map((p) => (
            <Option
              key={p}
              active={filters.price.includes(p)}
              onClick={() =>
                setFilters((f) => ({
                  ...f,
                  price: f.price.includes(p)
                    ? f.price.filter((x) => x !== p)
                    : [...f.price, p],
                }))
              }
            >
              {"€".repeat(p)}
            </Option>
          ))}
        </Dropdown>

      </div>

      {/* =======================
          MOBILE FILTERS
      ======================= */}
      <div className="md:hidden relative">
        <button
          onClick={() => setOpen(open === "mobile" ? null : "mobile")}
          className="w-full py-3 rounded-xl bg-white/10 text-white text-sm"
        >
          Filters
        </button>

        {open === "mobile" && (
          <div className="mt-4 space-y-5 bg-black absolute w-[100%] z-10 border border-white/10 rounded-2xl p-4">

            {/* TIME */}
            <div>
              <p className="text-xs text-white/40 mb-2">When</p>
              <div className="grid grid-cols-2 gap-2">
                {TIMES.map((t) => (
                  <MobileOption
                    key={t.value}
                    active={filters.time === t.value}
                    onClick={() =>
                      setFilters((f) => ({ ...f, time: t.value }))
                    }
                  >
                    {t.label}
                  </MobileOption>
                ))}
              </div>
            </div>

            {/* PRICE */}
            <div>
              <p className="text-xs text-white/40 mb-2">Budget</p>
              <div className="flex gap-2">
                {PRICES.map((p) => (
                  <MobileOption
                    key={p}
                    active={filters.price.includes(p)}
                    onClick={() =>
                      setFilters((f) => ({
                        ...f,
                        price: f.price.includes(p)
                          ? f.price.filter((x) => x !== p)
                          : [...f.price, p],
                      }))
                    }
                  >
                    {"€".repeat(p)}
                  </MobileOption>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

/* ----------------------------------
   UI HELPERS
---------------------------------- */

function Dropdown({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="px-4 py-2 rounded-full bg-white/10 text-white text-sm"
      >
        {label} ▾
      </button>

      {open && (
        <div className="absolute mt-2 w-40 bg-black border border-white/10 rounded-xl overflow-hidden z-50">
          {children}
        </div>
      )}
    </div>
  );
}

function Option({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 text-sm transition
        ${
          active
            ? "bg-white text-black"
            : "text-white/70 hover:bg-white/10"
        }
      `}
    >
      {children}
    </button>
  );
}

function MobileOption({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm transition flex-1
        ${
          active
            ? "bg-white text-black"
            : "bg-white/10 text-white/70"
        }
      `}
    >
      {children}
    </button>
  );
}
