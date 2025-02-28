import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    providers: [
      Providers.Credentials({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (credentials?.username === "admin" && credentials?.password === "password") {
            return { id: "1", name: "Admin User" };
          }
          return null;
        },
      }),
    ],
  });
}