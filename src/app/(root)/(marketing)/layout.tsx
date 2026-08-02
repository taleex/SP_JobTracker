import NavbarMarketing from "@/components/marketing/nav-bar-marketing";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen flex flex-col">
      <NavbarMarketing />
      <div className="w-full flex-1 overflow-y-auto">{children}</div>
    </main>
  );
}
