import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/Card";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

const ITEMS = [
  { key: "webinar", anchor: "/services#webinar" },
  { key: "newsletter", anchor: "/services#newsletter" },
  { key: "conference", anchor: "/services#conference" },
  { key: "contest", anchor: "/services#contest" },
  { key: "education", anchor: "/services#education" },
] as const;

export async function PartnersCollaboration() {
  const t = await getTranslations("partners.collaboration");

  return (
    <SectionWrapper
      eyebrow={t("eyebrow")}
      title={t("headline")}
      description={t("body")}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {ITEMS.map((item) => (
          <Link
            key={item.key}
            href={item.anchor}
            className="group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
          >
            <Card variant="default" interactive className="h-full !p-6">
              <h3 className="text-h5 text-foreground">
                {t(`items.${item.key}.title`)}
              </h3>
              <p className="mt-3 text-body-sm text-foreground-muted leading-relaxed">
                {t(`items.${item.key}.description`)}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </SectionWrapper>
  );
}
