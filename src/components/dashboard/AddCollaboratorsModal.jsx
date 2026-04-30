"use client";
import { useForm, useWatch } from "react-hook-form";
import { CloseSvg, MailSvg } from "../svg/Svg";
import {
  useAddCollaborator,
  useGetCollaboratorContent,
} from "@/hooks/api/dashboardApi";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState, useRef, useEffect } from "react";

const AddCollaboratorsModal = ({ onClose }) => {
  const {
    handleSubmit,
    register,
    setValue,
    control,
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

  // Combobox state
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCollaborator, setSelectedCollaborator] = useState(null);
  const comboboxRef = useRef(null);

  const selectedRole = useWatch({ control, name: "role" });

  const { data: collaborateContent, isLoading: collaborateContentLoading } =
    useGetCollaboratorContent();
  const { mutate: addCollaboratorMutation, isPending: addCollaboratorPending } =
    useAddCollaborator();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (comboboxRef.current && !comboboxRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset name/email when role changes
  useEffect(() => {
    setSelectedCollaborator(null);
    setSearchQuery("");
    setValue("name", "");
    setValue("email", "");
  }, [selectedRole, setValue]);

  // Filter collaborators by selected role and search query
  const allCollaborators = collaborateContent?.data?.user ?? [];
  const filteredCollaborators = allCollaborators.filter((c) => {
    const matchesRole = !selectedRole || c.role === selectedRole;
    const matchesSearch =
      !searchQuery ||
      c.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const handleSelectCollaborator = (collaborator) => {
    setSelectedCollaborator(collaborator);
    setSearchQuery(collaborator.full_name);
    setValue("name", collaborator.full_name, { shouldValidate: true });
    setValue("email", collaborator.email, { shouldValidate: true });
    setIsDropdownOpen(false);
  };

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
              <option value="carriers_agent">Carriers Agent</option>
              <option value="consignee">Consignee</option>
              <option value="custom_broker">Customs Broker</option>
              <option value="driver">Driver</option>
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
                    AWB-{item?.serial_id}
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

          {/* Name — Combobox */}
          <div className="space-y-1">
            <div className="text-black-500">Full Name</div>
            {/* Hidden input for react-hook-form registration */}
            <input
              type="hidden"
              {...register("name", { required: "Name is required" })}
            />
            <div ref={comboboxRef} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsDropdownOpen(true);
                  // Clear selection if user edits
                  if (
                    selectedCollaborator &&
                    e.target.value !== selectedCollaborator.full_name
                  ) {
                    setSelectedCollaborator(null);
                    setValue("name", "", { shouldValidate: true });
                    setValue("email", "");
                  }
                }}
                onFocus={() => setIsDropdownOpen(true)}
                placeholder={
                  !selectedRole
                    ? "Select a role first"
                    : "Search by name or email"
                }
                disabled={!selectedRole}
                className={`rounded-2xl p-4 border w-full outline-none bg-white-500 ${
                  errors.name
                    ? "border-red-500"
                    : "border-black-50 text-gray-300"
                } ${!selectedRole ? "opacity-60 cursor-not-allowed" : ""}`}
              />

              {/* Dropdown arrow */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              {/* Dropdown list */}
              {isDropdownOpen && selectedRole && (
                <div className="absolute z-50 mt-1 w-full bg-white rounded-2xl border border-black-50 shadow-lg max-h-52 overflow-y-auto">
                  {collaborateContentLoading ? (
                    <div className="p-4 text-gray-400 text-sm">Loading...</div>
                  ) : filteredCollaborators.length > 0 ? (
                    filteredCollaborators.map((collaborator, index) => (
                      <button
                        key={index}
                        type="button"
                        onMouseDown={() =>
                          handleSelectCollaborator(collaborator)
                        }
                        className={`w-full text-left px-4 py-3 hover:bg-[#ECF4F9] transition-colors flex flex-col gap-0.5 ${
                          index !== filteredCollaborators.length - 1
                            ? "border-b border-gray-100"
                            : ""
                        } ${
                          selectedCollaborator?.email === collaborator.email
                            ? "bg-[#ECF4F9]"
                            : ""
                        }`}
                      >
                        <span className="text-sm font-medium text-gray-800">
                          {collaborator.full_name}
                        </span>
                        <span className="text-xs text-gray-400">
                          {collaborator.email}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-gray-400 text-sm">
                      No collaborators found
                    </div>
                  )}
                </div>
              )}
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs pl-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email — auto-filled, disabled */}
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
              disabled
              placeholder="Auto-filled from selected name"
              className={`rounded-2xl p-4 border w-full outline-none bg-white-500 opacity-70 cursor-not-allowed ${
                errors.email
                  ? "border-red-500"
                  : "border-black-50 text-gray-300"
              }`}
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
