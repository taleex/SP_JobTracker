# 📋 Revisão do Projeto — JobTracker

## 📌 Visão Geral

**JobTracker** é uma aplicação web full-stack construída com **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Prisma + PostgreSQL (Neon)**, **Tailwind CSS v4**, **TanStack React Query**, **Zustand** e **shadcn/ui**. O objetivo é permitir que utilizadores acompanhem candidaturas a empregos, registando empresas, cargos, status e notas.

---

## 🏗 Arquitetura

### Frontend (Next.js 16 App Router)

```
src/
├── app/
│   ├── layout.tsx                    # Root layout (ThemeProvider, QueryProvider)
│   ├── globals.css                   # Tailwind + shadcn + custom CSS
│   ├── (root)/
│   │   ├── (auth)/
│   │   │   ├── layout.tsx            # Auth layout (left image + right form)
│   │   │   ├── login/page.tsx        # Página de login (vazia)
│   │   │   └── register/page.tsx     # Página de registo (vazia)
│   │   ├── (marketing)/
│   │   │   ├── layout.tsx            # Layout marketing simples
│   │   │   └── page.tsx              # Homepage (vazia)
│   │   └── app/
│   │       ├── layout.tsx            # Dashboard layout (sidebar + navbar + children)
│   │       ├── page.tsx              # Dashboard redirect (vazio)
│   │       ├── not-found.tsx          # Página 404 personalizada
│   │       ├── app.css               # Estilos do dashboard
│   │       ├── [...slug]/page.tsx    # Catch-all → notFound()
│   │       └── dashboard/page.tsx    # Dashboard principal (JobList + FormJobBtn)
├── components/
│   ├── auth/                         # Componentes de autenticação
│   ├── job/                          # Componentes de jobs (CRUD)
│   ├── navbar/                       # Barra de navegação
│   ├── sidebar/                      # Sidebar com menu
│   ├── shared/                       # Botões e ícones reutilizáveis
│   ├── theme/                        # Toggle tema (dark/light)
│   └── ui/                           # shadcn/ui components
├── hooks/                            # Custom hooks (use-auth, use-jobs, use-mobile)
├── lib/                              # Server actions, db, types, utils
├── providers/                        # QueryProvider
├── stores/                           # Zustand store (auth-store)
└── generated/prisma/                 # Prisma client generated
prisma/
├── schema.prisma                     # Modelos User e Job
└── seed.ts                           # Seed com dados de exemplo
```

### Rotas

| Rota              | Descrição           | Estado                                                             |
| ----------------- | ------------------- | ------------------------------------------------------------------ |
| `/`               | Marketing/Home      | ❌ Vazia                                                           |
| `/login`          | Login               | ❌ Vazia (só layout renderizado)                                   |
| `/register`       | Registo             | ❌ Vazia (só layout renderizado)                                   |
| `/app/dashboard`  | Dashboard principal | ✅ Estrutura montada, mas sem dados reais                          |
| `/app/jobs`       | Página de empregos  | ❌ Não existe (sidebar aponta, mas catch-all redireciona para 404) |
| `/app/candidates` | Candidatos          | ❌ Não existe                                                      |
| `/app/interviews` | Entrevistas         | ❌ Não existe                                                      |
| `/app/settings`   | Definições          | ❌ Não existe                                                      |

---

## ✅ Pontos Fortes

1. **Stack moderna e bem escolhida** — Next.js 16, React 19, Tailwind v4, Prisma, TanStack Query, Zustand — tudo atualizado e alinhado com boas práticas atuais.
2. **Organização de diretórios limpa** — Separação clara entre auth, job, sidebar, navbar, shared, theme, UI.
3. **Componentes shadcn/ui** — Design system consistente, acessível e customizável.
4. **Prisma com Neon adapter** — Setup de base de dados serverless moderno e escalável.
5. **Seed funcional** — Dados de exemplo bem estruturados com vários status de job.
6. **404 page personalizada** — Experiência de erro melhorada.
7. **Dark mode funcional** — next-themes com toggle e persistência.
8. **QueryProvider com staleTime configurado** — Evita refetch desnecessário a cada 60s.
9. **Sidebar responsiva** — Componente sidebar com suporte mobile.
10. **Índices na base de dados** — `@@index([userId])`, `@@index([status])`, `@@index([userId, status])` para performance.

