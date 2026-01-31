"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye } from "react-icons/ai";
import { EyeClose } from "../../../components/svg/Svg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      "remember-me": false,
    },
  });

  const onSubmit = (data) => {
    const payload = {
      email: data.email,
      password: data.password,
    };
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center px-4 py-5 bg-[#F9F5EE]">
      <div className="max-w-[592px] w-full px-3 py-4 xs:p-6 flex flex-col justify-center items-center gap-3 sm:gap-4 md:gap-6 shrink-0 rounded-3xl border border-primary-blue bg-white-50">
        <div className="text-4xl xs:text-5xl sm:text-[60px] font-bold text-primary-black uppercase">
          logo
        </div>
        <div className="sm:space-y-3">
          <p className="text-xl sm:text-2xl text-center font-bold text-primary-black">
            Login to Your Account
          </p>
          <p className="text-black-300 max-xs:text-sm text-center">
            Log in to manage your shipments.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3.5 xs:space-y-5">
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
              placeholder="Enter Email"
              className={`form-input ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
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
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
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

          <div className="flex items-center gap-4 justify-between max-xs:text-sm">
            <label className="text-black-400 flex items-center gap-1 cursor-pointer">
              <input {...register("remember-me")} type="checkbox" />
              Remember me
            </label>
            <Link
              href={"/forgot-password"}
              className="font-medium underline text-primary-blue"
            >
              Forget Password?
            </Link>
          </div>

          <button
            type="submit"
            className="p-2.5 sm:p-4 rounded-2xl bg-primary-blue shadow-[0_0_8px_2px_rgba(1,216,255,0.16),0_0_8px_2px_rgba(1,216,255,0.16)] text-white text-lg font-medium w-full cursor-pointer hover:bg-primary-blue/85 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Login
          </button>

          <div className="text-black-400 font-medium text-center max-xs:text-sm">
            Do not have an account?{" "}
            <Link
              href={"/register"}
              className="text-primary-blue underline font-semibold"
            >
              Signup
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
