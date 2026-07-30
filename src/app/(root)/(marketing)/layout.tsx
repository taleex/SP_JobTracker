import NavBarMarketing from "@/components/marketing/nav-bar-marketing";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <NavBarMarketing />
      <div className="w-full overflow-y-auto">{children}</div>
    </main>
  );
}
