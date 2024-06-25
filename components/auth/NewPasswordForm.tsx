'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import * as z from 'zod';

import { updatePassword } from '@/action/updatePassword';
import { Button } from '@/components/ui/Button';
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/Form';
import { NewPasswordSchema } from '@/schemas';

import { Card, CardContent, CardHeader } from '../ui/Card';
import { Input } from '../ui/Input';

import FormError from './FormError';
import FormSuccess from './FormSuccess';

function NewPasswordForm() {
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [isPending, setTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError('');
    setSuccess('');

    if (!token) {
      setError('Missing token');
      return;
    }

    const { oldPassword, newPassword, confirmNewPassword } = values;

    setTransition(() => {
      updatePassword(token, oldPassword, newPassword, confirmNewPassword)
        .then((data) => {
          setError(data?.error);
          setSuccess(data?.success);
        });
    });
  };

  return (
    <Card className="w-[400px] shadow-md p-4">
      <CardHeader className="flex flex-col">
        <span className="font-semibold text-3xl text-center">
          🔐 Auth
        </span>

        <span className="text-gray-500 text-center">
          Update your password
        </span>
      </CardHeader>

      <CardContent className="px-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Old password</FormLabel>
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

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New password</FormLabel>
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

              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm new password</FormLabel>
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
            </div>

            <FormError message={error} />

            <FormSuccess message={success} />

            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              Update password
            </Button>
          </form>
        </Form>
      </CardContent>

      <Button variant="link" className="text-center text-gray-500 w-full mt-4 !no-underline">
        <Link href="/login">Back to login</Link>
      </Button>
    </Card>
  );
}

export default NewPasswordForm;
