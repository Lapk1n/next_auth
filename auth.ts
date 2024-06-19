import NextAuth, { DefaultSession } from "next-auth"
import authConfig from "./auth.config"
import { db } from "./lib/db"
import { PrismaAdapter } from '@auth/prisma-adapter'
import { getUserById } from "./utils/user"
import { UserRole } from "@prisma/client"
import { getTwoFactorConfirmationByUserId } from "./utils/two-factor-confirmation"

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole
    } & DefaultSession["user"]
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without verification
      if (account?.access_token) {
        return true
      }

      const existingUser = await getUserById(user.id || '')
      
      // Block credentials auth without verification
      if (!existingUser || !existingUser.emailVerified) {
        return false
      }

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

        if (!twoFactorConfirmation) {
          return false
        }

        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id }
        })
      }

      return true
    },
    async session({ token, session }) {
      if (!token.sub) {
        return session
      }

      const existingUser = await getUserById(token.sub)

      if (!existingUser) {
        return session
      }

      if (existingUser.role && session.user) {
        session.user.role = existingUser.role
      }
      
      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})