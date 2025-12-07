"use client";

import { ReactNode } from "react";
import clsx from "clsx";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={clsx(
        `
        mx-auto
        w-full
        max-w-screen-xl
        px-5         /* mobile */
        sm:px-6
        md:px-8      /* tablet */
        lg:px-10     /* desktop */
        xl:px-12     /* large desktop */
      `,
        className
      )}
    >
      {children}
    </div>
  );
}
