import LogoutBtn from "../shared/logout-btn";
import { Button } from "../ui/button";

export default function SidebarFooters() {
  return (
    <section className="flex justify-center items-center p-2 mb-4 gap-2">
      <Button>Account</Button>
      <LogoutBtn />
    </section>
  );
}
