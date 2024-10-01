const StaticPath = {
  INDEX: "/",
  LOGIN: "login",
  REGISTER: "register",
  COURSES: "courses",
  COURSE: "course",
  PROFILE: "profile",
  UNKNOWN: "*",
} as const;

type StaticPathType = typeof StaticPath[keyof typeof StaticPath];

type CoursesDynamicPathType = `${typeof StaticPath.COURSES}/${string}`;

type CourseDynamicPathType = `${string}`;

const CoursesStaticPath = {
  COURSES_NEW: `${StaticPath.COURSES}/new`,
} as const;

const CourseDynamicPath = {
  constructSelectedCoursePath: (id: string | number): CourseDynamicPathType =>
    `${StaticPath.COURSE}/${id}`
} as const;

export const Path = {
  ...StaticPath,
  ...CoursesStaticPath,
  ...CourseDynamicPath
} as const;

export type PathType = (
  StaticPathType | 
  CoursesDynamicPathType |
  CourseDynamicPathType
);