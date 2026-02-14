import Image from "next/image";

type Props = {
  title: string;
  address: string;
  imageUrl?: string;
  isOpen?: boolean;
};

export default function PlaceItem({
  title,
  address,
  imageUrl,
  isOpen,
}: Props) {
  return (
    <div
      className="
        relative
        w-[300px] h-[240px]
        rounded-2xl
        overflow-hidden
        border border-white/10
        hover:shadow-xl
        transition-all duration-300
        group
      "
    >
      {/* IMAGE */}
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover opacity-100 transition"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
      )}

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* CONTENT */}
      <div className="absolute inset-0 p-4 flex flex-col justify-end">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-white font-semibold text-sm leading-tight">
            {title}
          </h3>

          
        </div>

        <p className="text-xs text-white/70 mt-1 line-clamp-2">
          {address}
        </p>
      </div>
    </div>
  );
}
