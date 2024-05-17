import { User } from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { password, new_password, email } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        message: "user not found!",
        success: false,
      });
    }

    const valid_password = await bcrypt.compare(password, user.password);

    if (!valid_password) {
      return NextResponse.json({
        message: "check your credentials",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashpassword = await bcrypt.hash(new_password, salt);

    user.password = hashpassword;

    const saveUser = await user.save();

    if (saveUser) {
      return NextResponse.json({
        message: "Password successfully change",
        success: true,
      });
    }
    return NextResponse.json({
      message: "Unable Password change",
      success: false,
    });
  } catch (error: any) {
    return NextResponse.json({ mesage: error.mesage }, { status: 500 });
  }
}
