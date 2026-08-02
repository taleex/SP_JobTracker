import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";

export default function NavbarMarketing() {
  return (
    <nav className="nav-bar-marketing">
      <h1 className="nav-bar-marketing-logo">JobTrackers</h1>
      <div className="nav-bar-marketing-buttons-group ">
        <Link href="/login">
          <Button className={cn("nav-bar-marketing-buttons")}>Log In</Button>
        </Link>
        <Link href="/signup">
          <Button className={cn("nav-bar-marketing-buttons")} variant="outline">
            Sign Up
          </Button>
        </Link>
      </div>
    </nav>
  );
}
