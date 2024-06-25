'use client';

import {
  useCallback, useState, useTransition,
} from 'react';
import { BeatLoader } from 'react-spinners';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { verification } from '@/action/verification';
import { useEffectOnMount } from '@/hooks/useEffectOnMount';

import { Button } from '../ui/Button';
import { Card, CardFooter, CardHeader } from '../ui/Card';

import FormError from './FormError';
import FormSuccess from './FormSuccess';

function VerificationForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isPending, setTransition] = useTransition();

  const onSubmit = useCallback(async () => {
    if (success || error) {
      return;
    }

    if (!token) {
      setError('Missing token');
      return;
    }

    setTransition(() => {
      verification(token).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  }, [token, success, error]);

  useEffectOnMount(onSubmit, onSubmit);

  return (
    <Card className="w-[400px] flex flex-col items-center shadow-md">
      <CardHeader className="flex flex-col">
        <span className="font-semibold text-3xl text-center">
          🔐 Auth
        </span>

        <span className="text-gray-500 text-center">Confirm your verification</span>
      </CardHeader>

      {isPending && !success && !error && <BeatLoader />}

      {error && !isPending && !success && <FormError message={error} />}
      {success && !isPending && !error && <FormSuccess message={success} />}

      <CardFooter className="mt-4">
        <Button disabled={isPending} variant="link" className="text-center text-gray-500 w-full !no-underline">
          <Link href="/login">Back to login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default VerificationForm;
