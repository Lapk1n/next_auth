import * as z from 'zod'

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, {
        message: "Password is required"
    })
})

export const ResetSchema = z.object({
    email: z.string().email(),
})

export const NewPasswordSchema = z.object({
    oldPassword: z.string().min(1, {
        message: "Password is required"
    }),
    newPassword: z.string().min(1, {
        message: "Password is required"
    }),
    confirmNewPassword: z.string().min(1, {
        message: "Password is required"
    }),
})

export const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {
        message: "Minimum 6 characters required"
    }),
    name: z.string().min(1, {
        message: "Name is required",
    }),
})