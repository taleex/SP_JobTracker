import JobTable from "./job-table";

export async function JobList() {
  return (
    <div className="overflow-hidden rounded-md border">
      <JobTable />
    </div>
  );
}
