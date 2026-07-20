"use server";
import db from "@/lib/db";
import prismaConfig from "../../prisma.config";
import { Prisma } from "@/generated/prisma/client";
import { equal } from "assert";

// Jobs

export async function createJob(formData: FormData) {
  return null;
}
export async function updateJobStatus(jobId: number, status: string) {
  return null;
}
export async function deleteJob(jobId: number) {
  return null;
}
export async function getJobs(userId: number) {
  const jobsByUser = await db.job.findMany({
    where: { userId: userId },
  });

  return jobsByUser.findLast;
}
