import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { ActivityDto, api, CourseDto, CustomApiException, ICourseDto, ModuleDto, UserDto } from "@/api";
import { ICoursesPageContext, ISearchAndFilterDTO } from "@/contexts";
import { useApi } from "@/hooks/useApi";
import { useMessageContext } from "@/hooks";
import { DefaultToastMessage } from "@/pages/SharedComponents";

export const CoursesPageProvider = (): React.ReactElement => {
  const { data, pending, error, makeAuthRequestWithErrorResponse, clearError } = useApi(api.coursesAll);
  const [selectedCourse, setSelectedCourse] = useState<ICourseDto | null>(null);
  const [selectedModule, setSelectedModule] = useState<ModuleDto | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<ActivityDto | null>(null);
  const [selectedParticipant, setSelectedParticipant] = useState<UserDto | null>(null);
  const [searchAndFilterDTO, setSearchAndFIlterDTO] = useState<ISearchAndFilterDTO>({});
  const msgContext = useMessageContext();

  useEffect(() => {
    (async () => {
      const [err, result] = await makeAuthRequestWithErrorResponse();
      if (err != null || result == null) {
        msgContext.updateErrorMessage("Could not fetch courses from server");
      }
    })();
  }, []);

  const updateSelectedCourse = (course: ICourseDto) => {
    setSelectedCourse(course);
  };

  const updateSelectedActivity = (activity: ActivityDto | null) => {
    setSelectedActivity(activity);
  };

  const updateSelectedModule = (module: ModuleDto | null) => {
    setSelectedModule(module);
  };

  const updateSelectedParticipant = (participant: UserDto | null) => {
    setSelectedParticipant(participant);
  };

  const updateSearchAndFilterDTO = (dto: ISearchAndFilterDTO) => {
    setSearchAndFIlterDTO(dto);
  };

  const fetchCourses = async (dto: ISearchAndFilterDTO) => {
    let [err, result]: [ CustomApiException | null, CourseDto[] | null ] = [null, null]; 
    if (dto.searchText === "" || dto.searchText == null) {
      [err, result] = await makeAuthRequestWithErrorResponse(undefined, dto.endDate, dto.startDate);
    } else {
      [err, result] = await makeAuthRequestWithErrorResponse(dto.searchText, dto.endDate, dto.startDate);
    }
    if (err != null || result == null) { updateErrorMsg(); }
  };

  const updateErrorMsg = () => {
    msgContext.updateErrorMessage("Could not fetch courses from server");
  };

  const constructCoursesPageContext = (): ICoursesPageContext => ({
    courses: data ?? [],
    pending,
    error,
    selectedCourse,
    selectedModule,
    selectedActivity,
    selectedParticipant,
    searchAndFilterDTO,
    updateSelectedCourse,
    updateSelectedActivity,
    updateSelectedModule,
    updateSelectedParticipant,
    updateSearchAndFilterDTO,
    fetchCourses,
    clearError
  });

  return (
    <>
      <DefaultToastMessage onClose={clearError}/>
      <Outlet context={constructCoursesPageContext()} />
    </>
  );  
};
