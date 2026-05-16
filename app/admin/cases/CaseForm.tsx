"use client";

import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";
import { ACTION_INIT } from "@/lib/admin";

import { createCase, updateCase } from "./actions";

export interface CaseFormData {
  id?: string;
  partnerName: string;
  typeKo: string;
  typeEn: string;
  titleKo: string;
  titleEn: string;
  bodyKo: string;
  bodyEn: string;
  isPublished: boolean;
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

export function CaseForm({
  mode,
  defaults,
}: {
  mode: "create" | "edit";
  defaults: CaseFormData;
}) {
  const action = mode === "create" ? createCase : updateCase;
  const [state, formAction] = useFormState(action, ACTION_INIT);

  return (
    <form action={formAction} className="space-y-6">
      {defaults.id ? <input type="hidden" name="id" value={defaults.id} /> : null}

      <section className="rounded-lg border border-border bg-background p-6 lg:p-8 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="partnerName">파트너명 (선택)</Label>
            <Input
              id="partnerName"
              name="partnerName"
              defaultValue={defaults.partnerName}
              placeholder="비공개 시 비워두세요"
              maxLength={200}
            />
            <p className="mt-1 text-caption text-foreground-muted">
              비워두면 익명 사례로 노출됩니다.
            </p>
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
            <Label htmlFor="typeKo" required>
              형태 (KO)
            </Label>
            <Input
              id="typeKo"
              name="typeKo"
              defaultValue={defaults.typeKo}
              placeholder="웨비나 시리즈"
              required
              maxLength={200}
            />
          </div>
          <div>
            <Label htmlFor="typeEn" required>
              형태 (EN)
            </Label>
            <Input
              id="typeEn"
              name="typeEn"
              defaultValue={defaults.typeEn}
              placeholder="Webinar series"
              required
              maxLength={200}
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
              maxLength={300}
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
              maxLength={300}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bodyKo">본문 (KO, 선택)</Label>
            <Textarea
              id="bodyKo"
              name="bodyKo"
              defaultValue={defaults.bodyKo}
              rows={5}
              maxLength={4000}
            />
          </div>
          <div>
            <Label htmlFor="bodyEn">본문 (EN, 선택)</Label>
            <Textarea
              id="bodyEn"
              name="bodyEn"
              defaultValue={defaults.bodyEn}
              rows={5}
              maxLength={4000}
            />
          </div>
        </div>

        <label className="inline-flex items-center gap-2 cursor-pointer">
          <Checkbox name="isPublished" defaultChecked={defaults.isPublished} />
          <span className="text-body-sm text-foreground">
            Partners 페이지에 공개
          </span>
        </label>
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
