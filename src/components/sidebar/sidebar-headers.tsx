import React from "react";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import {} from "@/components/ui/dropdown-menu";
import SideBarLogo from "./sidebar-logo";

export default function SidebarHeaders() {
  return (
    <SidebarHeader>
      {/* Workspace Selector */}
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton className="">
            -
            <SideBarLogo />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
