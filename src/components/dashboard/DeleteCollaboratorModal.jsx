import { FaRegTrashCan } from "react-icons/fa6";
import { CloseSvg } from "../svg/Svg";
import { useDeleteCollaborator } from "@/hooks/api/dashboardApi";
import { LuLoaderCircle } from "react-icons/lu";
import { useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const DeleteCollaboratorModal = ({ onClose, collaboratorData }) => {
  const { mutate, isPending } = useDeleteCollaborator();
  const [deletingItem, setDeletingItem] = useState(null);
  const queryClient = useQueryClient();

  const handleDelete = (item) => {
    setDeletingItem(item);
    mutate(
      {
        endpoint: `/api/remove-collaborator?email=${collaboratorData?.email}&awb_serial_id=${item}`,
      },
      {
        onSuccess: (data) => {
          toast.success(data?.message || "Data updated successfully");
          queryClient.invalidateQueries("get-all-collaborator");
          onClose();
        },
      },
      {
        onSettled: () => setDeletingItem(null),
      },
    );
  };

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center bg-[#333333CC]">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative z-10 w-full bg-[#FEFEFE] max-w-[581px] max-h-[calc(100vh-50px)] overflow-y-auto p-2 sm:p-6 rounded-xl sm:rounded-3xl border border-[#3D8FBE] mx-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-primary-black text-2xl font-medium">
            All Shipments
          </div>
          <button onClick={onClose} className="cursor-pointer">
            <CloseSvg />
          </button>
        </div>
        <div className="divide-y border-t border-gray-200 divide-gray-200">
          {collaboratorData?.form_serial_ids?.map((item, index) => {
            const isDeleting = deletingItem === item;
            return (
              <div
                key={index}
                className="flex items-center justify-between gap-1 py-2"
              >
                <div className="text-blue-500">AWB-{item}</div>
                <button
                  disabled={isPending}
                  onClick={() => handleDelete(item)}
                  className="text-red-400 cursor-pointer hover:text-red-500 transition duration-300 disabled:cursor-not-allowed"
                >
                  {isDeleting ? (
                    <LuLoaderCircle className="animate-spin" />
                  ) : (
                    <FaRegTrashCan />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DeleteCollaboratorModal;
