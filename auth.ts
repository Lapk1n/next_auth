import { PrismaAdapter } from '@auth/prisma-adapter';
import { UserRole } from '@prisma/client';
import NextAuth, { DefaultSession } from 'next-auth';

import { db } from './lib/db';
import { getAccountByUserId } from './utils/account';
import { getUserById } from './utils/user';
import authConfig from './auth.config';

export type ExtendedUser = DefaultSession['user'] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}

export const {
  auth, handlers, signIn, signOut,
} = NextAuth({
  pages: {
    signIn: '/login',
    error: '/error',
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without verification
      if (account?.access_token) {
        return true;
      }

      const existingUser = await getUserById(user.id || '');

      // Block credentials auth without verification
      if (!existingUser || !existingUser.emailVerified) {
        return false;
      }

      return true;
    },
    async session({ token, session }) {
      if (!token.sub) {
        return session;
      }

      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        return session;
      }

      if (existingUser.role && session.user) {
        session.user.role = existingUser.role;
      }

      session.user.name = existingUser.name;
      session.user.email = existingUser.email;
      session.user.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      const existingAccount = await getAccountByUserId(existingUser.id);

      if (existingAccount) {
        session.user.isOAuth = !!existingAccount;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }
      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        return token;
      }

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
