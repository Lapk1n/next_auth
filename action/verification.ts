'use server';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/utils/user';
import { getVerificationTokenByToken } from '@/utils/verification-token';

export const verification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: 'Token does not exist' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: 'Token has expired' };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: 'User does not exist' };
  }

  await db.user.update({
    where: { email: existingToken.email },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: 'Email has been verified' };
};
