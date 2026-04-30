"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useVerifyOTP, useResendOPT } from "@/hooks/api/authApi";

const VerifyOTP = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();

  const [timer, setTimer] = useState(30);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const { mutateAsync: verifyOTPMutation, isPending } = useVerifyOTP();

  const { mutate: resendOtpMutation, isPending: resendOtpPending } =
    useResendOPT();

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const onSubmit = (data) => {
    const payload = {
      email,
      otp: data?.otp,
    };

    const slug = `${btoa(email)}.${btoa(String(data?.otp))}`;

    verifyOTPMutation(payload, {
      onSuccess: () => {
        router.push(`/change-password?slug=${slug}`);
      },
    });
  };

  const handleResendOtp = () => {
    if (!email || timer > 0) return;

    resendOtpMutation(
      { email },
      {
        onSuccess: () => {
          setTimer(30);
        },
      }
    );
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center px-4 py-5 bg-[#F9F5EE]">
      <div className="max-w-[592px] w-full px-3 py-4 xs:p-6 flex flex-col justify-center items-center gap-6 rounded-3xl border border-primary-blue bg-white-50">
        <div className="text-4xl xs:text-5xl sm:text-[60px] font-bold uppercase">
          logo
        </div>

        <p className="sm:text-2xl font-bold text-center">
          Please check your email and enter the login code in the field
          provided.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
          <div className="space-y-1">
            <input
              {...register("otp", {
                required: "Verification code is required",
                pattern: {
                  value: /^\d{5}$/,
                  message: "Code must be exactly 5 digits",
                },
              })}
              type="text"
              maxLength={5}
              placeholder="Enter your 5-digit access code"
              className={`form-input ${errors.otp ? "border-red-500" : ""}`}
            />

            {errors.otp && (
              <p className="text-red-500 text-sm">{errors.otp.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="p-4 rounded-2xl bg-primary-blue text-white w-full disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {isPending ? "Verifying..." : "Verify & Continue"}
          </button>

          <button
            type="button"
            onClick={handleResendOtp}
            disabled={timer > 0 || resendOtpPending}
            className="w-full text-primary-blue underline disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {resendOtpPending
              ? "Resending..."
              : timer > 0
              ? `Resend OTP in ${timer}s`
              : "Resend OTP"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default VerifyOTP;