"use client";
import Swal from "sweetalert2";
import useClientApi from "../useClientApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useAddCollaborator = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    key: ["add-collaborator"],
    endpoint: "/api/add-collaborator",
  });
};

export const useGetCollaboratorContent = () => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-collaborator-content"],
    endpoint: "/api/collaborator-content",
  });
};

export const useGetAllCollaborator = () => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-all-collaborator"],
    endpoint: "/api/my-collaborator",
  });
};

export const useAddUserContact = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    key: ["add-user-contact"],
    key: ["/add-user"],
    endpoint: "/api/add-user",
  });
};

export const GetAllUserContact = (role) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-all-user-contact-info", role],
    params: { role },
    endpoint: `/api/form-data`,
  });
};

export const StoreAirWaybill = () => {
  const router = useRouter();
  return useClientApi({
    method: "post",
    isPrivate: true,
    key: ["store-airway-bill"],
    endpoint: "/api/form-submit",
    onSuccess: (data) => {
      toast.success(data?.message);
      router.push(`/print-preview?id=${data?.data?.id}`);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

export const GetSingleAirWayBill = (id) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-single-airway-bill"],
    endpoint: `/api/form/${id}`,
  });
};

export const GetAllShipments = () => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-all-shipments"],
    endpoint: "/api/get-shipments",
  });
};

export const GetSingleShipment = (id) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-single-shipment"],
    endpoint: `/api/form-stage/${id}`,
  });
};

export const DeleteShipment = (id) => {
  return useClientApi({
    method: "delete",
    isPrivate: true,
    endpoint: `/api/delete/${id}`,
  });
};
