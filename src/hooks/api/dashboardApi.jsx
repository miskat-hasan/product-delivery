"use client";
import { useQueryClient } from "@tanstack/react-query";
import useClientApi from "../useClientApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useGetUserProfile = () => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-user-profile"],
    endpoint: "/api/profile",
  });
};

export const useUpdateUserProfile = () => {
  return useClientApi({
    method: "put",
    isPrivate: true,
    key: ["update-user-profile"],
    endpoint: "/api/profile-update",
  });
};

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

export const GetAllShipments = (page = 1) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-all-shipments", page],
    endpoint: "/api/get-shipments",
  });
};

export const GetSingleShipment = (id) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-single-shipment", id],
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

export const GetALLTemplates = () => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-all-templates"],
    endpoint: `/api/templates`,
  });
};

export const GetSingleTemplate = (id) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    enabled: !!id,
    key: ["get-single-template", id],
    endpoint: `/api/templates/${id}`,
  });
};

export const DeleteTemplate = () => {
  return useClientApi({
    method: "delete",
    isPrivate: true,
  });
};

export const useChangePassword = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    endpoint: "/api/change-password",
  });
};

// get all airports
export const useGetAllAirports = () => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["get-all-airports"],
    endpoint: "/api/airports",
  });
};

// update form status & report
export const useUpdateFormStatus = (id) => {
  const queryClient = useQueryClient();
  return useClientApi({
    method: "put",
    isPrivate: true,
    endpoint: `/api/update/form/${id}`,
    onSuccess: (data) => {
      toast.success(data?.message || "Data updated successfully");
      queryClient.invalidateQueries(["get-single-shipment", id]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "something went wrong");
    },
  });
};

// remove a collaborator
export const useDeleteCollaborator = () => {
  return useClientApi({
    method: "delete",
    isPrivate: true,

    onError: (err) => {
      toast.error(err?.response?.data?.message || "something went wrong");
    },
  });
};
