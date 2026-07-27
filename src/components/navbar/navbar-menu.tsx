import { NavigationMenu } from "@/components/ui/navigation-menu";
import NavbarSearch from "./navbar-search";
import NavbarBtns from "./navbar-btn";

export default function NavbarMenu() {
  return (
    <nav className="app-navbar">
      <NavigationMenu className="app-navbar-inner">
        <NavbarSearch />
        <NavbarBtns />
      </NavigationMenu>
    </nav>
  );
}
