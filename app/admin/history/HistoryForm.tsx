"use client";

import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { ACTION_INIT } from "@/lib/admin";

import { createHistoryItem, updateHistoryItem } from "./actions";

export interface HistoryFormData {
  id?: string;
  year: string;
  titleKo: string;
  titleEn: string;
  descriptionKo: string;
  descriptionEn: string;
  displayOrder: number;
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "저장 중…" : label}
    </Button>
  );
}

export function HistoryForm({
  mode,
  defaults,
}: {
  mode: "create" | "edit";
  defaults: HistoryFormData;
}) {
  const action = mode === "create" ? createHistoryItem : updateHistoryItem;
  const [state, formAction] = useFormState(action, ACTION_INIT);

  return (
    <form action={formAction} className="space-y-6">
      {defaults.id ? <input type="hidden" name="id" value={defaults.id} /> : null}

      <section className="rounded-lg border border-border bg-background p-6 lg:p-8 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-4">
          <div>
            <Label htmlFor="year" required>
              연도
            </Label>
            <Input
              id="year"
              name="year"
              defaultValue={defaults.year}
              placeholder="2009 또는 —"
              required
              maxLength={20}
            />
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
            <Label htmlFor="titleKo" required>
              제목 (KO)
            </Label>
            <Input
              id="titleKo"
              name="titleKo"
              defaultValue={defaults.titleKo}
              required
              maxLength={200}
            />
          </div>
          <div>
            <Label htmlFor="titleEn" required>
              제목 (EN)
            </Label>
            <Input
              id="titleEn"
              name="titleEn"
              defaultValue={defaults.titleEn}
              required
              maxLength={200}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="descriptionKo" required>
              설명 (KO)
            </Label>
            <Textarea
              id="descriptionKo"
              name="descriptionKo"
              defaultValue={defaults.descriptionKo}
              rows={4}
              required
              maxLength={1000}
            />
          </div>
          <div>
            <Label htmlFor="descriptionEn" required>
              설명 (EN)
            </Label>
            <Textarea
              id="descriptionEn"
              name="descriptionEn"
              defaultValue={defaults.descriptionEn}
              rows={4}
              required
              maxLength={1000}
            />
          </div>
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
