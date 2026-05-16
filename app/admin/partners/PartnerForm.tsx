"use client";

import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";
import { ACTION_INIT } from "@/lib/admin";
import { cn } from "@/lib/utils";

import { createPartner, updatePartner } from "./actions";

export type PartnerCategory =
  | "SEMICONDUCTOR"
  | "DISTRIBUTION"
  | "MEASUREMENT"
  | "EMBEDDED"
  | "EDUCATION";

export interface PartnerFormData {
  id?: string;
  name: string;
  logoPath: string;
  category: PartnerCategory;
  externalUrl: string;
  consentDate: string;
  isPublished: boolean;
  displayOrder: number;
}

const CATEGORY_OPTIONS: Array<{ value: PartnerCategory; label: string }> = [
  { value: "SEMICONDUCTOR", label: "글로벌 반도체 기업" },
  { value: "DISTRIBUTION", label: "전자부품 유통" },
  { value: "MEASUREMENT", label: "계측·테스트" },
  { value: "EMBEDDED", label: "임베디드 / 소프트웨어" },
  { value: "EDUCATION", label: "교육 기관 / 협회" },
];

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "저장 중…" : label}
    </Button>
  );
}

export function PartnerForm({
  mode,
  defaults,
}: {
  mode: "create" | "edit";
  defaults: PartnerFormData;
}) {
  const action = mode === "create" ? createPartner : updatePartner;
  const [state, formAction] = useFormState(action, ACTION_INIT);

  return (
    <form action={formAction} encType="multipart/form-data" className="space-y-6">
      {defaults.id ? <input type="hidden" name="id" value={defaults.id} /> : null}

      <section className="rounded-lg border border-border bg-background p-6 lg:p-8 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px_100px] gap-4">
          <div>
            <Label htmlFor="name" required>
              회사명
            </Label>
            <Input
              id="name"
              name="name"
              defaultValue={defaults.name}
              required
              maxLength={200}
            />
          </div>
          <div>
            <Label htmlFor="category" required>
              카테고리
            </Label>
            <select
              id="category"
              name="category"
              defaultValue={defaults.category}
              required
              className={cn(
                "flex h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-body text-foreground shadow-sm",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent",
              )}
            >
              {CATEGORY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="displayOrder">순서</Label>
            <Input
              id="displayOrder"
              name="displayOrder"
              type="number"
              min={0}
              max={99}
              defaultValue={defaults.displayOrder}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="externalUrl">외부 URL (선택)</Label>
            <Input
              id="externalUrl"
              name="externalUrl"
              type="url"
              defaultValue={defaults.externalUrl}
              placeholder="https://..."
              maxLength={500}
            />
          </div>
          <div>
            <Label htmlFor="consentDate">로고 사용 동의일</Label>
            <Input
              id="consentDate"
              name="consentDate"
              type="date"
              defaultValue={defaults.consentDate}
            />
          </div>
        </div>

        <label className="inline-flex items-center gap-2 cursor-pointer">
          <Checkbox name="isPublished" defaultChecked={defaults.isPublished} />
          <span className="text-body-sm text-foreground">
            사이트에 공개 (동의일 등록 후 체크 권장)
          </span>
        </label>
      </section>

      <section className="rounded-lg border border-border bg-background p-6 lg:p-8 space-y-4">
        <h2 className="text-h5 text-foreground">로고</h2>
        {defaults.logoPath ? (
          <div className="flex items-center gap-4 rounded-md border border-border bg-background-muted p-4">
            <div className="h-16 w-32 rounded bg-background border border-border overflow-hidden flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={defaults.logoPath}
                alt={`${defaults.name} 로고`}
                className="max-h-12 max-w-28 object-contain"
              />
            </div>
            <div className="flex-1">
              <p className="text-caption font-mono text-foreground-muted break-all">
                {defaults.logoPath}
              </p>
              <p className="mt-1 text-caption text-foreground-muted">
                새 파일을 업로드하면 교체됩니다.
              </p>
            </div>
          </div>
        ) : (
          <p className="text-caption text-foreground-muted">
            아직 로고가 없습니다. SVG / PNG / JPG / WebP (최대 2MB) 업로드하세요.
          </p>
        )}
        <div>
          <Label htmlFor="logo" required={mode === "create"}>
            로고 파일 {mode === "create" ? "" : "(교체 시에만)"}
          </Label>
          <input
            id="logo"
            name="logo"
            type="file"
            accept=".svg,.png,.jpg,.jpeg,.webp,image/svg+xml,image/png,image/jpeg,image/webp"
            required={mode === "create"}
            className="block w-full text-body-sm text-foreground file:mr-4 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-brand-accent file:text-brand-accent-foreground file:text-button hover:file:bg-brand-accent-hover cursor-pointer"
          />
        </div>
      </section>

      <div className="flex items-center gap-4">
        <SubmitButton label={mode === "create" ? "생성" : "저장"} />
        {state.message ? (
          <p
            role="status"
            className={state.ok ? "text-caption text-success" : "text-caption text-error"}
          >
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
