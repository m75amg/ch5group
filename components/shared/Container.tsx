import * as React from "react";

import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "prose";
}

export function Container({
  className,
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto px-6 lg:px-8",
        size === "default" && "max-w-7xl",
        size === "narrow" && "max-w-5xl",
        size === "prose" && "max-w-prose",
        className,
      )}
      {...props}
    />
  );
}
