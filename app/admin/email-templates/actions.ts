"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/lib/db";
import { requireAdminSession, type ActionResult } from "@/lib/admin";

const schema = z.object({
  key: z.enum(["autoReply", "notification"]),
  subjectKo: z.string().min(1).max(300),
  subjectEn: z.string().min(1).max(300),
  bodyKo: z.string().min(1).max(8000),
  bodyEn: z.string().min(1).max(8000),
});

export async function updateEmailTemplate(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdminSession();

  const parsed = schema.safeParse({
    key: formData.get("key"),
    subjectKo: formData.get("subjectKo"),
    subjectEn: formData.get("subjectEn"),
    bodyKo: formData.get("bodyKo"),
    bodyEn: formData.get("bodyEn"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "입력값이 올바르지 않습니다.",
    };
  }

  const { key, subjectKo, subjectEn, bodyKo, bodyEn } = parsed.data;

  try {
    await db.emailTemplate.upsert({
      where: { key },
      update: {
        subject: { ko: subjectKo, en: subjectEn },
        body: { ko: bodyKo, en: bodyEn },
      },
      create: {
        key,
        subject: { ko: subjectKo, en: subjectEn },
        body: { ko: bodyKo, en: bodyEn },
      },
    });
  } catch (err) {
    console.error("[email-templates] update failed:", err);
    return { ok: false, message: "저장에 실패했습니다." };
  }

  revalidatePath("/admin/email-templates");
  return { ok: true, message: "저장되었습니다." };
}
