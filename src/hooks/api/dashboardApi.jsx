import useClientApi from "../useClientApi";

export const useAddCollaborator = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    key: ["add-collaborate"],
    endpoint: "/api/add-collaborator",
  });
};
