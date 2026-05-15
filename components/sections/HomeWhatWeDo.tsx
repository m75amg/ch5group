import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/Card";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

const CARDS = [
  { key: "media", anchor: "/services" },
  { key: "webinar", anchor: "/services#webinar" },
  { key: "newsletter", anchor: "/services#newsletter" },
  { key: "conference", anchor: "/services#conference" },
  { key: "contest", anchor: "/services#contest" },
  { key: "education", anchor: "/services#education" },
] as const;

export async function HomeWhatWeDo() {
  const t = await getTranslations("home.whatWeDo");

  return (
    <SectionWrapper
      tone="muted"
      eyebrow={t("eyebrow")}
      title={t("headline")}
      description={t("description")}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CARDS.map((card) => (
          <Link
            key={card.key}
            href={card.anchor}
            className="group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
          >
            <Card variant="default" interactive className="h-full">
              <h3 className="text-h4 text-foreground">
                {t(`cards.${card.key}.title`)}
              </h3>
              <p className="mt-3 text-body-sm text-foreground-muted leading-relaxed">
                {t(`cards.${card.key}.description`)}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </SectionWrapper>
  );
}
