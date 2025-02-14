import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { supabase } from '../../../lib/supabaseClient';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        const { user, error } = await supabase.auth.signIn({ email, password });
        if (user) {
          return { id: user.id, email: user.email };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(session, token) {
      session.user.id = token.id;
      return session;
    },
  },
});