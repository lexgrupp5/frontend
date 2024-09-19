export const Path = {
  INDEX: "/",
  LOGIN: "login",
  REGISTER: "register",
  COURSES: "courses",
  CURRENT_COURSE: "current-course",
  PROFILE: "profile",
  UNKNOWN: "*",
} as const;

export type PathType = typeof Path[
	keyof typeof Path
];
