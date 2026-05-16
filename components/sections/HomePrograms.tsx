import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Container } from "@/components/shared/Container";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { getFeaturedPrograms, type Locale } from "@/lib/site-data";

export async function HomePrograms() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home.programs");
  const programs = await getFeaturedPrograms(locale, 4);

  return (
    <section className="bg-background-inverse text-foreground-inverse">
      <Container className="py-16 md:py-20 lg:py-24">
        <header className="max-w-3xl">
          <Eyebrow tone="inverse">{t("eyebrow")}</Eyebrow>
          <h2 className="text-h2 mt-3 tracking-tight text-foreground-inverse">
            {t("headline")}
          </h2>
          <p className="text-body-lg mt-4 text-neutral-300 max-w-prose">
            {t("description")}
          </p>
        </header>

        <div className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.length === 0 ? (
            <p className="col-span-full text-body-sm text-neutral-400">
              등록된 프로그램이 없습니다.
            </p>
          ) : (
            programs.map((program) => (
              <article
                key={program.id}
                className="flex flex-col rounded-lg overflow-hidden bg-neutral-900/40 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div
                  aria-hidden="true"
                  className="aspect-[16/10] bg-gradient-to-br from-neutral-800 via-neutral-900 to-background-inverse relative"
                >
                  {program.imagePath ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={program.imagePath}
                      alt={program.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(30,99,255,0.18),transparent_50%)]" />
                  )}
                </div>
                <div className="flex flex-col grow p-6">
                  <p className="text-caption uppercase tracking-[0.08em] text-neutral-400">
                    {program.tag === "CONFERENCE"
                      ? "Conference"
                      : program.tag === "CONTEST"
                        ? "Contest"
                        : "Education"}
                  </p>
                  <h3 className="text-h5 mt-2 text-foreground-inverse">
                    {program.title}
                  </h3>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="mt-10 lg:mt-12">
          <Link
            href="/programs"
            className="inline-flex items-center gap-1 text-button text-brand-accent hover:text-brand-accent-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background-inverse rounded"
          >
            {t("cta")}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
