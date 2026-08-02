import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * Route handler do NextAuth (App Router).
 *
 * Expõe os endpoints /api/auth/*:
 *   - POST /api/auth/callback/credentials → login com email+password
 *   - GET  /api/auth/signin               → redireciona para /login
 *   - GET  /api/auth/signout              → termina a sessão
 *   - GET  /api/auth/session              → devolve a sessão atual
 *   - GET  /api/auth/providers            → lista de providers
 *
 * NextAuth também preenche automaticamente:
 *   - /api/auth/callback/github → callback do GitHub (via provider)
 *   - /api/auth/csrf            → token CSRF para os forms
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
