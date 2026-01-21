"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import { fetchLimitedExplore } from "@/lib/limitedExplore";

type ExploreType = "event" | "place" | "activity" | "journey";

const CITIES = [
  { label: "Milano", value: "milano" },
  { label: "Roma", value: "roma" },
  { label: "Torino", value: "torino" },
  { label: "Firenze", value: "firenze" },
  { label: "Napoli", value: "napoli" },
];

const PEOPLE_OPTIONS = [
  ...Array.from({ length: 8 }, (_, i) => ({
    label: `${i + 1}`,
    value: i + 1,
  })),
  { label: "8+", value: 9 },
];

const PRICE_OPTIONS = [
  { label: "€", value: 1 },
  { label: "€€", value: 2 },
  { label: "€€€", value: 3 },
];

const PHONE_PREFIXES = [
  { label: "🇮🇹 +39", value: "+39" },
  { label: "🇫🇷 +33", value: "+33" },
  { label: "🇩🇪 +49", value: "+49" },
  { label: "🇪🇸 +34", value: "+34" },
  { label: "🇬🇧 +44", value: "+44" },
];

export function HeroSection() {
  const supabase = createSupabaseBrowserClient();

  const fullText = "Discover what’s happening. Not everything is public.";
  const [text, setText] = useState("");

  const [activeTab, setActiveTab] = useState<"waitlist" | "search">("waitlist");

  const [fullName, setFullName] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("+39");
  const [phoneNumber, setPhoneNumber] = useState("");  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // search
  const [city, setCity] = useState("milano");
  const [date, setDate] = useState("");
  const [people, setPeople] = useState(1);
  const [type, setType] = useState<ExploreType>("event");
  const [price, setPrice] = useState<number | undefined>();
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<any>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const handleWaitlist = async () => {
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    setLoading(true);
    setError(null);

    /* 1️⃣ INSERT WAITLIST */
    const { error: insertError } = await supabase.from("waitlist").insert({
      full_name: fullName,
      phone: `${phonePrefix} ${phoneNumber}`,
      email,
      source: "landing",
    });

    if (insertError) {
      setLoading(false);
      setError("Something went wrong. Try again.");
      return;
    }

    /* 2️⃣ SEND CONFIRMATION EMAIL (OTP) */
    await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false, // 🔴 IMPORTANTISSIMO
      },
    });

    setLoading(false);
    setDone(true);
  };


  const handleSearch = async () => {
    setSearchLoading(true);
    try {
      const res = await fetchLimitedExplore({
        city,
        date,
        people,
        type,
        price,
      });
      setSearchResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <section className="relative pt-36 pb-44 px-6 text-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">

        {/* IMAGE BASE */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-110 blur-md opacity-70"
          style={{
            backgroundImage: "url('/bg5.png')",
          }}
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/60" />

        {/* RED GLOW */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.35),transparent_55%)]" />

        {/* VIGNETTE */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.95))]" />

      </div>


      <div className="relative max-w-4xl mx-auto">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-white/40">
          Private experiences around your city
        </p>

        <h1 className="text-4xl md:text-6xl font-semibold min-h-[2.5em]">
          {text}
          <span className="ml-1 animate-pulse text-red-500">|</span>
        </h1>

        <p className="mt-2 text-white/60 max-w-xl mx-auto">
          A private platform to explore events, places and journeys.
          Visibility is intentional. Access is limited.
        </p>

        {/* TABS */}
        <div className="mt-14 mx-auto max-w-3xl">
          <div className="rounded-3xl border border-white/10 bg-black/60 backdrop-blur-2xl overflow-hidden">

            <div className="flex">
              <Tab label="Join waitlist" active={activeTab === "waitlist"} onClick={() => setActiveTab("waitlist")} />
              <Tab label="Explore" active={activeTab === "search"} onClick={() => setActiveTab("search")} />
            </div>

            <div className="p-8">

              {activeTab === "waitlist" && (
                <div className="grid gap-4 animate-fadeIn">
                  {done ? (
                    <div className="py-12 text-center space-y-4 animate-fadeIn">
                      <p className="text-lg font-medium">
                        Request received
                      </p>
                      <p className="text-white/60 text-sm">
                        We’ve sent a confirmation email to<br />
                        <span className="text-white">{email}</span>
                      </p>
                      <p className="text-white/40 text-xs">
                        Access is reviewed manually.
                      </p>
                    </div>
                  ) : (
                    <>
                      <Input label="Full name" value={fullName} onChange={setFullName} />
                        <PhoneInput
                        prefix={phonePrefix}
                        number={phoneNumber}
                        onPrefixChange={setPhonePrefix}
                        onNumberChange={setPhoneNumber}
                        />
                      <Input label="Email address" value={email} onChange={setEmail} />

                      {error && <p className="text-red-500 text-xs">{error}</p>}

                      <button
                        onClick={handleWaitlist}
                        disabled={loading}
                        className="mt-2 w-full rounded-lg bg-white text-black py-3 text-sm font-medium hover:bg-white-500 transition"
                      >
                        {loading ? "Sending..." : "Request invitation"}
                      </button>
                    </>
                  )}
                </div>
              )}

              {activeTab === "search" && (
                <div className="grid md:grid-cols-5 gap-4 animate-fadeIn">

                    <CitySelect value={city} onChange={setCity} />

                    <DateInput value={date} onChange={setDate} />

                    <PeopleSelect value={people} onChange={setPeople} />

                    <TypeSelect value={type} onChange={setType} />

                    <PriceSelect value={price} onChange={setPrice} />

                    <button
                    onClick={handleSearch}
                    className="md:col-span-5 rounded-lg bg-red-600 py-3 text-sm font-medium hover:bg-red-700 transition"
                    >
                    {searchLoading ? "Searching..." : "Search"}
                    </button>

                </div>
                )}


            </div>
          </div>

          <p className="mt-4 text-xs text-white/40">
            Access is reviewed manually. Not everyone is accepted.
          </p>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-black" />

    </section>
  );
}

