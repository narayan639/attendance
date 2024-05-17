"use client";
import React ,{useContext, useEffect, useState} from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoveRight } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginSchema, LoginSchemaType } from "../schema/email.schema";
import Errors from "@/components/ui/errors";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import UserContext from "../context/userContext";

const Page = () => {
  const route = useRouter();
  const {setUser}=useContext(UserContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    try {
      const res = await axios.post("/api/user/login", data);
      if (res.data.success) {
        toast.success(res.data.message);
        const { email, userType } = res.data;
        setUser({ email, userType });
  
        // Persist user data in local storage
        localStorage.setItem("userData", JSON.stringify({ email, userType }));
      } else {
        toast.error(res.data.message);
      }
      // Redirect based on user type
      if (res.data.success && res.data.userType === true) {
        route.push("/admin");
      } else if (res.data.success && res.data.userType === false) {
        route.push("/employee");
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  

  return (
    <main className="bg-darkblue h-[100vh] flex items-center justify-center ">
      <Card className="w-[350px] bg-opacity-20 shadow-md backdrop-blur-md border-opacity-30 bg-zinc-100 border-none text-white">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  className="text-black"
                  id="email"
                  type="text"
                  {...register("email")}
                  placeholder="Eg: limbu@gmail.com"
                />
                {errors?.email?.message && (
                  <Errors err={errors?.email?.message} />
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">password</Label>
                <Input
                  className="text-black"
                  id="password"
                  {...register("password")}
                  type="password"
                />
                {errors?.password?.message && (
                  <Errors err={errors?.password?.message} />
                )}
              </div>
            </div>
            <Button className="bg-primary flex gap-2 items-center mt-4">
              Continue <MoveRight />
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default Page;
