import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function FormHeader() {
  return (
    <DialogHeader>
      <DialogTitle>Add Job</DialogTitle>
      <DialogDescription>
        Fill in the details of the job you applied to.
      </DialogDescription>
    </DialogHeader>
  );
}
