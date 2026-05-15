"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/shared/Container";

const STORAGE_KEY = "ch5-cookie-consent";

type ConsentState = "accepted" | "declined" | null;

export function CookieBanner() {
  const t = useTranslations("cookieBanner");
  const [consent, setConsent] = useState<ConsentState>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "accepted" || stored === "declined") {
        setConsent(stored);
      }
    } catch {
      // localStorage unavailable — treat as no decision yet
    }
    setHydrated(true);
  }, []);

  function record(value: Exclude<ConsentState, null>) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore
    }
    setConsent(value);
  }

  if (!hydrated || consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-modal border-t border-border bg-background shadow-lg"
    >
      <Container className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <p className="text-body-sm text-foreground leading-relaxed">
          {t("message")}{" "}
          <Link
            href="/privacy"
            className="text-brand-accent hover:text-brand-accent-hover underline underline-offset-2"
          >
            {t("policyLink")}
          </Link>
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => record("declined")}
          >
            {t("rejectLabel")}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => record("accepted")}
          >
            {t("acceptLabel")}
          </Button>
        </div>
      </Container>
    </div>
  );
}
