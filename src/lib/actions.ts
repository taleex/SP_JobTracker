"use server";
import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { getServerAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

// Jobs

const JOB_STATUSES = [
  "SAVED",
  "APPLIED",
  "INTERVIEW",
  "OFFER",
  "REJECTED",
  "GHOSTED",
] as const;
type JobStatusValue = (typeof JOB_STATUSES)[number];

export async function createJob(formData: FormData) {
  const session = await getServerAuthSession();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = Number(session.user.id);

  // Extract and validate form fields
  const role = (formData.get("role") as string | null)?.trim() ?? "";
  const company = (formData.get("company") as string | null)?.trim() ?? "";
  const jobLink = (formData.get("jobLink") as string | null)?.trim() || null;
  const description =
    (formData.get("description") as string | null)?.trim() || null;
  const notes = (formData.get("notes") as string | null)?.trim() || null;
  const status = (formData.get("status") as string | null) ?? "APPLIED";

  // Validate required fields
  if (!role || !company) {
    return { success: false, error: "Role and company are required." };
  }

  // Validate status is a valid JobStatus
  if (!JOB_STATUSES.includes(status as JobStatusValue)) {
    return { success: false, error: "Invalid job status." };
  }

  try {
    await db.job.create({
      data: {
        userId,
        role,
        company,
        jobLink,
        description,
        notes,
        status: status as JobStatusValue,
      },
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
export async function updateJobStatus(jobId: number, status: string) {
  return null;
}
export async function deleteJob(jobId: number) {
  return null;
}

export async function getJobsByUser() {
  const session = await getServerAuthSession();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = Number(session.user.id);

  try {
    const jobsByUser = await db.job.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return jobsByUser;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Users

export type CreateUserResult = {
  success: boolean;
  error?: string;
  user?: { id: number; name: string; email: string };
};

export async function createUser(
  formData: FormData,
): Promise<CreateUserResult> {
  // 1. Extrair e validar os campos do formulário
  //    (validação SERVER-SIDE — a do form é só UX e pode ser contornada)
  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const email =
    (formData.get("email") as string | null)?.trim().toLowerCase() ?? "";
  const password = (formData.get("password") as string | null) ?? "";

  if (!name || !email || !password) {
    return { success: false, error: "All fields are required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  if (name.length < 2) {
    return { success: false, error: "Name must be at least 2 characters." };
  }

  if (password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters." };
  }

  try {
    // 2. Gerar o hash da senha com bcrypt (10 rounds de salt)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Criar o utilizador na base de dados
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // 4. Retornar o utilizador criado (sem a senha)
    return {
      success: true,
      user: { id: user.id, name: user.name, email: user.email },
    };
  } catch (error) {
    // 5. Tratar o erro de email duplicado (código P2002 do Prisma)
    if (error instanceof Error && "code" in error && error.code === "P2002") {
      return {
        success: false,
        error: "An account with this email already exists.",
      };
    }

    console.log(error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
