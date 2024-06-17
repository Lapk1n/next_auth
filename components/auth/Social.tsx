import React from 'react'
import { Button } from '@/components/ui/Button';
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

const Social = () => {
  return (
    <div className='w-full flex items-center justify-center gap-x-8 mt-4'>
        <Button size='lg' variant='outline' className='w-full'>
            <FcGoogle className='scale-150'/>
        </Button>

        <Button size='lg' variant='outline' className='w-full'>
            <FaGithub className='scale-150'/>
        </Button>
    </div>
  )
}

export default Social