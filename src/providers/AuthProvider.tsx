import { ReactElement, ReactNode, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import { AuthContext, IAuthContext } from "@/contexts";
import { Role, Storage } from "@/constants";
import { useApi } from "@/hooks";
import { api, CourseDto, UserAuthModel } from "@/api";
import * as Service from "@/services";

interface Props {
  children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({
  children
}): ReactElement => {
  const loginApi = useApi(api.login);
  const logoutApi = useApi(api.logout);
  const userCourse = useApi(api.userAll);
  const [ myCourse, setMyCourse ] = useState<CourseDto | null>(null);
  const [ username, setUsername ] = useState<string | null>(null);
  
  const [
    token, setToken, clearTokens
  ] = useLocalStorage<string | null>(Storage.TOKEN, null);
  const isLoggedIn = token != null;

  const login = async (userName: string, password: string) => {
    setToken(await loginApi.makeRequest(new UserAuthModel({
      userName,
      password
    })));
    setUsername(userName);
    const [err, result] = await userCourse.makeAuthRequestWithErrorResponse(userName);
    if (err == null && result != null) {
      setMyCourse(result[0]);
    } else {
      setMyCourse(null);
    };
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
      myCourse,
      username,
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

