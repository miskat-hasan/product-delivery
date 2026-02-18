"use client";
import { useState } from "react";
import ShipmentsTable from "../../../components/dashboard/ShipmentsTable";
import { PackageSvg } from "../../../components/svg/Svg";
import AddCollaboratorsModal from "@/components/dashboard/AddCollaboratorsModal";
import { useGetAllCollaborator } from "@/hooks/api/dashboardApi";

const Dashboard = () => {
  const [isAddCollaboratorsModalOpen, setIsAddCollaboratorsModalOpen] =
    useState(false);
  const { data: collaboratorData, isLoading: collaboratorDataLoading } =
    useGetAllCollaborator();

  const today = new Date();

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(today);

  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-2xl sm:text-4xl font-medium text-black-500">
            Overview
          </h6>
          <p className="text-[#767676]">{formattedDate}</p>
        </div>
        {/* <button className="py-2 sm:py-4 px-3 sm:px-8 text-blue-500 text-white rounded-md sm:rounded-2xl bg-blue-500 text-sm sm:text-lg font-medium cursor-pointer hover:bg-blue-500/85">
          Create New
        </button> */}
      </div>
      {/* status */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6">
        {Array(3)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 sm:p-6 bg-[#FEFEFE] rounded-[14px] border border-[#EBEBEB] gap-4"
            >
              <div>
                <p className="sm:text-sm font-bold text-black-500 mb-2">
                  Active Shipments
                </p>
                <p className="sm:text-2xl font-medium text-black-500">
                  $3,200.00
                </p>
              </div>
              <div className="size-[48px] flex items-center justify-center rounded-2xl bg-[#DBEAFE]">
                <PackageSvg />
              </div>
            </div>
          ))}
      </div> */}
      {/* collaborators */}
      <div className="bg-[#FEFEFE] rounded-2xl p-2 sm:p-6">
        <div className="flex max-sm:flex-col gap-2 items-center justify-between mb-6">
          <h6 className="text-2xl text-[#111827] font-medium">Collaborators</h6>
          <button
            onClick={() => setIsAddCollaboratorsModalOpen(true)}
            className="flex items-center justify-center cursor-pointer hover:bg-white px-6 py-2.5 gap-2.5 rounded-lg border border-blue-500 bg-[#ECF4F9] text-blue-500 font-medium"
          >
            Add New Collaborators +
          </button>
        </div>
        {collaboratorDataLoading ? (
          "Loading collaborator data ..."
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-3">
            {collaboratorData?.data?.length > 0
              ? collaboratorData?.data?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-3 p-3 rounded-2xl border border-[#EBEBEB] overflow-hidden"
                  >
                    <div>
                      <p className="font-medium text-black-500">{item.name}</p>
                      <p className="text-sm text-[#A1A1A1]">{item.email}</p>
                    </div>
                    <div className="text-blue-500 text-xs font-medium px-1.5 sm:px-4 py-1.5 bg-[#ECF4F9] rounded-full">
                      {item.role}
                    </div>
                  </div>
                ))
              : "No collaborator added"}
          </div>
        )}
      </div>
      {/* shipments */}
      <ShipmentsTable />
      {isAddCollaboratorsModalOpen && (
        <AddCollaboratorsModal
          onClose={() => setIsAddCollaboratorsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
