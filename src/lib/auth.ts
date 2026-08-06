import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import db from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        // Compara a password introduzida com o hash guardado na BD
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        if (!isValid) return null;

        // NOTA: id passa a string porque é assim que o NextAuth trabalha.
        // O id real (Int) da BD é recuperado no callback jwt().
        return { id: String(user.id), name: user.name, email: user.email };
      },
    }),
  ],

  session: { strategy: "jwt" },

  // Redireciona para /login quando não há sessão (usado pelo proxy)
  pages: { signIn: "/login" },

  callbacks: {
    /**
     * jwt() — corre quando um token é criado ou renovado.
     *
     * Na primeira autenticação (user existe), fazemos UPSERT do utilizador
     * na BD para ficarmos com o userId interno (Int) que os jobs usam.
     */
    async jwt({ token, user }) {
      if (user) {
        const email = user.email ?? "";

        // Upsert: se o email já existe (ex: criado via signup), não altera nada.
        // Se não existe (ex: user criado sem password), cria com password vazia.
        const dbUser = await db.user.upsert({
          where: { email },
          update: {}, // não altera dados existentes
          create: {
            name: user.name ?? "",
            email,
            password: "",
          },
        });

        // Guarda o userId interno da BD dentro do token JWT
        token.dbUserId = dbUser.id;
      }
      return token;
    },

    /**
     * session() — passa os dados do token para a sessão do cliente.
     * Necessário porque o useSession() no cliente lê session.user.
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.dbUserId);
      }
      return session;
    },
  },
};

/**
 * Helper para ler a sessão no servidor (Server Components / Server Actions).
 *
 * Uso:
 *   const session = await getServerAuthSession();
 *   session?.user?.id  →  o userId interno da BD (como string)
 */
export function getServerAuthSession() {
  return getServerSession(authOptions);
}
