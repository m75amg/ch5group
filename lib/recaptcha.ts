/**
 * Server-side reCAPTCHA v3 verification. Returns true when verification passes
 * the configured score threshold. If RECAPTCHA_SECRET_KEY is not set we accept
 * the submission (1차 오픈 전까지는 운영팀이 키를 발급할 예정).
 */
export async function verifyRecaptcha(
  token: string | undefined,
  threshold = 0.5,
): Promise<{ ok: boolean; score?: number; reason?: string }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return { ok: true, reason: "no-secret-configured" };

  if (!token) return { ok: false, reason: "missing-token" };

  try {
    const params = new URLSearchParams({ secret, response: token });
    const res = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
      },
    );
    const data = (await res.json()) as {
      success: boolean;
      score?: number;
      "error-codes"?: string[];
    };
    if (!data.success) {
      return { ok: false, reason: data["error-codes"]?.join(",") };
    }
    if (typeof data.score === "number" && data.score < threshold) {
      return { ok: false, score: data.score, reason: "low-score" };
    }
    return { ok: true, score: data.score };
  } catch (err) {
    return { ok: false, reason: (err as Error).message };
  }
}
