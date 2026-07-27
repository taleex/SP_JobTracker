import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import FormHeader from "./form-header";
import FormInputs from "./form-inputs";
import FormFooter from "./form-footer";
import AddBtn from "@/components/shared/add-btn";

export default function FormJobBtn() {
  return (
    <Dialog>
      <form>
        <DialogTrigger render={<AddBtn />} />
        <DialogContent className="dialog-content-wide">
          <FormHeader />
          <FormInputs />
          <FormFooter />
        </DialogContent>
      </form>
    </Dialog>
  );
}
