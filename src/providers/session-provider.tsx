"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

/**
 * SessionProvider — envolve a app para que os componentes client-side
 * consigam usar o hook useSession() do NextAuth.
 *
 * Porquê "use client"? Porque o useSession() depende de estado React
 * (reage a mudanças de autenticação em tempo real) e faz fetch de
 * /api/auth/session no browser.
 *
 * Este provider fica dentro de QueryProvider no layout raiz para que
 * toda a árvore de componentes tenha acesso à sessão.
 */
export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
