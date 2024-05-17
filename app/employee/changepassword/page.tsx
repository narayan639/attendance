"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import Errors from "@/components/ui/errors";
import { changepasswordSchema, changepassword_SchemaType } from "@/app/schema/changepassword.schema";
import Container_w_sidebar from "@/components/ui/Container_w_sidebar";
import axios from "axios";
import toast from "react-hot-toast";
import UserContext from "@/app/context/userContext";

const Page = () => {
    const {user}=useContext(UserContext)
  const [currentVisible, setCurrentVisible] = useState(false);
  const [newVisible, setNewVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<changepassword_SchemaType>({
    resolver: zodResolver(changepasswordSchema),
  });

  const onSubmit: SubmitHandler<changepassword_SchemaType> = async(data) =>{
    try {
        const res=await axios.post("/api/user/changepassword", {...data, email: user.email})
        if(res?.data.success===true){
            toast.success(res.data?.message)
        }else{
            toast.error(res.data?.message)
        }
    } catch (error: any) {
        console.log(error.message)
    }
  }
   
  return (
    <div>
      <Container_w_sidebar title="Change password">
        

        <div className="w-full sm:2-[50%] md:w-[40%] lg:w-[35%] pt-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex gap-4 flex-col"
          >
            <div className="flex gap-2 flex-col relative">
              <Label htmlFor="current_password">Current Password</Label>
              <Input
                type={currentVisible ? "text" : "password"}
                {...register("password")}
              />
              {currentVisible ? (
                <Eye
                  size={20}
                  className="absolute right-2 top-8 cursor-pointer"
                  onClick={() => setCurrentVisible(!currentVisible)}
                />
              ) : (
                <EyeOff
                  size={20}
                  className="absolute right-2 top-8 cursor-pointer"
                  onClick={() => setCurrentVisible(!currentVisible)}
                />
              )}
              {
                errors.password?.message &&
              <Errors err={errors.password?.message} />
              }
            </div>
            <div className="flex gap-2 flex-col relative">
              <Label htmlFor="new_password">New Password</Label>
              <Input
                type={newVisible ? "text" : "password"}
                {...register("new_password")}
              />
              {newVisible ? (
                <Eye
                  size={20}
                  className="absolute right-2 top-8 cursor-pointer"
                  onClick={() => setNewVisible(!newVisible)}
                />
              ) : (
                <EyeOff
                  size={20}
                  className="absolute right-2 top-8 cursor-pointer"
                  onClick={() => setNewVisible(!newVisible)}
                />
              )}
              {
                errors.new_password?.message &&
              <Errors err={errors.new_password?.message} />
              }
            </div>
            <div className="flex gap-2 flex-col relative">
              <Label htmlFor="confirm_password">Confirm Password</Label>
              <Input
                type={confirmVisible ? "text" : "password"}
                {...register("confirm_password")}
              />
              {confirmVisible ? (
                <Eye
                  size={20}
                  className="absolute right-2 top-8 cursor-pointer"
                  onClick={() => setConfirmVisible(!confirmVisible)}
                />
              ) : (
                <EyeOff
                  size={20}
                  className="absolute right-2 top-8 cursor-pointer"
                  onClick={() => setConfirmVisible(!confirmVisible)}
                />
              )}
              {
                errors.confirm_password?.message &&
              <Errors err={errors.confirm_password?.message} />
              }
            </div>
            <Button type="submit" className="w-fit">
              save change
            </Button>
          </form>
        </div>
      </Container_w_sidebar>
    </div>
  );
};

export default Page;