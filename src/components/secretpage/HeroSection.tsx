"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import { fetchExploreSearch } from "@/lib/limitedExplore";

type ExploreSearchType = "event" | "place" | "mixed";
type Neighborhood = { id: string; name: string; slug: string };

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
  { label: "+39", value: "+39" },
  { label: "+33", value: "+33" },
  { label: "+49", value: "+49" },
  { label: "+34", value: "+34" },
  { label: "+44", value: "+44" },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
  const [type, setType] = useState<ExploreSearchType>("event");
  const [price, setPrice] = useState<number | undefined>();
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [district, setDistrict] = useState<string | undefined>();
  const [exploreOpen, setExploreOpen] = useState(false);
  const [exploreResult, setExploreResult] = useState<any | null>(null);
  const [activeResultTab, setActiveResultTab] = useState<"events" | "places">("events");
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/neighborhoods?city=${city}`)
      .then((r) => r.json())
      .then(setNeighborhoods)
      .catch(console.error);
  }, [city]);

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

    await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
      },
    });

    setLoading(false);
    setDone(true);
  };

   const handleExploreSearch = async () => {
    setSearchLoading(true);

    try {
      const res = await fetchExploreSearch({
        city_slug: city,
        type,
        price,
        district,
      });

      setExploreResult(res);

      if (type === "place") setActiveResultTab("places");
      else setActiveResultTab("events");

      setExploreOpen(true);
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <section className="relative pt-36 pb-44 px-6 text-center overflow-hidden" id="#solutions">
      <div className="absolute inset-0 overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center scale-110 blur-md opacity-70"
          style={{
            backgroundImage: "url('/bg5.png')",
          }}
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.35),transparent_55%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.95))]" />

      </div>

      <div className="relative max-w-4xl mx-auto">
        <p className="md:w-full w-[60%] mx-auto mb-6 text-xs uppercase tracking-[0.3em] text-white/40">
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

        <section className="relative pt-36 pb-44 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl bg-black/60 border border-white/10">
              <div className="flex">
                <Tab
                  label="Join waitlist"
                  active={activeTab === "waitlist"}
                  onClick={() => setActiveTab("waitlist")}
                />
                <Tab
                  label="Explore"
                  active={activeTab === "search"}
                  onClick={() => setActiveTab("search")}
                />
              </div>

              <div className="md:p-8 p-4">
                {activeTab === "waitlist" && ( 
                  <div className="grid gap-4 animate-fadeIn"> 
                  {done ? ( <div className="py-12 text-center space-y-4 animate-fadeIn"> 
                    <p className="text-lg font-medium"> Request received </p>
                    <p className="text-white/60 text-sm"> We’ve sent a confirmation email to<br /> 
                    <span className="text-white">{email}</span> </p> 
                    <p className="text-white/40 text-xs"> Access is reviewed manually. </p> 
                    </div> ) : ( 
                      <> 
                      <Input label="Full name" value={fullName} onChange={setFullName} /> 
                      <PhoneInput prefix={phonePrefix} number={phoneNumber} onPrefixChange={setPhonePrefix} onNumberChange={setPhoneNumber} /> 
                      <Input label="Email address" value={email} onChange={setEmail} /> {error && <p className="text-red-500 text-xs">{error}</p>} 
                      <button onClick={handleWaitlist} disabled={loading} className="mt-2 w-full rounded-lg bg-red-600 text-whhite py-3 text-sm font-medium hover:bg-white-500 transition" > {loading ? "Sending..." : "Request invitation"} </button> </> )} </div> )}

                {activeTab === "search" && (
                  <div className="grid md:grid-cols-4 gap-4">
                    <CitySelect value={city} onChange={setCity} />
                    <PriceSelect value={price} onChange={setPrice} />
                    <TypeSelect value={type} onChange={setType} />
                    <NeighborhoodSelect
                      value={district}
                      onChange={setDistrict}
                      neighborhoods={neighborhoods}
                    />

                    <button
                      onClick={handleExploreSearch}
                      className="md:col-span-4 bg-red-600 rounded-lg py-3"
                    >
                      {searchLoading ? "Searching…" : "Search"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-black" />
      {exploreOpen && exploreResult && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
          onClick={() => setExploreOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-black rounded-3xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setExploreOpen(false)}
              className="absolute top-4 right-4"
            >
              ✕
            </button>

            {type === "mixed" && (
              <div className="flex border-b border-white/10">
                <Tab
                  label="Events"
                  active={activeResultTab === "events"}
                  onClick={() => setActiveResultTab("events")}
                />
                <Tab
                  label="Places"
                  active={activeResultTab === "places"}
                  onClick={() => setActiveResultTab("places")}
                />
              </div>
            )}

            <div className="p-6 grid md:grid-cols-4 gap-6 max-h-[70vh] overflow-y-auto">
              {(type !== "place" && activeResultTab === "events") &&
                exploreResult.events.map((e: any) => (
                  <ExploreCard key={e.id} item={e} />
                ))}

              {(type !== "event" && activeResultTab === "places") &&
                exploreResult.places.map((p: any) => (
                  <ExploreCard key={p.id} item={p} />
                ))}
            </div>
          </div>
        </div>
      )}
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
    <div style={{width: '100%'}}>
      <input
        value={value}
        placeholder={label}
        onChange={(e) => onChange(e.target.value)}
        className="md:w-full w-[100%] text-xs uppercase tracking-widest text-white/40 rounded-lg bg-black/80 border border-white/10 px-4 py-3 focus:outline-none focus:border-red-500/60"
      />
    </div>
  );
}

function TypeSelect({
  value,
  onChange,
}: {
  value: "event" | "place" | "mixed";
  onChange: (v: "event" | "place" | "mixed") => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as any)}
      className="w-full rounded-lg bg-black/80 border border-white/10 px-4 py-3 text-sm text-white/80 focus:outline-none focus:border-red-500/60"
    >
      <option value="event">Events</option>
      <option value="place">Places</option>
      <option value="mixed">Mixed</option>
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
        className="w-20 rounded-lg bg-black/80 border border-white/10 px-3 py-3 text-sm text-white/80 focus:outline-none focus:border-red-500/60"
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

function NeighborhoodSelect({
  value,
  onChange,
  neighborhoods,
}: {
  value?: string;
  onChange: (v?: string) => void;
  neighborhoods: Neighborhood[];
}) {
  return (
    <select
      value={value ?? ""}
      onChange={(e) =>
        onChange(e.target.value ? e.target.value : undefined)
      }
      className="
        w-full rounded-lg bg-black/80
        border border-white/10
        px-4 py-3 text-sm text-white/80
        focus:outline-none focus:border-red-500/60
      "
    >
      <option value="">Any district</option>

      {neighborhoods.map((n) => (
        <option key={n.id} value={n.slug}>
          {n.name}
        </option>
      ))}
    </select>
  );
}


function ExploreCard({
  item,
  onClick,
}: {
  item: any;
  onClick?: () => void;
}) {
  const price =
    item.priceLevel !== undefined
      ? item.priceLevel
        ? "€".repeat(item.priceLevel)
        : "Free / Invite only"
      : "—";

  const address =
    item.address ||
    item.category ||
    (item.neighborhoods?.length
      ? item.neighborhoods.join(", ")
      : "");

  return (
    <div
      onClick={onClick}
      className="relative aspect-[9/16] rounded-3xl overflow-hidden cursor-pointer group"
    >
      {/* BG IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
        style={{
          backgroundImage: item.imageUrl
            ? `url(${item.imageUrl})`
            : "linear-gradient(to bottom, #111, #000)",
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent " />

      {/* CONTENT */}
      <div className="absolute bottom-6 left-6 right-6 space-y-2 text-left">
        <h3 className="text-lg font-medium leading-tight">
          {item.title}
        </h3>

        <div className="inline">
          {address && (
            <p className="text-sm text-white/60">
              {address}, &nbsp;
            </p>
          )}

          {item.time && (
            <p className="text-sm text-white/50">
              {new Date(item.time).toLocaleDateString("it-IT", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}, &nbsp;
            </p>
          )}

          <p className="text-sm text-white/80">
            {price}
          </p>
        </div>
      </div>
    </div>
  );
}

