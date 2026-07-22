"use server";
import db from "@/lib/db";

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
export async function getJobsbyUser(userId: number) {
  try {
    const jobsByUser = await db.job.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" },
    });

    return jobsByUser;
  } catch (error) {
    console.log(error);
    return [];
  }
}
