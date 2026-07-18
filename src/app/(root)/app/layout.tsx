import NavbarMenu from "@/components/navbar/navbar-menu";
import SideBarIndex from "@/components/sidebar/sidebar-index";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider>
        <SideBarIndex />
        <div className="w-full">
          <NavbarMenu />
          {children}
        </div>
      </SidebarProvider>
    </>
  );
}
