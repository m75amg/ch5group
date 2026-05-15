import { getTranslations } from "next-intl/server";
import { ChevronRight } from "lucide-react";

import { SectionWrapper } from "@/components/shared/SectionWrapper";

const STEPS = ["site", "newsletter", "webinar", "conference", "make"] as const;

export async function MediaPlatformJourney() {
  const t = await getTranslations("mediaPlatform.journey");

  return (
    <SectionWrapper
      tone="muted"
      eyebrow={t("eyebrow")}
      title={t("headline")}
      description={t("body")}
    >
      <ol className="flex flex-col lg:flex-row lg:items-stretch gap-3 lg:gap-2">
        {STEPS.map((step, idx) => (
          <li
            key={step}
            className="flex items-center gap-3 lg:flex-1 lg:flex-col lg:gap-4"
          >
            <div className="flex-1 lg:w-full bg-background border border-border rounded-lg p-6 text-center">
              <p className="text-caption font-mono text-brand-accent">
                {String(idx + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 text-h5 text-foreground">{t(`steps.${step}`)}</p>
            </div>
            {idx < STEPS.length - 1 ? (
              <ChevronRight
                aria-hidden="true"
                className="h-5 w-5 text-brand-accent shrink-0 lg:rotate-0 rotate-90"
              />
            ) : null}
          </li>
        ))}
      </ol>
    </SectionWrapper>
  );
}
