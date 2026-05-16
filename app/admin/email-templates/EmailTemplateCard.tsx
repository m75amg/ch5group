"use client";

import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { ACTION_INIT } from "@/lib/admin";
import { updateEmailTemplate } from "./actions";

export interface EmailTemplateData {
  key: "autoReply" | "notification";
  subjectKo: string;
  subjectEn: string;
  bodyKo: string;
  bodyEn: string;
}

const TITLES: Record<EmailTemplateData["key"], { title: string; desc: string }> = {
  autoReply: {
    title: "자동 응답 메일",
    desc: "문의 제출 시 제출자에게 자동 발송되는 메일입니다. 사용 가능한 변수: {name}, {company}, {interests}, {timeline}",
  },
  notification: {
    title: "운영팀 알림 메일",
    desc: "문의 제출 시 운영팀 inbox로 발송되는 알림입니다. 사용 가능한 변수: {company}, {name}, {position}, {email}, {phone}, {interests}, {timeline}, {requestMediaKit}, {message}",
  },
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "저장 중…" : "저장"}
    </Button>
  );
}

export function EmailTemplateCard({ data }: { data: EmailTemplateData }) {
  const [state, formAction] = useFormState(updateEmailTemplate, ACTION_INIT);
  const meta = TITLES[data.key];

  return (
    <form
      action={formAction}
      className="rounded-lg border border-border bg-background p-6 lg:p-8 space-y-6"
    >
      <input type="hidden" name="key" value={data.key} />

      <div>
        <p className="text-caption font-mono text-brand-accent">{data.key}</p>
        <h2 className="mt-1 text-h4 text-foreground">{meta.title}</h2>
        <p className="mt-2 text-body-sm text-foreground-muted leading-relaxed">
          {meta.desc}
        </p>
      </div>

      <fieldset>
        <legend className="text-eyebrow uppercase tracking-[0.08em] text-foreground-muted">
          제목
        </legend>
        <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`subjectKo-${data.key}`} required>
              제목 (KO)
            </Label>
            <Input
              id={`subjectKo-${data.key}`}
              name="subjectKo"
              defaultValue={data.subjectKo}
              required
              maxLength={300}
            />
          </div>
          <div>
            <Label htmlFor={`subjectEn-${data.key}`} required>
              제목 (EN)
            </Label>
            <Input
              id={`subjectEn-${data.key}`}
              name="subjectEn"
              defaultValue={data.subjectEn}
              required
              maxLength={300}
            />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-eyebrow uppercase tracking-[0.08em] text-foreground-muted">
          본문
        </legend>
        <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`bodyKo-${data.key}`} required>
              본문 (KO)
            </Label>
            <Textarea
              id={`bodyKo-${data.key}`}
              name="bodyKo"
              defaultValue={data.bodyKo}
              rows={14}
              required
              maxLength={8000}
              className="font-mono text-body-sm"
            />
          </div>
          <div>
            <Label htmlFor={`bodyEn-${data.key}`} required>
              본문 (EN)
            </Label>
            <Textarea
              id={`bodyEn-${data.key}`}
              name="bodyEn"
              defaultValue={data.bodyEn}
              rows={14}
              required
              maxLength={8000}
              className="font-mono text-body-sm"
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
