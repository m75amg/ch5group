"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { db } from "@/lib/db";
import { requireAdminSession, type ActionResult } from "@/lib/admin";

const baseSchema = z.object({
  messageKo: z.string().min(1).max(500),
  messageEn: z.string().min(1).max(500),
  linkUrl: z.string().max(500).optional().or(z.literal("")),
  startsAt: z.string().optional().or(z.literal("")),
  endsAt: z.string().optional().or(z.literal("")),
  isActive: z.coerce.boolean(),
});

const updateSchema = baseSchema.extend({ id: z.string().min(1) });

function invalidate() {
  revalidatePath("/admin/announcements");
  revalidatePath("/[locale]", "layout");
}

function readForm(formData: FormData) {
  return {
    messageKo: formData.get("messageKo"),
    messageEn: formData.get("messageEn"),
    linkUrl: formData.get("linkUrl"),
    startsAt: formData.get("startsAt"),
    endsAt: formData.get("endsAt"),
    isActive: formData.get("isActive") === "on",
  };
}

function toData(d: z.infer<typeof baseSchema>) {
  return {
    message: { ko: d.messageKo, en: d.messageEn },
    linkUrl: d.linkUrl || null,
    startsAt: d.startsAt ? new Date(d.startsAt) : null,
    endsAt: d.endsAt ? new Date(d.endsAt) : null,
    isActive: d.isActive,
  };
}

export async function createAnnouncement(_p: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireAdminSession();
  const parsed = baseSchema.safeParse(readForm(formData));
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message ?? "입력값 오류" };
  try {
    await db.announcement.create({ data: toData(parsed.data) });
  } catch (err) {
    console.error("[announcements] create failed:", err);
    return { ok: false, message: "생성 실패" };
  }
  invalidate();
  redirect("/admin/announcements");
}

export async function updateAnnouncement(_p: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireAdminSession();
  const parsed = updateSchema.safeParse({ ...readForm(formData), id: formData.get("id") });
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message ?? "입력값 오류" };
  try {
    await db.announcement.update({ where: { id: parsed.data.id }, data: toData(parsed.data) });
  } catch (err) {
    console.error("[announcements] update failed:", err);
    return { ok: false, message: "저장 실패" };
  }
  invalidate();
  return { ok: true, message: "저장되었습니다." };
}

export async function deleteAnnouncement(_p: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireAdminSession();
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return { ok: false, message: "잘못된 요청" };
  try {
    await db.announcement.delete({ where: { id } });
  } catch (err) {
    console.error("[announcements] delete failed:", err);
    return { ok: false, message: "삭제 실패" };
  }
  invalidate();
  redirect("/admin/announcements");
}
