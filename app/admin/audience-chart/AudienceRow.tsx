"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { ACTION_INIT } from "@/lib/admin";

import { deleteAudience, updateAudience } from "./actions";

export interface AudienceRowData {
  id: string;
  chartType: "ROLE" | "INDUSTRY";
  nameKo: string;
  nameEn: string;
  value: number;
  displayOrder: number;
}

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="sm" disabled={pending}>
      {pending ? "저장 중…" : "저장"}
    </Button>
  );
}

function DeleteBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (!confirm("정말 삭제하시겠습니까?")) e.preventDefault();
      }}
      aria-label="삭제"
      className="inline-flex items-center justify-center h-9 w-9 rounded-md text-error hover:bg-error/10 disabled:opacity-50"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}

export function AudienceRow({ row }: { row: AudienceRowData }) {
  const [updState, updAction] = useFormState(updateAudience, ACTION_INIT);
  const [delState, delAction] = useFormState(deleteAudience, ACTION_INIT);

  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <form action={updAction}>
        <input type="hidden" name="id" value={row.id} />
        <input type="hidden" name="chartType" value={row.chartType} />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_100px_80px_auto_auto] gap-3 lg:gap-4 items-end">
          <div>
            <Label htmlFor={`nameKo-${row.id}`} required>
              이름 (KO)
            </Label>
            <Input
              id={`nameKo-${row.id}`}
              name="nameKo"
              defaultValue={row.nameKo}
              required
              maxLength={100}
            />
          </div>
          <div>
            <Label htmlFor={`nameEn-${row.id}`} required>
              이름 (EN)
            </Label>
            <Input
              id={`nameEn-${row.id}`}
              name="nameEn"
              defaultValue={row.nameEn}
              required
              maxLength={100}
            />
          </div>
          <div>
            <Label htmlFor={`value-${row.id}`} required>
              비율 (%)
            </Label>
            <Input
              id={`value-${row.id}`}
              name="value"
              type="number"
              min={0}
              max={100}
              defaultValue={row.value}
              required
            />
          </div>
          <div>
            <Label htmlFor={`displayOrder-${row.id}`}>순서</Label>
            <Input
              id={`displayOrder-${row.id}`}
              name="displayOrder"
              type="number"
              min={0}
              max={99}
              defaultValue={row.displayOrder}
            />
          </div>
          <SaveButton />
        </div>
        {updState.message ? (
          <p
            role="status"
            className={
              updState.ok
                ? "mt-2 text-caption text-success"
                : "mt-2 text-caption text-error"
            }
          >
            {updState.message}
          </p>
        ) : null}
      </form>
      <form action={delAction} className="mt-2 flex justify-end">
        <input type="hidden" name="id" value={row.id} />
        <DeleteBtn />
      </form>
      {delState.message && !delState.ok ? (
        <p role="alert" className="mt-1 text-caption text-error">
          {delState.message}
        </p>
      ) : null}
    </div>
  );
}
