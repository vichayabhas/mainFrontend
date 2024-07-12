import { backendUrl } from "@/components/setup";
import { CreateCamp, InterCampFront } from "../../../intreface";

export default async function createCamp(
  input: CreateCamp,
  token: string
): Promise<InterCampFront> {
  console.log(input)
  const response = await fetch(`${backendUrl}/admin/createCamp`, {
    method: "POST",cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  alert(response.status)

  return await response.json();
}
