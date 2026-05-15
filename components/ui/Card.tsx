import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-lg p-6 lg:p-8 transition-all duration-base",
  {
    variants: {
      variant: {
        default: "bg-background border border-border",
        muted: "bg-background-muted border border-border",
        inverse: "bg-background-inverse text-foreground-inverse",
        accent: "bg-brand-accent text-brand-accent-foreground",
      },
      interactive: {
        true: "cursor-pointer",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: ["default", "muted"],
        interactive: true,
        className:
          "hover:border-border-strong hover:shadow-md hover:-translate-y-0.5",
      },
      {
        variant: ["inverse", "accent"],
        interactive: true,
        className: "hover:shadow-lg hover:-translate-y-0.5",
      },
    ],
    defaultVariants: {
      variant: "default",
      interactive: false,
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof cardVariants> {
  as?: "div" | "article" | "section";
}

const Card = React.forwardRef<HTMLElement, CardProps>(
  (
    { className, variant, interactive, as: Component = "article", ...props },
    ref,
  ) => {
    return React.createElement(Component, {
      ref,
      className: cn(cardVariants({ variant, interactive }), className),
      ...props,
    });
  },
);
Card.displayName = "Card";

export { Card, cardVariants };
