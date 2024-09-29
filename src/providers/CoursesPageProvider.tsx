import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { api, ICourseDto } from "@/api";
import { ICoursesPageContext, ISearchAndFilterDTO } from "@/contexts";
import { useApi } from "@/hooks/useApi";

/**
 * @TODO Use global pending and error for all context requests.
 */
export const CoursesPageProvider = (): React.ReactElement => {
  const { data, pending, error, makeAuthRequest, clearError } = useApi(api.coursesAll);
  const [selectedCourse, setSelectedCourse] = useState<ICourseDto | null>(null);
  const [searchAndFilterDTO, setSearchAndFIlterDTO] = useState<ISearchAndFilterDTO>({});

  useEffect(() => {
    (async () => {
      try {
        await makeAuthRequest();
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
      makeAuthRequest(undefined, dto.endDate, dto.startDate);
    } else {
      makeAuthRequest(dto.searchText, dto.endDate, dto.startDate);
    }
  };

  const constructCoursesPageContext = (): ICoursesPageContext => ({
    courses: data ?? [],
    pending,
    error,
    selectedCourse,
    searchAndFilterDTO,
    updateSelectedCourse,
    updateSearchAndFilterDTO,
    fetchCourses,
    clearError
  });

  return (
    <>
      <Outlet context={constructCoursesPageContext()} />
    </>
  );  
};
