import Link from "next/link";
import {
  HouseSvg,
  LogoutSvg,
  ReportsSvg,
  SettingsSvg,
  ShipmentsSvg,
} from "../svg/Svg";

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
    label: "Reports",
    link: "/dashboard/reports",
  },
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
  return (
    <div className="max-w-[416px] pb-[80px] w-full min-h-screen flex flex-col">
      <div className="text-[60px] font-bold text-black-500 text-center my-5">
        LOGO
      </div>
      <div className="space-y-2 flex-1 relative flex flex-col">
        {sidebarNavItem?.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className={`px-4 lg:px-8 xl:px-12 2xl:px-[82px] py-4 relative flex items-center gap-2.5 group hover:bg-primary-blue transition-all hover:text-white rounded-r-lg text-xl ${item.id === "4" && "mt-auto"}`}
          >
            <div className="w-1.5 h-full absolute top-0 left-0 rounded-r-2xl group-hover:bg-[#082E55]" />
            <item.icon className="group-hover:text-white" />{" "}
            <span className="max-smhidden">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
