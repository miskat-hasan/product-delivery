"use client";
import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
// import Loader from "@/components/common/Loader";

const PrivateLayout = ({ children }) => {
  const router = useRouter();
  const { user, token, loading } = useAuth();
  console.log(user)

  useEffect(() => {
    if (!token && !user) {
      router.push("/login");
    }
  }, [token, user, router]);

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        {/* <Loader /> */}
        Loading ...
      </div>
    );
  }

  if (token && user) {
    return <>{children}</>;
  }

  return null;
};

export default PrivateLayout;
