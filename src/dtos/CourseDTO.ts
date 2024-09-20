export interface CourseDto {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

export const validateCourseDto = (obj: CourseDto): boolean => {
  return (
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    typeof obj.description === "string" &&
    typeof obj.startDate === "string" &&
    typeof obj.endDate === "string"
  );
};
