import EditBtn from "@/components/shared/edit-btn";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Job } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";
import { DeleteJobBtn } from "../delete-job-btn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type JobTableLayoutProps = {
  jobs: Job[];
};

export default function JobTableLayout({ jobs }: JobTableLayoutProps) {
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
        {jobs?.map((job) => (
          <TableRow key={job.id}>
            <TableCell>{job.role}</TableCell>
            <TableCell>{job.company}</TableCell>
            <TableCell>
              <div className="max-w-1/3">
                <Badge
                  className={cn(
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
                </Badge>
              </div>
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
