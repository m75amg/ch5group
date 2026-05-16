"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Trash2 } from "lucide-react";

import { ACTION_INIT } from "@/lib/admin";
import { deleteHistoryItem } from "./actions";

function Inner() {
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

export function DeleteHistoryButton({ id }: { id: string }) {
  const [state, formAction] = useFormState(deleteHistoryItem, ACTION_INIT);
  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <Inner />
      {state.message && !state.ok ? (
        <p role="alert" className="mt-1 text-caption text-error">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
