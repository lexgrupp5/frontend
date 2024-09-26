const StaticPath = {
  INDEX: "/",
  LOGIN: "login",
  REGISTER: "register",
  COURSES: "courses",
  CURRENT_COURSE: "current-course",
  PROFILE: "profile",
  STUDENTHOME: "student-homepage",
  STUDENTCOURSE: "student-coursepage",
  UNKNOWN: "*",
} as const;

type StaticPathType = typeof StaticPath[keyof typeof StaticPath];

type DynamicPathType = `${typeof StaticPath.COURSES}/${string}`;

type StudentDynamicPathType = `${typeof StaticPath.STUDENTHOME}/${string}`;

type StudentCourseDynamicPathType = `${typeof StaticPath.STUDENTCOURSE}/${number}`

const DynamicPath = {
  constructSelectedCoursePath: (id: string | number): DynamicPathType =>
    `${StaticPath.COURSES}/${id}`,
} as const;

const StudentHomeDynamicPath = {
  constructStudentHomePath: (username: string): StudentDynamicPathType =>
    `${StaticPath.STUDENTHOME}/${username}`,
} as const;

const StudentCourseDynamicPath = {
  constructStudentCoursePath: (id: number): StudentCourseDynamicPathType =>
    `${StaticPath.STUDENTCOURSE}/${id}`
} as const;

export const Path = {
  ...StaticPath,
  ...DynamicPath,
} as const;

export const StudentPath = {
  ...StaticPath,
  ...StudentHomeDynamicPath,
} as const;

export const StudentCoursePath = {
  ...StaticPath,
  ...StudentCourseDynamicPath,
} as const;

export type PathType = StaticPathType | DynamicPathType | StudentDynamicPathType | StudentCourseDynamicPathType;
