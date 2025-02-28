import { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from "@supabase/supabase-js";

// 🔹 Extender el tipo de sesión de NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      supervisor_code?: string | null;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" }
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
          id: user.id,
          email: user.email,
          role: user.role || "employee", // ✅ Aseguramos que `role` siempre tenga un valor
          supervisor_code: user.supervisor_code || null
        };
      }
    })
  ],
  pages: {
    signIn: "/auth/login"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || "employee"; // ✅ Aseguramos que `role` siempre esté presente
        token.supervisor_code = user.supervisor_code || null;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          role: token.role || "employee", // ✅ Aseguramos que `session.user.role` tenga un valor correcto
          supervisor_code: token.supervisor_code || null
        };
      }
      console.log("🟢 Session Data Sent:", session);
      return session;
    }
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET
};