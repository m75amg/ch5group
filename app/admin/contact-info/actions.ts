"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/lib/db";
import { requireAdminSession, type ActionResult } from "@/lib/admin";

const schema = z.object({
  addressKo: z.string().min(1).max(500),
  addressEn: z.string().min(1).max(500),
  phone: z.string().min(1).max(50),
  email: z.string().email().max(200),
  hoursKo: z.string().min(1).max(200),
  hoursEn: z.string().min(1).max(200),
});

export async function updateContactInfo(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdminSession();

  const parsed = schema.safeParse({
    addressKo: formData.get("addressKo"),
    addressEn: formData.get("addressEn"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    hoursKo: formData.get("hoursKo"),
    hoursEn: formData.get("hoursEn"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "입력값이 올바르지 않습니다.",
    };
  }

  const { addressKo, addressEn, phone, email, hoursKo, hoursEn } = parsed.data;

  try {
    await db.contactInfo.upsert({
      where: { id: 1 },
      update: {
        address: { ko: addressKo, en: addressEn },
        phone,
        email,
        hours: { ko: hoursKo, en: hoursEn },
      },
      create: {
        id: 1,
        address: { ko: addressKo, en: addressEn },
        phone,
        email,
        hours: { ko: hoursKo, en: hoursEn },
      },
    });
  } catch (err) {
    console.error("[contact-info] update failed:", err);
    return { ok: false, message: "저장에 실패했습니다." };
  }

  revalidatePath("/admin/contact-info");
  revalidatePath("/[locale]", "layout"); // header/footer + sidebar all pages
  return { ok: true, message: "저장되었습니다." };
}
