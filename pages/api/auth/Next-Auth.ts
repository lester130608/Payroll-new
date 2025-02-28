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
        try {
          const res = await fetch("https://api.example.com/auth/login", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          });

          if (!res.ok) throw new Error("Invalid credentials");

          const user = await res.json();
          return user;
        } catch (error) {
          console.error("❌ Error en autorización:", error);
          return null;
        }
      }
    })
  ]
});