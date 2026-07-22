import { JobList } from "@/components/job/job-list";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default async function DashboardHome() {
  return (
    <main className="p-8">
      <div className="flex justify-between p-2">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button>
          <PlusCircle />
          Add Candidature
        </Button>
      </div>
      <JobList />
    </main>
  );
}
