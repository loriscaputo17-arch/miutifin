import Link from "next/link";
import CardItem from "./CardItem";

type Experience = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  isOpen?: boolean;
  type: "event" | "place" | "activity" | "journey";
};

type Props = {
  title: string;
  items?: Experience[];
};

export default function HorizontalSection({ title, items }: Props) {
  if (!items || items.length === 0) return null;

  return (
    <section className="mt-10">
      <div className="max-w-8xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 mb-4">
          <h2 className="text-lg sm:text-xl text-white">{title}</h2>
          <button className="text-white/40 text-sm hover:text-white">
            See all
          </button>
        </div>

        {/* SCROLL */}
        <div className="flex gap-6 overflow-x-auto px-6 pb-2 scroll-smooth">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/${item.type}/${item.id}`}
              className="shrink-0"
            >
              <CardItem
                title={item.title}
                category={item.category}
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
