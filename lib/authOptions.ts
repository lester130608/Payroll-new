import { DefaultSession } from "next-auth";
import { NextAuthOptions } from "next-auth"; 
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from "@supabase/supabase-js";

// ✅ Extendemos el tipo `Session` en NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      supervisor_code?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role?: string;
    supervisor_code?: string | null;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        const { data: user, error } = await supabase
          .from("users")
          .select("id, email, role, supervisor_code")
          .eq("email", credentials.email)
          .single();

        console.log("🔍 User Data from Supabase:", user);

        if (error || !user) {
          console.error("❌ Error fetching user:", error?.message);
          throw new Error("Invalid email or password");
        }

        return {
          id: String(user.id), 
          email: user.email,
          role: typeof user.role === "string" ? user.role : "employee",
          supervisor_code: typeof user.supervisor_code === "string" ? user.supervisor_code : null, // ✅ Validamos `supervisor_code`
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = String(user.id);
        token.role = typeof user.role === "string" ? user.role : "employee";
        token.supervisor_code = typeof user.supervisor_code === "string" ? user.supervisor_code : null; // ✅ Validamos `supervisor_code`
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: String(token.id),
          role: typeof token.role === "string" ? token.role : "employee",
          supervisor_code: typeof token.supervisor_code === "string" ? token.supervisor_code : null, // ✅ Validamos `supervisor_code`
        };
      }
      console.log("🟢 Session Data Sent:", session);
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};