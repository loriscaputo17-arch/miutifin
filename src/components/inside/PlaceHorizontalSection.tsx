import Link from "next/link";
import PlaceItem from "./PlaceItem";

type Experience = {
  id: string;
  title: string;
  address: string;
  imageUrl?: string;
  isOpen?: boolean;
  type: "event" | "place" | "activity" | "journey";
};

type Props = {
  title: string;
  items?: Experience[];
};

export default function PlaceHorizontalSection({
  title,
  items = [],
}: Props) {
  if (!items.length) return null;
  return (
    <section className="mt-12">
      <div className="max-w-8xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-white">
            {title}
          </h2>

          <Link
            href="/map"
            className="text-sm text-white/50 hover:text-white transition"
          >
            See all →
          </Link>
        </div>

        {/* SCROLLER */}
        <div className="flex gap-5 overflow-x-auto px-6 pb-4 scroll-smooth">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/${item.type}/${item.id}`}
              className="shrink-0"
            >
              <PlaceItem
                title={item.title}
                address={item.address}
                imageUrl={item.imageUrl}
                isOpen={item.isOpen}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
