"use server"

import { db } from "@/lib/db"
import { getResetTokenByToken } from "@/utils/reset-token"
import { getUserByEmail } from "@/utils/user"
import bcrypt from "bcryptjs"

export const updatePassword = async (token: string, oldPassword: string, newPassword: string, confirmNewPassword: string) => {
    if (newPassword !== confirmNewPassword) {
        return { error: "Passwords does not match" }
    }

    const existingToken = await getResetTokenByToken(token)

    if (!existingToken) {
        return { error: "Token does not exist" }
    }

    const hasExpired = new Date(existingToken.expires) < new Date()

    if (hasExpired) {
        return { error: "Token has expired" }
    }

    const existingUser = await getUserByEmail(existingToken.email)

    if (!existingUser) {
        return { error: "User does not exist" }
    }

    if (!existingUser.password) {
        return { error: "Use Google or Github auth provider to reset your password" }
    }

    const passwordsMatch = await bcrypt.compare(oldPassword, existingUser.password)

    if (!passwordsMatch) {
        return { error: "Old password is incorrect" }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    
    await db.user.update({
        where: { email: existingToken.email },
        data: { password: hashedPassword }
    })

    await db.resetToken.delete({
        where: { id: existingToken.id }
    })

    return { success: "Password has been changed" }
}