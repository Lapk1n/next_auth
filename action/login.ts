'use server';

import { AuthError } from 'next-auth';
import * as z from 'zod';

import { signIn } from '@/auth';
import { db } from '@/lib/db';
import { sendTwoFactorTokenEmail, sendVerificationEmail } from '@/lib/mail';
import { LoginSchema } from '@/schemas';
import { generateTwoFactorToken, generateVerificationToken } from '@/utils/tokens';
import { getTwoFactorTokenByEmail } from '@/utils/two-factor-token';
import { getUserByEmail } from '@/utils/user';

import { DEFAULT_LOGIN_REDIRECT } from '../routes';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  const { email, password, code } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Invalid credentials' };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(email, verificationToken.token);

    return { success: 'Confirmation email sent!' };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: 'Invalid code' };
      }

      if (twoFactorToken.token !== code) {
        return { error: 'Invalid code' };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: 'Code expired' };
      }

      await db.twoFactorToken.deleteMany({
        where: { email: twoFactorToken.email },
      });
    } else {
      const twofactorToken = await generateTwoFactorToken(email);
      await sendTwoFactorTokenEmail(twofactorToken.email, twofactorToken.token);

      // notify the view to change the form
      return { twoFactor: true };
    }
  }

  try {
    await signIn('credentials', { email, password, redirectTo: DEFAULT_LOGIN_REDIRECT });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' };
        case 'CallbackRouteError':
          return { error: 'Invalid credentials' };
        default:
          return { error: 'Something went wrong' };
      }
    }

    throw error;
  }
};
