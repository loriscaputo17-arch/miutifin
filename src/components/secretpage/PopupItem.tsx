"use client";

import { X } from "lucide-react";

type PopupItemProps = {
  selected: any;
  onClose: () => void;
};

export function PopupItem({ selected, onClose }: PopupItemProps) {
  if (!selected) return null;

  const price =
    selected.priceLevel
      ? "€".repeat(selected.priceLevel)
      : "—";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-6 rounded-3xl overflow-hidden bg-black border border-white/10 animate-fadeIn">
        
        {/* CLOSE */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="
            absolute top-4 right-4 z-10
            rounded-full p-2
            bg-black/60 backdrop-blur
            border border-white/10
            text-white/60
            hover:text-white hover:bg-black/80
            transition
          "
        >
          <X className="w-4 h-4" />
        </button>

        {/* IMAGE */}
        <div
          className="h-64 bg-cover bg-center"
          style={{
            backgroundImage: selected.imageUrl
              ? `url(${selected.imageUrl})`
              : undefined,
          }}
        />

        {/* CONTENT */}
        <div className="p-6 space-y-4">
          
          {/* CATEGORY */}
          <span className="inline-block text-xs uppercase tracking-widest text-red-500">
            {selected.category || selected.type}
          </span>

          {/* TITLE */}
          <h3 className="text-xl font-medium">
            {selected.title}
          </h3>

          {/* META */}
          <div className="space-y-1">
            <p className="text-sm text-white/60">
              {selected.address}
            </p>

            <div className="flex items-center gap-3 text-sm text-white/50">
              <span>{price}</span>
              <span className="opacity-40">•</span>
              <span className="capitalize">{selected.type}</span>
            </div>
          </div>

          {/* NOTE */}
          <p className="text-xs text-white/40 mt-2">
            Some experiences are intentionally hidden.
            <br />
            Access may be limited.
          </p>

          {/* CTA */}
          <button
            onClick={onClose}
            className="mt-4 w-full rounded-lg bg-white text-black py-3 text-md font-medium hover:bg-gray-200 transition"
          >
            If you want to access this experience,
            <br />
            join the platform
          </button>
        </div>
      </div>
    </div>
  );
}
