'use client';

import React from 'react';

import UserInfo from '@/components/UserInfo';
import { useCurrentUser } from '@/hooks/useCurrentUser';

function ClientPage() {
  const user = useCurrentUser();

  return (
    <UserInfo label="🖥 Client component" user={user} />
  );
}

export default ClientPage;
