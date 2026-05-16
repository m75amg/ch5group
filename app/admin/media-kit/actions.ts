"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/lib/db";
import { requireAdminSession, type ActionResult } from "@/lib/admin";
import { saveUpload, UPLOAD_CONFIGS } from "@/lib/uploads";

const createSchema = z.object({
  version: z.string().min(1).max(60),
});

function invalidate() {
  revalidatePath("/admin/media-kit");
  revalidatePath("/[locale]", "layout");
}

export async function uploadMediaKit(
  _p: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdminSession();

  const parsed = createSchema.safeParse({ version: formData.get("version") });
  if (!parsed.success) {
    return { ok: false, message: "버전을 입력해주세요." };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, message: "PDF 파일을 선택해주세요." };
  }

  try {
    const saved = await saveUpload(file, UPLOAD_CONFIGS["media-kit"]);
    await db.mediaKit.create({
      data: {
        filePath: saved.publicPath,
        version: parsed.data.version,
        fileSizeKb: saved.sizeKb,
        isCurrent: false,
      },
    });
  } catch (err) {
    console.error("[media-kit] upload failed:", err);
    return { ok: false, message: (err as Error).message };
  }

  invalidate();
  return { ok: true, message: "업로드되었습니다." };
}

export async function setCurrentMediaKit(
  _p: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdminSession();
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return { ok: false, message: "잘못된 요청" };
  try {
    await db.$transaction([
      db.mediaKit.updateMany({ data: { isCurrent: false } }),
      db.mediaKit.update({ where: { id }, data: { isCurrent: true } }),
    ]);
  } catch (err) {
    console.error("[media-kit] setCurrent failed:", err);
    return { ok: false, message: "변경 실패" };
  }
  invalidate();
  return { ok: true, message: "현재 버전이 변경되었습니다." };
}

export async function deleteMediaKit(
  _p: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdminSession();
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return { ok: false, message: "잘못된 요청" };
  try {
    await db.mediaKit.delete({ where: { id } });
  } catch (err) {
    console.error("[media-kit] delete failed:", err);
    return { ok: false, message: "삭제 실패" };
  }
  invalidate();
  return { ok: true, message: "삭제되었습니다." };
}
