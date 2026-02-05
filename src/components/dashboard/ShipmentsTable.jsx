"use client"
import { useState } from "react";
import { CheckMarkSvg, ThreeDotSvg } from "../svg/Svg";
import Link from "next/link";

const ShipmentsTable = () => {
  const [openActionBar, setOpenActionBar] = useState(null);

  return (
    <div className="bg-[#FEFEFE] rounded-2xl p-2 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h6 className="text-xl sm:text-2xl text-[#111827] font-medium">Shipments</h6>
        <Link href={'air-waybill'}>
        <button className="flex items-center justify-center max-sm:text-sm px-3 sm:px-6 py-2 sm:py-2.5 gap-2.5 rounded-lg border border-blue-500 bg-[#ECF4F9] text-blue-500 hover:bg-white font-medium cursor-pointer">
          Create New +
        </button>
        </Link>
      </div>

      <div className="bg-white-50 rounded-2xl md:p-6">
        <div className="overflow-x-auto w-full">
         <table className="min-w-[1000px] w-full whitespace-nowrap">
          <thead>
            <tr className="text-left">
              <th className="px-3 sm:text-xl font-medium text-black-500 border-b pb-6 border-[#C0C0C0]">
                AWB Number
              </th>
              <th className="px-3 sm:text-xl font-medium text-black-500 border-b pb-6 border-[#C0C0C0]">
                Status
              </th>
              <th className="px-3 sm:text-xl font-medium text-black-500 border-b pb-6 border-[#C0C0C0]">
                Route
              </th>
              <th className="px-3 sm:text-xl font-medium text-black-500 border-b pb-6 border-[#C0C0C0]">
                Parties
              </th>
              <th className="px-3 sm:text-xl font-medium text-black-500 border-b pb-6 border-[#C0C0C0]">
                Documents
              </th>
              <th className="px-3 sm:text-xl font-medium text-black-500 border-b pb-6 border-[#C0C0C0] text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="max-sm:text-sm">
            {Array(6)
              .fill(null)
              .map((_, idx) => (
                <tr key={idx}>
                  <td className="px-3 py-3.5 text-blue-500 font-medium">
                    AWB-123-12345678
                  </td>
                  <td className="px-3 py-3.5">
                    <span className="p-2.5 rounded-full bg-[#FFF9E6] text-[#FFC107]">
                      Ready for Pickup
                    </span>
                  </td>
                  <td className="px-3 py-3.5 text-black-500">
                    Miami → Managua
                  </td>
                  <td className="px-3 py-3.5">
                    <p className="text-black-300">Agent: John Smith</p>
                    <p className="text-black-300">Broker: Sarah Johnson</p>
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-1 text-[#28A745]">
                      <CheckMarkSvg className="size-4" /> Complete
                    </div>
                  </td>
                  <td className="px-3 py-3.5 relative">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() =>
                          setOpenActionBar((prev) =>
                            prev == null || prev !== idx ? idx : null,
                          )
                        }
                        className="cursor-pointer"
                      >
                        <ThreeDotSvg />
                      </button>
                    </div>
                    {openActionBar == idx && (
                      <div className="bg-white flex flex-col z-[10] absolute w-[120px] right-0 border border-[#EBEBEB] divide-y divide-[#EBEBEB]">
                        <button className="px-4 py-2.5 text-black-500 cursor-pointer w-full">
                          Deleted
                        </button>
                        <Link href={"/shipment-status"}>
                          <button className="px-4 py-2.5 text-black-500 cursor-pointer w-full">
                            Status
                          </button>
                        </Link>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        </div>
      
      </div>
    </div>
  );
};

export default ShipmentsTable;
