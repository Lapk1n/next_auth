import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
  enable2FA: z.optional(z.boolean()),
  code: z.optional(z.string()),
});

export const ResetSchema = z.object({
  email: z.string().email(),
});

export const NewPasswordSchema = z.object({
  oldPassword: z.string().min(1, {
    message: 'Password is required',
  }),
  newPassword: z.string().min(1, {
    message: 'Password is required',
  }),
  confirmNewPassword: z.string().min(1, {
    message: 'Password is required',
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'Minimum 6 characters required',
  }),
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  enable2FA: z.optional(z.boolean()),
});

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
}).refine((data) => {
  if (data.password && !data.newPassword) {
    return false;
  }

  return true;
}, {
  message: 'New password is required',
  path: ['newPassword'],
}).refine((data) => {
  if (!data.password && data.newPassword) {
    return false;
  }

  return true;
}, {
  message: 'Password is required',
  path: ['password'],
});
