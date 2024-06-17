import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from 'next-auth/providers/credentials'
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from './schemas'
import { getUserByEmail } from './utils/user';
import bcrypt from "bcryptjs"

export default { 
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }), 
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                const validateFields = LoginSchema.safeParse(credentials);
                
                if (validateFields.success) {
                    const { email, password } = validateFields.data;
                    const user = await getUserByEmail(email)

                    if (!user || !user.password) {
                        return null
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password)

                    if (!passwordsMatch) {
                        return null
                    }
                    
                    return user
                }

                return null
            }
        })
    ]
 } satisfies NextAuthConfig