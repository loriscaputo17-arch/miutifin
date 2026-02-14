type Props = {
  title: string;
  category: string;
  isOpen?: boolean;
  imageUrl?: string;
  time?: string;
  price_min: string;
  start_at: string;
  venue_name: string;
};

export default function CardItem2({
  title,
  category,
  time,
  venue_name,
  price_min,
  start_at,
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
        {start_at && (
            <div className="text-white/50 text-xs uppercase tracking-wide mb-2">
              {new Date(start_at).toLocaleDateString("en-GB", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </div>
          )} 

        <h3 className="text-white font-medium text-base leading-tight">
          {title}
        </h3>

        <div className="mt-1">

          <div className="flex items-center gap-2">
            <span className="text-white/50 text-xs uppercase tracking-wide">
              {venue_name}
            </span>
            <span className="text-white/50 text-xs uppercase tracking-wide">
              {price_min}
            </span>
          </div>
           
        </div>
      </div>
    </div>
  );
}
