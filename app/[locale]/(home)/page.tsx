import { setRequestLocale } from "next-intl/server";

import { HomeHero } from "@/components/sections/HomeHero";
import { HomeWhatWeDo } from "@/components/sections/HomeWhatWeDo";
import { HomeMediaSnapshot } from "@/components/sections/HomeMediaSnapshot";
import { HomeWhy } from "@/components/sections/HomeWhy";
import { HomePrograms } from "@/components/sections/HomePrograms";
import { HomePartners } from "@/components/sections/HomePartners";
import { HomeContactCTA } from "@/components/sections/HomeContactCTA";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <HomeHero />
      <HomeWhatWeDo />
      <HomeMediaSnapshot />
      <HomeWhy />
      <HomePrograms />
      <HomePartners />
      <HomeContactCTA />
    </main>
  );
}
