import { connect } from "@/dbconfig/dbconfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Sendmail, emailType } from "@/utils/mailer";

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
        message: "your are not authorized to add employee",
        success: false,
      });
    }

    if (!curr_user.isAdmin) {
      return NextResponse.json({
        message: "your are not authorized to add employee",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { message: "User already exit! please login" },
        { status: 400 }
      );
    }
    const random_password = Math.floor(100000 + Math.random() * 900000);

    const password = random_password.toString();

    const salt = await bcrypt.genSalt(10);

    const hashpassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashpassword,
    });

    const savedUser = await newUser.save();

    //    send mail
    await Sendmail({
      email,
      emailtype: emailType[0],
      userID: savedUser._id,
      message: `
      <div className="flex flex-col">
      <h3>please Signup with follwoing email and password</h3>
      <h4>
      Email: ${email.toString()}
      </h4>
      <strong>
      password: ${password}
      </h4>
      <h4 className="flex">login Url:  
      ${process.env.DOMAIN}/login
      </h4>
    
      <p classNmae="text-[18px] mt-5">
      Thank you!
      </p>
      </div>`,
    });

    return NextResponse.json({ message: "Employee added.", success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function GET(){
  try {
  const alluser= await User.find({ isAdmin: { $ne: true } })

  const user = alluser.map(user => ({
    email: user.email,
    id: user._id,
    verify: user.isverify,
    attendance: user.attendance
  }));


  return NextResponse.json({user})

  } catch (error: any) {
    throw new Error(error.message)
  }
}