import * as React from "react";

import { cn } from "@/lib/utils";

export interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  tone?: "accent" | "muted" | "inverse";
}

export function Eyebrow({
  className,
  tone = "accent",
  children,
  ...props
}: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-eyebrow uppercase",
        tone === "accent" && "text-brand-accent",
        tone === "muted" && "text-foreground-muted",
        tone === "inverse" && "text-neutral-400",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
