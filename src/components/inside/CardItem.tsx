type Props = {
  title: string;
  category: string;
  isOpen?: boolean;
  imageUrl?: string;
  time?: string;
};

export default function CardItem({
  title,
  category,
  time,
  isOpen = true,
  imageUrl,
}: Props) {
  return (
    <div
      className="
        min-w-[260px]
        overflow-hidden
        cursor-pointer
        group
      "
    >
      {/* IMAGE */}
      <div className="relative w-[300px] h-[300px] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="
            w-[300px] h-[300px] object-cover
            transition-transform duration-500
            rounded-2xl
          "
        />
      </div>

      {/* INFO */}
      <div className="pt-3 w-[300px]">
        <h3 className="text-white font-medium text-base leading-tight">
          {title}
        </h3>

        <div className="flex items-center justify-between mt-1">
          <span className="text-white/50 text-xs uppercase tracking-wide">
            {category}
          </span>
        </div>
      </div>
    </div>
  );
}
