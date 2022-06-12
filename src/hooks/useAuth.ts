import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useAuth() {
  const authContextData = useContext(AuthContext);
  return authContextData;
}