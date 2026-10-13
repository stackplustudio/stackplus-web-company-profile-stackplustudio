"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";
import { buttonStyles } from "@/components/ui/Button";
import { Field, TextInput } from "@/components/admin/fields";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-background p-4">
      <div className="w-full max-w-sm rounded-[16px] border border-line bg-surface p-8 shadow-sm">
        <div className="mb-8 text-center">
          <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-[12px] bg-primary text-base font-bold text-white">S+</span>
          <h1 className="text-2xl font-bold tracking-tight text-ink-dark">Admin sign in</h1>
          <p className="mt-1 text-sm text-ink/60">StackPlus Studio</p>
        </div>

        <form action={formAction} className="space-y-5">
          <Field label="Email" htmlFor="email">
            <TextInput id="email" name="email" type="email" autoComplete="username" required />
          </Field>
          <Field label="Password" htmlFor="password">
            <TextInput id="password" name="password" type="password" autoComplete="current-password" required />
          </Field>

          {state?.error && (
            <p role="alert" className="rounded-[12px] bg-red-50 p-3 text-center text-xs font-bold text-red-600">{state.error}</p>
          )}

          <button type="submit" disabled={pending} className={buttonStyles("primary", "lg", "w-full")}>
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}