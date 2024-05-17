"use client"
import Container_w_sidebar from '@/components/ui/Container_w_sidebar'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const Page = () => {
  const route=useRouter()
  return (
    <Container_w_sidebar>
        <div className='h-[300px] w-full rounded-lg bg-secondary p-8 relative'>
         <Button onClick={()=>route.push("/employee/changepassword")}>Change password</Button>
        </div>
    </Container_w_sidebar>
  )
}

export default Page