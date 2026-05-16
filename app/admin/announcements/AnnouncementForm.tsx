"use client";

import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";
import { ACTION_INIT } from "@/lib/admin";

import { createAnnouncement, updateAnnouncement } from "./actions";

export interface AnnouncementFormData {
  id?: string;
  messageKo: string;
  messageEn: string;
  linkUrl: string;
  startsAt: string;
  endsAt: string;
  isActive: boolean;
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "저장 중…" : label}
    </Button>
  );
}

export function AnnouncementForm({
  mode,
  defaults,
}: {
  mode: "create" | "edit";
  defaults: AnnouncementFormData;
}) {
  const action = mode === "create" ? createAnnouncement : updateAnnouncement;
  const [state, formAction] = useFormState(action, ACTION_INIT);

  return (
    <form action={formAction} className="space-y-6">
      {defaults.id ? <input type="hidden" name="id" value={defaults.id} /> : null}

      <section className="rounded-lg border border-border bg-background p-6 lg:p-8 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="messageKo" required>
              메시지 (KO)
            </Label>
            <Textarea
              id="messageKo"
              name="messageKo"
              defaultValue={defaults.messageKo}
              rows={3}
              required
              maxLength={500}
            />
          </div>
          <div>
            <Label htmlFor="messageEn" required>
              메시지 (EN)
            </Label>
            <Textarea
              id="messageEn"
              name="messageEn"
              defaultValue={defaults.messageEn}
              rows={3}
              required
              maxLength={500}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-3">
            <Label htmlFor="linkUrl">링크 URL (선택)</Label>
            <Input
              id="linkUrl"
              name="linkUrl"
              type="url"
              defaultValue={defaults.linkUrl}
              placeholder="https://..."
              maxLength={500}
            />
          </div>
          <div>
            <Label htmlFor="startsAt">시작 일시 (선택)</Label>
            <Input
              id="startsAt"
              name="startsAt"
              type="datetime-local"
              defaultValue={defaults.startsAt}
            />
          </div>
          <div>
            <Label htmlFor="endsAt">종료 일시 (선택)</Label>
            <Input
              id="endsAt"
              name="endsAt"
              type="datetime-local"
              defaultValue={defaults.endsAt}
            />
          </div>
          <div>
            <Label htmlFor="isActive">활성화</Label>
            <div className="flex items-center gap-2 h-11">
              <Checkbox
                id="isActive"
                name="isActive"
                defaultChecked={defaults.isActive}
              />
              <span className="text-body-sm text-foreground-muted">
                ON일 때만 사이트 상단에 노출
              </span>
            </div>
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
