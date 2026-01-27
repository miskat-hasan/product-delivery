import React from "react";
import Sidebar from "../../../components/dashboard/Sidebar";
import Topbar from "../../../components/dashboard/Topbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 bg-[#F9F5EE]">
        <Topbar />
        <div className="px-6 py-[40px]">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
