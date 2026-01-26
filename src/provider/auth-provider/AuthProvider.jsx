"use client";

import { createContext, useEffect, useState } from "react";
import { useGetUserData } from "../../hooks/api/authApi";
import useLocalStorage from "../../hooks/useLocalStorage";

export const AuthContextProvider = createContext(null);

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken, clearToken] = useLocalStorage("token", null);

  const { data: userData, isLoading: loadingUserData } = useGetUserData(token);

  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    if (loadingUserData) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    if (userData?.success) {
      setUser(userData?.data);
    } else {
      setUser(null);
    }
  }, [token, userData, loadingUserData]);

  const contextValue = {
    loading,
    user,
    token,
    setToken,
    clearToken,
    userData,
    loadingUserData,
  };

  return (
    <AuthContextProvider.Provider value={contextValue}>
      {children}
    </AuthContextProvider.Provider>
  );
}
