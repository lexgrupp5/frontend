import { useState } from "react";
import { Outlet } from "react-router-dom";

import { api, CourseDto, CustomApiException } from "@/api";
import { ICoursesPageContext, ISearchAndFilterDTO } from "@/contexts";
import { useApi } from "@/hooks/useApi";
import { useMessageContext } from "@/hooks";
import { DefaultToastMessage } from "@/pages/SharedComponents";

export const CoursesPageProvider = (): React.ReactElement => {
  const { data, pending, error, makeAuthRequestWithErrorResponse, clearError } = useApi(api.coursesAll);
  const [searchAndFilterDTO, setSearchAndFIlterDTO] = useState<ISearchAndFilterDTO>({});
  const msgContext = useMessageContext();

  const updateSearchAndFilterDTO = (dto: ISearchAndFilterDTO) => {
    setSearchAndFIlterDTO(dto);
  };

  const fetchCourses = async (dto: ISearchAndFilterDTO) => {
    let [err]: [CustomApiException | null, CourseDto[] | null] = [null, null];
    if (dto.searchText === "" || dto.searchText == null) {
      [err] = await makeAuthRequestWithErrorResponse(undefined, dto.endDate, dto.startDate);
    } else {
      [err] = await makeAuthRequestWithErrorResponse(dto.searchText, dto.endDate, dto.startDate);
    }
    if (err != null) {
      msgContext.updateErrorMessage(err.message);
    }
  };

  const constructCoursesPageContext = (): ICoursesPageContext => ({
    courses: data ?? [],
    pending,
    error,
    searchAndFilterDTO,
    updateSearchAndFilterDTO,
    fetchCourses,
    clearError
  });

  return (
    <>
      <DefaultToastMessage onClose={clearError} />
      <Outlet context={constructCoursesPageContext()} />
    </>
  );
};
