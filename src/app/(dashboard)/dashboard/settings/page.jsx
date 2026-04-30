"use client";

import { useEffect, useState, useRef } from "react";
import {
  useGetUserProfile,
  useUpdateUserProfile,
  useChangePassword,
} from "@/hooks/api/dashboardApi";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Eye icons inline to avoid extra deps
const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
    />
  </svg>
);

const Page = () => {
  const fileInputRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  // Password visibility states
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ── Profile form ──────────────────────────────────────────
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { full_name: "", email: "", role: "" },
  });

  // ── Password form ─────────────────────────────────────────
  const {
    register: registerPwd,
    handleSubmit: handleSubmitPwd,
    watch: watchPwd,
    reset: resetPwd,
    formState: { errors: pwdErrors },
  } = useForm({
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_new_password: "",
    },
  });

  const { data, isLoading } = useGetUserProfile();
  const { mutate: updateProfile, isPending: updatePending } =
    useUpdateUserProfile();
  const { mutate: changePassword, isPending: changePwdPending } =
    useChangePassword?.() ?? { mutate: () => {}, isPending: false };

  // Fill form with fetched user data
  useEffect(() => {
    if (data?.data) {
      reset({
        full_name: data.data.full_name || "",
        email: data.data.email || "",
        role: data.data.roles[0]?.name || "",
      });
      if (data?.data?.avatar_path) {
        setAvatarPreview(
          process.env.NEXT_PUBLIC_SITE_URL + "/" + data?.data?.avatar_path,
        );
      }
    }
  }, [data, reset]);

  // Handle avatar file selection
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  // Submit profile update
  const onSubmitProfile = (values) => {
    const formData = new FormData();
    formData.append("full_name", values.full_name);
    if (avatarFile) {
      formData.append("avatar_path", avatarFile);
    }

    updateProfile(formData, {
      onSuccess: (res) => {
        toast.success(res?.message || "Profile updated successfully");
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Failed to update profile");
      },
    });
  };

  // Reset profile form back to fetched values
  const handleProfileReset = () => {
    reset({
      full_name: data?.data?.full_name || "",
      email: data?.data?.email || "",
    });
    setAvatarFile(null);
    setAvatarPreview(
      process.env.NEXT_PUBLIC_SITE_URL + "/" + data?.data?.avatar_path || null,
    );
  };

  // Submit password change
  const onSubmitPassword = (values) => {
    changePassword(
      {
        current_password: values.current_password,
        new_password: values.new_password,
        new_password_confirmation: values.confirm_new_password,
      },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Password changed successfully");
          resetPwd();
        },
        onError: (err) => {
          toast.error(
            err?.response?.data?.message || "Failed to change password",
          );
        },
      },
    );
  };

  return (
    <div>
      <h3 className="text-[#333] text-[36px] font-medium">Settings</h3>
      <p className="text-blue-500 mt-2.5 font-medium">User Profile</p>

      {/* ── Profile Section ── */}
      <form
        onSubmit={handleSubmit(onSubmitProfile)}
        className="flex w-full max-w-[1072px] py-10 px-3 md:px-6 flex-col justify-center items-end gap-10 bg-[#FEFEFE] mt-5 mb-10"
      >
        <div className="flex flex-wrap justify-between items-start self-stretch gap-6">
          {/* Avatar */}
          <div className="flex w-[280px] flex-col items-center gap-6 px-3 md:px-7">
            <div
              className="size-[150px] md:size-[223px] rounded-full border border-[#A1A1A1] overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {isLoading ? (
                <div className="size-full animate-pulse bg-gray-200 rounded-full" />
              ) : avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  className="size-full object-cover"
                />
              ) : (
                <span className="text-4xl text-gray-300 select-none">
                  {data?.data?.full_name?.[0]?.toUpperCase() || "?"}
                </span>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex py-[10px] px-[20px] justify-center items-center gap-[14px] self-stretch rounded-[16px] border border-solid border-[#A1A1A1] text-[#333] text-center text-[14px] font-medium not-italic leading-6 cursor-pointer hover:bg-gray-100 transition duration-300"
            >
              Upload Photo
            </button>
          </div>

          {/* Fields */}
          <div className="flex flex-col items-start gap-[20px] flex-1 min-w-[280px]">
            {/* Full Name */}
            <div className="flex flex-col items-start gap-[8px] w-full">
              <div className="text-[#333] text-lg md:text-2xl font-normal not-italic leading-[36px]">
                Full Name
              </div>
              {isLoading ? (
                <div className="w-full h-[70px] bg-gray-200 animate-pulse rounded-[16px]" />
              ) : (
                <input
                  type="text"
                  {...register("full_name", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  className="flex w-full md:h-[70px] py-3 px-2 md:p-[16px] items-center gap-[13px] shrink-0 rounded-[16px] border border-solid border-[#A1A1A1] text-[#6B6B6B] text-[18px] font-normal not-italic leading-[27px] outline-none focus:border-blue-400"
                />
              )}
              {errors.full_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.full_name.message}
                </p>
              )}
            </div>

            {/* Email (read-only) */}
            <div className="flex flex-col items-start gap-[8px] w-full">
              <div className="text-[#333] text-lg md:text-2xl font-normal not-italic leading-[36px]">
                Email
              </div>
              {isLoading ? (
                <div className="w-full h-[70px] bg-gray-200 animate-pulse rounded-[16px]" />
              ) : (
                <input
                  type="text"
                  disabled
                  {...register("email")}
                  className="rounded-[16px] border border-solid border-[#A1A1A1] bg-[#F5F5F5] flex w-full md:h-[70px] py-3 px-2 md:p-[16px] items-center gap-[13px] shrink-0 text-[#6B6B6B] text-[18px] font-normal not-italic leading-[27px] cursor-not-allowed"
                />
              )}
            </div>
            {/* role */}
            <div className="flex flex-col items-start gap-[8px] w-full">
              <div className="text-[#333] text-lg md:text-2xl font-normal not-italic leading-[36px]">
                Role
              </div>
              {isLoading ? (
                <div className="w-full h-[70px] bg-gray-200 animate-pulse rounded-[16px]" />
              ) : (
                <input
                  type="text"
                  disabled
                  {...register("role")}
                  className="rounded-[16px] border border-solid border-[#A1A1A1] bg-[#F5F5F5] flex w-full md:h-[70px] py-3 px-2 md:p-[16px] items-center gap-[13px] shrink-0 text-[#6B6B6B] text-[18px] font-normal not-italic leading-[27px] cursor-not-allowed"
                />
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center md:justify-end max-md:w-full md:items-start gap-[16px]">
          <button
            type="button"
            onClick={handleProfileReset}
            className="flex md:w-[132px] py-2 md:py-[12px] px-[20px] justify-center items-center gap-[14px] rounded-[16px] border border-solid border-[#B6BAC3] text-[#262626] text-center text-[16px] font-medium not-italic leading-[26px] cursor-pointer hover:bg-gray-100 transition duration-300"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={updatePending}
            className="flex md:w-[167px] py-2 md:py-[12px] px-[20px] justify-center items-center gap-[14px] rounded-[16px] bg-[#3D8FBE] text-[#FFF] text-center text-[16px] font-medium not-italic leading-[26px] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer hover:bg-[#3D8FBE]/80 transition duration-300"
          >
            {updatePending ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>

      {/* ── Password Section ── */}
      <p className="text-blue-500 mt-2.5 font-medium">Password Change</p>

      <form
        onSubmit={handleSubmitPwd(onSubmitPassword)}
        className="flex max-w-[1072px] py-10 px-3 md:px-6 flex-col gap-10 bg-[#FEFEFE] mt-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
          {/* Current Password */}
          <div className="flex flex-col items-start gap-[8px]">
            <div className="text-[#333] text-lg md:text-2xl font-normal not-italic leading-[36px]">
              Current Password
            </div>
            <div className="relative w-full">
              <input
                type={showCurrent ? "text" : "password"}
                {...registerPwd("current_password", {
                  required: "Current password is required",
                })}
                className="flex md:h-[70px] p-3 md:p-[16px] pr-[50px] items-center gap-[13px] shrink-0 w-full rounded-[16px] border border-solid border-[#A1A1A1] text-[#6B6B6B] text-[18px] outline-none focus:border-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowCurrent((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1A1A1] hover:text-[#333]"
              >
                {showCurrent ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {pwdErrors.current_password && (
              <p className="text-red-500 text-sm">
                {pwdErrors.current_password.message}
              </p>
            )}
          </div>

          {/* Empty cell to keep grid layout (matching original <br />) */}
          <div />

          {/* New Password */}
          <div className="flex flex-col items-start gap-[8px]">
            <div className="text-[#333] text-lg md:text-2xl font-normal not-italic leading-[36px]">
              New Password
            </div>
            <div className="relative w-full">
              <input
                type={showNew ? "text" : "password"}
                {...registerPwd("new_password", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className="flex md:h-[70px] p-3 md:p-[16px] pr-[50px] items-center gap-[13px] shrink-0 w-full rounded-[16px] border border-solid border-[#A1A1A1] text-[#6B6B6B] text-[18px] outline-none focus:border-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowNew((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1A1A1] hover:text-[#333]"
              >
                {showNew ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {pwdErrors.new_password && (
              <p className="text-red-500 text-sm">
                {pwdErrors.new_password.message}
              </p>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="flex flex-col items-start gap-[8px]">
            <div className="text-[#333] text-lg md:text-2xl font-normal not-italic leading-[36px]">
              Confirm New Password
            </div>
            <div className="relative w-full">
              <input
                type={showConfirm ? "text" : "password"}
                {...registerPwd("confirm_new_password", {
                  required: "Please confirm your new password",
                  validate: (val) =>
                    val === watchPwd("new_password") ||
                    "Passwords do not match",
                })}
                className="flex md:h-[70px] p-3 md:p-[16px] pr-[50px] items-center gap-[13px] shrink-0 w-full rounded-[16px] border border-solid border-[#A1A1A1] text-[#6B6B6B] text-[18px] outline-none focus:border-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1A1A1] hover:text-[#333]"
              >
                {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {pwdErrors.confirm_new_password && (
              <p className="text-red-500 text-sm">
                {pwdErrors.confirm_new_password.message}
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center md:justify-end md:items-start max-md:w-full gap-[16px]">
          <button
            type="button"
            onClick={() => resetPwd()}
            className="flex md:w-[132px] py-2 md:py-[12px] px-[20px] justify-center items-center gap-[14px] rounded-[16px] border border-solid border-[#B6BAC3] text-[#262626] text-center text-[16px] font-medium not-italic leading-[26px] cursor-pointer hover:bg-gray-100 transition duration-300"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={changePwdPending}
            className="flex md:w-[167px] py-2 md:py-3 px-3 justify-center items-center gap-[14px] rounded-[16px] bg-[#3D8FBE] text-[#FFF] text-center text-[16px] font-medium not-italic leading-[26px] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer hover:bg-[#3D8FBE]/80 transition duration-300"
          >
            {changePwdPending ? "Changing..." : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
