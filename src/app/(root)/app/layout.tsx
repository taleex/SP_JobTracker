import NavbarMenu from "@/components/navbar/navbar-menu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <NavbarMenu />
      {children}
    </section>
  );
}
