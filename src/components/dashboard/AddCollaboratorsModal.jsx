"use client";
import { useForm } from "react-hook-form";
import { CheckMarkSvg, CloseSvg, DownArrowSvg, MailSvg } from "../svg/Svg";
import { useState } from "react";
import { useAddCollaborator } from "@/hooks/api/dashboardApi";
import Swal from "sweetalert2";

const AddCollaboratorsModal = ({ onClose }) => {
  const form = useForm({
    defaultValues: {
      role: "",
      awb_serial_id: "",
      name: "",
      email: "",
      access_level: "",
    },
  });

  const { handleSubmit, register } = form;
  const [openEmailInvitation, setOpenEmailInvitation] = useState(false);

  // add new collaborator mutation
  const { mutate: addCollaboratorMutation, isPending: addCollaboratorPending } =
    useAddCollaborator();

  const onSubmit = (data) => {
    addCollaboratorMutation(data, {
      onSuccess: (data) => {
        Swal.fire({
          title: data?.data?.message,
          icon: "success",
        });
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#333333CC]">
      <div className="absolute inset-0" onClick={onClose} />
      <div
        className={`relative z-10 w-full bg-[#FEFEFE] max-w-[581px] max-h-[calc(100vh-50px)] overflow-y-auto p-2 sm:p-6 rounded-xl [&::-webkit-scrollbar]:hidden [scrollbar-width:none] sm:rounded-3xl border border-[#3D8FBE] mx-3`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-primary-black text-2xl font-medium">
            <MailSvg />
            Invite Collaborator
          </div>
          <button onClick={onClose} className="cursor-pointer">
            <CloseSvg />
          </button>
        </div>
        <p className="text-gray-300">
          Send an invitation to collaborate on AWB-2024-1234. They&rsquo;ll
          receive an email with access details.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="my-8 space-y-4">
          <div className="space-y-2">
            <div className="text-black-500">Collaborator Role</div>
            <select
              {...register("role")}
              className="rounded-2xl p-4 border border-black-50 bg-white-500 w-full text-gray-300 outline-none"
            >
              <option value={""} disabled>
                Select Collaborator role
              </option>
              <option value={"consignee"}>Consignee</option>
              <option value="custom_broker">Customs Broker</option>
              <option value="driver">Delivery Driver</option>
              <option value="carriers_agent">Carriers Agent</option>
              <option value="shipper">shipper</option>
            </select>
          </div>
          <div className="space-y-2">
            <div className="text-black-500">Select AWB</div>
            <select
              {...register("awb_serial_id")}
              className="rounded-2xl p-4 border border-black-50 bg-white-500 w-full text-gray-300 outline-none"
            >
              <option value={""} disabled>
                Select AWB NO
              </option>
              <option value={"AWB-2024-1234"}>AWB-2024-1234</option>
              <option value={"AWB-2024-1234"}>AWB-2024-1234</option>
              <option value={"AWB-2024-1234"}>AWB-2024-1234</option>
              <option value={"AWB-2024-1234"}>AWB-2024-1234</option>
            </select>
          </div>
          <div className="space-y-2">
            <div className="text-black-500">Full Name</div>
            <input
              type="text"
              {...register("name")}
              placeholder="Enter your collaborator’s name"
              className="rounded-2xl p-4 border border-black-50 bg-white-500 w-full text-gray-300 outline-none"
            />
          </div>
          <div className="space-y-2">
            <div className="text-black-500">Email Address</div>
            <input
              type="text"
              {...register("email")}
              placeholder="Enter your collaborator’s email"
              className="rounded-2xl p-4 border border-black-50 bg-white-500 w-full text-gray-300 outline-none"
            />
          </div>
          <div className="space-y-2">
            <div className="text-black-500">Access Level</div>
            <select
              {...register("access_level")}
              className="rounded-2xl p-4 border border-black-50 bg-white-500 w-full text-gray-300 outline-none"
            >
              <option value={""} disabled>
                Select Access Level
              </option>
              <option value={"Viewer"} className="flex flex-col">
                <p>Viewer -</p>
                <p> Can view shipment details and documents</p>
              </option>
              <option value={"Editor"} className="flex flex-col">
                <p>Editor -</p>
                <p> Can upload documents</p>
              </option>
            </select>
          </div>
          {/* <div className="py-4 px-3 rounded-[10px] border border-primary-blue bg-blue-50 w-full">
            <h6 className="text-lg font-medium text-black-500 mb-3">
              What happens next:
            </h6>
            <ul className="space-y-1.5">
              <li className="flex items-center gap-2 text-[#082E55]">
                <CheckMarkSvg className="size-4 text-blue-500" />
                An email invitation will be sent to the collaborator
              </li>
              <li className="flex items-center gap-2 text-[#082E55]">
                <CheckMarkSvg className="size-4 text-blue-500" />
                They&rsquo;ll receive a secure link to accept the invitation
              </li>
              <li className="flex items-center gap-2 text-[#082E55]">
                <CheckMarkSvg className="size-4 text-blue-500" />
                Once accepted, they can immediately access AWB AWB-123-44569874
              </li>
              <li className="flex items-center gap-2 text-[#082E55]">
                <CheckMarkSvg className="size-4 text-blue-500" />
                You can resend the invitation or revoke access anytime
              </li>
            </ul>
          </div> */}
          {/* <div>
            <button
              onClick={() => setOpenEmailInvitation((prev) => !prev)}
              className="rounded-2xl p-4 border cursor-pointer border-black-50 bg-white-500 w-full text-gray-300 outline-none flex items-center justify-between"
            >
              Preview invitation email
              <DownArrowSvg />
            </button>
            {openEmailInvitation && (
              <div className="p-2 sm:p-6 rounded-xl sm:rounded-2xl border border-black-100 space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-[#6A7282]">To: </p>
                    <p className="text-sm text-black-500">
                      collaborator@example.com
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6A7282]">Subject: </p>
                    <p className="text-sm text-[#101828]">
                      You&rsquo;ve been invited to collaborate on AWB: <br />
                      <span className="text-[#3D8FBE]">AWB-123-44569874</span>
                    </p>
                  </div>
                </div>
                <hr className="text-[#A1A1A1]" />
                <div className="space-y-3 text-sm">
                  <div>
                    <p>Hi there,</p>
                    <p>
                      You&rsquo;ve been invited to collaborate on shipment
                      AWB-123-44569874 with viewer access
                    </p>
                  </div>
                  <div className="rounded-[4px] bg-white-500 p-3 space-y-2">
                    <p className="text-[#4A5565]">
                      Access Level:{" "}
                      <span className="text-[#4A5565] font-medium">Viewer</span>
                    </p>
                    <p className="text-[#4A5565]">
                      • View shipment details and documents
                    </p>
                  </div>
                  <button className="py-2.5 sm:py-4 px-4 sm:px-8 text-blue-500 text-white rounded-2xl bg-blue-500 text-lg font-medium cursor-pointer hover:bg-blue-500/85">
                    Create New
                  </button>
                </div>
              </div>
            )}
          </div> */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex cursor-pointer items-center justify-center py-2 px-4 sm:p-4 rounded-xl sm:rounded-2xl border text-sm sm:text-lg sm:flex-1 border-blue-500 bg-[#ECF4F9] text-blue-500 font-medium"
            >
              Cancel
            </button>
            <button className="py-2 px-4 sm:p-4 flex items-center gap-1 text-blue-500 text-white rounded-xl sm:rounded-2xl flex-1 justify-center border bg-blue-500 text-sm sm:text-lg font-medium cursor-pointer hover:bg-blue-500/85">
              {/* <MailSvg className={"text-white"} /> */}
              {/* Send Invitation */}
              Add New Collaborator
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCollaboratorsModal;
