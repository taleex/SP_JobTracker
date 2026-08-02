import { SignupForm } from "./signup-form";
import { LoginForm } from "./login-form";
import AuthFormTitle from "./auth-form-title";
import HaveAccount from "./have-account";

export default function AuthRightContainer({
  mode,
}: {
  mode: "login" | "signup";
}) {
  return (
    <section className="auth-right">
      {mode === "login" ? (
        <>
          <AuthFormTitle title="Welcome back!" />
          <LoginForm />
          <HaveAccount mode={mode} />
        </>
      ) : (
        <>
          <AuthFormTitle title="Create Account!" />
          <SignupForm />
          <HaveAccount mode={mode} />
        </>
      )}
    </section>
  );
}
