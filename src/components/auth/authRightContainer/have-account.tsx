type HaveAccountProps = {
  mode: "login" | "signup";
};

export default function HaveAccount({ mode }: HaveAccountProps) {
  return (
    <>
      {mode === "login" ? (
        <p className="have-account">
          Don't have an account?{" "}
          <a href="/signup">
            <span className="have-account-redirect">Sign up</span>
          </a>
        </p>
      ) : (
        <p className="have-account">
          Already have an account?{" "}
          <a href="/login">
            <span className="have-account-redirect">Log in</span>
          </a>
        </p>
      )}
    </>
  );
}
