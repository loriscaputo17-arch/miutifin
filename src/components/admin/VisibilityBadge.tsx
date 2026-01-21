export default function VisibilityBadge({ value }: { value: string }) {
  const isPublic = value === "public";

  return (
    <span
      className={`
        px-2 py-0.5
        rounded-full
        text-xs
        font-medium
        ${isPublic
          ? "bg-green-500/20 text-green-400"
          : "bg-yellow-500/20 text-yellow-400"}
      `}
    >
      {value}
    </span>
  );
}
