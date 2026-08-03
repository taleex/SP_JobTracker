import { withAuth } from "next-auth/middleware";

/**
 * Proxy de autenticação.
 *
 * O withAuth() do NextAuth verifica se existe sessão válida.
 * Se NÃO houver sessão → redireciona para /login (configurado em pages.signIn).
 * Se HOUVER sessão → permite o acesso.
 *
 * matcher:
 *   - "/app/:path*" → protege toda a área do dashboard (jobs, dashboard, etc.)
 *
 * NOTA IMPORTANTE:
 *   Este proxy usa JWT para validar a sessão. Se usasses Database
 *   sessions, precisarias de configurar o adapter aqui também.
 */
export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: "/app/:path*",
};
