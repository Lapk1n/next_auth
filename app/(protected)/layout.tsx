import React from 'react';

import { Navbar } from './_components/Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-full w-full flex flex-col gap-x-10 items-center justify-start gap-y-4 pt-8 bg-gradient-to-b from-sky-400 to-blue-800">
      <Navbar />
      {children}
    </div>
  );
}
