import Link from "next/link";
import CardItem2 from "./CardItem2";

type Experience = {
  id: string;
  title: string;
  category: string;
  cover_image: string;
  isOpen?: boolean;
  price_min: string;
  start_at: string;
  venue_name: string;
  type: "event" | "place" | "activity" | "journey";
};

type Props = {
  title: string;
  items?: Experience[];
};

export default function HorizontalSection2({ title, items }: Props) {
  if (!items || items.length === 0) return null;

  return (
    <section className="mt-10">
      <div className="w-full mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl text-white">{title}</h2>
        </div>

        {/* SCROLL */}
        <div className="flex gap-6 overflow-x-auto pb-2 scroll-smooth">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/${item.type}/${item.id}`}
              className="shrink-0"
            >
              <CardItem2
                title={item.title}
                category={item.category}
                imageUrl={item.cover_image}
                isOpen={item.isOpen}
                price_min={item.price_min}
                start_at={item.start_at}
                venue_name={item.venue_name}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleString("it-IT", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
