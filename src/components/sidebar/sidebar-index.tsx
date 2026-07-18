import { Sidebar } from "@/components/ui/sidebar";
import SidebarHeaders from "./sidebar-headers";
import SidebarContents from "./sidebar-contents";

export default function SideBarIndex() {
  return (
    <Sidebar variant="sidebar">
      <SidebarHeaders />
      <SidebarContents />
    </Sidebar>
  );
}
