import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeader } from "@/components/admin/PageHeader";
import { InquiryUpdateForm } from "./InquiryUpdateForm";

export const dynamic = "force-dynamic";

function Field({
  label,
  value,
  copyable,
}: {
  label: string;
  value: React.ReactNode;
  copyable?: boolean;
}) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-4 py-3 border-b border-border last:border-b-0">
      <p className="text-caption uppercase tracking-[0.08em] text-foreground-muted">
        {label}
      </p>
      <p className="text-body-sm text-foreground break-words">
        {value ?? <span className="text-foreground-muted italic">—</span>}
        {copyable && typeof value === "string" ? (
          <a
            href={`mailto:${value}`}
            className="ml-2 text-caption text-brand-accent hover:underline"
          >
            메일 보내기
          </a>
        ) : null}
      </p>
    </div>
  );
}

export default async function InquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminSession();
  const { id } = await params;
  const record = await db.inquiry.findUnique({ where: { id } });
  if (!record) notFound();

  const interests = Array.isArray(record.interests)
    ? (record.interests as string[]).join(", ")
    : "";

  return (
    <AdminShell>
      <Link
        href="/admin/inquiries"
        className="inline-flex items-center gap-1 text-button text-foreground-muted hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        문의 목록으로
      </Link>
      <PageHeader
        eyebrow="운영"
        title={`${record.company} · ${record.name}`}
        description={`접수: ${new Date(record.submittedAt).toLocaleString("ko-KR")}`}
        className="mt-3"
      />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
        <article className="rounded-lg border border-border bg-background p-6 lg:p-8">
          <h2 className="text-h5 text-foreground">문의 내용</h2>
          <div className="mt-4">
            <Field label="회사명" value={record.company} />
            <Field label="이름" value={record.name} />
            <Field label="직책" value={record.position} />
            <Field label="이메일" value={record.email} copyable />
            <Field label="전화" value={record.phone} />
            <Field label="관심 서비스" value={interests} />
            <Field label="희망 시기" value={record.timeline} />
            <Field
              label="미디어킷 요청"
              value={record.requestMediaKit ? "예" : "아니오"}
            />
            <Field label="언어" value={record.locale.toUpperCase()} />
            <Field
              label="메시지"
              value={
                <span className="whitespace-pre-wrap leading-relaxed">
                  {record.message}
                </span>
              }
            />
          </div>
        </article>

        <aside>
          <InquiryUpdateForm
            data={{
              id: record.id,
              status: record.status,
              internalNote: record.internalNote ?? "",
            }}
          />
        </aside>
      </div>
    </AdminShell>
  );
}
