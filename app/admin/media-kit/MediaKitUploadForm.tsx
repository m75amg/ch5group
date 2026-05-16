"use client";

import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { ACTION_INIT } from "@/lib/admin";

import { uploadMediaKit } from "./actions";

function UploadBtn() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "업로드 중…" : "업로드"}
    </Button>
  );
}

export function MediaKitUploadForm() {
  const [state, formAction] = useFormState(uploadMediaKit, ACTION_INIT);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) ref.current?.reset();
  }, [state]);

  return (
    <form
      ref={ref}
      action={formAction}
      encType="multipart/form-data"
      className="rounded-lg border border-dashed border-border bg-background-muted p-6 space-y-4"
    >
      <h2 className="text-h5 text-foreground">새 버전 업로드</h2>
      <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr_auto] gap-4 items-end">
        <div>
          <Label htmlFor="version" required>
            버전
          </Label>
          <Input
            id="version"
            name="version"
            placeholder="2026 Q2"
            required
            maxLength={60}
          />
        </div>
        <div>
          <Label htmlFor="file" required>
            PDF 파일 (최대 20MB)
          </Label>
          <input
            id="file"
            name="file"
            type="file"
            accept=".pdf,application/pdf"
            required
            className="block w-full text-body-sm text-foreground file:mr-4 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-brand-accent file:text-brand-accent-foreground file:text-button hover:file:bg-brand-accent-hover cursor-pointer"
          />
        </div>
        <UploadBtn />
      </div>
      {state.message ? (
        <p
          role="status"
          className={state.ok ? "text-caption text-success" : "text-caption text-error"}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
