"use client"
import React from 'react'
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from 'next/navigation';


interface Iprop{
    title?: string
    icon:LucideIcon
    link: string
}
const Menu_card:React.FC<Iprop> = ({title,icon: Icon,link}) => {
    const route=useRouter()
    const currpath = usePathname()
  return (
    <div onClick={()=>route.push(`${link}`)} className={`flex font-normal items-center gap-2 w-full py-3 px-6 cursor-pointer ${currpath===link? "bg-darkblue text-white":"hover:bg-blue hover:text-white transform duration-300 ease-in "} rounded-lg`}>
    <span><Icon size={18}/></span>
    <p>{title}</p>
</div>
  )
}

export default Menu_card