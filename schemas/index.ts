import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Enter valid email"
  }),
  password: z.string().min(1, {
    message: "Password required"
  }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required"
  }),
  email: z.string() .email({
    message: "Enter valid email"
  }),
  password: z.string().min(6, {
    message: "Minimum of 6 charachters required"
  }),
});