---

## ❌ Problemas e Pontos de Melhoria

### 🔴 Críticos

#### 1. Autenticação não implementada

- `login/page.tsx` e `register/page.tsx` retornam `<div></div>` vazio.
- `AuthForm` é apenas um formulário estático sem `action`, `onSubmit` ou ligação a server actions.
- `auth-store.ts` tem `userId: 1` hardcoded como valor padrão.
- `use-auth.ts` está vazio (sem implementação).
- `lib/actions.ts` não tem funções de auth (register, login, logout).
- **Impacto:** Qualquer utilizador pode aceder a `/app/dashboard` como userId=1 sem autenticação real.

#### 2. Server Actions de CRUD retornam `null`

- `createJob()`, `updateJobStatus()`, `deleteJob()` em `lib/actions.ts` retornam `null`.
- Apenas `getJobsbyUser()` está implementada.
- `use-jobs.ts` tem `createJob()` exportado mas vazio.
- **Impacto:** O botão "Save" no formulário de criar job não tem efeito. Delete e Edit também não funcionam.

#### 3. Páginas de destino (marketing, login, register) vazias

- Marketing page (`/`) está vazia.
- Login e Register pages estão vazias.
- **Impacto:** Utilizador vê ecrãs em branco nas rotas principais.

#### 4. Rotas do sidebar não existem

- `/app/jobs`, `/app/candidates`, `/app/interviews`, `/app/settings` no sidebar mas não têm páginas.
- O catch-all `[...slug]` redireciona para 404.
- **Impacto:** Navegação partida — clicar nos links leva a 404.

### 🟠 Moderados

#### 5. Dados hardcoded no sidebar

- `SidebarFooters` tem "John Doe" e "john@example.com" hardcoded.
- Deve vir do store de auth ou utilizador logado.

#### 6. Nenhum tratamento de loading/error no JobTable

- `JobTable` usa `useJobs()` mas não tem estados de loading, empty ou error visíveis.
- Se a query falhar, o utilizador não vê feedback.

#### 7. Formulário de criação de job sem submissão funcional

- `FormJobBtn` envolve o formulário apenas com `<form>` sem `action` ou `onSubmit`.
- Os inputs têm `name` mas não há `formAction` ligado a server action.

#### 8. Botão de editar sem funcionalidade

- `EditBtn` renderiza apenas um ícone `<Edit>` sem qualquer handler ou modal.
- **Impacto:** Utilizador clica e nada acontece.

#### 9. Botão de logout sem funcionalidade

- `LogoutBtn` renderiza apenas um ícone `<LogOut>` sem ação de logout.
- **Impacto:** Utilizador clica e nada acontece.

#### 10. Botão de delete sem ação

- `DeleteJobBtn` mostra diálogo de confirmação, mas não chama `deleteJob()`.
- O `AlertDialogAction` não tem `onClick` ou `formAction`.

#### 11. Search sem funcionalidade

- `NavbarSearch` renderiza input de pesquisa, mas sem handler `onChange`, `onSubmit` ou lógica de filtro.

#### 12. Auth form com campos genéricos misturados

- `AuthForm` tem campo "Name", "Email", checkbox "Accept terms" e botões "Reset"/"Submit".
- Não distingue entre login (apenas email + password) e registo (name + email + password + terms).
- `AuthFormTitle` diz "Create Account!" sempre, mesmo na página de login.

#### 13. AuthLayout renderiza conteúdo duplicado

