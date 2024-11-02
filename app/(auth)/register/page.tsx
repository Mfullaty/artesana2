import { auth } from "@/auth";
import RegisterForm from "@/components/auth/register-form";

export default async function RegisterPage() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return <RegisterForm />;
  }
  return (
    <div className="flex items-center justify-center bg-white text-black h-max p-2 rounded-md">
      <p className="text-center text-primary">
        You are logged in, visit{" "}
        <a className="underline font-bold text-yellow-700" href="/admin">
          {" "}
          Dashboard
        </a>
      </p>
    </div>
  );
}
