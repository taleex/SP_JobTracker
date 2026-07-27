import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import QueryProvider from "@/providers/query-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "JobTracker - %s ",
    default: "JobTracker",
  },
  description: "Be on track of jobs that you applied and save their progress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
            try {
              var theme = localStorage.getItem("theme");
              if (!theme) {
                theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
              }
              document.documentElement.classList.add(theme);
            } catch(e) {}
          `,
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