- `(auth)/layout.tsx` renderiza `<AuthLeftContainer />`, `<AuthRightContainer />` **e** `{children}`.
- As páginas login/register estão vazias, mas o layout já renderiza os forms.
- **Impacto:** Conteúdo reduntante e confuso.

#### 14. `src/generated/prisma/` versionado no repositório

- Ficheiros gerados pelo Prisma client estão no repositório.
- Devem estar em `.gitignore` e gerados no `postinstall`/`build`.

### 🟡 Leves

#### 15. README.md é boilerplate do create-next-app

- Sem descrição do projeto, instruções de setup, variáveis de ambiente, etc.

#### 16. Sem ficheiro `.env.example`

- Não há template para as variáveis de ambiente necessárias (`DATABASE_URL`).

#### 17. Configuração extra `prisma.config.ts`

- Ficheiro `prisma.config.ts` presente na raiz, mas não referenciado em `package.json` ou schema.
- Pode ser redundante ou não utilizado.

#### 18. Sem testes

- Nenhum teste unitário, de integração ou e2e.

#### 19. Sem Docker/compose

- Sem `Dockerfile` ou `docker-compose.yml` para ambiente de desenvolvimento.

#### 20. Sem CI/CD configurado

- Sem ficheiros de GitHub Actions ou outra pipeline.

#### 21. Componentes UI com barrel exports inconsistentes

- Alguns componentes usam export default, outros export named.
- `ui/` components têm tanto default como named exports.

#### 22. `useJobs` hook não tem tratamento de erro

- `useJobs` usa `getJobsbyUser(userId!)` com non-null assertion, mas `userId` pode ser null.
- A query está enabled apenas quando `userId` é truthy, mas se for null, o TypeScript não avisa.

#### 23. Nenhuma validação de formulário

- `FormInputs` usa `required` nativo do HTML, mas não há validação no servidor ou cliente.
- Sem schema de validação (zod, yup, etc.).

#### 24. `User` model não tem campo `name`

- O modelo `User` no schema Prisma só tem `id`, `email`, `password`, `createdAt`.
- Não há campo `name` para o nome do utilizador, apesar do `auth-store` ter `userName`.

#### 25. `auth-store` inconsistente com o modelo

- `auth-store` tem `userName` e `userEmail`, mas `User` no Prisma não tem `name`.
- `userId: 1` hardcoded como padrão.

---

## 📊 Resumo

| Categoria    | Contagem |
| ------------ | -------- |
| 🔴 Críticos  | 4        |
| 🟠 Moderados | 9        |
| 🟡 Leves     | 12       |
| **Total**    | **25**   |

---

## 🎫 Tickets

---

### [Auth] Feature: Implementar Autenticação Completa

## Objetivo

Implementar autenticação real com login, registo, logout e proteção de rotas. Substituir o userId hardcoded e o auth-store vazio por um fluxo funcional com bcrypt, JWT/sessions e middleware.

## Critérios de Aceitação

- [ ] Criar server actions `registerUser(email, password, name)` e `loginUser(email, password)` em `lib/actions.ts`
- [ ] Criar `logoutUser()` server action
- [ ] Implementar `login/page.tsx` com formulário funcional (email + password)
- [ ] Implementar `register/page.tsx` com formulário funcional (name + email + password + confirm)
- [ ] Atualizar `auth-store.ts` para usar dados reais do servidor (remover userId: 1 hardcoded)
- [ ] Implementar proteção de rotas no layout do dashboard (redirecionar para /login se não autenticado)
- [ ] Adicionar middleware Next.js para proteger rotas `/app/*`
- [ ] Atualizar `SidebarFooters` para usar dados do utilizador logado
- [ ] Fazer `LogoutBtn` chamar `logoutUser()` e limpar store
- [ ] Adicionar loading state durante login/registo

## Notas

- Rotas afetadas: `/login`, `/register`, `/app/*`
- Ficheiros: `lib/actions.ts`, `stores/auth-store.ts`, `hooks/use-auth.ts`, `components/auth/*`, `components/shared/logout-btn.tsx`, `components/sidebar/sidebar-footers.tsx`
- Schema: `User` precisa de campo `name` (ver ticket Database)

