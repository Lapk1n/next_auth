"use client"

import { settings } from '@/action/settings'
import FormError from '@/components/auth/FormError'
import FormSuccess from '@/components/auth/FormSuccess'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { Switch } from '@/components/ui/Switch'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { SettingsSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { BeatLoader } from 'react-spinners'
import * as z from 'zod'

const SettingsPage = () => {
  const [ isPending, startTransition ] = useTransition()
  const [ error, setError ] = useState<string | undefined>()
  const [ success, setSuccess ] = useState<string | undefined>()
  const { update } = useSession()
  const user = useCurrentUser()
  const hideFieldsForOAuthLogin = user?.isOAuth
  console.log(user);
  
  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values).then(data => {
        if (data.error) {
          setError(data.error)
        }

        if (data.success) {
          setSuccess(data.success)
          update()
        }
      }).catch(() => setError("Something went wrong"))
    })
  }

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      password: undefined,
      newPassword: undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled,
    }
  })

  return (
    <Card className="w-full max-w-[44.7rem] shadow-md">
      <CardHeader>
        <p className="text-xl font-semibold text-center">⚙️ Settings</p>
        {/* Add a tooltip that notify user about extended settings for credentials login */}
      </CardHeader>

      <CardContent className="flex flex-col items-start gap-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-2'>
              <FormField 
                control={form.control} 
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='John Doe' disabled={isPending}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!hideFieldsForOAuthLogin && (
                <>
                  <FormField 
                    control={form.control} 
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='********' type="password" disabled={isPending}/>
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
                          <Input {...field} placeholder='********' type="password" disabled={isPending}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField 
                    control={form.control} 
                    name="isTwoFactorEnabled"
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                        <div className='space-y-0.5 mr-8'>
                          <FormLabel>Two factor authentification</FormLabel>
                          <FormDescription>
                            Enable two factor authentication for your account
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch disabled={isPending} checked={field.value} onCheckedChange={field.onChange}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

            </div>
            <FormError message={error}/>

            <FormSuccess message={success}/>

            <Button type="submit" disabled={isPending}>Save</Button>
          </form>
        </Form>


        {isPending && !success && !error && <BeatLoader />}
      </CardContent>
    </Card>
  )
}

export default SettingsPage