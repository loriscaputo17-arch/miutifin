"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
  url: string;
};

export default function BookingModal({ open, onClose, url }: Props) {
  const [mounted, setMounted] = useState(false);

  // mount portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // ESC to close
  useEffect(() => {
    if (!open) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            style={{ zIndex: 9998 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="
              fixed inset-x-0 bottom-0
              md:inset-0 md:flex md:items-center md:justify-center
            "
            style={{ zIndex: 9999 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div
              className="
                relative bg-black
                w-full
                h-[95vh]
                md:h-[95vh]
                md:w-[90vw]
                lg:w-[90vw]
                rounded-t-2xl md:rounded-2xl
                overflow-hidden
                border border-white/10
              "
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={onClose}
                className="
                  absolute top-3 right-3 z-10
                  h-9 w-9 rounded-full
                  bg-black/70 border border-white/20
                  text-white flex items-center justify-center
                  hover:bg-white hover:text-black transition
                "
              >
                ✕
              </button>

              {/* Iframe */}
              <iframe
                src={url}
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
