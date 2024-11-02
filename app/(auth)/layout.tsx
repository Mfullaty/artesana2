
import React, { ReactNode } from "react";
const AuthLayout = ({ children }: { children: ReactNode }) => {
  
  return (
    <div className="flex flex-col justify-center items-center min-h-screen mx-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-400 to-green-800">
      {children}
    </div>
  );
};

export default AuthLayout;
