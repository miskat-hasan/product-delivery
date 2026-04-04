"use client";
import { useForm } from "react-hook-form";
import { CloseSvg, MailSvg } from "../svg/Svg";
import {
  useAddCollaborator,
  useGetCollaboratorContent,
} from "@/hooks/api/dashboardApi";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const AddCollaboratorsModal = ({ onClose }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "",
      awb_serial_id: "",
      name: "",
      email: "",
      access_level: "",
    },
  });

  const queryClient = useQueryClient();
  const { data: collaborateContent, isLoading: collaborateContentLoading } =
    useGetCollaboratorContent();
  const { mutate: addCollaboratorMutation, isPending: addCollaboratorPending } =
    useAddCollaborator();

  const onSubmit = (data) => {
    addCollaboratorMutation(data, {
      onSuccess: (data) => {
        onClose();
        queryClient.invalidateQueries("get-all-collaborator");
        toast.success(data?.message);
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message);
      },
    });
  };

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center bg-[#333333CC]">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative z-10 w-full bg-[#FEFEFE] max-w-[581px] max-h-[calc(100vh-50px)] overflow-y-auto p-2 sm:p-6 rounded-xl sm:rounded-3xl border border-[#3D8FBE] mx-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-primary-black text-2xl font-medium">
            <MailSvg />
            Invite Collaborator
          </div>
          <button onClick={onClose} className="cursor-pointer">
            <CloseSvg />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="my-8 space-y-4">
          {/* Role */}
          <div className="space-y-1">
            <div className="text-black-500">Collaborator Role</div>
            <select
              {...register("role", { required: "Role is required" })}
              className={`rounded-2xl p-4 border w-full outline-none bg-white-500 ${errors.role ? "border-red-500" : "border-black-50 text-gray-300"}`}
            >
              <option value="" disabled>
                Select Collaborator role
              </option>
              <option value="consignee">Consignee</option>
              <option value="custom_broker">Customs Broker</option>
              <option value="driver">Delivery Driver</option>
              <option value="carriers_agent">Carriers Agent</option>
              <option value="shipper">Shipper</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs pl-1">{errors.role.message}</p>
            )}
          </div>

          {/* AWB */}
          <div className="space-y-1">
            <div className="text-black-500">Select AWB</div>
            <select
              {...register("awb_serial_id", {
                required: "Please select an AWB",
              })}
              className={`rounded-2xl p-4 border w-full outline-none bg-white-500 ${errors.awb_serial_id ? "border-red-500" : "border-black-50 text-gray-300"}`}
            >
              <option value="" disabled>
                Select AWB NO
              </option>
              {collaborateContentLoading ? (
                <option>Loading ...</option>
              ) : collaborateContent?.data?.form_serial_id?.length > 0 ? (
                collaborateContent?.data?.form_serial_id?.map((item, index) => (
                  <option key={index} value={item?.serial_id}>
                    {item?.serial_id}
                  </option>
                ))
              ) : (
                <option disabled>No data found</option>
              )}
            </select>
            {errors.awb_serial_id && (
              <p className="text-red-500 text-xs pl-1">
                {errors.awb_serial_id.message}
              </p>
            )}
          </div>

          {/* Name */}
          <div className="space-y-1">
            <div className="text-black-500">Full Name</div>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="Enter name"
              className={`rounded-2xl p-4 border w-full outline-none bg-white-500 ${errors.name ? "border-red-500" : "border-black-50 text-gray-300"}`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs pl-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <div className="text-black-500">Email Address</div>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              placeholder="Enter email"
              className={`rounded-2xl p-4 border w-full outline-none bg-white-500 ${errors.email ? "border-red-500" : "border-black-50 text-gray-300"}`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs pl-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Access Level */}
          <div className="space-y-1">
            <div className="text-black-500">Access Level</div>
            <select
              {...register("access_level", {
                required: "Access level is required",
              })}
              className={`rounded-2xl p-4 border w-full outline-none bg-white-500 ${errors.access_level ? "border-red-500" : "border-black-50 text-gray-300"}`}
            >
              <option value="" disabled>
                Select Access Level
              </option>
              <option value="view">Viewer - Can view details</option>
              <option value="edit">Editor - Can upload documents</option>
            </select>
            {errors.access_level && (
              <p className="text-red-500 text-xs pl-1">
                {errors.access_level.message}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 rounded-2xl border border-blue-500 bg-[#ECF4F9] text-blue-500 font-medium cursor-pointer hover:bg-blue-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={addCollaboratorPending}
              className="flex-1 py-4 rounded-2xl bg-blue-500 text-white font-medium hover:bg-blue-500/70 cursor-pointer disabled:opacity-50"
            >
              {addCollaboratorPending ? "Adding..." : "Add New Collaborator"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCollaboratorsModal;
