import { v4 as uuid } from "uuid"
import { getVerificationTokenByEmail } from "./verification-token"
import { db } from "@/lib/db"
import { getResetTokenByEmail } from "./reset-token"
import crypto from 'crypto'

export const generateVerificationToken = async (email: string) => {
    const token = uuid()
    const expires = new Date(new Date().getTime() + 3600 * 1000)
    
    const existingToken = await getVerificationTokenByEmail(email)

    if (existingToken) {
        await db.verificationToken.delete({
            where: { id: existingToken.id }
        })
    }

    const verificationToken = await db.verificationToken.create({
        data: { email, token, expires }
    })

    return verificationToken
}

export const generateResetToken = async (email: string) => {
    const token = uuid()
    const expires = new Date(new Date().getTime() + 600 * 1000)
    
    const existingToken = await getResetTokenByEmail(email)

    if (existingToken) {
        await db.resetToken.delete({
            where: { id: existingToken.id }
        })
    }

    const verificationToken = await db.resetToken.create({
        data: { email, token, expires }
    })

    return verificationToken
}

export const generateTwoFactorToken = async (email: string) => {
    const token = crypto.randomInt(100_000, 1_000_000).toString()
    const expires = new Date(new Date().getTime() + 600 * 1000)
    
    const existingToken = await getResetTokenByEmail(email)

    if (existingToken) {
        await db.twoFactorToken.delete({
            where: { id: existingToken.id }
        })
    }

    const twoFactorToken = await db.twoFactorToken.create({
        data: { email, token, expires }
    })

    return twoFactorToken
}