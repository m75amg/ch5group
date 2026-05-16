"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { db } from "@/lib/db";
import { requireAdminSession, type ActionResult } from "@/lib/admin";

const baseSchema = z.object({
  year: z.string().min(1).max(20),
  titleKo: z.string().min(1).max(200),
  titleEn: z.string().min(1).max(200),
  descriptionKo: z.string().min(1).max(1000),
  descriptionEn: z.string().min(1).max(1000),
  displayOrder: z.coerce.number().int().min(0).max(99),
});

const updateSchema = baseSchema.extend({ id: z.string().min(1) });

function invalidate() {
  revalidatePath("/admin/history");
  revalidatePath("/[locale]/about", "page");
}

function readForm(formData: FormData) {
  return {
    year: formData.get("year"),
    titleKo: formData.get("titleKo"),
    titleEn: formData.get("titleEn"),
    descriptionKo: formData.get("descriptionKo"),
    descriptionEn: formData.get("descriptionEn"),
    displayOrder: formData.get("displayOrder"),
  };
}

function toData(d: z.infer<typeof baseSchema>) {
  return {
    year: d.year,
    title: { ko: d.titleKo, en: d.titleEn },
    description: { ko: d.descriptionKo, en: d.descriptionEn },
    displayOrder: d.displayOrder,
  };
}

export async function createHistoryItem(_p: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireAdminSession();
  const parsed = baseSchema.safeParse(readForm(formData));
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message ?? "입력값 오류" };
  try {
    await db.historyItem.create({ data: toData(parsed.data) });
  } catch (err) {
    console.error("[history] create failed:", err);
    return { ok: false, message: "생성에 실패했습니다." };
  }
  invalidate();
  redirect("/admin/history");
}

export async function updateHistoryItem(_p: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireAdminSession();
  const parsed = updateSchema.safeParse({ ...readForm(formData), id: formData.get("id") });
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message ?? "입력값 오류" };
  try {
    await db.historyItem.update({ where: { id: parsed.data.id }, data: toData(parsed.data) });
  } catch (err) {
    console.error("[history] update failed:", err);
    return { ok: false, message: "저장에 실패했습니다." };
  }
  invalidate();
  return { ok: true, message: "저장되었습니다." };
}

export async function deleteHistoryItem(_p: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireAdminSession();
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return { ok: false, message: "잘못된 요청" };
  try {
    await db.historyItem.delete({ where: { id } });
  } catch (err) {
    console.error("[history] delete failed:", err);
    return { ok: false, message: "삭제 실패" };
  }
  invalidate();
  redirect("/admin/history");
}
