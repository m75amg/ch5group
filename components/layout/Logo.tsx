import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
  tone?: "default" | "inverse";
}

/**
 * Placeholder text-mark logo. Replace with SVG export from the design team
 * when available (see `docs/design/` figma source).
 */
export function Logo({ className, tone = "default" }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 select-none",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="grid h-8 w-8 place-items-center rounded-md bg-brand-accent text-brand-accent-foreground text-button font-semibold"
      >
        C5
      </span>
      <span
        className={cn(
          "text-h5 font-semibold",
          tone === "default" ? "text-foreground" : "text-foreground-inverse",
        )}
      >
        Channel5 Korea
      </span>
    </span>
  );
}
