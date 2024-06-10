import PushToCamps from "@/components/PushToCamps";

import BaanMembers from "@/components/BaanMembers";
import LocationDateReserve from "@/components/LocationDateReserve";
import NongRegisterPage from "@/components/NongRegisterPage";
import getBaan from "@/libs/camp/getBaan";
import getCamp from "@/libs/camp/getCamp";
import getNongCamp from "@/libs/camp/getNongCamp";
import getPart from "@/libs/camp/getPart";
import getPartName from "@/libs/camp/getPartName";
import getShertManageByCampId from "@/libs/user/getShertManageByCampId";
import getUserProfile from "@/libs/user/getUserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";
import mongoose from "mongoose";
import getBaans from "@/libs/camp/getBaans";
import UpdateCampClient from "@/components/UpdateCampClient";

export default async function HospitalDetailPage({
  params,
}: {
  params: { cid: string };
}) {
  const campId=new mongoose.Types.ObjectId(params.cid)
  const baans=await getBaans(campId)
  const camp=await getCamp(campId)

  return<><UpdateCampClient camp={camp} baans={baans}/></>
  //สร้างบ้าน
  //สร้างฝ่าย
  // update บ้าน
  // update ฝ่าย
  /*const campId = params.cid;
  const session = await getServerSession(authOptions);
  if (session) {
    const campDetail = await getCamp(campId);
    const token = session.user.token;

    const user = await getUserProfile(token);
    console.log(user);
    if (!user) {
      //alert("ghggg");
      return <PushToCamps />;
    }
    var campRole: "nong" | "pee" | "peto" | null = null;
    const curentRole = user.role;
    const userId: string = user._id;
    const partMap: Map<string, string> = new Map();
    campDetail.partIds.forEach(async (partId: string) => {
      const part = await getPart(partId, token);
      const partName = await getPartName(part.nameId, token);
      partMap.set(partName.name, part._id);
    });

    if (campDetail.nongIds.includes(userId)) {
      campRole = "nong";
      const shertManage = await getShertManageByCampId(campDetail._id, token);
      const nongCamp = await getNongCamp(shertManage.campModelId, token);
      const baan = await getBaan(nongCamp.baanId);
      return <BaanMembers baan={baan} />;
    } else if (campDetail.peeIds.includes(userId)) {
      campRole = "pee";
    } else if (campDetail.petoIds.includes(userId)) {
      campRole = "peto";
    } else if (myMapToMapString(campDetail.nongPendingIds).has(user._id)) {
    } else if (campDetail.nongPaidIds.includes(user._id)) {
    } else if (myMapToMapString(campDetail.nongPassIds).has(user._id)) {
    } else if (myMapToMapString(campDetail.peePassIds).has(user._id)) {
    } else if (myMapToMapString(campDetail.nongInterviewIds).has(user._id)) {
    } else if (campDetail.open && user.role == "nong") {
      console.log(user.role);
      return <NongRegisterPage camp={campDetail} token={token} />;
    } else if (!campDetail.peeLock && user.role != "nong") {
      console.log("pee");
      console.log(user.role);
      return <LocationDateReserve partMap={partMap} token={token} />;
    } else {
      alert("this camp is close");
      return <PushToCamps />;
    }
    return (
      <main className="text-center p-5">
        <div>
          <Image
            src={campDetail.logoUrl}
            alt="htfugyy"
            width={0}
            height={0}
            sizes="100vw"
            className="rounded-lg w-[30%]"
          />
          <div className="text-md mx-5">{}</div>
          <div className="text-md mx-5">{}</div>
          <div className="text-md mx-5">{}</div>
        </div>
      </main>
    );
  } else {
    return <PushToCamps />;
  }*/
} /*
const campDetail = await getCamp(params.cid);
const session=await getSession()

  console.log(session?.user)
  const user = await getUserProfile(session?.user.token as string);
  if (!user||!session) {
    //alert("ghggg");
    return <PushToCamps />;
  }
  var campRole: "nong" | "pee" | "peto" | null = null;
  const curentRole = session.user.role;
  const userId: string = user._id
  const partMap: Map<string, string> = new Map();
  campDetail.partIds.forEach(async (partId: string) => {
    const part = await getPart(partId, token);
    const partName = await getPartName(part.nameId, token);
    partMap.set(partName.name, part._id);
  });
  const token: string = session.user.token as string;
  if (campDetail.nongIds.includes(userId)) {
    campRole = "nong";
    const shertManage = await getShertManageByCampId(campDetail._id, token);
    const nongCamp = await getNongCamp(shertManage.campModelId, token);
    const baan = await getBaan(nongCamp.baanId);
    return <BaanMembers baan={baan} />;
  } else if (campDetail.peeIds.includes(userId)) {
    campRole = "pee";
  } else if (campDetail.petoIds.includes(userId)) {
    campRole = "peto";
  } else if (myMapToMapString(campDetail.nongPendingIds).has(user._id)) {
  } else if (campDetail.nongPaidIds.includes(user._id)) {
  } else if (myMapToMapString(campDetail.nongPassIds).has(user._id)) {
  } else if (myMapToMapString(campDetail.peePassIds).has(user._id)) {
  } else if (myMapToMapString(campDetail.nongInterviewIds).has(user._id)) {
  } else if (campDetail.open && user.role === "nong") {
    return (
      <main>
        <Link href={campDetail.registerSheetLink}>ใบรับสมัคร</Link>
        <NongRegisterPage camp={campDetail} token={token} />
      </main>
    );
  } else if (!campDetail.peeLock && user.role !== "nong") {
    return <LocationDateReserve partMap={partMap} token={token} />;
  } else {
    alert("this camp is close");

    return <PushToCamps />;
  }
  return (
    <main className="text-center p-5">
      <div>
        <Image
          src={campDetail.logoUrl}
          alt="htfugyy"
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-lg w-[30%]"
        />
        <div className="text-md mx-5">{}</div>
        <div className="text-md mx-5">{}</div>
        <div className="text-md mx-5">{}</div>
      </div>
    </main>
  );*/