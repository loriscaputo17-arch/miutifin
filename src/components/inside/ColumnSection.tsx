import CardItem from "./CardItem";

type Item = {
  title: string;
  category: string;
  imageUrl: string;
  isOpen?: boolean;
};

type Props = {
  title: string;
  items?: Item[];
};

export default function ColumnSection({ title, items }: Props) {
  const data =
    items ??
    Array.from({ length: 8 }).map((_, i) => ({
      title: `${title} ${i + 1}`,
      category: "Nightlife",
      imageUrl: "/placeholder.jpg",
      isOpen: true,
    }));

  return (
    <section className="mt-10 px-6">
      <div className="max-w-8xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg sm:text-xl text-white">{title}</h2>
          <button className="text-white/40 text-sm hover:text-white">
            See all
          </button>
        </div>

        {/* GRID */}
        <div
          className="
            grid gap-6
            grid-cols-2
            sm:grid-cols-3
            lg:grid-cols-4
          "
        >
          {data.map((item, i) => (
            <CardItem
              key={i}
              title={item.title}
              category={item.category}
              imageUrl={item.imageUrl}
              isOpen={item.isOpen}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
