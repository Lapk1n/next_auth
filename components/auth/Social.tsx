'use client';

import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/Button';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export const Social = () => {
  const handleClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="w-full flex items-center justify-center gap-x-8 mt-4">
      <Button size="lg" variant="outline" className="w-full" onClick={() => handleClick('google')}>
        <FcGoogle className="scale-150" />
      </Button>

      <Button size="lg" variant="outline" className="w-full" onClick={() => handleClick('github')}>
        <FaGithub className="scale-150" />
      </Button>
    </div>
  );
};
