import { backendUrl } from "@/components/setup";
import { CreateActionPlan } from "../../../interface";

export default async function createActionPlan(input:CreateActionPlan,token:string){
    const response = await fetch(`${backendUrl}/camp/createActionPlan/`, {
        method: "POST",cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });
      return await response.json();
}