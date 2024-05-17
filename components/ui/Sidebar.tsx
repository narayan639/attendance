"use client";
import React, { useState } from "react";
import { LayoutDashboard } from "lucide-react";
import { SquarePlus } from "lucide-react";
import Menu_card from "./menu_card";
import { LogOut } from "lucide-react";
import { Button } from "./button";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Sidemenu_admin = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    link: "/admin",
  },
  {
    title: "Employee",
    icon: SquarePlus,
    link: "/admin/employeelist",
  },
];
const Sidemenu_employee = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    link: "/employee",
  },
  {
    title: "profile",
    icon: SquarePlus,
    link: "/employee/profile",
  },
];

const Sidebar = () => {
  const path = usePathname();
  const route = useRouter();

  const handlelog_out = async () => {
    try {
      const res = await axios.get("/api/user/logout");
      route.push("/login");
      toast.success(res.data.message);
    } catch (error: any) {
      console.log("can't log out!");
    }
  };
  return (
    <div className="md:w-[200px] lg:w-[250px] bg-secondary border-r sticky top-0 h-screen">
      <div className="w-full h-[70px] flex items-center justify-center bg-blue  text-white text-[1.5rem] border-b">
        <h1 className="font-semibold uppercase">Attendance</h1>
      </div>
      <div className="w-full p-2 flex flex-col gap-1">
        {path.startsWith("/admin") &&
          Sidemenu_admin?.map((item, index) => {
            const { title, icon, link } = item;
            return (
              <Menu_card key={index} icon={icon} link={link} title={title} />
            );
          })}
        {path.startsWith("/employee") &&
          Sidemenu_employee?.map((item, index) => {
            const { title, icon, link } = item;
            return (
              <Menu_card key={index} icon={icon} link={link} title={title} />
            );
          })}
        <div className="w-full absolute left-0 bottom-3 px-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-2 w-full">
                <p>Log out</p>
                <LogOut size={18} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Do you want to Logout?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handlelog_out}>Log Out</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </div>
      </div>
    </div>
  );
};

export default Sidebar;
