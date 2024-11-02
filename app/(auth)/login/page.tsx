import { auth } from "@/auth";
import LoginForm from "@/components/auth/login-form";

export default async function LoginPage() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return <LoginForm />;
  }
  return (
    <div className="flex items-center justify-center bg-white text-black h-max p-2 rounded-md">
      <p className="text-center text-primary">
      You are logged in, visit <a className="underline font-bold text-yellow-700" href="/admin"> Dashboard</a>
      </p>
    </div>
  );
}
