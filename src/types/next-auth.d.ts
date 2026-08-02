import type { DefaultSession } from "next-auth";

/**
 * Augmentação de tipos do NextAuth.
 *
 * O NextAuth por omissão define session.user sem propriedade `id`.
 * Aqui declaramos que o nosso session.user TEM id (o userId interno da BD),
 * o que dá autocomplete e segurança de tipos em toda a app.
 *
 * Este ficheiro é automaticamente apanhado pelo TypeScript porque está
 * dentro de "include" do tsconfig.json (normalmente src/**).
 */

declare module "next-auth" {
  interface Session {
    user: {
      /** userId interno da tabela User na BD (guardado no token JWT) */
      id: string;
    } & DefaultSession["user"];
  }

  interface User {
    /** userId interno da tabela User na BD (guardado no token JWT) */
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    /** userId interno da tabela User na BD */
    dbUserId: number;
  }
}
