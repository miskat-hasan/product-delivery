"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye } from "react-icons/ai";
import { useRouter, useSearchParams } from "next/navigation";
import { useChangePassword } from "@/hooks/api/authApi";
import { toast } from "sonner";
import { EyeClose } from "../svg/Svg";

export default function ChangePasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const slug = searchParams.get("slug") || "";

  const [part1, part2] = slug.split(".");

  const decodedEmail = part1
    ? Buffer.from(part1, "base64").toString("utf-8")
    : "";

  const decodedOTP = part2 ? atob(part2) : "";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      new_password: "",
      new_password_confirmation: "",
    },
  });

  const password = watch("new_password");

  const { mutateAsync: changePasswordMutation, isPending } =
    useChangePassword();

  const onSubmit = (data) => {
    const payload = { email: decodedEmail, otp: decodedOTP, ...data };

    changePasswordMutation(payload, {
      onSuccess: (data) => {
        toast.success(data?.message);
        router.push("/login");
      },
    });
  };
  return (
    <section className="w-full min-h-screen flex items-center justify-center px-4 py-5 bg-[#F9F5EE]">
      <div className="max-w-[592px] w-full px-3 py-4 xs:p-6 flex flex-col justify-center items-center gap-3 sm:gap-4 md:gap-6 shrink-0 rounded-3xl border border-primary-blue bg-white-50">
        <div className="text-4xl xs:text-5xl sm:text-[60px] font-bold text-primary-black uppercase">
          logo
        </div>
        <div className="sm:space-y-3">
          <p className="text-xl sm:text-2xl font-bold text-primary-black">
            Change Your Password
          </p>
          <p className="text-black-300 max-xs:text-sm text-center">
            Enter your new password below.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
          {/* Password Input */}
          <div className="space-y-1">
            <div
              className={`form-input ${
                errors.password ? "border-red-500" : ""
              }`}
            >
              <input
                {...register("new_password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message:
                      "Password must contain uppercase, lowercase, and number",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                className="w-full outline-none"
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer"
              >
                {showPassword ? (
                  <AiFillEye className="size-[22px] text-[#6b6b6b]" />
                ) : (
                  <EyeClose />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-1">
            <div
              className={`form-input ${
                errors.new_password_confirmation ? "border-red-500" : ""
              }`}
            >
              <input
                {...register("new_password_confirmation", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                className="w-full outline-none"
              />
              <div
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiFillEye className="size-[22px] text-[#6b6b6b]" />
                ) : (
                  <EyeClose />
                )}
              </div>
            </div>
            {errors.new_password_confirmation && (
              <p className="text-red-500 text-sm">
                {errors.new_password_confirmation.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="p-2.5 sm:p-4 rounded-2xl bg-primary-blue shadow-[0_0_8px_2px_rgba(1,216,255,0.16),0_0_8px_2px_rgba(1,216,255,0.16)] text-white text-lg font-medium w-full cursor-pointer hover:bg-primary-blue/85 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Processing ..." : "Change Password"}
          </button>
        </form>
      </div>
    </section>
  );
}