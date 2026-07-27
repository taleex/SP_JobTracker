# App Review — JobTracker

> **Date:** 2026-07-27
> **Scope:** Full codebase analysis (architecture, performance, functionality, code quality)

---

## 🔴 Critical Issues (Blocking Functionality)

### 1. Server Actions Vazias (`src/lib/actions.ts`)

```ts
export async function createJob(formData: FormData) {
  return null;
}
export async function updateJobStatus(jobId: number, status: string) {
  return null;
}
export async function deleteJob(jobId: number) {
  return null;
}
```

- `createJob()`, `updateJobStatus()`, e `deleteJob()` retornam todas `null`.
- **Impacto:** Nenhuma operação CRUD funciona. A app não cria, edita nem apaga jobs.
- **Correção:** Implementar as operações com Prisma (`prisma.job.create`, `prisma.job.update`, `prisma.job.delete`), incluindo validação de input e tratamento de erros.

### 2. Hardcoded `userId` — Sem Autenticação (`src/components/job/job-table.tsx:16`)

```ts
const jobs = await getJobsbyUser(1);
```

- O `userId` está fixo em `1`. Não existe sistema de login/sessão.
- **Impacto:** Todos os utilizadores veem os mesmos dados. Quebra o modelo de dados multi-user.
- **Correção:** Implementar autenticação (NextAuth.js, Clerk, ou similar) e usar o `userId` da sessão autenticada.

### 3. Formulário sem `action` — Dados nunca são enviados (`src/components/job/formJob/form-job.tsx`)

```tsx
<form>
  <DialogTrigger render={<AddBtn />} />
  <DialogContent className="dialog-content-wide">
    <FormHeader />
    <FormInputs />
    <FormFooter />
  </DialogContent>
</form>
```

- O `<form>` não tem atributo `action` a apontar para `createJob()`. O submit não é tratado.
- **Impacto:** Submeter o formulário não guarda dados.
- **Correção:** Adicionar `action={createJob}` ao `<form>` e garantir que o `DialogTrigger` submete o formulário.

### 4. `EditBtn` sem funcionalidade (`src/components/shared/edit-btn.tsx`)

```tsx
export default function EditBtn() {
  return <Edit className={cn("hover:stroke-mauve-500")} size={16}></Edit>;
}
```

- Renderiza apenas um ícone. Não tem dialog, modal, handler, nem recebe `jobId` como prop.
- **Impacto:** Botão de editar não faz nada.
- **Correção:** Passar `jobId` como prop, abrir dialog com formulário preenchido, e chamar `updateJobStatus()`.

### 5. `DeleteJobBtn` sem handler (`src/components/job/delete-job-btn.tsx`)

```tsx
<AlertDialogAction variant="destructive">Delete</AlertDialogAction>
```

- O `<AlertDialogAction>` nunca chama `deleteJob(jobId)` nem recebe `jobId` como prop.
- **Impacto:** Confirmar delete não remove o registo.
- **Correção:** Passar `jobId`, usar `useActionState` ou `onClick` para chamar `deleteJob(jobId)`.

### 6. Missing `DATABASE_URL`

- `.env*` está no `.gitignore`. `db.ts` e `prisma.config.ts` dependem de `process.env.DATABASE_URL`.
- **Impacto:** A app crasha à partida sem esta variável definida.
- **Correção:** Criar ficheiro `.env.local` com `DATABASE_URL=postgresql://...` e documentar no README.

---

## 🟠 Performance — Causa da Lentidão entre Navegação de Páginas

### 7. Server Components sem Streaming — Round-trip completo ao servidor

A lentidão tem **duas causas principais**:

#### Causa A — Navegação Server-Side sem Prefetch

A sidebar (`sidebar-contents.tsx`) usa `next/link` para navegar entre páginas. No Next.js 16, por omissão:

- O **prefetch** só acontece para links **visíveis no viewport** e apenas durante o idle time.
- Como as páginas do dashboard são **Server Components**, cada clique num link da sidebar faz um **round-trip completo ao servidor Next.js**:
  1. O servidor processa o pedido
  2. Vai à base de dados buscar os dados (`getJobsbyUser`)
  3. Renderiza o JSX no servidor
  4. Envia o HTML/JSON serializado para o cliente
  5. O React hidrata no cliente

**Resultado:** O utilizador sente um delay perceptível (200ms-1s+) entre clicar e ver o conteúdo.

