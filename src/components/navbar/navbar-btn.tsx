import { ModeToggle } from "../theme/theme-button";
import { Button } from "../ui/button";

export default function NavbarBtns() {
  return (
    <section className="flex items-center gap-2">
      <ModeToggle />
      <Button>Account</Button>
    </section>
  );
}
