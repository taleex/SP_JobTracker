import UserIcon from "../shared/user-icon";
import { ModeToggle } from "../theme/theme-button";

export default function NavbarBtns() {
  return (
    <section className="app-navbar-actions">
      <ModeToggle />
      <UserIcon />
    </section>
  );
}
