"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export interface LanguageToggleProps {
  className?: string;
  variant?: "header" | "inverse";
}

export function LanguageToggle({
  className,
  variant = "header",
}: LanguageToggleProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchTo = locale === "ko" ? "en" : "ko";
  const switchLabel = switchTo.toUpperCase();
  const currentLabel = locale.toUpperCase();

  const handleSwitch = () => {
    if (!routing.locales.includes(switchTo as "ko" | "en")) return;
    startTransition(() => {
      router.replace(pathname, { locale: switchTo });
    });
  };

  return (
    <button
      type="button"
      onClick={handleSwitch}
      disabled={isPending}
      aria-label={`Switch language to ${switchLabel}`}
      className={cn(
        "inline-flex items-center justify-center h-9 px-3 rounded-md text-button transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-wait",
        variant === "header" &&
          "text-foreground-muted hover:text-foreground hover:bg-neutral-100",
        variant === "inverse" &&
          "text-neutral-300 hover:text-foreground-inverse hover:bg-white/10",
        className,
      )}
    >
      <span className="font-semibold">{currentLabel}</span>
      <span aria-hidden="true" className="mx-1 opacity-50">
        /
      </span>
      <span className="opacity-70">{switchLabel}</span>
    </button>
  );
}
