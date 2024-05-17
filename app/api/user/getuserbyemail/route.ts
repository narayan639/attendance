import { connect } from "@/dbconfig/dbconfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Sendmail, emailType } from "@/utils/mailer";

connect();

export async function POST(req: NextRequest) {
    try {
      const reqBody = await req.json();
      const { email } = reqBody;
  
      console.log("Received email:", email);
  
      // Query the database to find the user with the given email
      const user = await User.findOne({ email });
  
      if (!user) {
        // Handle case where user is not found
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
  
      // If user is found, return user data
      return NextResponse.json({ user });
    } catch (error: any) {
        console.log("some err")
      throw new Error(error.message);
    }
}