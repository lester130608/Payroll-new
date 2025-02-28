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
        console.log("🔍 Credenciales recibidas:", credentials);

        if (!credentials?.email || !credentials?.password) {
          console.error("❌ Faltan credenciales.");
          throw new Error("Email and password are required");
        }

        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        console.log("🔗 Conectando con Supabase...");
        
        const { data: user, error } = await supabase
          .from("users")
          .select("id, email, role, supervisor_code")
          .eq("email", credentials.email)
          .single();

        console.log("🔍 Respuesta de Supabase:", { user, error });

        if (error || !user) {
          console.error("❌ Error al obtener usuario de Supabase:", error?.message);
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
        console.log("🔑 JWT generado para usuario:", user);
        token.id = String(user.id);
        token.role = typeof user.role === "string" ? user.role : "employee";
        token.supervisor_code = typeof user.supervisor_code === "string" ? user.supervisor_code : null;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: String(token.id),
          role: typeof token.role === "string" ? token.role : "employee",
          supervisor_code: typeof token.supervisor_code === "string" ? token.supervisor_code : null,
        };
      }
      console.log("🟢 Sesión generada:", session);
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};