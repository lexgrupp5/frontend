export const Role = {
  admin: "admin",
  teacher: "teacher",
  student: "student"
} as const;

export type RoleType = typeof Role[
  keyof typeof Role
];
