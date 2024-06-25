'use client';

import { useRouter } from 'next/navigation';

import { Dialog, DialogContent, DialogTrigger } from '../ui/Dialog';

import LoginForm from './LoginForm';

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

export function LoginButton({ children, mode = 'redirect', asChild }:LoginButtonProps) {
  const router = useRouter();

  const onClick = () => {
    router.push('/login');
  };

  if (mode === 'modal') {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>
          {children}
        </DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="cursor-pointer" onClick={onClick}>
      {children}
    </div>
  );
}
