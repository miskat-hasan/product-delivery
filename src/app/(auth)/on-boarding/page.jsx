"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckMarkSvg } from "../../../components/svg/Svg";

const ForgetPassword = () => {
  const router = useRouter();

  return (
    <section className="w-full min-h-screen flex items-center justify-center px-4 py-5 bg-[#F9F5EE]">
      <div className="max-w-[488px] w-full p-6 flex flex-col justify-center items-center shrink-0 rounded-3xl border border-primary-blue bg-white-50">
        <div className="size-[80px] flex items-center justify-center bg-[#E6F6EC] rounded-full mb-4">
          <CheckMarkSvg />
        </div>
        <div className="space-y-1">
          <p className="text-[#2E2C2C] font-medium text-2xl text-center">
            Welcome to AWB!
          </p>
          <p className=" text-gray-300 text-center">
            Your account has been created successfully
          </p>
        </div>
        <div className="my-12 py-4 px-3 rounded-[10px] border border-primary-blue bg-blue-50 w-full">
          <h6 className="text-lg font-medium text-black-500 mb-3">
            What is Next?
          </h6>
          <ul className="space-y-1.5">
            <li className="flex items-center gap-2 text-blue-900">
              <CheckMarkSvg className="size-4 text-blue-500" />
              Finish setting up your account
            </li>
            <li className="flex items-center gap-2 text-blue-900">
              <CheckMarkSvg className="size-4 text-blue-500" />
              Explore your personalized dashboard
            </li>
            <li className="flex items-center gap-2 text-blue-900">
              <CheckMarkSvg className="size-4 text-blue-500" />
              Collaborate on your first shipment
            </li>
            <li className="flex items-center gap-2 text-blue-900">
              <CheckMarkSvg className="size-4 text-blue-500" />
              Manage everything in one place
            </li>
          </ul>
        </div>
        <div className="w-full">
          <Link href={'/dashboard'} className="p-2.5 sm:p-4 rounded-2xl bg-primary-blue shadow-[0_0_8px_2px_rgba(1,216,255,0.16),0_0_8px_2px_rgba(1,216,255,0.16)] text-white text-lg font-medium w-full cursor-pointer hover:bg-primary-blue/85 disabled:opacity-50 disabled:cursor-not-allowed">
            Create your first AWB
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
