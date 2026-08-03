"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function NavbarMarketing() {
  const pathname = usePathname();

  const session = useSession();

  return (
    <nav
      className={
        pathname !== "/login" && pathname !== "/signup"
          ? "nav-bar-marketing"
          : "nav-bar-auth"
      }
    >
      <Link href="/">
        <h1 className="nav-bar-marketing-logo">JobTrackers</h1>
      </Link>

      {pathname !== "/login" && pathname !== "/signup" && !session.data ? (
        <div className="nav-bar-marketing-buttons-group ">
          <Link href="/login">
            <Button
              className={cn("nav-bar-marketing-buttons-primary")}
              variant="secondary"
            >
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              className={cn("nav-bar-marketing-buttons-secondary")}
              variant="outline"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      ) : (
        <Link href="/app/dashboard">
          <Button
            className={cn("nav-bar-marketing-buttons-primar")}
            variant="secondary"
          >
            Dashboard
          </Button>
        </Link>
      )}
    </nav>
  );
}
