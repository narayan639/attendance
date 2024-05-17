"use client";
import Container_w_sidebar from "@/components/ui/Container_w_sidebar";
import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../context/userContext";
import toast from "react-hot-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { findMissingDates } from "../findmissingdates/fun";
import WifiContext from "../context/wifiContext";

const Page = () => {
  const { user } = useContext(UserContext);
  const {bssid}=useContext(WifiContext)
  const[selectdate,setSelectDate]=useState("")
  const[totalatt,setTotalatt]=useState<string[]>([])
  const[totalpre,setTotalpre]=useState<string[]>([])


  const Date_piker = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const User_attendance = async () => {
    try {
      const res = await axios.post("/api/user/getuserbyemail",  { email: user?.email } );
      const dates=res.data?.user.attendance
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


  const get_Date = async () => {
    const tim = Date_piker();

    if(bssid){
      try {
        const res = await axios.put("/api/user/login", {
          email: user.email,
          date: selectdate? selectdate : tim,
          bssid
        });
        if(res.data.success===true){
          toast.success(res.data.message)
          User_attendance()
        }else{
          toast.error(res.data.message)
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }else{
      toast.error("neew wifi connectio!")

    }

  

  };

  useEffect(()=>{
      User_attendance()
  },[user])

  return (
    <Container_w_sidebar title="Dashboard">
      <div className="w-full flex items-center justify-between">

      <Button onClick={get_Date}>Attendance</Button>
      <input type="date" onChange={(e: any)=>setSelectDate(e.target.value)}/>
      </div>
      {
        totalpre.length>0 &&
      
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
}

    </Container_w_sidebar>
  );
};

export default Page;
