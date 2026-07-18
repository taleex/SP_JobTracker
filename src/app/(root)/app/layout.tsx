import NavbarMenu from "@/components/navbar/navbar-menu";
import SideBarIndex from "@/components/sidebar/sidebar-index";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider>
        <SidebarProvider>
          <SideBarIndex />
          <div className="w-full">
            <NavbarMenu />
            {children}
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </>
  );
}
