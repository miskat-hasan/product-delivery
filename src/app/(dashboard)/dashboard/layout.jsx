import React from "react";
import Sidebar from "../../../components/dashboard/Sidebar";
import Topbar from "../../../components/dashboard/Topbar";
import PrivateLayout from "@/private/Private";

export const metadata = {
  title: "Admin Dashboard",
  description: "welcome to the dashboard",
};

const DashboardLayout = ({ children }) => {
  return (
    <PrivateLayout>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />

        <div className="flex flex-1 flex-col bg-[#F9F5EE] min-w-0">
          <Topbar />

          <div className="flex-1 overflow-y-auto px-2 sm:px-6 py-[40px] min-w-0">
            {children}
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
};

export default DashboardLayout;
