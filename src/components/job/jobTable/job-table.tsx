"use client";

import { useJobs } from "@/hooks/use-jobs";
import JobTableLayout from "./job-table-layout";
import JobNotFound from "./job-not-found";

export default function JobTable() {
  const { data: jobs, isLoading, isError } = useJobs();

  return (
    <>
      {jobs && jobs.length > 0 ? (
        <JobTableLayout jobs={jobs} />
      ) : (
        <JobNotFound />
      )}
    </>
  );
}
