"use client";
import { useRouter } from "next/navigation";
import useAuth from "../useAuth";
import useClientApi from "../useClientApi";
import { toast } from "sonner";

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

        toast.success(data?.message || "Login Successful");

        router.push("/dashboard");
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
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
      toast.error(err?.response?.data?.message);
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
      toast.success(data?.message);
      router.push("/on-boarding");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
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
      toast.error(err?.response?.data?.message);
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
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

// change/reset password
export const useChangePassword = () => {
  return useClientApi({
    method: "post",
    key: ["change-password"],
    endpoint: "/api/reset-password",
    onError: (err) => {
      toast.error(err?.response?.data?.message);
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
