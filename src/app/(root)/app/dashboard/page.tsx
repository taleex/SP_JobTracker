import FormJobBtn from "@/components/job/formJob/form-job";
import { JobList } from "@/components/job/job-list";

export default async function DashboardHome() {
  return (
    <main className="p-8">
      <div className="flex justify-between p-2">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <FormJobBtn />
      </div>
      <JobList />
    </main>
  );
}
