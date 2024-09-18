import { AuthContext } from "@/contexts";
import { useContext } from "react";

export type IAuthContextHook = ReturnType<typeof useAuthContext>

export function useAuthContext () {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error(
      "useAuthContext has to be used within <AuthContext.Provider>"
    );
  }

  return authContext;
};
