"use client";

import { useQuery } from "@tanstack/react-query";
import { getJobsbyUser } from "@/lib/actions";
import { useAuthStore } from "@/stores/auth-store";

export function useJobs() {
  const userId = useAuthStore((s) => s.userId);

  return useQuery({
    queryKey: ["jobs", userId],
    queryFn: () => getJobsbyUser(userId!),
    enabled: !!userId,
  });
}

export function createJob() {}
