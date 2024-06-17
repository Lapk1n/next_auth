import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/Button'
import React from 'react'

const page = async () => {
  const session = await auth()

  const handleLogOut = async () => {
    "use server"

    await signOut({ redirectTo: '/login'} )
  }

  return (
    <div className='flex flex-col items-center'>
      {JSON.stringify(session)}

      <form action={handleLogOut}>
        <Button type="submit" className='mt-4'>Sign out</Button>
      </form>
    </div>
  )
}

export default page