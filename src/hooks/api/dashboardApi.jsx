import useClientApi from "../useClientApi";

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