---

### [Auth] Bug: AuthLayout Renderiza Conteúdo Duplicado

## Objetivo

Corrigir o layout de auth que renderiza os containers esquerdo/direito E o children, resultando em conteúdo duplicado.

## Critérios de Aceitação

- [ ] Decidir se os formulários de login/register são renderizados pelo layout ou pelas páginas
- [ ] Atualizar `(auth)/layout.tsx` para renderizar apenas a estrutura base (background, grid)
- [ ] Mover `AuthRightContainer` e `AuthLeftContainer` para as páginas individuais, ou manter no layout sem children
- [ ] Remover renderização duplicada

## Notas

- Ficheiro: `src/app/(root)/(auth)/layout.tsx`
- Login/register pages atualmente vazias

---

### [API] Feature: Implementar CRUD de Jobs

## Objetivo

Implementar as server actions de create, update e delete de jobs, que atualmente retornam null. Ligar os formulários e botões às actions.

## Critérios de Aceitação

- [ ] Implementar `createJob(formData: FormData)` em `lib/actions.ts` com validação e criação no DB
- [ ] Implementar `updateJobStatus(jobId: number, status: string)` com validação
- [ ] Implementar `deleteJob(jobId: number)` com validação
- [ ] Ligar `FormJobBtn` + `FormInputs` + `FormFooter` à `createJob` via `action` do form
- [ ] Ligar `DeleteJobBtn` à `deleteJob` no `AlertDialogAction`
- [ ] Implementar `EditBtn` com diálogo/forma de edição
- [ ] Adicionar validação de dados com Zod
- [ ] Adicionar estados de loading, success e error nos formulários
- [ ] Atualizar `use-jobs.ts` com mutations (useMutation)
- [ ] Invalidar query cache após create/update/delete para refresh automático

## Notas

- Ficheiros: `lib/actions.ts`, `hooks/use-jobs.ts`, `components/job/*`, `components/job/formJob/*`
- Ações: `/app/dashboard` (JobList)
- Usar `useMutation` + `queryClient.invalidateQueries`

---

### [UI] Feature: Implementar Páginas do Dashboard (Jobs, Candidates, Interviews, Settings)

## Objetivo

Criar páginas reais para as rotas listadas no sidebar que atualmente levam a 404.

## Critérios de Aceitação

- [ ] Criar `src/app/(root)/app/jobs/page.tsx` com lista de jobs
- [ ] Criar `src/app/(root)/app/candidates/page.tsx` (página placeholder ou futura)
- [ ] Criar `src/app/(root)/app/interviews/page.tsx` com calendário/lista de entrevistas
- [ ] Criar `src/app/(root)/app/settings/page.tsx` com definições do utilizador
- [ ] Atualizar metadata (titles) para cada página

## Notas

- Rotas: `/app/jobs`, `/app/candidates`, `/app/interviews`, `/app/settings`
- Sidebar já aponta para estas rotas em `sidebar-contents.tsx`

---

### [UI] Feature: Implementar Search Funcional no Navbar

## Objetivo

Tornar o campo de pesquisa no navbar funcional, filtrando jobs por role, company ou description.

## Critérios de Aceitação

- [ ] Adicionar estado de pesquisa no `NavbarSearch` com `onChange`/`onSubmit`
- [ ] Passar query de pesquisa para `useJobs` ou criar endpoint de search
- [ ] Filtrar jobs na tabela com base no input
- [ ] Debounce para evitar demasiadas chamadas

## Notas

- Ficheiro: `src/components/navbar/navbar-search.tsx`
- Integração com `use-jobs.ts` ou filter client-side

---

### [UI] Feature: Adicionar Estados de Loading, Empty e Error no JobTable

## Objetivo

Melhorar experiência do utilizador no JobTable com feedback visual para loading, lista vazia e erros.

