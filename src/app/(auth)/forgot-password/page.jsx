"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const ForgetPassword = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // Add your forgot password API call here
    // On success, navigate to verify code page
    // router.push('/verify-code');
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center px-4 py-5 bg-[#F9F5EE]">
      <div className="max-w-[592px] w-full p-6 flex flex-col justify-center items-center gap-6 shrink-0 rounded-3xl border border-primary-blue bg-white-50">
        <div className="text-[60px] font-bold text-primary-black uppercase">
          logo
        </div>
        <p className="text-2xl font-bold text-primary-black text-center">
          Please enter the email address you used during registration.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
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
          <button
            type="submit"
            className="p-4 rounded-2xl bg-primary-blue shadow-[0_0_8px_2px_rgba(1,216,255,0.16),0_0_8px_2px_rgba(1,216,255,0.16)] text-white text-lg font-medium w-full cursor-pointer hover:bg-primary-blue/85 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgetPassword;