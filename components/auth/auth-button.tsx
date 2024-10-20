"use cleint";

import { useRouter } from "next/navigation";

interface AuthButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  route?: "/login" | "/register";
  asChild?: boolean;
}

const AuthButton = ({
  children,
  mode = "redirect",
  route = "/login",
  asChild,
}: AuthButtonProps) => {

    const router = useRouter();

  const onClick = () => {
    router.push(route)
  };

  if (mode === "modal") {
    return <span>Todo: Implement Modal here</span>;
  }
  return (

    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default AuthButton;
