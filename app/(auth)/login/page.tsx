"use client";

import LoginForm from "@/components/auth/login-form";

// import { useState } from "react";

// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import AuthButton from "@/components/auth/auth-button";
// import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     const result = await signIn("credentials", {
//       redirect: false,
//       email,
//       password,
//     });

//     if (result?.error) {
//       setError("Invalid email or password");
//     } else {
//       router.push("/admin");
//     }
//   };

  return (
    // <Card className="w-full max-w-md">
    //   <CardHeader>
    //     <CardTitle>Login</CardTitle>
    //     <CardDescription>
    //       Enter your credentials to access the admin dashboard
    //     </CardDescription>
    //   </CardHeader>
    //   <CardContent>
    //     {error && (
    //       <Alert variant="destructive" className="mb-4">
    //         <AlertDescription>{error}</AlertDescription>
    //       </Alert>
    //     )}
    //     <form onSubmit={handleSubmit} className="space-y-4">
    //       <div>
    //         <Label htmlFor="email">Email</Label>
    //         <Input
    //           id="email"
    //           type="email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div>
    //         <Label htmlFor="password">Password</Label>
    //         <Input
    //           id="password"
    //           type="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div className="text-right">Not Registered? <AuthButton route="/register"><span className="text-primary font-bold text-sm">REGISTER</span></AuthButton></div>
    //       <Button type="submit" className="w-full">
    //         Login
    //       </Button>
    //     </form>
    //   </CardContent>
    // </Card>
    <LoginForm />
  );
}
