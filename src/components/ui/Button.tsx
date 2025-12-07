"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "ghost" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const base =
  "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-white text-black hover:bg-neutral-200 focus-visible:ring-white/80",
  ghost:
    "bg-transparent text-white hover:bg-white/10 focus-visible:ring-white/50",
  outline:
    "border border-white/40 text-white hover:bg-white/10 focus-visible:ring-white/50",
};

export function Button({ children, variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
