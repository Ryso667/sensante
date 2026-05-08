import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

type UserRole = "ADMIN" | "AGENT";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      role: UserRole;
    };
  }

  interface User {
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role?: UserRole;
  }
}
