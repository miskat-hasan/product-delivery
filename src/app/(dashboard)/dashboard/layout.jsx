import React from "react";
import Sidebar from "../../../components/dashboard/Sidebar";
import Topbar from "../../../components/dashboard/Topbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full min-h-screen bg-[#F9F5EE] relative">
        <Topbar />
        <div className="w-full px-6 py-[40px]">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
