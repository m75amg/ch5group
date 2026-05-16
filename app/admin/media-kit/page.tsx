import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeader } from "@/components/admin/PageHeader";
import { MediaKitUploadForm } from "./MediaKitUploadForm";
import { SetCurrentButton, DeleteMediaKitButton } from "./MediaKitActions";

export const dynamic = "force-dynamic";

function formatKb(kb: number): string {
  if (kb >= 1024) return `${(kb / 1024).toFixed(1)} MB`;
  return `${kb} KB`;
}

export default async function MediaKitAdminPage() {
  await requireAdminSession();
  const kits = await db.mediaKit.findMany({
    orderBy: { uploadedAt: "desc" },
  });

  return (
    <AdminShell>
      <PageHeader
        eyebrow="콘텐츠"
        title="미디어킷"
        description="Floating CTA와 Contact 사이드바의 '미디어킷 다운로드' 링크에 사용되는 PDF입니다. 현재로 설정된 한 버전만 사이트에 노출됩니다."
      />

      <div className="mt-8 space-y-6">
        <MediaKitUploadForm />

        <div className="overflow-x-auto rounded-lg border border-border bg-background">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-background-muted">
              <tr>
                {["업로드 일시", "버전", "크기", "현재", "다운로드", "관리"].map(
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
              {kits.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-body-sm text-foreground-muted"
                  >
                    아직 업로드된 미디어킷이 없습니다.
                  </td>
                </tr>
              ) : (
                kits.map((k) => (
                  <tr key={k.id} className="hover:bg-background-muted">
                    <td className="px-4 py-3 text-body-sm text-foreground-muted whitespace-nowrap">
                      {new Date(k.uploadedAt).toLocaleString("ko-KR")}
                    </td>
                    <td className="px-4 py-3 text-body-sm text-foreground">
                      {k.version}
                    </td>
                    <td className="px-4 py-3 text-caption font-mono text-foreground-muted">
                      {formatKb(k.fileSizeKb)}
                    </td>
                    <td className="px-4 py-3 text-body-sm">
                      {k.isCurrent ? (
                        <span className="inline-flex items-center justify-center h-6 px-2 rounded-md bg-success/10 text-success text-caption">
                          ● 현재
                        </span>
                      ) : (
                        <span className="text-neutral-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={k.filePath}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-button text-brand-accent hover:underline"
                      >
                        다운로드 ↗
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-4">
                        <SetCurrentButton
                          id={k.id}
                          alreadyCurrent={k.isCurrent}
                        />
                        <DeleteMediaKitButton id={k.id} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
