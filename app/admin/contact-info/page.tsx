import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeader } from "@/components/admin/PageHeader";
import { ContactInfoForm, type ContactInfoFormData } from "./ContactInfoForm";

export const dynamic = "force-dynamic";

interface BiJson {
  ko?: string;
  en?: string;
}

export default async function ContactInfoAdminPage() {
  await requireAdminSession();

  const record = await db.contactInfo.findUnique({ where: { id: 1 } });

  const address = (record?.address ?? {}) as BiJson;
  const hours = (record?.hours ?? {}) as BiJson;

  const data: ContactInfoFormData = {
    addressKo: address.ko ?? "",
    addressEn: address.en ?? "",
    phone: record?.phone ?? "",
    email: record?.email ?? "",
    hoursKo: hours.ko ?? "",
    hoursEn: hours.en ?? "",
  };

  return (
    <AdminShell>
      <PageHeader
        eyebrow="회사 정보"
        title="연락처 정보"
        description="Footer 4컬럼과 Contact 페이지 사이드바에 노출되는 회사 정보입니다."
      />
      <div className="mt-8">
        <ContactInfoForm data={data} />
      </div>
    </AdminShell>
  );
}
