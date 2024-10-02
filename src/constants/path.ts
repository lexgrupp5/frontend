const StaticPath = {
  INDEX: "/",
  LOGIN: "login",
  REGISTER: "register",
  COURSES: "courses",
  PROFILE: "profile",
  UNKNOWN: "*",
} as const;

type StaticPathType = typeof StaticPath[keyof typeof StaticPath];

type CoursesDynamicPathType = `${typeof StaticPath.COURSES}/${string}`;

type CourseDynamicPathType = `${string}`;

const CoursesStaticPath = {
  COURSES_NEW: `${StaticPath.COURSES}/new`,
} as const;

const CoursesDynamicPath = {
  constructSelectedCoursePath: (id: string | number): CourseDynamicPathType =>
    `${StaticPath.COURSES}/${id}`
} as const;

export const Path = {
  ...StaticPath,
  ...CoursesStaticPath,
  ...CoursesDynamicPath
} as const;

export type PathType = (
  StaticPathType | 
  CoursesDynamicPathType |
  CourseDynamicPathType
);