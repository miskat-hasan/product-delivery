"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";


const VerifyCode = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      verify_code: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // Add your verify code API call here
    // On success, navigate to change password page
    // router.push('/change-password');
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center px-4 py-5 bg-[#F9F5EE]">
      <div className="max-w-[592px] w-full px-3 py-4 xs:p-6 flex flex-col justify-center items-center gap-6 shrink-0 rounded-3xl border border-primary-blue bg-white-50">
        <div className="text-4xl xs:text-5xl sm:text-[60px] font-bold text-primary-black uppercase">
          logo
        </div>
        <p className="sm:text-2xl font-bold text-primary-black text-center">
          Please check your email and enter the login code in the field
          provided.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
          <div className="space-y-1">
            <input
              {...register("verify_code", {
                required: "Verification code is required",
                pattern: {
                  value: /^\d{6}$/,
                  message: "Code must be exactly 6 digits",
                },
                minLength: {
                  value: 6,
                  message: "Code must be 6 digits",
                },
                maxLength: {
                  value: 6,
                  message: "Code must be 6 digits",
                },
              })}
              type="text"
              placeholder="Enter your 6-digit access code"
              maxLength={6}
              className={`form-input ${
                errors.verify_code ? "border-red-500" : ""
              }`}
            />
            {errors.verify_code && (
              <p className="text-red-500 text-sm">
                {errors.verify_code.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="p-2.5 sm:p-4 rounded-2xl bg-primary-blue shadow-[0_0_8px_2px_rgba(1,216,255,0.16),0_0_8px_2px_rgba(1,216,255,0.16)] text-white text-lg font-medium w-full cursor-pointer hover:bg-primary-blue/85 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Verify & Continue
          </button>
        </form>
      </div>
    </section>
  );
};

export default VerifyCode;