import { setRequestLocale } from "next-intl/server";

import { SectionWrapper } from "@/components/shared/SectionWrapper";

export const metadata = {
  title: "개인정보처리방침",
};

export default async function PrivacyPage({
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
        title="개인정보처리방침"
        description="운영팀이 본문 확정 후 적용됩니다."
        container="narrow"
      />
    </main>
  );
}
