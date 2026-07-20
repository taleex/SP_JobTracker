"use client";

import { getJobs } from "@/lib/actions";
import JobTable from "./job-table";

export function JobList() {
  const jobs = getJobs;

  return (
    <div className="overflow-hidden rounded-md border">
      <JobTable />
    </div>
  );
}
