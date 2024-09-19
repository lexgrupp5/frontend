import { ReactElement, ReactNode, useEffect, useState } from "react";
import { AuthContext, IAuthContext } from "@/contexts";
import { useLocalStorage } from "usehooks-ts";
import { ITokenContainer } from "@/types";
import { Storage } from "@/constants";

interface Props {
  children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({
  children
}): ReactElement => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [tokens, setTokens, clearTokens] = useLocalStorage<
  ITokenContainer | null>(Storage.TOKEN, null);

  useEffect(() => {
    if (tokens === null) {
      setIsLoggedIn(false);
    } else {
      // Todo Check Validation
      // Todo Check Role
      setIsLoggedIn(true);
    }
  }, [tokens]);

  const login = async (username: string, password: string) => {
    // TODO Implement login logic
    setIsLoggedIn(true);
    const mockToken: ITokenContainer = {
      accessToken: "accessToken",
      refreshToken: "refreshToken" 
    };
    setTokens(mockToken);
  };

  const register = async (username: string, password: string) => {
    // TODO Implement Register logic
  };

  const logout = () => {
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
