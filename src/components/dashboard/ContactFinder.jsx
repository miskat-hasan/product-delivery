"use client";
import { useState } from "react";
import { CloseSvg, MailSvg, PlusSvg, SearchSvg } from "../svg/Svg";
import { useForm } from "react-hook-form";
import { GetAllUserContact, useAddUserContact } from "@/hooks/api/dashboardApi";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";

const ContactFinder = ({ onClose, contactFinder, onSelect }) => {
  const [addItemModal, setAddItemModal] = useState(false);

  const [selectedContact, setSelectedContact] = useState(null);

  const { register, reset, handleSubmit } = useForm();

  const [role, setRole] = useState(contactFinder);

  const { data, isLoading } = GetAllUserContact(role);

  const { mutate, isPending } = useAddUserContact();

  const queryClient = useQueryClient();

  const onSubmit = (data) => {
    const payload = {
      ...data,
      role:
        contactFinder === "shipper"
          ? "shipper"
          : contactFinder === "consignee"
            ? "consignee"
            : "carriers_agent",
    };

    mutate(payload, {
      onSuccess: (data) => {
        reset();
        setAddItemModal(false);
        Swal.fire({
          title: data?.message,
          icon: "success",
        });
        queryClient.invalidateQueries("get-all-user-contact-info");
      },
      onError: (err) => {
        Swal.fire({
          title: err?.response?.data?.message || "Something went wrong",
          icon: "error",
        });
      },
    });
  };

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center bg-[#333333CC]">
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
              <button
                onClick={() => setAddItemModal(true)}
                className="size-8 flex items-center justify-center rounded-full bg-[#F3F3F5] hover:bg-[#e5e5e6] cursor-pointer"
              >
                <PlusSvg />
              </button>
              <button onClick={onClose} className="cursor-pointer">
                <CloseSvg />
              </button>
            </div>
          </div>
          {/* <div className="flex items-center gap-5 mb-5">
            <input
              type="text"
              className="text-sm h-[36px] outline-none text-[#717182] flex-1 py-1 px-5 rounded-lg border border-[#00000000] bg-[#F3F3F5]"
              placeholder="Search by AC number, name, or address..."
            />
            <button className="flex items-center h-[36px] gap-2.5 px-2.5 py-1 cursor-pointer transition-colors bg-[#F3F3F5] hover:bg-[#e8e8eb] rounded-lg border border-[#00000000] text-sm text-[#717182]">
              <SearchSvg />
              Search
            </button>
          </div> */}

          <div className="w-full mb-8">
            <table className="w-full">
              <thead className="text-nowrap">
                <tr>
                  <th className="text-[#222] font-medium pb-5 border-b text-left px-2"></th>
                  <th className="text-[#222] font-medium pb-5 border-b text-left px-2">
                    Account Number
                  </th>
                  <th className="text-[#222] font-medium pb-5 border-b px-2">
                    {contactFinder === "shipper"
                      ? "Shipper’s Name"
                      : contactFinder === "consignee"
                        ? "Consignee’s Name"
                        : "Carrier Agent’s Name"}
                  </th>
                  <th className="text-[#222] font-medium pb-5 border-b px-2">
                    {contactFinder === "shipper"
                      ? "Shipper’s Address"
                      : contactFinder === "consignee"
                        ? "Consignee’s Address"
                        : "Carrier Agent’s Address"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index} className="animate-pulse">
                        {/* Checkbox Column */}
                        <td className="pt-5 pr-2">
                          <div className="size-4 bg-gray-200 rounded" />
                        </td>

                        {/* Account Number Column */}
                        <td className="pt-5 pr-4">
                          <div className="h-4 w-24 bg-gray-100 rounded" />
                        </td>

                        {/* Name Column */}
                        <td className="pt-5 pr-4">
                          <div className="h-4 w-32 bg-gray-100 rounded" />
                        </td>

                        {/* Address Column */}
                        <td className="pt-5">
                          <div className="h-4 w-full max-w-[180px] bg-gray-50 rounded" />
                        </td>
                      </tr>
                    ))
                  : data?.data?.map((item, index) => (
                      <tr key={index} className="">
                        <td className="pt-5 pr-2 text-left">
                          <input
                            type="checkbox"
                            checked={selectedContact?.id === item.id}
                            onChange={() => setSelectedContact(item)}
                            className="cursor-pointer"
                          />
                        </td>
                        <td className="pt-5 text-[#717182] font-normal text-sm text-left">
                          {item?.account_number}
                        </td>
                        <td className="pt-5 text-[#717182] font-normal text-sm">
                          {item?.full_name}
                        </td>
                        <td className="pt-5 text-[#717182] font-normal text-sm">
                          {item?.city} {item?.state} {item?.country}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={onClose}
              className="flex items-center justify-center px-6 py-2.5 gap-2.5 rounded-2xl w-[152px] border border-blue-500 bg-[#ECF4F9] hover:bg-[#dde5eb] text-blue-500 font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (!selectedContact) {
                  Swal.fire({
                    title: "Please select a contact",
                    icon: "warning",
                  });
                  return;
                }

                onSelect(selectedContact);
                onClose();
              }}
              className="py-2.5 px-8 rounded-2xl w-[152px] bg-blue-500 text-white font-medium hover:bg-blue-500/85"
            >
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
              {contactFinder === "shipper"
                ? "Add Shipper’s"
                : contactFinder === "consignee"
                  ? "Add Consignee’s"
                  : "Add Carrier Agent’s"}
            </div>
            <button
              onClick={() => setAddItemModal(false)}
              className="cursor-pointer"
            >
              <CloseSvg />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="my-8 space-y-4">
            <div className="space-y-2">
              <div className="text-black-500">Account Number</div>
              <input
                type="text"
                {...register("account_number")}
                placeholder="Enter Account Number"
                className="rounded-2xl p-4 border border-black-50 bg-white-500 w-full text-gray-300 outline-none"
              />
            </div>
            <div className="space-y-2">
              <div className="text-black-500">Name and Address</div>
              <textarea
                cols={3}
                {...register("name_address")}
                className="rounded-2xl p-4 border border-black-50 bg-white-500 w-full text-gray-300 outline-none"
              ></textarea>
            </div>
            <div className="flex items-center justify-end gap-2 mt-5">
              <button
                onClick={() => setAddItemModal(false)}
                className="flex items-center justify-center px-6 py-4 text-lg gap-2.5 rounded-2xl flex-1 border border-blue-500 bg-[#ECF4F9] hover:bg-[#dce7ee] text-blue-500 font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-4 text-lg border px-8 text-blue-500 text-white rounded-2xl flex-1 bg-blue-500 font-medium cursor-pointer hover:bg-blue-500/85"
                disabled={isPending}
              >
                {isPending ? "Adding..." : "Add"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ContactFinder;
