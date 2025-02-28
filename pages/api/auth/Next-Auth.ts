import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error("❌ Error: Credenciales faltantes");
          throw new Error("Missing credentials");
        }

        try {
          const res = await fetch(process.env.NEXT_PUBLIC_API_AUTH_URL || "https://api.example.com/auth/login", {
            method: "POST",
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            headers: { "Content-Type": "application/json" }
          });

          if (!res.ok) {
            const errorResponse = await res.json();
            console.error("❌ Error en autenticación:", errorResponse);
            throw new Error(errorResponse.message || "Invalid credentials");
          }

          const user = await res.json();
          return user;
        } catch (error) {
          console.error("❌ Error en autorización:", error);
          throw new Error("Authentication failed");
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/login", // Redirección en caso de fallo
  }
});