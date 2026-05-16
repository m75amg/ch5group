import Link from "next/link";

import type { Prisma } from "@prisma/client";

import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeader } from "@/components/admin/PageHeader";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const STATUS_OPTIONS = [
  { value: "", label: "전체" },
  { value: "NEW", label: "신규" },
  { value: "IN_PROGRESS", label: "진행 중" },
  { value: "REPLIED", label: "회신 완료" },
  { value: "ARCHIVED", label: "보관" },
] as const;

const STATUS_LABEL: Record<string, string> = {
  NEW: "신규",
  IN_PROGRESS: "진행 중",
  REPLIED: "회신 완료",
  ARCHIVED: "보관",
};

const STATUS_COLOR: Record<string, string> = {
  NEW: "bg-brand-accent/10 text-brand-accent",
  IN_PROGRESS: "bg-warning/10 text-warning",
  REPLIED: "bg-success/10 text-success",
  ARCHIVED: "bg-neutral-200 text-foreground-muted",
};

const PAGE_SIZE = 20;

export default async function InquiriesAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string; page?: string }>;
}) {
  await requireAdminSession();
  const params = await searchParams;
  const statusFilter = params.status ?? "";
  const q = (params.q ?? "").trim();
  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);

  const where: Prisma.InquiryWhereInput = {};
  if (statusFilter === "NEW" || statusFilter === "IN_PROGRESS" || statusFilter === "REPLIED" || statusFilter === "ARCHIVED") {
    where.status = statusFilter;
  }
  if (q) {
    where.OR = [
      { company: { contains: q, mode: "insensitive" } },
      { name: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } },
    ];
  }

  const [total, items] = await Promise.all([
    db.inquiry.count({ where }),
    db.inquiry.findMany({
      where,
      orderBy: { submittedAt: "desc" },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function buildQs(next: Partial<{ status: string; q: string; page: number }>): string {
    const sp = new URLSearchParams();
    const s = next.status ?? statusFilter;
    const qNext = next.q ?? q;
    const p = next.page ?? page;
    if (s) sp.set("status", s);
    if (qNext) sp.set("q", qNext);
    if (p && p > 1) sp.set("page", String(p));
    const qs = sp.toString();
    return qs ? `?${qs}` : "";
  }

  return (
    <AdminShell>
      <PageHeader
        eyebrow="운영"
        title="문의 내역"
        description={`총 ${total}건. Contact 폼으로 제출된 모든 문의가 여기에 표시됩니다.`}
      />

      <form
        method="GET"
        className="mt-6 flex flex-wrap items-end gap-3 rounded-lg border border-border bg-background p-4"
      >
        <div className="flex flex-wrap gap-1">
          {STATUS_OPTIONS.map((opt) => {
            const active = opt.value === statusFilter;
            return (
              <Link
                key={opt.value}
                href={`/admin/inquiries${buildQs({ status: opt.value, page: 1 })}`}
                className={cn(
                  "inline-flex items-center h-9 px-3 rounded-md text-button transition-colors",
                  active
                    ? "bg-brand-accent text-brand-accent-foreground"
                    : "bg-background-muted text-foreground-muted hover:text-foreground",
                )}
              >
                {opt.label}
              </Link>
            );
          })}
        </div>
        <div className="ml-auto">
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="회사 / 이름 / 이메일 검색"
            className="flex h-9 w-72 rounded-md border border-border bg-background px-3 text-body-sm text-foreground placeholder:text-foreground-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
          />
          {statusFilter ? (
            <input type="hidden" name="status" value={statusFilter} />
          ) : null}
        </div>
      </form>

      <div className="mt-4 overflow-x-auto rounded-lg border border-border bg-background">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-background-muted">
            <tr>
              {["접수일시", "회사", "이름", "이메일", "관심 서비스", "상태"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-caption uppercase tracking-[0.08em] text-foreground-muted"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-body-sm text-foreground-muted"
                >
                  조회된 문의가 없습니다.
                </td>
              </tr>
            ) : (
              items.map((i) => (
                <tr
                  key={i.id}
                  className="hover:bg-background-muted cursor-pointer"
                >
                  <td colSpan={6} className="p-0">
                    <Link
                      href={`/admin/inquiries/${i.id}`}
                      className="grid grid-cols-[140px_1fr_120px_1.5fr_2fr_120px] gap-4 px-4 py-3"
                    >
                      <span className="text-body-sm text-foreground-muted whitespace-nowrap">
                        {new Date(i.submittedAt).toLocaleString("ko-KR", {
                          year: "2-digit",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span className="text-body-sm text-foreground truncate">
                        {i.company}
                      </span>
                      <span className="text-body-sm text-foreground truncate">
                        {i.name}
                      </span>
                      <span className="text-body-sm text-foreground-muted truncate">
                        {i.email}
                      </span>
                      <span className="text-body-sm text-foreground-muted truncate">
                        {Array.isArray(i.interests)
                          ? (i.interests as string[]).join(", ")
                          : ""}
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center justify-center h-6 px-2 rounded-md text-caption",
                          STATUS_COLOR[i.status] ?? "bg-neutral-200 text-foreground-muted",
                        )}
                      >
                        {STATUS_LABEL[i.status]}
                      </span>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 ? (
        <nav className="mt-4 flex items-center justify-between">
          <p className="text-caption text-foreground-muted">
            {page} / {totalPages} 페이지
          </p>
          <div className="flex gap-2">
            {page > 1 ? (
              <Link
                href={`/admin/inquiries${buildQs({ page: page - 1 })}`}
                className="inline-flex items-center h-9 px-3 rounded-md text-button text-foreground-muted hover:text-foreground hover:bg-neutral-100"
              >
                이전
              </Link>
            ) : null}
            {page < totalPages ? (
              <Link
                href={`/admin/inquiries${buildQs({ page: page + 1 })}`}
                className="inline-flex items-center h-9 px-3 rounded-md text-button text-brand-accent hover:bg-brand-accent/10"
              >
                다음
              </Link>
            ) : null}
          </div>
        </nav>
      ) : null}
    </AdminShell>
  );
}
