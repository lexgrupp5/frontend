export const Path = {
	INDEX: "/",
	LOGIN: "login",
	REGISTER: "register",
	UNKNOWN: "*",
} as const;

export type PathType = typeof Path[
	keyof typeof Path
];
