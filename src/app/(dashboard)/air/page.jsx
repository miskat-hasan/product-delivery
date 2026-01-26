import { FilePlusSvg } from "@/components/svg/Svg";
import React from "react";

const AirWaybillForm = () => {
  return (
    <div className="w-full py-10">
      <div className="w-full max-w-[1418px] mx-auto">
        <h5 className="text-3xl flex justify-end mb-2">777-12345675</h5>
        <div className="border-2 relative">
          <div className="absolute size-[61px] -top-[62px] left-[121.84] border-l-2 border-r-2" />
          {/* separator */}
          <div className="w-full grid grid-cols-2">
            <div className="border-r-2 flex flex-col">
              <div className="grid grid-cols-2">
                <div className="p-2 flex flex-col">
                  <p className="text-black text-xl">
                    Shipper&rsquo;s Name and Address
                  </p>
                  <div className="flex items-center justify-center size-[44px] bg-[#F5F5F5] rounded-full mt-[10px] self-end">
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
            <div className="flex flex-col">
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
          <div className="w-full grid grid-cols-2">
            {/* left */}
            <div className="border-r-2">
              <div className="grid grid-cols-2">
                <div className="p-2 flex flex-col">
                  <p className="text-black text-xl">
                    Consignee&rsquo;s Name and Address
                  </p>
                  <div className="flex items-center justify-center size-[44px] bg-[#F5F5F5] rounded-full mt-[10px] self-end">
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
            <div className="px-2 py-3 text-[15.75px] border-b-2">
              It is agreed that the goods described herein are accepted in
              apparent good order and condition (except as noted) for carriage
              SUBJECT TO THE CONDITIONS OF CONTRACT ON THE REVERSE HEREOF. ALL
              GOODS MAY BE CARRIED BY ANY OTHER MEANS INCLUDING ROAD OR ANY
              OTHER CARRIER UNLESS SPECIFIC CONTRARY INSTRUCTIONS ARE GIVEN
              HEREON BY THE SHIPPER, AND SHIPPER AGREES THAT THE SHIPMENT MAY BE
              CARRIED VIA INTERMEDIATE STOPPING PLACES WHICH THE CARRIER DEEMS
              APPROPRIATE. THE SHIPPER'S ATTENTION IS DRAWN TO THE NOTICE
              CONCERNING CARRIER'S LIMITATION OF LIABILITY. Shipper may increase
              such limitation of liability by declaring a higher value for
              carriage and paying a supplemental charge if required.
            </div>
          </div>
          {/* separator */}
          <div className="w-full grid grid-cols-2">
            {/* left */}
            <div className="border-r-2">
              <div className="px-[10px] pb-[10px] border-b-2">
                <div className="my-[8px] flex items-center justify-between">
                  <p>Issuing Carrier&rsquo;s Agent Name and City</p>
                  <div className="flex items-center justify-center size-[44px] bg-[#F5F5F5] rounded-full mt-[10px] self-end">
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
            <div className="text-xl px-2 py-3 border-b-2">Accounting Information</div>
          </div>
              {/* separator */}
          <div className="w-full grid grid-cols-2">
            {/* left */}
            <div className="border-r-2">
                 <div className="p-[10px]">
                Airport of Departure (Addr. of First Carrier) and Requested Routing
              </div>
            </div>
            {/* right */}
            <div>

            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AirWaybillForm;
