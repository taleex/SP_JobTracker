import { getJobsbyUser } from "@/lib/actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { clsx } from "clsx";
import { DeleteJobBtn } from "./delete-job-btn";
import EditBtn from "../shared/edit-btn";

export default async function JobTable() {
  const jobs = await getJobsbyUser(1);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Role</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.id}>
            <TableCell>{job.role}</TableCell>
            <TableCell>{job.company}</TableCell>
            <TableCell>
              <span
                className={clsx(
                  "font-bold",
                  job.status === "APPLIED" && "status-applied",
                  job.status === "REJECTED" && "status-rejected",
                  job.status === "SAVED" && "status-saved",
                  job.status === "OFFER" && "status-offer",
                  job.status === "INTERVIEW" && "status-interview",
                  job.status === "GHOSTED" && "status-ghosted",
                )}
              >
                {job.status}
              </span>
            </TableCell>
            <TableCell className="job-table-actions">
              <Button variant="outline"> View more</Button>
              <EditBtn />
              <DeleteJobBtn />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
