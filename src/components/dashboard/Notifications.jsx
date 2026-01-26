"use client";
import { AlertCircleSvg, PackageSvg, UserPlusSvg } from "../svg/Svg";

const notifications = [
  {
    id: 1,
    title: "New Shipment Created",
    description: "AWB-2026-001234 has been created and assigned to you",
    time: "3h ago",
    isNew: true,
    icon: PackageSvg,
  },
  {
    id: 2,
    title: "New Team Member",
    description: "Customs broker has accepted your invitation",
    time: "1d ago",
    isNew: true,
    icon: UserPlusSvg,
  },
  {
    id: 3,
    title: "Shipment Status Updated",
    description: "AWB-2026-001234 is now in customs clearance",
    time: "1d ago",
    icon: AlertCircleSvg,
  },
];

const Notifications = () => {
  return (
    <div className="max-w-[533px] w-full border border-neutral-100 rounded-3xl bg-white shadow-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
        <h2 className="font-bold text-black-500">Notifications</h2>
        <span className="px-4 py-1.5 rounded-2xl bg-[#3D8FBE80] text-black text-xs">
          2 new
        </span>
      </div>

      <div className="">
        {notifications.map((item) => (
          <div
            key={item.id}
              className={`flex items-start border-b border-neutral-100 gap-3 px-4 py-3 relative cursor-pointer hover:bg-[#EFF6FF]`}
          >
            <div className="mt-1">
              <item.icon />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#0A0A0A]">{item.title}</p>
                {item.isNew && (
                  <span className="h-2.5 w-2.5 rounded-full bg-[#155DFC]" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#4A5565]">{item.description}</p>
                <div className="text-sm text-gray-500 whitespace-nowrap">
                  {item.time}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center py-4">
        <button className="text-[#3D8FBE] font-medium cursor-pointer">
          Mark all as read
        </button>
      </div>
    </div>
  );
};

export default Notifications;
