"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

/**
 * Formulário de login.
 *
 * Usa o signIn() do NextAuth:
 *   - signIn("credentials", { redirect: false }) → valida email/password
 *     contra a tabela User (via authorize() em src/lib/auth.ts)
 *   - signIn("github") → inicia o fluxo OAuth do GitHub
 *
 * redirect: false → o NextAuth NÃO redireciona sozinho; fazemos
 * router.push("/app/dashboard") manualmente para controlar o fluxo.
 */
export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password.");
      setIsSubmitting(false);
      return;
    }

    router.push("/app/dashboard");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="login-email">Email</FieldLabel>
          <Input
            id="login-email"
            name="email"
            type="email"
            placeholder="name@example.com"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="login-password">Password</FieldLabel>
          <Input
            id="login-password"
            name="password"
            type="password"
            placeholder="Your password"
            required
          />
        </Field>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Field orientation="horizontal">
          <Link href="/">
            <Button type="reset" variant="outline" disabled={isSubmitting}>
              back
            </Button>
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Log In"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