function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-4 text-sm font-medium border-b transition
        ${active ? "border-red-500 text-white" : "border-white/10 text-white/40 hover:text-white"}
      `}
    >
      {label}
    </button>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <input
        value={value}
        placeholder={label}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-xs uppercase tracking-widest text-white/40 rounded-lg bg-black/80 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-red-500/60"
      />
    </div>
  );
}

function TypeSelect({
  value,
  onChange,
}: {
  value: ExploreType;
  onChange: (v: ExploreType) => void;
}) {
  return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as ExploreType)}
        className="w-full rounded-lg bg-black/80 border border-white/10 px-4 py-3 text-sm text-white/80 focus:outline-none focus:border-red-500/60"
      >
        <option value="event">Event</option>
        <option value="place">Place</option>
        <option value="activity">Activity</option>
        <option value="journey">Journey</option>
      </select>
  );
}

function CitySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg bg-black/80 border border-white/10 px-4 py-3 text-sm text-white/80 focus:outline-none focus:border-red-500/60"
    >
      {CITIES.map((c) => (
        <option key={c.value} value={c.value}>
          {c.label}
        </option>
      ))}
    </select>
  );
}

function DateInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg bg-black/80 border border-white/10 px-4 py-3 text-sm text-white/80 focus:outline-none focus:border-red-500/60"
    />
  );
}

function PeopleSelect({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full rounded-lg bg-black/80 border border-white/10 px-4 py-3 text-sm text-white/80 focus:outline-none focus:border-red-500/60"
    >
      {PEOPLE_OPTIONS.map((p) => (
        <option key={p.value} value={p.value}>
          {p.label}
        </option>
      ))}
    </select>
  );
}

function PriceSelect({
  value,
  onChange,
}: {
  value?: number;
  onChange: (v?: number) => void;
}) {
  return (
    <select
      value={value ?? ""}
      onChange={(e) =>
        onChange(e.target.value ? Number(e.target.value) : undefined)
      }
      className="w-full rounded-lg bg-black/80 border border-white/10 px-4 py-3 text-sm text-white/80 focus:outline-none focus:border-red-500/60"
    >
      <option value="">Any price</option>
      {PRICE_OPTIONS.map((p) => (
        <option key={p.value} value={p.value}>
          {p.label}
        </option>
      ))}
    </select>
  );
}

function PhoneInput({
  prefix,
  number,
  onPrefixChange,
  onNumberChange,
}: {
  prefix: string;
  number: string;
  onPrefixChange: (v: string) => void;
  onNumberChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-2">
      {/* PREFIX */}
      <select
        value={prefix}
        onChange={(e) => onPrefixChange(e.target.value)}
        className="w-[120px] rounded-lg bg-black/80 border border-white/10 px-3 py-3 text-sm text-white/80 focus:outline-none focus:border-red-500/60"
      >
        {PHONE_PREFIXES.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>

      {/* NUMBER */}
      <input
        type="tel"
        value={number}
        onChange={(e) =>
          onNumberChange(e.target.value.replace(/\D/g, ""))
        }
        placeholder="Phone number"
        className="flex-1 rounded-lg bg-black/80 border border-white/10 px-4 py-3 text-sm text-white/80 focus:outline-none focus:border-red-500/60"
      />
    </div>
  );
}
