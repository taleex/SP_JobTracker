import LogoutBtn from "../shared/logout-btn";
import { ModeToggle } from "../theme/theme-button";
import { Button } from "../ui/button";

export default function SidebarFooters() {
  return (
    <section className="flex justify-center items-center p-2 mb-4 gap-4">
      <Button>Account</Button>
      <ModeToggle />
      <LogoutBtn />
    </section>
  );
}
