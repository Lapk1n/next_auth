import NextAuth, { DefaultSession } from "next-auth"
import authConfig from "./auth.config"
import { db } from "./lib/db"
import { PrismaAdapter } from '@auth/prisma-adapter'
import { getUserById } from "./utils/user"
import { UserRole } from "@prisma/client"

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole
    } & DefaultSession["user"]
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async signIn({ user, account }) {
      if (account?.access_token) {
        return true
      }

      const existingUser = await getUserById(user.id || '')
      
      if (!existingUser || !existingUser.emailVerified) {
        return false
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