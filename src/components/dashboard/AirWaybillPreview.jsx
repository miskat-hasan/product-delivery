"use client";
import { FiDownload } from "react-icons/fi";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GetSingleAirWayBill } from "@/hooks/api/dashboardApi";
import useAuth from "@/hooks/useAuth";
import { IoMdCheckmark } from "react-icons/io";
import Image from "next/image";

const AirWaybillPreview = () => {
  const searchParams = useSearchParams();

  const router = useRouter();
  const { token, user } = useAuth();

  useEffect(() => {
    if (!token && !user) {
      router.replace("/login");
      return;
    }
  }, [token, user, router]);

  const id = searchParams.get("id");

  const { data, isLoading } = GetSingleAirWayBill(id);

  const billData = data?.data;
  console.log(billData);
  const captureForm = () => {
    // Inject a temporary style to force background graphics
    const style = document.createElement("style");
    style.id = "print-override";
    style.innerHTML = `
  @media print {
    @page {
      size: A2 portrait;
      margin: 0.5cm;
    }

    body * { visibility: hidden; }
    #capture-area, #capture-area * { visibility: visible; }
    button, .no-print { display: none !important; }

    #capture-area {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: auto !important;
      margin: 0 !important;
      padding: 0 !important;
      box-shadow: none !important;
    }

    html, body {
      margin: 0 !important;
      padding: 0 !important;
    }
  }
`;
    document.head.appendChild(style);

    window.print();
    setTimeout(() => {
      const el = document.getElementById("print-override");
      if (el) el.remove();
    }, 1000);
  };
  const totalPieces = billData?.rate_description?.reduce(
    (accumulator, item) => {
      return accumulator + (Number(item.pieces) || 0);
    },
    0,
  );

  const grossWeight = billData?.rate_description?.reduce(
    (accumulator, item) => {
      return accumulator + (Number(item.gross_weight) || 0);
    },
    0,
  );

  const grandTotalRateDescription = billData?.rate_description?.reduce(
    (accumulator, item) => {
      return accumulator + (Number(item.total) || 0);
    },
    0,
  );

  return (
    <div className="overflow-x-auto">
      {isLoading ? (
        <p className="text-center py-5">Loading Preview ...</p>
      ) : (
        <div className="w-[1500px] mx-auto">
          <button
            onClick={captureForm}
            className="top-6 transition size-12 text-2xl flex items-center justify-center bg-white border-black border-2 hover:bg-black hover:text-white rounded cursor-pointer absolute right-10"
          >
            <FiDownload />
          </button>
          <div id="capture-area">
            <div className="w-full max-w-[1218px] mx-auto py-10 bg-white">
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <span></span>
                  <p className="text-red-500 font-bold text-xl -mr-20">ORIGINAL</p>
                  <h5 className="flex text-xl font-bold justify-end text-blue-500">
                    {billData?.consignment_details?.airline_prefix} -{" "}
                    {billData?.consignment_details?.serial_number}
                  </h5>
                </div>
                <div className="border-2 relative">
                  <div className="absolute -top-[45px] flex">
                    <p className="w-[61px] text-blue-500 flex text-xl flex-col justify-end text-end font-bold pb-2 pr-1">
                      {billData?.consignment_details?.airline_prefix}
                    </p>
                    <div className="w-[61px] h-[45px] text-xl uppercase text-center pb-2 flex flex-col justify-end font-bold border-l-2 border-r-2">
                      {billData?.consignment_details?.origin?.split("/")[0]}
                    </div>
                    <p className="text-blue-500 flex flex-col justify-end text-xl text-end font-bold pb-2 pl-1">
                      {billData?.consignment_details?.serial_number}
                    </p>
                  </div>
                  {/* separator */}
                  <div className="w-full flex border-b-2">
                    {/* left side */}
                    <div className="preview-left-side flex flex-col">
                      <div className="grid grid-cols-2">
                        <div className="px-2 flex flex-col">
                          <p className="text-black text-sm">
                            Shipper&rsquo;s Name and Address
                          </p>
                        </div>
                        <div className="text-black text-sm border-b-2 border-l-2 flex justify-between flex-col items-center h-[60px]">
                          <p>Shipper&rsquo;s Account Number</p>
                          <p className="text-xl pb-2">
                            {billData?.shipper?.account_number}
                          </p>
                        </div>
                        <div className="px-1 tracking-tight col-span-2">
                          <p className="font-medium">
                            {billData?.shipper?.name_address}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* right side */}
                    <div className="flex flex-col preview-right-side border-l-2">
                      <div className="px-2 relative">
                        {billData?.logo && (
                          <div className="absolute right-1 top-0">
                            <figure className="h-14">
                              <img
                                src={
                                  process.env.NEXT_PUBLIC_SITE_URL +
                                  "/" +
                                  billData?.logo
                                }
                                width={100}
                                height={80}
                                alt="logo"
                                className="object-cover size-full"
                              />
                            </figure>
                          </div>
                        )}
                        <p className="text-sm">Not Negotiable</p>
                        <h3 className="text-[27.5px] font-bold">Air Waybill</h3>
                        <div className="pt-2">
                          <p className="text-sm">Issued by</p>
                          <p className="text-xl">{billData?.issued_by}</p>
                        </div>
                      </div>
                      <div className="border-t-2 p-2 text-sm mt-auto">
                        Copies 1, 2 and 3 of this Air Waybill are originals and
                        have the same validity.
                      </div>
                    </div>
                  </div>
                  {/* separator */}
                  <div className="w-full flex border-b-2">
                    {/* left */}
                    <div className="preview-left-side">
                      <div className="grid grid-cols-2">
                        <div className="px-2 flex flex-col">
                          <p className="text-black text-sm">
                            Consignee&rsquo;s Name and Address
                          </p>
                        </div>
                        <div className="text-black text-sm border-b-2 border-l-2 flex justify-between flex-col items-center h-[60px] bg-[#DFDFDF">
                          <p>Consignee&rsquo;s Account Number</p>
                          <p className="text-xl pb-2">
                            {billData?.consignee?.account_number}
                          </p>
                        </div>
                        <div className="px-1 tracking-tight col-span-2">
                          <p className="font-medium">
                            {billData?.consignee?.name_address}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* right */}
                    <div className="preview-right-side p-2 text-[11px] border-l-2">
                      It is agreed that the goods described herein are accepted
                      in apparent good order and condition (except as noted) for
                      carriage SUBJECT TO THE CONDITIONS OF CONTRACT ON THE
                      REVERSE HEREOF. ALL GOODS MAY BE CARRIED BY ANY OTHER
                      MEANS INCLUDING ROAD OR ANY OTHER CARRIER UNLESS SPECIFIC
                      CONTRARY INSTRUCTIONS ARE GIVEN HEREON BY THE SHIPPER, AND
                      SHIPPER AGREES THAT THE SHIPMENT MAY BE CARRIED VIA
                      INTERMEDIATE STOPPING PLACES WHICH THE CARRIER DEEMS
                      APPROPRIATE. THE SHIPPER&rsquo;S ATTENTION IS DRAWN TO THE
                      NOTICE CONCERNING CARRIER&rsquo;S LIMITATION OF LIABILITY.
                      Shipper may increase such limitation of liability by
                      declaring a higher value for carriage and paying a
                      supplemental charge if required.
                    </div>
                  </div>
                  {/* separator */}
                  <div className="w-full flex border-b-2">
                    {/* left */}
                    <div className="preview-left-side">
                      <div className="px-[10px] border-b-2">
                        <div className="flex flex-col justify-between">
                          <p className="text-sm">
                            Issuing Carrier&rsquo;s Agent Name and City
                          </p>
                          <p className="font-medium tracking-tight">
                            {billData?.agent?.name_address}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="text-black text-sm flex flex-col px-2.5">
                          <p className="text-sm">Agent&rsquo;s IATA Code</p>
                          <p className="text-lg pb-2 font-medium text-center">
                            {billData?.agent?.iata_code}
                          </p>
                        </div>
                        <div className="text-black text-sm border-l-2 flex flex-col px-2.5">
                          <p className="text-sm">Account No.</p>
                          <p className="text-lg pb-2 font-medium text-center">
                            {billData?.agent?.account_number}
                          </p>
                        </div>
                      </div>
                      <div className="preview-left-side flex flex-col px-2 border-t-2">
                        <div className="text-sm">
                          Airport of Departure (Addr. of First Carrier) and
                          Requested Routing
                        </div>
                        <p className="pb-2 font-medium text-center">
                          {billData?.flights_booking?.departure
                            ?.replace(/\(.*?\)$/, "")
                            .trim()}
                        </p>
                      </div>
                    </div>
                    {/* right */}
                    <div className="preview-right-side text-sm px-2 flex flex-col border-l-2">
                      <p>Accounting Information</p>
                      <p className="text-lg text-center font-medium">
                        {billData?.accounting_info}
                      </p>
                    </div>
                  </div>
                  {/* separator */}
                  {/* <div className="w-full flex border-b-2"> */}
                  {/* left */}
                  {/* <div className="preview-left-side flex flex-col px-2">
                      <div className="text-sm">
                        Airport of Departure (Addr. of First Carrier) and
                        Requested Routing
                      </div>
                      <p className="pb-2 font-medium text-center">
                        {billData?.flights_booking?.departure}
                      </p>
                    </div> */}
                  {/* right */}
                  {/* <div className="preview-right-side border-l-2">
                      <div className="flex relative">
                        <div className="absolute flex flex-col text-[11.75px] top-0.5 left-5 text-nowrap">
                          <p>Reference Number</p>
                          <p className="text-lg pb-2">
                            {billData?.flights_booking?.reference_number}
                          </p>
                        </div>
                        <div className="mx-auto relative">
                          <p className="left-1/2 absolute -translate-x-1/2 text-[11.75px] text-nowrap">
                            Optional Shipping Information
                          </p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="302"
                            height="30"
                            viewBox="0 0 462 57"
                            fill="none"
                          >
                            <path
                              d="M0.693359 0.701172L55.8079 55.4338H405.392L460.998 0.701172"
                              stroke="black"
                              strokeWidth="1.9688"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="flex">
                        <div className="w-[250.7px]" />
                        <div className="h-[30px] flex-1 text-sm leading-none border-l-2 border-r-2 pb-2">
                          {billData?.flights_booking?.optional_shipping_1}
                        </div>
                        <div className="w-[250.11px] text-sm">
                          {billData?.flights_booking?.optional_shipping_2}
                        </div>
                      </div>
                    </div> */}
                  {/* </div> */}
                  {/* separator */}
                  <div className="w-full flex border-b-2">
                    {/* left */}
                    <div className="preview-left-side flex h-[70.471px]">
                      <div className="w-[74.814px] text-xs p-0.5 h-full border-r-2 flex flex-col">
                        <p className="text-sm px-1 font-medium">To</p>
                        <p className="leading-none uppercase">
                          {
                            billData?.flights_booking?.route?.to_first_carrier?.split(
                              "/",
                            )[0]
                          }
                        </p>
                      </div>
                      <div>
                        <div className="flex pr-2">
                          <p className="ml-0.5 text-sm">By First Carrier</p>
                          <div className="relative flex">
                            <p className="absolute text-nowrap text-[11px] top-0.5 left-1/2 -translate-x-1/2">
                              Routing and Destination
                            </p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="211"
                              height="30"
                              viewBox="0 0 211 28"
                              fill="none"
                              className="-mt-[1px]"
                            >
                              <path
                                d="M0.711914 0.683594L25.6997 26.8686H184.194L209.404 0.683594"
                                stroke="black"
                                strokeWidth="1.9688"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="px-2 uppercase">
                          {
                            billData?.flights_booking?.route?.by_first_carrier?.split(
                              "/",
                            )[0]
                          }
                        </div>
                      </div>
                      <div className="w-[60px] text-sm px-1 font-medium h-full border-l-2">
                        to
                        <p className="leading-none uppercase">
                          {
                            billData?.flights_booking?.route?.to_second_carrier?.split(
                              "/",
                            )[0]
                          }
                        </p>
                      </div>
                      <div className="w-[55px] text-sm px-1 font-medium h-full border-l-2">
                        by
                        <p className="leading-none uppercase">
                          {
                            billData?.flights_booking?.route?.by_second_carrier?.split(
                              "/",
                            )[0]
                          }
                        </p>
                      </div>
                      <div className="w-[60px] text-sm px-1 font-medium h-full border-l-2">
                        to
                        <p className="leading-none uppercase">
                          {
                            billData?.flights_booking?.route?.to_third_carrier?.split(
                              "/",
                            )[0]
                          }
                        </p>
                      </div>
                      <div className="w-[55px] text-sm px-1 font-medium h-full border-l-2">
                        by
                        <p className="leading-none uppercase">
                          {
                            billData?.flights_booking?.route?.by_third_carrier?.split(
                              "/",
                            )[0]
                          }
                        </p>
                      </div>
                    </div>
                    {/* right side */}
                    <div className="preview-right-side border-l-2 flex">
                      <div className="text-[11px] border-r-2 w-[60px]">
                        Currency
                        <p className="leading-none text-xl font-medium uppercase text-center">
                          {billData?.charges_declaration?.currency}
                        </p>
                      </div>
                      <div className="text-[10px] border-r-2 w-[37px]">
                        CHGS <br />
                        Code
                        <p className="leading-none text-lg font-medium uppercase text-center">
                          {billData?.charges_declaration?.chcg}
                        </p>
                      </div>
                      <div className="w-[76px] flex flex-col h-full">
                        <p className="border-b-2 border-r-2 text-[11px] pb-1.5 text-center">
                          WT/VAL
                        </p>
                        <div className="flex flex-1">
                          <div className="text-[11px] text-center border-r-2 flex-1">
                            PPD
                            <p className="leading-none text-center">
                              {billData?.charges_declaration?.wt_val ===
                                "ppd" && (
                                <IoMdCheckmark size={18} className="mx-auto" />
                              )}
                            </p>
                          </div>
                          <div className="text-[11px] text-center border-r-2 flex-1">
                            COLL
                            <p className="leading-none">
                              {billData?.charges_declaration?.wt_val ===
                                "coll" && (
                                <IoMdCheckmark size={18} className="mx-auto" />
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="w-[77px] flex flex-col h-full">
                        <p className="border-b-2 text-[11px] text-center pb-1.5">
                          Other
                        </p>
                        <div className="flex flex-1">
                          <div className="text-[11px] text-center border-r-2 flex-1">
                            PPD
                            <p className="leading-none">
                              {billData?.charges_declaration?.other ===
                                "ppd" && (
                                <IoMdCheckmark size={18} className="mx-auto" />
                              )}
                            </p>
                          </div>
                          <div className="text-[11px] text-center flex-1">
                            COLL
                            <p className="leading-none">
                              {billData?.charges_declaration?.other ===
                                "coll" && (
                                <IoMdCheckmark size={18} className="mx-auto" />
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="w-[130px] text-[9px] text-center border-l-2">
                        Declared Value for Carriage
                        <p className="leading-none text-xl font-medium">
                          {billData?.charges_declaration?.value_for_carriage}
                        </p>
                      </div>
                      <div className="text-[9px] text-center pl-1 border-l-2">
                        Declared Value for Customs
                        <p className="leading-none text-xl font-medium">
                          {billData?.charges_declaration?.value_for_customs}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* separator */}
                  <div className="w-full flex border-b-2">
                    {/* left */}
                    <div className="preview-left-side grid grid-cols-2">
                      <div className="border-2 text-sm text-center pb-2">
                        Airport of Destination
                        <p className="text-lg">
                          {billData?.flights_booking?.destination
                            ?.replace(/\(.*?\)$/, "")
                            .trim()}
                        </p>
                      </div>
                      <div className="border-l-2">
                        <div className="relative flex justify-center">
                          <p className="absolute text-sm left-1/2 -translate-x-1/2 text-nowrap">
                            Requested Flight/Date
                          </p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="248"
                            height="40"
                            viewBox="0 0 248 55"
                            fill="none"
                            // className="mx-auto"
                          >
                            <path
                              d="M0.859375 0.482422L30.279 53.2462H216.883L246.565 0.482422"
                              stroke="black"
                              strokeWidth="1.9688"
                            />
                          </svg>
                        </div>

                        <div className="grid grid-cols-2">
                          <div className="border-r-2 h-[47.785px] px-1 py-1 font-medium text-center leading-none">
                            {billData?.flights_booking?.flight}
                          </div>
                          <div className="px-2 py-1 font-medium text-center">
                            {billData?.flights_booking?.date}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* right */}
                    <div className="preview-right-side border-l-2 flex">
                      <div className="text-sm pb-2 px-1.5 border-r-2">
                        Amount of Insurance
                        <p className="text-lg font-medium text-center">
                          {billData?.charges_declaration?.amount_of_insurance}
                        </p>
                      </div>
                      <div className="flex-1 px-2.5 text-[11px]">
                        INSURANCE – If carrier offers insurance, and such
                        insurance is requested in accordance with the conditions
                        thereof, indicate amount to be insured in figures in box
                        marked &quot;Amount of Insurance&quot;.
                      </div>
                    </div>
                  </div>
                  {/* separator */}
                  <div className="w-full h-[170.104px] border-b-2 flex justify-between">
                    <div className="flex-1 mt-1 mx-2.5">
                      Handling Information
                      <p className="text-xl text-center">
                        {billData?.handling_info?.requirements}
                      </p>
                    </div>
                    <div className="h-[55.602px] w-[230px] border-l-2 border-t-2 ml-auto text-center self-end-safe px-1">
                      SCI
                      <p className="text-lg">{billData?.handling_info?.sci}</p>
                    </div>
                  </div>
                  {/* separator */}
                  <div className="min-h-[500px] h-full border-b-2 flex">
                    <div className="w-[75.602px] border-r-2 flex justify-between flex-col">
                      <div>
                        <div className="px-2 py-1 border-b-2 h-[68px] leading-none">
                          No. of RCP Pieces
                        </div>
                        <div className="p-1 text-center">
                          {billData?.rate_description?.map((item, index) => (
                            <p key={index} className="text-lg font-medium">
                              {item?.pieces}
                            </p>
                          ))}
                        </div>
                      </div>
                      <div className="w-full h-[68px] border-t-2 text-center font-medium">
                        {totalPieces}
                      </div>
                    </div>
                    <div className="w-[132.303px] border-r-2 flex justify-between flex-col">
                      <div>
                        <div className="px-2 py-1 border-b-2 h-[68px] text-center">
                          Gross <br /> Weight
                        </div>
                        <div className="p-1 text-center">
                          {billData?.rate_description?.map((item, index) => (
                            <p key={index} className="text-lg font-medium">
                              {item?.gross_weight}
                            </p>
                          ))}
                        </div>
                      </div>
                      <div className="w-full h-[68px] border-t-2 text-center font-medium">
                        {grossWeight}
                      </div>
                    </div>
                    <div className="w-[20.279px] border-r-2 flex justify-between flex-col">
                      <div className="text-center">
                        <p className="py-1 border-b-2 h-[68px]">
                          kg <br />
                          lb
                        </p>
                        <div className="text-center">
                          {" "}
                          {billData?.rate_description?.map((item, index) => (
                            <p key={index} className="text-lg font-medium">
                              {item?.k_l}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="w-[22.838px] bg-[#D9D9D9] border-r-2" />
                    <div className="flex">
                      <div className="w-[18.9px]" />
                      <div className="w-[130.334px] border-r-2 flex flex-col">
                        <div>
                          <p className="pb-2">Rate Class</p>
                          <p className="text-[11px] leading-none pb-[10px] border-y-2 border-l-2 text-center">
                            Commodity <br />
                            Item No.
                          </p>
                          <div className="p-1 border-l-2 text-center">
                            {billData?.rate_description?.map((item, index) => (
                              <p key={index} className="text-lg font-medium">
                                {item?.item_no}
                              </p>
                            ))}
                          </div>
                        </div>
                        <div className="flex-1 border-l-2" />
                      </div>
                    </div>
                    <div className="w-[18.9px] bg-[#D9D9D9] border-r-2" />
                    <div className="w-[132.303px] border-r-2">
                      <div>
                        <div className="text-center h-[68px] border-b-2 text-lg leading-none pb-2 flex pt-0.5 justify-center">
                          Chargeable
                          <br /> Weight
                        </div>
                        <div className="p-1 text-center">
                          {billData?.rate_description?.map((item, index) => (
                            <p key={index} className="text-lg font-medium">
                              {item?.charge_weight}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="w-[18.9px] bg-[#D9D9D9] border-r-2" />
                    <div className="w-[151.204px] border-r-2">
                      <div className="h-[68px] border-b-2 flex py-2 px-2 relative">
                        <p className="">Rate</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="66"
                          height="45"
                          viewBox="0 0 66 45"
                          fill="none"
                        >
                          <line
                            x1="65.4062"
                            y1="0.656172"
                            x2="0.435828"
                            y2="43.7729"
                            stroke="black"
                            strokeWidth="1.57504"
                          />
                        </svg>
                        {/* <div className="w-[77.976px] bg-black h-[1px] -rotate-45" /> */}
                        <p className="self-end">Charge</p>
                      </div>
                      <div className="p-1 text-center">
                        {billData?.rate_description?.map((item, index) => (
                          <p key={index} className="text-lg font-medium">
                            ${item?.rate_charge}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="w-[18.9px] bg-[#D9D9D9] border-r-2" />
                    <div className="w-[226.806px] border-r-2 flex flex-col justify-between">
                      <div>
                        <div className="text-center h-[68px] text-xl border-b-2 flex pb-2 pt-0.5 justify-center">
                          Total
                        </div>
                        <div className="p-1 text-center">
                          {billData?.rate_description?.map((item, index) => (
                            <p key={index} className="text-lg font-medium">
                              ${item?.total}
                            </p>
                          ))}
                        </div>
                      </div>
                      <div className="w-full h-[68px] border-t-2 text-lg font-medium text-center">
                        ${grandTotalRateDescription}
                      </div>
                    </div>
                    <div className="w-[18.9px] bg-[#D9D9D9] border-r-2" />
                    <div className="flex flex-col pb-2 pt-0.5 flex-1">
                      <p className="max-w-[284px] text-sm mx-auto text-center w-[418.173px] h-[68px] text-xl border-b-2 flex flex-col pb-2 pt-0.5 justify-center">
                        Nature and Quantity of Goods (incl. Dimensions or
                        Volume)
                      </p>
                      <div className="text-center">
                        {billData?.rate_description?.map((item, index) => (
                          <p key={index} className="text-lg font-medium">
                            {item?.nature_and_quantity}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* separator */}
                  <div className="w-full flex">
                    {/* mini left */}
                    <div className="mini-preview-left-side border-r-2">
                      {/* prepaid */}
                      <div className="border-b-2">
                        <div className="px-[18.9px] flex">
                          <div className="relative">
                            <p className="absolute top-[-2px] text-sm left-1/2 -translate-x-1/2">
                              Prepaid
                            </p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="134"
                              height="29"
                              viewBox="0 0 134 29"
                              fill="none"
                            >
                              <path
                                d="M0.845703 0.507812L16.687 27.0866H117.166L133.149 0.507812"
                                stroke="black"
                                strokeWidth="1.9688"
                              />
                            </svg>
                          </div>
                          <div className="relative">
                            <p className="absolute top-[-2px] text-sm left-1/2 -translate-x-1/2">
                              Weight Charge
                            </p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="229"
                              height="29"
                              viewBox="0 0 229 29"
                              fill="none"
                            >
                              <path
                                d="M0.803711 0.583984L19.6273 27.1628H207.982L227.609 0.583984"
                                stroke="black"
                                strokeWidth="1.9688"
                              />
                            </svg>
                          </div>
                          <div className="relative">
                            <p className="absolute top-[-2px] text-sm left-1/2 -translate-x-1/2">
                              Collect
                            </p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="134"
                              height="29"
                              viewBox="0 0 134 29"
                              fill="none"
                            >
                              <path
                                d="M0.845703 0.507812L16.687 27.0866H117.166L133.149 0.507812"
                                stroke="black"
                                strokeWidth="1.9688"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="border-r-2 h-[32.023px] px-1 text-center font-medium">
                            ${billData?.charges_summary?.prepaid?.weight_charge}
                          </div>
                          <div className="px-1 text-center font-medium">
                            ${billData?.charges_summary?.collect?.weight_charge}
                          </div>
                        </div>
                      </div>
                      {/* Valuation Charge */}
                      <div className="border-b-2">
                        <div className="px-[18.9px] flex">
                          <div className="relative mx-auto">
                            <p className="absolute top-[-2px] text-sm left-1/2 -translate-x-1/2">
                              Valuation Charge
                            </p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="267"
                              height="29"
                              viewBox="0 0 267 29"
                              fill="none"
                            >
                              <path
                                d="M0.758789 0.642578L22.7196 27.2214H242.467L265.365 0.642578"
                                stroke="black"
                                strokeWidth="1.9688"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="border-r-2 h-[32.023px] px-1 text-center font-medium">
                            $
                            {
                              billData?.charges_summary?.prepaid
                                ?.valuation_charge
                            }
                          </div>
                          <div className="px-1 text-center font-medium">
                            $
                            {
                              billData?.charges_summary?.collect
                                ?.valuation_charge
                            }
                          </div>
                        </div>
                      </div>
                      {/* Tax */}
                      <div className="border-b-2">
                        <div className="px-[18.9px] flex">
                          <div className="relative mx-auto">
                            <p className="absolute top-[-2px] text-sm left-1/2 -translate-x-1/2">
                              Tax
                            </p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="153"
                              height="28"
                              viewBox="0 0 153 28"
                              fill="none"
                            >
                              <path
                                d="M0.890625 0.435547L13.4397 27.0143H139.01L152.094 0.435547"
                                stroke="black"
                                strokeWidth="1.9688"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="border-r-2 h-[32.023px] px-1 text-center font-medium">
                            ${billData?.charges_summary?.prepaid?.tax}
                          </div>
                          <div className="px-1 text-center font-medium">
                            ${billData?.charges_summary?.collect?.tax}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* right */}
                    <div className="py-[2px] px-1.5 border-b-2 w-full flex flex-col">
                      Other Charges
                      <div className="pt-2 text-lg font-medium flex flex-wrap gap-3 uppercase">
                        {billData?.other_charges?.map((item, i) => (
                          <p key={i}>
                            {item?.description}: ${item?.amount}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* separator */}
                  <div className="w-full flex border-b-2">
                    {/* mini left */}
                    <div className="mini-preview-left-side !shrink-0 border-r-2">
                      {/* Total Other Charges Due Agent */}
                      <div className="border-b-2">
                        <div className="px-[18.9px] flex">
                          <div className="relative mx-auto">
                            <p className="absolute top-[-2px] text-sm left-1/2 -translate-x-1/2 text-nowrap">
                              Total Other Charges Due Agent
                            </p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="417"
                              height="29"
                              viewBox="0 0 417 29"
                              fill="none"
                            >
                              <path
                                d="M0.600586 0.791016L35.1105 27.3698H380.428L416.411 0.791016"
                                stroke="black"
                                strokeWidth="1.9688"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="border-r-2 h-[32.023px] px-1 text-lg font-medium text-center">
                            $
                            {
                              billData?.charges_summary?.prepaid
                                ?.other_charges_due_agent
                            }
                          </div>
                          <div className="px-1 text-lg font-medium text-center">
                            $
                            {
                              billData?.charges_summary?.collect
                                ?.other_charges_due_agent
                            }
                          </div>
                        </div>
                      </div>
                      {/* Total Other Charges Due Carrier */}
                      <div className="border-b-2">
                        <div className="px-[18.9px] flex">
                          <div className="relative mx-auto">
                            <p className="absolute top-[-2px] text-sm left-1/2 -translate-x-1/2 text-nowrap">
                              Total Other Charges Due Carrier
                            </p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="417"
                              height="29"
                              viewBox="0 0 417 29"
                              fill="none"
                            >
                              <path
                                d="M0.600586 0.791016L35.1105 27.3698H380.428L416.411 0.791016"
                                stroke="black"
                                strokeWidth="1.9688"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="border-r-2 h-[32.023px] px-1 text-lg font-medium text-center">
                            $
                            {
                              billData?.charges_summary?.prepaid
                                ?.other_charges_due_carrier
                            }
                          </div>
                          <div className="px-1 text-lg font-medium text-center">
                            $
                            {
                              billData?.charges_summary?.collect
                                ?.other_charges_due_carrier
                            }
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 divide-x-2">
                        <div className="min-h-[35.602px] h-full bg-[#D9D9D9]" />
                        <div className="min-h-[35.602px] h-full bg-[#D9D9D9]" />
                      </div>
                    </div>
                    {/* right side */}
                    <div className="w-full flex flex-col justify-between">
                      <p className="px-[3px] text-sm">
                        Shipper certifies that the particulars on the face
                        hereof are correct and that{" "}
                        <span className="font-bold">
                          insofar as any part of the consignment contains
                          dangerous goods, such part is properly described by
                          name and is in proper condition for carriage by air
                          according to the applicable Dangerous Goods
                          Regulations.
                        </span>{" "}
                      </p>
                      <div>
                        <p className="text-center uppercase text-lg font-medium">
                          {billData?.shipper_certification?.signature}
                        </p>
                        <div className="max-w-[513.463px] w-full mx-auto border-t-2 border-dashed text-center pb-2 pt-[8px]">
                          <p>Signature of Shipper or his Agent</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* separator */}
                  <div className="w-full flex">
                    {/* mini left */}
                    <div className="mini-preview-left-side shrink-0 border-r-2">
                      {/* Total prepaid & total collect */}
                      <div className="grid grid-cols-2 divide-x-2 border-b-2 h-[60.602px]">
                        <div className="flex flex-col">
                          <div className="relative w-full flex justify-center">
                            <p className="absolute top-[-2px] text-sm left-1/2 -translate-x-1/2 text-nowrap">
                              Total Prepaid
                            </p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="229"
                              height="29"
                              viewBox="0 0 229 29"
                              fill="none"
                              // className="mx-auto"
                            >
                              <path
                                d="M0.803711 0.583984L19.6273 27.1628H207.982L227.609 0.583984"
                                stroke="black"
                                strokeWidth="1.9688"
                              />
                            </svg>
                          </div>
                          <div className="px-1 text-lg font-medium text-center">
                            ${billData?.charges_summary?.prepaid?.total_prepaid}
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="relative w-full flex justify-center">
                            <p className="absolute top-[-2px] text-sm left-1/2 -translate-x-1/2 text-nowrap">
                              Total Collect
                            </p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="229"
                              height="29"
                              viewBox="0 0 229 29"
                              fill="none"
                              // className="mx-auto"
                            >
                              <path
                                d="M0.803711 0.583984L19.6273 27.1628H207.982L227.609 0.583984"
                                stroke="black"
                                strokeWidth="1.9688"
                              />
                            </svg>
                          </div>
                          <div className="px-1 text-lg font-medium text-center">
                            ${billData?.charges_summary?.collect?.total_collect}
                          </div>
                        </div>
                      </div>
                      {/* Currency */}
                      <div className="grid grid-cols-2 divide-x-2 h-[60.602px] bg-[#D9D9D9">
                        <div className="relative w-full">
                          <p className="absolute top-[-2px] text-sm left-1/2 -translate-x-1/2 text-nowrap">
                            Currency Conversion Rates
                          </p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="268"
                            height="29"
                            viewBox="0 0 268 29"
                            fill="none"
                          >
                            <path
                              d="M0.757812 0.644531L22.8004 27.2233H243.365L266.349 0.644531"
                              stroke="black"
                              strokeWidth="1.9688"
                            />
                          </svg>
                          <div className="px-1 text-center font-medium">
                            {billData?.collect_charges?.currency_conv_rates}
                          </div>
                        </div>
                        <div className="relative w-full">
                          <p className="absolute top-[-2px] text-sm left-1/2 -translate-x-1/2 text-nowrap">
                            CC Charges in Dest. Currency
                          </p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="267"
                            height="29"
                            viewBox="0 0 267 29"
                            fill="none"
                          >
                            <path
                              d="M0.757812 0.644531L22.784 27.2233H243.186L266.152 0.644531"
                              stroke="black"
                              strokeWidth="1.9688"
                            />
                          </svg>
                          <div className="px-1 font-medium text-center">
                            {billData?.collect_charges?.cc_charges}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* right side */}
                    <div className="w-full flex flex-col justify-end">
                      <div className=" mx-1 flex items-center justify-between">
                        <p className="text-center uppercase text-lg font-medium">
                          {billData?.carrier_execution?.date}
                        </p>
                        <p className="text-center uppercase text-lg font-medium">
                          {billData?.carrier_execution?.place}
                        </p>
                        <p className="text-center uppercase text-lg font-medium">
                          {billData?.carrier_execution?.signature}
                        </p>
                      </div>
                      <div className="border-t-2 border-dashed  pb-3 mx-1 flex items-center justify-between">
                        <p>Executed on (date)</p>
                        <p>at (place)</p>
                        <p>Signature of Issuing Carrier or its Agent</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* separator */}
                <div className="w-full border-l-2 flex">
                  {/* mini left side */}
                  <div className="mini-preview-left-side shrink-0 border-r-2">
                    {/* Destination */}
                    <div className="grid grid-cols-2 divide-x-2 border-b-2 h-[55.602px] bg-[#D9D9D9">
                      <div className="w-full flex items-center justify-center text-center">
                        For Carrier&rsquo;s Use only at Destination
                      </div>
                      <div className="relative w-full flex flex-col items-center">
                        <p className="absolute top-[-2px] text-sm left-1/2 -translate-x-1/2 text-nowrap">
                          Charges at Destination
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="229"
                          height="29"
                          viewBox="0 0 229 29"
                          fill="none"
                          // className="mx-auto"
                        >
                          <path
                            d="M0.803711 0.583984L19.6273 27.1628H207.982L227.609 0.583984"
                            stroke="black"
                            strokeWidth="1.9688"
                          />
                        </svg>
                        <div className="px-1 font-medium">
                          ${billData?.collect_charges?.charges_at_destination}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* right side */}
                  <div className="w-[263.622px] bg-[#D9D9D9 border-b-2 border-r-2">
                    <div className="relative w-full flex flex-col items-center">
                      <p className="absolute top-[-2px] text-sm left-1/2 -translate-x-1/2 text-nowrap">
                        Total Collect Charges
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="229"
                        height="29"
                        viewBox="0 0 229 29"
                        fill="none"
                        // className="mx-auto"
                      >
                        <path
                          d="M0.803711 0.583984L19.6273 27.1628H207.982L227.609 0.583984"
                          stroke="black"
                          strokeWidth="1.9688"
                        />
                      </svg>
                      <div className="px-1 font-medium">
                        ${billData?.collect_charges?.total_collect_charges}
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-blue-500 text-center p-2">
                    {billData?.consignment_details?.airline_prefix} -{" "}
                    {billData?.consignment_details?.serial_number}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AirWaybillPreview;
