"use client";
import Container_w_sidebar from "@/components/ui/Container_w_sidebar";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, SquarePen, Trash2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Add_emp_SchemaType,
  Add_employee_Schema,
} from "@/app/schema/email.schema";
import Errors from "@/components/ui/errors";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext } from "react";
import UserContext from "@/app/context/userContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { BiSolidUserDetail } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Iuser={
  email: string
  id: number
  verify: boolean
  attendance: string[]
}

const Page = () => {
  const [Employeelist, setEmployeelist] = useState<Iuser[]>([]);
  const [open, setOpen] = useState(false);
  const { user } = useContext(UserContext);
  const route=useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Add_emp_SchemaType>({
    resolver: zodResolver(Add_employee_Schema),
  });

  const call_employeelist = async () => {
    const res = await axios.get("/api/user/signup");
    setEmployeelist(res.data.user);
  };

  useEffect(() => {
    call_employeelist();
  }, []);

  const onSubmit: SubmitHandler<Add_emp_SchemaType> = async (data) => {
    try {
      const res = await axios.post("/api/user/signup", {
        ...data,
        current_user_email: user.email
          ? user?.email
          : "narayan9limbu@gmail.com",
      });
      if (res.data?.success === true) {
        setOpen(false);
        call_employeelist();
        toast.success(res.data?.message);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleDelete = async (email: string) => {
    try {
      const res = await axios.post("/api/user/deleteuser", {
        email,
        current_user_email: user?.email,
      });
      console.log(res);
      if (res.data?.success === true) {
        toast.success(res.data?.message);
        call_employeelist();
      } else {
        toast.error(res.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowmore=(id: number, attendance: string[])=>{
       if(attendance.length>0){
        route.push(`/admin/userdetail/${id}`)
       }else{
        toast.error("Not sufficient data.")
       }
  }


  return (
    <Container_w_sidebar title="Employee">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="flex items-center gap-1"
            onClick={() => setOpen(true)}
          >
            <Plus size={18} />
            Add Employee
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Employee Email</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[360px] flex flex-col gap-4 mt-5"
          >
            <div className="flex gap-2 flex-col">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                {...register("email")}
                type="text"
                placeholder="Eg: limbu@gmail.com"
              />
              {errors.email?.message && <Errors err={errors.email?.message} />}
            </div>
            <Button className="w-fit">Create Employee</Button>
          </form>
        </DialogContent>
      </Dialog>

      <Table className="mt-4 border-t">
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">SN</TableHead>
            <TableHead className="font-semibold">Email</TableHead>
            <TableHead className="font-semibold">Verify</TableHead>
            <TableHead className="font-semibold">Total Present Day</TableHead>
            <TableHead className="font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Employeelist?.map(
            (item: { email: string; id: number; verify: boolean, attendance:string[] }, index) => {
              const {attendance,email,verify,id}=item

            return(
              <TableRow key={index} className="border-none">
                <TableCell className="font-medium p-2">{index + 1}</TableCell>
                <TableCell className="font-medium p-2">{email}</TableCell>
                <TableCell className="font-medium p-2">
                  {verify ? (
                    <p className="p-2 rounded-lg bg-green-500 w-fit text-white">
                      True
                    </p>
                  ) : (
                    <p className="p-2 rounded-lg bg-red-500 w-fit text-white">
                      False
                    </p>
                  )}
                </TableCell>
                <TableCell className="font-medium p-2">{
                attendance.length>1 ?
                `${attendance.length} days` :
                attendance.length===0 ?
                attendance.length :
                attendance.length===1 ?
                `${attendance.length} day` : null
                
}
                </TableCell>

                <TableCell className="font-medium p-2 flex gap-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <span className="group relative">
                        <Trash2
                          size={35}
                          className="cursor-pointer border-[1px] hover:bg-secondary p-2 rounded-md text-[20px] text-ghost"
                        />

                        <p className="absolute top-[-15px] opacity-0 group-hover:opacity-100 transform duration-300 text-white px-1 bg-primary rounded-sm text-xs">
                          Delete
                        </p>
                      </span>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Do you want to Delete?
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(item?.email)}
                        >
                          Delete Employee
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <span className="group relative">
                    <SquarePen
                      size={35}
                      className="cursor-pointer border-[1px] hover:bg-secondary p-2 rounded-md text-[20px] text-ghost"
                    />

                    <p className="absolute top-[-15px] opacity-0 group-hover:opacity-100 transform duration-300 text-white px-1 bg-primary rounded-sm text-xs">
                      Update
                    </p>
                  </span>
                  <span onClick={()=>handleShowmore(id, attendance)}  className="group relative">
                    <BiSolidUserDetail
                      size={35}
                      className="cursor-pointer border-[1px] hover:bg-secondary p-2 rounded-md text-[20px] text-ghost"
                    />

                    <p className="absolute top-[-15px] opacity-0 group-hover:opacity-100 transform duration-300 text-white px-1 bg-primary rounded-sm text-xs">
                      Details
                    </p>
                  </span>
                </TableCell>
              </TableRow>
            )}
          )}
        </TableBody>
      </Table>
    </Container_w_sidebar>
  );
};

export default Page;
