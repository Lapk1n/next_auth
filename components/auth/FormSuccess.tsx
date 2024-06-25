import React from 'react';
import { CheckCircledIcon } from '@radix-ui/react-icons';

export const FormSuccess = ({ message }: { message?: string }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-2 text-sm text-destructive bg-emerald-500/15 p-3 rounded-md text-emerald-500">
      <CheckCircledIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
