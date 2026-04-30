"use client";
import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { LoaderSVG } from "@/components/svg/Svg";

const PrivateLayout = ({ children }) => {
  const router = useRouter();
  const { user, token, loading } = useAuth();
  console.log(user);

  useEffect(() => {
    if (!token && !user) {
      router.push("/login");
    }
  }, [token, user, router]);

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div className="size-28">
          <LoaderSVG />
        </div>
      </div>
    );
  }

  if (token && user) {
    return <>{children}</>;
  }

  return null;
};

export default PrivateLayout;
