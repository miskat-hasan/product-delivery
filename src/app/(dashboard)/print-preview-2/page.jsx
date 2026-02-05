"use client";
import ContactFinder from "@/components/dashboard/ContactFinder";
import { FilePlusSvg } from "@/components/svg/Svg";
import html2canvas from "html2canvas";
import React, { useState } from "react";

const AirWaybillForm = () => {
  const captureForm = async () => {
    const element = document.getElementById("capture-area");

    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: window.devicePixelRatio * 2, // sharp text
      useCORS: true,
      backgroundColor: "#ffffff",

      // VERY IMPORTANT for tall pages
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      scrollX: 0,
      scrollY: -window.scrollY,
    });

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "air-waybill.png";
    link.click();
  };

  return (
    <div id="capture-area" className="overflow-x-auto w-[8141px]">
      <div className="w-full max-w-[7206px] mx-auto pt-[385px] pb-[317px]">
        <div className="w-full">
          <h5 className="text-[170px] flex justify-end mb-[62px]">
            777-12345675
            <button
              onClick={captureForm}
              className="mt-6 px-6 py-2 bg-black text-white rounded cursor-pointer"
            >
              Download Screenshot
            </button>
          </h5>
          <div className="border-x-[10px] border-t-[10px] relative">
            <div className="absolute w-[313px] h-[268px] -top-[268px] left-[617px] border-x-[10px]" />
            {/* separator */}
            <div className="w-full flex">
              {/* left side */}
              <div className="border-r-[10px] border-b-[10px] preview_left_side h-[1248px] flex flex-col">
                <div className="flex justify-between">
                  <div className="pt-[39px] pl-[38px] flex flex-col">
                    <p className="text-black text-[100px]">
                      Shipper&rsquo;s Name and Address
                    </p>
                  </div>
                  <div className="text-black text-[100px] border-b-[10px] border-l-[10px] flex justify-center w-[1728px] pt-[60px] min-h-[480px]">
                    Shipper&rsquo;s Account Number
                  </div>
                </div>
              </div>
              {/* right side */}
              <div className="flex flex-col preview_right_side border-b-[10px]">
                <div className="pl-[43px] py-[71px] h-[864px] border-b-[10px]">
                  <p className="text-[100px] mb-[151px]">Not Negotiable</p>
                  <h3 className="text-[140px] font-bold">Air Waybill</h3>
                  <p className="text-[100px]">Issued by</p>
                </div>
                <div className="pl-[43px] flex flex-1 pt-[132px] text-[100px]">
                  Copies 1, 2 and 3 of this Air Waybill are originals and have
                  the same validity.
                </div>
              </div>
            </div>
            {/* separator */}
            <div className="w-full flex">
              {/* left */}
              <div className="preview_left_side h-[1248px] border-b-[10px] border-r-[10px]">
                <div className="flex justify-between">
                  <div className="pl-[51px] pt-[62px]">
                    <p className="text-black text-[100px]">
                      Consignee&rsquo;s Name and Address
                    </p>
                  </div>
                  <div className="text-black text-[100px] border-b-[10px] border-l-[10px] w-[1728px] flex justify-center pt-[62px] h-[480px] bg-[#DFDFDF]">
                    Consignee&rsquo;s Account Number
                  </div>
                </div>
              </div>
              {/* right */}
              <div className="preview_right_side leading-normal pl-[43px] pr-[138px] pt-[66px] text-[80px] border-b-[10px]">
                It is agreed that the goods described herein are accepted in
                apparent good order and condition (except as noted) for carriage
                SUBJECT TO THE CONDITIONS OF CONTRACT ON THE REVERSE HEREOF. ALL
                GOODS MAY BE CARRIED BY ANY OTHER MEANS INCLUDING ROAD OR ANY
                OTHER CARRIER UNLESS SPECIFIC CONTRARY INSTRUCTIONS ARE GIVEN
                HEREON BY THE SHIPPER, AND SHIPPER AGREES THAT THE SHIPMENT MAY
                BE CARRIED VIA INTERMEDIATE STOPPING PLACES WHICH THE CARRIER
                DEEMS APPROPRIATE. THE SHIPPER&rsquo;S ATTENTION IS DRAWN TO THE
                NOTICE CONCERNING CARRIER&rsquo;S LIMITATION OF LIABILITY.
                Shipper may increase such limitation of liability by declaring a
                higher value for carriage and paying a supplemental charge if
                required.
              </div>
            </div>
            {/* separator */}
            <div className="w-full flex">
              {/* left */}
              <div className="preview_left_side border-r-[10px] border-b-[10px]">
                <div className="pl-[51px] pt-[53px] border-b-[10px] h-[758px] text-[100px]">
                  <p>Issuing Carrier&rsquo;s Agent Name and City</p>
                </div>
                <div className="flex h-[480px]">
                  <div className="pt-[60px] pl-[41px] text-[100px] w-[1735px]">
                    Agent&rsquo;s IATA Code
                  </div>
                  <div className="pt-[60px] pl-[55px] text-[100px] border-l-[10px]">
                    Account No.
                  </div>
                </div>
              </div>
              {/* right */}
              <div className="preview_right_side text-[100px] pl-[43px] pt-[54px] border-b-[10px]">
                Accounting Information
              </div>
            </div>
            {/* separator */}
            <div className="w-full flex">
              {/* left */}
              <div className="preview_left_side h-[480px] border-r-[10px] border-b-[10px] text-[100px] pt-[52px] px-[51px]">
                Airport of Departure (Addr. of First Carrier) and Requested
                Routing
              </div>
              {/* right */}
              <div className="preview_right_side border-b-[10px] flex flex-col">
                <div className="flex">
                  <p className="text-[80px] mt-[34px] ml-[43px] mr-[36px] text-nowrap">
                    Reference Number
                  </p>
                  <div className="relative">
                    <p className="left-1/2 absolute top-[34px] -translate-x-1/2 text-[80px]">
                      Optional Shipping Information
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="2346"
                      height="287"
                      viewBox="0 0 2346 287"
                      fill="none"
                      className="-mt-2.5"
                    >
                      <path
                        d="M3.52344 3.56348L283.464 281.563H2059.08L2341.52 3.56348"
                        stroke="black"
                        stroke-width="10"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-1">
                  <div className="w-[1350px]" />
                  <div className="border-x-[10px] w-[1216px]" />
                  <div className="flex-1" />
                </div>
              </div>
            </div>
            {/* separator */}
            <div className="w-full flex">
              {/* left */}
              <div className="preview_left_side h-[480px] flex border-b-[10px] border-r-[10px] h-[96.471px]">
                <div className="w-[370px] text-[100px] pl-[41px] pt-[44px] h-full border-r-[10px]">
                  To
                </div>
                <div className="flex w-[1721px]">
                  <p className="ml-[17px] mt-[44px] text-[80px]">
                    By First Carrier
                  </p>
                  <div className="relative flex">
                    <p className="absolute text-nowrap text-[60px] top-[23px] left-1/2 -translate-x-1/2">
                      Routing and Destination
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1068"
                      height="142"
                      viewBox="0 0 1068 142"
                      fill="none"
                      className="-mt-2.5"
                    >
                      <path
                        d="M3.61719 3.46777L130.536 136.468H935.565L1063.62 3.46777"
                        stroke="black"
                        stroke-width="10"
                      />
                    </svg>
                  </div>
                </div>
                <div className="w-[360px] text-[100px] pl-[28px] pt-[44px] h-full border-x-[10px]">
                  to
                </div>
                <div className="w-[312px] text-[100px] pl-[25px] pt-[44px] h-full">
                  by
                </div>
                <div className="w-[360px] text-[100px] pl-[50px] pt-[44px] h-full border-x-[10px]">
                  to
                </div>
                <div className="w-[312px] text-[100px] pl-[47px] pt-[44px] h-full">
                  by
                </div>
              </div>
              <div className="preview_right_side border-b-[10px] flex">
                <div className="text-[70px] pl-[15px] pt-[62px] border-r-[10px] w-[350px]">
                  Currency
                </div>
                <div className="text-[60px] pl-[8px] pt-[62px] border-r-[10px] w-[202px]">
                  CHGS <br />
                  Code
                </div>
                <div className="w-[404px] flex flex-col h-full">
                  <p className="border-b-[10px] pt-1.5 pb-[5px] border-r-[10px] text-[70px] text-center">
                    WT/VAL
                  </p>
                  <div className="flex flex-1">
                    <p className="text-[60px] text-center pt-[27px] border-r-[10px] flex-1">
                      PPD
                    </p>
                    <p className="text-[60px] text-center pt-[27px] border-r-[10px] flex-1">
                      COLL
                    </p>
                  </div>
                </div>
                <div className="w-[404px] flex flex-col h-full">
                  <p className="border-b-[10px] pt-1.5 pb-[5px] border-r-[10px] text-[70px] text-center">
                    Other
                  </p>
                  <div className="flex flex-1">
                    <p className="text-[60px] text-center pt-[27px] border-r-[10px] flex-1">
                      PPD
                    </p>
                    <p className="text-[60px] text-center pt-[27px] border-r-[10px] flex-1">
                      COLL
                    </p>
                  </div>
                </div>
                <div className="w-[1210px] text-[70px] pt-1.5 text-center border-r-[10px]">
                  Declared Value for Carriage
                </div>
                <div className="w-[1180px] text-[70px] pt-1.5 text-center">
                  Declared Value for Customs
                </div>
              </div>
            </div>
            {/* separator */}
            <div className="w-full flex">
              {/* left */}
              <div className="preview_left_side border-b-[10px] h-[480px] border-r-[10px] grid grid-cols-2">
                <div className="border-[10px] text-[100px] text-center pt-[34px]">
                  Airport of Destination
                </div>
                <div className="border-l-[10px] flex flex-col">
                  <div className="relative flex mx-auto">
                    <p className="absolute text-nowrap text-[60px] top-[36px] left-1/2 -translate-x-1/2">
                      Requested Flight/Date
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1257"
                      height="276"
                      viewBox="0 0 1257 276"
                      fill="none"
                      className="-mt-2.5"
                    >
                      <path
                        d="M4.36719 2.45117L153.796 270.451H1101.6L1252.37 2.45117"
                        stroke="black"
                        stroke-width="10"
                      />
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 flex-1">
                    <div className="border-r-[10px]" />
                    <div />
                  </div>
                </div>
              </div>
              {/* right */}
              <div className="preview_right_side border-b-[10px] flex">
                <div className="text-[100px] pt-[36px] px-1.5 border-r-[10px] w-[1056px] text-center">
                  Amount of Insurance
                </div>
                <div className="flex-1 pl-[49px] w-[2318px] pt-[96px] pb-[22px] text-[70px]">
                  INSURANCE – If carrier offers insurance, and such insurance is
                  requested in accordance with the conditions thereof, indicate
                  amount to be insured in figures in box marked &quot;Amount of
                  Insurance&quot;.
                </div>
              </div>
            </div>
            {/* separator */}
            <div className="w-full h-[864px] border-b-[10px] flex flex-col justify-between">
              <p className="text-[100px] mt-[48px] ml-[41px]">
                Handling Information
              </p>
              <div className="h-[384px] w-[1152px] border-l-[10px] border-t-[10px] ml-auto text-center text-[100px] pt-[14px]">
                SCI
              </div>
            </div>
            {/* separator */}
            <div className="h-[2803px] border-b-[10px] flex">
              <div className="w-[384px] border-r-[10px] flex justify-between flex-col">
                <div className="pl-[26px] pt-[19px] border-b-[10px] h-[350px] text-[80px] leading-none">
                  No. of RCP Pieces
                </div>
                <div className="w-full h-[340px] border-t-[10px]" />
              </div>
              <div className="w-[672px] border-r-[10px] flex justify-between flex-col">
                <div className="pt-[67px] border-b-[10px] h-[350px] leading-none text-[80px] text-center">
                  Gross <br /> Weight
                </div>
                <div className="w-full h-[340px] border-t-[10px]" />
              </div>
              <div className="w-[96px] border-r-[10px] flex justify-between flex-col">
                <div className="pt-[77px] border-b-[10px] h-[350px] text-[60px] text-center">
                  kg <br />
                  lb
                </div>
              </div>
              <div className="w-[116px] bg-[#D9D9D9] border-r-[10px]" />
              <div className="flex">
                <div className="w-[96px]" />
                <div className="w-[672px] border-r-[10px] flex flex-col">
                  <div className="h-[340px] border-b-[10px] flex flex-col">
                    <p className="text-[100px]">Rate Class</p>
                    <p className="text-[60px] h-[177px] border-t-[10px] border-l-[10px] mt-auto text-center">
                      Commodity <br />
                      Item No.
                    </p>
                  </div>
                  <div className="flex-1 border-l-[10px]" />
                </div>
              </div>
              <div className="w-[96px] bg-[#D9D9D9] border-r-[10px]" />
              <div className="w-[672px] border-r-[10px]">
                <div className="text-center h-[350px] border-b-[10px] text-[100px] flex items-center justify-center">
                  Chargeable
                  <br /> Weight
                </div>
              </div>
              <div className="w-[96px] bg-[#D9D9D9] border-r-[10px]" />
              <div className="w-[768px] border-r-[10px]">
                <div className="h-[350px] border-b-[10px] text-[100px] flex flex-col pt-[30px] px-[87px] relative">
                  <p>Rate</p>
                  <div className="w-[396.057px] bg-black h-[10px] -rotate-45 shrink-0" />
                  <p className="self-end">Charge</p>
                </div>
              </div>
              <div className="w-[96px] bg-[#D9D9D9] border-r-[10px]" />
              <div className="w-[1152px] border-r-[10px] flex flex-col justify-between">
                <div className="text-center h-[350px] text-[100px] border-b-[10px] flex items-center justify-center">
                  Total
                </div>
                <div className="w-full h-[340px] border-t-[10px]" />
              </div>
              <div className="w-[96px] bg-[#D9D9D9] border-r-[10px]" />
              <div className="text-center w-[2124px] h-[350px] text-[100px] border-b-[10px] flex items-center justify-center flex-1">
                <p className="mx-auto">
                  Nature and Quantity of Goods <br /> (incl. Dimensions or
                  Volume)
                </p>
              </div>
            </div>
            {/* separator */}
            <div className="w-full flex text-[80px] h-[1123px] border-b-[10px]">
              {/* mini left */}
              <div className="preview_mini_left_side border-r-[10px]">
                {/* prepaid */}
                <div className="border-b-[10px] flex flex-col h-[335px]">
                  <div className="flex justify-center">
                    <div className="relative">
                      <p className="absolute top-[2px] left-1/2 -translate-x-1/2">
                        Prepaid
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="681"
                        height="143"
                        viewBox="0 0 681 143"
                        fill="none"
                        className="-mt-2"
                      >
                        <path
                          d="M4.29688 2.57617L84.7587 137.576H595.117L676.297 2.57617"
                          stroke="black"
                          stroke-width="10"
                        />
                      </svg>
                    </div>
                    <div className="relative">
                      <p className="absolute top-[2px] left-1/2 -translate-x-1/2">
                        Weight Charge
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1161"
                        height="143"
                        viewBox="0 0 1161 143"
                        fill="none"
                        className="-mt-2"
                      >
                        <path
                          d="M4.08203 2.9707L99.6915 137.971H1056.39L1156.08 2.9707"
                          stroke="black"
                          stroke-width="10"
                        />
                      </svg>
                    </div>
                    <div className="relative">
                      <p className="absolute top-[2px] left-1/2 -translate-x-1/2">
                        Collect
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="681"
                        height="143"
                        viewBox="0 0 681 143"
                        fill="none"
                        className="-mt-2"
                      >
                        <path
                          d="M4.29688 2.57617L84.7587 137.576H595.117L676.297 2.57617"
                          stroke="black"
                          stroke-width="10"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="grid flex-1 grid-cols-2">
                    <div className="border-r-[10px] " />
                    <div />
                  </div>
                </div>
                {/* Valuation Charge */}
                <div className="border-b-[10px] h-[390px] flex flex-col">
                  <div className="px-[18.9px] flex">
                    <div className="relative mx-auto">
                      <p className="absolute top-[2px] left-1/2 -translate-x-1/2">
                        Valuation Charge
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1352"
                        height="144"
                        viewBox="0 0 1352 144"
                        fill="none"
                        className="-mt-2"
                      >
                        <path
                          d="M3.85547 3.26367L115.4 138.264H1231.55L1347.86 3.26367"
                          stroke="black"
                          stroke-width="10"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="grid flex-1 grid-cols-2">
                    <div className="border-r-[10px]" />
                    <div />
                  </div>
                </div>
                {/* Tax */}
                <div className="h-[390px] flex flex-col">
                  <div className="px-[18.9px] flex">
                    <div className="relative mx-auto">
                      <p className="absolute top-[2px] left-1/2 -translate-x-1/2">
                        Tax
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="777"
                        height="143"
                        viewBox="0 0 777 143"
                        fill="none"
                        className="-mt-2"
                      >
                        <path
                          d="M4.51953 2.20898L68.2592 137.209H706.06L772.52 2.20898"
                          stroke="black"
                          stroke-width="10"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="grid flex-1 grid-cols-2">
                    <div className="border-r-[10px]" />
                    <div />
                  </div>
                </div>
              </div>
              {/* right */}
              <div className="pt-[13px] pl-[34px] w-full">Other Charges</div>
            </div>
            {/* separator */}
            <div className="w-full flex text-[80px] h-[1172px] border-b-[10px]">
              {/* mini left */}
              <div className="preview_mini_left_side flex flex-col shrink-0 border-r-[10px]">
                {/* Total Other Charges Due Agent */}
                <div className="border-b-[10px] h-[384px] flex flex-col">
                  <div className="px-[18.9px] flex">
                    <div className="relative mx-auto">
                      <p className="absolute top-[2px] left-1/2 -translate-x-1/2 text-nowrap">
                        Total Other Charges Due Agent
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2119"
                        height="145"
                        viewBox="0 0 2119 145"
                        fill="none"
                        className="-mt-2"
                      >
                        <path
                          d="M3.05078 4.02148L178.335 139.021H1932.29L2115.05 4.02148"
                          stroke="black"
                          stroke-width="10"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="grid flex-1 grid-cols-2">
                    <div className="border-r-[10px]" />
                    <div />
                  </div>
                </div>
                {/* Total Other Charges Due Carrier */}
                <div className="border-b-[10px] h-[384px] flex flex-col">
                  <div className="px-[18.9px] flex">
                    <div className="relative mx-auto">
                      <p className="absolute top-[2px] left-1/2 -translate-x-1/2 text-nowrap">
                        Total Other Charges Due Carrier
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2119"
                        height="145"
                        viewBox="0 0 2119 145"
                        fill="none"
                        className="-mt-2"
                      >
                        <path
                          d="M3.05078 4.02148L178.335 139.021H1932.29L2115.05 4.02148"
                          stroke="black"
                          stroke-width="10"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="grid flex-1 grid-cols-2">
                    <div className="border-r-[10px]" />
                    <div />
                  </div>
                </div>
                <div className="grid flex-1 grid-cols-2 divide-x-[10px]">
                  <div className="bg-[#D9D9D9]" />
                  <div className="bg-[#D9D9D9]" />
                </div>
              </div>
              {/* right side */}
              <div className="w-full flex flex-col justify-between">
                <p className="p-[18px]">
                  Shipper certifies that the particulars on the face hereof are
                  correct and that{" "}
                  <span className="font-bold">
                    insofar as any part of the consignment contains dangerous
                    goods, such part is properly described by name and is in
                    proper condition for carriage by air according to the
                    applicable Dangerous Goods Regulations.
                  </span>{" "}
                </p>
                <div className="max-w-[2608px] w-full mx-auto border-t-2 border-dashed text-center pb-[39px] pt-[89px]">
                  <p>Signature of Shipper or his Agent</p>
                </div>
              </div>
            </div>
            {/* separator */}
            <div className="w-full flex text-[80px] border-b-[10px] h-[778px]">
              {/* mini left */}
              <div className="preview_mini_left_side shrink-0 border-r-[10px]">
                {/* Total prepaid & total collect */}
                <div className="grid grid-cols-2 divide-x-[10px] border-b-[10px] h-[384px]">
                  <div className="relative w-full">
                    <p className="absolute top-[2px] left-1/2 -translate-x-1/2 text-nowrap">
                      Total Prepaid
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1161"
                      height="143"
                      viewBox="0 0 1161 143"
                      fill="none"
                      className="mx-auto -mt-2"
                    >
                      <path
                        d="M4.08203 2.9707L99.6915 137.971H1056.39L1156.08 2.9707"
                        stroke="black"
                        stroke-width="10"
                      />
                    </svg>
                  </div>
                  <div className="relative w-full">
                    <p className="absolute top-[2px] left-1/2 -translate-x-1/2 text-nowrap">
                      Total Collect
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1161"
                      height="143"
                      viewBox="0 0 1161 143"
                      fill="none"
                      className="mx-auto -mt-2"
                    >
                      <path
                        d="M4.08203 2.9707L99.6915 137.971H1056.39L1156.08 2.9707"
                        stroke="black"
                        stroke-width="10"
                      />
                    </svg>
                  </div>
                </div>
                {/* Currency */}
                <div className="grid grid-cols-2 divide-x-[10px] h-[384px] bg-[#D9D9D9]">
                  <div className="relative w-full">
                    <p className="absolute top-[2px] left-1/2 -translate-x-1/2 text-nowrap">
                      Currency Conversion Rates
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1357"
                      height="144"
                      viewBox="0 0 1357 144"
                      fill="none"
                      className="-mt-2 -ml-2"
                    >
                      <path
                        d="M3.84766 3.26953L115.807 138.27H1236.11L1352.85 3.26953"
                        stroke="black"
                        stroke-width="10"
                      />
                    </svg>
                  </div>
                  <div className="relative w-full">
                    <p className="absolute top-[2px] left-1/2 -translate-x-1/2 text-nowrap">
                      CC Charges in Dest. Currency
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1356"
                      height="144"
                      viewBox="0 0 1356 144"
                      fill="none"
                      className="-mt-1 -ml-0.5"
                    >
                      <path
                        d="M3.85156 3.26953L115.728 138.27H1235.2L1351.85 3.26953"
                        stroke="black"
                        stroke-width="10"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              {/* right side */}
              <div className="w-full flex flex-col justify-end">
                <div className="border-t-2 border-dashed pt-[89px] pb-[68px] mx-[18px] flex items-center justify-between">
                  <p>Executed on (date)</p>
                  <p>at (place)</p>
                  <p>Signature of Issuing Carrier or its Agent</p>
                </div>
              </div>
            </div>
          </div>
          {/* separator */}
          <div className="w-full border-l-[10px] flex text-[80px] h-[384px]">
            {/* mini left side */}
            <div className="preview_mini_left_side shrink-0 border-r-[10px]">
              {/* Destination */}
              <div className="grid grid-cols-2 divide-x-[10px] border-b-[10px] h-full bg-[#D9D9D9]">
                <div className="w-full flex items-center justify-center text-center">
                  For Carrier&rsquo;s Use only <br /> at Destination
                </div>
                <div className="relative w-full">
                  <p className="absolute top-[2px] left-1/2 -translate-x-1/2 text-nowrap">
                    Charges at Destination
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1161"
                    height="143"
                    viewBox="0 0 1161 143"
                    fill="none"
                    className="mx-auto -mt-2"
                  >
                    <path
                      d="M4.08203 2.9707L99.6915 137.971H1056.39L1156.08 2.9707"
                      stroke="black"
                      stroke-width="10"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {/* right side */}
            <div className="w-[1339px] bg-[#D9D9D9] border-b-[10px] border-r-[10px]">
              <div className="relative w-full">
                <p className="absolute top-[2px] left-1/2 -translate-x-1/2 text-nowrap">
                  Total Collect Charges
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1161"
                  height="143"
                  viewBox="0 0 1161 143"
                  fill="none"
                  className="mx-auto -mt-2"
                >
                  <path
                    d="M4.08203 2.9707L99.6915 137.971H1056.39L1156.08 2.9707"
                    stroke="black"
                    stroke-width="10"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="gap-5 mt-[113px] text-[170px] font-bold text-[#231F20] text-center">
          ORIGINAL 3 (FOR SHIPPER)
        </div>
      </div>
    </div>
  );
};

export default AirWaybillForm;