## Critérios de Aceitação

- [ ] Adicionar spinner/skeleton durante loading (`isLoading`)
- [ ] Adicionar mensagem "Nenhum job encontrado" quando lista vazia
- [ ] Adicionar mensagem de erro com retry quando `isError`
- [ ] Usar `TableSkeleton` ou componente similar

## Notas

- Ficheiro: `src/components/job/job-table.tsx`
- Hook: `useJobs` já retorna `isLoading`, `isError`

---

### [Database] Feature: Adicionar Campo `name` ao Modelo User

## Objetivo

Adicionar campo `name` ao modelo User no schema Prisma, atualizar seed, e sincronizar com o auth-store.

## Critérios de Aceitação

- [ ] Adicionar `name String` ao modelo User no schema
- [ ] Criar migração Prisma
- [ ] Atualizar `seed.ts` para incluir name no user demo
- [ ] Atualizar `auth-store` para usar name corretamente
- [ ] Atualizar `SidebarFooters` para mostrar o nome real

## Notas

- Ficheiro: `prisma/schema.prisma`, `prisma/seed.ts`, `stores/auth-store.ts`, `components/sidebar/sidebar-footers.tsx`

---

### [Chore] Feature: Configurar Variáveis de Ambiente e Documentação

## Objetivo

Criar `.env.example`, atualizar `README.md` com documentação real do projeto, e adicionar instruções de setup.

## Critérios de Aceitação

- [ ] Criar `.env.example` com `DATABASE_URL` e outras variáveis
- [ ] Atualizar `README.md` com descrição do projeto, stack, setup, seed, scripts
- [ ] Adicionar badges e informações de contribuição

## Notas

- Ficheiros: `.env.example`, `README.md`

---

### [Chore] Bug: Generated Prisma Files Versionados

## Objetivo

Mover ficheiros gerados pelo Prisma para `.gitignore` e gerar durante build/install.

## Critérios de Aceitação

- [ ] Adicionar `src/generated/prisma/` ao `.gitignore`
- [ ] Verificar se `postinstall` e `build` scripts já geram prisma client
- [ ] Remover `src/generated/prisma/` do repositório (git rm --cached)

## Notas

- Ficheiros: `.gitignore`, `package.json` (scripts)

---

### [DevOps] Feature: Adicionar Docker Compose para Desenvolvimento Local

## Objetivo

Facilitar setup do ambiente de desenvolvimento com Docker Compose (PostgreSQL + app).

## Critérios de Aceitação

- [ ] Criar `Dockerfile` para a aplicação Next.js
- [ ] Criar `docker-compose.yml` com PostgreSQL + app
- [ ] Adicionar instruções no README

## Notas

- Necessário para novos developers contribuírem sem configurar PostgreSQL manualmente

---

### [Refactor] Melhoria: Validação de Dados com Zod

## Objetivo

Adicionar validação de formulários com Zod, tanto no cliente como no servidor.

## Critérios de Aceitação

- [ ] Instalar `zod` e `@hookform/resolvers`
- [ ] Criar schemas de validação para login, register, createJob, updateJob
- [ ] Integrar com formulários usando `react-hook-form` ou validação manual
- [ ] Validar server actions com Zod

## Notas

- Ficheiros: `lib/validations.ts`, `components/job/formJob/*`, `components/auth/*`

---

### [Refactor] Melhoria: Adicionar Testes

## Objetivo

Adicionar testes unitários e de integração para componentes críticos, hooks e server actions.

## Critérios de Aceitação

- [ ] Configurar Vitest ou Jest
- [ ] Testar server actions (createJob, getJobsbyUser, etc.)
- [ ] Testar hooks (useJobs, useAuth)
- [ ] Testar componentes (JobTable, AuthForm, etc.)

## Notas

- Setup inicial: `npm install -D vitest @testing-library/react`

---

_Revisão gerada em: 30 de Julho de 2026_
_Total de tickets: 11_
