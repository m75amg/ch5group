"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/lib/db";
import { requireAdminSession, type ActionResult } from "@/lib/admin";

const updateSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1).max(120),
  url: z.string().min(1).max(500),
  isExternal: z.coerce.boolean(),
  displayOrder: z.coerce.number().int().min(0).max(99),
});

const createSchema = updateSchema.omit({ id: true });

const idOnly = z.object({ id: z.string().min(1) });

function invalidate() {
  revalidatePath("/admin/footer-links");
  revalidatePath("/[locale]", "layout");
}

export async function updateFooterLink(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdminSession();

  const parsed = updateSchema.safeParse({
    id: formData.get("id"),
    label: formData.get("label"),
    url: formData.get("url"),
    isExternal: formData.get("isExternal") === "on",
    displayOrder: formData.get("displayOrder"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "입력값이 올바르지 않습니다.",
    };
  }

  try {
    await db.footerLink.update({
      where: { id: parsed.data.id },
      data: {
        label: parsed.data.label,
        url: parsed.data.url,
        isExternal: parsed.data.isExternal,
        displayOrder: parsed.data.displayOrder,
      },
    });
  } catch (err) {
    console.error("[footer-links] update failed:", err);
    return { ok: false, message: "저장에 실패했습니다." };
  }

  invalidate();
  return { ok: true, message: "저장되었습니다." };
}

export async function createFooterLink(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdminSession();

  const parsed = createSchema.safeParse({
    label: formData.get("label"),
    url: formData.get("url"),
    isExternal: formData.get("isExternal") === "on",
    displayOrder: formData.get("displayOrder"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "입력값이 올바르지 않습니다.",
    };
  }

  try {
    await db.footerLink.create({ data: parsed.data });
  } catch (err) {
    console.error("[footer-links] create failed:", err);
    return { ok: false, message: "추가에 실패했습니다." };
  }

  invalidate();
  return { ok: true, message: "새 링크가 추가되었습니다." };
}

export async function deleteFooterLink(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdminSession();

  const parsed = idOnly.safeParse({ id: formData.get("id") });
  if (!parsed.success) {
    return { ok: false, message: "잘못된 요청입니다." };
  }

  try {
    await db.footerLink.delete({ where: { id: parsed.data.id } });
  } catch (err) {
    console.error("[footer-links] delete failed:", err);
    return { ok: false, message: "삭제에 실패했습니다." };
  }

  invalidate();
  return { ok: true, message: "삭제되었습니다." };
}
