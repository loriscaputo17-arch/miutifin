"use client";

import { useState } from "react";
import BookingModal from "./BookingModal";

type Props = {
  price?: number;
  priceLevel?: 1 | 2 | 3 | null;

  date?: string;
  endDate?: string;

  location?: string;
  openHours?: string;
  crowdLevel?: "low" | "medium" | "high";

  source_url?: string;
};

export default function InfoSidebar({
  price,
  priceLevel,
  date,
  endDate,
  location,
  openHours,
  crowdLevel,
  source_url,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-[#0c0c0c]/70 border border-white/5 rounded-2xl p-5 backdrop-blur space-y-4">

        {/* PRICE */}
        {price !== undefined && (
          <div>
            <div className="text-2xl font-semibold text-white">
              €{price}
              <span className="text-sm text-white/40 ml-1">
                per person
              </span>
            </div>

            {priceLevel && (
              <div className="text-xs text-white/40 mt-1">
                {"€".repeat(priceLevel)} budget
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        <button
          onClick={() => setOpen(true)}
          disabled={!source_url}
          className="w-full bg-white text-black py-3 rounded-lg font-medium disabled:opacity-40"
        >
          Tickets
        </button>

        <div className="text-xs text-white/40 text-center">
          Via main platform
        </div>
      </div>

      {source_url && (
        <BookingModal
          open={open}
          onClose={() => setOpen(false)}
          url={source_url}
        />
      )}
    </>
  );
}
