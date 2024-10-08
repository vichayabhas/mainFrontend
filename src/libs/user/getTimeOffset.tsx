import { getBackendUrl, userPath } from "@/components/setup";
import mongoose from "mongoose";
import { InterTimeOffset } from "../../../interface";

export default async function getTimeOffset(
  id: mongoose.Types.ObjectId
): Promise<InterTimeOffset> {
  const response = await fetch(
    `${getBackendUrl()}/${userPath}/getTimeOffset/params/${id}`,
    { cache: "no-store" }
  );
  return await response.json();
}
