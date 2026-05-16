"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { db } from "@/lib/db";
import { requireAdminSession, type ActionResult } from "@/lib/admin";

const updateSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["NEW", "IN_PROGRESS", "REPLIED", "ARCHIVED"]),
  internalNote: z.string().max(4000).optional().or(z.literal("")),
});

export async function updateInquiry(
  _p: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdminSession();
  const parsed = updateSchema.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
    internalNote: formData.get("internalNote"),
  });
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "입력값 오류" };
  }
  try {
    await db.inquiry.update({
      where: { id: parsed.data.id },
      data: {
        status: parsed.data.status,
        internalNote: parsed.data.internalNote || null,
      },
    });
  } catch (err) {
    console.error("[inquiries] update failed:", err);
    return { ok: false, message: "저장 실패" };
  }
  revalidatePath("/admin/inquiries");
  revalidatePath(`/admin/inquiries/${parsed.data.id}`);
  revalidatePath("/admin");
  return { ok: true, message: "저장되었습니다." };
}

export async function deleteInquiry(
  _p: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdminSession();
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return { ok: false, message: "잘못된 요청" };
  try {
    await db.inquiry.delete({ where: { id } });
  } catch (err) {
    console.error("[inquiries] delete failed:", err);
    return { ok: false, message: "삭제 실패" };
  }
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
  redirect("/admin/inquiries");
}
