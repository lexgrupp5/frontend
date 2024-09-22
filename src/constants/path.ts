const StaticPath = {
  INDEX: "/",
  LOGIN: "login",
  REGISTER: "register",
  COURSES: "courses",
  CURRENT_COURSE: "current-course",
  PROFILE: "profile",
  UNKNOWN: "*",
} as const;

type StaticPathType = typeof StaticPath[keyof typeof StaticPath];

type DynamicPathType = `${typeof StaticPath.COURSES}/${string}`;

const DynamicPath = {
  constructSelectedCoursePath: (id: string | number):DynamicPathType => 
    `${StaticPath.COURSES}/${id}`,
} as const;

export const Path = {
  ...StaticPath,
  ...DynamicPath
} as const;

export type PathType = StaticPathType | DynamicPathType;
