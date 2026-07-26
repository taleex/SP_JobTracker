# App Review — 26/07/2026

## Projeto: JobTracker

---

## ✅ Problema Crítico Corrigido — `nativeButton` no AlertDialog

**Ficheiro:** `src/components/ui/alert-dialog.tsx` (linha 18)

**Problema:** O `DeleteJobBtn` usa `render={<Trash2Icon />}` passando um SVG como trigger do AlertDialog. O Base UI tem `nativeButton` por omissão a `true`, esperando um `<button>` nativo, o que gerava o erro:

> _"Base UI: A component that acts as a button expected a native <button> because the `nativeButton` prop is true."_

**Solução:** Adicionado `nativeButton={false}` ao `<AlertDialogPrimitive.Trigger>`.

---

## ⚠️ Problemas de Arquitetura e Organização

### 1. DashboardLayout importa DashboardHome desnecessariamente

- **Ficheiro:** `src/app/(root)/app/layout.tsx`
- ~~**Linha 5:** `import DashboardHome from "./dashboard/page"`~~
- **Estado:** ✅ Já foi removido (o ficheiro atual já não tem este import).

### 2. HomeLayout com bg-amber-700 hardcoded e ThemeProvider redundante

- **Ficheiro:** `src/app/(root)/(marketing)/layout.tsx`
- **Problemas:**
  - `bg-amber-700` hardcoded — pouca flexibilidade para tema dark/light.
  - Layout sem conteúdo útil — apenas um `<main>` e `<div>` que não acrescentam valor estrutural.

### 3. Página raiz `/app` vazia sem redirecionamento

- **Ficheiro:** `src/app/(root)/app/page.tsx`
- **Problema:** Renderiza `<div></div>` vazio na rota `/app`. Devia redirecionar para `/app/dashboard`.
- **Sugestão:** Usar `redirect("/app/dashboard")` de dentro do componente.

---

## 🔧 Problemas de Código / Design

### 4. DeleteJobBtn sem props — não recebe jobId e não executa delete real

- **Ficheiro:** `src/components/job/delete-job-btn.tsx`
- **Problema:**
  - O componente não aceita `jobId` como prop.
  - O botão "Delete" no AlertDialog não tem `onClick` nem `formAction`.
  - A função `deleteJob` em `src/lib/actions.ts` retorna `null` sem implementação.

### 5. AddJobBtn com formulário placeholder sem funcionalidade real

- **Ficheiro:** `src/components/job/add-job.tsx`
- **Problemas:**
  - Labels e placeholders genéricos ("Edit profile", "Name", "Username", "Pedro Duarte").
  - O `<form>` não tem `action` para server action.
  - Botão "Save changes" sem `formAction`.
  - Os campos do formulário não correspondem ao modelo `Job` (role, company, description, jobLink, status, notes).

### 6. getJobsbyUser(1) com userId hardcoded

- **Ficheiro:** `src/components/job/job-table.tsx` (linha 16)
- **Problema:** `const jobs = await getJobsbyUser(1)` — usa o ID 1 fixo. Após implementar autenticação, terá de ser dinâmico.

### 7. getJobsbyUser sem tipo de retorno explícito

- **Ficheiro:** `src/lib/actions.ts` (linha 16)
- **Problema:** Falta o tipo de retorno explícito (`Promise<Job[]>`). O TypeScript infere, mas não documenta a intenção.

---

## 🎨 Problemas de Estilo / UI

### 8. Cores de status hardcoded sem tokens do tema

- **Ficheiro:** `src/components/job/job-table.tsx` (linhas 35-41)
- **Código atual:**
  ```tsx
  job.status === "APPLIED" && "text-green-400",
  job.status === "REJECTED" && "text-destructive",
  job.status === "SAVED" && "text-purple-300",
  job.status === "OFFER" && "text-blue-400",
  job.status === "INTERVIEW" && "text-amber-600",
  job.status === "GHOSTED" && "text-cyan-900",
  ```
- **Problema:** Cores arbitrárias que quebram o tema dark/light. Nem todas usam tokens CSS do tema.

### 9. Botão "Account" sem funcionalidade

- **Ficheiro:** `src/components/navbar/navbar-btn.tsx` (linha 8)
- **Problema:** `<Button>Account</Button>` não tem link nem ação.

---

## 📁 Problemas de Estrutura de Ficheiros

### 10. job-form.tsx não utilizado (dead code)

- **Ficheiro:** `src/components/job/job-form.tsx`
- **Problema:** Contém apenas placeholders (`Card Title`, `Card Description`, `Card Action`). Nunca é importado por nenhum outro ficheiro.

---

