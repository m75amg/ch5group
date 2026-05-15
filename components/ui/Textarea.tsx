import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          "flex min-h-[120px] w-full rounded-md border bg-background px-3 py-2 text-body text-foreground placeholder:text-foreground-muted shadow-sm transition-colors resize-y",
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
Textarea.displayName = "Textarea";

export { Textarea };
