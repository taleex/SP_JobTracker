import NavBarMarketing from "@/components/marketing/nav-bar-marketing";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen">
      <NavBarMarketing />
      <div className="w-full h-full overflow-y-auto">{children}</div>
    </main>
  );
}
