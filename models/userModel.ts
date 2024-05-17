import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
   name: String,
   username: String,
   email:{
    type: String,
    required: true,
    unique: true
   },
   password: {
      type:String,
      required: true
   },
   isAdmin:{
    type: Boolean,
    default: false
   },
   attendance:{
      type: [String]
   },
   isverify:{
    type: Boolean,
    default: false
   },
   forgotPasswordToken: String,
   forgotPasswordTokenExpiry: Date,


},{timestamps: true})

export const User=mongoose.models.users ||  mongoose.model("users", userSchema)