'use server';

import bcrypt from 'bcryptjs';
import * as z from 'zod';

import { db } from '@/lib/db';
import { currentUser } from '@/lib/user';
import { SettingsSchema } from '@/schemas';
import { getUserByEmail } from '@/utils/user';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user || !user.email) {
    return { error: 'Unauthorized!' };
  }

  const dbUser = await getUserByEmail(user.email);

  if (!dbUser) {
    return { error: 'Unauthorized!' };
  }

  if (user.isOAuth) {
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(values.password, dbUser.password);

    if (!passwordsMatch) {
      return { error: 'Incorrect password' };
    }

    const hashedNewPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedNewPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: { ...values },
  });

  return { success: 'Settings were updated' };
};
