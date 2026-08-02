"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

/**
 * Botão de logout — termina a sessão do NextAuth.
 */
export default function LogoutBtn() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex w-full items-center gap-2"
    >
      <LogOut className="size-4" />
      <span>Log Out</span>
    </button>
  );
}
