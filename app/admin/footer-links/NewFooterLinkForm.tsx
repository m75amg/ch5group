"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useRef, useEffect } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";
import { ACTION_INIT } from "@/lib/admin";

import { createFooterLink } from "./actions";

function AddButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="sm" disabled={pending}>
      <Plus className="h-4 w-4 mr-1" />
      {pending ? "추가 중…" : "추가"}
    </Button>
  );
}

export function NewFooterLinkForm({
  nextOrder,
}: {
  nextOrder: number;
}) {
  const [state, formAction] = useFormState(createFooterLink, ACTION_INIT);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="rounded-lg border border-dashed border-border bg-background-muted p-5"
    >
      <p className="text-eyebrow uppercase tracking-[0.08em] text-foreground-muted">
        새 링크 추가
      </p>
      <div className="mt-3 grid grid-cols-1 lg:grid-cols-[1fr_2fr_140px_80px_auto] gap-4 lg:gap-6 items-end">
        <div>
          <Label htmlFor="new-label" required>
            라벨
          </Label>
          <Input
            id="new-label"
            name="label"
            placeholder="새 플랫폼 이름"
            required
            maxLength={120}
          />
        </div>
        <div>
          <Label htmlFor="new-url" required>
            URL
          </Label>
          <Input
            id="new-url"
            name="url"
            type="url"
            placeholder="https://..."
            required
            maxLength={500}
          />
        </div>
        <div>
          <Label htmlFor="new-isExternal">외부 링크</Label>
          <div className="flex items-center gap-2 h-11">
            <Checkbox id="new-isExternal" name="isExternal" defaultChecked />
            <span className="text-body-sm text-foreground-muted">
              target=_blank
            </span>
          </div>
        </div>
        <div>
          <Label htmlFor="new-displayOrder">순서</Label>
          <Input
            id="new-displayOrder"
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
