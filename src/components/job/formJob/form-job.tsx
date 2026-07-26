import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import FormHeader from "./form-header";
import FormInputs from "./form-inputs";
import FormFooter from "./form-footer";

export default function FormJobBtn() {
  return (
    <Dialog>
      <form>
        <DialogTrigger
          render={
            <Button>
              <PlusCircle />
              Add Candidature
            </Button>
          }
        />
        <DialogContent className="max-w-3xl">
          <FormHeader />
          <FormInputs />
          <FormFooter />
        </DialogContent>
      </form>
    </Dialog>
  );
}
