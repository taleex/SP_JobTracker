import { NavigationMenu } from "@/components/ui/navigation-menu";
import NavBarLogo from "./navbar-logo";
import { cn } from "@/lib/utils";
import NavbarSearch from "./navbar-search";
import NavbarBtns from "./navbar-btn";

export default function NavbarMenu() {
  return (
    <nav className="flex p-6 bg-secondary">
      <NavigationMenu className={cn("max-w-full justify-between")}>
        <NavBarLogo />
        <NavbarSearch />
        <NavbarBtns />
      </NavigationMenu>
    </nav>
  );
}