## 🧹 Sugestões de Refactoring Prioritárias

| Prioridade | Problema                            | Sugestão                                                                                                                                                                                       |
| ---------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🔴 Alta    | `add-job.tsx` com dados placeholder | Substituir formulário para corresponder ao modelo `Job` com campos: role, company, description, jobLink, status (select), notes. Adicionar `action` ao `<form>` com `createJob` server action. |
| 🔴 Alta    | `delete-job-btn.tsx` sem `jobId`    | Adicionar prop `jobId: number`, usar `useActionState` ou `formAction` com `deleteJob`.                                                                                                         |
| 🟡 Média   | `app/page.tsx` vazia                | Adicionar `redirect("/app/dashboard")`.                                                                                                                                                        |
| 🟡 Média   | `getJobsbyUser(1)` hardcoded        | Implementar autenticação ou receber userId por props/params.                                                                                                                                   |
| 🟢 Baixa   | `job-form.tsx` não usado            | Remover ficheiro ou converter para formulário funcional de criação/edição de jobs.                                                                                                             |
| 🟢 Baixa   | Cores de status hardcoded           | Usar tokens CSS do tema ou criar mapping com `var(--color-*)` para consistência dark/light.                                                                                                    |
| 🟢 Baixa   | `NavbarBtns` com botão vazio        | Adicionar link para perfil, dropdown de conta, ou logout.                                                                                                                                      |
| 🟢 Baixa   | `getJobsbyUser` sem tipo de retorno | Adicionar `Promise<Job[]>` como tipo de retorno explícito.                                                                                                                                     |
| 🟢 Baixa   | `HomeLayout` com bg hardcoded       | Usar `bg-background` ou `bg-secondary` em vez de `bg-amber-700`.                                                                                                                               |

---

## 📊 Resumo

| Categoria           | Qtde   | Descrição                                                                                  |
| ------------------- | ------ | ------------------------------------------------------------------------------------------ |
| ✅ Corrigidos       | 2      | `nativeButton` no AlertDialog, import morto removido do `app/layout.tsx`                   |
| 🔴 Alta prioridade  | 2      | Formulário AddJob placeholder; DeleteJob sem jobId                                         |
| 🟡 Média prioridade | 2      | Página `/app` vazia; userId hardcoded                                                      |
| 🟢 Baixa prioridade | 5      | Cores hardcoded, dead code (job-form), botão Account vazio, tipos implícitos, bg hardcoded |
| **Total**           | **11** |                                                                                            |

---

## 📁 Estrutura Atual do Projeto (para referência)

```
prisma/
├── schema.prisma
├── seed.ts

src/
├── app/
│   ├── globals.css
│   ├── layout.tsx                    # RootLayout com ThemeProvider
│   └── (root)/
│       ├── (marketing)/
│       │   ├── layout.tsx            # HomeLayout (bg-amber-70 hardcoded)
│       │   └── page.tsx              # Home page vazia
│       └── app/
│           ├── layout.tsx            # DashboardLayout
│           ├── page.tsx              # Página /app vazia (devia redirecionar)
│           └── dashboard/
│               └── page.tsx          # DashboardHome

├── components/
│   ├── job/
│   │   ├── add-job.tsx              # Formulário placeholder
│   │   ├── delete-job-btn.tsx       # Sem jobId, sem ação real
│   │   ├── job-form.tsx             # Dead code
│   │   ├── job-list.tsx             # Wrapper simples
│   │   └── job-table.tsx            # Tabela com status hardcoded
│   ├── navbar/
│   │   ├── navbar-btn.tsx           # Botão Account vazio
│   │   ├── navbar-logo.tsx
│   │   ├── navbar-menu.tsx
│   │   └── navbar-search.tsx
│   ├── shared/
│   │   ├── logout-btn.tsx
│   │   └── search-icon.tsx
│   ├── sidebar/
│   │   ├── sidebar-contents.tsx
│   │   ├── sidebar-footers.tsx
│   │   ├── sidebar-headers.tsx
│   │   └── sidebar-index.tsx
│   ├── theme/
│   │   ├── theme-button.tsx
│   │   └── theme-provider.tsx
│   └── ui/                          # Componentes Base UI / shadcn (13 ficheiros)

├── generated/                       # Código gerado (Prisma)
├── hooks/
│   └── use-mobile.ts
└── lib/
    ├── actions.ts                   # Server actions (createJob, deleteJob sem implementação)
    ├── db.ts                        # Prisma client singleton
    ├── types.ts                     # Tipos Job e JobStatus
    └── utils.ts                     # cn() utility
```

---

_Documento gerado automaticamente durante a code review de 26/07/2026._
