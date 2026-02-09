"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye } from "react-icons/ai";
import { EyeClose } from "../../../components/svg/Svg";
import { useRegister } from "@/hooks/api/authApi";
import { useRouter } from "next/navigation";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
    const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      role: "",
      password: "",
      password_confirmation: "",
      term_accept: false,
    },
  });

  const password = watch("password");

  const { mutateAsync: registerMutation, isPending } = useRegister();

  const onSubmit = (data) => {
    registerMutation(data, {
      onSuccess: () => {
        router.push(`/verify-code?email=${data?.email}`);
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
          <p className="text-xl sm:text-2xl text-center font-bold text-primary-black">
            Create Your Account
          </p>
          <p className="text-black-300 text-center">
            Sign up to manage your shipments.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-3.5 xs:space-y-5"
        >
          {/* Name Input */}
          <div className="space-y-1">
            <input
              {...register("full_name", {
                required: "Full name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Name can only contain letters and spaces",
                },
              })}
              type="text"
              placeholder="Enter your Full Name"
              className={`form-input ${errors.full_name ? "border-red-500" : ""}`}
            />
            {errors.full_name && (
              <p className="text-red-500 text-sm">{errors.full_name.message}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="space-y-1">
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              type="text"
              placeholder="Enter your Email Address"
              className={`form-input ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Role Select */}
          <div className="space-y-1">
            <select
              defaultValue=""
              {...register("role", {
                required: "Role is required",
              })}
              className={`form-input ${errors.role ? "border-red-500" : ""}`}
            >
              <option value="" disabled>
                Select role
              </option>
              <option value="shipper">Shipper</option>
              <option value="consignee">Consignee</option>
              <option value="carriers_agent">Carriers Agent</option>
              <option value="custom_broker">Custom Broker</option>
              <option value="driver">Driver</option>
            </select>

            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <div
              className={`form-input ${
                errors.password ? "border-red-500" : ""
              }`}
            >
              <input
                {...register("password", {
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
                placeholder="Enter your Password"
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
                errors.password_confirmation ? "border-red-500" : ""
              }`}
            >
              <input
                {...register("password_confirmation", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your Password"
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
            {errors.password_confirmation && (
              <p className="text-red-500 text-sm">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="space-y-1 max-xs:text-sm">
            <label className="text-black-400 flex items-center gap-1 cursor-pointer">
              <input
                {...register("term_accept", {
                  required: "You must agree to the terms and conditions",
                })}
                type="checkbox"
              />
              I agree to the Terms & Conditions
            </label>
            {errors.term_accept && (
              <p className="text-red-500 text-sm">
                {errors.term_accept.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="p-2.5 sm:p-4 rounded-2xl bg-primary-blue shadow-[0_0_8px_2px_rgba(1,216,255,0.16),0_0_8px_2px_rgba(1,216,255,0.16)] text-white text-lg font-medium w-full cursor-pointer hover:bg-primary-blue/85 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Creating ...." : "Create Account"}
          </button>
          <div className="text-black-400 font-medium text-center max-xs:text-sm">
            Already have an account?{" "}
            <Link
              href={"/login"}
              className="text-primary-blue underline font-semibold"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
