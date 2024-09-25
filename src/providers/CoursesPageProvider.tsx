import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { api, ICourseDto } from "@/api";
import { ICoursesPageContext, ISearchAndFilterDTO } from "@/contexts";
import { useApi } from "@/hooks/useApi";

export const CoursesPageProvider = (): React.ReactElement => {
  const { data, pending, error, fetchAuthData, clearError } = useApi(api.courses);
  const [selectedCourse, setSelectedCourse] = useState<ICourseDto | null>(null);
  const [searchAndFilterDTO, setSearchAndFIlterDTO] = useState<ISearchAndFilterDTO>({});

  useEffect(() => {
    (async () => {
      try {
        await fetchAuthData();
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const updateSelectedCourse = (course: ICourseDto) => {
    setSelectedCourse(course);
  };

  const updateSearchAndFilterDTO = (dto: ISearchAndFilterDTO) => {
    setSearchAndFIlterDTO(dto);
  };

  const fetchCourses = (dto: ISearchAndFilterDTO) => {
    if (dto.searchText === "" || dto.searchText == null) {
      fetchAuthData(undefined, dto.endDate, dto.startDate);
    } else {
      fetchAuthData(dto.searchText, dto.endDate, dto.startDate);
    }
  };

  const constructCoursesPageContext = (): ICoursesPageContext => ({
    courses: data ?? [],
    pending,
    error,
    selectedCourse,
    searchAndFilterDTO,
    updateSearchAndFilterDTO,
    fetchCourses,
    clearError,
    updateSelectedCourse
  });

  return (
    <>
      <Outlet context={constructCoursesPageContext()} />
    </>
  );
};
