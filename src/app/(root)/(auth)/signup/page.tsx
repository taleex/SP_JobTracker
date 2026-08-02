import AuthRightContainer from "@/components/auth/authRightContainer/auth-right-container";

export const metadata = {
  title: "Create Account",
};

export default function SignUp() {
  return <AuthRightContainer mode="signup" />;
}
