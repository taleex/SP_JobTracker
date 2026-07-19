import { Sidebar } from "@/components/ui/sidebar";
import SidebarHeaders from "./sidebar-headers";
import SidebarContents from "./sidebar-contents";
import { cn } from "@/lib/utils";
import SidebarFooters from "./sidebar-footers";

export default function SideBarIndex() {
  return (
    <Sidebar className={cn("bg-amber-800")}>
      <SidebarHeaders />
      <SidebarContents />
      <SidebarFooters />
    </Sidebar>
  );
}
