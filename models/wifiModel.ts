import mongoose from "mongoose";

const wifiSchema=new mongoose.Schema({
    bssid: {
    type: String,
    unique: true,
    required: true
   },
},{timestamps: true})

export const Wifi=mongoose.models.wifi ||  mongoose.model("wifi", wifiSchema)