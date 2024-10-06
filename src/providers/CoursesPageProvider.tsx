import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { api } from "@/api";
import { ICoursesPageContext, IPaginationDTO, ISearchAndFilterDTO } from "@/contexts";
import { useApi } from "@/hooks/useApi";
import { useMessageContext } from "@/hooks";
import { IPaginationMeta, isPaginationMeta, PaginationEvent } from "@/events";

export const CoursesPageProvider = (): React.ReactElement => {
  const msgContext = useMessageContext();
  const { data, pending, error, makeAuthRequestWithErrorResponse, clearError } = useApi(api.coursesAll);
  const [pagination, setPagination] = useState<IPaginationDTO>({page: 1, size: 12 });
  const [paginationMeta, setPaginationMeta] = useState<IPaginationMeta | null>(null);
  const [searchAndFilter, setSearchAndFilter] = useState<ISearchAndFilterDTO>({
    searchText: "",
    startDate: undefined,
    endDate: undefined,
  });

  useEffect(() => {
    const handlePaginationData = (event: Event) => {
      const paginationEvent = event as CustomEvent<IPaginationMeta>;
      if (isPaginationMeta(paginationEvent.detail)) {
        console.log(paginationEvent.detail);
        setPaginationMeta(paginationEvent.detail);
      }
    };

    document.addEventListener(PaginationEvent.eventName, handlePaginationData);

    return () => {
      document.removeEventListener(PaginationEvent.eventName, handlePaginationData);
    };
  });

  const updateSearchAndFilter = (searchAndFilter: ISearchAndFilterDTO) => {
    setSearchAndFilter(searchAndFilter);
    return searchAndFilter;
  };

  const updatePagination = (pagination: IPaginationDTO) => {
    setPagination(pagination);
    return pagination;
  };

  const fetchCourses = async (
    searchAndFilterQuery?: ISearchAndFilterDTO,
    paginationQuery?: IPaginationDTO
  ) => {
    // const searchParam = searchAndFilter.searchText || undefined;

    const searchAndFilterData = searchAndFilterQuery ?? searchAndFilter;
    const paginationData = paginationQuery ?? pagination;
    
    const [err] = await makeAuthRequestWithErrorResponse(
      searchAndFilterData?.searchText,
      searchAndFilterData?.startDate,
      searchAndFilterData?.endDate,
      paginationData?.page,
      paginationData?.size,
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
    paginationMeta,
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
