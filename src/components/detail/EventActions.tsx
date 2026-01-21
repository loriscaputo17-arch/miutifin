"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import {
  Share2,
  Facebook,
  Link as LinkIcon,
  MessageCircle,
  Send,
  Twitter,
  Linkedin,
  Instagram,
  Download,
} from "lucide-react";

type Props = {
  eventId: string;
  title: string;
  description: string;
  sourceUrl?: string;
};

const API = process.env.NEXT_PUBLIC_API_URL!;

export default function EventActions({
  eventId,
  title,
  description,
  sourceUrl,
}: Props) {
  const supabase = createSupabaseBrowserClient();

  const [liked, setLiked] = useState(false);
  const [going, setGoing] = useState(false);
  const [goingCount, setGoingCount] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const [loading, setLoading] =
    useState<"like" | "going" | "flyer" | null>(null);

  const shareRef = useRef<HTMLDivElement>(null);
  const pageUrl =
    typeof window !== "undefined" ? window.location.href : "";

  /* ---------------------------
     LOAD STATES
  --------------------------- */

  useEffect(() => {
    const load = async () => {
      const session = (await supabase.auth.getSession()).data.session;
      if (!session) return;

      const [favRes, goingRes] = await Promise.all([
        fetch(
          `${API}/favorites/check?entity_type=event&entity_id=${eventId}`,
          {
            headers: { Authorization: `Bearer ${session.access_token}` },
          }
        ),
        fetch(
          `${API}/going/check?event_id=${eventId}`,
          {
            headers: { Authorization: `Bearer ${session.access_token}` },
          }
        ),
      ]);

      if (favRes.ok) {
        const json = await favRes.json();
        setLiked(json.liked);
      }

      if (goingRes.ok) {
        const json = await goingRes.json();
        setGoing(json.going);
      }
    };

    load();
  }, [eventId]);

  useEffect(() => {
    fetch(`${API}/going/count?event_id=${eventId}`, { cache: "no-store" })
      .then((r) => r.ok && r.json())
      .then((j) => j && setGoingCount(j.count));
  }, [eventId]);

  /* ---------------------------
     ACTIONS
  --------------------------- */

  const toggleLike = async () => {
    setLoading("like");
    const session = (await supabase.auth.getSession()).data.session;

    await fetch(`${API}/favorites`, {
      method: liked ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({
        entity_type: "event",
        entity_id: eventId,
      }),
    });

    setLiked((v) => !v);
    setLoading(null);
  };

  const toggleGoing = async () => {
    setLoading("going");
    const session = (await supabase.auth.getSession()).data.session;
    if (!session) return setLoading(null);

    await fetch(`${API}/going`, {
      method: going ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ event_id: eventId }),
    });

    setGoing((v) => {
      setGoingCount((c) => c + (v ? -1 : 1));
      return !v;
    });

    setLoading(null);
  };

  const downloadFlyer = async () => {
    try {
      setLoading("flyer");

      const res = await fetch(`${API}/events/${eventId}/flyer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          page_url: pageUrl,
        }),
      });

      if (!res.ok) throw new Error();

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `miutifin-${eventId}.png`;
      a.click();

      URL.revokeObjectURL(url);
      setShareOpen(false);
    } finally {
      setLoading(null);
    }
  };

  /* ---------------------------
     SHARE
  --------------------------- */

  const share = {
    whatsapp: () =>
      window.open(
        `https://wa.me/?text=${encodeURIComponent(
          `${title} ${pageUrl}`
        )}`,
        "_blank"
      ),
    telegram: () =>
      window.open(
        `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}`,
        "_blank"
      ),
    twitter: () =>
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}`,
        "_blank"
      ),
    facebook: () =>
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          pageUrl
        )}`,
        "_blank"
      ),
    linkedin: () =>
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          pageUrl
        )}`,
        "_blank"
      ),
    copy: async () => {
      await navigator.clipboard.writeText(pageUrl);
    },
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setShareOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ---------------------------
     RENDER
  --------------------------- */

  return (
    <div className="flex flex-wrap gap-3 mt-4 items-center relative">

      <button
        onClick={toggleLike}
        disabled={loading === "like"}
        className={`px-4 py-2 rounded-full border transition
          ${
            liked
              ? "bg-white text-black"
              : "border-white/15 text-white/80 hover:bg-white/10"
          }`}
      >
        {liked ? "Saved" : "Save"}
      </button>

      <button
        onClick={toggleGoing}
        disabled={loading === "going"}
        className={`px-4 py-2 rounded-full border transition
          ${
            going
              ? "bg-white text-black"
              : "border-white/15 text-white/80 hover:bg-white/10"
          }`}
      >
        {going ? "Going" : "I'm going"}
      </button>

      <div className="relative" ref={shareRef}>
        <button
          onClick={() => setShareOpen((v) => !v)}
          className="px-4 py-2 rounded-full border border-white/15 text-white/80 hover:bg-white/10"
        >
          Share
        </button>

        <AnimatePresence>
          {shareOpen && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="absolute left-0 mt-2 w-56 rounded-xl bg-[#0b0b0b] border border-white/10 shadow-xl"
            >
              <ShareItem icon={<MessageCircle size={16} />} label="WhatsApp" onClick={share.whatsapp} />
              <ShareItem icon={<Send size={16} />} label="Telegram" onClick={share.telegram} />
              <ShareItem icon={<Twitter size={16} />} label="Twitter" onClick={share.twitter} />
              <ShareItem icon={<Facebook size={16} />} label="Facebook" onClick={share.facebook} />
              <ShareItem icon={<Linkedin size={16} />} label="LinkedIn" onClick={share.linkedin} />
              <div className="h-px bg-white/10 my-1" />
              <ShareItem icon={<Download size={16} />} label="Download flyer" onClick={downloadFlyer} />
              <ShareItem icon={<LinkIcon size={16} />} label="Copy link" onClick={share.copy} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-sm text-white/50">
        Attendees: {goingCount}
      </div>
    </div>
  );
}

function ShareItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:bg-white/10 transition"
    >
      {icon}
      {label}
    </button>
  );
}
