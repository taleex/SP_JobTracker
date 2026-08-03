# Arquitetura do JobTracker

Documento com a estrutura organizacional do projeto e as responsabilidades de cada parte.

---

## Visão geral

Aplicação **Next.js 16 (App Router)** + **Prisma (PostgreSQL/Neon)** + **NextAuth (JWT)** + **TanStack Query** + **shadcn/ui**.

```
┌─────────────────────────────────────────────────────┐
│                    src/app                          │
│  Rotas e layouts (pages, layouts, proxy)            │
├─────────────────────────────────────────────────────┤
│  src/lib      │  src/components  │  src/hooks       │
│  Lógica        │  UI por domínio  │  Lógica client  │
│  (actions,    │  (auth, job,     │  (use-jobs,     │
│   auth, db)   │   sidebar...)    │   use-mobile)   │
├─────────────────────────────────────────────────────┤
│  src/providers │  src/types      │  src/generated   │
│  (query,       │  (tipos custom, │  (Prisma Client  │
│   session)     │   next-auth.d)  │   gerado)        │
└─────────────────────────────────────────────────────┘
```

---

## Estrutura de pastas

### `src/app` — Rotas

```
src/app/
├── layout.tsx                    → layout raiz (providers globais)
├── globals.css                   → estilos globais
├── proxy.ts                      → proteção de rotas /app
├── (root)/
│   ├── (marketing)/              → página pública (home)
│   │   ├── layout.tsx            → navbar marketing
│   │   └── page.tsx              → hero + features
│   ├── (auth)/
│   │   ├── layout.tsx            → coluna esquerda (imagem)
│   │   ├── login/page.tsx        → LoginForm (NextAuth)
│   │   └── signup/page.tsx       → SignupForm (createUser)
│   └── app/                      → área privada (protegida)
│       ├── layout.tsx            → sidebar + navbar
│       ├── page.tsx              → home do dashboard
│       ├── not-found.tsx
│       ├── [...slug]/page.tsx    → catch-all → 404
│       └── dashboard/page.tsx    → dashboard com jobs
└── api/auth/[...nextauth]/route.ts → endpoints NextAuth
```

**Convenções de rotas:**

- `(marketing)`, `(auth)`, `(root)` são **route groups** — não afetam a URL, só organizam
- Rotas em `app/` são protegidas pelo `proxy.ts`

---

### `src/components` — UI por domínio

```
src/components/
├── auth/          → autenticação (left/right containers, forms)
├── job/           → gestão de jobs (table, delete, form)
├── marketing/     → página pública (hero, features, navbar)
├── navbar/        → barra de navegação do dashboard
├── sidebar/       → sidebar do dashboard (header, contents, footer)
├── shared/        → componentes reutilizáveis (add-btn, logout-btn...)
├── theme/         → tema (dark/light)
└── ui/            → biblioteca shadcn/ui (button, card, table...)
```

**Regra:** componentes de `ui/` são **genéricos e reutilizáveis**. Componentes em `auth/`, `job/`, etc. são **específicos do domínio**.

---

### `src/lib` — Lógica e infraestrutura

| Ficheiro     | Responsabilidade                                        |
| ------------ | ------------------------------------------------------- |
| `db.ts`      | Singleton do PrismaClient (adapter Neon)                |
| `auth.ts`    | Configuração central do NextAuth (providers, callbacks) |
| `actions.ts` | Server Actions (`createUser`, `getJobsByUser`)          |
| `utils.ts`   | Helpers (`cn` para classes Tailwind)                    |

---

### `src/hooks` — Lógica client-side

| Hook            | Responsabilidade                               |
| --------------- | ---------------------------------------------- |
| `use-jobs.ts`   | Query de jobs por sessão + mutation de criação |
| `use-mobile.ts` | Deteção de mobile (shadcn)                     |

---

### `src/providers` — Providers globais

| Provider               | Responsabilidade                       |
| ---------------------- | -------------------------------------- |
| `query-provider.tsx`   | TanStack Query client                  |
| `session-provider.tsx` | NextAuth session (para `useSession()`) |

---

## Fluxos principais

### 1. Signup

```
/signup → SignupForm → createUser (Server Action)
   → valida campos
   → bcrypt.hash(password)
   → db.user.create
   → redirect /login
```

### 2. Login (credentials)

```
/login → LoginForm → signIn("credentials")
   → POST /api/auth/callback/credentials
   → authorize(): findUnique + bcrypt.compare
   → JWT criado → session
   → redirect /app/dashboard
```

### 3. Listar jobs (protegido)

```
/app/dashboard → JobTable → useJobs() → getJobsByUser (Server Action)
   → proxy verifica sessão
   → getServerAuthSession() lê userId da BD (não do cliente!)
   → db.job.findMany({ where: { userId } })
```

---

## Decisões de arquitetura

| Decisão                                   | Porquê                                                     |
| ----------------------------------------- | ---------------------------------------------------------- |
| **NextAuth sem PrismaAdapter (JWT)**      | Mais simples; não precisamos de tabelas Account/Session    |
| **`dbUserId` no token JWT**               | Liga os jobs (userId Int) ao utilizador autenticado        |
| **Actions usam sessão servidor**          | Elimina IDOR (usuário não pode pedir jobs de outro)        |
| **`getJobsByUser` sem parâmetro público** | `userId` vem da sessão, não do cliente                     |
| **Login ≠ Signup**                        | Signup cria conta; login autentica — formulários separados |

---

## O que falta fazer (próximos passos recomendados)

1. **Implementar `createJob`, `deleteJob`, `updateJobStatus`** (atualmente são stubs)
2. Ligar o `FormJobBtn` (onSubmit → mutation) e o `DeleteJobBtn` (→ deleteJob)
3. Criar as rotas do sidebar (`/app/jobs`, `/app/settings`, etc.) ou remover as que não existem
4. Adicionar estados de loading/vazio/erro na `JobTable`
5. Adicionar validação com **Zod** nas Server Actions
6. Adicionar testes (Vitest + Testing Library)
