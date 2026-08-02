import React from "react";

/**
 * Título do formulário de autenticação.
 * Usado tanto no login como no signup — o texto vem como prop.
 */
export default function AuthFormTitle({ title }: { title: string }) {
  return (
    <div>
      <h1 className="auth-form-title">{title}</h1>
    </div>
  );
}
