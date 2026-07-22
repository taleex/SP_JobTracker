import { Sidebar } from "@/components/ui/sidebar";
import SidebarHeaders from "./sidebar-headers";
import SidebarContents from "./sidebar-contents";
import SidebarFooters from "./sidebar-footers";

export default function SideBarIndex() {
  return (
    <Sidebar className="top-16 h-[calc(100svh-4rem)]">
      <SidebarHeaders />
      <SidebarContents />
      <SidebarFooters />
    </Sidebar>
  );
}
