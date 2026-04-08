"use client";
import {
  GetSingleShipment,
  useUpdateFormStatus,
} from "@/hooks/api/dashboardApi";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { useEffect, useState } from "react";
import {
  ClockSvg,
  LocationSvg,
  PackageSvg,
  PlaneSvg,
  UsersSvg,
} from "@/components/svg/Svg";
import { useForm } from "react-hook-form";

const Page = () => {
  const params = useSearchParams();

  const id = params.get("id");

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "",
      report: "",
    },
  });

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

  useEffect(() => {
    if (data) {
      reset({
        status: data?.data?.form?.status || "",
        report: data?.data?.form?.report || "",
      });
    }
  }, [data, reset]);

  const { mutate, isPending } = useUpdateFormStatus(id);

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="py-[24px] px-1 md:px-[60px] space-y-[50px]"
        >
          <div className="flex max-sm:gap-4 max-sm:flex-col max-sm:items-start justify-between items-end">
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
                Created on {data?.data?.form?.created_on}
              </p>
            </div>

            <div>
              <p className="text-primary-black mb-2">Change the Status</p>
              <select
                {...register("status")}
                className="flex w-[221px] p-[16px] justify-between items-center rounded-[16px] border border-black-100 bg-[#F5F5F5] text-[#6B6B6B] cursor-pointer"
              >
                <option value={"created"}>Created</option>
                <option value={"pending"}>Pending</option>
                <option value={"Accepted"}>Accepted</option>
                <option value={"in_customs"}>In Customs</option>
                <option value={"out_for_delivery"}>Out For Delivery</option>
                <option value={"delivered"}>Delivered</option>
              </select>
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
                    {data?.data?.route_information?.departure?.match(
                      /\(([^)]+)\)/,
                    )?.[1] || "N/A"}
                  </p>
                  <div className="flex items-center gap-2 w-full max-w-[356px]">
                    <div className="flex-1 h-[1px] bg-black-300" />
                    <PlaneSvg />
                    <div className="flex-1 h-[1px] bg-black-300" />
                  </div>
                  <p className="text-[#101828] font-medium pl-1">
                    {data?.data?.route_information?.destination?.match(
                      /\(([^)]+)\)/,
                    )?.[1] || "N/A"}
                  </p>
                </div>
                <div className="text-[#4A5565] flex items-center justify-between">
                  <p>
                    {data?.data?.route_information?.departure?.split("/")?.[0]}
                  </p>
                  <p>
                    {
                      data?.data?.route_information?.destination?.split(
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
                    {data?.data?.route_information?.date}
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

          <div className="flex flex-col">
            <p className="text-primary-black mb-2">Report</p>
            <textarea
              rows={4}
              {...register("report")}
              className="text-primary-black p-4 rounded-2xl border border-black-100 w-full bg-[#FEFEFE]"
            ></textarea>
            <div className="flex items-center justify-end mt-4">
              <button
                type="submit"
                disabled={isPending}
                className="px-6 py-2.5 rounded-2xl border border-blue-500 bg-[#ECF4F9] text-blue-500 font-medium cursor-pointer hover:bg-[#d4ecfc] transition duration-300 disabled:opacity-70"
              >
                {isPending ? "Saving ..." : "Save Change"}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Page;
