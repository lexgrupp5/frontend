import { ReactElement, ReactNode } from "react";
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
    token, setToken, clearTokens
  ] = useLocalStorage<string | null>(Storage.TOKEN, null);
  const isLoggedIn = token != null;

  const login = async (userName: string, password: string) => {
    setToken(await loginApi.makeRequest(new UserAuthModel({
      userName,
      password
    })));
  };

  const isTeacher = () => {
    if (token == null) {return false; }
    const role = Service.getUserRolesFromToken(token);
    return role === Role.teacher;
  };

  const isStudent = () => {
    if (token == null) {return false; }
    const role = Service.getUserRolesFromToken(token);
    return role === Role.student;
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

  const constructAuthContext = (): IAuthContext => {
    return {
      isLoggedIn,
      login,
      register,
      logout,
      isExpiredToken,
      isTeacher,
      isStudent
    };
  };

  return (
    <AuthContext.Provider value={constructAuthContext()}>
      {children}
    </AuthContext.Provider>
  );
};

