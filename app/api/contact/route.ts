import { createHash } from "node:crypto";

import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

import { db } from "@/lib/db";
import { verifyRecaptcha } from "@/lib/recaptcha";
import {
  buildAutoReplyEmail,
  buildOperationsNotificationEmail,
  type ContactSubmission,
} from "@/lib/emails";

const INTEREST_VALUES = [
  "webinar",
  "newsletter",
  "banner",
  "conference",
  "contest",
  "education",
  "other",
] as const;

const contactSchema = z.object({
  company: z.string().min(1).max(200),
  name: z.string().min(1).max(100),
  position: z.string().max(100).optional(),
  email: z.string().email().max(200),
  phone: z.string().max(50).optional(),
  interests: z.array(z.enum(INTEREST_VALUES)).min(1),
  timeline: z.string().max(50).optional(),
  message: z.string().min(1).max(5000),
  requestMediaKit: z.boolean().optional(),
  privacyConsent: z.literal(true),
  locale: z.string().max(10).optional(),
  recaptchaToken: z.string().optional(),
  // honeypot — must stay empty
  website: z.string().max(0).optional(),
});

function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  return createHash("sha256").update(ip).digest("hex").slice(0, 32);
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }
  const { recaptchaToken, website, locale, ...data } = parsed.data;
  void website;

  const recaptcha = await verifyRecaptcha(recaptchaToken);
  if (!recaptcha.ok) {
    return NextResponse.json(
      { error: "Bot check failed", reason: recaptcha.reason },
      { status: 403 },
    );
  }

  const submission: ContactSubmission = data;

  // Persist to DB regardless of email delivery configuration so the admin
  // always has a record. Email delivery is best-effort below.
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? null;
  try {
    await db.inquiry.create({
      data: {
        company: data.company,
        name: data.name,
        position: data.position ?? null,
        email: data.email,
        phone: data.phone ?? null,
        interests: data.interests,
        timeline: data.timeline ?? null,
        message: data.message,
        requestMediaKit: data.requestMediaKit ?? false,
        locale: locale ?? "ko",
        ipHash: hashIp(ip),
        userAgent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
      },
    });
  } catch (err) {
    console.error("[contact] db insert failed:", err);
    // Don't block delivery — admin can always recover from email if DB fails.
  }
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const operationsEmail = process.env.OPERATIONS_INBOX_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;

  // If Resend isn't configured yet, log and return success so the form UX
  // is still testable in dev / preview. Operations team must set the env vars
  // before production launch.
  if (!apiKey || !fromEmail || !operationsEmail) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[contact] submission (email not configured):", {
        company: submission.company,
        email: submission.email,
        interests: submission.interests,
        requestMediaKit: submission.requestMediaKit,
      });
    }
    return NextResponse.json({ ok: true, delivery: "stub" });
  }

  try {
    const resend = new Resend(apiKey);
    const autoReply = buildAutoReplyEmail(submission);
    const notification = buildOperationsNotificationEmail(submission);

    await Promise.all([
      resend.emails.send({
        from: fromEmail,
        to: submission.email,
        subject: autoReply.subject,
        text: autoReply.text,
      }),
      resend.emails.send({
        from: fromEmail,
        to: operationsEmail,
        replyTo: submission.email,
        subject: notification.subject,
        text: notification.text,
      }),
    ]);

    return NextResponse.json({ ok: true, delivery: "sent" });
  } catch (err) {
    console.error("[contact] resend error:", err);
    return NextResponse.json(
      { error: "Email delivery failed" },
      { status: 502 },
    );
  }
}
