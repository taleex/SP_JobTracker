import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { SidebarMenuButton } from "../ui/sidebar";

export default function SideBarLogo() {
  return (
    <Link href="/">
      <SidebarMenuButton>
        <LayoutDashboard />
        <h2 className="font-bold text-2xl">JobTracker</h2>
      </SidebarMenuButton>
    </Link>
  );
}
