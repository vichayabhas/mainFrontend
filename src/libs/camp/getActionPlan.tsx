import { backendUrl } from "@/components/setup";
import mongoose from "mongoose";
import { InterActionPlan, showActionPlan } from "../../../interface";

export default async function getActionPlan(id:mongoose.Types.ObjectId,token:string):Promise<showActionPlan>{
    const response = await fetch(`${backendUrl}/camp/getActionPlan/params/${id}`, {
        method: "GET",
        cache: "no-store",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Fail");
      }
      return await response.json();
}