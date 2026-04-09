"use client";
import { GetSingleShipment } from "@/hooks/api/dashboardApi";
import {
  ClockSvg,
  DownloadSvg,
  EditPenSVG,
  FileSVG,
  LocationSvg,
  PackageSvg,
  PlaneSvg,
  UsersSvg,
} from "../svg/Svg";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { useState } from "react";

const ShipmentStatus = ({ id }) => {
  const [isEdit, setIsEdit] = useState(false);

  const { data, isLoading } = GetSingleShipment(id);

  const steps = [
    "created",
    "pending",
    "accepted",
    "in customs",
    "out for delivery",
    "delivered",
  ];

  const currentStep = Math.max(0, steps.indexOf(data?.data?.form?.status)) + 1;

  const totalPieces =
    data?.data?.form?.rate_description?.reduce((accumulator, item) => {
      return accumulator + (Number(item.pieces) || 0);
    }, 0) ?? 0;

  const totalValue =
    data?.data?.form?.rate_description?.reduce((accumulator, item) => {
      return accumulator + (Number(item.total) || 0);
    }, 0) ?? 0;

  return (
    <div>
      {isLoading ? (
        <div className="py-[24px] px-1 md:px-[60px] space-y-[50px] animate-pulse">
          {/* Header Skeleton */}
          <div className="flex max-sm:gap-4 max-lg:flex-col max-lg:items-start justify-between items-end">
            <div className="space-y-4">
              <div className="h-4 w-20 bg-gray-200 rounded"></div>{" "}
              {/* Back Link */}
              <div className="flex items-center gap-4">
                <div className="h-10 w-48 bg-gray-200 rounded-md"></div>{" "}
                {/* ID */}
                <div className="h-8 w-24 bg-gray-100 rounded-full"></div>{" "}
                {/* Status */}
              </div>
              <div className="h-4 w-40 bg-gray-100 rounded"></div> {/* Date */}
            </div>
            <div className="flex items-center gap-4">
              <div className="h-11 w-28 bg-gray-200 rounded-lg"></div>{" "}
              {/* Edit btn */}
              <div className="h-11 w-40 bg-gray-200 rounded-lg"></div>{" "}
              {/* Download btn */}
            </div>
          </div>

          {/* Progress Bar Skeleton */}
          <div className="w-full h-10 md:h-12 xl:h-[65px] bg-gray-100 rounded-full"></div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-3 sm:p-6 flex flex-col gap-6 rounded-2xl sm:rounded-3xl border border-gray-100"
              >
                <div className="flex items-center gap-2">
                  <div className="size-6 bg-gray-200 rounded-full"></div>
                  <div className="h-6 w-40 bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-16 w-full bg-gray-50 rounded-xl"></div>
                  <div className="h-16 w-full bg-gray-50 rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="py-[24px] px-1 md:px-[60px] space-y-[50px]">
          <div className="flex max-sm:gap-4 max-lg:flex-col max-lg:items-start justify-between items-end">
            <div className="space-y-2">
              <Link
                href={"/dashboard"}
                className="hover:text-neutral-700 inline-flex gap-2 items-center"
              >
                <FaArrowLeft /> Back
              </Link>
              <div className="flex items-center gap-4 mt-2">
                {data?.data?.form?.serial_id && (
                  <h4 className="text-lg md:text-2xl lg:text-[30px] font-medium text-black-500 text-nowrap">
                    AWB-{data?.data?.form?.serial_id}
                  </h4>
                )}
                {data?.data?.form?.status && (
                  <div className="rounded-full max-md:text-sm px-2.5 py-1 bg-[#6F42C11A] text-[#6F42C1] h-fit capitalize text-nowrap">
                    {data?.data?.form?.status}
                  </div>
                )}
              </div>
              <p className="text-black-300">
                Created on{" "}
                <strong>
                  {new Date(data?.data?.form?.created_at).toLocaleDateString(
                    "en-US",
                    { day: "2-digit", month: "short", year: "numeric" },
                  )}
                </strong>
              </p>
            </div>

            <div className="flex items-center gap-4  max-md:flex-wrap">
              <Link href={`edit?id=${id}`}>
                <button className="flex items-center justify-center px-6 py-2.5 h-fit gap-2.5 rounded-lg border border-blue-500 bg-[#ECF4F9] text-blue-500 font-medium cursor-pointer hover:bg-[#d6e9f5] transition duration-300">
                  <EditPenSVG />
                  Edit
                </button>
              </Link>
              <Link href={`/print-preview?id=${id}`}>
                <button className="flex items-center justify-center px-6 py-2.5 h-fit gap-2.5 rounded-lg border border-blue-500 bg-[#ECF4F9] text-blue-500 font-medium cursor-pointer hover:bg-[#d6e9f5]">
                  <DownloadSvg />
                  Download PDF
                </button>
              </Link>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="relative max-sm:hidden">
            <div className="w-full h-10 md:h-12 xl:h-[65px] bg-[#ECF4F9] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00A63E] rounded-full"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>
            <div className="absolute inset-0 flex">
              {steps.map((step, index) => {
                const isActive = index < currentStep;

                return (
                  <div
                    key={step}
                    className="flex-1 flex items-center justify-center"
                  >
                    <span
                      className={`
                      max-sm:text-xs sm:text-sm text-nowrap lg:text-xl capitalize z-10
                      ${isActive ? "text-white" : "text-[#333333]"}
                    `}
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {/* route info */}
            <div className="p-3 sm:p-6 flex flex-col gap-6 rounded-2xl sm:rounded-3xl border border-black-100">
              <div className="flex items-center gap-2">
                <LocationSvg />
                <h5 className="text-2xl font-medium text-[#0A0A0A]">
                  Route Information
                </h5>
              </div>
              <div>
                <div className="text-[#6A7282] flex items-center justify-between">
                  <p>Origin</p>
                  <p>Destination</p>
                </div>
                <div className="text-[#6A7282] flex items-center justify-between">
                  <p className="text-[#101828] font-medium pr-1">
                    {data?.data?.form?.flights_booking?.departure?.match(
                      /\(([^)]+)\)/,
                    )?.[1] || "N/A"}
                  </p>
                  <div className="flex items-center gap-2 w-full max-w-[356px]">
                    <div className="flex-1 h-[1px] bg-black-300" />
                    <PlaneSvg />
                    <div className="flex-1 h-[1px] bg-black-300" />
                  </div>
                  <p className="text-[#101828] font-medium pl-1">
                    {data?.data?.form?.flights_booking?.destination?.match(
                      /\(([^)]+)\)/,
                    )?.[1] || "N/A"}
                  </p>
                </div>
                <div className="text-[#4A5565] flex items-center justify-between">
                  <p>
                    {
                      data?.data?.form?.flights_booking?.departure?.split(
                        "/",
                      )?.[0]
                    }
                  </p>
                  <p>
                    {
                      data?.data?.form?.flights_booking?.destination?.split(
                        "/",
                      )?.[0]
                    }
                  </p>
                </div>
              </div>
              <div className="p-3 rounded-[14px] flex gap-3 bg-[#EAF6EC]">
                <ClockSvg />
                <div>
                  <p className="text-[#28A745]">Expected Delivery</p>
                  <p className="text-[#1C7731] text-lg font-medium">
                    {data?.data?.form?.flights_booking?.date}
                  </p>
                </div>
              </div>
            </div>
            {/* shipment details */}
            <div className="p-3 sm:p-6 flex flex-col gap-6 rounded-2xl sm:rounded-3xl border border-black-100">
              <div className="flex items-center gap-2">
                <PackageSvg className={"text-black size-6"} />
                <h5 className="text-2xl font-medium text-[#0A0A0A]">
                  Shipment Details
                </h5>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <p className="text-[#6A7282]">Pieces</p>
                  {totalPieces ? (
                    <p className="text-[#101828] font-medium">
                      {totalPieces} packages
                    </p>
                  ) : (
                    "--"
                  )}
                </div>
                <div className="flex flex-col">
                  <p className="text-[#6A7282]">Declared Value</p>
                  {totalValue ? (
                    <p className="text-[#101828] font-medium">${totalValue}</p>
                  ) : (
                    "--"
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <p className="text-[#6A7282]">Total Prepaid</p>
                  <p className="text-[#101828] font-medium">
                    ${data?.data?.form?.charges_summary?.prepaid?.total_prepaid}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-[#6A7282]">Total Collect</p>
                  <p className="text-[#101828] font-medium">
                    ${data?.data?.form?.charges_summary?.collect?.total_collect}
                  </p>
                </div>
              </div>
            </div>
            {/* Parties Involved */}
            <div className="p-3 sm:p-6 flex flex-col gap-6 rounded-2xl sm:rounded-3xl border border-black-100">
              <div className="flex items-center gap-2">
                <UsersSvg />
                <h5 className="text-2xl font-medium text-[#0A0A0A]">
                  Parties Involved
                </h5>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {data?.data?.parties?.length > 0 ? (
                  data?.data?.parties?.map((item, index) => (
                    <div key={index} className="flex flex-col">
                      <p className="text-[#6A7282] mb-1">{item?.role}</p>
                      <p className="text-[#101828] font-medium">{item?.name}</p>
                      <p className="text-[#6A7282] text-xs">{item?.email}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-primary-gray text-sm">No data found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShipmentStatus;
