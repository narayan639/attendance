"use client"
import { findMissingDates } from '@/app/findmissingdates/fun';
import Container_w_sidebar from '@/components/ui/Container_w_sidebar';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { MoveLeft } from 'lucide-react';


const Page = () => {
  const [email,setEmail]=useState("")
    const[totalatt,setTotalatt]=useState<string[]>([])
    const[totalpre,setTotalpre]=useState<string[]>([])
    const path=usePathname()
    const route=useRouter()

    const id=path.split("/").pop()

    const User_attendance = async () => {
        try {
          const res = await axios.post("/api/user/getuserbyid",  { id } );
          const dates=res.data?.user.attendance
          setEmail(res.data.user.email)
          setTotalpre(dates)
          const missdate= findMissingDates(dates)
          const allDates=[...dates,...missdate]
          const compareDates = (a: string, b: string): number => {
            return new Date(b).getTime() - new Date(a).getTime();
          };
          
          const sortdate=allDates.sort(compareDates);
          
          setTotalatt(sortdate)
        } catch (error) {
          console.log(error);
        }
      }

      useEffect(()=>{
        User_attendance()
    },[])
  return (
    <Container_w_sidebar title="user Details">
      <div className='my-2'>
        <Button onClick={()=>route.push("/admin/employeelist")} className='flex gap-2'><MoveLeft size={17}/> Back</Button>

      </div>

    <div>

<Table className="mt-4 border-t">
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">SN</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="font-semibold">status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {totalatt?.map((item, index: number) => (
            <TableRow key={index} className="border-none">
              <TableCell className="font-medium p-2">{index + 1}</TableCell>
              <TableCell className="font-medium p-2">{item}</TableCell>
              <TableCell className="font-medium p-2">{
                totalpre.includes(item)?
                <p className="bg-green-500 text-white p-2 rounded-md w-fit">Present</p>: <p className="bg-red-500 text-white p-2 rounded-md w-fit">Absent</p>
              }</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </Container_w_sidebar>

  )
}

export default Page