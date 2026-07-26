import UserIcon from "../shared/user-icon";
import { ModeToggle } from "../theme/theme-button";

export default function NavbarBtns() {
  return (
    <section className="flex items-center gap-2">
      <ModeToggle />
      <UserIcon />
    </section>
  );
}
