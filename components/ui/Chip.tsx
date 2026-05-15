"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface ChipProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  selected?: boolean;
  value?: string;
}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, selected, type = "button", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        aria-pressed={selected}
        className={cn(
          "inline-flex items-center justify-center h-9 px-3 rounded-full border text-button transition-colors duration-fast",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          selected
            ? "bg-brand-accent text-brand-accent-foreground border-brand-accent"
            : "bg-background text-foreground border-border hover:border-border-strong",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Chip.displayName = "Chip";

export { Chip };
