import React from "react";
import Sidebar from "../../../components/dashboard/Sidebar";
import Topbar from "../../../components/dashboard/Topbar";
const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col bg-[#F9F5EE]">
        <Topbar />

        {/* THIS is the scroll container */}
        <div className="flex-1 overflow-y-auto px-6 py-[40px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
