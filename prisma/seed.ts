import { PrismaClient, JobStatus } from "@/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  const user = await prisma.user.upsert({
    where: {
      email: "demo@example.com",
    },
    update: {},
    create: {
      email: "demo@example.com",
      password: hashedPassword,
    },
  });

  // Remove old jobs so the seed can be run repeatedly
  await prisma.job.deleteMany({
    where: {
      userId: user.id,
    },
  });

  await prisma.job.createMany({
    data: [
      {
        role: "Frontend Developer",
        company: "Google",
        status: JobStatus.APPLIED,
        jobLink: "https://careers.google.com/jobs/results/frontend-developer",
        description: "React, TypeScript, Next.js",
        notes: "Applied through careers page.",
        userId: user.id,
      },
      {
        role: "Full Stack Engineer",
        company: "Microsoft",
        status: JobStatus.INTERVIEW,
        jobLink: "https://careers.microsoft.com/jobs/fullstack-engineer",
        description: "Node.js, React, Azure",
        notes: "Technical interview next Tuesday.",
        userId: user.id,
      },
      {
        role: "Backend Engineer",
        company: "Stripe",
        status: JobStatus.OFFER,
        jobLink: "https://stripe.com/jobs/backend-engineer",
        description: "Go, PostgreSQL",
        notes: "Offer received.",
        userId: user.id,
      },
      {
        role: "Software Engineer",
        company: "Spotify",
        status: JobStatus.REJECTED,
        description: "Platform team",
        notes: "Rejected after final round.",
        userId: user.id,
      },
      {
        role: "React Developer",
        company: "Netflix",
        status: JobStatus.GHOSTED,
        description: "Streaming platform",
        notes: "No response after 3 weeks.",
        userId: user.id,
      },
      {
        role: "Next.js Developer",
        company: "Vercel",
        status: JobStatus.SAVED,
        jobLink: "https://vercel.com/careers",
        description: "Open application",
        userId: user.id,
      },
    ],
  });

  console.log("🌱 Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
