import { backendUrl } from "@/components/setup";
import mongoose from "mongoose";

export default async function plusActionPlan(
  input: { campId: mongoose.Types.ObjectId; plus: number },
  token: string
) {
  const response = await fetch(`${backendUrl}/camp/plusActionPlan`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  return await response.json();
}
