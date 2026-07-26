import { Sidebar } from "@/components/ui/sidebar";
import SidebarHeaders from "./sidebar-headers";
import SidebarContents from "./sidebar-contents";
import SidebarFooters from "./sidebar-footers";

export default function SideBarIndex() {
  return (
    <Sidebar>
      <SidebarHeaders />
      <SidebarContents />
      <SidebarFooters />
    </Sidebar>
  );
}
