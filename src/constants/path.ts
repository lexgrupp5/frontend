const StaticPath = {
  INDEX: "/",
  LOGIN: "login",
  REGISTER: "register",
  COURSES: "courses",
  CURRENT_COURSE: "current-course",
  PROFILE: "profile",
  STUDENTHOME: "student-homepage",
  UNKNOWN: "*",
} as const;

type StaticPathType = typeof StaticPath[keyof typeof StaticPath];

type DynamicPathType = `${typeof StaticPath.COURSES}/${string}`;

type StudentDynamicPathType = `${typeof StaticPath.STUDENTHOME}/${string}`;

const DynamicPath = {
  constructSelectedCoursePath: (id: string | number): DynamicPathType =>
    `${StaticPath.COURSES}/${id}`,
} as const;

const StudentHomeDynamicPath = {
  constructStudentHomePath: (username: string): StudentDynamicPathType =>
    `${StaticPath.STUDENTHOME}/${username}`,
} as const;

export const Path = {
  ...StaticPath,
  ...DynamicPath,
} as const;

export const StudentPath = {
  ...StaticPath,
  ...StudentHomeDynamicPath,
} as const;

export type PathType = StaticPathType | DynamicPathType | StudentDynamicPathType;
