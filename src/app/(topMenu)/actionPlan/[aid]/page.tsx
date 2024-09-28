import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import getActionPlan from "@/libs/camp/getActionPlan";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { InterPlace } from "../../../../../interface";
import getPlace from "@/libs/randomthing/getPlace";
import EditActionPland from "@/components/EditActionPland";
import getUserFromCamp from "@/libs/camp/getUserFromCamp";
import { getAllPlaceData } from "@/components/placeSetUp";

export default async function HospitalDetailPage({
  params,
}: {
  params: { aid: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const actionPland = await getActionPlan(
    new mongoose.Types.ObjectId(params.aid),
    session.user.token
  );
  var i = 0;
  const places: InterPlace[] = [];
  while (i < actionPland.placeIds.length) {
    const place = await getPlace(actionPland.placeIds[i++]);
    places.push(place);
  }
  const allPlaceData = await getAllPlaceData();
  const pees = await getUserFromCamp("getPeesFromPartId", actionPland.partId);
  const petos = await getUserFromCamp("getPetosFromPartId", actionPland.partId);
  return (
    <>
      <EditActionPland
        pees={pees}
        petos={petos}
        actionPland={actionPland}
        pls={places}
        allPlaceData={allPlaceData}
      />
    </>
  );
}
