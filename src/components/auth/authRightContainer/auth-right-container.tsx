import { SignupForm } from "./signup-form";
import { LoginForm } from "./login-form";
import AuthFormTitle from "./auth-form-title";

export default function AuthRightContainer({
  mode,
}: {
  mode: "login" | "signup";
}) {
  return (
    <section className="au  th-right">
      {mode === "login" ? (
        <>
          <AuthFormTitle title="Welcome back!" />
          <LoginForm />
        </>
      ) : (
        <>
          <AuthFormTitle title="Create Account!" />
          <SignupForm />
        </>
      )}
    </section>
  );
}
