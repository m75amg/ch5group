import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

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
  recaptchaToken: z.string().optional(),
  // honeypot — must stay empty
  website: z.string().max(0).optional(),
});

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
  const { recaptchaToken, website, ...data } = parsed.data;
  void website;

  const recaptcha = await verifyRecaptcha(recaptchaToken);
  if (!recaptcha.ok) {
    return NextResponse.json(
      { error: "Bot check failed", reason: recaptcha.reason },
      { status: 403 },
    );
  }

  const submission: ContactSubmission = data;
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
