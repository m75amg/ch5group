import { setRequestLocale } from "next-intl/server";

import { SectionWrapper } from "@/components/shared/SectionWrapper";

export const metadata = {
  title: "이용약관",
};

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <SectionWrapper
        eyebrow="LEGAL"
        title="이용약관"
        description="운영팀이 본문 확정 후 적용됩니다."
        container="narrow"
      />
    </main>
  );
}
