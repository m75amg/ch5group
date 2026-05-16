import { getLocale } from "next-intl/server";

import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { getAllPrograms, type Locale } from "@/lib/site-data";

const TAG_LABEL: Record<string, string> = {
  CONFERENCE: "Conference",
  CONTEST: "Contest",
  EDUCATION: "Education",
};

export async function ProgramsDetail() {
  const locale = (await getLocale()) as Locale;
  const programs = await getAllPrograms(locale);

  return (
    <SectionWrapper tone="muted">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.length === 0 ? (
          <p className="col-span-full text-body text-foreground-muted">
            등록된 프로그램이 없습니다.
          </p>
        ) : (
          programs.map((program, idx) => (
            <article
              key={program.id}
              id={program.slug}
              className="scroll-mt-24 flex flex-col rounded-lg overflow-hidden bg-background border border-border hover:border-border-strong transition-colors"
            >
              <div
                aria-hidden="true"
                className="aspect-[16/10] bg-gradient-to-br from-neutral-100 to-neutral-200 relative"
              >
                {program.imagePath ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={program.imagePath}
                    alt={program.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(30,99,255,0.16),transparent_55%)]" />
                )}
                <p className="absolute top-4 left-4 text-caption uppercase tracking-[0.08em] text-brand-accent font-mono">
                  {String(idx + 1).padStart(2, "0")} · {TAG_LABEL[program.tag]}
                </p>
              </div>
              <div className="flex flex-col grow p-6">
                <h2 className="text-h4 text-foreground">{program.title}</h2>
                <p className="mt-2 text-body-sm text-brand-accent">
                  {program.tagline}
                </p>
                <p className="mt-4 text-body-sm text-foreground-muted leading-relaxed">
                  {program.body}
                </p>
              </div>
            </article>
          ))
        )}
      </div>
    </SectionWrapper>
  );
}
