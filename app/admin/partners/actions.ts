"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { db } from "@/lib/db";
import { requireAdminSession, type ActionResult } from "@/lib/admin";
import { saveUpload, UPLOAD_CONFIGS } from "@/lib/uploads";

const baseSchema = z.object({
  name: z.string().min(1).max(200),
  category: z.enum([
    "SEMICONDUCTOR",
    "DISTRIBUTION",
    "MEASUREMENT",
    "EMBEDDED",
    "EDUCATION",
  ]),
  externalUrl: z.string().max(500).optional().or(z.literal("")),
  consentDate: z.string().optional().or(z.literal("")),
  isPublished: z.coerce.boolean(),
  displayOrder: z.coerce.number().int().min(0).max(99),
});

const createSchema = baseSchema;
const updateSchema = baseSchema.extend({ id: z.string().min(1) });

function invalidate() {
  revalidatePath("/admin/partners");
  revalidatePath("/[locale]", "page");
  revalidatePath("/[locale]/partners", "page");
}

function readForm(formData: FormData) {
  return {
    name: formData.get("name"),
    category: formData.get("category"),
    externalUrl: formData.get("externalUrl"),
    consentDate: formData.get("consentDate"),
    isPublished: formData.get("isPublished") === "on",
    displayOrder: formData.get("displayOrder"),
  };
}

async function processLogo(formData: FormData): Promise<string | null> {
  const file = formData.get("logo");
  if (!(file instanceof File) || file.size === 0) return null;
  const saved = await saveUpload(file, UPLOAD_CONFIGS.partners);
  return saved.publicPath;
}

export async function createPartner(
  _p: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdminSession();

  const parsed = createSchema.safeParse(readForm(formData));
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "입력값 오류" };
  }

  let logoPath: string | null = null;
  try {
    logoPath = await processLogo(formData);
  } catch (err) {
    return { ok: false, message: (err as Error).message };
  }
  if (!logoPath) {
    return { ok: false, message: "로고 파일을 선택해주세요." };
  }

  try {
    await db.partner.create({
      data: {
        name: parsed.data.name,
        logoPath,
        category: parsed.data.category,
        externalUrl: parsed.data.externalUrl || null,
        consentDate: parsed.data.consentDate
          ? new Date(parsed.data.consentDate)
          : null,
        isPublished: parsed.data.isPublished,
        displayOrder: parsed.data.displayOrder,
      },
    });
  } catch (err) {
    console.error("[partners] create failed:", err);
    return { ok: false, message: "생성 실패" };
  }

  invalidate();
  redirect("/admin/partners");
}

export async function updatePartner(
  _p: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdminSession();

  const parsed = updateSchema.safeParse({
    ...readForm(formData),
    id: formData.get("id"),
  });
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "입력값 오류" };
  }

  let newLogoPath: string | null = null;
  try {
    newLogoPath = await processLogo(formData);
  } catch (err) {
    return { ok: false, message: (err as Error).message };
  }

  const updateData: {
    name: string;
    category: typeof parsed.data.category;
    externalUrl: string | null;
    consentDate: Date | null;
    isPublished: boolean;
    displayOrder: number;
    logoPath?: string;
  } = {
    name: parsed.data.name,
    category: parsed.data.category,
    externalUrl: parsed.data.externalUrl || null,
    consentDate: parsed.data.consentDate ? new Date(parsed.data.consentDate) : null,
    isPublished: parsed.data.isPublished,
    displayOrder: parsed.data.displayOrder,
  };
  if (newLogoPath) updateData.logoPath = newLogoPath;

  try {
    await db.partner.update({
      where: { id: parsed.data.id },
      data: updateData,
    });
  } catch (err) {
    console.error("[partners] update failed:", err);
    return { ok: false, message: "저장 실패" };
  }

  invalidate();
  return { ok: true, message: "저장되었습니다." };
}

export async function deletePartner(
  _p: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdminSession();
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return { ok: false, message: "잘못된 요청" };
  try {
    await db.partner.delete({ where: { id } });
  } catch (err) {
    console.error("[partners] delete failed:", err);
    return { ok: false, message: "삭제 실패" };
  }
  invalidate();
  redirect("/admin/partners");
}
