import NavbarMenu from "@/components/navbar/navbar-menu";
import SideBarIndex from "@/components/sidebar/sidebar-index";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardHome from "./dashboard/page";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider>
        <div className="flex flex-col h-svh overflow-hidden">
          <NavbarMenu />
          <SidebarProvider className="flex-1 min-h-0">
            <SideBarIndex />
            <div className="w-full overflow-y-auto">{children}</div>
          </SidebarProvider>
        </div>
      </ThemeProvider>
    </>
  );
}
