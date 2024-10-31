import { ReactNode } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { Toaster } from "sonner";
import { auth } from "@/auth";
import LoginForm from "@/components/auth/login-form";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN")
    return (
      <div className="flex flex-col justify-center items-center min-h-screen mx-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-400 to-green-800 py-6">
        <div className="max-w-[25rem] mb-6 rounded-md border-destructive text-destructive cursor-pointer text-center px-4 mx-8 font-bold bg-white opacity-80 hover:opacity-100 p-2">
          <div className="flex flex-wrap items-center justify-center text-center gap-1">
            <ExclamationTriangleIcon width={35} className="font-bold" />
            <h1 className="text-base">Only Admins can access dashboard.</h1>
          </div>
          <small className="text-xs text-destructive/90">
            If you registered and can't see admin dashboard it's because you
            are not an admin yet, request access.
          </small>
        </div>
        <LoginForm />
      </div>
    );
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 overflow-auto">{children}</main>
      <Toaster richColors duration={3000} />
    </div>
  );
}
