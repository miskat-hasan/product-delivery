"use client";
import { useState } from "react";
import { ThreeDotSvg } from "../svg/Svg";
import Link from "next/link";
import { DeleteShipment, GetAllShipments } from "@/hooks/api/dashboardApi";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { BsArrowRight } from "react-icons/bs";

const ShipmentsTable = () => {
  const [openActionBar, setOpenActionBar] = useState(null);

  const queryClient = useQueryClient();

  const [selectedItem, setSelectedItem] = useState(null);

  // get shipment data
  const { data: shipmentsData, isLoading } = GetAllShipments();

  // delete a shipment
  const { mutate: deleteMutation, isPending: deletePending } =
    DeleteShipment(selectedItem);

  const handleDeleteShipment = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this shipment?",
    );

    if (confirmed) {
      setSelectedItem(id);

      deleteMutation(id, {
        onSuccess: (data) => {
          setSelectedItem(null);
          setOpenActionBar(null);
          toast.success(data?.message || "Shipment deleted successfully");
          queryClient.invalidateQueries(["get-all-shipments"]);
        },
        onError: (err) => {
          toast.error(
            err?.response?.data?.message || "Failed to delete shipment",
          );
        },
      });
    }
  };

  return (
    <div className="bg-[#FEFEFE] rounded-2xl p-2 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h6 className="text-xl sm:text-2xl text-[#111827] font-medium">
          Shipments
        </h6>
        <Link href={"/dashboard/air-waybill"}>
          <button className="flex items-center justify-center max-sm:text-sm px-3 sm:px-6 py-2 sm:py-2.5 gap-2.5 rounded-lg border border-blue-500 bg-[#ECF4F9] text-blue-500 hover:bg-white font-medium cursor-pointer">
            Create New +
          </button>
        </Link>
      </div>

      <div className="bg-wite-50 rounded-2xl md:px-6">
        <div className="overflow-x-auto w-full min-h-[200px]">
          <table className="min-w-[1000px] w-full whitespace-nowrap">
            <thead>
              <tr className="text-left">
                <th className="px-3 sm:text-xl font-medium text-black-500 border-b pb-6 border-[#C0C0C0]">
                  AWB Number
                </th>
                <th className="px-3 sm:text-xl font-medium text-black-500 border-b pb-6 border-[#C0C0C0] text-center">
                  Status
                </th>
                <th className="px-3 sm:text-xl font-medium text-black-500 border-b pb-6 border-[#C0C0C0] text-center">
                  Route
                </th>
                <th className="px-3 sm:text-xl font-medium text-black-500 border-b pb-6 border-[#C0C0C0] text-center">
                  Parties
                </th>
                <th className="px-3 sm:text-xl font-medium text-black-500 border-b pb-6 border-[#C0C0C0] text-center">
                  Reports
                </th>
                <th className="px-3 sm:text-xl font-medium text-black-500 border-b pb-6 border-[#C0C0C0] text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="max-sm:text-sm">
              {isLoading
                ? Array(3)
                    .fill(null)
                    .map((_, index) => (
                      <tr
                        key={index}
                        className="animate-pulse border-b border-gray-50"
                      >
                        {/* AWB Number */}
                        <td className="px-3 py-4">
                          <div className="h-4 bg-gray-200 rounded w-24"></div>
                        </td>
                        {/* Status Badge */}
                        <td className="px-3 py-4">
                          <div className="h-8 bg-gray-100 rounded-full w-20"></div>
                        </td>
                        {/* Route */}
                        <td className="px-3 py-4">
                          <div className="h-4 bg-gray-200 rounded w-32"></div>
                        </td>
                        {/* Parties */}
                        <td className="px-3 py-4 space-y-2">
                          <div className="h-3 bg-gray-100 rounded w-20"></div>
                          <div className="h-3 bg-gray-100 rounded w-16"></div>
                        </td>
                        {/* Documents Status */}
                        <td className="px-3 py-4">
                          <div className="flex items-center gap-2">
                            <div className="size-4 bg-gray-200 rounded-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                          </div>
                        </td>
                        {/* Action Button */}
                        <td className="px-3 py-4">
                          <div className="flex justify-center">
                            <div className="size-6 bg-gray-200 rounded-full"></div>
                          </div>
                        </td>
                      </tr>
                    ))
                : shipmentsData?.data?.length > 0
                  ? shipmentsData?.data?.map((item, idx) => (
                      <tr key={item?.id}>
                        <td className="px-3 py-3.5 text-blue-500 font-medium">
                          AWB-{item?.awb_number}
                        </td>
                        <td className="px-3 py-3.5 text-center">
                          <span
                            className={`p-2.5 capitalize rounded-full ${item?.status === "created" ? "text-gray-300 bg-gray-50" : item?.status === "delivered" ? "text-green-400 bg-green-50" : item?.status === "pending"?  "text-[#FFC107] bg-[#FFF9E6]": item?.status === "accepted" ? "text-blue-500 bg-blue-50" : item?.status === "in customs" ? "text-[#FD7E14] bg-[#FD7E141A]" : "text-[#6F42C1] bg-[#6F42C11A]"} `}
                          >
                            {item?.status}
                          </span>
                        </td>
                        <td className="px-3 py-3.5 text-black-500 text-center">
                          <div className="flex items-center gap-2">
                            <p className="flex-1 text-right">
                              {item?.routes?.departure?.match(
                                /\(([^)]+)\)/,
                              )?.[1] || "N/A"}
                            </p>
                            <p className="">
                              <BsArrowRight />
                            </p>
                            <p className="flex-1 text-left">
                              {item?.routes?.destination?.match(
                                /\(([^)]+)\)/,
                              )?.[1] || "N/A"}
                            </p>
                          </div>
                        </td>
                        <td className="px-3 py-3.5 text-center">
                          {item?.parties?.map((item, index) => (
                            <p key={index} className="text-black-300">
                              {item}
                            </p>
                          ))}
                        </td>
                        <td className="px-3 py-3.5 text-center">
                          <div className="text-primary-black truncate">
                            {item?.documents ?? "N/A"}
                          </div>
                        </td>
                        <td className="px-3 py-3.5 flex">
                          <div className="relative inline-block mx-auto">
                            <div className="flex items-center justify-center">
                              <button
                                onClick={() =>
                                  setOpenActionBar((prev) =>
                                    prev == null || prev !== idx ? idx : null,
                                  )
                                }
                                className={`cursor-pointer`}
                              >
                                <ThreeDotSvg
                                  className={
                                    openActionBar == idx &&
                                    "text-blue-500 scale-125"
                                  }
                                />
                              </button>
                            </div>
                            <div
                              className={`bg-white flex flex-col absolute w-[90px] text-sm rounded-md right-0 z-10 border overflow-hidden border-[#EBEBEB] divide-y divide-[#EBEBEB] duration-300 transition ${shipmentsData?.data?.length > 3 && idx > shipmentsData?.data?.length - 3 ? "bottom-4 origin-bottom-right" : " origin-top-right"} ${openActionBar == idx ? "opacity-100 scale-100" : "opacity-0  scale-0"}`}
                            >
                              <button
                                onClick={() => handleDeleteShipment(item?.id)}
                                className={`px-3 py-1.5 hover:bg-gray-100 transition duration-300 text-black-500 w-full ${deletePending ? "cursor-not-allowed" : "cursor-pointer"}`}
                                disabled={deletePending}
                              >
                                {deletePending ? "Deleting ..." : "Delete"}
                              </button>
                              <Link
                                href={`/dashboard/shipment-status/${item?.id}`}
                              >
                                <button className="px-3 py-1.5 text-black-500 cursor-pointer w-full hover:bg-gray-100 transition duration-300">
                                  Status
                                </button>
                              </Link>
                              <Link href={`/print-preview?id=${item?.id}`}>
                                <button className="px-3 py-1.5 text-black-500 cursor-pointer w-full hover:bg-gray-100 transition duration-300">
                                  Export
                                </button>
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  : "No data found"}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShipmentsTable;
