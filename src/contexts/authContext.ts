import { CourseDto } from "@/apiGenerated";
import { createContext } from "react";

export interface IAuthContext {
	isLoggedIn: boolean;
	username: string | null
	myCourse: CourseDto | null
	login: (username: string, password: string) => Promise<void>;
	register: (username: string, password: string) => Promise<void>;
	logout: () => void;
	isTeacher: () => boolean;
	isStudent: () => boolean;
	isExpiredToken: () => boolean;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);
