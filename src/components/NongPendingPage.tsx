"use client";
import nongRegisterCamp from "@/libs/camp/nongRegisterCamp";
import { TextField } from "@mui/material";
import Link from "next/link";
import { useRef, useState } from "react";
import { InterCampFront, InterUser } from "../../interface";
import { getValue } from "./setup";

export default function NongPendingPage({
  camp,
  user,
  token,
}: {
  camp: InterCampFront;
  user: InterUser;
  token: string;
}) {
  const userRef = useRef("");
  const [link, setLink] = useState<string | null>("");

  return (
    <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
      <div className="text-4xl font-medium">Register</div>
      {camp.registerSheetLink ? (
        <Link href={`${camp.registerSheetLink}${user._id}`}>ใบรับสมัคร</Link>
      ) : null}
      {camp.registerSheetLink ? (
        <Link href={`${getValue(camp.nongPendingIds, user._id)}${user._id}`}>
          ใบรับสมัคร
        </Link>
      ) : null}
      {camp.open ? (
        <form className="w-[30%] items-center bg-slate-600 p-10 rounded-3xl shadow-[25px_25px_40px_-10px_rgba(0,0,0,0.7)]">
          <div className="flex flex-row items-center">
            <label className="w-2/5 text-2xl text-slate-200">
              Link googleDrive
            </label>
            <TextField
              name="Name"
              id="Name"
              className="w-3/5 bg-slate-100 rounded-2xl shadow-inner"
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          <div className="flex flex-row justify-end">
            <button
              className="bg-pink-300 p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
              onClick={async () => {
                console.log(userRef);
                if (link) {
                  try {
                    nongRegisterCamp(camp._id, link, token);
                  } catch (error) {
                    console.log(error);
                  }
                } else {
                  alert("Please type in all the details!");
                }
              }}
            >
              Register
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
