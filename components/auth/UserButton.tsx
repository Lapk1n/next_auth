'use client';

import { FaUser } from 'react-icons/fa';
import { AvatarImage } from '@radix-ui/react-avatar';
import { ExitIcon } from '@radix-ui/react-icons';

import { useCurrentUser } from '@/hooks/useCurrentUser';

import { Avatar, AvatarFallback } from '../ui/Avatar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '../ui/DropdownMenu';

import { LogoutButton } from './LogoutButton';

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <Avatar>
          <AvatarImage src={user?.image || ''} />
          <AvatarFallback className="bg-sky-600">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 p-0" align="end">
        <LogoutButton>
          <DropdownMenuItem className="p-2">
            <ExitIcon className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
