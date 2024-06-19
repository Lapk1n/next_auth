"use server"

import { RegisterSchema } from '@/schemas';
import * as z from 'zod';
import bcrypt from 'bcrypt'
import { db } from '@/lib/db';
import { getUserByEmail } from '@/utils/user';
import { generateVerificationToken } from '@/utils/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: 'Invalid fields' }
    }

    const { email, password, name, enable2FA } = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return { error: 'Email is already in use!'}
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.user.create({
        data: { name, email, password: hashedPassword, isTwoFactorEnabled: enable2FA }
    })

    const verificationToken = await generateVerificationToken(email)

    await sendVerificationEmail(email, verificationToken.token)
    
    return { success: 'Confirmation email sent!' }
}