"use client";
import { useState } from "react";
import { CloseSvg, MailSvg, PlusSvg, SearchSvg } from "../svg/Svg";

const ContactFinder = ({ onClose }) => {
  const [addItemModal, setAddItemModal] = useState(false);
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#333333CC]">
      <div className="absolute inset-0" onClick={onClose} />
      {!addItemModal ? (
        <div
          className={`relative z-10 w-full bg-[#FEFEFE] max-w-[581px] max-h-[calc(100vh-50px)] overflow-y-auto px-6 py-[30px] rounded-3xl border border-[#3D8FBE] mx-3`}
        >
          <div className="flex items-center justify-between mb-5">
            <div className="text-primary-black text-2xl font-medium">
              Contact finder
            </div>
            <div className="flex items-center gap-5">
              <button onClick={()=> setAddItemModal(true)} className="size-8 flex items-center justify-center rounded-full bg-[#F3F3F5] hover:bg-[#e5e5e6] cursor-pointer">
                <PlusSvg />
              </button>
              <button onClick={onClose} className="cursor-pointer">
                <CloseSvg />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-5 mb-5">
            <input
              type="text"
              className="text-sm h-[36px] outline-none text-[#717182] flex-1 py-1 px-5 rounded-lg border border-[#00000000] bg-[#F3F3F5]"
              placeholder="Search by AWB number, consignee name, or reference..."
            />
            <button className="flex items-center h-[36px] gap-2.5 px-2.5 py-1 cursor-pointer transition-colors bg-[#F3F3F5] hover:bg-[#e8e8eb] rounded-lg border border-[#00000000] text-sm text-[#717182]">
              <SearchSvg />
              Search
            </button>
          </div>
          <div className="w-full mb-8">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-[#222] font-medium pb-5 border-b text-left">
                    Account Number
                  </th>
                  <th className="text-[#222] font-medium pb-5 border-b">
                    Shipper’s Name
                  </th>
                  <th className="text-[#222] font-medium pb-5 border-b">
                    Shipper’s Address
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array(6)
                  .fill(null)
                  .map((_, index) => (
                    <tr key={index} className="">
                      <th className="pt-5 text-[#717182] font-normal text-sm text-left">
                        001-64343416
                      </th>
                      <th className="pt-5 text-[#717182] font-normal text-sm">
                        Mosfiqur Rahman
                      </th>
                      <th className="pt-5 text-[#717182] font-normal text-sm">
                        Dhaka, Bangladesh
                      </th>
                    </tr>
                  ))}
                <tr></tr>
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-end gap-2">
            <button onClick={onClose} className="flex items-center justify-center px-6 py-2.5 gap-2.5 rounded-2xl w-[152px] border border-blue-500 bg-[#ECF4F9] hover:bg-[#dde5eb] text-blue-500 font-medium cursor-pointer">
              Cancel
            </button>
            <button className="py-2.5 border px-8 text-blue-500 text-white rounded-2xl w-[152px] bg-blue-500 font-medium cursor-pointer hover:bg-blue-500/85">
              Select
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`relative z-10 w-full bg-[#FEFEFE] max-w-[581px] max-h-[calc(100vh-50px)] overflow-y-auto p-6 rounded-3xl border border-[#3D8FBE] mx-3`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-primary-black text-2xl font-medium">
              <MailSvg />
              Add Shipper’s
            </div>
            <button onClick={()=> setAddItemModal(false)} className="cursor-pointer">
              <CloseSvg />
            </button>
          </div>
          <form className="my-8 space-y-4">
            <div className="space-y-2">
              <div className="text-black-500">Full Name</div>
              <input
                type="text"
                placeholder="Enter your shipper name"
                className="rounded-2xl p-4 border border-black-50 bg-white-500 w-full text-gray-300 outline-none"
              />
            </div>
            <div className="space-y-2">
              <div className="text-black-500">Email Address</div>
              <input
                type="text"
                placeholder="Enter shipper email"
                className="rounded-2xl p-4 border border-black-50 bg-white-500 w-full text-gray-300 outline-none"
              />
            </div>
            <div className="space-y-2">
              <div className="text-black-500">Address</div>
              <input
                type="text"
                placeholder="Enter shipper address"
                className="rounded-2xl p-4 border border-black-50 bg-white-500 w-full text-gray-300 outline-none"
              />
            </div>
            <div className="flex gap-4">
              <div className="space-y-2">
                <div className="text-black-500">City</div>
                <input
                  type="text"
                  placeholder="City"
                  className="rounded-2xl p-4 border border-black-50 bg-white-500 w-full text-gray-300 outline-none"
                />
              </div>
              <div className="space-y-2">
                <div className="text-black-500">State</div>
                <input
                  type="text"
                  placeholder="State"
                  className="rounded-2xl p-4 border border-black-50 bg-white-500 w-full text-gray-300 outline-none"
                />
              </div>
              <div className="space-y-2">
                <div className="text-black-500">Country</div>
                <input
                  type="text"
                  placeholder="Country"
                  className="rounded-2xl p-4 border border-black-50 bg-white-500 w-full text-gray-300 outline-none"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-5">
              <button onClick={()=> setAddItemModal(false)} className="flex items-center justify-center px-6 py-4 text-lg gap-2.5 rounded-2xl flex-1 border border-blue-500 bg-[#ECF4F9] hover:bg-[#dce7ee] text-blue-500 font-medium cursor-pointer">
                Cancel
              </button>
              <button className="py-4 text-lg border px-8 text-blue-500 text-white rounded-2xl flex-1 bg-blue-500 font-medium cursor-pointer hover:bg-blue-500/85">
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ContactFinder;
