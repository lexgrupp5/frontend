import { createContext } from "react";

export interface IAuthContext {
	isLoggedIn: boolean;
	login: (username: string, password: string) => Promise<void>;
	register: (username: string, password: string) => Promise<void>;
	logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);
