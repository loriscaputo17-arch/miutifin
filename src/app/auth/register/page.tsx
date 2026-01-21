"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

const STEPS = 6;

const DRESSCODES = [
  "Casual",
  "Street",
  "Smart",
  "Elegant",
  "Extravagant",
];

function stepVariants() {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };
}

export default function RegisterPage() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // STEP 1 – AUTH
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // STEP 2 – PROFILE
  const [nickname, setNickname] = useState("");
  const [birthday, setBirthday] = useState("");

  // STEP 3 – PRICE
  const [avgPrice, setAvgPrice] = useState<1 | 2 | 3 | null>(null);

  // STEP 4 – DAY / NIGHT
  const [timePref, setTimePref] = useState<"day" | "night" | null>(null);

  // STEP 5 – MUSIC
  const [music, setMusic] = useState<string[]>([]);

  // STEP 6 – DRESSCODE
  const [dresscode, setDresscode] = useState<string | null>(null);

  const [musicCategories, setMusicCategories] = useState<
    { id: string; name: string }[]
  >([]);

  const [done, setDone] = useState(false);

  useEffect(() => {
    supabase
      .from("categories")
      .select("id,name")
      .eq("type", "music")
      .then(({ data }) => {
        if (data) setMusicCategories(data);
      });
  }, [supabase]);

  const next = () => setStep((s) => Math.min(STEPS, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const toggleArray = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]
    );
  };

  // --------------------------------------------------
  // VALIDATION
  // --------------------------------------------------
  const passwordValid =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password);

  const canContinue = [
    email && phone && passwordValid,
    nickname.length >= 3 && !!birthday,
    avgPrice !== null,
    timePref !== null,
    music.length > 0,
    dresscode !== null,
  ][step - 1];

  // --------------------------------------------------
  // SUBMIT (RPC VERSION – PRODUCTION READY)
  // --------------------------------------------------
  const submit = async () => {
    setLoading(true);
    setErrorMsg(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      phone,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error || !data.user) {
      setErrorMsg(error?.message ?? "Errore registrazione");
      setLoading(false);
      return;
    }

    const userId = data.user.id;

    const { error: rpcError } = await supabase.rpc(
      "complete_registration",
      {
        p_user_id: userId,
        p_nickname: nickname,
        p_birthday: birthday,
        p_avg_price_level: avgPrice,
        p_prefers_day: timePref === "day",
        p_prefers_night: timePref === "night",
        p_dresscode: dresscode,
        p_music_category_ids: music,
      }
    );

    if (rpcError) {
      if (rpcError.message === "NICKNAME_TAKEN") {
        setErrorMsg("Questo nickname è già in uso, scegline un altro.");
        setStep(2); // torni allo step nickname
      } else {
        setErrorMsg("Errore durante la registrazione. Riprova.");
      }

      setLoading(false);
      return;
    }

    setLoading(false);
    setDone(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
      <motion.div className="w-full max-w-xl bg-[#0c0c0c]/80 backdrop-blur-xl rounded-3xl px-10 py-14">

        {/* LOGO */}
        <img
          src="/logo_small_trasparent.png"
          className="h-12 mx-auto mb-6"
          alt="Logo"
        />

        <p className="text-white/50 text-xs text-center mb-6">
          Step {step} / {STEPS}
        </p>

        {errorMsg && (
          <p className="text-red-400 text-xs text-center mb-4">
            {errorMsg}
          </p>
        )}

{done ? (
  <div className="text-center space-y-4">
    <h1 className="text-white text-2xl">Controlla la tua email ✉️</h1>

    <p className="text-white/60 text-sm">
      Ti abbiamo inviato un link per verificare il tuo account.
    </p>

    <p className="text-white/40 text-xs">
      Dopo la conferma potrai accedere e iniziare a usare l’app.
    </p>

    <button
      onClick={() => router.push("/auth/login")}
      className="btn mt-4"
    >
      Vai al login
    </button>
  </div>
) : (
  <AnimatePresence mode="wait">
          {/* STEP 1 */}
          {step === 1 && (
            <motion.div variants={stepVariants()} className="space-y-5">
              <h1 className="title">Crea il tuo account</h1>

              <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input className="input" placeholder="Telefono" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

              <p className="hint">
                Minimo 8 caratteri, una lettera maiuscola e un numero
              </p>

              <button disabled={!canContinue} onClick={next} className="btn">
                Continua
              </button>
            </motion.div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <motion.div variants={stepVariants()} className="space-y-5">
              <h1 className="title">Come possiamo chiamarti?</h1>

              <input className="input" placeholder="Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
              <input type="date" className="input" value={birthday} onChange={(e) => setBirthday(e.target.value)} />

              <p className="hint">Devi avere almeno 18 anni</p>

              <button disabled={!canContinue} onClick={next} className="btn">
                Continua
              </button>
            </motion.div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <motion.div variants={stepVariants()} className="space-y-6">
              <h1 className="title">Quanto spendi di solito?</h1>

              <div className="flex justify-center gap-4">
                {[1, 2, 3].map((v) => (
                  <button
                    key={v}
                    onClick={() => setAvgPrice(v as any)}
                    className={`price ${avgPrice === v && "active"}`}
                  >
                    {"€".repeat(v)}
                  </button>
                ))}
              </div>

              <button disabled={!canContinue} onClick={next} className="btn">
                Continua
              </button>
            </motion.div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <motion.div variants={stepVariants()} className="space-y-6">
              <h1 className="title">Che tipo di persona sei?</h1>

              <div className="flex gap-4 justify-center">
                <button onClick={() => setTimePref("day")} className={`chip ${timePref === "day" && "active"}`}>🌤 Giorno</button>
                <button onClick={() => setTimePref("night")} className={`chip ${timePref === "night" && "active"}`}>🌙 Notte</button>
              </div>

              <button disabled={!canContinue} onClick={next} className="btn">
                Continua
              </button>
            </motion.div>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <motion.div variants={stepVariants()} className="space-y-6">
              <h1 className="title">Che musica ami?</h1>

              <div className="flex flex-wrap gap-2 justify-center">
                {musicCategories.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => toggleArray(m.id, setMusic)}
                    className={`chip ${music.includes(m.id) && "active"}`}
                  >
                    {m.name}
                  </button>
                ))}

              </div>

              <button disabled={!canContinue} onClick={next} className="btn">
                Continua
              </button>
            </motion.div>
          )}

          {/* STEP 6 */}
          {step === 6 && (
            <motion.div variants={stepVariants()} className="space-y-6">
              <h1 className="title">Come ti vesti quando esci?</h1>

              <div className="flex flex-wrap gap-2 justify-center">
                {DRESSCODES.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDresscode(d)}
                    className={`chip ${dresscode === d && "active"}`}
                  >
                    {d}
                  </button>
                ))}
              </div>

              <button onClick={submit} disabled={loading} className="btn">
                {loading ? "Creo account…" : "Crea account"}
              </button>
            </motion.div>
          )}
         </AnimatePresence>
)}
      </motion.div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          background: #111;
          border: 1px solid #222;
          color: white;
        }
        .btn {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          background: white;
          color: black;
          font-weight: 600;
          opacity: 1;
        }
        .btn:disabled {
          opacity: 0.4;
        }
        .chip {
          padding: 8px 16px;
          border-radius: 999px;
          border: 1px solid #333;
          color: #aaa;
        }
        .chip.active,
        .price.active {
          background: white;
          color: black;
          border-color: white;
        }
        .price {
          font-size: 24px;
          padding: 12px 18px;
          border-radius: 999px;
          border: 1px solid #333;
          color: #aaa;
        }
        .title {
          text-align: center;
          font-size: 22px;
          color: white;
        }
        .hint {
          font-size: 11px;
          color: #666;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

