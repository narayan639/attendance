import { User } from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Wifi } from "@/models/wifiModel";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        message: "user not register!",
        success: false,
      });
    }
    user.isverify = true;

    await user.save();

    const valid_password = await bcrypt.compare(password, user.password);

    if (!valid_password) {
      return NextResponse.json({
        message: "check your credentials",
        success: false,
      });
    }

    const tokendata = {
      id: user._id,
      isAdmin: user.isAdmin,
    };

    const token = jwt.sign(tokendata, process.env.TOKEN_SECRET as string, {
      expiresIn: 60*60*24,
    });

    const response = NextResponse.json({
      message: "Login Success",
      success: true,
      userType: user.isAdmin, 
      email: user.email,
      attendance: user.attendance
    });

    response.cookies.set("token", token, {
      maxAge: 60*60*24,
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ mesage: error.mesage }, { status: 500 });
  }
}


export async function PUT(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { date,email,bssid } = reqBody;

    const check_wifi_auth= (await Wifi.find()).map(wifi=>wifi.bssid).includes(bssid)

    if(!check_wifi_auth){
      return NextResponse.json({message: "wrong wifi connection!", success: false})
    }


    const user = await User.findOne({email})

    if(!user){
      return NextResponse.json({message: "user not found", success: false})
    }
    if(user.attendance.includes(date)){
      return NextResponse.json({message: "attendance already taken", success:false})
    }
    user.attendance= [...user.attendance, date]

   const saveuser= await user.save()

   return NextResponse.json({message: "attendance take successfully", success:true, saveuser})

  } catch (error: any) {
    return NextResponse.json({ mesage: error.mesage }, { status: 500 });
  }
}
