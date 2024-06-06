import mongoose from "mongoose";
import { UpdateCamp } from "../../../interface";
import { backendUrl } from "@/components/setup";

export default async function updateCamp(update:UpdateCamp,id:mongoose.Types.ObjectId,token:string){
    const response = await fetch(`${backendUrl}/updateCamp/params/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
    
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(
          update
    
          //{email,gender,haveBottle,lastname,name,nickname,password,shertSize,tel}
        ),
      });
      return await response.json();
}