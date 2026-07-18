import type { Metadata } from "next";
import "./globals.css";
import AppLayout from "./(root)/layout";

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
    <html lang="en">
      <body>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
