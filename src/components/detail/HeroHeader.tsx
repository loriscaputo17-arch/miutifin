type Props = {
  title: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  start_at?: string;
  end_at?: string;
  place_name?: string;
  /* opzionali, future-proof */
  timeBucket?: "now" | "today" | "tonight" | "weekend";
  priceLevel?: 1 | 2 | 3 | null;
  dresscode?: string | null;
  tags?: string[];
  place_id?: string;
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
  end_at,
  start_at,
  location,
  rating,
  reviews,
  timeBucket,
  priceLevel,
  dresscode,
  place_name,
  place_id,
  tags = [],
}: Props) {
  return (
    <section className="max-w-8xl mx-auto space-y-4">

      {/* TITLE */}
      <h1 className="md:mt-0 mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
        {title}
      </h1>

      {/* META */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-white/50">
        
        {start_at && (
          <div className="" style={{color: "white", fontSize:"20px", fontWeight: '300'}}>
            {new Date(start_at).toLocaleDateString("en-GB", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}
            {end_at && (
              <> –{" "}
                {new Date(end_at).toLocaleDateString("en-GB", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </>
            )}
          </div>
        )}

        <span>•</span>
        {place_id && 
          <a href={`/place/${place_id}`}>
            <span style={{color: "white", fontSize:"20px", fontWeight: '300'}} >{place_name}</span>
          </a>
        }

        {!place_id && 
          <span style={{color: "white", fontSize:"20px", fontWeight: '300'}} >{place_name}</span>
        }
        
        <span>•</span>
        <span style={{color: "white", fontSize:"20px", fontWeight: '300'}} >{location}</span>
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
