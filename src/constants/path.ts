const StaticPath = {
  INDEX: "/",
  LOGIN: "login",
  REGISTER: "register",
  COURSES: "courses",
  PROFILE: "profile",
  STUDENTHOME: "student-homepage",
  STUDENTCOURSE: "student-coursepage",
  UNKNOWN: "*",
} as const;

type StaticPathType = typeof StaticPath[keyof typeof StaticPath];

type CoursesDynamicPathType = `${typeof StaticPath.COURSES}/${string}`;

type StudentDynamicPathType = `${typeof StaticPath.STUDENTHOME}/${string}`;

type StudentCourseDynamicPathType = `${typeof StaticPath.STUDENTCOURSE}/${number}`

const CoursesDynamicPath = {
  constructSelectedCoursePath: (id: string | number): CoursesDynamicPathType =>
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
  ...CoursesDynamicPath,
} as const;

export const StudentPath = {
  ...StaticPath,
  ...StudentHomeDynamicPath,
} as const;

export const StudentCoursePath = {
  ...StaticPath,
  ...StudentCourseDynamicPath,
} as const;

export type PathType = (
  StaticPathType | 
  CoursesDynamicPathType | 
  StudentDynamicPathType | 
  StudentCourseDynamicPathType
);