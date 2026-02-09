"use client";
import { useRouter } from "next/navigation";
import useAuth from "../useAuth";
import useClientApi from "../useClientApi";
import Swal from "sweetalert2";

// login
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

// register
export const useRegister = () => {
  return useClientApi({
    method: "post",
    key: ["register"],
    endpoint: "/api/register",
    onError: (err) => {
      Swal.fire({
        title: err?.response?.data?.message || "Something went wrong",
        icon: "error",
      });
    },
  });
};

// Verify OTP for registration
export const useVerifyCode = () => {
  const { setToken } = useAuth();
  const router = useRouter();
  return useClientApi({
    method: "post",
    key: ["verify-otp"],
    endpoint: "/api/verify-otp",
    onSuccess: (data) => {
      setToken(data?.data?.token);
      Swal.fire({
        title: data?.message || "Verified Successful",
        icon: "success",
        // confirmButtonText: "Go To Dashboard",
        // allowOutsideClick: true,
      }).then(() => {
        router.push("/on-boarding");
      });
    },
    onError: (err) => {
      Swal.fire({
        title: err?.response?.data?.message || "Something went wrong",
        icon: "error",
      });
    },
  });
};

// Verify OTP for forgot password
export const useVerifyOTP = () => {
  const router = useRouter();
  return useClientApi({
    method: "post",
    key: ["verify-reset-otp"],
    endpoint: "/api/verify-reset-otp",
    onSuccess: () => {
      router.push("/change-password");
    },
    onError: (err) => {
      Swal.fire({
        title: err?.response?.data?.message || "Something went wrong",
        icon: "error",
      });
    },
  });
};

// resend OTP
export const useResendOPT = () => {
  return useClientApi({
    method: "post",
    key: ["resend-otp"],
    endpoint: "/api/resend-otp",
  });
};

// forget password
export const useForgotPassword = () => {
  return useClientApi({
    method: "post",
    key: ["forgot password"],
    endpoint: "/api/forgot-password",
    onError: (err) => {
      Swal.fire({
        title: err?.response?.data?.message || "Something went wrong",
        icon: "error",
      });
    },
  });
};

// get user data
export const useGetUserData = (token) => {
  return useClientApi({
    method: "get",
    key: ["user", token],
    enabled: !!token,
    endpoint: "/api/profile",
    isPrivate: true,
  });
};

// log out
export const useLogout = () => {
  const router = useRouter();
  const { clearToken } = useAuth();

  return useClientApi({
    method: "post",
    key: ["logout"],
    isPrivate: true,
    endpoint: "/api/logout",
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
