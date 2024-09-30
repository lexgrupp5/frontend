import { createContext } from "react";

export interface IAuthContext {
	isLoggedIn: boolean;
	login: (username: string, password: string) => Promise<void>;
	register: (username: string, password: string) => Promise<void>;
	logout: () => void;
	isTeacher: () => boolean;
	isStudent: () => boolean;
	isExpiredToken: () => boolean;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);
