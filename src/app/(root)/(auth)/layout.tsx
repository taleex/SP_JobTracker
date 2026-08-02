import AuthLeftContainer from "@/components/auth/authLeftContainer/auth-left-container";

/**
 * Layout partilhado pelas páginas /login e /signup.
 *
 * Renderiza apenas a coluna esquerda (imagem). A coluna direita
 * (título + formulário) é renderizada em cada página com o `mode`
 * correto via <AuthRightContainer mode="login|signup" />.
 *
 * Antes, este layout renderizava AuthRightContainer para TODAS as
 * páginas do grupo — o que fazia /login mostrar o formulário de signup.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="auth-container">
      <AuthLeftContainer />
      {children}
    </main>
  );
}
