import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, invalid, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type ?? "text"}
        aria-invalid={invalid || undefined}
        className={cn(
          "flex h-11 w-full rounded-md border bg-background px-3 py-2 text-body text-foreground placeholder:text-foreground-muted shadow-sm transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:border-transparent",
          "disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400",
          invalid ? "border-error" : "border-border",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
