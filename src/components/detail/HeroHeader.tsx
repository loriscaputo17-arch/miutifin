type Props = {
  title: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;

  /* opzionali, future-proof */
  timeBucket?: "now" | "today" | "tonight" | "weekend";
  priceLevel?: 1 | 2 | 3 | null;
  dresscode?: string | null;
  tags?: string[];
};

const TIME_LABELS: Record<string, string> = {
  now: "Now",
  today: "Today",
  tonight: "Tonight",
  weekend: "Weekend",
};

export default function HeroHeader({
  title,
  category,
  location,
  rating,
  reviews,
  timeBucket,
  priceLevel,
  dresscode,
  tags = [],
}: Props) {
  return (
    <section className="md:pt-8 pt-4 max-w-8xl mx-auto space-y-4">

      {/* TITLE */}
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
        {title}
      </h1>

      {/* META */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-white/50">
        <span>{category}</span>
        <span>•</span>
        <span>{location}</span>
        <span>•</span>
        <span>
          {rating.toFixed(1)} ({reviews})
        </span>
      </div>

      {/* BADGES */}
      <div className="flex flex-wrap gap-2 pt-2">
        {timeBucket && (
          <Badge>{TIME_LABELS[timeBucket]}</Badge>
        )}

        {priceLevel && (
          <Badge>{"€".repeat(priceLevel)}</Badge>
        )}

        {dresscode && (
          <Badge>{dresscode}</Badge>
        )}

        {tags.slice(0, 3).map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------------
   UI
---------------------------------- */

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-white/80">
      {children}
    </span>
  );
}
