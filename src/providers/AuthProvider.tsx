import { ReactElement, ReactNode, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

import { AuthContext, IAuthContext } from "@/contexts";
import { Role, Storage } from "@/constants";
import { useApi } from "@/hooks";
import { api, UserAuthModel } from "@/api";
import * as Service from "@/services";

interface Props {
  children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({
  children
}): ReactElement => {
  const loginApi = useApi(api.login);
  const logoutApi = useApi(api.logout);
  const [
    token, setTokens, clearTokens
  ] = useLocalStorage<string | null>(Storage.TOKEN, null);
  const isLoggedIn = token != null;

  useEffect(() => {
    setTokens(loginApi.data);
  }, [loginApi.data]);

  const login = async (userName: string, password: string) => {
    await loginApi.makeRequest(new UserAuthModel({userName, password}));
  };

  const isTeacher = () => {
    if (token == null) {return false; }
    const roles = Service.getUserRolesFromToken(token);
    return roles.includes(Role.teacher);
  };

  const isExpiredToken = () => {
    if (token == null) {return false; }
    return Service.isExpiredToken(token);
  };

  const register = async (userName: string, password: string) => {
    // TODO Implement Register logic
  };

  const logout = () => {
    if (token != null) {
      logoutApi.makeAuthRequest(token);
    }
    clearTokens();
    loginApi.clearData();
  };

  const constructAuthContextValues = (): IAuthContext => {
    return { isLoggedIn, login, register, logout, isExpiredToken, isTeacher };
  };

  return (
    <AuthContext.Provider value={constructAuthContextValues()}>
      {children}
    </AuthContext.Provider>
  );
};

