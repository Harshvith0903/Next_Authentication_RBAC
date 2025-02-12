import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  // ✅ Extend the User object to include role
  interface User {
    id: string;
    username: string;
    email: string;
    role: string;
  }

  // ✅ Extend the Session object to include the role
  interface Session extends DefaultSession {
    user: User & DefaultSession["user"];
  }

  // ✅ Extend JWT to store role in token
  interface JWT {
    id: string;
    username: string;
    email: string;
    role: string;
  }
}
