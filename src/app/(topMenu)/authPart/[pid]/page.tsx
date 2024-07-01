import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import RegisterPartServer from "@/components/RegisterPartServer";
import UpdateBaanServer from "@/components/UpdateBaanServer";
import UpdateCampServer from "@/components/UpdateCampServer";
import getCamp from "@/libs/camp/getCamp";
import getPart from "@/libs/camp/getPart";
import getPeeCamp from "@/libs/camp/getPeeCamp";
import shertManagebyCampId from "@/libs/user/getShertManageByCampId";
import getUserProfile from "@/libs/user/getUserProfile";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export default async function Baan({ params }: { params: { pid: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const token = session.user.token;
  const partId = new mongoose.Types.ObjectId(params.pid);
  const user = await getUserProfile(session.user.token);

  const part = await getPart(partId, session.user.token);
  const camp = await getCamp(part.campId);
  const shertManage = await shertManagebyCampId(part.campId, token);

  if (
    !user.authPartIds.includes(camp.partBoardId) &&
    !user.authPartIds.includes(camp.partCoopId) &&
    !user.authPartIds.includes(camp.partRegiterId)
  ) {
    return <BackToHome />;
  }
  switch (partId.toString()) {
    case camp.partCoopId.toString(): {
      switch (shertManage.role) {
        case "nong": {
          console.log();
          return <BackToHome />;
        }
        case "pee": {
          const peeCamp = await getPeeCamp(shertManage.campModelId, token);
          return <UpdateBaanServer baanId={peeCamp.baanId} />;
        }
        case "peto": {
          return camp.baanIds.map((baanId) => (
            <UpdateBaanServer baanId={baanId} />
          ));
        }
      }
    }
    case camp.partBoardId.toString(): {
      return (
        <>
          <UpdateCampServer campId={camp._id} token={token} />
          <RegisterPartServer campId={camp._id} token={token} isBoard={true} />
        </>
      );
    }
    case camp.partRegiterId.toString(): {
      return (
        <RegisterPartServer campId={camp._id} token={token} isBoard={false} />
      );
    }
  }
}