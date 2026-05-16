"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";
import { ACTION_INIT } from "@/lib/admin";

import { deleteFooterLink, updateFooterLink } from "./actions";

export interface FooterLinkRowData {
  id: string;
  label: string;
  url: string;
  isExternal: boolean;
  displayOrder: number;
}

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="sm" disabled={pending}>
      {pending ? "저장 중…" : "저장"}
    </Button>
  );
}

function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="ghost"
      size="sm"
      disabled={pending}
      aria-label="삭제"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}

export function FooterLinkRow({ link }: { link: FooterLinkRowData }) {
  const [updState, updAction] = useFormState(updateFooterLink, ACTION_INIT);
  const [delState, delAction] = useFormState(deleteFooterLink, ACTION_INIT);

  return (
    <div className="rounded-lg border border-border bg-background p-5">
      <form action={updAction}>
        <input type="hidden" name="id" value={link.id} />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_140px_80px_auto] gap-4 lg:gap-6 items-end">
          <div>
            <Label htmlFor={`label-${link.id}`} required>
              라벨
            </Label>
            <Input
              id={`label-${link.id}`}
              name="label"
              defaultValue={link.label}
              required
              maxLength={120}
            />
          </div>
          <div>
            <Label htmlFor={`url-${link.id}`} required>
              URL
            </Label>
            <Input
              id={`url-${link.id}`}
              name="url"
              type="url"
              defaultValue={link.url}
              placeholder="https://www.example.com"
              required
              maxLength={500}
            />
          </div>
          <div>
            <Label htmlFor={`isExternal-${link.id}`}>외부 링크</Label>
            <div className="flex items-center gap-2 h-11">
              <Checkbox
                id={`isExternal-${link.id}`}
                name="isExternal"
                defaultChecked={link.isExternal}
              />
              <span className="text-body-sm text-foreground-muted">
                target=_blank
              </span>
            </div>
          </div>
          <div>
            <Label htmlFor={`displayOrder-${link.id}`}>순서</Label>
            <Input
              id={`displayOrder-${link.id}`}
              name="displayOrder"
              type="number"
              min={0}
              max={99}
              defaultValue={link.displayOrder}
            />
          </div>
          <SaveButton />
        </div>
        {updState.message ? (
          <p
            role="status"
            className={
              updState.ok
                ? "mt-3 text-caption text-success"
                : "mt-3 text-caption text-error"
            }
          >
            {updState.message}
          </p>
        ) : null}
      </form>
      <form action={delAction} className="mt-3 border-t border-border pt-3 flex justify-end">
        <input type="hidden" name="id" value={link.id} />
        <DeleteButton />
        {delState.message && !delState.ok ? (
          <p role="alert" className="ml-3 text-caption text-error">
            {delState.message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
