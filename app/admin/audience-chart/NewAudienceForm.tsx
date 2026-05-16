"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { ACTION_INIT } from "@/lib/admin";

import { createAudience } from "./actions";

function AddButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="sm" disabled={pending}>
      <Plus className="h-4 w-4 mr-1" />
      {pending ? "추가 중…" : "추가"}
    </Button>
  );
}

export function NewAudienceForm({
  chartType,
  nextOrder,
}: {
  chartType: "ROLE" | "INDUSTRY";
  nextOrder: number;
}) {
  const [state, formAction] = useFormState(createAudience, ACTION_INIT);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) ref.current?.reset();
  }, [state]);

  return (
    <form
      ref={ref}
      action={formAction}
      className="rounded-lg border border-dashed border-border bg-background-muted p-4"
    >
      <input type="hidden" name="chartType" value={chartType} />
      <p className="text-eyebrow uppercase tracking-[0.08em] text-foreground-muted">
        새 항목 추가
      </p>
      <div className="mt-3 grid grid-cols-1 lg:grid-cols-[1fr_1fr_100px_80px_auto] gap-3 lg:gap-4 items-end">
        <div>
          <Label htmlFor={`new-nameKo-${chartType}`} required>
            이름 (KO)
          </Label>
          <Input
            id={`new-nameKo-${chartType}`}
            name="nameKo"
            placeholder="새 항목"
            required
            maxLength={100}
          />
        </div>
        <div>
          <Label htmlFor={`new-nameEn-${chartType}`} required>
            이름 (EN)
          </Label>
          <Input
            id={`new-nameEn-${chartType}`}
            name="nameEn"
            placeholder="New segment"
            required
            maxLength={100}
          />
        </div>
        <div>
          <Label htmlFor={`new-value-${chartType}`} required>
            비율 (%)
          </Label>
          <Input
            id={`new-value-${chartType}`}
            name="value"
            type="number"
            min={0}
            max={100}
            defaultValue={0}
            required
          />
        </div>
        <div>
          <Label htmlFor={`new-displayOrder-${chartType}`}>순서</Label>
          <Input
            id={`new-displayOrder-${chartType}`}
            name="displayOrder"
            type="number"
            min={0}
            max={99}
            defaultValue={nextOrder}
          />
        </div>
        <AddButton />
      </div>
      {state.message ? (
        <p
          role="status"
          className={
            state.ok
              ? "mt-2 text-caption text-success"
              : "mt-2 text-caption text-error"
          }
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
