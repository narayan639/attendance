import { connect } from "@/dbconfig/dbconfig";
import { Wifi } from "@/models/wifiModel";
import { NextRequest, NextResponse } from "next/server";

connect();


export async function POST(req: NextRequest){
try {
    const {bssid}=await req.json()


    const check_bssid=await Wifi.findOne({bssid})


    if(check_bssid){
        return NextResponse.json({message:"wifi already add",success: false})
    }
    const create_wifi= new Wifi({
        bssid
    })
   await create_wifi.save()

   return NextResponse.json({ message: "Wifi added.", success: true });

} catch (error: any) {
    return NextResponse.json({message: "unable to add wifi mac address"})
}
}