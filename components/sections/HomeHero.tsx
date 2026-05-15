import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/shared/Container";

function HeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative aspect-square w-full max-w-md mx-auto lg:max-w-none"
    >
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="hero-dots"
            x="0"
            y="0"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.5" fill="rgba(255,255,255,0.12)" />
          </pattern>
        </defs>
        <rect width="400" height="400" fill="url(#hero-dots)" />
        {/* connector lines */}
        <line
          x1="80"
          y1="100"
          x2="260"
          y2="220"
          stroke="rgba(30,99,255,0.45)"
          strokeWidth="1"
        />
        <line
          x1="260"
          y1="220"
          x2="180"
          y2="320"
          stroke="rgba(30,99,255,0.45)"
          strokeWidth="1"
        />
        <line
          x1="260"
          y1="220"
          x2="340"
          y2="140"
          stroke="rgba(30,99,255,0.45)"
          strokeWidth="1"
        />
        {/* nodes */}
        <circle cx="80" cy="100" r="4" fill="rgb(30 99 255)" />
        <circle cx="260" cy="220" r="7" fill="rgb(30 99 255)">
          <animate
            attributeName="r"
            values="7;9;7"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="180" cy="320" r="3" fill="rgb(83 136 255)" />
        <circle cx="340" cy="140" r="4" fill="rgb(136 173 255)" />
        {/* outline rect highlight */}
        <rect
          x="40"
          y="40"
          width="320"
          height="320"
          rx="8"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-display-2 lg:text-[3rem] font-semibold text-foreground-inverse tracking-tight">
        {value}
      </p>
      <p className="mt-2 text-body-sm text-neutral-400">{label}</p>
    </div>
  );
}

export async function HomeHero() {
  const t = await getTranslations("home.hero");
  const tNav = await getTranslations("nav");

  return (
    <section className="bg-background-inverse text-foreground-inverse">
      <Container className="pt-20 pb-16 md:pt-24 md:pb-20 lg:pt-32 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <h1 className="text-[2.5rem] leading-[1.1] tracking-[-0.02em] font-bold lg:text-display-1 whitespace-pre-line">
              {t("headline")}
            </h1>
            <p className="mt-6 text-body-lg text-neutral-300 max-w-xl">
              {t("subheadline")}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/services">
                <Button variant="primary" size="lg">
                  {t("ctaPrimary")}
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="inverse" size="lg">
                  {t("ctaSecondary")}
                </Button>
              </Link>
            </div>
            <p className="sr-only">{tNav("ctaPrimary")}</p>
          </div>
          <div className="lg:col-span-5">
            <HeroVisual />
          </div>
        </div>

        <div className="mt-16 lg:mt-20 grid grid-cols-3 gap-6 lg:gap-12 max-w-3xl border-t border-white/10 pt-10 lg:pt-12">
          <Stat
            value={t("stats.yearsValue")}
            label={t("stats.yearsLabel")}
          />
          <Stat
            value={t("stats.audienceValue")}
            label={t("stats.audienceLabel")}
          />
          <Stat
            value={t("stats.partnersValue")}
            label={t("stats.partnersLabel")}
          />
        </div>
      </Container>
    </section>
  );
}
