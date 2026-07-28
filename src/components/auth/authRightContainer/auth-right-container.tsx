import { AuthForm } from "./auth-form-fields";
import AuthFormTitle from "./auth-form-title";

export default function AuthRightContainer() {
  return (
    <section className="auth-right">
      <AuthFormTitle />
      <AuthForm />
    </section>
  );
}
