"use client";

import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { ACTION_INIT } from "@/lib/admin";
import { updateContactInfo } from "./actions";

export interface ContactInfoFormData {
  addressKo: string;
  addressEn: string;
  phone: string;
  email: string;
  hoursKo: string;
  hoursEn: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "저장 중…" : "저장"}
    </Button>
  );
}

export function ContactInfoForm({ data }: { data: ContactInfoFormData }) {
  const [state, formAction] = useFormState(updateContactInfo, ACTION_INIT);

  return (
    <form
      action={formAction}
      className="rounded-lg border border-border bg-background p-6 lg:p-8 space-y-6"
    >
      <fieldset>
        <legend className="text-eyebrow uppercase tracking-[0.08em] text-brand-accent">
          주소
        </legend>
        <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="addressKo" required>
              주소 (KO)
            </Label>
            <Textarea
              id="addressKo"
              name="addressKo"
              defaultValue={data.addressKo}
              rows={2}
              required
              maxLength={500}
            />
          </div>
          <div>
            <Label htmlFor="addressEn" required>
              주소 (EN)
            </Label>
            <Textarea
              id="addressEn"
              name="addressEn"
              defaultValue={data.addressEn}
              rows={2}
              required
              maxLength={500}
            />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-eyebrow uppercase tracking-[0.08em] text-brand-accent">
          연락처
        </legend>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone" required>
              전화
            </Label>
            <Input
              id="phone"
              name="phone"
              defaultValue={data.phone}
              placeholder="02-1234-5678"
              required
              maxLength={50}
            />
          </div>
          <div>
            <Label htmlFor="email" required>
              이메일
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={data.email}
              placeholder="partnership@channel5korea.com"
              required
              maxLength={200}
            />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-eyebrow uppercase tracking-[0.08em] text-brand-accent">
          영업 시간
        </legend>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="hoursKo" required>
              시간 (KO)
            </Label>
            <Input
              id="hoursKo"
              name="hoursKo"
              defaultValue={data.hoursKo}
              placeholder="월–금 09:00–18:00 (KST)"
              required
              maxLength={200}
            />
          </div>
          <div>
            <Label htmlFor="hoursEn" required>
              시간 (EN)
            </Label>
            <Input
              id="hoursEn"
              name="hoursEn"
              defaultValue={data.hoursEn}
              placeholder="Mon–Fri 09:00–18:00 (KST)"
              required
              maxLength={200}
            />
          </div>
        </div>
      </fieldset>

      <div className="flex items-center gap-4">
        <SubmitButton />
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
