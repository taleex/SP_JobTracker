import { cn } from "@/lib/utils";
import { Edit } from "lucide-react";

export default function EditBtn() {
  return <Edit className={cn("hover:stroke-mauve-500")} size={16}></Edit>;
}
