import { Job } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type JobTableLayoutProps = {
  jobs: Job[];
};

export default function JobTableLayout({ jobs }: JobTableLayoutProps) {
  return (
    <div className="flex flex-col p-8 gap-2 h-full w-1/2">
      {jobs?.map((job) => (
        <Card key={job.id} className={cn("justify-between items-start p-4")}>
          <div>
            {job.role}
            <p>{job.company}</p>
            <p>{job.description}</p>
          </div>
          <div className="ml-auto">
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
        </Card>
      ))}
    </div>
  );
}
