"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.replace(from);
      router.refresh();
    } else {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="email" required>
          이메일
        </Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@channel5korea.com"
          required
        />
      </div>
      <div>
        <Label htmlFor="password" required>
          비밀번호
        </Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error ? (
        <p
          role="alert"
          className="rounded-md border border-error/30 bg-error/5 px-3 py-2 text-body-sm text-error"
        >
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={submitting}>
        {submitting ? "로그인 중…" : "로그인"}
      </Button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-background border border-border rounded-lg p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-8">
          <span
            aria-hidden="true"
            className="grid h-8 w-8 place-items-center rounded-md bg-brand-accent text-brand-accent-foreground text-button font-semibold"
          >
            C5
          </span>
          <span className="text-h5 font-semibold text-foreground">
            Channel5 Korea · Admin
          </span>
        </div>
        <h1 className="text-h3 text-foreground tracking-tight">로그인</h1>
        <p className="mt-2 text-body-sm text-foreground-muted">
          관리자 계정으로 로그인하세요.
        </p>
        <div className="mt-8">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
