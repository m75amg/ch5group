"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/lib/db";
import { requireAdminSession, type ActionResult } from "@/lib/admin";

const baseSchema = z.object({
  chartType: z.enum(["ROLE", "INDUSTRY"]),
  nameKo: z.string().min(1).max(100),
  nameEn: z.string().min(1).max(100),
  value: z.coerce.number().int().min(0).max(100),
  displayOrder: z.coerce.number().int().min(0).max(99),
});

const updateSchema = baseSchema.extend({ id: z.string().min(1) });

function invalidate() {
  revalidatePath("/admin/audience-chart");
  revalidatePath("/[locale]", "page");
  revalidatePath("/[locale]/media-platform", "page");
}

function readForm(formData: FormData) {
  return {
    chartType: formData.get("chartType"),
    nameKo: formData.get("nameKo"),
    nameEn: formData.get("nameEn"),
    value: formData.get("value"),
    displayOrder: formData.get("displayOrder"),
  };
}

function toData(d: z.infer<typeof baseSchema>) {
  return {
    chartType: d.chartType,
    name: { ko: d.nameKo, en: d.nameEn },
    value: d.value,
    displayOrder: d.displayOrder,
  };
}

export async function createAudience(_p: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireAdminSession();
  const parsed = baseSchema.safeParse(readForm(formData));
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message ?? "입력값 오류" };
  try {
    await db.audienceData.create({ data: toData(parsed.data) });
  } catch (err) {
    console.error("[audience] create failed:", err);
    return { ok: false, message: "추가 실패" };
  }
  invalidate();
  return { ok: true, message: "추가되었습니다." };
}

export async function updateAudience(_p: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireAdminSession();
  const parsed = updateSchema.safeParse({ ...readForm(formData), id: formData.get("id") });
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message ?? "입력값 오류" };
  try {
    await db.audienceData.update({ where: { id: parsed.data.id }, data: toData(parsed.data) });
  } catch (err) {
    console.error("[audience] update failed:", err);
    return { ok: false, message: "저장 실패" };
  }
  invalidate();
  return { ok: true, message: "저장되었습니다." };
}

export async function deleteAudience(_p: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireAdminSession();
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return { ok: false, message: "잘못된 요청" };
  try {
    await db.audienceData.delete({ where: { id } });
  } catch (err) {
    console.error("[audience] delete failed:", err);
    return { ok: false, message: "삭제 실패" };
  }
  invalidate();
  return { ok: true, message: "삭제되었습니다." };
}
