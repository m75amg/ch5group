"use client";

import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { ACTION_INIT } from "@/lib/admin";
import { cn } from "@/lib/utils";

import { updateInquiry, deleteInquiry } from "../actions";

const STATUS = ["NEW", "IN_PROGRESS", "REPLIED", "ARCHIVED"] as const;
const STATUS_LABEL: Record<string, string> = {
  NEW: "신규",
  IN_PROGRESS: "진행 중",
  REPLIED: "회신 완료",
  ARCHIVED: "보관",
};

export interface InquiryUpdateFormData {
  id: string;
  status: (typeof STATUS)[number];
  internalNote: string;
}

function SaveBtn() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "저장 중…" : "저장"}
    </Button>
  );
}

function DelBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (!confirm("이 문의를 정말 삭제하시겠습니까?")) e.preventDefault();
      }}
      className="text-button text-error hover:underline disabled:opacity-50"
    >
      {pending ? "삭제 중…" : "이 문의 삭제"}
    </button>
  );
}

export function InquiryUpdateForm({ data }: { data: InquiryUpdateFormData }) {
  const [state, formAction] = useFormState(updateInquiry, ACTION_INIT);
  const [, delAction] = useFormState(deleteInquiry, ACTION_INIT);

  return (
    <div className="space-y-6">
      <form
        action={formAction}
        className="rounded-lg border border-border bg-background p-6 lg:p-8 space-y-6"
      >
        <input type="hidden" name="id" value={data.id} />

        <div>
          <Label htmlFor="status" required>
            상태
          </Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {STATUS.map((s) => (
              <label
                key={s}
                className="inline-flex items-center cursor-pointer"
              >
                <input
                  type="radio"
                  name="status"
                  value={s}
                  defaultChecked={data.status === s}
                  className="peer sr-only"
                />
                <span
                  className={cn(
                    "inline-flex items-center h-9 px-3 rounded-md text-button border transition-colors",
                    "border-border bg-background text-foreground-muted",
                    "peer-checked:bg-brand-accent peer-checked:text-brand-accent-foreground peer-checked:border-brand-accent",
                  )}
                >
                  {STATUS_LABEL[s]}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="internalNote">내부 메모</Label>
          <Textarea
            id="internalNote"
            name="internalNote"
            defaultValue={data.internalNote}
            rows={5}
            maxLength={4000}
            placeholder="응대 이력, 담당자, 다음 액션 등 (사이트에 노출되지 않음)"
          />
        </div>

        <div className="flex items-center gap-4">
          <SaveBtn />
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

      <form action={delAction} className="flex justify-end">
        <input type="hidden" name="id" value={data.id} />
        <DelBtn />
      </form>
    </div>
  );
}
