import { ReactNode } from "react";
import clsx from "clsx";

export function H1({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h1
      className={clsx(
        "text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function Subheadline({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={clsx(
        "mt-2 font-light text-white/80",
        className
      )}
    >
      {children}
    </p>
  );
}

export function BodyMuted({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={clsx(
        "text-xs md:text-sm leading-relaxed text-white/60",
        className
      )}
    >
      {children}
    </p>
  );
}
