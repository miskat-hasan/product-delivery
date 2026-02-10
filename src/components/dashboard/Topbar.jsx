"use client";

import { NotificationSvg } from "../svg/Svg";
import { IoMdMenu } from "react-icons/io";
import Notifications from "./Notifications";
import { useState } from "react";
import SidebarSmallDevice from "./SidebarSmallDevice";
import useAuth from "@/hooks/useAuth";

const Topbar = () => {
  const [openNotificationBar, setOpenNotificationBar] = useState(false);
  const [openMobileSideBar, setOpenMobileSideBar] = useState(false);

  const { user } = useAuth();
  console.log(user);

  return (
    <div className="bg-[#FEFEFE] h-[100px] sticky top-0 shadow-[0_4px_4px_0_rgba(0,0,0,0.04)] w-full px-3 md:pl-6 md:pr-[80px] py-7 flex items-center justify-between relative]">
      <h6 className="text-lg sm:text-xl font-medium text-black-500 flex items-center gap-1 sm:gap-4">
        <button
          onClick={() => setOpenMobileSideBar(true)}
          className="xl:hidden cursor-pointer"
        >
          <IoMdMenu className="size-6" />
        </button>
        Welcome Back, {user?.full_name}!
      </h6>
      <div className="flex gap-2 sm:gap-6 items-center">
        <div
          onClick={() => setOpenNotificationBar((prev) => !prev)}
          className="relative cursor-pointer"
        >
          <div className="absolute top-0 right-0 size-5 flex items-center text-white text-sm font-medium justify-center rounded-full bg-[#FF0000]">
            3
          </div>
          <NotificationSvg />
        </div>

        <div className="flex items-center gap-2">
          <figure className="size-[44px] rounded-full overflow-hidden flex items-center justify-center border">
            {/* <Image src={""} width={44} height={44} alt=""/> */}
            <span>{user?.full_name.match(/\b(\w)/g).join("")}</span>
          </figure>
          <div className="max-sm:hidden">
            <h6 className="text-primary-black font-medium">
              {user?.full_name ?? "User"}
            </h6>
            <p className="text-black-300 text-xs">{user?.email}</p>
          </div>
        </div>
      </div>
      {openNotificationBar && (
        <div className="absolute top-20 right-[300px] max-w-[533px] w-full">
          <Notifications />
        </div>
      )}
      {openMobileSideBar && (
        <SidebarSmallDevice onClose={() => setOpenMobileSideBar(false)} />
      )}
    </div>
  );
};

export default Topbar;
