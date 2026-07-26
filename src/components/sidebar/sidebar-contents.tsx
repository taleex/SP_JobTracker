import Link from "next/link";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Calendar,
  Settings,
} from "lucide-react";

const mainNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/app/dashboard" },
  { icon: Briefcase, label: "Jobs", href: "/app/jobs" },
  { icon: Users, label: "Candidates", href: "/app/candidates" },
  { icon: Calendar, label: "Interviews", href: "/app/interviews" },
];

const bottomNavItems = [
  { icon: Settings, label: "Settings", href: "/app/settings" },
];

export default function SidebarContents() {
  return (
    <SidebarContent className="justify-between">
      {/* Main Navigation */}
      <SidebarGroup>
        <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {mainNavItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <Link href={item.href}>
                  <SidebarMenuButton tooltip={item.label}>
                    <item.icon className="size-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Settings */}
      <SidebarGroup>
        <SidebarGroupLabel>General</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {bottomNavItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton tooltip={item.label}>
                  <item.icon className="size-4" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
