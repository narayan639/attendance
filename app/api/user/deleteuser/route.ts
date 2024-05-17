import { connect } from "@/dbconfig/dbconfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

interface Iprop {
    email: string;
    current_user_email: string;
  }
  
export async function POST(req: NextRequest) {
    try {
        const reqBody: Iprop = await req.json();
        const { email, current_user_email } = reqBody;
    
        const curr_user = await User.findOne({ email: current_user_email });
    
        if (!curr_user) {
          return NextResponse.json({
            message: "your are not authorized to delete employee",
            success: false,
          });
        }
    
        if (!curr_user.isAdmin) {
          return NextResponse.json({
            message: "your are not authorized to delete employee",
            success: false,
          });
        }
    
        const user= await User.findOne({email})
        if(!user){
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
      // Query the database to find the user with the given email
      const userdelete = await User.deleteOne({ email });
      console.log(typeof userdelete)
  
      if (!userdelete) {
        // Handle case where user is not found
        return NextResponse.json({ error: "Unable to delete" }, { status: 404 });
      }
  
      // If user is found, return user data
      return NextResponse.json({ message: "Employee Delete successfully",success:true});

    } catch (error: any) {
        console.log("some err")
      throw new Error(error.message);
    }
}