import { ThemeProvider } from "@/components/theme/theme-provider";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="w-full overflow-y-auto">{children}</div>
    </main>
  );
}
