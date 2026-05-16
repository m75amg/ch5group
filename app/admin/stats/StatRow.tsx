"use client";

import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { ACTION_INIT } from "@/lib/admin";
import { updateStat } from "./actions";

export interface StatRowData {
  key: string;
  value: string;
  labelKo: string;
  labelEn: string;
  displayOrder: number;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="sm" disabled={pending}>
      {pending ? "저장 중…" : "저장"}
    </Button>
  );
}

export function StatRow({ stat }: { stat: StatRowData }) {
  const [state, formAction] = useFormState(updateStat, ACTION_INIT);

  return (
    <form
      action={formAction}
      className="rounded-lg border border-border bg-background p-5"
    >
      <input type="hidden" name="key" value={stat.key} />
      <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr_1fr_1fr_100px_auto] gap-4 lg:gap-6 items-end">
        <div>
          <p className="text-caption uppercase tracking-[0.08em] text-foreground-muted">
            Key
          </p>
          <p className="mt-1 font-mono text-button text-brand-accent">
            {stat.key}
          </p>
        </div>
        <div>
          <Label htmlFor={`value-${stat.key}`} required>
            Value
          </Label>
          <Input
            id={`value-${stat.key}`}
            name="value"
            defaultValue={stat.value}
            placeholder="16+"
            required
            maxLength={20}
          />
        </div>
        <div>
          <Label htmlFor={`labelKo-${stat.key}`} required>
            라벨 (KO)
          </Label>
          <Input
            id={`labelKo-${stat.key}`}
            name="labelKo"
            defaultValue={stat.labelKo}
            placeholder="운영 연수"
            required
            maxLength={100}
          />
        </div>
        <div>
          <Label htmlFor={`labelEn-${stat.key}`} required>
            라벨 (EN)
          </Label>
          <Input
            id={`labelEn-${stat.key}`}
            name="labelEn"
            defaultValue={stat.labelEn}
            placeholder="Years operating"
            required
            maxLength={100}
          />
        </div>
        <div>
          <Label htmlFor={`displayOrder-${stat.key}`}>순서</Label>
          <Input
            id={`displayOrder-${stat.key}`}
            name="displayOrder"
            type="number"
            min={0}
            max={99}
            defaultValue={stat.displayOrder}
          />
        </div>
        <SubmitButton />
      </div>
      {state.message ? (
        <p
          role="status"
          className={
            state.ok
              ? "mt-3 text-caption text-success"
              : "mt-3 text-caption text-error"
          }
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
