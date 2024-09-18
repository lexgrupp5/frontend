import { ReactElement, ReactNode, useState } from "react";
import { AuthContext, IAuthContext } from "@/contexts";

interface IAuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: IAuthProviderProps): ReactElement {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const login = async (username: string, password: string) => {
    // TODO Implement login logic
    setIsLoggedIn(true);
  }

  const register = async (username: string, password: string) => {
    // TODO Implement Register logic
  }

  const logout = () => {
    // TODO Implement register logic
  }

  const constructAuthContextValues = (): IAuthContext => {
    return { isLoggedIn, login, register, logout }
  }

  return (
    <AuthContext.Provider value={constructAuthContextValues()}>
      {children}
    </AuthContext.Provider>
  );
};
