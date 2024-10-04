import { useState } from "react";
import { Outlet } from "react-router-dom";

import { api } from "@/api";
import { ICoursesPageContext, ISearchAndFilterDTO } from "@/contexts";
import { useApi } from "@/hooks/useApi";
import { useMessageContext } from "@/hooks";

export const CoursesPageProvider = (): React.ReactElement => {
  const { data, pending, error, makeAuthRequestWithErrorResponse, clearError } = useApi(api.coursesAll);
  const [searchAndFilterDTO, setSearchAndFIlterDTO] = useState<ISearchAndFilterDTO>({});
  const msgContext = useMessageContext();

  const updateSearchAndFilterDTO = (dto: ISearchAndFilterDTO) => {
    setSearchAndFIlterDTO(dto);
  };

  const fetchCourses = async (aDto?: ISearchAndFilterDTO) => {
    const dto = { searchText: "", startDate: undefined, endDate: undefined, ...aDto };
    const searchParam = dto.searchText || undefined;
    
    const [err] = await makeAuthRequestWithErrorResponse(searchParam, dto.endDate, dto.startDate);
  
    if (err) {
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
      <Outlet context={constructCoursesPageContext()} />
    </>
  );
};
