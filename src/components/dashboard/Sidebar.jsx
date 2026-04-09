"use client";
import Link from "next/link";
import {
  HouseSvg,
  LogoutSvg,
  ReportsSvg,
  SettingsSvg,
  ShipmentsSvg,
} from "../svg/Svg";
import { usePathname } from "next/navigation";
import { useLogout } from "@/hooks/api/authApi";

const sidebarNavItem = [
  {
    id: "1",
    icon: HouseSvg,
    label: "Dashboard",
    link: "/dashboard",
  },
  {
    id: "2",
    icon: ShipmentsSvg,
    label: "Shipments",
    link: "/dashboard/shipments",
  },
  {
    id: "3",
    icon: ReportsSvg,
    label: "Templates",
    link: "/dashboard/templates",
  },
  // {
  //   id: "3",
  //   icon: ReportsSvg,
  //   label: "Reports",
  //   link: "#",
  // },
  {
    id: "4",
    icon: SettingsSvg,
    label: "Settings",
    link: "/dashboard/settings",
  },
  {
    id: "5",
    icon: LogoutSvg,
    label: "Log Out",
    link: "#",
  },
];

const Sidebar = () => {
  const pathName = usePathname();
  
  const { mutateAsync: logoutMutation, isPending } = useLogout();
  return (
    <div className="w-[80%] xs:w-[60%] sm:w-[280px] xl:w-[316px] 2xl:w-[330px] h-screen flex flex-col shrink-0 overflow-y-auto bg-white-50 max-xl:hidden">
      <div className="text-[60px] font-bold text-black-500 text-left px-4 lg:px-8 xl:px-12 2xl:text-center my-5">
        LOGO
      </div>

      <div className="space-y-2 flex-1 flex flex-col pb-4">
        {sidebarNavItem.map((item, index) =>
          item.label === "Log Out" ? (
            <button
              key={index}
              onClick={()=> logoutMutation()}
              className={`px-4 lg:px-8 xl:px-12 2xl:px-[82px] py-4 relative flex items-center gap-2.5 group hover:bg-primary-blue transition-all hover:text-white cursor-pointer rounded-r-lg text-xl ${
                item.id === "4" && "mt-auto"
              } ${pathName === item.link && "bg-primary-blue transition-all text-white"}`}
            >
              <div
                className={`w-1.5 h-full absolute top-0 left-0 rounded-r-2xl group-hover:bg-[#082E55]  ${pathName === item.link && "bg-[#082e55]"}`}
              />
              <item.icon
                className={`group-hover:text-white  ${pathName === item.link && "text-white"}`}
              />
              <span>{isPending ? "Processing..." : "Log Out"}</span>
            </button>
          ) : (
            <Link
              key={index}
              href={item.link}
              className={`px-4 lg:px-8 xl:px-12 2xl:px-[82px] py-4 relative flex items-center gap-2.5 group hover:bg-primary-blue transition-all hover:text-white rounded-r-lg text-xl ${
                item.id === "4" && "mt-auto"
              } ${pathName === item.link && "bg-primary-blue transition-all text-white"}`}
            >
              <div
                className={`w-1.5 h-full absolute top-0 left-0 rounded-r-2xl group-hover:bg-[#082E55]  ${pathName === item.link && "bg-[#082e55]"}`}
              />
              <item.icon
                className={`group-hover:text-white  ${pathName === item.link && "text-white"}`}
              />
              <span>{item.label}</span>
            </Link>
          ),
        )}
      </div>
    </div>
  );
};

export default Sidebar;
