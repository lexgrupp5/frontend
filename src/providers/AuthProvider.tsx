import { ReactElement, ReactNode } from "react";
import { useLocalStorage } from "usehooks-ts";

import { AuthContext, IAuthContext } from "@/contexts";
import { Role, Storage } from "@/constants";
import { useApi, useMessageContext } from "@/hooks";
import { api, TokenDto, UserAuthModel } from "@/api";
import * as Service from "@/services";

interface Props {
  children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({
  children
}): ReactElement => {
  const loginApi = useApi(api.login);
  const logoutApi = useApi(api.logout);
  const msgContext = useMessageContext();

  const [
    token, setToken, clearTokens
  ] = useLocalStorage<string | null>(Storage.TOKEN, null);
  const isLoggedIn = token != null;

  const login = async (userName: string, password: string) => {
    const [err, token] = await loginApi.makeRequestWithErrorResponse(new UserAuthModel({
      userName,
      password
    }));

    if (err != null || token === null) {
      msgContext.updateErrorMessage("Invalid login, please try again with updated credentials");
      return null;
    } else {
      setToken(token); 
    }
    return token;
  };

  const getUsername = () => {
    if (token == null) { return null; }
    return Service.getUsernameFromToken(token);
  };

  const isTeacher = () => {
    if (token == null) { return false; }
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

  const logout = async () => {
    if (token != null) {
      await logoutApi.makeAuthRequest(new TokenDto({ accessToken: token }));
    }
    clearTokens();
    loginApi.clearData();
  };

  const constructAuthContext = (): IAuthContext => {
    return {
      isLoggedIn,
      getUsername,
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

