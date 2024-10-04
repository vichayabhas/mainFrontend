'use client';
import styles from "./topmenu.module.css";
import TopMenuItem from "./TopMenuItem";
import mongoose from "mongoose";
import { Mode, RoleCamp } from "../../interface";
import { useRouter } from "next/navigation";
import Logo from "./Logo";

export default function TopMenuCamp({
  campId,
  role,
  mode,
}: {
  campId: mongoose.Types.ObjectId;
  role: RoleCamp;
  mode: Mode;
}) {
  const router = useRouter();
  switch (role) {
    case "nong":
      return (
        <div className={styles.menucontainer}>
          <Logo/>
          <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
            <TopMenuItem
              title="คุยส่วนตัวกับพี่"
              pageRef={`/camp/${campId}/allNongChat`}
            />
            <TopMenuItem
              title="คุยกันในบ้าน"
              pageRef={`/camp/${campId}/baan/nongChat`}
            />
            <TopMenuItem
              title="อ่านแชตทั้งหมด"
              pageRef={`/camp/${campId}/baan/nongChat`}
            />
          </div>
        </div>
      );
    case "pee": {
      switch (mode) {
        case "nong":
          return (
            <div className={styles.menucontainer}>
              <Logo/>
              <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
                <TopMenuItem
                  title="คุยส่วนตัวกับน้อง"
                  pageRef={`/camp/${campId}/allNongChat`}
                />
                <TopMenuItem
                  title="คุยกันในบ้าน"
                  pageRef={`/camp/${campId}/baan/nongChat`}
                />
                <TopMenuItem
                  title="อ่านแชตทั้งหมด"
                  pageRef={`/camp/${campId}/baan/nongChat`}
                />
              </div>
            </div>
          );
        case "pee":
          return (
            <div className={styles.menucontainer}>
              <Logo/>
              <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
                <TopMenuItem
                  title="คุยส่วนตัวกับน้อง"
                  pageRef={`/camp/${campId}/allNongChat`}
                />
                <TopMenuItem
                  title="คุยกันในบ้าน+น้อง"
                  pageRef={`/camp/${campId}/baan/nongChat`}
                />
                <TopMenuItem
                  title="คุยกันในบ้าน+พี่บ้าน"
                  pageRef={`/camp/${campId}/baan/nongChat`}
                />
                <TopMenuItem
                  title="อ่านแชตทั้งหมด"
                  pageRef={`/camp/${campId}/baan/nongChat`}
                />
              </div>
            </div>
          );
      }
    }
    case "peto": {
      switch (mode) {
        case "nong":
          return (
            <div className={styles.menucontainer}>
              <Logo/>
              <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
                <TopMenuItem
                  title="อ่านแชตทั้งหมด"
                  pageRef={`/camp/${campId}/baan/nongChat`}
                />
              </div>
            </div>
          );
        case "pee":
          return (
            <div className={styles.menucontainer}>
              <Logo/>
              <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
                <TopMenuItem
                  title="อ่านแชตทั้งหมด"
                  pageRef={`/camp/${campId}/baan/nongChat`}
                />
              </div>
            </div>
          );
      }
    }
  }
} /*
{role === "admin" && user.mode === "pee" ? (
          <TopMenuItem title="Admin Action" pageRef="" />
        ) : null}
        <TopMenuItem title="Reservations" pageRef="/booking/" />
        {session ? (
          <TopMenuItem title="Sign Out" pageRef="/api/auth/signout" />
        ) : (
          
        )}*/
