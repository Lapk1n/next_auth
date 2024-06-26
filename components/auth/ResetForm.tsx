'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import * as z from 'zod';

import { reset } from '@/action/reset';
import { Button } from '@/components/ui/Button';
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/Form';
import { ResetSchema } from '@/schemas';

import { Card, CardContent, CardHeader } from '../ui/Card';
import { Input } from '../ui/Input';

import { FormError } from './FormError';
import { FormSuccess } from './FormSuccess';

export const ResetForm = () => {
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: { email: '' },
  });

  const [isPending, setTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError('');
    setSuccess('');

    setTransition(() => {
      reset(values).then((data) => {
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

        <span className="text-gray-500 text-center text-sm">
          Forgot your password?
        </span>
      </CardHeader>

      <CardContent className="px-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
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
            </div>

            <FormError message={error} />

            <FormSuccess message={success} />

            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              Reset password
            </Button>
          </form>
        </Form>
      </CardContent>

      <Button variant="link" className="text-center text-gray-500 w-full !no-underline">
        <Link href="/login">Back to login</Link>
      </Button>
    </Card>
  );
};
