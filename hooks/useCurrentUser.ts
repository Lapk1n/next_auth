import { useSession } from 'next-auth/react';

export const useCurrentUser = () => {
  const session = useSession();

  if (session.status === 'unauthenticated') {
    session.update();
  }

  return session.data?.user;
};
