import { getLocale, getTranslations } from "next-intl/server";

import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { getHistoryItems, type Locale } from "@/lib/site-data";

export async function AboutHistory() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("about.history");
  const items = await getHistoryItems(locale);

  return (
    <SectionWrapper eyebrow={t("eyebrow")} title={t("headline")}>
      {items.length === 0 ? (
        <p className="text-body text-foreground-muted">
          등록된 연혁이 없습니다.
        </p>
      ) : (
        <ol className="border-t border-border">
          {items.map((item) => (
            <li
              key={item.id}
              className="grid grid-cols-[80px_1fr] lg:grid-cols-[120px_1fr] gap-4 lg:gap-8 py-6 border-b border-border"
            >
              <span className="text-button font-mono text-brand-accent">
                {item.year}
              </span>
              <div>
                <h3 className="text-h5 text-foreground">{item.title}</h3>
                <p className="mt-2 text-body-sm text-foreground-muted leading-relaxed max-w-prose">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
      <p className="mt-4 text-caption text-foreground-muted">
        {t("placeholderNote")}
      </p>
    </SectionWrapper>
  );
}
