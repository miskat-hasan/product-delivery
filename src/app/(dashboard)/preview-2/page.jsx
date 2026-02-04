"use client";
import ContactFinder from "@/components/dashboard/ContactFinder";
import { FilePlusSvg } from "@/components/svg/Svg";
import html2canvas from "html2canvas";
import { FiDownload } from "react-icons/fi";

import React, { useState } from "react";

const AirWaybillForm = () => {
  const [isContactFinderOpen, setIsContactFinderOpen] = useState(false);

  const captureForm = async () => {
    const element = document.getElementById("capture-area");

    if (!element) return;

    // const canvas = await html2canvas(element, {
    //   // scale: window.devicePixelRatio * 2, // sharp text
    //   scale: 2,
    //   useCORS: true,
    //   backgroundColor: "#ffffff",

    //   // VERY IMPORTANT for tall pages
    //   windowWidth: element.scrollWidth,
    //   windowHeight: element.scrollHeight,
    //   scrollX: 0,
    //   scrollY: -window.scrollY,
    // });
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.offsetWidth,
      windowHeight: element.offsetHeight,
    });

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "air-waybill.png";
    link.click();
  };
  return (
    <div>
      <button
        onClick={captureForm}
        className="top-6 transition size-12 text-2xl flex items-center justify-center bg-white border-black border-2 hover:bg-black hover:text-white rounded cursor-pointer absolute right-10"
      >
        <FiDownload />

      </button>
      <div id="capture-area">
        <div className="w-full max-w-[1218px] mx-auto py-10 bg-white">
          <div className="w-full">
            <h5 className="flex text-lg font-bold justify-end pb-2">
              INCIDUNT NECESSITAT-OFFICIIS
            </h5>
            <div className="border-2 relative">
              <div className="absolute -top-[45px] flex">
                <p className="w-[61px] text-xs flex flex-col justify-end text-end font-bold pb-2">
                  INCIDU NT
                </p>
                <div className="w-[61px] h-[45px] text-xs text-center pb-2 flex flex-col justify-end font-bold border-l-2 border-r-2">
                  VOLUPTA TEM
                </div>
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
                      <p className="text-xl pb-2">21345678976543245678</p>
                    </div>
                    <div className="px-4 text-xl">
                      <p>IUSTO DOLOR QUIS FUG</p>
                    </div>
                  </div>
                </div>
                {/* right side */}
                <div className="flex flex-col preview-right-side border-l-2">
                  <div className="px-2 ">
                    <p className="text-sm">Not Negotiable</p>
                    <h3 className="text-[27.5px] font-bold">Air Waybill</h3>
                    <div className="py-2 flex gap-4">
                      <p className="text-sm">Issued by</p>
                      <p className="text-xl">AUTE DOLORIBUS A SIT</p>
                    </div>
                  </div>
                  <div className="border-t-2 p-2 text-sm mt-auto">
                    Copies 1, 2 and 3 of this Air Waybill are originals and have
                    the same validity.
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
                    <div className="text-black text-sm border-b-2 border-l-2 flex justify-between flex-col items-center h-[60px] bg-[#DFDFDF]">
                      <p>Consignee&rsquo;s Account Number</p>
                      <p className="text-xl pb-2">234567898765</p>
                    </div>
                    <div className="px-4 text-xl">
                      <p>IUSTO DOLOR QUIS FUG</p>
                    </div>
                  </div>
                </div>
                {/* right */}
                <div className="preview-right-side p-2 text-[11px] border-l-2">
                  It is agreed that the goods described herein are accepted in
                  apparent good order and condition (except as noted) for
                  carriage SUBJECT TO THE CONDITIONS OF CONTRACT ON THE REVERSE
                  HEREOF. ALL GOODS MAY BE CARRIED BY ANY OTHER MEANS INCLUDING
                  ROAD OR ANY OTHER CARRIER UNLESS SPECIFIC CONTRARY
                  INSTRUCTIONS ARE GIVEN HEREON BY THE SHIPPER, AND SHIPPER
                  AGREES THAT THE SHIPMENT MAY BE CARRIED VIA INTERMEDIATE
                  STOPPING PLACES WHICH THE CARRIER DEEMS APPROPRIATE. THE
                  SHIPPER&rsquo;S ATTENTION IS DRAWN TO THE NOTICE CONCERNING
                  CARRIER&rsquo;S LIMITATION OF LIABILITY. Shipper may increase
                  such limitation of liability by declaring a higher value for
                  carriage and paying a supplemental charge if required.
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
                      <p className="text-lg pb-2">CUPIDITATE OFFICIIS </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="text-black text-sm flex flex-col px-2.5">
                      <p className="text-sm">Agent&rsquo;s IATA Code</p>
                      <p className="text-lg pb-2">ASDJFN3945II</p>
                    </div>
                    <div className="text-black text-sm border-l-2 flex flex-col px-2.5">
                      <p className="text-sm">Account No.</p>
                      <p className="text-lg pb-2">234567654323456</p>
                    </div>
                  </div>
                </div>
                {/* right */}
                <div className="preview-right-side text-sm px-2 flex flex-col border-l-2">
                  <p>Accounting Information</p>
                  <p className="text-xl">Accounting Information</p>
                </div>
              </div>
              {/* separator */}
              <div className="w-full flex border-b-2">
                {/* left */}
                <div className="preview-left-side flex flex-col px-2">
                  <div className="text-sm">
                    Airport of Departure (Addr. of First Carrier) and Requested
                    Routing
                  </div>
                  <p className="pb-2">Lorem ipsum dolor sit.</p>
                </div>
                {/* right */}
                <div className="preview-right-side border-l-2">
                  <div className="flex relative">
                    <div className="absolute flex flex-col text-[11.75px] top-0.5 left-5 text-nowrap">
                      <p>Reference Number</p>
                      <p className="text-lg pb-2">12345675</p>
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
                          stroke-width="1.9688"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-[250.7px]" />
                    <div className="h-[30px] flex-1 border-l-2 border-r-2 pb-2">
                      EST
                    </div>
                    <div className="w-[250.11px]">NUMQUAM DOLORES HIC</div>
                  </div>
                </div>
              </div>
              {/* separator */}
              <div className="w-full flex border-b-2">
                {/* left */}
                <div className="preview-left-side flex h-[70.471px]">
                  <div className="w-[74.814px] text-xs p-0.5 h-full border-r-2 flex flex-col">
                    <p className="text-sm px-1 font-medium">To</p>
                    <p>TEMPORI RATIONE S</p>
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
                            stroke-width="1.9688"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="px-2">WEIFNSADK</div>
                  </div>
                  <div className="w-[60px] text-sm px-1 font-medium h-full border-l-2">
                    to
                  </div>
                  <div className="w-[55px] text-sm px-1 font-medium h-full border-l-2">
                    by
                  </div>
                  <div className="w-[60px] text-sm px-1 font-medium h-full border-l-2">
                    to
                  </div>
                  <div className="w-[55px] text-sm px-1 font-medium h-full border-l-2">
                    by
                  </div>
                </div>
                {/* right side */}
                <div className="preview-right-side border-l-2 flex">
                  <div className="text-[11px] border-r-2 w-[60px]">
                    Currency
                  </div>
                  <div className="text-[10px] border-r-2 w-[37px]">
                    CHGS <br />
                    Code
                  </div>
                  <div className="w-[76px] flex flex-col h-full">
                    <p className="border-b-2 border-r-2 text-[11px] pb-1.5 text-center">
                      WT/VAL
                    </p>
                    <div className="flex flex-1">
                      <p className="text-[11px] text-center border-r-2 flex-1">
                        PPD
                      </p>
                      <p className="text-[11px] text-center border-r-2 flex-1">
                        COLL
                      </p>
                    </div>
                  </div>
                  <div className="w-[77px] flex flex-col h-full">
                    <p className="border-b-2 text-[11px] text-center pb-1.5">Other</p>
                    <div className="flex flex-1">
                      <p className="text-[11px] text-center pt-1 border-r-2 flex-1">
                        PPD
                      </p>
                      <p className="text-[11px] text-center pt-1 flex-1">
                        COLL
                      </p>
                    </div>
                  </div>
                  <div className="w-[130px] text-[9px] text-center border-l-2">
                    Declared Value for Carriage
                  </div>
                  <div className="text-[9px] text-center pl-1 border-l-2">
                    Declared Value for Customs
                  </div>
                </div>
              </div>
              {/* separator */}
              <div className="w-full flex border-b-2">
                {/* left */}
                <div className="preview-left-side grid grid-cols-2">
                  <div className="border-2 text-sm text-center pb-2">
                    Airport of Destination
                    <p className="text-lg">fghfdsafghfdsa</p>
                  </div>
                  <div className="border-l-2">
                    <div className="relative flex justify-center">
                      <p className="absolute text-sm left-1/2 -translate-x-1/2 text-nowrap">
                        Requested Flight/Date
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="248"
                        height="45"
                        viewBox="0 0 248 55"
                        fill="none"
                        // className="mx-auto"
                      >
                        <path
                          d="M0.859375 0.482422L30.279 53.2462H216.883L246.565 0.482422"
                          stroke="black"
                          stroke-width="1.9688"
                        />
                      </svg>
                    </div>

                    <div className="grid grid-cols-2">
                      <div className="border-r-2 h-[47.785px] px-2 py-1">
                        sdjhfgdjh
                      </div>
                      <div className="px-2 py-1">sejh,khgfdjh</div>
                    </div>
                  </div>
                </div>
                {/* right */}
                <div className="preview-right-side border-l-2 flex">
                  <div className="text-sm pb-2 px-1.5 border-r-2">
                    Amount of Insurance
                    <p className="text-lg">2345676543</p>
                  </div>
                  <div className="flex-1 px-2.5 text-[11px]">
                    INSURANCE – If carrier offers insurance, and such insurance
                    is requested in accordance with the conditions thereof,
                    indicate amount to be insured in figures in box marked
                    &quot;Amount of Insurance&quot;.
                  </div>
                </div>
              </div>
              {/* separator */}
              <div className="w-full h-[170.104px] border-b-2 flex justify-between">
                <div className="flex-1 mt-1 mx-2.5">
                  Handling Information
                  <p className="text-xl">SFGDOSKAPLFGFASDOGBHJSJFASDFBH</p>
                </div>
                <div className="h-[75.602px] w-[230px] border-l-2 border-t-2 ml-auto text-center self-end-safe p-1">
                  SCI
                  <p className="text-lg pb-2">ASDGHGFDSAFJIN</p>
                </div>
              </div>
              {/* separator */}
              <div className="h-[500px] border-b-2 flex">
                <div className="w-[75.602px] border-r-2 flex justify-between flex-col">
                  <div>
                    <div className="px-2 py-1 border-b-2 h-[68px] leading-none">
                      No. of RCP Pieces
                    </div>
                    <div className="p-1">155425</div>
                  </div>
                  <div className="w-full h-[68px] border-t-2" />
                </div>
                <div className="w-[132.303px] border-r-2 flex justify-between flex-col">
                  <div>
                    <div className="px-2 py-1 border-b-2 h-[68px] text-center">
                      Gross <br /> Weight
                    </div>
                    <div className="p-1">125251</div>
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
                      <p className="pb-2">Rate Class</p>
                      <p className="text-[11px] leading-none pb-[10px] border-y-2 border-l-2 text-center">
                        Commodity <br />
                        Item No.
                      </p>
                      <div className="p-1 border-l-2">5465465</div>
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
                    <div className="p-1">214252</div>
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
                        stroke-width="1.57504"
                      />
                    </svg>
                    {/* <div className="w-[77.976px] bg-black h-[1px] -rotate-45" /> */}
                    <p className="self-end">Charge</p>
                  </div>
                  <div className="p-1">6546</div>
                </div>
                <div className="w-[18.9px] bg-[#D9D9D9] border-r-2" />
                <div className="w-[226.806px] border-r-2 flex flex-col justify-between">
                  <div>
                    <div className="text-center h-[68px] text-xl border-b-2 flex pb-2 pt-0.5 justify-center">
                      Total
                    </div>
                    <div className="p-1">234567654</div>
                  </div>
                  <div className="w-full h-[68px] border-t-2" />
                </div>
                <div className="w-[18.9px] bg-[#D9D9D9] border-r-2" />
                <div className="text-center w-[418.173px] h-[68px] text-xl border-b-2 flex pb-2 pt-0.5 justify-center flex-1">
                  <p className="max-w-[284px] text-sm mx-auto">
                    Nature and Quantity of Goods (incl. Dimensions or Volume)
                  </p>
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
                            stroke-width="1.9688"
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
                            stroke-width="1.9688"
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
                            stroke-width="1.9688"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="border-r-2 h-[40.557px] p-1">sadfjkl</div>
                      <div className="p-1">asdfkl</div>
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
                            stroke-width="1.9688"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="border-r-2 h-[49.023px] p-1">sdfghjk</div>
                      <div className="p-1">sdflasdfjk</div>
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
                            stroke-width="1.9688"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="border-r-2 h-[49.023px] p-1">sdfjhk</div>
                      <div className="p-1">sdfjkl</div>
                    </div>
                  </div>
                </div>
                {/* right */}
                <div className="py-[2px] px-1.5 border-b-2 w-full flex flex-col">
                  Other Charges dsfjhklkkjhgfds
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
                            stroke-width="1.9688"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="border-r-2 h-[49.023px] p-1">
                        sdasfasdasdfasdf
                      </div>
                      <div className="p-1">asdfdsgdf</div>
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
                            stroke-width="1.9688"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="border-r-2 h-[49.023px] p-1">
                        dffdssdfdsf
                      </div>
                      <div className="p-1">asdfgfdsf</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 divide-x-2">
                    <div className="h-[75.602px] bg-[#D9D9D9]" />
                    <div className="h-[75.602px] bg-[#D9D9D9]" />
                  </div>
                </div>
                {/* right side */}
                <div className="w-full flex flex-col justify-between">
                  <p className="px-[3px] text-sm">
                    Shipper certifies that the particulars on the face hereof
                    are correct and that{" "}
                    <span className="font-bold">
                      insofar as any part of the consignment contains dangerous
                      goods, such part is properly described by name and is in
                      proper condition for carriage by air according to the
                      applicable Dangerous Goods Regulations.
                    </span>{" "}
                  </p>
                  <div className="max-w-[513.463px] w-full mx-auto border-t-2 border-dashed text-center pb-2 pt-[8px]">
                    <p>Signature of Shipper or his Agent</p>
                  </div>
                </div>
              </div>
              {/* separator */}
              <div className="w-full flex">
                {/* mini left */}
                <div className="mini-preview-left-side shrink-0 border-r-2">
                  {/* Total prepaid & total collect */}
                  <div className="grid grid-cols-2 divide-x-2 border-b-2 h-[75.602px]">
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
                            stroke-width="1.9688"
                          />
                        </svg>
                      </div>
                      <div className="p-1">dfghjgfdsa</div>
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
                            stroke-width="1.9688"
                          />
                        </svg>
                      </div>
                      <div className="p-1">dfghjkhgf</div>
                    </div>
                  </div>
                  {/* Currency */}
                  <div className="grid grid-cols-2 divide-x-2 h-[75.602px] bg-[#D9D9D9]">
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
                          stroke-width="1.9688"
                        />
                      </svg>
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
              <div className="mini-preview-left-side shrink-0 border-r-2">
                {/* Destination */}
                <div className="grid grid-cols-2 divide-x-2 border-b-2 h-[75.602px] bg-[#D9D9D9]">
                  <div className="w-full flex items-center justify-center text-center">
                    For Carrier&rsquo;s Use only at Destination
                  </div>
                  <div className="relative w-full flex justify-center">
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
                        stroke-width="1.9688"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              {/* right side */}
              <div className="w-[263.622px] bg-[#D9D9D9] border-b-2 border-r-2">
                <div className="relative w-full flex justify-center">
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
                      stroke-width="1.9688"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="text-2xl font-bold text-[#231F20] text-center basis-1/2 mt-2">
            ORIGINAL 3 (FOR SHIPPER)
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirWaybillForm;
