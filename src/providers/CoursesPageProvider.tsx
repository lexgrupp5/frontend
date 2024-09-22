import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { api, ICourseDto } from "@/api";
import { ICoursesPageContext } from "@/contexts";
import { useApi } from "@/hooks/useApi";

export const CoursesPageProvider = (): React.ReactElement => {
  const { data, pending, error, fetchData, clearError } = useApi(api.courses);
  const [selectedCourse, setSelectedCourse] = useState<ICourseDto | null>(null);

  useEffect(() => {
    (async () => {
      try {
        await fetchData();
        console.log(error);
  
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const updateSelectedCourse = (course: ICourseDto) => {
    setSelectedCourse(course);
  };

  const constructCoursesPageContext = (): ICoursesPageContext => ({
    courses: data ?? [],
    pending,
    error,
    selectedCourse,
    clearError,
    updateSelectedCourse
  });
  
  return (
    <>
      <Outlet context={constructCoursesPageContext()}/>
    </>
  );
};
