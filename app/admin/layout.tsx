import { ReactNode } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { Toaster } from "sonner";
import { auth } from "@/auth";
import LoginForm from "@/components/auth/login-form";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN")
    return (
      <div className="flex h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-400 to-green-800 py-6">
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
