'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import * as z from 'zod';

import { login } from '@/action/login';
import { Button } from '@/components/ui/Button';
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/Form';
import { LoginSchema } from '@/schemas';

import { Card, CardContent, CardHeader } from '../ui/Card';
import { Input } from '../ui/Input';

import FormError from './FormError';
import FormSuccess from './FormSuccess';
import Social from './Social';

const oAuthErrors = ['OAuthAccountNotLinked', 'OAuthCallbackError'];

function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const searchParams = useSearchParams();
  const searchParamsError = searchParams.get('error') || '';
  const oAuthError = oAuthErrors.includes(searchParamsError)
    ? 'A problem occured with OAuth provider. Try another one or use credentials' : '';

  const [show2FA, setShow2FA] = useState(false);
  const [isPending, setTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [disableSendAgain, setDisableSendAgain] = useState(true);

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('');
    setSuccess('');

    if (!disableSendAgain) {
      setDisableSendAgain(true);
    }

    setTransition(() => {
      login(values).then((data) => {
        if (data?.error) {
          setError(data.error);
        }

        if (data?.success) {
          form.reset();
          setSuccess(data.error);
        }

        if (data?.twoFactor) {
          setShow2FA(true);
        }
      }).catch(() => setError('Something went wrong'));
    });
  };

  useEffect(() => {
    if (show2FA && disableSendAgain) {
      setTimeout(() => {
        setDisableSendAgain(false);
      }, 60000);
    }
  }, [show2FA, disableSendAgain]);

  return (
    <Card className="w-[400px] shadow-md p-4">
      <CardHeader className="flex flex-col">
        <span className="font-semibold text-3xl text-center">
          🔐 Auth
        </span>

        <span className="text-gray-500 text-center">
          Welcome back
        </span>
      </CardHeader>

      <CardContent className="px-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              {show2FA && (
              <>
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmation code</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button disabled={disableSendAgain} variant="link" type="submit" className="text-center font-normal !no-underline p-0 !mt-1">
                  Did not get the code? Send again
                </Button>
              </>
              )}
              {!show2FA && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="john.doe@example.com"
                          type="email"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="********"
                          type="password"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button variant="link" className="text-center font-normal !no-underline p-0 !mt-1">
                  <Link href="/reset">Forgot password?</Link>
                </Button>
              </>
              )}

            </div>

            <FormError message={error || oAuthError} />

            <FormSuccess message={success} />

            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              {show2FA ? 'Confirm' : 'Login' }
            </Button>
          </form>
        </Form>
      </CardContent>

      <Social />

      <Button variant="link" className="text-center text-gray-500 w-full mt-4 !no-underline">
        <Link href="/register">Do not have an account?</Link>
      </Button>
    </Card>
  );
}

export default LoginForm;
