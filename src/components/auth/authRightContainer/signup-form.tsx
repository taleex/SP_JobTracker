"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createUser } from "@/lib/actions";

/**
 * Formulário de criação de conta (signup).
 *
 * Chama a Server Action `createUser` (em src/lib/actions.ts) que:
 *   1. Valida os campos (obrigatórios + password ≥ 6 caracteres)
 *   2. Faz hash da password com bcrypt
 *   3. Cria o utilizador na BD
 *   4. Devolve { success, error?, user? }
 *
 * Após sucesso redireciona para /login (o utilizador autentica-se no passo seguinte).
 */
export function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const result = await createUser(formData);

    if (result.success) {
      router.push("/login");
    } else {
      setError(result.error ?? "Something went wrong.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="signup-name">Name</FieldLabel>
          <Input
            id="signup-name"
            name="name"
            placeholder="Jordan Lee"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="signup-email">Email</FieldLabel>
          <Input
            id="signup-email"
            name="email"
            type="email"
            placeholder="name@example.com"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="signup-password">Password</FieldLabel>
          <Input
            id="signup-password"
            name="password"
            type="password"
            placeholder="At least 6 characters"
            minLength={6}
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
            {isSubmitting ? "Creating account..." : "Submit"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
