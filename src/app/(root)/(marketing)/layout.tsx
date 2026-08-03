import NavbarMarketing from "@/components/marketing/nav-bar-marketing";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarMarketing />
      <main className="h-screen flex flex-col">
        <div className="w-full flex-1 overflow-y-auto">{children}</div>
      </main>
    </>
  );
}
