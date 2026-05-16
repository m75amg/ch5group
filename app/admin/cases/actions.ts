"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { db } from "@/lib/db";
import { requireAdminSession, type ActionResult } from "@/lib/admin";

const baseSchema = z.object({
  partnerName: z.string().max(200).optional().or(z.literal("")),
  typeKo: z.string().min(1).max(200),
  typeEn: z.string().min(1).max(200),
  titleKo: z.string().min(1).max(300),
  titleEn: z.string().min(1).max(300),
  bodyKo: z.string().max(4000).optional().or(z.literal("")),
  bodyEn: z.string().max(4000).optional().or(z.literal("")),
  isPublished: z.coerce.boolean(),
  displayOrder: z.coerce.number().int().min(0).max(99),
});

const updateSchema = baseSchema.extend({ id: z.string().min(1) });

function invalidate() {
  revalidatePath("/admin/cases");
  revalidatePath("/[locale]/partners", "page");
}

function readForm(formData: FormData) {
  return {
    partnerName: formData.get("partnerName"),
    typeKo: formData.get("typeKo"),
    typeEn: formData.get("typeEn"),
    titleKo: formData.get("titleKo"),
    titleEn: formData.get("titleEn"),
    bodyKo: formData.get("bodyKo"),
    bodyEn: formData.get("bodyEn"),
    isPublished: formData.get("isPublished") === "on",
    displayOrder: formData.get("displayOrder"),
  };
}

function toData(d: z.infer<typeof baseSchema>) {
  return {
    partnerName: d.partnerName || null,
    type: { ko: d.typeKo, en: d.typeEn },
    title: { ko: d.titleKo, en: d.titleEn },
    body: d.bodyKo || d.bodyEn ? { ko: d.bodyKo, en: d.bodyEn } : undefined,
    isPublished: d.isPublished,
    displayOrder: d.displayOrder,
  };
}

export async function createCase(_p: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireAdminSession();
  const parsed = baseSchema.safeParse(readForm(formData));
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "입력값 오류" };
  }
  try {
    await db.case.create({ data: toData(parsed.data) });
  } catch (err) {
    console.error("[cases] create failed:", err);
    return { ok: false, message: "생성에 실패했습니다." };
  }
  invalidate();
  redirect("/admin/cases");
}

export async function updateCase(_p: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireAdminSession();
  const parsed = updateSchema.safeParse({ ...readForm(formData), id: formData.get("id") });
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "입력값 오류" };
  }
  try {
    await db.case.update({ where: { id: parsed.data.id }, data: toData(parsed.data) });
  } catch (err) {
    console.error("[cases] update failed:", err);
    return { ok: false, message: "저장에 실패했습니다." };
  }
  invalidate();
  return { ok: true, message: "저장되었습니다." };
}

export async function deleteCase(_p: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireAdminSession();
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return { ok: false, message: "잘못된 요청" };
  try {
    await db.case.delete({ where: { id } });
  } catch (err) {
    console.error("[cases] delete failed:", err);
    return { ok: false, message: "삭제 실패" };
  }
  invalidate();
  redirect("/admin/cases");
}
