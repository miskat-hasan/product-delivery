import { useRouter } from "next/navigation";
import useAuth from "../useAuth";
import useClientApi from "../useClientApi";
import Swal from "sweetalert2";

export const useLogin = () => {
  const router = useRouter();
  const { setToken } = useAuth();

  return useClientApi({
    method: "post",
    key: ["login"],
    endpoint: "/api/login",
    onSuccess: (data) => {
      if (data?.success) {
        setToken(data?.data?.token);

        Swal.fire({
          title: data?.message || "Login Successful",
          icon: "success",
          confirmButtonText: "Go To Dashboard",
          allowOutsideClick: true,
        }).then(() => {
          router.push("/dashboard");
        });
      }
    },
    onError: (err) => {
      Swal.fire({
        title: err?.response?.data?.message || "Something went wrong",
        icon: "error",
      });
    },
  });
};

export const useGetUserData = (token) => {
  return useClientApi({
    method: "get",
    key: ["user", token],
    enabled: !!token,
    endpoint: "/api/users/data",
    isPrivate: true,
  });
};

export const useLogout = () => {
  const router = useRouter();
  const { clearToken } = useAuth();

  return useClientApi({
    method: "post",
    key: ["logout"],
    isPrivate: true,
    endpoint: "/api/users/logout",
    onSuccess: (data) => {
      clearToken();
      router.push("/login");
    },
    onError: () => {
      clearToken();
      router.push("/login");
    },
  });
};
