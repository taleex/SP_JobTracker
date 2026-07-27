import AuthLeftContainer from "@/components/auth/authLeftContainer/auth-left-container";
import AuthRightContainer from "@/components/auth/authRightContainer/auth-right-container";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="auth-container">
      <AuthLeftContainer />
      <AuthRightContainer />
      <div>{children}</div>
    </main>
  );
}
