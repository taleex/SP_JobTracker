import NavbarMenu from "@/components/navbar/navbar-menu";
import SidebarIndex from "@/components/sidebar/sidebar-index";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="app-root">
        <SidebarProvider className="app-sidebar-wrapper">
          <SidebarIndex />
          <div className="app-content-area">
            <NavbarMenu />
            {children}
          </div>
        </SidebarProvider>
      </div>
    </>
  );
}
