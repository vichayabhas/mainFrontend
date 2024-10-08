import { getBackendUrl } from "@/components/setup";
import mongoose from "mongoose";
import { InterWorkingItem } from "../../../interface";

export default async function getWorkingItem(
  id: mongoose.Types.ObjectId,
  token: string
): Promise<InterWorkingItem> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getWorkingItem/params/${id}`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Fail");
  }
  return await response.json();
}
