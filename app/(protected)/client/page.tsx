'use client';

import React from 'react';

import UserInfo from '@/components/UserInfo';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export default function ClientPage() {
  const user = useCurrentUser();

  return (
    <UserInfo label="🖥 Client component" user={user} />
  );
}
