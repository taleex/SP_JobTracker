// src/lib/types.ts
export type JobStatus =
  | "SAVED"
  | "APPLIED"
  | "INTERVIEW"
  | "OFFER"
  | "REJECTED"
  | "GHOSTED";

export type Job = {
  id: number;
  role: string;
  company: string;
  description: string | null;
  jobLink: string | null;
  status: JobStatus;
  userId: number;
  notes: string | null;
  updatedAt: Date;
  createdAt: Date;
};
