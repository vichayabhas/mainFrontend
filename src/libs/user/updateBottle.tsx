import { backendUrl, userPath } from "@/components/setup";
import getUserProfile from "./getUserProfile";

export async function updateBottle(haveBottle: boolean, token: string) {
  const user = await getUserProfile(token);
  if (user.haveBottle != haveBottle) {
    const response = await fetch(`${backendUrl}/${userPath}/updateBottle`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }
}
