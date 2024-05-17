"use client"
import Container_w_sidebar from '@/components/ui/Container_w_sidebar'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const Page = () => {
  const route=useRouter()
  return (
    <Container_w_sidebar title='Dashboard'>
        <Button onClick={()=>route.push("/admin/changepassword")}>Change password</Button>
    </Container_w_sidebar>
  )
}

export default Page