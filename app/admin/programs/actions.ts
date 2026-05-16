"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { db } from "@/lib/db";
import { requireAdminSession, type ActionResult } from "@/lib/admin";

const baseSchema = z.object({
  titleKo: z.string().min(1).max(200),
  titleEn: z.string().min(1).max(200),
  tag: z.enum(["CONFERENCE", "CONTEST", "EDUCATION"]),
  taglineKo: z.string().min(1).max(300),
  taglineEn: z.string().min(1).max(300),
  bodyKo: z.string().min(1).max(4000),
  bodyEn: z.string().min(1).max(4000),
  imagePath: z.string().max(500).optional().or(z.literal("")),
  externalUrl: z.string().max(500).optional().or(z.literal("")),
  eventDate: z.string().optional().or(z.literal("")),
  isFeatured: z.coerce.boolean(),
  displayOrder: z.coerce.number().int().min(0).max(99),
});

const createSchema = baseSchema.extend({
  slug: z
    .string()
    .min(1)
    .max(60)
    .regex(/^[a-zA-Z][a-zA-Z0-9-]*$/, "slug는 영문 시작, 영숫자·하이픈만"),
});

const updateSchema = baseSchema.extend({
  id: z.string().min(1),
});

function invalidate() {
  revalidatePath("/admin/programs");
  revalidatePath("/[locale]", "page");
  revalidatePath("/[locale]/programs", "page");
}

function parsedToPrismaData(d: z.infer<typeof baseSchema>) {
  return {
    title: { ko: d.titleKo, en: d.titleEn },
    tag: d.tag,
    tagline: { ko: d.taglineKo, en: d.taglineEn },
    body: { ko: d.bodyKo, en: d.bodyEn },
    imagePath: d.imagePath || null,
    externalUrl: d.externalUrl || null,
    eventDate: d.eventDate ? new Date(d.eventDate) : null,
    isFeatured: d.isFeatured,
    displayOrder: d.displayOrder,
  };
}

function readForm(formData: FormData) {
  return {
    slug: formData.get("slug"),
    titleKo: formData.get("titleKo"),
    titleEn: formData.get("titleEn"),
    tag: formData.get("tag"),
    taglineKo: formData.get("taglineKo"),
    taglineEn: formData.get("taglineEn"),
    bodyKo: formData.get("bodyKo"),
    bodyEn: formData.get("bodyEn"),
    imagePath: formData.get("imagePath"),
    externalUrl: formData.get("externalUrl"),
    eventDate: formData.get("eventDate"),
    isFeatured: formData.get("isFeatured") === "on",
    displayOrder: formData.get("displayOrder"),
  };
}

export async function createProgram(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdminSession();

  const parsed = createSchema.safeParse(readForm(formData));
  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "입력값이 올바르지 않습니다.",
    };
  }

  try {
    await db.program.create({
      data: {
        slug: parsed.data.slug,
        ...parsedToPrismaData(parsed.data),
      },
    });
  } catch (err) {
    const message =
      err instanceof Error && err.message.includes("Unique constraint")
        ? "이미 사용 중인 slug입니다."
        : "생성에 실패했습니다.";
    console.error("[programs] create failed:", err);
    return { ok: false, message };
  }

  invalidate();
  redirect("/admin/programs");
}

export async function updateProgram(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdminSession();

  const parsed = updateSchema.safeParse({
    ...readForm(formData),
    id: formData.get("id"),
  });
  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "입력값이 올바르지 않습니다.",
    };
  }

  try {
    await db.program.update({
      where: { id: parsed.data.id },
      data: parsedToPrismaData(parsed.data),
    });
  } catch (err) {
    console.error("[programs] update failed:", err);
    return { ok: false, message: "저장에 실패했습니다." };
  }

  invalidate();
  return { ok: true, message: "저장되었습니다." };
}

export async function deleteProgram(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdminSession();

  const id = formData.get("id");
  if (typeof id !== "string" || !id) {
    return { ok: false, message: "잘못된 요청입니다." };
  }

  try {
    await db.program.delete({ where: { id } });
  } catch (err) {
    console.error("[programs] delete failed:", err);
    return { ok: false, message: "삭제에 실패했습니다." };
  }

  invalidate();
  redirect("/admin/programs");
}
