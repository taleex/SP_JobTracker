import FormJobBtn from "@/components/job/formJob/form-job";
import { JobList } from "@/components/job/job-list";

export default async function DashboardHome() {
  return (
    <main className="dashboard-main">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <FormJobBtn />
      </div>
      <JobList />
    </main>
  );
}
