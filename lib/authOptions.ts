import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "./supabaseClient";

export const authOptions: NextAuthConfig = {
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials?.email!,
          password: credentials?.password!,
        });

        if (error || !data.user) {
          throw new Error(error?.message || "Invalid credentials");
        }

        return {
          id: data.user.id,
          email: data.user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt", // 🟢 ¡Esto es clave!
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};
