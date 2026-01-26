import { useContext } from "react";
import { AuthContextProvider } from "../provider/auth-provider/AuthProvider";

const useAuth = () => {
  const all = useContext(AuthContextProvider);
  return all;
};

export default useAuth;
