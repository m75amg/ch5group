import * as React from "react";

import { cn } from "@/lib/utils";

export type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="checkbox"
        className={cn(
          "h-[18px] w-[18px] shrink-0 rounded-sm border border-border-strong bg-background appearance-none cursor-pointer transition-colors",
          "checked:bg-brand-accent checked:border-brand-accent",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Custom checkmark via background image (white check on accent fill)
          "checked:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22 fill=%22none%22><path d=%22M3.5 8L6.5 11L12.5 5%22 stroke=%22white%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/></svg>')] bg-center bg-no-repeat",
          className,
        )}
        {...props}
      />
    );
  },
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