#### Causa B — `JobTable` Bloqueia a Renderização

```tsx
// job-table.tsx
export default async function JobTable() {
  const jobs = await getJobsbyUser(1); // Bloqueia até BD responder
  // ...render...
}
```

- `getJobsbyUser()` é uma **promise blocking** dentro de um Server Component.
- Enquanto a BD não responde, o servidor não envia nada ao cliente (nem shell, nem fallback).
- O utilizador vê **ecrã em branco** durante a latência da BD (especialmente em Neon serverless, que tem cold starts).

#### Soluções Recomendadas

| Técnica                                                        | O que resolve                                            |
| -------------------------------------------------------------- | -------------------------------------------------------- |
| **`<Link prefetch={true}>`** na sidebar                        | Pré-carrega dados da página ao fazer hover               |
| **`loading.tsx`** em cada rota `/app/*`                        | Mostra skeleton/spinner imediato                         |
| **`<Suspense>`** com streaming                                 | Renderiza o layout primeiro, depois faz stream dos dados |
| **React.cache() / unstable_cache**                             | Cache de dados entre pedidos                             |
| **Migrar `JobTable` para Client Component com Server Actions** | Evita blocking no servidor                               |

**Prioridade máxima:** Adicionar `loading.tsx` + `Suspense` boundaries é a correção mais rápida com maior impacto percebido.

---

## 🟡 Code Quality & Architecture Issues

### 8. Componentes UI importados mas não usados

- `src/components/sidebar/sidebar-headers.tsx:3` — `import { } from "@/components/ui/dropdown-menu";` (import vazio)
- `src/components/sidebar/sidebar-headers.tsx:1` — `import React from "react";` não usado
- `src/app/(root)/(marketing)/layout.tsx:1` — `import { ThemeProvider } from "@/components/theme/theme-provider";` não usado

### 9. Modelo `User` com `password` em texto

```prisma
model User {
  password  String   // Sem indicação de hash
}
```

- O campo `password` deve armazenar o hash, não a password em texto.
- Atualmente, o schema não documenta ou força hashing.

### 10. Seed duplicado do PrismaNeon

- `prisma/seed.ts` cria o seu próprio `PrismaClient` com adapter em vez de reutilizar o singleton `db.ts`.
- Causa potencial de múltiplas conexões à BD.

### 11. `prisma.config.ts` depende de `dotenv` não listado

```ts
import "dotenv/config";
```

- O pacote `dotenv` não está nas `dependencies` ou `devDependencies` do `package.json`.

### 12. Rotas placeholder vazias

- `src/app/(root)/(marketing)/page.tsx` — `<main></main>` (homepage vazia)
- `src/app/(root)/app/page.tsx` — `<div></div>` (devia redirecionar para `/app/dashboard`)

### 13. Missing `loading.tsx` e `error.tsx`

- Nenhuma das rotas em `(root)/app/` tem `loading.tsx` ou `error.tsx`.
- Utilizador vê ecrã branco durante carregamento ou crash total em caso de erro.

### 14. `next.config.ts` sem otimizações

```ts
const nextConfig: NextConfig = {
  /* config options here */
};
```

- Sem `experimental`, `logging`, ou configuração de `serverActions`.

---

## Recommendations Summary

| Prioridade | Problema                     | Ação                                          |
| ---------- | ---------------------------- | --------------------------------------------- |
| 🔴 P0      | Server Actions vazias        | Implementar CRUD com Prisma                   |
| 🔴 P0      | Hardcoded userId             | Adicionar autenticação                        |
| 🔴 P0      | Form sem action              | Ligar `<form action={createJob}>`             |
| 🔴 P0      | Delete/Edit sem handler      | Passar `jobId` e implementar lógica           |
| 🔴 P0      | Missing DATABASE_URL         | Criar `.env.local`                            |
| 🟠 P1      | Lentidão navegação           | Adicionar `loading.tsx`, `Suspense`, prefetch |
| 🟠 P1      | `JobTable` bloqueia render   | Migrar para streaming / Client Component      |
| 🟡 P2      | Imports mortos               | Limpar imports não usados                     |
| 🟡 P2      | Rotas vazias                 | Implementar home + redirect dashboard         |
| 🟡 P2      | Missing loading/error states | Adicionar `loading.tsx` e `error.tsx`         |

---

_End of review._
