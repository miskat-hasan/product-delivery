"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosSecure } from "./useAxiosSecure";
import { axiosPublic } from "./useAxiosPublic";

export default function useClientApi({
  endpoint,
  method = "get",
  isPrivate = false,
  key,
  onSuccess,
  onError,
  params,
  headers,
  queryOptions,
  mutationOptions,
  axiosOptions,
  enabled = true,
}) {
  const axiosInstance = isPrivate ? axiosSecure : axiosPublic;

  // GET request (Query)
  if (method === "get") {
    return useQuery({
      queryKey: key,
      queryFn: async () => {
        const res = await axiosInstance.get(endpoint, {
          params,
          headers,
        });
        return res.data;
      },
      enabled,
       refetchOnWindowFocus: false,
      ...queryOptions,
    });
  }

  // POST / PUT / DELETE (Mutation)
  return useMutation({
    mutationKey: key,
    mutationFn: async (variables) => {
      const dynamicEndpoint = variables?.endpoint || endpoint;
      const payload = variables?.data || variables;

      let res;

      if (method.toLowerCase() === "delete") {
        res = await axiosInstance.delete(dynamicEndpoint, {
          data: payload,
          headers,
          ...axiosOptions,
        });
      } else {
        res = await axiosInstance[method](dynamicEndpoint, payload, {
          headers,
          ...axiosOptions,
        });
      }

      return res?.data;
    },
    onSuccess,
    onError,
    ...mutationOptions,
  });
}
