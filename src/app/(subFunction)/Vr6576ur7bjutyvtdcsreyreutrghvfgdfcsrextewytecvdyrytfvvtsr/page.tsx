//pee
"use client";

import { useState } from "react";
import { Group } from "../../../../interface";
import { MenuItem, Select, TextField } from "@mui/material";
import FinishButton from "@/components/FinishButton";
import { backendUrl } from "@/components/setup";
import { useSession } from "next-auth/react";
import BackToHome from "@/components/BackToHome";

export default function page() {
    const { data: session } = useSession();
    if (!session) {
      return <BackToHome />;
    }
  const [studentId, setStudentId] = useState<string | null>(null);
  const [group, setGroup] = useState<Group | null>(null);
  const allGroup: Group[] = [
    "A",
    "B",
    "C",
    "Dog",
    "E",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "M",
    "N",
    "P",
    "Q",
    "R",
    "S",
    "T",
  ];
  return (
    <div>
      <label>กรุปของนิสิต</label>
      <Select value={group}>
        {allGroup.map((g) => (
          <MenuItem
            onChange={() => {
              setGroup(g);
            }}
          >
            {g}
          </MenuItem>
        ))}
      </Select>
      <label>รหัสประจำตัวนิสิต</label>
      <TextField
        onChange={(e) => {
          setStudentId(e.target.value);
        }}
      />
      <FinishButton
        text="bypass"
        onClick={async () => {
          const response = await fetch(
            `${backendUrl}/subfunction/peeBypass`,
            {
              method: "POST",
              cache: "no-store",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${session.user.token}`,
              },
              body:JSON.stringify({
                studentId,group
              })
            }
          );
        }}
      />
    </div>
  );
}