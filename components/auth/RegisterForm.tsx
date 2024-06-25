'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import * as z from 'zod';

import { register } from '@/action/register';
import { Button } from '@/components/ui/Button';
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/Form';
import { RegisterSchema } from '@/schemas';

import { Card, CardContent, CardHeader } from '../ui/Card';
import { Checkbox } from '../ui/Checkbox';
import { Input } from '../ui/Input';

import { FormError } from './FormError';
import { FormSuccess } from './FormSuccess';
import { Social } from './Social';

export const RegisterForm = () => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      enable2FA: false,
    },
  });

  const [isPending, setTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError('');
    setSuccess('');

    setTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
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
          Create an account
        </span>
      </CardHeader>

      <CardContent className="px-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="John Doe"
                        type="text"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <FormField
                control={form.control}
                name="enable2FA"
                render={({ field }) => (
                  <FormItem className="flex items-center pt-1.5">
                    <FormControl>
                      <Checkbox
                        disabled={isPending}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>

                    <FormLabel className="!m-0 !ml-2">Enable two factor authentication</FormLabel>

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
              Sign up
            </Button>
          </form>
        </Form>
      </CardContent>

      <Social />

      <Button variant="link" className="text-center text-gray-500 w-full mt-4 !no-underline">
        <Link href="/login">Already have an account?</Link>
      </Button>
    </Card>
  );
};
