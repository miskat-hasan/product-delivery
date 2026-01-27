"use client"
import { useState } from "react";
import ShipmentsTable from "../../../components/dashboard/ShipmentsTable";
import { PackageSvg } from "../../../components/svg/Svg";
import AddCollaboratorsModal from "@/components/dashboard/AddCollaboratorsModal";

const Dashboard = () => {
const [isAddCollaboratorsModalOpen, setIsAddCollaboratorsModalOpen] = useState(false)
  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-4xl font-medium text-black-500">Overview</h6>
          <p className="text-[#767676]">Friday, 13 march 2025</p>
        </div>
        <button className="py-4 px-8 text-blue-500 text-white rounded-2xl bg-blue-500 text-lg font-medium cursor-pointer hover:bg-blue-500/85">
          Create New
        </button>
      </div>
      {/* status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Array(3)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-6 bg-[#FEFEFE] rounded-[14px] border border-[#EBEBEB] gap-4"
            >
              <div>
                <p className="text-sm font-bold text-black-500 mb-2">
                  Active Shipments
                </p>
                <p className="text-2xl font-medium text-black-500">$3,200.00</p>
              </div>
              <div className="size-[48px] flex items-center justify-center rounded-2xl bg-[#DBEAFE]">
                <PackageSvg />
              </div>
            </div>
          ))}
      </div>
      {/* collaborators */}
      <div className="bg-[#FEFEFE] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h6 className="text-2xl text-[#111827] font-medium">Collaborators</h6>
          <button onClick={() => setIsAddCollaboratorsModalOpen(true)} className="flex items-center justify-center cursor-pointer hover:bg-white px-6 py-2.5 gap-2.5 rounded-lg border border-blue-500 bg-[#ECF4F9] text-blue-500 font-medium">
            Add New Collaborators +
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-3">
          {Array(12)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-3 p-3 rounded-2xl border border-[#EBEBEB]"
              >
                <div>
                  <p className="font-medium text-black-500">Aarav Mehta</p>
                  <p className="text-sm text-[#A1A1A1]">aaravmehta@email.com</p>
                </div>
                <div className="text-blue-500 text-xs font-medium px-4 py-1.5 bg-[#ECF4F9] rounded-full">
                  Consignee
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* shipments */}
      <ShipmentsTable />
      {isAddCollaboratorsModalOpen && (
        <AddCollaboratorsModal onClose={()=> setIsAddCollaboratorsModalOpen(false)} />
      )}
    </div>
  );
};

export default Dashboard;
