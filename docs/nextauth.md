# NextAuth — como está implementado neste projeto

Guia didático passo a passo de como o NextAuth funciona neste projeto.

---

## 1. Visão geral do fluxo

```
Browser                 Next.js                    Base de Dados
   │                       │                            │
   │ 1. /login (form)      │                            │
   │──────────────────────>│                            │
   │                       │ 2. POST /api/auth/callback  │
   │                       │    /credentials            │
   │                       │─── authorize() ───────────>│ 3. findUnique(email)
   │                       │<── user ou null ───────────│
   │ 4. JWT criado +       │                            │
   │    sessão guardada    │                            │
   │<──────────────────────│                            │
   │                       │ 5. redirect /app/dashboard │
   │<──────────────────────│                            │
```

---

## 2. Os ficheiros envolvidos

| Ficheiro                                  | Papel                                                       |
| ----------------------------------------- | ----------------------------------------------------------- |
| `src/lib/auth.ts`                         | **Coração da configuração** — providers, callbacks, helpers |
| `src/app/api/auth/[...nextauth]/route.ts` | Exposição HTTP (`GET`/`POST`) dos endpoints `/api/auth/*`   |
| `src/types/next-auth.d.ts`                | Augmentação de tipos (adiciona `id` à sessão)               |
| `src/providers/session-provider.tsx`      | Provider client-side que dá `useSession()` à árvore         |
| `src/proxy.ts`                            | Proteção de rotas (`/app/*` exige sessão)                   |
| `src/app/(root)/(auth)/login/page.tsx`    | Página de login (USA o NextAuth para autenticar)            |
| `src/app/(root)/(auth)/signup/page.tsx`   | Página de signup (cria o user NA BD, NÃO autentica)         |

---

## 3. src/lib/auth.ts — a configuração central

### 3.1. Providers — os métodos de login

**Credentials** (email+password):

```ts
CredentialsProvider({
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  // authorize() devolve o user se as credenciais forem válidas, senão null
  async authorize(credentials) {
    const user = await db.user.findUnique({ where: { email } });
    if (!user) return null; // email não existe
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return null; // password errada
    return { id: String(user.id), name: user.name, email: user.email };
  },
});
```

### 3.2. session: { strategy: "jwt" }

Sem **PrismaAdapter**, a sessão é um **token JWT** — não são precisas as tabelas `Account`/`Session`/`VerificationToken` no Prisma. Mais simples de aprender e funciona bem para esta app.

### 3.3. Callbacks — os "ganchos" do fluxo

**`jwt()`** — corre quando um token é criado/renovado. É aqui que fazemos o `upsert` do utilizador para descobrir o seu `id` interno na BD:

```ts
async jwt({ token, user }) {
  if (user) {
    const dbUser = await db.user.upsert({
      where: { email },
      update: {},
      create: { name, email, password: "" },
    });
    token.dbUserId = dbUser.id; // Int interno da BD
  }
  return token;
}
```

**`session()`** — expõe o `dbUserId` na sessão que o cliente recebe:

```ts
async session({ session, token }) {
  session.user.id = String(token.dbUserId);
  return session;
}
```

### 3.4. Porquê o `upsert`?

O `upsert` garante que existe sempre uma linha na BD `User` com o email do utilizador autenticado. Como o login é feito via Credentials (email+password), o utilizador já existe na BD (criado no signup) — mas o `upsert` é uma salvaguarda que liga o `dbUserId` aos jobs corretos.

---

## 4. Tipos — next-auth.d.ts

O NextAuth por omissão **não** tem `id` no `Session.user`. Para adicionar tipagem segura em toda a app:

```ts
declare module "next-auth" {
  interface Session {
    user: { id: string } & DefaultSession["user"];
  }
}
```

Sem isto, `session.user.id` daria erro de TypeScript.

---

## 5. Route handler

```ts
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

Isto cria os endpoints:

- `POST /api/auth/callback/credentials` → login com email+password
- `GET /api/auth/session` → devolve a sessão atual (usado pelo `useSession()`)
- `GET /api/auth/signout` / `POST /api/auth/signout` → terminar sessão
- `GET /api/auth/providers` → lista de providers
- `GET/POST /api/auth/csrf` → token CSRF (automático nos forms)

---

## 6. SessionProvider — para hooks client-side

`useSession()` é um hook **client-side** que faz fetch de `/api/auth/session` e reage a mudanças. Precisa do `SessionProvider` no layout raiz:

```tsx
"use client";
export default function SessionProvider({ children }) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
```

Usado assim:

```tsx
const { data: session, status } = useSession();
// session?.user?.id → userId interno da BD (string)
```

---

## 7. Proxy — proteção de rotas

```ts
export default withAuth({ pages: { signIn: "/login" } });
export const config = { matcher: "/app/:path*" };
```

- Se o utilizador tentar aceder a `/app/dashboard` **sem sessão** → é redirecionado para `/login`
- O `withAuth` usa o JWT para validar a sessão (por isso funciona sem BD — perfeito para o edge runtime)

---

## 8. Login e signup — como se relacionam

**Signup** (`/signup`): cria o utilizador na BD com password hasheada (`createUser` action). **Não autentica** — redireciona para `/login`.

**Login** (`/login`):

```ts
const result = await signIn("credentials", {
  email,
  password,
  redirect: false,
});
if (result?.error) {
  /* credenciais inválidas */
}
router.push("/app/dashboard");
```

---

## 9. Como ler a sessão no servidor

```ts
import { getServerAuthSession } from "@/lib/auth";

const session = await getServerAuthSession(); // SÓ em Server Components/Actions
session?.user?.id; // → userId interno da BD
```

Usado por exemplo em `getJobsByUser()` — que lê a sessão em vez de confiar no `userId` vindo do cliente (elimina o problema de segurança IDOR).

---

## 10. Checklist de configuração ambiente

1. Copia `.env.example` para `.env`
2. Define `DATABASE_URL`
3. Gera `NEXTAUTH_SECRET`: `openssl rand -base64 32`
4. Define `NEXTAUTH_URL=http://localhost:3000`

> ⚠️ O login só funciona se as variáveis de ambiente estiverem definidas.
