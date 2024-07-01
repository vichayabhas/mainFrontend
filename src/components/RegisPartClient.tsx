"use client";

import { useRouter } from "next/navigation";
import {
  InterCampFront,
  Mode,
  MyMap,
  RegisBaan,
  RegisPart,
  RoleCamp,
  ShowMember,
  ShowRegister,
} from "../../interface";
import Link from "next/link";
import { useState } from "react";
import mongoose from "mongoose";
import { Checkbox } from "@mui/material";
import { swop } from "./setup";
import SelectTemplate from "./SelectTemplate";
import FinishButton from "./FinishButton";
import admission from "@/libs/camp/admission";
import addMemberToBaan from "@/libs/camp/addMamberToBaan";
import changeBaan from "@/libs/camp/changeBaan";
import changePart from "@/libs/camp/changePart";

export default function RegisterPartClient({
  regisBaans,
  regisParts,
  peeRegisters,
  camp,
  token,
  isBoard,
  partMap,
}: {
  regisParts: RegisPart[];
  regisBaans: RegisBaan[];
  peeRegisters: ShowRegister[];
  camp: InterCampFront;
  token: string;
  isBoard: boolean;
  partMap: MyMap[];
}) {
  const router = useRouter();
  const [nongPendingIds, set1] = useState<mongoose.Types.ObjectId[]>([]);
  const [nongInterviewIds, set2] = useState<mongoose.Types.ObjectId[]>([]);
  const [nongPaidIds, set4] = useState<mongoose.Types.ObjectId[]>([]);
  const [nongSureIds, set5] = useState<mongoose.Types.ObjectId[]>([]);
  const [peePassIds, set6] = useState<mongoose.Types.ObjectId[]>([]);
  const [members, set7] = useState<mongoose.Types.ObjectId[]>([]);
  const [userIds, set8] = useState<mongoose.Types.ObjectId[]>([]);
  const mapIn: MyMap[] = regisBaans.map((regisBaan) => ({
    key: regisBaan.baan._id,
    value: regisBaan.baan.name,
  }));
  const regis = partMap.filter((e) => {
    e.key.toString() !== camp.partBoardId.toString() &&
      e.key.toString() !== camp.partRegiterId.toString();
  });

  return (
    <div>
      <div>น้องที่สมัครเข้ามา</div>
      <table>
        <th>รหัส</th>
        <th>link</th>
        <th>select</th>
        {camp.nongPendingIds.map((v, i) => (
          <tr>
            <td
              onClick={() => {
                router.push(`/userProfile/${v.key}`);
              }}
            >
              {v.key.toString()}
            </td>
            <td>
              <Link href={v.value || ""}>link</Link>
            </td>
            <td>
              <Checkbox
                onChange={(e, c) => {
                  if (c) {
                    set1(swop(null, v.key, nongPendingIds));
                  } else {
                    set1(swop(v.key, null, nongPendingIds));
                  }
                }}
              />
            </td>
          </tr>
        ))}
      </table>
      {camp.registerModel === "all" ? (
        <>
          <FinishButton
            text="ผ่านรอบเอกสาร"
            onClick={() => {
              admission(
                { members: nongPendingIds, campId: camp._id },
                "interview",
                token
              );
              set1([]);
            }}
          />
          <FinishButton
            text="ตกรอบเอกสาร"
            onClick={() => {
              admission(
                { members: nongPendingIds, campId: camp._id },
                "kick/nong",
                token
              );
              set1([]);
            }}
          />
          <div>ผ่านการสัมภาส</div>
          <table>
            <th>รหัส</th>
            <th>link</th>
            <th>select</th>
            {camp.nongInterviewIds.map((v) => (
              <tr>
                <td
                  onClick={() => {
                    router.push(`/userProfile/${v.key}`);
                  }}
                >
                  {v.key.toString()}
                </td>
                <td>
                  <Link href={v.value}>link</Link>
                </td>
                <td>
                  <Checkbox
                    onChange={(e, c) => {
                      if (c) {
                        set2(swop(null, v.key, nongInterviewIds));
                      } else {
                        set2(swop(v.key, null, nongInterviewIds));
                      }
                    }}
                  />
                </td>
              </tr>
            ))}
          </table>
          <FinishButton
            text="ผ่านการสัมภาส"
            onClick={() => {
              admission(
                { members: nongInterviewIds, campId: camp._id },
                "pass",
                token
              );
              set2([]);
            }}
          />
          <FinishButton
            text="ตกรอบสัมภาส"
            onClick={() => {
              admission(
                { members: nongInterviewIds, campId: camp._id },
                "kick/nong",
                token
              );
              set1([]);
            }}
          />
        </>
      ) : (
        <>
          <FinishButton
            text="ผ่านการคัดเลือก"
            onClick={() => {
              admission(
                { members: nongPendingIds, campId: camp._id },
                "pass",
                token
              );
              set2([]);
            }}
          />
          <FinishButton
            text="ไม่ผ่านการคัดเลือก"
            onClick={() => {
              admission(
                { members: nongPendingIds, campId: camp._id },
                "kick/nong",
                token
              );
              set1([]);
            }}
          />
        </>
      )}
      <div>
        {camp.registerModel === "all" ? (
          <>น้องที่ผ่านการสัมภาส</>
        ) : (
          <>น้องที่ผ่านการคัดเลือก</>
        )}
      </div>
      <table>
        <th>รหัส</th>
        <th>link</th>
        {camp.nongPassIds.map((v) => (
          <tr>
            <td
              onClick={() => {
                router.push(`/userProfile/${v.key}`);
              }}
            >
              {v.key.toString()}
            </td>
            <td>
              <Link href={v.value}>link</Link>
            </td>
          </tr>
        ))}
      </table>
      {camp.registerModel !== "noPaid" ? (
        <>
          <div>น้องที่จ่ายเงินแล้ว</div>
          <table>
            <th>รหัส</th>
            <th>link</th>
            <th>select</th>
            {camp.nongPassIds
              .filter((e) => camp.nongPaidIds.includes(e.key))
              .map((v) => (
                <tr>
                  <td
                    onClick={() => {
                      router.push(`/userProfile/${v.key}`);
                    }}
                  >
                    {v.key.toString()}
                  </td>
                  <td>
                    <Link href={v.value}>link</Link>
                  </td>
                  <td>
                    <Checkbox
                      onChange={(e, c) => {
                        if (c) {
                          set4(swop(null, v.key, nongPaidIds));
                        } else {
                          set4(swop(v.key, null, nongPaidIds));
                        }
                      }}
                    />
                  </td>
                </tr>
              ))}
          </table>
          <FinishButton
            text="ยืนยันการจ่ายเงิน"
            onClick={() => {
              admission(
                { members: nongPaidIds, campId: camp._id },
                "sure",
                token
              );
              set4([]);
            }}
          />
          <FinishButton
            text="ไม่ยืนยันการจ่ายเงิน"
            onClick={() => {
              admission(
                { members: nongPaidIds, campId: camp._id },
                "kick/nong",
                token
              );
              set1([]);
            }}
          />
        </>
      ) : null}
      <div>น้องที่มั่นใจว่าเข้าค่ายแน่นอน</div>
      <table>
        <th>รหัส</th>

        <th>select</th>
        {camp.nongSureIds.map((v) => (
          <tr>
            <td
              onClick={() => {
                router.push(`/userProfile/${v.toString()}`);
              }}
            >
              {v.toString()}
            </td>

            <td>
              <Checkbox
                onChange={(e, c) => {
                  if (c) {
                    set5(swop(null, v, nongSureIds));
                  } else {
                    set5(swop(v, null, nongSureIds));
                  }
                }}
              />
            </td>
          </tr>
        ))}
      </table>
      <div>พี่ที่สมัครเข้ามา</div>
      <table>
        <th>รหัส</th>
        <th>link</th>
        <th>select</th>
        {peeRegisters.map((v) => (
          <tr>
            <td
              onClick={() => {
                router.push(`/userProfile/${v.userId}`);
              }}
            >
              {v.fullName}
            </td>
            <td>{v.partName}</td>
            <td>
              <Checkbox
                onChange={(e, c) => {
                  if (c) {
                    set6(swop(null, v.userId, peePassIds));
                  } else {
                    set6(swop(v.userId, null, peePassIds));
                  }
                }}
              />
            </td>
          </tr>
        ))}
      </table>
      <SelectTemplate
        mapIn={mapIn}
        select={(baanId) => {
          addMemberToBaan(
            { baanId, members: nongSureIds },
            "nong",
            token,
            "add"
          );
          addMemberToBaan({ baanId, members: peePassIds }, "pee", token, "add");
          changeBaan({ userIds: members, baanId }, token);
          set5([]);
          set6([]);
          set7([]);
        }}
        buttonText={"จัดบ้าน"}
      />
      {regisBaans.map((regisBaan) => (
        <>
          <div>
            <div>รายชื่อน้องบ้าน{regisBaan.baan.fullName}</div>
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
              {regisBaan.nongs.map((user: ShowMember) => (
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
                        router.push(
                          `/helthIshue/${user.helthIsueId?.toString()}`
                        );
                      }}
                    >
                      {user.helthIsueId.toString()}
                    </td>
                  ) : (
                    <td> null</td>
                  )}
                  <td>
                    <Checkbox
                      onChange={(e, c) => {
                        if (c) {
                          set6(swop(null, user._id, members));
                        } else {
                          set6(swop(user._id, null, members));
                        }
                      }}
                    />
                  </td>
                </tr>
              ))}
            </table>
          </div>
          <div>
            <div>รายชื่อพี่บ้าน{regisBaan.baan.fullName}</div>
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
              {regisBaan.pees.map((user: ShowMember) => (
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
                        router.push(
                          `/helthIshue/${user.helthIsueId?.toString()}`
                        );
                      }}
                    >
                      {user.helthIsueId.toString()}
                    </td>
                  ) : (
                    <td> null</td>
                  )}
                  <td>
                    <Checkbox
                      onChange={(e, c) => {
                        if (c) {
                          set6(swop(null, user._id, members));
                        } else {
                          set6(swop(user._id, null, members));
                        }
                      }}
                    />
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </>
      ))}
      {regisParts.map((regisPart) => {
        const have =
          isBoard ||
          (regisPart.part._id.toString() !== camp.partBoardId.toString() &&
            regisPart.part._id.toString() != camp.partRegiterId.toString());
        return (
          <>
            <div>
              <div>รายชื่อปีโตฝ่าย{regisPart.part.partName}</div>
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
                  <th>select</th>
                </tr>
                {regisPart.petos.map((user: ShowMember) => (
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
                          router.push(
                            `/helthIshue/${user.helthIsueId?.toString()}`
                          );
                        }}
                      >
                        {user.helthIsueId.toString()}
                      </td>
                    ) : (
                      <td> null</td>
                    )}
                    {have ? (
                      <Checkbox
                        onChange={(e, c) => {
                          if (c) {
                            set8(swop(null, user._id, userIds));
                          } else {
                            set8(swop(user._id, null, userIds));
                          }
                        }}
                      />
                    ) : null}
                  </tr>
                ))}
              </table>
            </div>
            <div>
              <div>รายชื่อพี่บ้าน{regisPart.part.partName}</div>
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
                  <th>select</th>
                </tr>
                {regisPart.pees.map((user: ShowMember) => (
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
                          router.push(
                            `/helthIshue/${user.helthIsueId?.toString()}`
                          );
                        }}
                      >
                        {user.helthIsueId.toString()}
                      </td>
                    ) : (
                      <td> null</td>
                    )}
                    {have ? (
                      <Checkbox
                        onChange={(e, c) => {
                          if (c) {
                            set8(swop(null, user._id, userIds));
                          } else {
                            set8(swop(user._id, null, userIds));
                          }
                        }}
                      />
                    ) : null}
                  </tr>
                ))}
              </table>
            </div>
          </>
        );
      })}
      {isBoard ? (
        <SelectTemplate
          mapIn={partMap}
          select={(partId) => {
            changePart({ userIds, partId }, token);
          }}
          buttonText={"ย้ายฝ่าย"}
        />
      ) : (
        <SelectTemplate
          mapIn={regis}
          select={(partId) => {
            changePart({ userIds, partId }, token);
          }}
          buttonText={"ย้ายฝ่าย"}
        />
      )}
    </div>
  );
}