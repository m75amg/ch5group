import { getTranslations } from "next-intl/server";

import { SectionWrapper } from "@/components/shared/SectionWrapper";

export async function ServicesIntegrated() {
  const t = await getTranslations("services.integrated");

  return (
    <SectionWrapper eyebrow={t("eyebrow")} title={t("headline")}>
      <p className="text-body-lg text-foreground-muted leading-relaxed max-w-3xl">
        {t("body")}
      </p>
    </SectionWrapper>
  );
}
