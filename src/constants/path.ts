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

type CoursesDynamicPathType = `${typeof StaticPath.COURSES}/${string}`;

type StudentDynamicPathType = `${typeof StaticPath.STUDENTHOME}/${string}`;

const CoursesDynamicPath = {
  constructSelectedCoursePath: (id: string | number): CoursesDynamicPathType =>
    `${StaticPath.COURSES}/${id}`,
} as const;

const StudentHomeDynamicPath = {
  constructStudentHomePath: (username: string): StudentDynamicPathType =>
    `${StaticPath.STUDENTHOME}/${username}`,
} as const;

export const Path = {
  ...StaticPath,
  ...CoursesDynamicPath,
} as const;

export const StudentPath = {
  ...StaticPath,
  ...StudentHomeDynamicPath,
} as const;

export type PathType = StaticPathType | CoursesDynamicPathType | StudentDynamicPathType;
