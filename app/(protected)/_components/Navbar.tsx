'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import UserButton from '@/components/auth/UserButton';
import { Button } from '@/components/ui/Button';

function Navbar() {
  const pathName = usePathname();

  return (
    <nav className=" w-full max-w-[56.25rem] bg-secondary flex justify-between items-center p-4 rounded-xl shadow-md">
      <div className="flex gap-x-4">
        <Button variant={pathName === '/server' ? 'default' : 'outline'}>
          <Link href="/server">
            Server
          </Link>
        </Button>

        <Button variant={pathName === '/client' ? 'default' : 'outline'}>
          <Link href="/client">
            Client
          </Link>
        </Button>

        <Button variant={pathName === '/settings' ? 'default' : 'outline'}>
          <Link href="/settings">
            Settings
          </Link>
        </Button>
      </div>

      <UserButton />
    </nav>
  );
}

export default Navbar;
