"use client";
import ContactFinder from "@/components/dashboard/ContactFinder";
import { FilePlusSvg } from "@/components/svg/Svg";
import React, { useState } from "react";

const AirWaybillForm = () => {
  const [isContactFinderOpen, setIsContactFinderOpen] = useState(false);
  return (
    <div className="w-full max-w-[1418px] mx-auto py-10">
      <div className="w-full">
        <h5 className="text-3xl flex justify-end mb-2">777-12345675</h5>
        <div className="border-2 relative">
          <div className="absolute size-[61px] -top-[62px] left-[121.84] border-l-2 border-r-2" />
          {/* separator */}
          <div className="w-full flex">
            {/* left side */}
            <div className="border-r-2 left-side flex flex-col">
              <div className="grid grid-cols-2">
                <div className="p-2 flex flex-col">
                  <p className="text-black text-xl">
                    Shipper&rsquo;s Name and Address
                  </p>
                  <div
                    onClick={() => setIsContactFinderOpen(true)}
                    className="flex items-center justify-center size-[44px] bg-[#F5F5F5] hover:bg-[#e6e2e2] transition-colors rounded-full mt-[10px] self-end cursor-pointer"
                  >
                    <FilePlusSvg />
                  </div>
                </div>
                <div className="text-black text-xl border-b-2 border-l-2 flex justify-center pt-3 min-h-[94.502px]">
                  Shipper&rsquo;s Account Number
                </div>
              </div>
              <div className="px-[10px] py-[14px] border-b-2">
                <textarea
                  className="bg-[#F5F5F5] text-[#222222] text-xs w-full border border-black-100 px-2 py-3 min-h-[120px]"
                  placeholder="Shipper’s Name And Address |"
                ></textarea>
              </div>
            </div>
            {/* right side */}
            <div className="flex flex-col right-side">
              <div className="px-2 py-3">
                <p className="text-xl mb-[30px]">Not Negotiable</p>
                <h3 className="text-[27.5px] font-bold">Air Waybill</h3>
                <p className="text-xl">Issued by</p>
              </div>
              <div className="border-y-2 px-2 py-6 text-xl mt-auto">
                Copies 1, 2 and 3 of this Air Waybill are originals and have the
                same validity.
              </div>
            </div>
          </div>
          {/* separator */}
          <div className="w-full flex">
            {/* left */}
            <div className="left-side border-r-2">
              <div className="grid grid-cols-2">
                <div className="p-2 flex flex-col">
                  <p className="text-black text-xl">
                    Consignee&rsquo;s Name and Address
                  </p>
                  <div
                    onClick={() => setIsContactFinderOpen(true)}
                    className="flex items-center justify-center size-[44px] bg-[#F5F5F5] hover:bg-[#e6e2e2] transition-colors rounded-full mt-[10px] self-end cursor-pointer"
                  >
                    <FilePlusSvg />
                  </div>
                </div>
                <div className="text-black text-xl border-b-2 border-l-2 flex justify-center pt-3 min-h-[94.502px] bg-[#DFDFDF]">
                  Consignee&rsquo;s Account Number
                </div>
              </div>
              {/* text area */}
              <div className="px-[10px] py-[14px] border-b-2">
                <textarea className="bg-[#F5F5F5] text-[#222222] text-xs w-full border border-black-100 px-2 py-3 min-h-[120px]"></textarea>
              </div>
            </div>
            {/* right */}
            <div className="right-side px-2 py-3 text-[15.75px] border-b-2">
              It is agreed that the goods described herein are accepted in
              apparent good order and condition (except as noted) for carriage
              SUBJECT TO THE CONDITIONS OF CONTRACT ON THE REVERSE HEREOF. ALL
              GOODS MAY BE CARRIED BY ANY OTHER MEANS INCLUDING ROAD OR ANY
              OTHER CARRIER UNLESS SPECIFIC CONTRARY INSTRUCTIONS ARE GIVEN
              HEREON BY THE SHIPPER, AND SHIPPER AGREES THAT THE SHIPMENT MAY BE
              CARRIED VIA INTERMEDIATE STOPPING PLACES WHICH THE CARRIER DEEMS
              APPROPRIATE. THE SHIPPER&rsquo;S ATTENTION IS DRAWN TO THE NOTICE
              CONCERNING CARRIER&rsquo;S LIMITATION OF LIABILITY. Shipper may
              increase such limitation of liability by declaring a higher value
              for carriage and paying a supplemental charge if required.
            </div>
          </div>
          {/* separator */}
          <div className="w-full flex">
            {/* left */}
            <div className="left-side border-r-2">
              <div className="px-[10px] pb-[10px] border-b-2">
                <div className="my-[8px] flex items-center justify-between">
                  <p>Issuing Carrier&rsquo;s Agent Name and City</p>
                  <div
                    onClick={() => setIsContactFinderOpen(true)}
                    className="flex items-center justify-center size-[44px] bg-[#F5F5F5] hover:bg-[#e6e2e2] transition-colors rounded-full mt-[10px] self-end cursor-pointer"
                  >
                    <FilePlusSvg />
                  </div>
                </div>
                <textarea className="bg-[#F5F5F5] text-[#222222] text-xs w-full border border-black-100 px-2 py-3 min-h-[94px]"></textarea>
              </div>
              <div className="grid grid-cols-2 border-b-2">
                <div className="p-2 flex flex-col text-xl">
                  Agent&rsquo;s IATA Code
                </div>
                <div className="text-black text-xl border-l-2 flex justify-center pt-3 min-h-[94.502px]">
                  Account No.
                </div>
              </div>
            </div>
            {/* right */}
            <div className="right-side text-xl px-2 py-3 border-b-2">
              Accounting Information
            </div>
          </div>
          {/* separator */}
          <div className="w-full flex">
            {/* left */}
            <div className="left-side border-r-2 border-b-2">
              <div className="p-[10px]">
                Airport of Departure (Addr. of First Carrier) and Requested
                Routing
              </div>
            </div>
            {/* right */}
            <div className="right-side border-b-2">
              <div className="flex relative">
                <p className="absolute text-[15.75px] top-1.5 left-2 text-nowrap">
                  Reference Number
                </p>
                <div className="mx-auto relative">
                  <p className="left-1/2 absolute -translate-x-1/2 text-[15.75px]">
                    Optional Shipping Information
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="462"
                    height="57"
                    viewBox="0 0 462 57"
                    fill="none"
                  >
                    <path
                      d="M0.693359 0.701172L55.8079 55.4338H405.392L460.998 0.701172"
                      stroke="black"
                      stroke-width="1.9688"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex">
                <div className="w-[260.7px]" />
                <div className="h-[39.77px] flex-1 border-l-2 border-r-2" />
                <div className="w-[237.11px]" />
              </div>
            </div>
          </div>
          {/* separator */}
          <div className="w-full flex">
            {/* left */}
            <div className="left-side flex border-b-2 h-[96.471px]">
              <div className="w-[74.814px] text-xl p-2.5 h-full border-r-2">
                To
              </div>
              <div className="flex pr-2">
                <p className="ml-0.5 mt-1">By First Carrier</p>
                <div className="relative flex">
                  <p className="absolute text-nowrap text-[11.813px] top-0.5 left-1/2 -translate-x-1/2">
                    Routing and Destination
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="211"
                    height="28"
                    viewBox="0 0 211 28"
                    fill="none"
                  >
                    <path
                      d="M0.711914 0.683594L25.6997 26.8686H184.194L209.404 0.683594"
                      stroke="black"
                      stroke-width="1.9688"
                    />
                  </svg>
                </div>
              </div>
              <div className="w-[70.877px] text-xl p-2.5 h-full border-l-2">
                To
              </div>
              <div className="w-[61.1px] text-xl p-2.5 h-full border-l-2">
                by
              </div>
              <div className="w-[70.877px] text-xl p-2.5 h-full border-l-2">
                To
              </div>
              <div className="w-[61.1px] text-xl p-2.5 h-full border-l-2">
                by
              </div>
            </div>
            <div className="right-side border-b-2 shrink-0 flex">
              <div className="text-[13.782px] px-1 py-3.5 border-x-2 w-[70.877px]">
                Currency
              </div>
              <div className="text-[11.813px] py-3 border-r-2 w-[37px]">
                CHGS <br />
                Code
              </div>
              <div className="w-[77.5px] flex flex-col h-full">
                <p className="border-b-2 border-r-2 text-[13.782px] text-center">
                  WT/VAL
                </p>
                <div className="flex flex-1">
                  <p className="text-[11.813px] text-center pt-1 border-r-2 flex-1">
                    PPD
                  </p>
                  <p className="text-[11.813px] text-center pt-1 border-r-2 flex-1">
                    COLL
                  </p>
                </div>
              </div>
              <div className="w-[77.5px] flex flex-col h-full">
                <p className="border-b-2 text-[13.782px] text-center">WT/VAL</p>
                <div className="flex flex-1">
                  <p className="text-[11.813px] text-center pt-1 border-r-2 flex-1">
                    PPD
                  </p>
                  <p className="text-[11.813px] text-center pt-1 flex-1">
                    COLL
                  </p>
                </div>
              </div>
              <div className="w-[239px] text-[13.782px] text-center border-l-2">
                Declared Value for Carriage
              </div>
              <div className="w-[239px] text-[13.782px] text-center border-l-2">
                Declared Value for Customs
              </div>
            </div>
          </div>
          {/* separator */}
          <div className="w-full flex">
            {/* left */}
            <div className="left-side border-r-2 grid grid-cols-2">
              <div className="border-2 text-xl text-center p-2">
                Airport of Destination
              </div>
              <div className="border-l-2">
                <div className="relative flex">
                  <p className="absolute top-2 left-1/2 -translate-x-1/2">
                    Requested Flight/Date
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="248"
                    height="55"
                    viewBox="0 0 248 55"
                    fill="none"
                    className="mx-auto"
                  >
                    <path
                      d="M0.859375 0.482422L30.279 53.2462H216.883L246.565 0.482422"
                      stroke="black"
                      stroke-width="1.9688"
                    />
                  </svg>
                </div>

                <div className="grid grid-cols-2">
                  <div className="border-r-2 h-[47.785px]" />
                  <div />
                </div>
              </div>
            </div>
            {/* right */}
            <div className="right-side flex">
              <div className="text-xl pt-2 px-1.5 border-r-2">
                Amount of Insurance
              </div>
              <div className="flex-1 px-2.5 pt-[18px] pb-[22px] text-[13.782px]">
                INSURANCE – If carrier offers insurance, and such insurance is
                requested in accordance with the conditions thereof, indicate
                amount to be insured in figures in box marked &quot;Amount of
                Insurance&quot;.
              </div>
            </div>
          </div>
          {/* separator */}
          <div className="w-full h-[170.104px] border-y-2 flex flex-col justify-between">
            <p className="text-xl mt-3 ml-2.5">Handling Information</p>
            <div className="h-[75.602px] w-[226.806px] border-l-2 border-t-2 ml-auto text-center text-xl p-1">
              SCI
            </div>
          </div>
          {/* separator */}
          <div className="h-[553.626px] border-b-2 flex">
            <div className="w-[75.602px] border-r-2 flex justify-between flex-col">
              <div className="px-2 py-1 border-b-2 h-[68px] leading-none">
                No. of RCP Pieces
              </div>
              <div className="w-full h-[68px] border-t-2" />
            </div>
            <div className="w-[132.303px] border-r-2 flex justify-between flex-col">
              <div className="px-2 py-1 border-b-2 h-[68px] text-center">
                Gross <br /> Weight
              </div>
              <div className="w-full h-[68px] border-t-2" />
            </div>
            <div className="w-[20.279px] border-r-2 flex justify-between flex-col">
              <div className="py-1 border-b-2 h-[68px] text-center">
                kg <br />
                lb
              </div>
            </div>
            <div className="w-[22.838px] bg-[#D9D9D9] border-r-2" />
            <div className="flex">
              <div className="w-[18.9px]" />
              <div className="w-[130.334px] border-r-2 flex flex-col">
                <div>
                  <p className="text-xl">Rate Class</p>
                  <p className="text-[11.813px] border-y-2 border-l-2 text-center">
                    Commodity <br />
                    Item No.
                  </p>
                </div>
                <div className="flex-1 border-l-2" />
              </div>
            </div>
            <div className="w-[18.9px] bg-[#D9D9D9] border-r-2" />
            <div className="w-[132.303px] border-r-2">
              <div className="text-center h-[68px] border-b-2 text-xl flex items-center justify-center">
                Chargeable
                <br /> Weight
              </div>
            </div>
            <div className="w-[18.9px] bg-[#D9D9D9] border-r-2" />
            <div className="w-[151.204px] border-r-2">
              <div className="h-[68px] border-b-2 flex flex-col py-2 px-5 relative">
                <p>Rate</p>
                <div className="w-[77.976px] bg-black h-[1px] -rotate-45" />
                <p className="self-end">Charge</p>
              </div>
            </div>
            <div className="w-[18.9px] bg-[#D9D9D9] border-r-2" />
            <div className="w-[226.806px] border-r-2 flex flex-col justify-between">
              <div className="text-center h-[68px] text-xl border-b-2 flex items-center justify-center">
                Total
              </div>
              <div className="w-full h-[68px] border-t-2" />
            </div>
            <div className="w-[18.9px] bg-[#D9D9D9] border-r-2" />
            <div className="text-center w-[418.173px] h-[68px] text-xl border-b-2 flex items-center justify-center flex-1">
              <p className="max-w-[284px] mx-auto">
                Nature and Quantity of Goods (incl. Dimensions or Volume)
              </p>
            </div>
          </div>
          {/* separator */}
          <div className="w-full flex">
            {/* mini left */}
            <div className="mini-left-side border-r-2">
              {/* prepaid */}
              <div className="border-b-2">
                <div className="px-[18.9px] flex">
                  <div className="relative">
                    <p className="absolute top-[2px] left-1/2 -translate-x-1/2">
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
                        stroke-width="1.9688"
                      />
                    </svg>
                  </div>
                  <div className="relative">
                    <p className="absolute top-[2px] left-1/2 -translate-x-1/2">
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
                        stroke-width="1.9688"
                      />
                    </svg>
                  </div>
                  <div className="relative">
                    <p className="absolute top-[2px] left-1/2 -translate-x-1/2">
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
                        stroke-width="1.9688"
                      />
                    </svg>
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="border-r-2 h-[40.557px]" />
                  <div />
                </div>
              </div>
              {/* Valuation Charge */}
              <div className="border-b-2">
                <div className="px-[18.9px] flex">
                  <div className="relative mx-auto">
                    <p className="absolute top-[2px] left-1/2 -translate-x-1/2">
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
                        stroke-width="1.9688"
                      />
                    </svg>
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="border-r-2 h-[49.023px]" />
                  <div />
                </div>
              </div>
              {/* Tax */}
              <div className="border-b-2">
                <div className="px-[18.9px] flex">
                  <div className="relative mx-auto">
                    <p className="absolute top-[2px] left-1/2 -translate-x-1/2">
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
                        stroke-width="1.9688"
                      />
                    </svg>
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="border-r-2 h-[49.023px]" />
                  <div />
                </div>
              </div>
            </div>
            {/* right */}
            <div className="py-[2px] px-1.5 border-b-2 w-full">
              Other Charges
            </div>
          </div>
          {/* separator */}
          <div className="w-full flex">
            {/* mini left */}
            <div className="mini-left-side shrink-0 border-r-2">
              {/* Total Other Charges Due Agent */}
              <div className="border-b-2">
                <div className="px-[18.9px] flex">
                  <div className="relative mx-auto">
                    <p className="absolute top-[2px] left-1/2 -translate-x-1/2 text-nowrap">
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
                        stroke-width="1.9688"
                      />
                    </svg>
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="border-r-2 h-[49.023px]" />
                  <div />
                </div>
              </div>
              {/* Total Other Charges Due Carrier */}
              <div className="border-b-2">
                <div className="px-[18.9px] flex">
                  <div className="relative mx-auto">
                    <p className="absolute top-[2px] left-1/2 -translate-x-1/2 text-nowrap">
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
                        stroke-width="1.9688"
                      />
                    </svg>
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="border-r-2 h-[49.023px]" />
                  <div />
                </div>
              </div>
              <div className="grid grid-cols-2 divide-x-2 border-b-2">
                <div className="h-[75.602px] bg-[#D9D9D9]" />
                <div className="h-[75.602px] bg-[#D9D9D9]" />
              </div>
            </div>
            {/* right side */}
            <div className="w-full border-b-2 flex flex-col justify-between">
              <p className="p-[3px]">
                Shipper certifies that the particulars on the face hereof are
                correct and that{" "}
                <span className="font-bold">
                  insofar as any part of the consignment contains dangerous
                  goods, such part is properly described by name and is in
                  proper condition for carriage by air according to the
                  applicable Dangerous Goods Regulations.
                </span>{" "}
              </p>
              <div className="max-w-[513.463px] w-full mx-auto border-t-2 border-dashed text-center pb-2 pt-[18px]">
                <p>Signature of Shipper or his Agent</p>
              </div>
            </div>
          </div>
          {/* separator */}
          <div className="w-full flex">
            {/* mini left */}
            <div className="mini-left-side shrink-0 border-r-2">
              {/* Total prepaid & total collect */}
              <div className="grid grid-cols-2 divide-x-2 border-b-2 h-[75.602px]">
                <div className="relative w-full">
                  <p className="absolute top-[2px] left-1/2 -translate-x-1/2 text-nowrap">
                    Total Prepaid
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="229"
                    height="29"
                    viewBox="0 0 229 29"
                    fill="none"
                    className="mx-auto"
                  >
                    <path
                      d="M0.803711 0.583984L19.6273 27.1628H207.982L227.609 0.583984"
                      stroke="black"
                      stroke-width="1.9688"
                    />
                  </svg>
                </div>
                <div className="relative w-full">
                  <p className="absolute top-[2px] left-1/2 -translate-x-1/2 text-nowrap">
                    Total Collect
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="229"
                    height="29"
                    viewBox="0 0 229 29"
                    fill="none"
                    className="mx-auto"
                  >
                    <path
                      d="M0.803711 0.583984L19.6273 27.1628H207.982L227.609 0.583984"
                      stroke="black"
                      stroke-width="1.9688"
                    />
                  </svg>
                </div>
              </div>
              {/* Currency */}
              <div className="grid grid-cols-2 divide-x-2 h-[75.602px] bg-[#D9D9D9]">
                <div className="relative w-full">
                  <p className="absolute top-[2px] left-1/2 -translate-x-1/2 text-nowrap">
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
                      stroke-width="1.9688"
                    />
                  </svg>
                </div>
                <div className="relative w-full">
                  <p className="absolute top-[2px] left-1/2 -translate-x-1/2 text-nowrap">
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
                      stroke-width="1.9688"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {/* right side */}
            <div className="w-full flex flex-col justify-end">
              <div className="border-t-2 border-dashed pt-[18px] pb-3 mx-1 flex items-center justify-between">
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
          <div className="mini-left-side shrink-0 border-r-2">
            {/* Destination */}
            <div className="grid grid-cols-2 divide-x-2 border-b-2 h-[75.602px] bg-[#D9D9D9]">
              <div className="w-full flex items-center justify-center text-center">
                For Carrier&rsquo;s Use only at Destination
              </div>
              <div className="relative w-full">
                <p className="absolute top-[2px] left-1/2 -translate-x-1/2 text-nowrap">
                  Charges at Destination
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="229"
                  height="29"
                  viewBox="0 0 229 29"
                  fill="none"
                  className="mx-auto"
                >
                  <path
                    d="M0.803711 0.583984L19.6273 27.1628H207.982L227.609 0.583984"
                    stroke="black"
                    stroke-width="1.9688"
                  />
                </svg>
              </div>
            </div>
          </div>
          {/* right side */}
          <div className="w-[263.622px] bg-[#D9D9D9] border-b-2 border-r-2">
            <div className="relative w-full">
              <p className="absolute top-[2px] left-1/2 -translate-x-1/2 text-nowrap">
                Total Collect Charges
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="229"
                height="29"
                viewBox="0 0 229 29"
                fill="none"
                className="mx-auto"
              >
                <path
                  d="M0.803711 0.583984L19.6273 27.1628H207.982L227.609 0.583984"
                  stroke="black"
                  stroke-width="1.9688"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-5 my-7">
        <div className="text-3xl font-bold text-[#231F20] text-center basis-1/2">
          ORIGINAL 3 (FOR SHIPPER)
        </div>
        <div className="flex items-center gap-5">
          <button className="text-lg font-medium text-blue-500 w-[300px] border border-blue-500 rounded-2xl bg-[#C3DCEB] py-4 px-4 ">
            Continue to dashboard
          </button>
          <button className="text-lg font-medium text-black-300 w-[300px] rounded-2xl bg-black-100 py-4 px-4 ">
            Continue to dashboard
          </button>
        </div>
      </div>
      {isContactFinderOpen && (
        <ContactFinder onClose={() => setIsContactFinderOpen(false)} />
      )}
    </div>
  );
};

export default AirWaybillForm;
