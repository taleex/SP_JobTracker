type HaveAccountProps = {
  mode: "login" | "signup";
};

export default function HaveAccount({ mode }: HaveAccountProps) {
  return (
    <>
      {mode === "login" ? (
        <p className="have-account">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      ) : (
        <p className="have-account">
          Already have an account? <a href="/login">Log in</a>
        </p>
      )}
    </>
  );
}
