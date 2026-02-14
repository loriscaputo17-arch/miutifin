"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

const API = process.env.NEXT_PUBLIC_API_URL;

type Props = {
  eventId: string;
};

export default function QuickRating({ eventId }: Props) {
  const supabase = createSupabaseBrowserClient();

  const [rating, setRating] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // 🔍 carica voto esistente
  useEffect(() => {
    const loadMyRating = async () => {
      const session = (await supabase.auth.getSession()).data.session;
      if (!session) {
        setLoaded(true);
        return;
      }

      try {
        const res = await fetch(
          `${API}/ratings/my?event_id=${eventId}`,
          {
            headers: {
              Authorization: `Bearer ${session.access_token}`,
            },
          }
        );

        if (!res.ok) throw new Error();

        const json = await res.json();

        if (typeof json.rating === "number") {
          setRating(json.rating);
          setHasVoted(true);
        }
      } catch {
        // silent fail
      } finally {
        setLoaded(true);
      }
    };

    loadMyRating();
  }, [eventId]);

  // ⭐ invia / aggiorna voto
  const handleRate = async (value: number) => {
    if (loading) return;

    setRating(value);      // optimistic UI
    setHasVoted(true);
    setLoading(true);

    const session = (await supabase.auth.getSession()).data.session;
    if (!session) {
      setLoading(false);
      return;
    }

    try {
      await fetch(`${API}/ratings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          event_id: eventId,
          rating: value,
        }),
      });
    } catch {
      // opzionale: rollback UI
    } finally {
      setLoading(false);
    }
  };

  // ⏳ loading iniziale
  if (!loaded) {
    return (
      <div className="mt-8 text-white/40 text-sm">
        Caricamento voto...
      </div>
    );
  }

  return (
    <div className="mt-8 md:mb-0 mb-36">
      <p className="text-white mb-2 text-sm">
        Valuta l’evento
      </p>

      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => handleRate(n)}
            disabled={loading}
            aria-label={`Vota ${n} stelle`}
            className={`text-2xl transition
              ${
                rating !== null && n <= rating
                  ? "text-yellow-400"
                  : "text-white/30 hover:text-white/60"
              }
              ${loading ? "opacity-60 cursor-not-allowed" : ""}
            `}
          >
            ★
          </button>
        ))}
      </div>

      {/* feedback chiaro */}
      {hasVoted ? (
        <p className="text-white/60 text-sm mt-2">
          Hai votato{" "}
          <span className="text-yellow-400 font-medium">
            {"★".repeat(rating ?? 0)}
          </span>
          <span className="text-white/40">
            {" "}
            ({rating}/5)
          </span>
        </p>
      ) : (
        <p className="text-white/40 text-sm mt-2">
          Tocca una stella per votare
        </p>
      )}
    </div>
  );
}
