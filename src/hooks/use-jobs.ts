"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { createJob as createJobAction, getJobsByUser } from "@/lib/actions";

/**
 * Hook para listar os jobs do utilizador autenticado.
 *
 * Usa useSession() do NextAuth (em vez do auth-store que tinha
 * o userId: 1 hardcoded). O userId real vem da sessão JWT.
 */
export function useJobs() {
  const { data: session } = useSession();
  const userId = session?.user?.id ? Number(session.user.id) : null;

  return useQuery({
    queryKey: ["jobs", userId],
    queryFn: () => getJobsByUser(),
    enabled: !!userId,
  });
}

/**
 * Mutation para criar um job. Após sucesso invalida a query "jobs"
 * para a tabela atualizar automaticamente.
 */
export function useCreateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createJobAction(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
}
