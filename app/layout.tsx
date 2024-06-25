import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';

import { auth } from '@/auth';

import './globals.css';

const font = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Next Auth',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={font.className}>{children}</body>
      </html>
    </SessionProvider>

  );
}
