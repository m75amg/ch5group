import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent-hover",
        secondary:
          "bg-transparent text-foreground border border-border-strong hover:bg-neutral-100",
        ghost:
          "bg-transparent text-foreground-muted hover:bg-neutral-100 hover:text-foreground",
        inverse: "bg-white text-foreground hover:bg-neutral-100",
      },
      size: {
        sm: "h-9 px-3 text-button",
        md: "h-11 px-4 text-button",
        lg: "h-13 px-5 text-button",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
