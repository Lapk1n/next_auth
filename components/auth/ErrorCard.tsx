import React from 'react';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import { Button } from '../ui/Button';
import { Card, CardFooter, CardHeader } from '../ui/Card';

export const ErrorCard = () => (
  <Card className="w-[400px] shadow-md">
    <CardHeader className="flex flex-col gap-y-4">
      <span className="font-semibold text-3xl text-center">
        🔐 Auth
      </span>

      <div className="flex items-center justify-center text-center">
        <ExclamationTriangleIcon className="mr-2 scale-125 text-destructive" />
        <span>Oops! Something went wrong</span>
      </div>
    </CardHeader>
    <CardFooter>
      <Button variant="link" className="text-center text-gray-500 w-full !no-underline">
        <Link href="/login">Back to login</Link>
      </Button>
    </CardFooter>
  </Card>
);
