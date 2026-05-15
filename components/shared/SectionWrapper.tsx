import * as React from "react";

import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";

type Tone = "default" | "muted" | "inverse";

export interface SectionWrapperProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Section background tone */
  tone?: Tone;
  /** Vertical padding scale — "default" for body sections, "spacious" for hero/CTA */
  size?: "default" | "spacious";
  /** Eyebrow label above the headline (e.g. "SERVICES") */
  eyebrow?: React.ReactNode;
  /** Section headline (rendered as h2) */
  title?: React.ReactNode;
  /** Section description below the headline */
  description?: React.ReactNode;
  /** Container max width */
  container?: "default" | "narrow";
  /** Anchor id for in-page navigation */
  id?: string;
}

export function SectionWrapper({
  tone = "default",
  size = "default",
  eyebrow,
  title,
  description,
  container = "default",
  className,
  id,
  children,
  ...props
}: SectionWrapperProps) {
  const isInverse = tone === "inverse";

  return (
    <section
      id={id}
      className={cn(
        size === "default" && "py-16 md:py-20 lg:py-24",
        size === "spacious" && "py-20 md:py-24 lg:py-32",
        tone === "default" && "bg-background",
        tone === "muted" && "bg-background-muted",
        tone === "inverse" && "bg-background-inverse text-foreground-inverse",
        className,
      )}
      {...props}
    >
      <Container size={container === "narrow" ? "narrow" : "default"}>
        {(eyebrow || title || description) && (
          <header className="max-w-3xl">
            {eyebrow ? (
              <Eyebrow tone={isInverse ? "inverse" : "accent"}>
                {eyebrow}
              </Eyebrow>
            ) : null}
            {title ? (
              <h2
                className={cn(
                  "text-h2 mt-3 tracking-tight",
                  isInverse ? "text-foreground-inverse" : "text-foreground",
                )}
              >
                {title}
              </h2>
            ) : null}
            {description ? (
              <p
                className={cn(
                  "text-body-lg mt-4 max-w-prose",
                  isInverse ? "text-neutral-300" : "text-foreground-muted",
                )}
              >
                {description}
              </p>
            ) : null}
          </header>
        )}
        {children ? (
          <div
            className={cn(eyebrow || title || description ? "mt-12 lg:mt-16" : "")}
          >
            {children}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
