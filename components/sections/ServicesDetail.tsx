import { getTranslations } from "next-intl/server";
import { Check } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/shared/Container";
import { cn } from "@/lib/utils";

const ITEMS = [
  "banner",
  "newsletter",
  "webinar",
  "conference",
  "contest",
  "education",
] as const;

function ServiceMockup({ tone }: { tone: "blue" | "navy" | "gray" }) {
  return (
    <div
      aria-hidden="true"
      className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border bg-gradient-to-br from-neutral-100 via-neutral-50 to-background"
    >
      <div
        className={cn(
          "absolute inset-6 rounded-lg shadow-sm",
          tone === "blue" && "bg-brand-accent/10 border border-brand-accent/30",
          tone === "navy" &&
            "bg-background-inverse/95 border border-white/10",
          tone === "gray" && "bg-white border border-border",
        )}
      />
      <div
        className={cn(
          "absolute top-12 left-12 right-12 h-3 rounded",
          tone === "navy" ? "bg-white/20" : "bg-brand-accent/60",
        )}
      />
      <div className="absolute top-20 left-12 w-2/3 h-2 rounded bg-neutral-300" />
      <div className="absolute top-24 left-12 w-1/2 h-2 rounded bg-neutral-300" />
      <div
        className={cn(
          "absolute bottom-10 left-12 h-8 w-24 rounded-md",
          tone === "navy" ? "bg-brand-accent" : "bg-brand-accent",
        )}
      />
    </div>
  );
}

export async function ServicesDetail() {
  const t = await getTranslations("services");
  const tonePattern: Array<"blue" | "navy" | "gray"> = [
    "blue",
    "navy",
    "gray",
    "blue",
    "navy",
    "gray",
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-background-muted">
      <Container>
        <div className="flex flex-col gap-20 lg:gap-28">
          {ITEMS.map((key, idx) => {
            const isReverse = idx % 2 === 1;
            const effects = t.raw(`items.${key}.effects`) as string[];
            return (
              <article
                key={key}
                id={key}
                className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
              >
                <div className={cn(isReverse && "lg:order-2")}>
                  <p className="text-eyebrow font-mono text-brand-accent">
                    {String(idx + 1).padStart(2, "0")} / 06
                  </p>
                  <h2 className="mt-3 text-h3 lg:text-h2 tracking-tight text-foreground">
                    {t(`items.${key}.title`)}
                  </h2>
                  <p className="mt-4 text-body-lg text-foreground-muted">
                    {t(`items.${key}.oneLine`)}
                  </p>
                  <p className="mt-4 text-body text-foreground-muted leading-relaxed max-w-prose">
                    {t(`items.${key}.body`)}
                  </p>
                  <ul className="mt-6 space-y-2">
                    {effects.map((effect, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-body-sm text-foreground"
                      >
                        <Check
                          aria-hidden="true"
                          className="h-4 w-4 mt-1 shrink-0 text-brand-accent"
                        />
                        <span>{effect}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/contact?service=${key}`}
                    className="inline-block mt-8"
                  >
                    <Button variant="secondary" size="md">
                      {t("inquireCta")}
                    </Button>
                  </Link>
                </div>
                <div className={cn(isReverse && "lg:order-1")}>
                  <ServiceMockup tone={tonePattern[idx]} />
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
