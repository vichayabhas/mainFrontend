"use client";

import { useRouter } from "next/navigation";
import {
  InterBuilding,
  InterPartFront,
  InterPlace,
  InterUser,
  MyMap,
  ShowMember,
} from "../../interface";
import { useState } from "react";
import mongoose from "mongoose";
import PlaceSelect from "./PlaceSelect";
import FinishButton from "./FinishButton";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SelectTemplate from "./SelectTemplate";
import { TextField } from "@mui/material";
import createActionPlan from "@/libs/camp/createActionPlan";
import { useSession } from "next-auth/react";
import { notEmpty } from "./setup";
export default function PartClient({
  user,
  part,
  pees,
  petos,
  allBuildings,
  allPlace,
}: {
  part: InterPartFront;
  user: InterUser;
  pees: ShowMember[];
  petos: ShowMember[];
  allPlace: Map<string, InterPlace[]>;
  allBuildings: Map<mongoose.Types.ObjectId, InterBuilding>;
}) {
  const { data: session } = useSession();
  if (user.mode == "nong" || !session) {
    return null;
  }
  const [action, setAction] = useState<string | null>(null);
  const [places, setPlaces] = useState<(InterPlace | null)[]>([]);
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [body, setBody] = useState<string | null>(null);
  const router = useRouter();
  function add() {
    places.push(null);
    //setPlaces(places);
    router.refresh();
  }
  function remove() {
    places.pop();
    //setPlaces(places);
    router.refresh();
  }
  const maps: MyMap[] = [];
  var i = 0;
  while (i < pees.length) {
    const { _id, nickname, name, lastname } = pees[i++];
    maps.push({ key: _id, value: `${nickname} ${name} ${lastname}` });
  }
  i = 0;
  while (i < petos.length) {
    const { _id, nickname, name, lastname } = petos[i++];
    maps.push({ key: _id, value: `${nickname} ${name} ${lastname}` });
  }
  return (
    <main className="text-center p-5">
      <div>
        <div>รายชื่อพี่บ้านฝ่าย{part.partName}</div>
        <table>
          <tr>
            <th>ชือเล่น</th>
            <th>ชื่อจริง</th>
            <th>นามสกุล</th>
            <th>เพศ</th>

            <th>ค้างคืนหรือไม่</th>
            <th>id</th>
            <th>รหัสประจำตัวนิสิต</th>
            <th>เบอร์โทรศัพท์</th>
            <th>email</th>
            <th>มีกระติกน้ำหรือไม่</th>
            <th>ขนาดเสื้อ</th>
            <th>กรุปของนิสิต</th>
            <th>ปัญหาสุขภาพ</th>
          </tr>
          {pees.map((user: ShowMember) => (
            <tr>
              <td>{user.nickname}</td>
              <td>{user.name}</td>
              <td>{user.lastname}</td>
              <td>{user.gender}</td>
              <td>{user.sleep ? <>ค้างคืน</> : <>ไม่ค้างคืน</>} </td>
              <td>{user._id.toString()}</td>
              <td>{user.studentId}</td>
              <td>{user.tel}</td>
              <td>{user.email}</td>
              <td>{user.haveBottle.toString()}</td>
              <td>{user.shertSize}</td>
              <td>{user.group}</td>
              {user.helthIsueId ? (
                <td
                  onClick={() => {
                    router.push(`/helthIshue/${user.helthIsueId?.toString()}`);
                  }}
                >
                  {user.helthIsueId.toString()}
                </td>
              ) : (
                <td> null</td>
              )}
            </tr>
          ))}
        </table>
      </div>
      <div>
        <div>รายชื่อปีโตฝ่าย{part.partName}</div>
        <table>
          <tr>
            <th>ชือเล่น</th>
            <th>ชื่อจริง</th>
            <th>นามสกุล</th>
            <th>เพศ</th>
            <th>ค้างคืนหรือไม่</th>
            <th>id</th>
            <th>รหัสประจำตัวนิสิต</th>
            <th>เบอร์โทรศัพท์</th>
            <th>email</th>
            <th>มีกระติกน้ำหรือไม่</th>
            <th>ขนาดเสื้อ</th>
            <th>กรุปของนิสิต</th>
            <th>ปัญหาสุขภาพ</th>
          </tr>
          {petos.map((user: ShowMember) => (
            <tr>
              <td>{user.nickname}</td>
              <td>{user.name}</td>
              <td>{user.lastname}</td>
              <td>{user.gender}</td>
              <td>{user.sleep ? <>ค้างคืน</> : <>ไม่ค้างคืน</>} </td>
              <td>{user._id.toString()}</td>
              <td>{user.studentId}</td>
              <td>{user.tel}</td>
              <td>{user.email}</td>
              <td>{user.haveBottle.toString()}</td>
              <td>{user.shertSize}</td>
              <td>{user.group}</td>
              {user.helthIsueId ? (
                <td
                  onClick={() => {
                    router.push(`/helthIshue/${user.helthIsueId?.toString()}`);
                  }}
                >
                  {user.helthIsueId.toString()}
                </td>
              ) : (
                <td> null</td>
              )}
            </tr>
          ))}
        </table>
      </div>
      <div className=" rounded-lg ">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            className="bg-white m-10"
            value={start}
            onChange={(newValue) => {
              setStart(newValue);
              console.log(newValue);
            }}
          />
        </LocalizationProvider>
      </div>
      <div className=" rounded-lg ">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            className="bg-white m-10"
            value={end}
            onChange={(newValue) => {
              setEnd(newValue);
              console.log(newValue);
            }}
          />
        </LocalizationProvider>
      </div>
      <FinishButton text={"add"} onClick={add} />
      <FinishButton text={"remove"} onClick={remove} />
      {places.map((v, i) => (
        <PlaceSelect
          place={v}
          allPlace={allPlace}
          allBuildings={allBuildings}
          onClick={(ouuPut) => {
            places[i] = ouuPut;
            setPlaces(places);
          }}
        />
      ))}
      <div className="flex flex-row items-center my-5">
        <label className="w-2/5 text-2xl text-slate-200">
          ทำอะไร กริยาขึ้นก่อน
        </label>
        <TextField
          name="Tel"
          id="Tel"
          className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
          onChange={(e) => setAction(e.target.value)}
        />
      </div>
      <div className="flex flex-row items-center my-5">
        <label className="w-2/5 text-2xl text-slate-200">รายละเอียด</label>
        <TextField
          name="Email"
          id="Email"
          className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <SelectTemplate
        mapIn={maps}
        select={(headId) => {
          if (headId && body && action && start && end) {
            createActionPlan(
              {
                action,
                partId: part._id,
                placeIds: places.filter(notEmpty).map((e) => e._id),
                start,
                end,
                headId,
                body,
              },
              session.user.token
            );
          }
        }}
        buttonText={"สร้าง action plan"}
      />
    </main>
  );
}
/**export interface InterActionPlan {

    action: string,
    partId: mongoose.Types.ObjectId,*
    placeIds: mongoose.Types.ObjectId[],
    start: Date,
    end: Date,
    headId: mongoose.Types.ObjectId,
    body: string,


    start: Date,
    end: Date,
    headId: mongoose.Types.ObjectId,
    body: string,
} */
