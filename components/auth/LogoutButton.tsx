'use client';

import { logout } from '@/action/logout';

interface LogoutButtonProps {
  children: React.ReactNode;
}

export function LogoutButton({ children }: LogoutButtonProps) {
  const onClick = () => logout();

  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
}
