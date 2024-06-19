"use server"

import { sendPasswordReset } from '@/lib/resend'
import { ResetSchema } from '@/schemas'
import { generateResetToken } from '@/utils/tokens'
import { getUserByEmail } from '@/utils/user'
import * as z from 'zod'

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid email!" }
    }

    const { email } = validatedFields.data
    const existingUser = await getUserByEmail(email)

    if (!existingUser) {
        return { error: "Email not found" }
    }

    if (!existingUser.password) {
        return { error: "Use Google or Github auth provider to reset your password" }
    }

    const resetToken = await generateResetToken(email)
    await sendPasswordReset(resetToken.email, resetToken.token)

    return { success: "Reset email sent!" }
}