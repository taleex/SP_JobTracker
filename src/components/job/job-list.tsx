import JobTable from "./job-table";

export async function JobList() {
  return (
    <div className="job-list-wrapper">
      <JobTable />
    </div>
  );
}
