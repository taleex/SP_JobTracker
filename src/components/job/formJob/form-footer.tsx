import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";

export default function FormFooter() {
  return (
    <DialogFooter>
      <Button type="submit">Save</Button>
      <DialogClose render={<Button variant="outline">Cancel</Button>} />
    </DialogFooter>
  );
}
