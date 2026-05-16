"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Trash2, Check } from "lucide-react";

import { ACTION_INIT } from "@/lib/admin";
import { setCurrentMediaKit, deleteMediaKit } from "./actions";

function SetCurrentInner({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="inline-flex items-center gap-1 text-button text-brand-accent hover:underline disabled:opacity-30 disabled:no-underline disabled:cursor-not-allowed"
    >
      <Check className="h-4 w-4" />
      {pending ? "변경 중…" : "현재로 설정"}
    </button>
  );
}

function DelInner() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (!confirm("정말 삭제하시겠습니까?")) e.preventDefault();
      }}
      className="inline-flex items-center gap-1 text-button text-error hover:underline disabled:opacity-50"
    >
      <Trash2 className="h-4 w-4" />
      {pending ? "삭제 중…" : "삭제"}
    </button>
  );
}

export function SetCurrentButton({
  id,
  alreadyCurrent,
}: {
  id: string;
  alreadyCurrent: boolean;
}) {
  const [state, formAction] = useFormState(setCurrentMediaKit, ACTION_INIT);
  return (
    <form action={formAction} className="inline-block">
      <input type="hidden" name="id" value={id} />
      <SetCurrentInner disabled={alreadyCurrent} />
      {state.message && !state.ok ? (
        <p role="alert" className="mt-1 text-caption text-error">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}

export function DeleteMediaKitButton({ id }: { id: string }) {
  const [state, formAction] = useFormState(deleteMediaKit, ACTION_INIT);
  return (
    <form action={formAction} className="inline-block">
      <input type="hidden" name="id" value={id} />
      <DelInner />
      {state.message && !state.ok ? (
        <p role="alert" className="mt-1 text-caption text-error">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
