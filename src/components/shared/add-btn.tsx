import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { PlusCircleIcon } from "lucide-react";

export default function AddBtn() {
  return (
    <>
      <Button className={cn("p-6")}>
        <PlusCircleIcon />
        Add Candidature
      </Button>
    </>
  );
}
