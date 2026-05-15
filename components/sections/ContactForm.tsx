"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Chip } from "@/components/ui/Chip";
import { Checkbox } from "@/components/ui/Checkbox";
import { cn } from "@/lib/utils";

const INTEREST_KEYS = [
  "webinar",
  "newsletter",
  "banner",
  "conference",
  "contest",
  "education",
  "other",
] as const;

const TIMELINE_KEYS = ["asap", "q1", "q2", "later", "tbd"] as const;

type InterestKey = (typeof INTEREST_KEYS)[number];

function buildSchema(errors: {
  required: string;
  email: string;
  interests: string;
  privacy: string;
}) {
  return z.object({
    company: z.string().min(1, errors.required),
    name: z.string().min(1, errors.required),
    position: z.string().optional(),
    email: z.string().min(1, errors.required).email(errors.email),
    phone: z.string().optional(),
    interests: z
      .array(z.enum(INTEREST_KEYS))
      .min(1, errors.interests),
    timeline: z.string().optional(),
    message: z.string().min(1, errors.required),
    requestMediaKit: z.boolean().optional(),
    privacyConsent: z.literal(true, { message: errors.privacy }),
  });
}

type ContactFormValues = z.infer<ReturnType<typeof buildSchema>>;

export function ContactForm() {
  const t = useTranslations("contact.form");
  const tInterests = useTranslations("contact.form.interestOptions");
  const tTimeline = useTranslations("contact.form.timelineOptions");
  const tErrors = useTranslations("contact.form.errors");
  const tSuccess = useTranslations("contact.form.success");
  const searchParams = useSearchParams();

  const schema = buildSchema({
    required: tErrors("required"),
    email: tErrors("email"),
    interests: tErrors("interests"),
    privacy: tErrors("privacy"),
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      company: "",
      name: "",
      position: "",
      email: "",
      phone: "",
      interests: [],
      timeline: "",
      message: "",
      requestMediaKit: false,
      privacyConsent: false as unknown as true,
    },
  });

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Prefill from query params (?service=webinar,newsletter & ?action=media-kit)
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      const incoming = serviceParam
        .split(",")
        .map((s) => s.trim())
        .filter((s): s is InterestKey =>
          (INTEREST_KEYS as readonly string[]).includes(s),
        );
      if (incoming.length > 0) {
        setValue("interests", incoming, { shouldValidate: false });
      }
    }
    if (searchParams.get("action") === "media-kit") {
      setValue("requestMediaKit", true, { shouldValidate: false });
    }
    // We deliberately run this only on mount / when query string changes.
  }, [searchParams, setValue]);

  const selectedInterests = watch("interests") ?? [];

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSubmitted(true);
      reset();
    } catch {
      setSubmitError(tErrors("submit"));
    }
  };

  if (submitted) {
    return (
      <div className="rounded-lg border border-success/30 bg-success/5 p-8 text-center">
        <p className="text-h3 text-foreground">{tSuccess("headline")}</p>
        <p className="mt-4 text-body text-foreground-muted max-w-prose mx-auto">
          {tSuccess("body")}
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-6"
          onClick={() => setSubmitted(false)}
        >
          {tSuccess("ctaReset")}
        </Button>
      </div>
    );
  }

  const toggleInterest = (key: InterestKey) => {
    const next = selectedInterests.includes(key)
      ? selectedInterests.filter((k) => k !== key)
      : [...selectedInterests, key];
    setValue("interests", next, { shouldValidate: true });
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-10"
    >
      {/* Company section */}
      <fieldset className="contents">
        <legend className="text-eyebrow uppercase tracking-[0.08em] text-brand-accent">
          {t("companySectionHeading")}
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="company" required>
              {t("company")}
            </Label>
            <Input
              id="company"
              {...register("company")}
              placeholder={t("placeholders.company")}
              invalid={Boolean(errors.company)}
              autoComplete="organization"
            />
            {errors.company ? (
              <p className="mt-1 text-caption text-error">
                {errors.company.message}
              </p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="name" required>
              {t("name")}
            </Label>
            <Input
              id="name"
              {...register("name")}
              placeholder={t("placeholders.name")}
              invalid={Boolean(errors.name)}
              autoComplete="name"
            />
            {errors.name ? (
              <p className="mt-1 text-caption text-error">
                {errors.name.message}
              </p>
            ) : null}
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="position">{t("position")}</Label>
            <Input
              id="position"
              {...register("position")}
              placeholder={t("placeholders.position")}
              autoComplete="organization-title"
            />
          </div>
        </div>
      </fieldset>

      {/* Contact section */}
      <fieldset className="contents">
        <legend className="text-eyebrow uppercase tracking-[0.08em] text-brand-accent">
          {t("contactSectionHeading")}
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email" required>
              {t("email")}
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder={t("placeholders.email")}
              invalid={Boolean(errors.email)}
              autoComplete="email"
            />
            {errors.email ? (
              <p className="mt-1 text-caption text-error">
                {errors.email.message}
              </p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="phone">{t("phone")}</Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              placeholder={t("placeholders.phone")}
              autoComplete="tel"
            />
          </div>
        </div>
      </fieldset>

      {/* Inquiry section */}
      <fieldset className="contents">
        <legend className="text-eyebrow uppercase tracking-[0.08em] text-brand-accent">
          {t("inquirySectionHeading")}
        </legend>
        <div>
          <p className="inline-flex items-center gap-1 text-label text-foreground">
            {t("interests")}
            <span aria-hidden="true" className="text-error">
              *
            </span>
          </p>
          <div
            className="mt-2 flex flex-wrap gap-2"
            role="group"
            aria-label={t("interests")}
          >
            {INTEREST_KEYS.map((key) => (
              <Chip
                key={key}
                selected={selectedInterests.includes(key)}
                onClick={() => toggleInterest(key)}
              >
                {tInterests(key)}
              </Chip>
            ))}
          </div>
          <Controller
            control={control}
            name="interests"
            render={({ field }) => (
              <input
                type="hidden"
                value={field.value.join(",")}
                onChange={() => undefined}
              />
            )}
          />
          {errors.interests ? (
            <p className="mt-2 text-caption text-error">
              {errors.interests.message as string}
            </p>
          ) : null}
        </div>

        <div>
          <Label htmlFor="timeline">{t("timeline")}</Label>
          <select
            id="timeline"
            {...register("timeline")}
            className={cn(
              "flex h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-body text-foreground shadow-sm transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:border-transparent",
            )}
            defaultValue=""
          >
            <option value="" disabled>
              {tTimeline("placeholder")}
            </option>
            {TIMELINE_KEYS.map((key) => (
              <option key={key} value={key}>
                {tTimeline(key)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="message" required>
            {t("message")}
          </Label>
          <Textarea
            id="message"
            {...register("message")}
            placeholder={t("placeholders.message")}
            invalid={Boolean(errors.message)}
            rows={5}
          />
          {errors.message ? (
            <p className="mt-1 text-caption text-error">
              {errors.message.message}
            </p>
          ) : null}
        </div>
      </fieldset>

      {/* Consents */}
      <div className="flex flex-col gap-3">
        <label className="flex items-start gap-3 cursor-pointer rounded-md border border-border bg-background-muted p-4">
          <Checkbox {...register("requestMediaKit")} />
          <span className="text-body-sm text-foreground">
            {t("requestMediaKit")}
          </span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <Checkbox {...register("privacyConsent")} />
          <span className="text-body-sm text-foreground">
            {t("privacyConsent")}{" "}
            <span aria-hidden="true" className="text-error">
              *
            </span>
          </span>
        </label>
        {errors.privacyConsent ? (
          <p className="text-caption text-error">
            {errors.privacyConsent.message as string}
          </p>
        ) : null}
      </div>

      {submitError ? (
        <p
          role="alert"
          className="rounded-md border border-error/30 bg-error/5 px-4 py-3 text-body-sm text-error"
        >
          {submitError}
        </p>
      ) : null}

      <div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t("submitting") : t("submit")}
        </Button>
      </div>
    </form>
  );
}
