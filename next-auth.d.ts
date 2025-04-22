import NextAuth, { type DefaultSession } from "next-auth";
import { UserRole } from "./lib/generated/prisma";

const ExtendedUser =
  DefaultSession["user"] &
  {
    role: UserRole,
  };

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
