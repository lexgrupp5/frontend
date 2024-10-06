import { useState } from "react";
import { Outlet } from "react-router-dom";

import { api } from "@/api";
import { ICoursesPageContext, IPaginationDTO, ISearchAndFilterDTO } from "@/contexts";
import { useApi } from "@/hooks/useApi";
import { useMessageContext } from "@/hooks";

export const CoursesPageProvider = (): React.ReactElement => {
  const { data, pending, error, makeAuthRequestWithErrorResponse, clearError } = useApi(api.coursesAll);
  const [searchAndFilter, setSearchAndFilter] = useState<ISearchAndFilterDTO>({
    searchText: "",
    startDate: undefined,
    endDate: undefined,
  });
  const [ pagination, setPagination ] = useState<IPaginationDTO>({
    page: 1,
    limit: 12
  });
  const msgContext = useMessageContext();

  const updateSearchAndFilter = (searchAndFilter: ISearchAndFilterDTO) => {
    setSearchAndFilter(searchAndFilter);
  };

  const updatePagination = (pagination: IPaginationDTO) => {
    setPagination(pagination);
  };

  const fetchCourses = async () => {
    const searchParam = searchAndFilter.searchText || undefined;
    
    const [err] = await makeAuthRequestWithErrorResponse(
      searchParam,
      searchAndFilter.startDate,
      searchAndFilter.endDate,
      pagination.page,
      pagination.limit,
    );
  
    if (err) {
      msgContext.updateErrorMessage(err.message);
    }
  };

  const constructCoursesPageContext = (): ICoursesPageContext => ({
    courses: data ?? [],
    pending,
    error,
    searchAndFilter,
    pagination,
    updateSearchAndFilter,
    updatePagination,
    fetchCourses,
    clearError
  });

  return (
    <>
      <Outlet context={constructCoursesPageContext()} />
    </>
  );
};
