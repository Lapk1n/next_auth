import { db } from "@/lib/db"

export const getTwoFactorTokenByToken = async (token: string) => {
    try {
        const twoFactorToken = await db.twoFactorToken.findUnique({
            where: { token }
        })

        return twoFactorToken;
    } catch (error) {
        return null
    }
}

export const getTwoFactorTokenByEmail = async (email: string) => {
    try {
        const twoFactorToken = await db.twoFactorToken.findMany({
            where: { email }
        })

        return twoFactorToken[twoFactorToken.length - 1];
    } catch (error) {
        return null
    }
}