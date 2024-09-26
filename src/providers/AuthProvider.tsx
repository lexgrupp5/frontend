import { ReactElement, ReactNode, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { jwtDecode } from "jwt-decode";

import { AuthContext, IAuthContext } from "@/contexts";
// import { ITokenContainer } from "@/types";
import { Storage } from "@/constants";
import { useApi } from "@/hooks";
import { api, UserAuthModel } from "@/api";

interface Props {
  children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({
  children
}): ReactElement => {
  const loginApi = useApi(api.login);
  const logoutApi = useApi(api.logout);
  const [token, setTokens, clearTokens] = useLocalStorage<
    string | null
  >(Storage.TOKEN, null);
  const isLoggedIn = token != null;

  useEffect(() => {
    setTokens(loginApi.data);
  }, [loginApi.data]);

  useEffect(() => {
    isAdmin();
    isTokenExpired();
  }, [token]);

  const login = async (userName: string, password: string) => {
    await loginApi.fetchData(new UserAuthModel({userName, password}));
  };

  const isAdmin = () => {
    if (token == null) return true;
    const decoded = jwtDecode(token);
    if (decoded.exp == null) return true;
  };

  const isTokenExpired = () => {
    if (token == null) return true;
    const decoded = jwtDecode(token);
    if (decoded.exp == null) return true;
    const expire = decoded.exp * 1000;
    const currentTimestamp = Date.now();
    return expire < currentTimestamp;
  };

  const register = async (userName: string, password: string) => {
    // TODO Implement Register logic
  };

  const logout = () => {
    if (token != null) {
      logoutApi.fetchAuthData(token);
    }
    // TODO Implement register logic
    clearTokens();
  };

  const constructAuthContextValues = (): IAuthContext => {
    return { isLoggedIn, login, register, logout };
  };

  return (
    <AuthContext.Provider value={constructAuthContextValues()}>
      {children}
    </AuthContext.Provider>
  );
};

