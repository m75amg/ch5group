"use client";

import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";
import { ACTION_INIT } from "@/lib/admin";
import { cn } from "@/lib/utils";

import { createProgram, updateProgram } from "./actions";

export type ProgramTag = "CONFERENCE" | "CONTEST" | "EDUCATION";

export interface ProgramFormData {
  id?: string;
  slug: string;
  titleKo: string;
  titleEn: string;
  tag: ProgramTag;
  taglineKo: string;
  taglineEn: string;
  bodyKo: string;
  bodyEn: string;
  imagePath: string;
  externalUrl: string;
  eventDate: string;
  isFeatured: boolean;
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

export function ProgramForm({
  mode,
  defaults,
}: {
  mode: "create" | "edit";
  defaults: ProgramFormData;
}) {
  const action = mode === "create" ? createProgram : updateProgram;
  const [state, formAction] = useFormState(action, ACTION_INIT);

  return (
    <form action={formAction} className="space-y-8">
      {defaults.id ? (
        <input type="hidden" name="id" value={defaults.id} />
      ) : null}

      <section className="rounded-lg border border-border bg-background p-6 lg:p-8">
        <h2 className="text-h5 text-foreground">기본 정보</h2>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="slug" required>
              Slug
            </Label>
            <Input
              id="slug"
              name="slug"
              defaultValue={defaults.slug}
              placeholder="physicalAI"
              required
              maxLength={60}
              pattern="[a-zA-Z][a-zA-Z0-9\-]*"
              disabled={mode === "edit"}
              className={mode === "edit" ? "bg-neutral-100" : ""}
            />
            <p className="mt-1 text-caption text-foreground-muted">
              영문 시작, 영숫자·하이픈만 (URL anchor에 사용)
            </p>
          </div>

          <div>
            <Label htmlFor="tag" required>
              태그
            </Label>
            <select
              id="tag"
              name="tag"
              defaultValue={defaults.tag}
              required
              className={cn(
                "flex h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-body text-foreground shadow-sm",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:border-transparent",
              )}
            >
              <option value="CONFERENCE">Conference</option>
              <option value="CONTEST">Contest</option>
              <option value="EDUCATION">Education</option>
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

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
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

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="taglineKo" required>
              태그라인 (KO)
            </Label>
            <Input
              id="taglineKo"
              name="taglineKo"
              defaultValue={defaults.taglineKo}
              required
              maxLength={300}
            />
          </div>
          <div>
            <Label htmlFor="taglineEn" required>
              태그라인 (EN)
            </Label>
            <Input
              id="taglineEn"
              name="taglineEn"
              defaultValue={defaults.taglineEn}
              required
              maxLength={300}
            />
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-background p-6 lg:p-8">
        <h2 className="text-h5 text-foreground">본문</h2>
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bodyKo" required>
              본문 (KO)
            </Label>
            <Textarea
              id="bodyKo"
              name="bodyKo"
              defaultValue={defaults.bodyKo}
              rows={8}
              required
              maxLength={4000}
            />
          </div>
          <div>
            <Label htmlFor="bodyEn" required>
              본문 (EN)
            </Label>
            <Textarea
              id="bodyEn"
              name="bodyEn"
              defaultValue={defaults.bodyEn}
              rows={8}
              required
              maxLength={4000}
            />
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-background p-6 lg:p-8">
        <h2 className="text-h5 text-foreground">메타</h2>
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="imagePath">이미지 경로</Label>
            <Input
              id="imagePath"
              name="imagePath"
              defaultValue={defaults.imagePath}
              placeholder="/uploads/programs/..."
              maxLength={500}
            />
            <p className="mt-1 text-caption text-foreground-muted">
              파일 업로드는 Phase 8-N 예정
            </p>
          </div>
          <div>
            <Label htmlFor="externalUrl">외부 URL</Label>
            <Input
              id="externalUrl"
              name="externalUrl"
              type="url"
              defaultValue={defaults.externalUrl}
              placeholder="https://www.e4ds.com/..."
              maxLength={500}
            />
          </div>
          <div>
            <Label htmlFor="eventDate">행사 일정</Label>
            <Input
              id="eventDate"
              name="eventDate"
              type="date"
              defaultValue={defaults.eventDate}
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <Checkbox
              name="isFeatured"
              defaultChecked={defaults.isFeatured}
            />
            <span className="text-body-sm text-foreground">
              Home Featured Programs 섹션에 노출
            </span>
          </label>
        </div>
      </section>

      <div className="flex items-center gap-4">
        <SubmitButton label={mode === "create" ? "생성" : "저장"} />
        {state.message ? (
          <p
            role="status"
            className={
              state.ok ? "text-caption text-success" : "text-caption text-error"
            }
          >
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
