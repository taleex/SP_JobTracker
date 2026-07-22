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
import { Trash2Icon } from "lucide-react";
import { clsx } from "clsx";

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
                  job.status === "APPLIED" && "text-green-400",
                  job.status === "REJECTED" && "text-destructive",
                  job.status === "SAVED" && "text-purple-300",
                  job.status === "OFFER" && "text-blue-400",
                  job.status === "INTERVIEW" && "text-amber-600",
                  job.status === "GHOSTED" && "text-cyan-900",
                )}
              >
                {job.status}
              </span>
            </TableCell>
            <TableCell className="flex gap-2 items-center">
              <Button variant="outline"> View more</Button>
              <Trash2Icon size={14} className="hover:stroke-destructive" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
