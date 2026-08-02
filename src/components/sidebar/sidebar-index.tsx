import { Sidebar } from "@/components/ui/sidebar";
import SidebarHeaders from "./sidebar-headers";
import SidebarContents from "./sidebar-contents";
import SidebarFooters from "./sidebar-footers";

/**
 * Índice da sidebar — compõe header, conteúdo e footer.
 */
export default function SidebarIndex() {
  return (
    <Sidebar>
      <SidebarHeaders />
      <SidebarContents />
      <SidebarFooters />
    </Sidebar>
  );
}
