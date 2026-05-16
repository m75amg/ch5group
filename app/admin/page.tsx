import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminShell } from "@/components/admin/AdminShell";
import { Card } from "@/components/ui/Card";

export const dynamic = "force-dynamic";

async function getDashboardData() {
  const [
    inquiriesTotal,
    inquiriesNew,
    recentInquiries,
    partnersCount,
    programsCount,
    casesCount,
  ] = await Promise.all([
    db.inquiry.count(),
    db.inquiry.count({ where: { status: "NEW" } }),
    db.inquiry.findMany({
      take: 5,
      orderBy: { submittedAt: "desc" },
      select: {
        id: true,
        company: true,
        name: true,
        email: true,
        status: true,
        submittedAt: true,
        interests: true,
      },
    }),
    db.partner.count({ where: { isPublished: true } }),
    db.program.count({ where: { isFeatured: true } }),
    db.case.count({ where: { isPublished: true } }),
  ]);

  return {
    inquiriesTotal,
    inquiriesNew,
    recentInquiries,
    partnersCount,
    programsCount,
    casesCount,
  };
}

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const data = await getDashboardData();

  return (
    <AdminShell>
      <h1 className="text-h2 text-foreground tracking-tight">대시보드</h1>
      <p className="mt-2 text-body text-foreground-muted">
        안녕하세요, {session.user.name}님. 이번 주 상태입니다.
      </p>

      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="default" className="!p-5">
          <p className="text-caption uppercase tracking-[0.08em] text-foreground-muted">
            신규 문의
          </p>
          <p className="mt-2 text-h2 text-brand-accent font-semibold">
            {data.inquiriesNew}
          </p>
          <p className="mt-1 text-caption text-foreground-muted">
            누적 {data.inquiriesTotal}건
          </p>
        </Card>
        <Card variant="default" className="!p-5">
          <p className="text-caption uppercase tracking-[0.08em] text-foreground-muted">
            공개 파트너
          </p>
          <p className="mt-2 text-h2 text-foreground font-semibold">
            {data.partnersCount}
          </p>
        </Card>
        <Card variant="default" className="!p-5">
          <p className="text-caption uppercase tracking-[0.08em] text-foreground-muted">
            노출 프로그램
          </p>
          <p className="mt-2 text-h2 text-foreground font-semibold">
            {data.programsCount}
          </p>
        </Card>
        <Card variant="default" className="!p-5">
          <p className="text-caption uppercase tracking-[0.08em] text-foreground-muted">
            공개 사례
          </p>
          <p className="mt-2 text-h2 text-foreground font-semibold">
            {data.casesCount}
          </p>
        </Card>
      </div>

      <section className="mt-10">
        <div className="flex items-end justify-between">
          <h2 className="text-h4 text-foreground">최근 문의 5건</h2>
        </div>
        <div className="mt-4 overflow-x-auto rounded-lg border border-border bg-background">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-background-muted">
              <tr>
                {["일시", "회사", "이름", "이메일", "관심 서비스", "상태"].map(
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
              {data.recentInquiries.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-body-sm text-foreground-muted"
                  >
                    아직 접수된 문의가 없습니다.
                  </td>
                </tr>
              ) : (
                data.recentInquiries.map((i) => (
                  <tr key={i.id} className="hover:bg-background-muted">
                    <td className="px-4 py-3 text-body-sm text-foreground-muted whitespace-nowrap">
                      {new Date(i.submittedAt).toLocaleString("ko-KR", {
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3 text-body-sm text-foreground">
                      {i.company}
                    </td>
                    <td className="px-4 py-3 text-body-sm text-foreground">
                      {i.name}
                    </td>
                    <td className="px-4 py-3 text-body-sm text-foreground-muted">
                      {i.email}
                    </td>
                    <td className="px-4 py-3 text-body-sm text-foreground-muted">
                      {Array.isArray(i.interests)
                        ? (i.interests as string[]).join(", ")
                        : ""}
                    </td>
                    <td className="px-4 py-3 text-caption font-mono text-brand-accent">
                      {i.status}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AdminShell>
  );
}
