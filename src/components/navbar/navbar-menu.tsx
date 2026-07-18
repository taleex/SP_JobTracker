import { NavigationMenu } from "@/components/ui/navigation-menu";
import NavBarLogo from "./navbar-logo";
import { cn } from "@/lib/utils";
import NavbarSearch from "./navbar-search";
import NavbarBtns from "./navbar-btn";
import { SidebarTrigger } from "../ui/sidebar";

export default function NavbarMenu() {
  return (
    <nav className="flex p-6 h-16 bg-secondary">
      <NavigationMenu className={cn("max-w-full justify-between")}>
        <SidebarTrigger />
        <NavBarLogo />
        <NavbarSearch />
        <NavbarBtns />
      </NavigationMenu>
    </nav>
  );
}
