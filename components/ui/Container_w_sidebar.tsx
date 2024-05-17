"use client"
import React from 'react'
import Sidebar from './Sidebar';
import { Mail } from 'lucide-react';
import { useContext } from 'react';
import UserContext from '@/app/context/userContext';



const Container_w_sidebar = ({
    children,
    title
  }: Readonly<{
    children: React.ReactNode;
    title?: string
  }>) => {
    const {user}=useContext(UserContext)

  return (
    <div className='h-[100vh] w-full flex'>
      <div className=''>
        <Sidebar/>
      </div>
        <div className='w-full'>
        <div className='h-[70px] w-full bg-secondary flex items-center justify-between px-4'>
        <h1 className="font-medium text-[20px]">{title}</h1>
          <div className='bg-primary text-white font-medium rounded-md py-2 px-4 flex items-center justify-center gap-2'><Mail size={18}/>{user?.email}</div>
        </div>
        <div className='p-4'>{children}</div>
        </div>
    </div>
  )
}

export default Container_w_sidebar