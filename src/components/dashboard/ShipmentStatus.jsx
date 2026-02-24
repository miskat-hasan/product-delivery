"use client";
import { GetSingleShipment } from "@/hooks/api/dashboardApi";
import {
  ClockSvg,
  LocationSvg,
  PackageSvg,
  PlaneSvg,
  UsersSvg,
} from "../svg/Svg";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const ShipmentStatus = () => {
  const currentStep = 3;

  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const { data, isLoading } = GetSingleShipment(id);

  const steps = [
    "Created",
    "Accepted",
    "In Customs",
    "Out For Delivery",
    "Delivered",
  ];

  return (
    <div>
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <div className="py-[24px] px-1 md:px-[60px] space-y-[50px]">
          <div className="flex max-sm:gap-4 max-sm:flex-col max-sm:items-start justify-between items-end">
            <div className="space-y-2">
              <Link href={"/dashboard"} className="hover:text-neutral-700">
                ⬅️ Back
              </Link>
              <div className="flex items-center gap-4 mt-2">
                <h4 className="text-lg md:text-2xl lg:text-[30px] font-medium text-black-500">
                  AWB-2024-1234
                </h4>
                <div className="rounded-full max-md:text-sm px-2.5 py-1 bg-[#6F42C11A] text-[#6F42C1] h-fit">
                  With Custom
                </div>
              </div>
              <p className="text-black-300">Created on {data?.data?.created_on}</p>
            </div>
            {/* <button className="flex items-center justify-center px-6 py-2.5 h-fit gap-2.5 rounded-lg border border-blue-500 bg-[#ECF4F9] text-blue-500 font-medium xl:max-w-[533px] xl:w-full">
          <DownloadSvg />
          Download Documents
        </button> */}
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
                      max-sm:text-xs sm:text-sm text-nowrap lg:text-xl z-10
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
                  <p className="text-[#101828] font-medium">
                    {data?.data?.route_information?.airport_of_departure}
                  </p>
                  <div className="flex items-center gap-2 w-full max-w-[356px]">
                    <div className="flex-1 h-[1px] bg-black-300" />
                    <PlaneSvg />
                    <div className="flex-1 h-[1px] bg-black-300" />
                  </div>
                  <p className="text-[#101828] font-medium">
                    {data?.data?.route_information?.airport_of_destination}
                  </p>
                </div>
                <div className="text-[#4A5565] flex items-center justify-between">
                  <p>MIA</p>
                  <p>MGA</p>
                </div>
              </div>
              <div className="p-3 rounded-[14px] flex gap-3 bg-[#EAF6EC]">
                <ClockSvg />
                <div>
                  <p className="text-[#28A745]">Expected Delivery</p>
                  <p className="text-[#1C7731] text-lg font-medium">
                    {data?.data?.route_information?.requested_date}
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
                  <p className="text-[#6A7282]">Weight</p>
                  <p className="text-[#101828] font-medium">
                    {data?.data?.shipment_details?.gross_weight} kg
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-[#6A7282]">Pieces</p>
                  <p className="text-[#101828] font-medium">
                    {data?.data?.shipment_details?.no_of_rcp_pieces} packages
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <p className="text-[#6A7282]">Commodity</p>
                  <p className="text-[#101828] font-medium">
                    {data?.data?.shipment_details?.rate_class}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-[#6A7282]">Declared Value</p>
                  <p className="text-[#101828] font-medium">
                    ${data?.data?.shipment_details?.total}
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
                {data?.data?.parties?.map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <p className="text-[#6A7282] mb-1">{item?.role}</p>
                    <p className="text-[#101828] font-medium">{item?.name}</p>
                    <p className="text-[#6A7282] text-xs">{item?.email}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShipmentStatus;
