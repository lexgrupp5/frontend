import { createContext } from "react";

export interface IAuthContext {
	isLoggedIn: boolean;
	getUsername: () => string | null;
	login: (username: string, password: string) => Promise<void>;
	register: (username: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	isTeacher: () => boolean;
	isStudent: () => boolean;
	isExpiredToken: () => boolean;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);
