"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/lib/db";
import { requireAdminSession, type ActionResult } from "@/lib/admin";

const updateSchema = z.object({
  key: z.string().min(1).max(40),
  value: z.string().min(1).max(20),
  labelKo: z.string().min(1).max(100),
  labelEn: z.string().min(1).max(100),
  displayOrder: z.coerce.number().int().min(0).max(99),
});

export async function updateStat(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdminSession();

  const parsed = updateSchema.safeParse({
    key: formData.get("key"),
    value: formData.get("value"),
    labelKo: formData.get("labelKo"),
    labelEn: formData.get("labelEn"),
    displayOrder: formData.get("displayOrder"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "입력값이 올바르지 않습니다.",
    };
  }

  const { key, value, labelKo, labelEn, displayOrder } = parsed.data;

  try {
    await db.stat.update({
      where: { key },
      data: {
        value,
        label: { ko: labelKo, en: labelEn },
        displayOrder,
      },
    });
  } catch (err) {
    console.error("[stats] update failed:", err);
    return { ok: false, message: "저장에 실패했습니다." };
  }

  revalidatePath("/admin/stats");
  // Site pages that consume these stats — invalidate cache once we wire DB reads.
  revalidatePath("/[locale]", "page");
  revalidatePath("/[locale]/about", "page");

  return { ok: true, message: "저장되었습니다." };
}
