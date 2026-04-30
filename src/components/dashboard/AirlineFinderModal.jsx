"use client";
import { useState } from "react";
import { CloseSvg, MailSvg, PlusSvg } from "../svg/Svg";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { GetAllUserContact, useAddUserContact } from "@/hooks/api/dashboardApi";

const AirlineFinderModal = ({ onClose, onSelect }) => {
  const [addItemModal, setAddItemModal] = useState(false);

  const [selectedContact, setSelectedContact] = useState(null);

  const { register, reset, handleSubmit } = useForm();

  const { data, isLoading } = GetAllUserContact("user");

  const { mutate, isPending } = useAddUserContact();

  const onSubmit = (data) => {
    // mutate(payload, {
    //   onSuccess: (data) => {
    //     reset();
    //     setAddItemModal(false);
    //     Swal.fire({
    //       title: data?.message,
    //       icon: "success",
    //     });
    //     queryClient.invalidateQueries("get-all-user-contact-info");
    //   },
    //   onError: (err) => {
    //     Swal.fire({
    //       title: err?.response?.data?.message || "Something went wrong",
    //       icon: "error",
    //     });
    //   },
    // });
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
              Airline finder
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

          <div className="w-full mb-8">
            <table className="w-full">
              <thead className="text-nowrap">
                <tr>
                  <th className="text-[#222] font-medium pb-5 border-b text-left px-2"></th>
                  <th className="text-[#222] font-medium pb-5 border-b text-left px-2">
                    Prefix
                  </th>
                  <th className="text-[#222] font-medium pb-5 border-b px-2">
                    Code
                  </th>
                  <th className="text-[#222] font-medium pb-5 border-b px-2">
                    Name
                  </th>
                  <th className="text-[#222] font-medium pb-5 border-b px-2">
                    Preloaded
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      <td className="pt-5 pr-2">
                        <div className="size-4 bg-gray-200 rounded" />
                      </td>

                      <td className="pt-5 pr-4">
                        <div className="h-4 w-24 bg-gray-100 rounded" />
                      </td>

                      <td className="pt-5 pr-4">
                        <div className="h-4 w-full max-w-[180px] bg-gray-50 rounded" />
                      </td>

                      <td className="pt-5 pr-4">
                        <div className="h-4 w-32 bg-gray-100 rounded" />
                      </td>
                      <td className="pt-5">
                        <div className="h-4 w-32 bg-gray-100 rounded" />
                      </td>


                    </tr>
                  ))
                ) : data?.data?.length > 0 ? (
                  data?.data?.map((item, index) => (
                    <tr key={index} className="">
                      <td className="pt-5 pr-2 text-left">
                        <input
                          type="checkbox"
                          // checked={selectedContact?.id === item.id}
                          // onChange={() => setSelectedContact(item)}
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
                  ))
                ) : (
                  <tr>
                    <td></td>
                    <td>No Data found</td>
                  </tr>
                )}
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
              // onClick={() => {
              //   if (!selectedContact) {
              //     Swal.fire({
              //       title: "Please select a contact",
              //       icon: "warning",
              //     });
              //     return;
              //   }

              //   onSelect(selectedContact);
              //   onClose();
              // }}
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
              Add user airline
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
              <div className="text-black-500">Airline prefix</div>
              <input
                type="text"
                {...register("airline_prefix")}
                className="rounded-2xl p-4 border border-black-50 bg-white-500 w-full text-gray-300 outline-none"
              />
            </div>
            <div className="space-y-2">
              <div className="text-black-500">Airline designator</div>
              <input
                type="text"
                {...register("airline_designator")}
                className="rounded-2xl p-4 border border-black-50 bg-white-500 w-full text-gray-300 outline-none"
              />
            </div>
            <div className="space-y-2">
              <div className="text-black-500">Airline name</div>
              <input
                type="text"
                {...register("airline_name")}
                className="rounded-2xl p-4 border border-black-50 bg-white-500 w-full text-gray-300 outline-none"
              />
            </div>
            <div className="space-y-2">
              <div className="text-black-500">Airline text</div>
              <textarea
                cols={3}
                {...register("airline_text")}
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

export default AirlineFinderModal;
